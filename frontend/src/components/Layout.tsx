import { ReactNode, useEffect } from 'react'
import Navigation from './Navigation'
import TopBar from './TopBar'
import { useAppStore } from '../store/appStore'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const theme = useAppStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="min-h-screen bg-surface text-slate-900">
      <TopBar />
      <main className="container-page px-4 pb-24 pt-6 flex flex-col gap-4">{children}</main>
      <Navigation />
    </div>
  )
}

export default Layout
