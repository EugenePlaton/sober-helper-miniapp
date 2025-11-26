import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Layout from './components/Layout'
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
          <Route path="/chat" element={<Chat />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
