interface Props {
  label: string
  value: string | number
  color?: string
}

export function StatCard({ label, value, color }: Props) {
  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-4">
      <div className="text-[11px] uppercase text-txt-dim">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${color || 'text-txt'}`}>{value}</div>
    </div>
  )
}
