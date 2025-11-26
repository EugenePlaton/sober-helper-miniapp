import Card from '../components/Card'

const CheckIn = () => {
  return (
    <Card title="Daily check-in" subtitle="Mood, craving, triggers">
      <form className="space-y-3">
        <label className="block text-sm text-slate-600">
          Mood (1-5)
          <input className="mt-1 w-full border border-slate-200 rounded-tele p-2" type="number" min={1} max={5} />
        </label>
        <label className="block text-sm text-slate-600">
          Craving (1-5)
          <input className="mt-1 w-full border border-slate-200 rounded-tele p-2" type="number" min={1} max={5} />
        </label>
        <label className="block text-sm text-slate-600">
          Notes
          <textarea className="mt-1 w-full border border-slate-200 rounded-tele p-2" rows={3} placeholder="What helped today?" />
        </label>
        <button className="w-full bg-primary text-white py-2 rounded-tele shadow-subtle" type="button">
          Save check-in
        </button>
      </form>
    </Card>
  )
}

export default CheckIn
