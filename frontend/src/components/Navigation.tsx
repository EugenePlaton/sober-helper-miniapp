import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  { to: '/', labelKey: 'nav.home', icon: '🏠' },
  { to: '/chat', labelKey: 'nav.chat', icon: '💬' },
  { to: '/check-in', labelKey: 'nav.checkIn', icon: '☀️' },
  { to: '/progress', labelKey: 'nav.progress', icon: '📈' },
]

const Navigation = () => {
  const { t } = useTranslation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-strong/95 backdrop-blur-md border-t border-border shadow-subtle">
      <div className="container-page px-4 py-2 grid grid-cols-4 text-center text-sm">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `py-2 rounded-tele transition-colors flex flex-col items-center gap-1 ${
                isActive ? 'text-primary font-semibold' : 'text-slate-500'
              }`
            }
          >
            <span aria-hidden>{link.icon}</span>
            {t(link.labelKey)}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
