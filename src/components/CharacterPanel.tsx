import { useState } from 'react'
import * as api from '../api'
import type { Character } from '../types'

interface Props {
  projectName: string
  characters: Character[]
  onUpdate: () => void
}

const emptyChar: Character = {
  name: '',
  appearance: '',
  personality: '',
  voice_description: '',
  voice_sample: '',
}

export function CharacterPanel({ projectName, characters, onUpdate }: Props) {
  const [editing, setEditing] = useState<{ char: Character; index: number | null } | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!editing || !editing.char.name.trim()) return
    setSaving(true)
    try {
      await api.saveCharacter(
        projectName,
        editing.char,
        editing.index ?? undefined
      )
      setEditing(null)
      onUpdate()
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (idx: number) => {
    if (!confirm(`Delete character "${characters[idx].name}"?`)) return
    await api.deleteCharacter(projectName, idx)
    onUpdate()
  }

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">
          Characters{' '}
          <span className="text-sm text-txt-dim">
            ({characters.length} defined)
          </span>
        </h2>
        <button
          onClick={() => setEditing({ char: { ...emptyChar }, index: null })}
          className="rounded bg-accent px-3 py-1 text-xs font-semibold text-white hover:bg-accent-hover"
        >
          + Add Character
        </button>
      </div>

      <p className="mb-3 text-xs text-txt-dim">
        Characters defined here are injected into every LLM scene prompt as a
        &quot;character bible&quot; — ensuring consistent appearance across all scenes.
        Add characters <strong>before</strong> generating scenes.
      </p>

      {/* Character cards */}
      {characters.length === 0 && !editing && (
        <div className="rounded border border-dashed border-dark-border p-6 text-center text-sm text-txt-dim">
          No characters yet. Add characters to maintain visual consistency
          across scenes.
        </div>
      )}

      <div className="space-y-3">
        {characters.map((ch, idx) => (
          <div
            key={idx}
            className="rounded-md border border-dark-border bg-dark-bg p-4"
          >
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-sm font-bold text-accent">{ch.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing({ char: { ...ch }, index: idx })}
                  className="text-xs text-info hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-xs text-fail hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div>
                <span className="font-semibold text-txt-dim">Appearance:</span>{' '}
                <span className="text-txt">{ch.appearance || '—'}</span>
              </div>
              <div>
                <span className="font-semibold text-txt-dim">Personality:</span>{' '}
                <span className="text-txt">{ch.personality || '—'}</span>
              </div>
              <div>
                <span className="font-semibold text-txt-dim">Voice:</span>{' '}
                <span className="text-txt">{ch.voice_description || '—'}</span>
              </div>
              {ch.voice_sample && (
                <div>
                  <span className="font-semibold text-txt-dim">Voice sample:</span>{' '}
                  <span className="text-ok">{ch.voice_sample}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-lg border border-dark-border bg-dark-card p-6">
            <h3 className="mb-4 text-base font-semibold">
              {editing.index !== null ? 'Edit Character' : 'Add Character'}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-txt-dim">
                  Name *
                </label>
                <input
                  value={editing.char.name}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      char: { ...editing.char, name: e.target.value },
                    })
                  }
                  className="w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-sm text-txt focus:border-accent focus:outline-none"
                  placeholder="e.g. Sarah Chen"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-txt-dim">
                  Appearance (physical description for video prompts)
                </label>
                <textarea
                  value={editing.char.appearance}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      char: { ...editing.char, appearance: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-sm text-txt focus:border-accent focus:outline-none"
                  placeholder="e.g. East Asian woman, mid-30s, black shoulder-length hair, sharp jawline, wearing a dark navy flight suit with silver mission patches..."
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-txt-dim">
                  Personality / Behavior
                </label>
                <textarea
                  value={editing.char.personality}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      char: { ...editing.char, personality: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-sm text-txt focus:border-accent focus:outline-none"
                  placeholder="e.g. Determined, methodical, speaks little but acts decisively..."
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-txt-dim">
                  Voice Description (for future TTS)
                </label>
                <input
                  value={editing.char.voice_description}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      char: { ...editing.char, voice_description: e.target.value },
                    })
                  }
                  className="w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-sm text-txt focus:border-accent focus:outline-none"
                  placeholder="e.g. Low alto, calm, slight accent..."
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="rounded border border-dark-border px-4 py-1.5 text-sm text-txt-dim hover:text-txt"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.char.name.trim()}
                className="rounded bg-accent px-4 py-1.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
