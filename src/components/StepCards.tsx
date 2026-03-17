interface StepDef {
  num: number
  title: string
  desc: string
  done: boolean
  active: boolean
  enabled: boolean
  info: string
  onAction: () => void
}

interface Props {
  steps: StepDef[]
}

export function StepCards({ steps }: Props) {
  return (
    <div className="mb-5 grid grid-cols-4 gap-3">
      {steps.map((s) => {
        const border = s.done
          ? 'border-ok'
          : s.active
            ? 'border-accent'
            : 'border-dark-border'

        const numBg = s.done
          ? 'bg-ok text-white'
          : s.active
            ? 'bg-accent text-white'
            : 'bg-dark-border text-txt-dim'

        const btnText = s.done ? 'Re-run' : s.active ? 'Running...' : 'Start'
        const btnCls = s.done
          ? 'bg-dark-border text-txt hover:bg-dark-input'
          : 'bg-accent text-white hover:bg-accent-hover'

        return (
          <div
            key={s.num}
            className={`relative overflow-hidden rounded-lg border bg-dark-input p-4 text-center ${border}`}
          >
            <div
              className={`mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${numBg}`}
            >
              {s.num}
            </div>
            <div className="text-sm font-semibold">{s.title}</div>
            <div className="mb-2.5 mt-1 text-[11px] text-txt-dim">{s.desc}</div>
            <button
              onClick={s.onAction}
              disabled={!s.enabled || s.active}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${btnCls}`}
            >
              {btnText}
            </button>
            <div className="mt-1.5 text-[11px] text-txt-dim" dangerouslySetInnerHTML={{ __html: s.info }} />
          </div>
        )
      })}
    </div>
  )
}

export type { StepDef }
