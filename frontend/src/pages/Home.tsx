import Card from '../components/Card'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Home = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-4">
      <Card title={t('home.streak')} subtitle="7 days">
        <p className="text-4xl font-bold text-primary">7</p>
        <p className="text-sm text-slate-500">{t('home.goal')}: 30 days</p>
      </Card>
      <Card title={t('home.motivation')}>
        <p className="text-slate-700 text-sm">
          Stay consistent. Your AI buddy will nudge you with coping strategies and trend insights.
        </p>
      </Card>
      <Card title={t('home.quick')}>
        <div className="grid grid-cols-2 gap-3">
          <Link className="card p-3 text-center border border-slate-100" to="/chat">
            {t('cta.chat')}
          </Link>
          <Link className="card p-3 text-center border border-slate-100" to="/check-in">
            {t('cta.checkIn')}
          </Link>
          <Link className="card p-3 text-center border border-slate-100" to="/journal">
            {t('cta.journal')}
          </Link>
          <Link className="card p-3 text-center border border-slate-100" to="/progress">
            {t('cta.progress')}
          </Link>
          <Link className="card p-3 text-center border border-slate-100" to="/billing">
            {t('cta.billing')}
          </Link>
          <Link className="card p-3 text-center border border-slate-100" to="/referrals">
            {t('cta.referrals')}
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Home
