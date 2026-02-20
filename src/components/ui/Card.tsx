import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export const Card = ({ children, className, title }: CardProps) => {
  return (
    <div className={twMerge('rounded-lg border border-brand-navyLight bg-white p-6 shadow-sm', className)}>
      {title && <h3 className="mb-4 text-lg font-semibold text-brand-navy">{title}</h3>}
      {children}
    </div>
  )
}