import Card from '../components/Card'

const steps = [
  'Name',
  'Dependency type',
  'Quit date',
  'Motivation',
  'Goal',
  'Assistant persona',
]

const Onboarding = () => {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step) => (
        <Card key={step} title={step}>
          <p className="text-sm text-slate-600">Collect and validate this field, then move to the next step.</p>
        </Card>
      ))}
      <button className="bg-primary text-white py-3 rounded-tele shadow-subtle">Continue</button>
    </div>
  )
}

export default Onboarding
