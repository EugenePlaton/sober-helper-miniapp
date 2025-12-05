import Card from '../components/Card'

const Referrals = () => (
  <Card title="Referrals" subtitle="Share your invite link">
    <div className="space-y-2 text-sm text-slate-700">
      <p>Unique code: <strong>ABC123</strong></p>
      <p>Invitees: 0</p>
      <p>Rewards: extra chat credits, coping techniques, PRO days.</p>
      <div className="flex gap-2">
        <button className="flex-1 bg-primary text-white py-2 rounded-tele shadow-subtle">Copy link</button>
        <button className="flex-1 bg-white text-slate-700 border border-slate-200 py-2 rounded-tele">Share</button>
      </div>
    </div>
  </Card>
)

export default Referrals
