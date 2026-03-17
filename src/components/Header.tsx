import type { ServiceStatus } from '../types'

function Dot({ on, wait }: { on: boolean; wait?: boolean }) {
  const cls = wait
    ? 'bg-warn animate-pulse'
    : on
      ? 'bg-ok shadow-[0_0_6px_theme(colors.ok)]'
      : 'bg-fail'
  return <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${cls}`} />
}

export function Header({ status }: { status: ServiceStatus }) {
  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-dark-border bg-dark-card px-5 py-2.5">
      <h1 className="whitespace-nowrap text-lg font-bold text-accent">
        <span className="mr-1.5">🎬</span>Auto-Movie Studio
      </h1>

      <div className="ml-auto flex gap-5 text-sm">
        <span className="flex items-center gap-1.5">
          <Dot on={status.comfyui} /> ComfyUI
        </span>
        <span className="flex items-center gap-1.5">
          <Dot on={status.ollama} /> Ollama
        </span>
      </div>
    </header>
  )
}
