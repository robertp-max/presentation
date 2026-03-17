import type {
  Character,
  CreateProjectRequest,
  ProjectDetail,
  ProjectSummary,
  ServiceStatus,
  TaskInfo,
  TaskStartResponse,
} from './types'

const BASE = '/api'

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const opts: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) opts.body = JSON.stringify(body)
  const r = await fetch(`${BASE}/${path}`, opts)
  return r.json()
}

// ── Status ─────────────────────────────────────────────────
export const fetchStatus = () => req<ServiceStatus>('GET', 'status')

// ── Projects ───────────────────────────────────────────────
export const fetchProjects = () => req<ProjectSummary[]>('GET', 'projects')
export const fetchProject = (name: string) => req<ProjectDetail>('GET', `projects/${name}`)
export const createProject = (data: CreateProjectRequest) =>
  req<ProjectSummary>('POST', 'projects', data)
export const deleteProject = (name: string) => req<{ status: string }>('DELETE', `projects/${name}`)

// ── Project Actions ────────────────────────────────────────
export const startGenerate = (name: string, body?: Record<string, unknown>) =>
  req<TaskStartResponse>('POST', `projects/${name}/generate`, body ?? {})
export const startRender = (name: string, body?: Record<string, unknown>) =>
  req<TaskStartResponse>('POST', `projects/${name}/render`, body ?? {})
export const startStitch = (name: string) =>
  req<TaskStartResponse>('POST', `projects/${name}/stitch`, {})
export const updateScene = (name: string, index: number, title: string, prompt: string) =>
  req<{ status: string }>('POST', `projects/${name}/scenes`, { index, title, prompt })

// ── Characters ─────────────────────────────────────────────
export const fetchCharacters = (name: string) =>
  req<Character[]>('GET', `projects/${name}/characters`)
export const saveCharacter = (
  name: string,
  char: Partial<Character> & { name: string },
  index?: number
) =>
  req<{ status: string; characters: Character[] }>(
    'POST',
    `projects/${name}/characters`,
    { ...char, index }
  )
export const deleteCharacter = (name: string, index: number) =>
  req<{ status: string; characters: Character[] }>(
    'DELETE',
    `projects/${name}/characters/${index}`
  )

// ── Tasks ──────────────────────────────────────────────────
export const fetchTasks = () => req<Record<string, TaskInfo>>('GET', 'tasks')
export const fetchTask = (id: string) => req<TaskInfo>('GET', `tasks/${id}`)
export const cancelTask = (id: string) => req<{ status: string }>('DELETE', `tasks/${id}`)

// ── Services ───────────────────────────────────────────────
export const startComfyUI = () => req<{ status: string; pid?: number }>('POST', 'comfyui/start')
export const stopComfyUI = () => req<{ status: string }>('POST', 'comfyui/stop')
export const testOllama = () =>
  req<{ connected: boolean; models: string[] }>('POST', 'ollama/test')
