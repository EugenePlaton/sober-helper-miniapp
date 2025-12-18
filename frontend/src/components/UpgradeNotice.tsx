import { Link } from 'react-router-dom'

const UpgradeNotice = ({ message }: { message?: string }) => (
  <div className="card p-3 border border-amber-200 bg-amber-50 text-amber-800 text-sm rounded-tele">
    <p className="font-semibold mb-1">Upgrade to continue</p>
    <p>{message || 'Free plan limit reached. Upgrade to unlock unlimited usage.'}</p>
    <Link to="/billing" className="inline-flex mt-2 text-primary font-semibold text-xs">
      Go to Billing →
    </Link>
  </div>
)

export default UpgradeNotice
