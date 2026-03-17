import { useState } from 'react'
import type { Scene } from '../types'

interface Props {
  scenes: Scene[]
  renderedSet: Set<string>
  onEdit: (index: number) => void
}

export function ScenesTable({ scenes, renderedSet, onEdit }: Props) {
  const [showAll, setShowAll] = useState(false)
  const display = showAll ? scenes : scenes.slice(0, 100)

  if (scenes.length === 0) {
    return (
      <p className="text-sm text-txt-dim">
        No scenes generated yet. Click &quot;Generate&quot; to start.
      </p>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-[11px] text-txt-dim">
              <th className="px-2.5 py-2">#</th>
              <th className="px-2.5 py-2">Scene</th>
              <th className="px-2.5 py-2">Prompt</th>
              <th className="px-2.5 py-2 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {display.map((s, i) => {
              const rendered = renderedSet.has(s.id)
              return (
                <tr key={s.id} className="group border-b border-dark-border hover:bg-dark-input">
                  <td className="w-10 px-2.5 py-2 text-sm text-txt-dim">{i + 1}</td>
                  <td className="w-52 px-2.5 py-2">
                    <div className="text-sm font-semibold">{s.title || 'Untitled'}</div>
                    {rendered ? (
                      <span className="mt-0.5 inline-block rounded bg-ok/15 px-1.5 py-0.5 text-[10px] font-semibold text-ok">
                        ✅ Rendered
                      </span>
                    ) : (
                      <span className="mt-0.5 inline-block rounded bg-info/15 px-1.5 py-0.5 text-[10px] font-semibold text-info">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="max-w-[500px] truncate px-2.5 py-2 text-xs text-txt-dim" title={s.prompt}>
                    {(s.prompt || '').slice(0, 120)}...
                  </td>
                  <td className="w-16 px-2.5 py-2 text-right">
                    <button
                      onClick={() => onEdit(i)}
                      className="rounded border border-dark-border px-2 py-0.5 text-[11px] text-txt opacity-0 transition-opacity hover:bg-dark-input group-hover:opacity-100"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {scenes.length > 100 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-2 text-xs text-info hover:underline"
        >
          Show all {scenes.length} scenes (showing first 100)
        </button>
      )}
    </>
  )
}
