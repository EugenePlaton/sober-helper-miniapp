import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import { checkInApi, chatApi } from '../api'
import { useAuthStore } from '../store/authStore'

const Progress = () => {
  const user = useAuthStore((s) => s.user)

  const checkIns = useQuery({
    queryKey: ['check-ins', 30],
    queryFn: () => checkInApi.list(30),
    enabled: !!user,
  })

  const summary = useQuery({
    queryKey: ['chat-summary'],
    queryFn: () => chatApi.summary(),
    enabled: !!user,
  })

  const stats = useMemo(() => {
    const data = checkIns.data || []
    const total = data.length
    const avgCraving = total ? (data.reduce((acc, c) => acc + (c.craving_level || 0), 0) / total).toFixed(1) : '0'
    const slipped = data.filter((c) => c.slipped).length
    return { total, avgCraving, slipped }
  }, [checkIns.data])

  if (!user) {
    return (
      <Card title="Progress" subtitle="Login to see your stats">
        <p className="text-sm text-muted">Sign in to fetch check-ins and chat summary.</p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title="Progress snapshot" subtitle="Charts and insights placeholder">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">Check-ins</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">Craving avg</p>
            <p className="text-2xl font-semibold">{stats.avgCraving}</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">Relapses</p>
            <p className="text-2xl font-semibold">{stats.slipped}</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">Mood trend</p>
            <p className="text-2xl font-semibold">—</p>
          </div>
        </div>
        {checkIns.isError && <p className="text-xs text-red-500 mt-2">Error: {(checkIns.error as Error).message}</p>}
      </Card>
      <Card title="AI analysis">
        {summary.isLoading && <p className="text-sm text-muted">Loading summary…</p>}
        {summary.isError && <p className="text-sm text-red-500">{(summary.error as Error).message}</p>}
        <p className="text-sm text-slate-700 whitespace-pre-wrap">
          {summary.data?.summary || 'Send chat messages to generate summary with triggers and trends.'}
        </p>
      </Card>
    </div>
  )
}

export default Progress
