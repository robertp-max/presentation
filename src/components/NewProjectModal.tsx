import { useState } from 'react'
import { createProject } from '../api'
import type { ServiceStatus } from '../types'

interface Props {
  status: ServiceStatus
  onClose: () => void
  onCreated: (name: string) => void
}

const SCENE_OPTIONS = [
  { value: 10, label: '10 scenes (~1.3 min)' },
  { value: 25, label: '25 scenes (~3.3 min)' },
  { value: 50, label: '50 scenes (~6.7 min)' },
  { value: 75, label: '75 scenes (~10 min)' },
  { value: 150, label: '150 scenes (~20 min)' },
  { value: 300, label: '300 scenes (~40 min)' },
  { value: 450, label: '450 scenes (~60 min)' },
]

const DEFAULT_MODELS = ['qwen3:30b', 'qwen3-coder:30b', 'qwen2.5-coder:32b']

export function NewProjectModal({ status, onClose, onCreated }: Props) {
  const [name, setName] = useState('')
  const [concept, setConcept] = useState('')
  const [scenes, setScenes] = useState(450)
  const [llm, setLlm] = useState('qwen3:30b')
  const [busy, setBusy] = useState(false)

  const models = status.ollama_models.length > 0 ? status.ollama_models : DEFAULT_MODELS

  const handleCreate = async () => {
    if (!name.trim()) return alert('Enter a project name')
    if (!concept.trim()) return alert('Enter a movie concept')
    setBusy(true)
    try {
      const result = await createProject({ name: name.trim(), concept: concept.trim(), scenes, llm_model: llm })
      if ('error' in result) {
        alert((result as any).error)
      } else {
        onCreated(result.name)
      }
    } catch (e: any) {
      alert('Failed to create project: ' + e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-[500px] max-w-[90vw] rounded-xl border border-dark-border bg-dark-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold">🎬 New Movie Project</h2>

        <div className="mb-3.5">
          <label className="mb-1 block text-xs font-semibold text-txt-dim">Project Name</label>
          <input
            className="w-full rounded-md border border-dark-border bg-dark-input px-3 py-2 text-sm text-txt placeholder-txt-dim focus:border-info focus:outline-none"
            placeholder="My Sci-Fi Movie"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="mb-3.5">
          <label className="mb-1 block text-xs font-semibold text-txt-dim">Movie Concept</label>
          <textarea
            className="w-full resize-y rounded-md border border-dark-border bg-dark-input px-3 py-2 text-sm text-txt placeholder-txt-dim focus:border-info focus:outline-none"
            rows={4}
            placeholder="A lone astronaut discovers an abandoned alien megastructure orbiting a dying star..."
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
        </div>

        <div className="mb-5 flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-semibold text-txt-dim">Number of Scenes</label>
            <select
              className="w-full rounded-md border border-dark-border bg-dark-input px-3 py-2 text-sm text-txt focus:border-info focus:outline-none"
              value={scenes}
              onChange={(e) => setScenes(Number(e.target.value))}
            >
              {SCENE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-semibold text-txt-dim">LLM Model</label>
            <select
              className="w-full rounded-md border border-dark-border bg-dark-input px-3 py-2 text-sm text-txt focus:border-info focus:outline-none"
              value={llm}
              onChange={(e) => setLlm(e.target.value)}
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-dark-border px-4 py-2 text-sm font-semibold text-txt hover:bg-dark-input"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={busy}
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {busy ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  )
}
