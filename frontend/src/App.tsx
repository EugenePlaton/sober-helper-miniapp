import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Layout from './components/Layout'
import Protected from './components/Protected'
import RequireProfile from './components/RequireProfile'
import { useQuery } from '@tanstack/react-query'
import { profileApi } from './api'
import { useAuthStore } from './store/authStore'
import Home from './pages/Home'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Chat from './pages/Chat'
import CheckIn from './pages/CheckIn'
import Journal from './pages/Journal'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import Billing from './pages/Billing'
import Referrals from './pages/Referrals'

function App() {
  const hasToken = useAuthStore((s) => Boolean(s.accessToken))
  const setUser = useAuthStore((s) => s.setUser)

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => profileApi.me(),
    enabled: hasToken,
  })

  useEffect(() => {
    if (meQuery.data) setUser(meQuery.data)
  }, [meQuery.data, setUser])

  return (
    <Layout>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/chat"
            element={
              <Protected>
                <RequireProfile>
                  <Chat />
                </RequireProfile>
              </Protected>
            }
          />
          <Route
            path="/check-in"
            element={
              <Protected>
                <RequireProfile>
                  <CheckIn />
                </RequireProfile>
              </Protected>
            }
          />
          <Route
            path="/journal"
            element={
              <Protected>
                <RequireProfile>
                  <Journal />
                </RequireProfile>
              </Protected>
            }
          />
          <Route
            path="/progress"
            element={
              <Protected>
                <RequireProfile>
                  <Progress />
                </RequireProfile>
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <RequireProfile>
                  <Settings />
                </RequireProfile>
              </Protected>
            }
          />
          <Route
            path="/billing"
            element={
              <Protected>
                <RequireProfile>
                  <Billing />
                </RequireProfile>
              </Protected>
            }
          />
          <Route
            path="/referrals"
            element={
              <Protected>
                <RequireProfile>
                  <Referrals />
                </RequireProfile>
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
