import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import { checkInApi } from '../api'
import { useAuthStore } from '../store/authStore'

const Progress = () => {
  const user = useAuthStore((s) => s.user)

  const checkIns = useQuery({
    queryKey: ['check-ins', 30],
    queryFn: () => checkInApi.list(30),
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
      <Card title="Achievements & sharing">
        <p className="text-sm text-slate-700">
          Share your streak with friends or accountability buddies. Unlock badges for 7, 14, 30 days and keep a public
          page.
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">Public link</p>
            <p className="font-semibold text-slate-900 break-all">sober.app/u/you</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">Followers</p>
            <p className="text-2xl font-semibold">3</p>
          </div>
          <div className="card p-3 border border-border col-span-2">
            <p className="text-xs text-muted">Next badge</p>
            <p className="text-slate-800">10 days streak → “Starter Streak”.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Progress
