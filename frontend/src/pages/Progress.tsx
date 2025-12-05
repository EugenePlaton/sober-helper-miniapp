import Card from '../components/Card'

const Progress = () => (
  <div className="flex flex-col gap-3">
    <Card title="Progress" subtitle="Charts and insights placeholder">
      <p className="text-sm text-slate-600">Connect real analytics: streaks, triggers, relapse rate, and AI summaries.</p>
    </Card>
    <Card title="AI analysis">
      <p className="text-sm text-slate-700">Your assistant will generate insights here based on check-ins and chats.</p>
    </Card>
  </div>
)

export default Progress
