import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './components/Layout'
import Protected from './components/Protected'
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
                <Chat />
              </Protected>
            }
          />
          <Route
            path="/check-in"
            element={
              <Protected>
                <CheckIn />
              </Protected>
            }
          />
          <Route
            path="/journal"
            element={
              <Protected>
                <Journal />
              </Protected>
            }
          />
          <Route
            path="/progress"
            element={
              <Protected>
                <Progress />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }
          />
          <Route
            path="/billing"
            element={
              <Protected>
                <Billing />
              </Protected>
            }
          />
          <Route
            path="/referrals"
            element={
              <Protected>
                <Referrals />
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
