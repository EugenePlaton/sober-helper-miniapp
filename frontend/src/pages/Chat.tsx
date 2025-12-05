import Card from '../components/Card'

const Chat = () => {
  return (
    <Card title="AI Chat" subtitle="Connect OpenRouter later">
      <div className="space-y-3">
        <div className="bg-white border border-slate-100 rounded-tele p-3 shadow-subtle text-sm">
          Assistant: share quick coping tools and motivational snippets here.
        </div>
        <div className="bg-primary text-white rounded-tele p-3 text-sm">User: respond with your feelings.</div>
        <button className="w-full bg-primary text-white py-2 rounded-tele shadow-subtle">Send</button>
      </div>
    </Card>
  )
}

export default Chat
