import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/chat', labelKey: 'nav.chat' },
  { to: '/check-in', labelKey: 'nav.checkIn' },
  { to: '/journal', labelKey: 'nav.journal' },
  { to: '/settings', labelKey: 'nav.settings' },
]

const Navigation = () => {
  const { t } = useTranslation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-subtle">
      <div className="container-page px-4 py-2 grid grid-cols-5 text-center text-sm">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `py-2 rounded-tele transition-colors ${isActive ? 'text-primary font-semibold' : 'text-slate-500'}`
            }
          >
            {t(link.labelKey)}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
