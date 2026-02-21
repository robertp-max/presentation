import { ReactNode } from 'react'
import { clsx } from 'clsx'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'blue'

const styles: Record<BadgeVariant, string> = {
  neutral: 'bg-brand-navyLight text-brand-navyDark',
  success: 'bg-brand-goldLight text-brand-navyDark',
  warning: 'bg-brand-cream text-brand-goldDark',
  danger: 'bg-rose-100 text-rose-800',
  blue: 'bg-brand-sky text-brand-navy',
}

export const Badge = ({ children, variant = 'neutral' }: { children: ReactNode; variant?: BadgeVariant }) => {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]',
        styles[variant],
      )}
    >
      {children}
    </span>
  )
}