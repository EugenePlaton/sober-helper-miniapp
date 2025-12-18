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
    <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="container-page px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">{t('appSubtitle')}</p>
          <p className="font-semibold text-xl tracking-tight">{t('appTitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="pill">{t(`personas.${persona}`)}</span>
          <button
            onClick={toggleLanguage}
            className="text-sm px-3 py-1 rounded-full bg-primary text-white shadow-subtle hover:shadow-float"
          >
            {i18n.language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopBar
