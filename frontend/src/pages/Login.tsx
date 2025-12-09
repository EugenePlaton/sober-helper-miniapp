import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Card from '../components/Card'
import { authApi } from '../api'
import { useAuthStore } from '../store/authStore'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useAuthStore((s) => s.user)
  const clear = useAuthStore((s) => s.clear)

  const login = useMutation({
    mutationFn: () => authApi.login({ email, password }),
  })

  const register = useMutation({
    mutationFn: () => authApi.register({ email, password }),
  })

  return (
    <Card title="Login" subtitle="Telegram or email/password">
      <p className="text-sm text-muted leading-relaxed">
        This is a placeholder login screen. Integrate Telegram Mini App login and email/password JWT flow.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <input
          className="input-field"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="flex-1 btn-primary disabled:opacity-60"
            disabled={login.isPending}
            onClick={() => login.mutate()}
          >
            {login.isPending ? 'Signing in…' : 'Email login'}
          </button>
          <button
            className="flex-1 btn-ghost disabled:opacity-60"
            disabled={register.isPending}
            onClick={() => register.mutate()}
          >
            {register.isPending ? 'Creating…' : 'Register'}
          </button>
        </div>
        <div className="text-xs text-muted">
          {login.isError && <p className="text-red-500">Login failed: {(login.error as Error).message}</p>}
          {register.isError && <p className="text-red-500">Register failed: {(register.error as Error).message}</p>}
          {user ? (
            <div className="flex items-center justify-between bg-surface p-2 rounded-tele border border-border">
              <p>Signed in as {user.email || user.telegram_id}</p>
              <button className="text-primary text-xs" onClick={clear}>
                Logout
              </button>
            </div>
          ) : (
            <p>Tokens will be stored locally after auth.</p>
          )}
        </div>
      </div>
    </Card>
  )
}

export default Login
