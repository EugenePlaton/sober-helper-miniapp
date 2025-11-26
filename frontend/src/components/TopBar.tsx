import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/appStore'

const TopBar = () => {
  const { t, i18n } = useTranslation()
  const persona = useAppStore((s) => s.assistantPersona)

  const toggleLanguage = () => {
    const next = i18n.language === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(next)
  }

  return (
    <header className="sticky top-0 z-10 bg-surface/90 backdrop-blur-sm border-b border-slate-100">
      <div className="container-page px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">{t('appSubtitle')}</p>
          <p className="font-semibold text-lg">{t('appTitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-white shadow-subtle">{t(`personas.${persona}`)}</span>
          <button
            onClick={toggleLanguage}
            className="text-sm px-3 py-1 rounded-full bg-primary text-white shadow-subtle hover:bg-primary-dark"
          >
            {i18n.language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopBar
