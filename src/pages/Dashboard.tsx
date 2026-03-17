import { ProgressBar } from '../components/ProgressBar'
import { StatCard } from '../components/StatCard'
import type { ProjectSummary, ServiceStatus, TaskInfo } from '../types'

interface Props {
  status: ServiceStatus
  projects: ProjectSummary[]
  tasks: Record<string, TaskInfo>
  onSelectProject: (name: string) => void
}

export function Dashboard({ status, projects, tasks, onSelectProject }: Props) {
  const totalClips = projects.reduce((s, p) => s + (p.rendered_clips || 0), 0)
  const completed = projects.filter((p) => p.has_movie).length
  const running = Object.values(tasks).filter((t) => t.status === 'running')

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Dashboard</h2>

      <div className="mb-5 grid grid-cols-4 gap-3">
        <StatCard label="Projects" value={projects.length} />
        <StatCard label="Rendered Clips" value={totalClips} />
        <StatCard label="Completed Movies" value={completed} />
        <StatCard
          label="ComfyUI"
          value={status.comfyui ? 'Online' : 'Offline'}
          color={status.comfyui ? 'text-ok' : 'text-fail'}
        />
      </div>

      <div className="rounded-lg border border-dark-border bg-dark-card p-5">
        <h2 className="mb-3 text-base font-semibold">Active Tasks</h2>
        {running.length === 0 ? (
          <p className="text-sm text-txt-dim">No active tasks</p>
        ) : (
          running.map((t) => {
            const pct = t.total > 0 ? Math.round((100 * t.progress) / t.total) : 0
            return (
              <div
                key={t.id}
                className="cursor-pointer border-b border-dark-border py-2 last:border-b-0 hover:bg-dark-bg/50"
                onClick={() => onSelectProject(t.project)}
              >
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {t.type} — <strong>{t.project}</strong>
                  </span>
                  <span>{pct}%</span>
                </div>
                <ProgressBar value={t.progress} max={t.total} className="mt-2" />
              </div>
            )
          })
        )}
      </div>

      {/* Project list */}
      <div className="mt-4 rounded-lg border border-dark-border bg-dark-card p-5">
        <h2 className="mb-3 text-base font-semibold">Projects</h2>
        {projects.length === 0 ? (
          <p className="text-sm text-txt-dim">No projects yet</p>
        ) : (
          <div className="space-y-1">
            {projects.map((p) => (
              <button
                key={p.name}
                onClick={() => onSelectProject(p.name)}
                className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm hover:bg-dark-bg/60"
              >
                <span>{p.display_name}</span>
                <span className="text-xs text-txt-dim">{p.status}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
