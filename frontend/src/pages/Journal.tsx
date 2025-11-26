import Card from '../components/Card'

const Journal = () => (
  <Card title="Journal">
    <div className="space-y-2">
      <textarea className="w-full border border-slate-200 rounded-tele p-3" rows={4} placeholder="Write freely" />
      <button className="bg-primary text-white py-2 rounded-tele shadow-subtle w-full">Save note</button>
    </div>
  </Card>
)

export default Journal
