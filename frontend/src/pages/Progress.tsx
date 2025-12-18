import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../components/Card'
import { checkInApi } from '../api'
import { useAuthStore } from '../store/authStore'
import { useTranslation } from 'react-i18next'

const Progress = () => {
  const { t } = useTranslation()
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
      <Card title={t('progress.title')} subtitle={t('progress.login')}>
        <p className="text-sm text-muted">{t('progress.loginHelp')}</p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('progress.snapshotTitle')} subtitle={t('progress.snapshotSubtitle')}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('progress.checkins')}</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('progress.craving')}</p>
            <p className="text-2xl font-semibold">{stats.avgCraving}</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('progress.relapses')}</p>
            <p className="text-2xl font-semibold">{stats.slipped}</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('progress.mood')}</p>
            <p className="text-2xl font-semibold">—</p>
          </div>
        </div>
        {checkIns.isError && (
          <p className="text-xs text-red-500 mt-2">
            {t('progress.error', { message: (checkIns.error as Error).message })}
          </p>
        )}
      </Card>
      <Card title={t('progress.achievementsTitle')}>
        <p className="text-sm text-slate-700">{t('progress.achievementsText')}</p>
        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('progress.publicLink')}</p>
            <p className="font-semibold text-slate-900 break-all">sober.app/u/you</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('progress.followers')}</p>
            <p className="text-2xl font-semibold">3</p>
          </div>
          <div className="card p-3 border border-border col-span-2">
            <p className="text-xs text-muted">{t('progress.nextBadge')}</p>
            <p className="text-slate-800">{t('progress.nextBadgeText')}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Progress
