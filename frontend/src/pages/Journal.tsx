import Card from '../components/Card'

const Journal = () => (
  <Card title="Journal">
    <div className="space-y-2">
      <textarea className="input-field" rows={4} placeholder="Write freely" />
      <button className="btn-primary w-full">Save note</button>
    </div>
  </Card>
)

export default Journal
