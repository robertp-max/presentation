import { useState } from 'react'
import type { Scene } from '../types'

interface Props {
  scene: Scene
  index: number
  onClose: () => void
  onSave: (index: number, title: string, prompt: string) => void
}

export function EditSceneModal({ scene, index, onClose, onSave }: Props) {
  const [title, setTitle] = useState(scene.title)
  const [prompt, setPrompt] = useState(scene.prompt)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-[650px] max-w-[90vw] rounded-xl border border-dark-border bg-dark-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold">Edit Scene #{index + 1}</h2>

        <div className="mb-3.5">
          <label className="mb-1 block text-xs font-semibold text-txt-dim">Scene Title</label>
          <input
            className="w-full rounded-md border border-dark-border bg-dark-input px-3 py-2 text-sm text-txt focus:border-info focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-xs font-semibold text-txt-dim">Scene Prompt</label>
          <textarea
            className="min-h-[200px] w-full resize-y rounded-md border border-dark-border bg-dark-input px-3 py-2 text-sm text-txt focus:border-info focus:outline-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-dark-border px-4 py-2 text-sm font-semibold text-txt hover:bg-dark-input"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(index, title, prompt)}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
