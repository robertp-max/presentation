import { LayoutDashboard, Plus, Settings } from 'lucide-react'
import type { ProjectSummary } from '../types'

type Page = 'dashboard' | 'services' | { project: string }

const STATUS_ICON: Record<string, string> = {
  created: '⚪',
  generating: '⚡',
  generated: '✅',
  rendering: '🎬',
  rendered: '✅',
  stitching: '🎥',
  complete: '🌟',
}

interface Props {
  activePage: Page
  projects: ProjectSummary[]
  onNavigate: (page: Page) => void
  onNewProject: () => void
}

export function Sidebar({ activePage, projects, onNavigate, onNewProject }: Props) {
  const isActive = (page: Page) => {
    if (typeof activePage === 'string' && typeof page === 'string') return activePage === page
    if (typeof activePage === 'object' && typeof page === 'object')
      return activePage.project === page.project
    return false
  }

  const navBtn = (page: Page, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => onNavigate(page)}
      className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors ${
        isActive(page) ? 'bg-accent text-white' : 'text-txt hover:bg-dark-input'
      }`}
    >
      {icon}
      {label}
    </button>
  )

  return (
    <aside className="flex w-64 min-w-[256px] flex-col overflow-hidden border-r border-dark-border bg-dark-card">
      {/* Nav */}
      <div className="px-4 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-wider text-txt-dim">
        Navigation
      </div>
      {navBtn('dashboard', <LayoutDashboard size={15} />, 'Dashboard')}
      {navBtn('services', <Settings size={15} />, 'Services')}

      <div className="mx-4 my-2 border-t border-dark-border" />

      <div className="px-4 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-txt-dim">
        Movie Projects
      </div>
      <button
        onClick={onNewProject}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold text-ok hover:bg-dark-input"
      >
        <Plus size={15} /> New Movie Project
      </button>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="px-4 py-3 text-xs text-txt-dim">No projects yet</div>
        ) : (
          projects.map((p) => (
            <button
              key={p.name}
              onClick={() => onNavigate({ project: p.name })}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors ${
                typeof activePage === 'object' && activePage.project === p.name
                  ? 'bg-accent text-white'
                  : 'text-txt hover:bg-dark-input'
              }`}
            >
              <span>{STATUS_ICON[p.status] || '⚪'}</span>
              <span className="truncate">{p.display_name}</span>
              <span
                className={`ml-auto rounded-full px-1.5 py-0.5 text-[11px] ${
                  typeof activePage === 'object' && activePage.project === p.name
                    ? 'bg-white/20'
                    : 'bg-dark-input'
                }`}
              >
                {p.rendered_clips || 0}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  )
}

export type { Page }
