// ── Service Status ──────────────────────────────────────────
export interface ServiceStatus {
  comfyui: boolean
  comfyui_stats: ComfyUIStats | null
  ollama: boolean
  ollama_models: string[]
}

export interface ComfyUIStats {
  system: {
    os: string
    ram_total: number
    ram_free: number
    comfyui_version: string
    pytorch_version: string
  }
  devices: {
    name: string
    type: string
    vram_total: number
    vram_free: number
    torch_vram_total: number
    torch_vram_free: number
  }[]
}

// ── Project ────────────────────────────────────────────────
export type ProjectStatus =
  | 'created'
  | 'generating'
  | 'generated'
  | 'rendering'
  | 'rendered'
  | 'stitching'
  | 'complete'

export interface ProjectSummary {
  name: string
  display_name: string
  concept: string
  scenes_count: number
  llm_model: string
  status: ProjectStatus
  created_at: string
  updated_at: string
  rendered_clips: number
  has_movie: boolean
}

export interface Scene {
  id: string
  title: string
  prompt: string
  narration?: string
}

// ── Characters ─────────────────────────────────────────────
export interface Character {
  name: string
  appearance: string
  personality: string
  voice_description: string
  voice_sample: string
}

export interface ProjectDetail extends ProjectSummary {
  scenes: Scene[]
  scenes_total: number
  clip_names: string[]
  active_tasks: TaskInfo[]
  characters: Character[]
}

// ── Tasks ──────────────────────────────────────────────────
export type TaskType = 'generate' | 'render' | 'stitch'
export type TaskStatus = 'running' | 'completed' | 'failed' | 'cancelled'

export interface TaskInfo {
  id: string
  status: TaskStatus
  type: TaskType
  project: string
  progress: number
  total: number
  output?: string[]
  started: number
  ended: number
}

// ── API Responses ──────────────────────────────────────────
export interface TaskStartResponse {
  task_id?: string
  status?: string
  error?: string
}

export interface CreateProjectRequest {
  name: string
  concept: string
  scenes: number
  llm_model: string
}