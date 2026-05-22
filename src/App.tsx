import { useCallback, useEffect, useMemo, useState } from 'react'

type Column = {
  title: string
  items: string[]
}

type Section = {
  id: string
  title: string
  subtitle: string
  highlights?: string[]
  columns?: Column[]
  note?: string
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => { finished: Promise<void> }
}

const sections: Section[] = [
  {
    id: 'overview',
    title: 'CI Institute of Nursing',
    subtitle: 'CNA Recert, HHA Initial, HHA Renewal & Moodle Build',
    highlights: [
      'Project Brief for Team Execution',
      'TJ continues to oversee the project.',
      'Core preparation is complete; teams now execute assigned workstreams.',
      'Target timeline: 1 week aggressive / 2 weeks conservative.',
    ],
    note: 'Tone and execution model: premium, controlled, compliance-first delivery with no unsupported claims.',
  },
  {
    id: 'provided',
    title: 'What Has Been Provided',
    subtitle: 'Execution starts from prepared materials, not from zero.',
    columns: [
      {
        title: 'Compliance + Application Prep',
        items: [
          'CDPH application forms are filled in draft form.',
          'CNA Recert / Online CNA CE package is prepared.',
          'CNA 24-hour online CE course structure is prepared.',
          'Policies, certificate template, reviewer instructions, and submission checklist are prepared.',
        ],
      },
      {
        title: 'Instructional + Delivery Prep',
        items: [
          'HHA Initial 40-Hour materials and Units 1-5 are prepared.',
          'HHA Renewal planning docs are prepared, pending compliance confirmation.',
          'Catalog update/addendum content is prepared.',
          'Moodle runbooks, checklists, question banks, QA plans, narration scripts, slide content, and website minimum updates are prepared.',
        ],
      },
    ],
  },
  {
    id: 'gate',
    title: 'Current Gate Status',
    subtitle: 'Controlled hold state while final compliance checks are completed.',
    highlights: [
      'Phase 2 = Conditional Hold',
      'Phase 3 = Prep Only, Not Go',
      'No submission yet',
      'No signatures yet',
      'No live certificate issuance yet',
      'No unsupported HHA online CE claims',
    ],
    note: 'Readiness is high; final authorization gates remain intentionally closed.',
  },
  {
    id: 'compliance',
    title: 'Compliance Workstream',
    subtitle: 'Compliance review and completion path (not a restart).',
    columns: [
      {
        title: 'Core Actions',
        items: [
          'Review completed CDPH forms + attachments.',
          'Confirm missing official emails, school ID, fee/membership wording, HHA identifiers, and facility details.',
          'Review and update catalog using prepared addendum before submission.',
          'Confirm HHA Renewal applicability and schedule/clinical requirements.',
          'Collect signatures, date forms at submission time, and send final package after final review.',
        ],
      },
      {
        title: 'Specific CDPH / Supporting Items',
        items: [
          'CDPH 192B contact email; CDPH 193 school ID and contact emails.',
          'CE unit fee or membership fee wording.',
          'HHA provider ID / HHP identifier.',
          'CDPH 171 / 171A / 171B review (HHA Initial); CDPH 276E facility-side data if applicable.',
          'Instructor roster + license/resume docs, business license, catalog update notice, signature authority.',
        ],
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Workstream',
    subtitle: 'Production and design execution using prepared source content.',
    columns: [
      {
        title: 'Already Provided',
        items: [
          'Narration scripts/content',
          'Slide content and course/module structure',
          'TTS planning package',
          'Question coverage maps',
        ],
      },
      {
        title: 'Marketing Must Deliver',
        items: [
          'Clone/generate TTS voice using provided narration.',
          'Apply professional design to provided slide content.',
          'Export final audio files and slide decks.',
          'Organize assets by course/module and hand off to Moodle team.',
        ],
      },
    ],
    note: 'Narration is provided; Marketing executes voice generation. Slide content is provided; Marketing executes design/formatting.',
  },
  {
    id: 'moodle',
    title: 'Moodle Workstream',
    subtitle: 'Build execution with prepared architecture and gating controls.',
    columns: [
      {
        title: 'Build Scope',
        items: [
          'Create course categories and shells.',
          'Build CNA Online CE 12-course library.',
          'Build HHA Initial 40-Hour unit structure.',
          'Configure quizzes, banks, tracking, timers, affidavits, certificate gates, and evidence reports.',
        ],
      },
      {
        title: 'Control Rules',
        items: [
          'Create reviewer/test access after Compliance approves credentials.',
          'Upload final TTS + designed slides after Marketing completes outputs.',
          'Validate QA evidence and reviewer pathways before final submission.',
          'Do not activate live certificate issuance until Compliance clears the package.',
        ],
      },
    ],
  },
  {
    id: 'website',
    title: 'Website Minimum Updates',
    subtitle: 'Public-facing updates allowed now with strict claim controls.',
    columns: [
      {
        title: 'Required Updates',
        items: [
          'Use name: CI Institute of Nursing and site: ciinstituteofnursing.com.',
          'Use address: 419 E Hamilton Ave, Campbell, CA 95008 and phone: (650) 799-5744.',
          'Add official email once Compliance confirms it.',
          'Add/update CNA Online CE page with pending-CDPH language and reviewer access path.',
          'Add cautious HHA Initial / HHA Renewal pages and catalog update notice.',
        ],
      },
      {
        title: 'Remove Unsupported Claims',
        items: [
          'Do not claim CDPH approval before approval.',
          'Do not claim CNA CE certificates available now before approval.',
          'Do not claim HHA online CE unless confirmed.',
          'Do not claim fully online HHA Initial if skills/clinical verification is required.',
          'Do not use CI-ION on public/application-facing pages, do not show NAC#, and do not add public enrollment/payment buttons before clearance.',
        ],
      },
    ],
  },
  {
    id: 'timeline',
    title: 'Timeline',
    subtitle: 'Target: 1-2 weeks with parallel workstreams.',
    columns: [
      {
        title: 'Week 1',
        items: [
          'Compliance reviews forms, catalog, and open fields.',
          'Moodle builds shells and gating logic.',
          'Marketing starts TTS + slide design.',
          'Website minimum updates are implemented.',
        ],
      },
      {
        title: 'Week 2',
        items: [
          'Compliance resolves blockers and signatures.',
          'Moodle QA and reviewer access validated.',
          'Marketing finalizes assets or upload-ready batch.',
          'Final package assembled for submission.',
        ],
      },
    ],
    highlights: [
      'Aggressive path: 1 week if decisions move quickly.',
      'Conservative path: 2 weeks if approvals/signatures/facility details take longer.',
    ],
  },
  {
    id: 'final-gate',
    title: 'Final Rule / Approval Gate',
    subtitle: 'Execution can continue now; release actions remain gated.',
    highlights: [
      'Continue execution across all teams immediately.',
      'Do not submit, sign, publish, or publicly advertise approval until final compliance review is complete.',
      'Do not issue certificates until Compliance clears the package and TJ approves the next step.',
    ],
    note: 'Calm, controlled progression: prepared inputs -> verified compliance -> approved release.',
  },
]

function createMarkdownSummary() {
  const lines: string[] = []
  lines.push('# CI Institute of Nursing Executive Summary')
  lines.push('')
  lines.push('CNA Recert, HHA Initial, HHA Renewal & Moodle Build')
  lines.push('')
  sections.forEach((section, index) => {
    lines.push(`## ${index + 1}. ${section.title}`)
    lines.push(section.subtitle)
    lines.push('')
    section.highlights?.forEach((item) => lines.push(`- ${item}`))
    section.columns?.forEach((column) => {
      lines.push(`### ${column.title}`)
      column.items.forEach((item) => lines.push(`- ${item}`))
    })
    if (section.note) {
      lines.push(`> ${section.note}`)
    }
    lines.push('')
  })
  return lines.join('\n')
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const current = sections[currentIndex]
  const progress = ((currentIndex + 1) / sections.length) * 100

  const navigateTo = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= sections.length || nextIndex === currentIndex) {
      return
    }

    const direction = nextIndex > currentIndex ? 'forward' : 'back'
    document.documentElement.setAttribute('data-deck-direction', direction)
    const vtDocument = document as ViewTransitionDocument
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion && typeof vtDocument.startViewTransition === 'function') {
      vtDocument.startViewTransition(() => {
        setCurrentIndex(nextIndex)
      })
      return
    }

    setCurrentIndex(nextIndex)
  }, [currentIndex])

  const onPrevious = useCallback(() => navigateTo(currentIndex - 1), [currentIndex, navigateTo])
  const onNext = useCallback(() => navigateTo(currentIndex + 1), [currentIndex, navigateTo])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        onNext()
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        onPrevious()
      } else if (event.key === 'Home') {
        event.preventDefault()
        navigateTo(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        navigateTo(sections.length - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigateTo, onNext, onPrevious])

  const sectionPositionLabel = useMemo(
    () => `${currentIndex + 1} / ${sections.length}`,
    [currentIndex],
  )

  const onPrint = () => {
    window.print()
  }

  const onDownloadMarkdown = () => {
    const blob = new Blob([createMarkdownSummary()], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'CIIN_EXECUTIVE_SUMMARY.md'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="deck-app">
      <header className="deck-header">
        <button className="ghost-button" onClick={() => navigateTo(0)}>Home</button>
        <div className="brand-lockup">
          <img src="/assets/brand/ci-ion-logomark-white.svg" alt="CI Institute of Nursing logo" className="brand-logo" />
          <div>
            <p className="brand-title">CI Institute of Nursing</p>
            <p className="brand-subtitle">Executive Project Brief</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="ghost-button" onClick={onDownloadMarkdown}>Download Summary</button>
          <button className="primary-button" onClick={onPrint}>Print / Export PDF</button>
        </div>
      </header>

      <aside className="dot-nav" aria-label="Section navigation">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to ${section.title}`}
            onClick={() => navigateTo(index)}
          />
        ))}
      </aside>

      <main className="deck-stage" role="region" aria-live="polite">
        <section className="slide-card" key={current.id}>
          <p className="slide-kicker">Section {sectionPositionLabel}</p>
          <h1 className="slide-title">{current.title}</h1>
          <p className="slide-subtitle">{current.subtitle}</p>

          {current.highlights && (
            <div className="highlight-grid">
              {current.highlights.map((item) => (
                <article key={item} className="tile">
                  {item}
                </article>
              ))}
            </div>
          )}

          {current.columns && (
            <div className="column-grid">
              {current.columns.map((column) => (
                <article key={column.title} className="column-card">
                  <h2>{column.title}</h2>
                  <ul>
                    {column.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          )}

          {current.note && <p className="slide-note">{current.note}</p>}
        </section>
      </main>

      <footer className="deck-footer">
        <button className="ghost-button" onClick={onPrevious} disabled={currentIndex === 0}>Previous</button>
        <div className="progress-wrap" aria-label="Progress">
          <span>{sectionPositionLabel}</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{Math.round(progress)}%</span>
        </div>
        <button className="ghost-button" onClick={onNext} disabled={currentIndex === sections.length - 1}>Next</button>
      </footer>
    </div>
  )
}

export default App
