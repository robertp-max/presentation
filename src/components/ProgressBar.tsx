interface Props {
  value: number
  max: number
  done?: boolean
  className?: string
}

export function ProgressBar({ value, max, done, className }: Props) {
  const pct = max > 0 ? Math.min(100, Math.round((100 * value) / max)) : 0
  return (
    <div className={`h-1 overflow-hidden rounded-full bg-dark-border ${className ?? ''}`}>
      <div
        className={`h-full rounded-full transition-[width] duration-500 ${done ? 'bg-ok' : 'bg-accent'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
