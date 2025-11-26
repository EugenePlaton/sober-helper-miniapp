import Card from '../components/Card'
import { useAppStore } from '../store/appStore'

const personas = [
  { key: 'calm', label: 'Calm mentor' },
  { key: 'friendly', label: 'Friendly buddy' },
  { key: 'coach', label: 'Tough coach' },
  { key: 'toxic', label: 'Toxic (manual)' },
] as const

const Settings = () => {
  const persona = useAppStore((s) => s.assistantPersona)
  const setPersona = useAppStore((s) => s.setPersona)

  return (
    <Card title="Settings" subtitle="Update language, persona, theme">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm text-slate-600 mb-2">Assistant persona</p>
          <div className="grid grid-cols-2 gap-2">
            {personas.map((p) => (
              <button
                key={p.key}
                onClick={() => setPersona(p.key)}
                className={`border border-slate-200 rounded-tele p-2 text-sm ${
                  persona === p.key ? 'bg-primary text-white' : 'bg-white text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-primary text-white py-2 rounded-tele shadow-subtle">Save preferences</button>
      </div>
    </Card>
  )
}

export default Settings
