import Card from '../components/Card'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { differenceInCalendarDays } from '../utils/dates'

const Home = () => {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)
  const quitDate = user?.quit_date ? new Date(user.quit_date) : null
  const streak = quitDate ? Math.max(1, differenceInCalendarDays(new Date(), quitDate) + 1) : 0

  return (
    <div className="flex flex-col gap-4 pb-4">
      <section className="card border border-border bg-white text-slate-900 p-5 shadow-float">
        <p className="text-sm text-muted">{t('home.streak')}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-5xl font-bold text-primary">{streak || '—'}</span>
          <span className="text-sm text-slate-600">{t('home.days')}</span>
        </div>
        <p className="text-sm text-slate-700 mt-1">
          {t('home.goal')}: {user?.goal || '—'}
        </p>
        <div className="mt-3 flex gap-2">
          <Link to="/check-in" className="btn-ghost flex-1 text-primary border border-primary">
            {t('cta.checkIn')}
          </Link>
          <Link to="/chat" className="btn-primary flex-1">
            {t('cta.chat')}
          </Link>
        </div>
      </section>

      <Card title={t('home.motivation')}>
        <p className="text-slate-700 text-sm leading-relaxed">
          {user?.motivation ||
            t('home.motivationText', 'Stay consistent. Your AI buddy will nudge you with coping strategies.')}
        </p>
      </Card>

      <Card title={t('home.quick')} subtitle={t('home.quickSubtitle')}>
        <div className="grid grid-cols-2 gap-3">
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/chat">
            <p className="text-sm font-semibold text-slate-900">{t('cta.chat')}</p>
            <p className="text-xs text-muted mt-1">{t('home.quickChat')}</p>
          </Link>
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/check-in">
            <p className="text-sm font-semibold text-slate-900">{t('cta.checkIn')}</p>
            <p className="text-xs text-muted mt-1">{t('home.quickCheckin')}</p>
          </Link>
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/progress">
            <p className="text-sm font-semibold text-slate-900">{t('cta.progress')}</p>
            <p className="text-xs text-muted mt-1">{t('home.quickProgress')}</p>
          </Link>
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/journal">
            <p className="text-sm font-semibold text-slate-900">{t('cta.journal')}</p>
            <p className="text-xs text-muted mt-1">{t('home.quickJournal')}</p>
          </Link>
        </div>
      </Card>

      <Card title={t('home.sosTitle')} subtitle={t('home.sosSubtitle')}>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <button className="btn-ghost">{t('home.sos1')}</button>
          <button className="btn-ghost">{t('home.sos2')}</button>
          <button className="btn-ghost">{t('home.sos3')}</button>
          <button className="btn-ghost">{t('home.sos4')}</button>
        </div>
      </Card>

      <Card title={t('home.achievements')} subtitle={t('home.achievementsSubtitle')} muted>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('home.achievementsDays')}</p>
            <p className="text-2xl font-semibold">7</p>
          </div>
          <div className="card p-3 border border-border">
            <p className="text-xs text-muted">{t('home.achievementsFollowers')}</p>
            <p className="text-2xl font-semibold">3</p>
          </div>
          <div className="card p-3 border border-border col-span-2">
            <p className="text-xs text-muted">{t('home.achievementsNext')}</p>
            <p className="text-slate-800">{t('home.achievementsNextText')}</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn-ghost w-full">{t('home.shareProgress')}</button>
          <Link to="/progress" className="btn-primary w-full text-center">
            {t('home.viewProfile')}
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Home
