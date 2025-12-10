import Card from '../components/Card'

import { useState } from 'react'
import Card from '../components/Card'
import { useAppStore } from '../store/appStore'
import { useNavigate } from 'react-router-dom'

const dependencies = ['Алкоголь', 'Никотин', 'Марихуана', 'Сладкое/еда', 'Азартные игры']
const goals = ['7 дней', '14 дней', '30 дней', '90 дней']
const personas = [
  { key: 'calm', label: 'Спокойный наставник' },
  { key: 'friendly', label: 'Дружелюбный друг' },
  { key: 'coach', label: 'Жёсткий тренер' },
  { key: 'toxic', label: 'Toxic (вручную)' },
] as const

const Onboarding = () => {
  const [name, setName] = useState('')
  const [dependency, setDependency] = useState(dependencies[0])
  const [goal, setGoal] = useState(goals[2])
  const [startDate, setStartDate] = useState('')
  const [motivation, setMotivation] = useState('')
  const setPersona = useAppStore((s) => s.setPersona)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3">
      <Card title="Онбординг" subtitle="Соберём минимум, чтобы ассистент помогал лучше">
        <div className="space-y-3">
          <label className="text-sm text-slate-700 block">
            Имя
            <input className="input-field mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="text-sm text-slate-700 block">
            Привычка
            <select className="input-field mt-1" value={dependency} onChange={(e) => setDependency(e.target.value)}>
              {dependencies.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-700 block">
            Дата отказа
            <input className="input-field mt-1" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label className="text-sm text-slate-700 block">
            Цель
            <select className="input-field mt-1" value={goal} onChange={(e) => setGoal(e.target.value)}>
              {goals.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
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
          <div>
            <p className="text-sm text-slate-700 mb-2">Персона ассистента</p>
            <div className="grid grid-cols-2 gap-2">
              {personas.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPersona(p.key)}
                  className="btn-ghost"
                  type="button"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <button
            className="btn-primary w-full"
            onClick={() => {
              navigate('/')
            }}
          >
            Сохранить и начать
          </button>
        </div>
      </Card>
    </div>
  )
}

export default Onboarding
