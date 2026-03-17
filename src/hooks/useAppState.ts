import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchProjects, fetchStatus, fetchTasks } from '../api'
import type { ProjectSummary, ServiceStatus, TaskInfo } from '../types'

const POLL_MS = 5000

export function useAppState() {
  const [status, setStatus] = useState<ServiceStatus>({
    comfyui: false,
    comfyui_stats: null,
    ollama: false,
    ollama_models: [],
  })
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [activeTasks, setActiveTasks] = useState<Record<string, TaskInfo>>({})
  const intervalRef = useRef<number | null>(null)

  const refresh = useCallback(async () => {
    try {
      const [s, p, t] = await Promise.all([fetchStatus(), fetchProjects(), fetchTasks()])
      setStatus(s)
      setProjects(p)
      setActiveTasks(t)
    } catch {
      // backend not reachable
    }
  }, [])

  useEffect(() => {
    refresh()
    intervalRef.current = window.setInterval(refresh, POLL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [refresh])

  return { status, projects, activeTasks, refresh }
}
