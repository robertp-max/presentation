import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchTask } from '../api'
import type { TaskInfo } from '../types'

const POLL_MS = 2000

export function useTaskPoll(taskId: string | null) {
  const [task, setTask] = useState<TaskInfo | null>(null)
  const intervalRef = useRef<number | null>(null)

  const poll = useCallback(async () => {
    if (!taskId) return
    try {
      const t = await fetchTask(taskId)
      if (!('error' in t)) setTask(t)
    } catch {
      // ignore
    }
  }, [taskId])

  useEffect(() => {
    if (!taskId) {
      setTask(null)
      return
    }
    poll()
    intervalRef.current = window.setInterval(poll, POLL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [taskId, poll])

  // Stop polling when task is no longer running
  useEffect(() => {
    if (task && task.status !== 'running' && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [task])

  return task
}
