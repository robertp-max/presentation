import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as api from '../api'
import { CharacterPanel } from '../components/CharacterPanel'
import { EditSceneModal } from '../components/EditSceneModal'
import { ScenesTable } from '../components/ScenesTable'
import { StepCards } from '../components/StepCards'
import type { StepDef } from '../components/StepCards'
import { TaskPanel } from '../components/TaskPanel'
import { useTaskPoll } from '../hooks/useTaskPoll'
import type { ProjectDetail as ProjectDetailType, ServiceStatus } from '../types'

const STATUS_ORDER = ['created', 'generating', 'generated', 'rendering', 'rendered', 'stitching', 'complete']
const STATUS_COLORS: Record<string, string> = {
  created: 'bg-info/15 text-info',
  generating: 'bg-warn/15 text-warn',
  generated: 'bg-ok/15 text-ok',
  rendering: 'bg-warn/15 text-warn',
  rendered: 'bg-ok/15 text-ok',
  stitching: 'bg-warn/15 text-warn',
  complete: 'bg-purple/15 text-purple',
}

interface Props {
  projectName: string
  svcStatus: ServiceStatus
  onRefresh: () => void
  onDeleted: () => void
}

export function ProjectPage({ projectName, svcStatus, onRefresh, onDeleted }: Props) {
  const [project, setProject] = useState<ProjectDetailType | null>(null)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [editSceneIdx, setEditSceneIdx] = useState<number | null>(null)
  const scenesRef = useRef<HTMLDivElement>(null)

  const task = useTaskPoll(taskId)

  const loadProject = useCallback(async () => {
    try {
      const p = await api.fetchProject(projectName)
      if ('error' in p) return
      setProject(p)
      // If there's an active task, track it
      if (p.active_tasks?.length > 0) {
        setTaskId(p.active_tasks[0].id)
      }
    } catch {
      // ignore
    }
  }, [projectName])

  useEffect(() => {
    loadProject()
  }, [loadProject])

  // Reload when task completes
  useEffect(() => {
    if (task && task.status !== 'running') {
      setTimeout(() => {
        loadProject()
        onRefresh()
      }, 1000)
    }
  }, [task?.status])

  const renderedSet = useMemo(() => {
    if (!project) return new Set<string>()
    return new Set(
      (project.clip_names || []).map((n) => n.split('_00001')[0].split('_00002')[0])
    )
  }, [project?.clip_names])

  if (!project) {
    return <div className="text-txt-dim">Loading...</div>
  }

  const si = STATUS_ORDER.indexOf(project.status)

  const runStep = async (action: 'generate' | 'render' | 'stitch') => {
    let result
    if (action === 'generate') result = await api.startGenerate(projectName)
    else if (action === 'render') result = await api.startRender(projectName)
    else result = await api.startStitch(projectName)

    if (result.task_id) {
      setTaskId(result.task_id)
      loadProject()
    } else if (result.error) {
      alert(result.error)
    }
  }

  const handleCancel = async () => {
    if (taskId) {
      await api.cancelTask(taskId)
      setTaskId(null)
      setTimeout(loadProject, 500)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete project "${project.display_name}" and all its files?`)) return
    await api.deleteProject(projectName)
    onDeleted()
  }

  const handleSaveScene = async (index: number, title: string, prompt: string) => {
    await api.updateScene(projectName, index, title, prompt)
    setEditSceneIdx(null)
    loadProject()
  }

  const steps: StepDef[] = [
    {
      num: 1,
      title: 'Generate',
      desc: 'Write scene prompts with LLM',
      done: si >= 2,
      active: si === 1,
      enabled: svcStatus.ollama && (si < 2 || si >= 2),
      info:
        project.scenes_total > 0
          ? `${project.scenes_total} scenes`
          : `${project.scenes_count} planned`,
      onAction: () => runStep('generate'),
    },
    {
      num: 2,
      title: 'Review',
      desc: 'View and edit scene prompts',
      done: si >= 2,
      active: false,
      enabled: si >= 2,
      info: project.scenes_total > 0 ? 'Click to view' : 'Generate first',
      onAction: () => scenesRef.current?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      num: 3,
      title: 'Render',
      desc: 'Generate video clips via ComfyUI',
      done: si >= 4,
      active: si === 3,
      enabled: svcStatus.comfyui && si >= 2,
      info:
        project.rendered_clips > 0
          ? `${project.rendered_clips}/${project.scenes_total} clips`
          : 'Not started',
      onAction: () => runStep('render'),
    },
    {
      num: 4,
      title: 'Stitch',
      desc: 'Combine clips into final movie',
      done: si >= 6,
      active: si === 5,
      enabled: si >= 4 && project.rendered_clips > 0,
      info: project.has_movie ? '🌟 Movie ready!' : 'Waiting for clips',
      onAction: () => runStep('stitch'),
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="mb-1 text-lg font-semibold">{project.display_name}</h2>
          <p className="max-w-2xl text-sm text-txt-dim">{project.concept}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className={`rounded px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[project.status] || ''}`}>
            {project.status}
          </span>
          <button
            onClick={handleDelete}
            className="rounded bg-fail px-2 py-0.5 text-[11px] font-semibold text-white hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Steps */}
      <StepCards steps={steps} />

      {/* Active task */}
      {task && <TaskPanel task={task} onCancel={handleCancel} />}

      {/* Characters */}
      <div className="mt-4">
        <CharacterPanel
          projectName={projectName}
          characters={project.characters || []}
          onUpdate={loadProject}
        />
      </div>

      {/* Scenes */}
      <div className="mt-4 rounded-lg border border-dark-border bg-dark-card p-5" ref={scenesRef}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">
            Scenes{' '}
            {project.scenes_total > 0 && (
              <span className="text-sm text-txt-dim">({project.scenes_total} scenes)</span>
            )}
          </h2>
        </div>
        <ScenesTable
          scenes={project.scenes}
          renderedSet={renderedSet}
          onEdit={(i) => setEditSceneIdx(i)}
        />
      </div>

      {/* Edit scene modal */}
      {editSceneIdx !== null && project.scenes[editSceneIdx] && (
        <EditSceneModal
          scene={project.scenes[editSceneIdx]}
          index={editSceneIdx}
          onClose={() => setEditSceneIdx(null)}
          onSave={handleSaveScene}
        />
      )}
    </div>
  )
}
