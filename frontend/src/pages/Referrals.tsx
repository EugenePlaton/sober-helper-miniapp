import Card from '../components/Card'

const Referrals = () => (
  <Card title="Referrals" subtitle="Share your invite link">
    <div className="space-y-2 text-sm text-slate-700">
      <p>
        Unique code: <strong>ABC123</strong>
      </p>
      <p>Invitees: 0</p>
      <p>Rewards: extra chat credits, coping techniques, PRO days.</p>
      <div className="flex gap-2">
        <button className="flex-1 btn-primary">Copy link</button>
        <button className="flex-1 btn-ghost">Share</button>
      </div>
    </div>
  </Card>
)

export default Referrals
