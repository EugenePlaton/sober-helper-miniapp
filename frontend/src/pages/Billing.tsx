import { useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import { subscriptionApi } from '../api'
import { useAuthStore } from '../store/authStore'

const Billing = () => {
  const user = useAuthStore((s) => s.user)
  const subQuery = useQuery({
    queryKey: ['subscription'],
    queryFn: () => subscriptionApi.get(),
    enabled: !!user,
  })

  if (!user) {
    return (
      <Card title="Billing" subtitle="Freemium vs Pro">
        <p className="text-sm text-muted">Login to view your plan and limits.</p>
      </Card>
    )
  }

  return (
    <Card title="Billing" subtitle="Freemium vs Pro">
      <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
        <li>Free: limited chat, basic check-ins, streak counter.</li>
        <li>Pro: unlimited chat, advanced analytics, coping plans, early access.</li>
        <li>Integrate Stripe / YooKassa / CryptoCloud on the backend.</li>
      </ul>
      <div className="mt-3 text-sm text-slate-800">
        {subQuery.isLoading && <p className="text-muted">Loading subscription…</p>}
        {subQuery.data && (
          <p>
            Current: <strong>{subQuery.data.plan}</strong> ({subQuery.data.active ? 'active' : 'inactive'})
          </p>
        )}
        {subQuery.isError && <p className="text-red-500 text-xs">{(subQuery.error as Error).message}</p>}
      </div>
      <button className="mt-3 w-full btn-primary">Upgrade</button>
    </Card>
  )
}

export default Billing
