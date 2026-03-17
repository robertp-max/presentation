import { useEffect, useRef } from 'react'
import type { TaskInfo } from '../types'
import { ProgressBar } from './ProgressBar'

interface Props {
  task: TaskInfo
  onCancel: () => void
}

const TYPE_LABELS: Record<string, string> = {
  generate: 'Generating Scenes',
  render: 'Rendering Videos',
  stitch: 'Stitching Movie',
}

export function TaskPanel({ task, onCancel }: Props) {
  const termRef = useRef<HTMLPreElement>(null)
  const pct = task.total > 0 ? Math.round((100 * task.progress) / task.total) : 0
  const elapsed = ((task.ended || Date.now() / 1000) - task.started)
  const elapsedStr = elapsed > 60 ? `${Math.round(elapsed / 60)}m` : `${Math.round(elapsed)}s`

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [task.output])

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">{TYPE_LABELS[task.type] || task.type}</h2>
        {task.status === 'running' && (
          <button
            onClick={onCancel}
            className="rounded-md bg-fail px-2.5 py-1 text-xs font-semibold text-white hover:opacity-90"
          >
            Cancel
          </button>
        )}
      </div>

      <ProgressBar value={task.progress} max={task.total} done={task.status === 'completed'} className="mt-3" />

      <p className="mt-1 text-xs text-txt-dim">
        {task.progress}/{task.total || '?'} ({pct}%) — {elapsedStr} elapsed — {task.status}
      </p>

      <pre
        ref={termRef}
        className="mt-3 max-h-72 overflow-y-auto whitespace-pre-wrap break-all rounded-md border border-dark-border bg-black p-3 font-mono text-xs leading-relaxed text-gray-300"
      >
        {(task.output ?? []).join('\n')}
      </pre>
    </div>
  )
}
