import Card from '../components/Card'

const Login = () => {
  return (
    <Card title="Login" subtitle="Telegram or email/password">
      <p className="text-sm text-slate-600">
        This is a placeholder login screen. Integrate Telegram Mini App login and email/password JWT flow.
      </p>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-primary text-white py-2 rounded-tele shadow-subtle">Telegram</button>
        <button className="flex-1 bg-white text-slate-700 py-2 rounded-tele border border-slate-200">Email</button>
      </div>
    </Card>
  )
}

export default Login
