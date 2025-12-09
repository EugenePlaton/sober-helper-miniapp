import Card from '../components/Card'

const Progress = () => (
  <div className="flex flex-col gap-3">
    <Card title="Progress snapshot" subtitle="Charts and insights placeholder">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="card p-3 border border-border">
          <p className="text-xs text-muted">Streak</p>
          <p className="text-2xl font-semibold">7 days</p>
        </div>
        <div className="card p-3 border border-border">
          <p className="text-xs text-muted">Craving avg</p>
          <p className="text-2xl font-semibold">2.3</p>
        </div>
        <div className="card p-3 border border-border">
          <p className="text-xs text-muted">Check-ins</p>
          <p className="text-2xl font-semibold">5</p>
        </div>
        <div className="card p-3 border border-border">
          <p className="text-xs text-muted">Relapses</p>
          <p className="text-2xl font-semibold">0</p>
        </div>
      </div>
    </Card>
    <Card title="AI analysis">
      <p className="text-sm text-slate-700">
        Your assistant will generate insights here based on check-ins and chats: top triggers, mood trends, streak
        forecasts, and tailored coping techniques.
      </p>
    </Card>
  </div>
)

export default Progress
