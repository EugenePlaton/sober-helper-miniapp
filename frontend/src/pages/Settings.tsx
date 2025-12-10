import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import { useAppStore } from '../store/appStore'
import { settingsApi } from '../api'
import { useAuthStore } from '../store/authStore'

const personas = [
  { key: 'calm', label: 'Calm mentor' },
  { key: 'friendly', label: 'Friendly buddy' },
  { key: 'coach', label: 'Tough coach' },
  { key: 'toxic', label: 'Toxic (manual)' },
] as const

const Settings = () => {
  const persona = useAppStore((s) => s.assistantPersona)
  const setPersona = useAppStore((s) => s.setPersona)
  const setThemeStore = useAppStore((s) => s.setTheme)
  const user = useAuthStore((s) => s.user)
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState<'en' | 'ru'>('en')

  const settingsQuery = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.get(),
    enabled: !!user,
  })

  useEffect(() => {
    if (settingsQuery.data) {
      setTheme(settingsQuery.data.theme || 'light')
      setNotifications(settingsQuery.data.notifications_enabled)
      setLanguage((settingsQuery.data.language as 'en' | 'ru') || 'en')
      setThemeStore((settingsQuery.data.theme as 'light' | 'dark') || 'light')
    }
  }, [settingsQuery.data, setThemeStore])

  const save = useMutation({
    mutationFn: () => settingsApi.update({ theme, notifications_enabled: notifications, language }),
    onSuccess: () => settingsQuery.refetch(),
  })

  if (!user) {
    return (
      <Card title="Settings" subtitle="Login to update preferences">
        <p className="text-sm text-muted">Auth required to save theme/notifications/language.</p>
      </Card>
    )
  }

  return (
    <Card title="Settings" subtitle="Update language, persona, theme">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-slate-600 mb-2">Assistant persona</p>
          <div className="grid grid-cols-2 gap-2">
            {personas.map((p) => (
              <button
                key={p.key}
                onClick={() => setPersona(p.key)}
                className={`border border-border rounded-tele p-2 text-sm ${
                  persona === p.key ? 'bg-primary text-white' : 'bg-surface text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="border border-border rounded-tele p-3 flex items-center justify-between">
            <span>Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-4 w-4"
            />
          </label>
          <label className="border border-border rounded-tele p-3 flex items-center justify-between">
            <span>Theme</span>
            <select className="text-sm bg-transparent" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label className="border border-border rounded-tele p-3 flex items-center justify-between col-span-2">
            <span>Language</span>
            <select
              className="text-sm bg-transparent"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ru')}
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </label>
        </div>

        <button
          className="btn-primary disabled:opacity-60"
          onClick={() => save.mutate()}
          disabled={save.isPending}
        >
          {save.isPending ? 'Saving…' : 'Save preferences'}
        </button>
        {settingsQuery.isError && <p className="text-xs text-red-500">Load error: {(settingsQuery.error as Error).message}</p>}
        {save.isError && <p className="text-xs text-red-500">Save error: {(save.error as Error).message}</p>}
      </div>
    </Card>
  )
}

export default Settings
