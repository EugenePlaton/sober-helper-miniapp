import Card from '../components/Card'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Home = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-4 pb-4">
      <section className="card border border-transparent bg-gradient-to-r from-primary to-accent text-white p-5 shadow-float">
        <p className="text-sm opacity-90">{t('home.streak')}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-5xl font-bold">7</span>
          <span className="text-sm opacity-80">days</span>
        </div>
        <p className="text-sm opacity-90 mt-1">{t('home.goal')}: 30 days</p>
        <div className="mt-3 flex gap-2">
          <Link to="/check-in" className="btn btn-ghost bg-white/15 text-white border-white/30">
            {t('cta.checkIn')}
          </Link>
          <Link to="/chat" className="btn btn-primary bg-white text-primary hover:shadow-float">
            {t('cta.chat')}
          </Link>
        </div>
      </section>

      <Card title={t('home.motivation')}>
        <p className="text-slate-700 text-sm leading-relaxed">
          Stay consistent. Your AI buddy will nudge you with coping strategies and trend insights. Take a check-in when
          your craving spikes or mood dips.
        </p>
      </Card>

      <Card title={t('home.quick')} subtitle="Focus on the essentials">
        <div className="grid grid-cols-2 gap-3">
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/chat">
            <p className="text-sm font-semibold text-slate-900">{t('cta.chat')}</p>
            <p className="text-xs text-muted mt-1">SOS, craving, quick coping tools</p>
          </Link>
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/check-in">
            <p className="text-sm font-semibold text-slate-900">{t('cta.checkIn')}</p>
            <p className="text-xs text-muted mt-1">Mood, craving, notes</p>
          </Link>
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/progress">
            <p className="text-sm font-semibold text-slate-900">{t('cta.progress')}</p>
            <p className="text-xs text-muted mt-1">Streak, triggers, trends</p>
          </Link>
          <Link className="card p-3 text-left border border-border hover:border-primary/60 transition" to="/journal">
            <p className="text-sm font-semibold text-slate-900">{t('cta.journal')}</p>
            <p className="text-xs text-muted mt-1">Free writing</p>
          </Link>
        </div>
      </Card>

      <Card title="SOS — craving" subtitle="Ground quickly">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <button className="btn-ghost">Breathing 4-7-8</button>
          <button className="btn-ghost">Grounding 5-4-3-2-1</button>
          <button className="btn-ghost">Cold water splash</button>
          <button className="btn-ghost">Short walk + music</button>
        </div>
      </Card>
    </div>
  )
}

export default Home
