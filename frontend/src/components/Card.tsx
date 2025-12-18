import { ReactNode } from 'react'

interface Props {
  title?: string
  children: ReactNode
  subtitle?: string
  muted?: boolean
}

const Card = ({ title, subtitle, children, muted }: Props) => (
  <section
    className={`card p-4 border ${muted ? 'border-transparent bg-surface' : 'border-border'}`}
  >
    {title && <p className="font-semibold text-slate-900 mb-1">{title}</p>}
    {subtitle && <p className="text-sm text-muted mb-2">{subtitle}</p>}
    {children}
  </section>
)

export default Card
