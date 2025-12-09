import Card from '../components/Card'

const Billing = () => (
  <Card title="Billing" subtitle="Freemium vs Pro">
    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
      <li>Free: limited chat, basic check-ins, streak counter.</li>
      <li>Pro: unlimited chat, advanced analytics, coping plans, early access.</li>
      <li>Integrate Stripe / YooKassa / CryptoCloud on the backend.</li>
    </ul>
    <button className="mt-3 w-full btn-primary">Upgrade</button>
  </Card>
)

export default Billing
