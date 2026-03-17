import { useState } from 'react'
import * as api from '../api'
import type { ServiceStatus } from '../types'

function Dot({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${on ? 'bg-ok shadow-[0_0_6px_theme(colors.ok)]' : 'bg-fail'}`}
    />
  )
}

interface Props {
  status: ServiceStatus
  onRefresh: () => void
}

export function Services({ status, onRefresh }: Props) {
  const [comfyStarting, setComfyStarting] = useState(false)

  const handleStartComfy = async () => {
    setComfyStarting(true)
    await api.startComfyUI()
    // Poll until it's up (max ~2 min)
    let tries = 0
    const check = setInterval(async () => {
      tries++
      onRefresh()
      const s = await api.fetchStatus()
      if (s.comfyui || tries > 60) {
        clearInterval(check)
        setComfyStarting(false)
        onRefresh()
      }
    }, 2000)
  }

  const handleStopComfy = async () => {
    await api.stopComfyUI()
    setTimeout(onRefresh, 1000)
  }

  const handleTestOllama = async () => {
    const result = await api.testOllama()
    if (result.connected) {
      alert('Ollama connected! Models: ' + (result.models || []).join(', '))
    } else {
      alert('Cannot reach Ollama at localhost:11434. Is it running?')
    }
    onRefresh()
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Services</h2>

      {/* ComfyUI */}
      <div className="mb-4 rounded-lg border border-dark-border bg-dark-card p-5">
        <h2 className="text-base font-semibold">ComfyUI Server</h2>
        <p className="mb-3 text-sm text-txt-dim">
          Video rendering engine — must be running before rendering scenes.
        </p>
        <div className="flex items-center gap-3 border-t border-dark-border pt-3">
          <span className="w-20 text-sm font-semibold">Status</span>
          <span className="flex items-center gap-1.5 text-sm">
            <Dot on={status.comfyui} />
            <span className={status.comfyui ? 'text-ok' : 'text-fail'}>
              {status.comfyui ? 'Running' : 'Stopped'}
            </span>
          </span>
          <div className="ml-auto flex gap-2">
            <button
              onClick={handleStartComfy}
              disabled={comfyStarting || status.comfyui}
              className="rounded-md bg-ok px-3 py-1.5 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-40"
            >
              {comfyStarting ? 'Starting...' : 'Start'}
            </button>
            <button
              onClick={handleStopComfy}
              disabled={!status.comfyui}
              className="rounded-md bg-fail px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40"
            >
              Stop
            </button>
          </div>
        </div>

        {status.comfyui && status.comfyui_stats && (
          <div className="mt-3 border-t border-dark-border pt-3 text-xs text-txt-dim">
            <p>Version: {status.comfyui_stats.system.comfyui_version}</p>
            <p>PyTorch: {status.comfyui_stats.system.pytorch_version}</p>
            {status.comfyui_stats.devices?.[0] && (
              <p>
                GPU: {status.comfyui_stats.devices[0].name} —{' '}
                VRAM: {(status.comfyui_stats.devices[0].vram_free / 1e9).toFixed(1)} /{' '}
                {(status.comfyui_stats.devices[0].vram_total / 1e9).toFixed(1)} GB free
              </p>
            )}
          </div>
        )}
      </div>

      {/* Ollama */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-5">
        <h2 className="text-base font-semibold">Ollama (LLM)</h2>
        <p className="mb-3 text-sm text-txt-dim">
          Local language model for writing scene prompts — runs on Windows.
        </p>
        <div className="flex items-center gap-3 border-t border-dark-border pt-3">
          <span className="w-20 text-sm font-semibold">Status</span>
          <span className="flex items-center gap-1.5 text-sm">
            <Dot on={status.ollama} />
            <span className={status.ollama ? 'text-ok' : 'text-fail'}>
              {status.ollama ? 'Connected' : 'Not reachable'}
            </span>
          </span>
          <button
            onClick={handleTestOllama}
            className="ml-auto rounded-md border border-dark-border px-3 py-1.5 text-sm font-semibold text-txt hover:bg-dark-input"
          >
            Test Connection
          </button>
        </div>
        {status.ollama_models.length > 0 && (
          <div className="mt-3 flex items-center gap-3 border-t border-dark-border pt-3">
            <span className="w-20 text-sm font-semibold">Models</span>
            <span className="text-xs text-txt-dim">{status.ollama_models.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  )
}
