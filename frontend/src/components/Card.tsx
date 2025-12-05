import { ReactNode } from 'react'

interface Props {
  title?: string
  children: ReactNode
  subtitle?: string
}

const Card = ({ title, subtitle, children }: Props) => (
  <section className="card p-4 border border-slate-100">
    {title && <p className="font-semibold text-slate-800 mb-1">{title}</p>}
    {subtitle && <p className="text-sm text-slate-500 mb-2">{subtitle}</p>}
    {children}
  </section>
)

export default Card
