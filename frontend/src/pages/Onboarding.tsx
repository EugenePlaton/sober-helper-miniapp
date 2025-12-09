import Card from '../components/Card'

const steps = ['Name', 'Dependency type', 'Quit date', 'Motivation', 'Goal', 'Assistant persona']

const Onboarding = () => {
  return (
    <div className="flex flex-col gap-3">
      <Card title="Onboarding" subtitle="Collect essentials to personalize support">
        <ol className="space-y-3 text-sm text-slate-700">
          {steps.map((step, idx) => (
            <li key={step} className="flex items-start gap-3">
              <span className="pill min-w-[32px] justify-center">{idx + 1}</span>
              <div>
                <p className="font-semibold text-slate-900">{step}</p>
                <p className="text-xs text-muted">Collect and validate this field, then move to the next step.</p>
              </div>
            </li>
          ))}
        </ol>
        <button className="btn-primary w-full mt-4">Continue</button>
      </Card>
    </div>
  )
}

export default Onboarding
