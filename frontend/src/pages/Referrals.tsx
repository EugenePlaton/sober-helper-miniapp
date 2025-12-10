import Card from '../components/Card'
import { useAuthStore } from '../store/authStore'

const Referrals = () => {
  const user = useAuthStore((s) => s.user)
  const code = user ? 'ABC123' : '—'
  const link = user ? `https://t.me/share/url?url=https://sober-helper.app/ref/${code}` : ''

  return (
    <Card title="Referrals" subtitle="Share your invite link">
      <div className="space-y-2 text-sm text-slate-700">
        <p>
          Unique code: <strong>{code}</strong>
        </p>
        <p>Invitees: 0</p>
        <p>Rewards: extra chat credits, coping techniques, PRO days.</p>
        <div className="flex gap-2">
          <button
            className="flex-1 btn-primary disabled:opacity-60"
            onClick={() => link && navigator.clipboard.writeText(link)}
            disabled={!user}
          >
            Copy link
          </button>
          <button className="flex-1 btn-ghost" disabled={!user}>
            Share
          </button>
        </div>
        {!user && <p className="text-xs text-muted">Login to get your personal referral link.</p>}
      </div>
    </Card>
  )
}

export default Referrals
