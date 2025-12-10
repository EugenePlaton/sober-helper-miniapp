import { ReactNode, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface Props {
  children: ReactNode
}

export const isProfileComplete = (user: any) => {
  if (!user) return false
  return user.dependency_type && user.goal && user.assistant_persona
}

const RequireProfile = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  const complete = useMemo(() => isProfileComplete(user), [user])

  if (!complete) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default RequireProfile
