import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/Card'
import { useAppStore } from '../store/appStore'
import { useAuthStore } from '../store/authStore'
import { profileApi } from '../api'

const dependencies = ['Алкоголь', 'Никотин', 'Марихуана', 'Сладкое/еда', 'Азартные игры', 'Другое']
const goals = ['7 дней', '14 дней', '30 дней', '90 дней']
const personas = [
  { key: 'calm', label: 'Спокойный наставник' },
  { key: 'friendly', label: 'Дружелюбный друг' },
  { key: 'coach', label: 'Жёсткий тренер' },
  { key: 'toxic', label: 'Toxic (вручную)' },
] as const

type StepKey = 'name' | 'habit' | 'goal' | 'motivation' | 'persona'

const steps: { key: StepKey; title: string; description: string }[] = [
  { key: 'name', title: 'Как тебя зовут?', description: 'Покажи ассистенту, как обращаться.' },
  { key: 'habit', title: 'Привычка', description: 'Что хочешь убрать из жизни?' },
  { key: 'goal', title: 'Цель и дата', description: 'Выбери цель по дням и дату начала.' },
  { key: 'motivation', title: 'Мотивация', description: 'Почему это важно прямо сейчас?' },
  { key: 'persona', title: 'Персона ассистента', description: 'Выбери характер общения.' },
]

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const [name, setName] = useState('')
  const [dependency, setDependency] = useState(dependencies[0])
  const [goal, setGoal] = useState(goals[2])
  const [startDate, setStartDate] = useState('')
  const [motivation, setMotivation] = useState('')
  const [persona, setPersona] = useState<'calm' | 'friendly' | 'coach' | 'toxic'>('calm')

  const setPersonaStore = useAppStore((s) => s.setPersona)
  const setUser = useAuthStore((s) => s.setUser)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: Location })?.from?.pathname || '/'

  const save = useMutation({
    mutationFn: () =>
      profileApi.update({
        dependency_type: dependency,
        goal,
        quit_date: startDate || null,
        motivation: motivation || null,
        assistant_persona: persona,
      }),
    onSuccess: (user) => {
      setPersonaStore(persona)
      setUser(user)
      navigate(from === '/login' ? '/' : from, { replace: true })
    },
  })

  const currentStep = steps[stepIndex]
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100)

  const canNext = () => {
    switch (currentStep.key) {
      case 'name':
        return name.trim().length > 1
      case 'habit':
        return Boolean(dependency)
      case 'goal':
        return Boolean(goal)
      case 'motivation':
        return motivation.trim().length > 2
      case 'persona':
        return Boolean(persona)
      default:
        return true
    }
  }

  const handleNext = () => {
    if (stepIndex === steps.length - 1) {
      save.mutate()
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1)
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title="Онбординг" subtitle={currentStep.description}>
        <div className="flex items-center justify-between text-xs text-muted mb-3">
          <span>
            Шаг {stepIndex + 1} / {steps.length}
          </span>
          <span>{progress}%</span>
        </div>

        {currentStep.key === 'name' && (
          <label className="text-sm text-slate-700 block">
            Имя
            <input
              className="input-field mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к тебе обращаться?"
            />
          </label>
        )}

        {currentStep.key === 'habit' && (
          <label className="text-sm text-slate-700 block">
            Привычка
            <select className="input-field mt-1" value={dependency} onChange={(e) => setDependency(e.target.value)}>
              {dependencies.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
        )}

        {currentStep.key === 'goal' && (
          <div className="space-y-3">
            <label className="text-sm text-slate-700 block">
              Цель
              <div className="grid grid-cols-2 gap-2 mt-2">
                {goals.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`btn-ghost ${goal === g ? 'border border-primary text-primary' : ''}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </label>
            <label className="text-sm text-slate-700 block">
              Дата отказа
              <input
                className="input-field mt-1"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>
        )}

        {currentStep.key === 'motivation' && (
          <label className="text-sm text-slate-700 block">
            Мотивация
            <textarea
              className="input-field mt-1"
              rows={3}
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Почему это важно?"
            />
          </label>
        )}

        {currentStep.key === 'persona' && (
          <div>
            <p className="text-sm text-slate-700 mb-2">Персона ассистента</p>
            <div className="grid grid-cols-2 gap-2">
              {personas.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPersona(p.key)}
                  className={`btn-ghost ${persona === p.key ? 'border border-primary text-primary' : ''}`}
                  type="button"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {save.isError && <p className="text-xs text-red-500 mt-2">Ошибка: {(save.error as Error).message}</p>}

        <div className="flex justify-between gap-2 mt-4">
          <button className="btn-ghost flex-1" onClick={handlePrev} disabled={stepIndex === 0}>
            Назад
          </button>
          <button
            className="btn-primary flex-1 disabled:opacity-60"
            onClick={handleNext}
            disabled={!canNext() || save.isPending}
          >
            {stepIndex === steps.length - 1 ? (save.isPending ? 'Сохраняю…' : 'Начать') : 'Дальше'}
          </button>
        </div>
      </Card>
    </div>
  )
}

export default Onboarding
