import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuthStore } from '../store/authStore'

interface Props {
  children: ReactNode
}

const Protected = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default Protected
