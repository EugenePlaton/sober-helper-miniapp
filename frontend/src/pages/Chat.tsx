import Card from '../components/Card'

const Chat = () => {
  return (
    <div className="flex flex-col gap-3">
      <Card title="AI Chat" subtitle="OpenRouter-powered assistant">
        <div className="space-y-3 text-sm">
          <div className="bg-surface p-3 rounded-tele border border-border">
            <p className="text-xs text-muted mb-1">Assistant</p>
            <p className="text-slate-800">
              I’m here. Rate your craving 1–5 and I’ll suggest a coping routine. Short breath: inhale 4s, hold 2s, exhale 6s.
            </p>
          </div>
          <div className="bg-primary text-white rounded-tele p-3 shadow-subtle">
            <p className="text-xs opacity-80 mb-1">You</p>
            <p>Feeling anxious, craving at 4.</p>
          </div>
          <div className="flex gap-2 mt-3">
            <input className="input-field flex-1" placeholder="Type a message..." />
            <button className="btn-primary px-4">Send</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-ghost">SOS — craving</button>
            <button className="btn-ghost">Share mood</button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Chat
