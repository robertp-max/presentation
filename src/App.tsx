import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type PreparedFile = {
  href: string
  label: string
  purpose: string
  type: 'XLSX' | 'MD' | 'PS1'
}

type PreparedGroup = {
  id: string
  name: string
  summary: string
  files: PreparedFile[]
}

const FILES = '/handoff'

const preparedGroups: PreparedGroup[] = [
  {
    id: 'format-standards',
    name: 'Format Standards',
    summary: 'Phase 2 QA tracking + project format conventions',
    files: [
      { href: `${FILES}/01_FORMAT_STANDARDS/FORMAT_CONVENTIONS.md`, label: 'FORMAT_CONVENTIONS.md', purpose: 'File format and letterhead rules.', type: 'MD' },
      { href: `${FILES}/01_FORMAT_STANDARDS/OUTPUT_FILE_MANIFEST_PHASE_2.md`, label: 'OUTPUT_FILE_MANIFEST_PHASE_2.md', purpose: 'Manifest of Phase 2 artifacts.', type: 'MD' },
      { href: `${FILES}/01_FORMAT_STANDARDS/PHASE_2_QA_CHECKLIST.md`, label: 'PHASE_2_QA_CHECKLIST.md', purpose: 'Gate checklist with pass/fail status.', type: 'MD' },
      { href: `${FILES}/01_FORMAT_STANDARDS/PHASE_2_MISSING_INFORMATION_SUMMARY.md`, label: 'PHASE_2_MISSING_INFORMATION_SUMMARY.md', purpose: 'Open items grouped by track.', type: 'MD' },
      { href: `${FILES}/01_FORMAT_STANDARDS/PHASE_2_READY_FOR_REVIEW.md`, label: 'PHASE_2_READY_FOR_REVIEW.md', purpose: 'Human review action list.', type: 'MD' },
      { href: `${FILES}/01_FORMAT_STANDARDS/PHASE_2_PDF_REVISIT_QUEUE.md`, label: 'PHASE_2_PDF_REVISIT_QUEUE.md', purpose: 'Queue of blank PDF fields.', type: 'MD' },
    ],
  },
  {
    id: 'cna-recert',
    name: 'CNA Recert',
    summary: 'Policy sources, CE course list, CDPH 192B attachment',
    files: [
      { href: `${FILES}/02_CNA_RECERT/CNA_ONLINE_CE_COURSE_LIST.xlsx`, label: 'CNA_ONLINE_CE_COURSE_LIST.xlsx', purpose: '12-course CE list with hours.', type: 'XLSX' },
      { href: `${FILES}/02_CNA_RECERT/CNA_CE_COURSE_HOUR_MATRIX.md`, label: 'CNA_CE_COURSE_HOUR_MATRIX.md', purpose: 'Per-course CE hour matrix.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md`, label: 'CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md', purpose: 'CDPH 192B attachment source.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_IDENTITY_VERIFICATION_POLICY.md`, label: 'CNA_IDENTITY_VERIFICATION_POLICY.md', purpose: 'Identity verification policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_INTERACTIVITY_AND_FEEDBACK_POLICY.md`, label: 'CNA_INTERACTIVITY_AND_FEEDBACK_POLICY.md', purpose: 'Interactivity & feedback policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_ONLINE_CE_TIMER_SEAT_TIME_POLICY.md`, label: 'CNA_ONLINE_CE_TIMER_SEAT_TIME_POLICY.md', purpose: 'Seat-time / timer policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_POSTTEST_EXAM_POLICY.md`, label: 'CNA_POSTTEST_EXAM_POLICY.md', purpose: 'Post-test / exam policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_RECORDKEEPING_POLICY.md`, label: 'CNA_RECORDKEEPING_POLICY.md', purpose: 'Recordkeeping policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_LMS_COMPLIANCE_NARRATIVE.md`, label: 'CNA_LMS_COMPLIANCE_NARRATIVE.md', purpose: 'LMS compliance narrative.', type: 'MD' },
    ],
  },
  {
    id: 'hha-initial',
    name: 'HHA Initial',
    summary: '40-hour attendance + competency evaluation',
    files: [
      { href: `${FILES}/03_HHA_INITIAL/STUDENT_ATTENDANCE_TEMPLATE.xlsx`, label: 'STUDENT_ATTENDANCE_TEMPLATE.xlsx', purpose: 'HHA student attendance tracking.', type: 'XLSX' },
      { href: `${FILES}/03_HHA_INITIAL/STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx`, label: 'STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx', purpose: 'HHA competency evaluation form.', type: 'XLSX' },
    ],
  },
  {
    id: 'hha-renewal',
    name: 'HHA Renewal',
    summary: 'Renewal training session attendance',
    files: [
      { href: `${FILES}/04_HHA_RENEWAL/ATTENDANCE_TRAINING_TEMPLATE.xlsx`, label: 'ATTENDANCE_TRAINING_TEMPLATE.xlsx', purpose: 'HHA renewal attendance template.', type: 'XLSX' },
    ],
  },
  {
    id: 'moodle-build',
    name: 'Moodle Build',
    summary: 'Shells, activities, completion, quizzes, evidence',
    files: [
      { href: `${FILES}/05_MOODLE_BUILD/CNA_MOODLE_BUILD_OVERVIEW.xlsx`, label: 'CNA_MOODLE_BUILD_OVERVIEW.xlsx', purpose: 'Multi-sheet build overview per course.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_COURSE_IMPORT_TEMPLATE.xlsx`, label: 'CNA_COURSE_IMPORT_TEMPLATE.xlsx', purpose: 'Moodle course shell import.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx`, label: 'CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx', purpose: 'Activity / resource map.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_COMPLETION_RULE_TEMPLATE.xlsx`, label: 'CNA_COMPLETION_RULE_TEMPLATE.xlsx', purpose: 'Certificate release gates per course.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_QUIZ_BANK_TEMPLATE.xlsx`, label: 'CNA_QUIZ_BANK_TEMPLATE.xlsx', purpose: 'Quiz bank coverage map.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx`, label: 'CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx', purpose: 'Completion evidence template.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/COURSE_IMPORT_TEMPLATE_DRAFT.xlsx`, label: 'COURSE_IMPORT_TEMPLATE_DRAFT.xlsx', purpose: 'Blank course import draft.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/ACTIVITY_RESOURCE_TEMPLATE_DRAFT.xlsx`, label: 'ACTIVITY_RESOURCE_TEMPLATE_DRAFT.xlsx', purpose: 'Blank activity resource draft.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CERTIFICATE_COMPLETION_RULE_TEMPLATE_DRAFT.xlsx`, label: 'CERTIFICATE_COMPLETION_RULE_TEMPLATE_DRAFT.xlsx', purpose: 'Blank completion rule draft.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/QUIZ_BANK_TEMPLATE_DRAFT.xlsx`, label: 'QUIZ_BANK_TEMPLATE_DRAFT.xlsx', purpose: 'Blank quiz bank draft.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/REPORTING_COMPLETION_EVIDENCE_TEMPLATE_DRAFT.xlsx`, label: 'REPORTING_COMPLETION_EVIDENCE_TEMPLATE_DRAFT.xlsx', purpose: 'Blank reporting evidence draft.', type: 'XLSX' },
    ],
  },
  {
    id: 'utilities',
    name: 'Build XLSX & Index',
    summary: 'Build utility script and master index',
    files: [
      { href: `${FILES}/BUILD_XLSX.ps1`, label: 'BUILD_XLSX.ps1', purpose: 'XLSX build utility script.', type: 'PS1' },
      { href: `${FILES}/HANDOFF_INDEX.md`, label: 'HANDOFF_INDEX.md', purpose: 'Master index of prepared package.', type: 'MD' },
    ],
  },
]

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> }
}

type PageId = 'overview' | 'status' | 'compliance' | 'marketing' | 'moodle' | 'website' | 'timeline' | 'files' | 'approval'

type PageMeta = { id: PageId; label: string; number: string }

const PAGES: PageMeta[] = [
  { id: 'overview', label: 'Overview', number: '01' },
  { id: 'status', label: 'Status', number: '02' },
  { id: 'compliance', label: 'Compliance', number: '03' },
  { id: 'marketing', label: 'Marketing', number: '04' },
  { id: 'moodle', label: 'Moodle', number: '05' },
  { id: 'website', label: 'Website', number: '06' },
  { id: 'timeline', label: 'Timeline', number: '07' },
  { id: 'files', label: 'Files', number: '08' },
  { id: 'approval', label: 'Approval Gate', number: '09' },
]

type DrawerContent = {
  title: string
  subtitle?: string
  body: React.ReactNode
} | null

function CheckIcon() {
  return (
    <span className="check-ico" aria-hidden>
      <svg viewBox="0 0 16 16" width="12" height="12">
        <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function LockIcon() {
  return (
    <span className="lock-ico" aria-hidden>
      <svg viewBox="0 0 16 16" width="12" height="12">
        <path d="M4 7V5a4 4 0 018 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  )
}

function App() {
  const [pageId, setPageId] = useState<PageId>('overview')
  const [drawer, setDrawer] = useState<DrawerContent>(null)
  const lastIndexRef = useRef(0)

  const currentIndex = PAGES.findIndex((p) => p.id === pageId)
  const progressPct = ((currentIndex + 1) / PAGES.length) * 100

  const goTo = useCallback((next: PageId) => {
    const nextIndex = PAGES.findIndex((p) => p.id === next)
    if (nextIndex === currentIndex) return
    const direction = nextIndex > currentIndex ? 'forward' : 'back'
    document.documentElement.setAttribute('data-dir', direction)
    lastIndexRef.current = currentIndex
    const vtDoc = document as ViewTransitionDocument
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced && typeof vtDoc.startViewTransition === 'function') {
      vtDoc.startViewTransition(() => setPageId(next))
    } else {
      setPageId(next)
    }
  }, [currentIndex])

  const goNext = useCallback(() => {
    const next = PAGES[Math.min(PAGES.length - 1, currentIndex + 1)]
    if (next) goTo(next.id)
  }, [currentIndex, goTo])

  const goPrev = useCallback(() => {
    const prev = PAGES[Math.max(0, currentIndex - 1)]
    if (prev) goTo(prev.id)
  }, [currentIndex, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawer(null)
        return
      }
      if (drawer) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goPrev() }
      else if (e.key === 'Home') { e.preventDefault(); goTo('overview') }
      else if (e.key === 'End') { e.preventDefault(); goTo('approval') }
      else if (/^[1-9]$/.test(e.key)) {
        const idx = parseInt(e.key, 10) - 1
        if (PAGES[idx]) { e.preventDefault(); goTo(PAGES[idx].id) }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawer, goNext, goPrev, goTo])

  const summaryMarkdown = useMemo(() => buildMarkdown(), [])

  const onPrint = () => window.print()

  const onDownloadMarkdown = () => {
    const blob = new Blob([summaryMarkdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'CIIN_Executive_Brief.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src="/assets/brand/ci-ion-logomark-white.svg" alt="" className="brand-mark" />
          <div className="brand-text">
            <div className="brand-name">CI Institute of Nursing</div>
            <div className="brand-tag">Executive Brief · Team Execution</div>
          </div>
        </div>
        <nav className="tabs" aria-label="Sections">
          {PAGES.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className={`tab ${p.id === pageId ? 'is-active' : ''}`}
              onClick={(e) => { e.preventDefault(); goTo(p.id) }}
            >
              <span className="tab-num">{p.number}</span>
              <span className="tab-lbl">{p.label}</span>
            </a>
          ))}
        </nav>
        <div className="topbar-actions">
          <a className="action-link" href="#download" onClick={(e) => { e.preventDefault(); onDownloadMarkdown() }}>Download Brief</a>
          <a className="action-link action-strong" href="#print" onClick={(e) => { e.preventDefault(); onPrint() }}>Export PDF</a>
        </div>
      </header>

      <main className="stage" key={pageId} data-page={pageId}>
        {pageId === 'overview' && <OverviewPage openDrawer={setDrawer} onNav={goTo} />}
        {pageId === 'status' && <StatusPage openDrawer={setDrawer} />}
        {pageId === 'compliance' && <CompliancePage openDrawer={setDrawer} />}
        {pageId === 'marketing' && <MarketingPage openDrawer={setDrawer} />}
        {pageId === 'moodle' && <MoodlePage openDrawer={setDrawer} />}
        {pageId === 'website' && <WebsitePage openDrawer={setDrawer} />}
        {pageId === 'timeline' && <TimelinePage openDrawer={setDrawer} />}
        {pageId === 'files' && <FilesPage openDrawer={setDrawer} />}
        {pageId === 'approval' && <ApprovalPage onNav={goTo} />}
      </main>

      <footer className="bottombar">
        <a className="ctrl-link" href="#prev" onClick={(e) => { e.preventDefault(); goPrev() }} aria-disabled={currentIndex === 0}>← Previous</a>
        <div className="ctrl-progress" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={PAGES.length}>
          <span className="ctrl-count">{currentIndex + 1} / {PAGES.length}</span>
          <span className="ctrl-bar"><span className="ctrl-bar-fill" style={{ width: `${progressPct}%` }} /></span>
          <span className="ctrl-page">{PAGES[currentIndex].label}</span>
        </div>
        <a className="ctrl-link" href="#next" onClick={(e) => { e.preventDefault(); goNext() }} aria-disabled={currentIndex === PAGES.length - 1}>Next →</a>
      </footer>

      <Drawer content={drawer} onClose={() => setDrawer(null)} />
    </div>
  )
}

function Drawer({ content, onClose }: { content: DrawerContent; onClose: () => void }) {
  const open = Boolean(content)
  return (
    <div className={`drawer-root ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer-panel" role="dialog" aria-modal="true">
        <header className="drawer-head">
          <div>
            {content?.subtitle && <div className="drawer-eyebrow">{content.subtitle}</div>}
            <h2 className="drawer-title">{content?.title}</h2>
          </div>
          <a href="#close" className="drawer-close" onClick={(e) => { e.preventDefault(); onClose() }} aria-label="Close drawer">×</a>
        </header>
        <div className="drawer-body">{content?.body}</div>
      </aside>
    </div>
  )
}

function MetricCard({ label, value, sub, tone = 'default', onOpen }: { label: string; value: string; sub?: string; tone?: 'default' | 'gold' | 'warn' | 'good'; onOpen?: () => void }) {
  const Tag: 'a' | 'div' = onOpen ? 'a' : 'div'
  const props = onOpen ? { href: '#', onClick: (e: React.MouseEvent) => { e.preventDefault(); onOpen() }, role: 'button' as const } : {}
  return (
    <Tag className={`metric tone-${tone} ${onOpen ? 'is-interactive' : ''}`} {...(props as Record<string, unknown>)}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
      {onOpen && <div className="metric-cta">View details →</div>}
    </Tag>
  )
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="num-list">
      {items.map((t) => <li key={t}><span className="num-list-text">{t}</span></li>)}
    </ol>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((t) => (
        <li key={t}><CheckIcon /><span>{t}</span></li>
      ))}
    </ul>
  )
}

function OverviewPage({ openDrawer, onNav }: { openDrawer: (c: DrawerContent) => void; onNav: (id: PageId) => void }) {
  return (
    <section className="page page-overview">
      <header className="page-head">
        <div className="page-eyebrow">Project Brief · CI Institute of Nursing</div>
        <h1 className="page-title">CNA Recert, HHA Initial, HHA Renewal & Moodle Build</h1>
        <p className="page-lede">Core preparation is complete. Teams are now executing assigned workstreams. TJ continues to oversee the project.</p>
      </header>

      <div className="overview-grid">
        <article className="ov-card ov-card-hero">
          <div className="ov-hero-row">
            <div>
              <div className="ov-hero-eyebrow">Timeline</div>
              <div className="ov-hero-value">1 – 2 weeks</div>
              <div className="ov-hero-sub">Aggressive 1 week · Conservative 2 weeks</div>
            </div>
            <div className="ov-hero-divider" />
            <div>
              <div className="ov-hero-eyebrow">Owner</div>
              <div className="ov-hero-value">TJ</div>
              <div className="ov-hero-sub">Program oversight</div>
            </div>
            <div className="ov-hero-divider" />
            <div>
              <div className="ov-hero-eyebrow">Status</div>
              <div className="ov-hero-value tone-good">Ready for Execution</div>
              <div className="ov-hero-sub">Release gates remain closed</div>
            </div>
          </div>
          <div className="ov-hero-actions">
            <a className="action-link" href="#status" onClick={(e) => { e.preventDefault(); onNav('status') }}>View status board →</a>
            <a className="action-link" href="#approval" onClick={(e) => { e.preventDefault(); onNav('approval') }}>Approval gate rules →</a>
          </div>
        </article>

        <article className="ov-card" onClick={() => onNav('files')} role="button">
          <div className="ov-card-row"><span className="ov-num">01</span><div className="ov-title">Prepared Package</div></div>
          <p className="ov-text">CDPH drafts, CE structure, policies, templates, narration scripts, slide content, and Moodle build workbooks are ready.</p>
          <div className="ov-meta">31 files · 5 groups</div>
        </article>

        <article className="ov-card" onClick={() => onNav('compliance')} role="button">
          <div className="ov-card-row"><span className="ov-num">02</span><div className="ov-title">Compliance Review</div></div>
          <p className="ov-text">Validate forms, confirm open fields, update catalog, collect signatures, and authorize submission.</p>
          <div className="ov-meta">Review → Confirm → Submit</div>
        </article>

        <article className="ov-card" onClick={() => onNav('moodle')} role="button">
          <div className="ov-card-row"><span className="ov-num">03</span><div className="ov-title">Moodle Build</div></div>
          <p className="ov-text">12-course CNA library, HHA 40-hour structure, gating logic, evidence exports. Live certificate issuance stays disabled.</p>
          <div className="ov-meta">Build · Gate · Validate</div>
        </article>

        <article className="ov-card" onClick={() => onNav('marketing')} role="button">
          <div className="ov-card-row"><span className="ov-num">04</span><div className="ov-title">Marketing Assets</div></div>
          <p className="ov-text">Narration and slides are provided. Marketing executes TTS voice and design polish, then delivers upload-ready batches.</p>
          <div className="ov-meta">TTS · Design · Export</div>
        </article>

        <article className="ov-card" onClick={() => onNav('website')} role="button">
          <div className="ov-card-row"><span className="ov-num">05</span><div className="ov-title">Website Updates</div></div>
          <p className="ov-text">Minimum public updates with strict claim safety: contact info, CNA Online CE page, HHA notices, catalog update.</p>
          <div className="ov-meta">Claim-safe · Reviewer-ready</div>
        </article>
      </div>

      <aside className="overview-side">
        <header className="side-head">
          <div className="side-eyebrow">Quick Reference</div>
          <div className="side-title">School & Contact</div>
        </header>
        <div className="side-body">
          <div className="side-row"><span>School</span><strong>CI Institute of Nursing</strong></div>
          <div className="side-row"><span>Site</span><strong>ciinstituteofnursing.com</strong></div>
          <div className="side-row"><span>Address</span><strong>419 E Hamilton Ave, Campbell CA 95008</strong></div>
          <div className="side-row"><span>Phone</span><strong>(650) 799-5744</strong></div>
          <div className="side-row"><span>Email</span><strong className="tone-warn">Pending Compliance</strong></div>
        </div>
        <a className="side-link" href="#approval-gate" onClick={(e) => {
          e.preventDefault()
          openDrawer({
            title: 'Approval Gate Rules',
            subtitle: 'Release controls',
            body: <ApprovalDrawerBody />,
          })
        }}>View approval gate rules →</a>
      </aside>
    </section>
  )
}

function StatusPage({ openDrawer }: { openDrawer: (c: DrawerContent) => void }) {
  return (
    <section className="page page-status">
      <header className="page-head page-head-row">
        <div>
          <div className="page-eyebrow">Status Dashboard</div>
          <h1 className="page-title">Calm and Controlled</h1>
          <p className="page-lede">Program is active. Release gates remain intentionally closed until final compliance verification.</p>
        </div>
        <a className="action-link" href="#" onClick={(e) => { e.preventDefault(); openDrawer({
          title: 'Why gates remain closed',
          subtitle: 'Status detail',
          body: <ul className="check-list">
            <CheckItem>Phase 2 conditional hold protects unsupported public claims.</CheckItem>
            <CheckItem>Final CDPH submission requires signed forms dated at submission time.</CheckItem>
            <CheckItem>Live certificate issuance must wait until Compliance clears the package.</CheckItem>
            <CheckItem>Reviewer access is staged before final submission to validate Moodle build.</CheckItem>
          </ul>,
        }) }}>View gate logic →</a>
      </header>

      <div className="status-grid">
        <MetricCard label="Phase 2" value="Conditional Hold" sub="Open items being closed" tone="gold" />
        <MetricCard label="Phase 3" value="Prep Only" sub="Not go — preparation continues" tone="default" />
        <MetricCard label="Forms" value="Drafts Filled" sub="Ready for compliance review" tone="default" />
        <MetricCard label="Signatures" value="Pending" sub="Date at submission time" tone="warn" />
        <MetricCard label="Catalog" value="Provided" sub="Needs compliance review" tone="warn" />
        <MetricCard label="Moodle" value="Prep Ready" sub="Build scheduled" tone="good" />
        <MetricCard label="Website" value="Updates Needed" sub="Minimum changes only" tone="warn" />
        <MetricCard label="Certificates" value="Not Issued" sub="Gated until clearance" tone="default" />
      </div>

      <div className="status-foot">
        <div className="status-foot-item"><LockIcon /> No submission yet</div>
        <div className="status-foot-item"><LockIcon /> No signatures yet</div>
        <div className="status-foot-item"><LockIcon /> No live certificate issuance</div>
        <div className="status-foot-item"><LockIcon /> No unsupported HHA online CE claims</div>
      </div>
    </section>
  )
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return <li><CheckIcon /><span>{children}</span></li>
}

function CompliancePage({ openDrawer }: { openDrawer: (c: DrawerContent) => void }) {
  const cdphItems = [
    'CDPH 192B contact email',
    'CDPH 193 school ID / general email / contact emails',
    'CE unit fee or membership wording',
    'HHA provider ID / HHP identifier',
    'CDPH 171 / 171A / 171B review',
    'CDPH 276E facility-side information if applicable',
    'Facility schedule / clinical schedule if required',
    'Instructor / faculty roster',
    'Instructor license / resume documentation if required',
    'Business license',
    'Catalog update / addendum',
    'Signature authority',
  ]
  return (
    <section className="page page-three">
      <header className="page-head page-head-row">
        <div>
          <div className="page-eyebrow">Workstream · Compliance</div>
          <h1 className="page-title">Review → Confirm → Submit</h1>
          <p className="page-lede">Compliance validates and finalizes the prepared package, then authorizes submission.</p>
        </div>
        <a className="action-link" href="#" onClick={(e) => { e.preventDefault(); openDrawer({
          title: 'CDPH Confirmation Checklist',
          subtitle: 'Open items to verify before submission',
          body: <CheckList items={cdphItems} />,
        }) }}>Open CDPH checklist →</a>
      </header>

      <div className="three-col-grid">
        <article className="work-card">
          <header className="work-head"><span className="work-num">1</span><h3>Review</h3></header>
          <NumberedList items={[
            'Review completed CDPH forms and all attachments.',
            'Cross-check open fields against Phase 2 ready-for-review list.',
            'Verify name usage (Vanessa Valerio RN, Maria Bustos LVN).',
          ]} />
        </article>
        <article className="work-card">
          <header className="work-head"><span className="work-num">2</span><h3>Confirm</h3></header>
          <NumberedList items={[
            'Confirm official emails, school ID, fee / membership wording.',
            'Confirm HHA identifiers and facility information.',
            'Review and update catalog before application submission.',
            'Confirm HHA Renewal applicability and clinical schedule requirements.',
          ]} />
        </article>
        <article className="work-card">
          <header className="work-head"><span className="work-num">3</span><h3>Submit</h3></header>
          <NumberedList items={[
            'Collect signatures and date forms at submission time.',
            'Confirm required CDPH supporting documents are complete.',
            'Submit, mail, or email final package after final review.',
            'Notify Moodle / Marketing / Website teams of clearance.',
          ]} />
        </article>
      </div>

      <div className="strip">
        <div className="strip-item"><span className="strip-num">12</span><span className="strip-lbl">CDPH items to confirm</span></div>
        <div className="strip-item"><span className="strip-num">3</span><span className="strip-lbl">Tracks (CNA · HHA Initial · HHA Renewal)</span></div>
        <div className="strip-item"><span className="strip-num">0</span><span className="strip-lbl">Submissions sent</span></div>
        <div className="strip-item"><span className="strip-num tone-good">Ready</span><span className="strip-lbl">Drafts and policies prepared</span></div>
      </div>
    </section>
  )
}

function MarketingPage({ openDrawer }: { openDrawer: (c: DrawerContent) => void }) {
  return (
    <section className="page page-marketing">
      <header className="page-head page-head-row">
        <div>
          <div className="page-eyebrow">Workstream · Marketing</div>
          <h1 className="page-title">Asset Production Pipeline</h1>
          <p className="page-lede">Narration and slides are provided. Marketing executes TTS voice and professional design, then delivers organized asset batches.</p>
        </div>
        <a className="action-link" href="#" onClick={(e) => { e.preventDefault(); openDrawer({
          title: 'Marketing Deliverables',
          subtitle: 'What ships to Moodle',
          body: <CheckList items={[
            'Per-course and per-module TTS audio files.',
            'Designed slide decks with brand polish.',
            'Transcripts paired with audio for accessibility.',
            'Asset folder structure organized for Moodle upload.',
          ]} />,
        }) }}>View team deliverables →</a>
      </header>

      <div className="pipeline">
        <PipeStep n="01" title="Provided Content" desc="Narration scripts, slide content, TTS planning, question coverage maps." />
        <PipeArrow />
        <PipeStep n="02" title="Voice / TTS" desc="Clone or generate voice from provided narration content." />
        <PipeArrow />
        <PipeStep n="03" title="Slide Design" desc="Apply professional visual design to provided slide content." />
        <PipeArrow />
        <PipeStep n="04" title="Export" desc="Export audio files and final deck assets organized by course / module." />
        <PipeArrow />
        <PipeStep n="05" title="Moodle Upload" desc="Deliver upload-ready batch to the Moodle build team." last />
      </div>

      <div className="emphasis-row">
        <article className="emphasis">
          <div className="emph-title">Already Provided</div>
          <ul className="check-list">
            <CheckItem>Narration scripts</CheckItem>
            <CheckItem>Slide content</CheckItem>
            <CheckItem>TTS planning package</CheckItem>
            <CheckItem>Question coverage maps</CheckItem>
          </ul>
        </article>
        <article className="emphasis">
          <div className="emph-title">Marketing Owns</div>
          <ul className="check-list">
            <CheckItem>Voice cloning / TTS generation</CheckItem>
            <CheckItem>Design and formatting</CheckItem>
            <CheckItem>Final audio and deck export</CheckItem>
            <CheckItem>Course / module asset organization</CheckItem>
          </ul>
        </article>
      </div>
    </section>
  )
}

function PipeStep({ n, title, desc, last }: { n: string; title: string; desc: string; last?: boolean }) {
  return (
    <div className={`pipe-step ${last ? 'is-last' : ''}`}>
      <div className="pipe-num">{n}</div>
      <div className="pipe-title">{title}</div>
      <div className="pipe-desc">{desc}</div>
    </div>
  )
}

function PipeArrow() {
  return (
    <div className="pipe-arrow" aria-hidden>
      <svg viewBox="0 0 24 12" width="24" height="12"><path d="M0 6h22M18 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  )
}

function MoodlePage({ openDrawer }: { openDrawer: (c: DrawerContent) => void }) {
  return (
    <section className="page page-moodle">
      <header className="page-head page-head-row">
        <div>
          <div className="page-eyebrow">Workstream · Moodle</div>
          <h1 className="page-title">Technical Build Map</h1>
          <p className="page-lede">Build the platform with prepared architecture and strict gating. Live certificate issuance remains disabled.</p>
        </div>
        <a className="action-link" href="#" onClick={(e) => { e.preventDefault(); openDrawer({
          title: 'Moodle Control Rules',
          subtitle: 'Gates and validations',
          body: <CheckList items={[
            'Reviewer / test access is created only after Compliance approves credentials.',
            'Final TTS and slide assets are uploaded after Marketing delivery.',
            'Reviewer pathway is validated and evidence exports run before submission.',
            'Live certificate issuance stays disabled until Compliance clears package.',
          ]} />,
        }) }}>View control rules →</a>
      </header>

      <div className="moodle-grid">
        <article className="moodle-card">
          <div className="moodle-eye">Structure</div>
          <ul className="check-list">
            <CheckItem>Course categories and shells</CheckItem>
            <CheckItem>CNA Online CE 12-course library</CheckItem>
            <CheckItem>HHA Initial 40-hour unit structure</CheckItem>
          </ul>
        </article>
        <article className="moodle-card">
          <div className="moodle-eye">Assessment</div>
          <ul className="check-list">
            <CheckItem>Quizzes and question banks</CheckItem>
            <CheckItem>Completion tracking</CheckItem>
            <CheckItem>Seat-time and timer rules</CheckItem>
          </ul>
        </article>
        <article className="moodle-card">
          <div className="moodle-eye">Gating</div>
          <ul className="check-list">
            <CheckItem>Affidavit gates</CheckItem>
            <CheckItem>Certificate release rules</CheckItem>
            <CheckItem>Reports and evidence exports</CheckItem>
          </ul>
        </article>
        <article className="moodle-card">
          <div className="moodle-eye">Access</div>
          <ul className="check-list">
            <CheckItem>Reviewer / test access after compliance approval</CheckItem>
            <CheckItem>Upload TTS and designed slides post-Marketing</CheckItem>
            <CheckItem>QA evidence pathway validated</CheckItem>
          </ul>
        </article>
      </div>

      <div className="gate-bar">
        <LockIcon /> <strong>Gate:</strong> Live certificate issuance remains disabled until Compliance clears the package.
      </div>
    </section>
  )
}

function WebsitePage({ openDrawer }: { openDrawer: (c: DrawerContent) => void }) {
  return (
    <section className="page page-website">
      <header className="page-head page-head-row">
        <div>
          <div className="page-eyebrow">Workstream · Website</div>
          <h1 className="page-title">Minimum Updates, Maximum Claim Safety</h1>
          <p className="page-lede">Apply approved public updates now. Keep release-sensitive claims off public surfaces.</p>
        </div>
        <a className="action-link" href="#" onClick={(e) => { e.preventDefault(); openDrawer({
          title: 'Website Update Checklist',
          subtitle: 'Required public changes',
          body: <CheckList items={[
            'CNA Online CE page with pending-CDPH-approval language.',
            'Reviewer access path before final CNA Online CE submission.',
            'Cautious HHA Initial 40-hour page.',
            'Cautious HHA Renewal page.',
            'Catalog update notice.',
          ]} />,
        }) }}>View update checklist →</a>
      </header>

      <div className="website-grid">
        <article className="web-card">
          <div className="web-eye">Identity</div>
          <div className="web-row"><span>School</span><strong>CI Institute of Nursing</strong></div>
          <div className="web-row"><span>Site</span><strong>ciinstituteofnursing.com</strong></div>
        </article>
        <article className="web-card">
          <div className="web-eye">Contact</div>
          <div className="web-row"><span>Address</span><strong>419 E Hamilton Ave, Campbell CA 95008</strong></div>
          <div className="web-row"><span>Phone</span><strong>(650) 799-5744</strong></div>
          <div className="web-row"><span>Email</span><strong className="tone-warn">Pending Compliance</strong></div>
        </article>
        <article className="web-card">
          <div className="web-eye">Public Pages</div>
          <ul className="check-list">
            <CheckItem>CNA Online CE — pending CDPH approval language</CheckItem>
            <CheckItem>Reviewer access path before submission</CheckItem>
            <CheckItem>HHA Initial 40-hour cautious page</CheckItem>
            <CheckItem>HHA Renewal cautious page</CheckItem>
            <CheckItem>Catalog update notice</CheckItem>
          </ul>
        </article>
        <article className="web-card web-card-risk">
          <div className="web-eye tone-warn">Remove Risky Claims</div>
          <ul className="risk-list">
            <li>No CDPH-approved claim before approval.</li>
            <li>No CNA CE certificates available now before approval.</li>
            <li>No HHA online CE unless Compliance confirms.</li>
            <li>No fully online HHA Initial if skills / clinical verification required.</li>
            <li>No CI-ION on public / application-facing pages.</li>
            <li>No public enrollment / payment buttons until cleared.</li>
            <li>No NAC# until CDPH issues it.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

function TimelinePage({ openDrawer }: { openDrawer: (c: DrawerContent) => void }) {
  return (
    <section className="page page-timeline">
      <header className="page-head page-head-row">
        <div>
          <div className="page-eyebrow">Delivery Window · 1 – 2 Weeks</div>
          <h1 className="page-title">Two-Week Execution Plan</h1>
          <p className="page-lede">Aggressive path completes in 1 week with fast decisions. Conservative path completes in 2 weeks if approvals or facility details lag.</p>
        </div>
        <a className="action-link" href="#" onClick={(e) => { e.preventDefault(); openDrawer({
          title: 'Delivery Risk Notes',
          subtitle: 'What can shift the timeline',
          body: <CheckList items={[
            'Compliance signature scheduling.',
            'Facility / clinical schedule confirmation.',
            'CE fee / membership pricing decision.',
            'Reviewer LMS credential rotation.',
          ]} />,
        }) }}>View delivery risks →</a>
      </header>

      <div className="tl-grid">
        <div className="tl-week">
          <div className="tl-week-head"><span className="tl-num">W1</span><h3>Week 1</h3><span className="tl-tag tone-good">Aggressive Path</span></div>
          <div className="tl-rows">
            <TLRow owner="Compliance" task="Review forms, catalog, open fields" />
            <TLRow owner="Moodle" task="Build shells and gating logic" />
            <TLRow owner="Marketing" task="Begin TTS and slide design" />
            <TLRow owner="Website" task="Implement minimum updates" />
          </div>
        </div>
        <div className="tl-week">
          <div className="tl-week-head"><span className="tl-num">W2</span><h3>Week 2</h3><span className="tl-tag tone-warn">Conservative Path</span></div>
          <div className="tl-rows">
            <TLRow owner="Compliance" task="Finalize blockers and signatures" />
            <TLRow owner="Moodle" task="QA and reviewer access validated" />
            <TLRow owner="Marketing" task="Finalize / batch upload-ready assets" />
            <TLRow owner="Submission" task="Final package assembled" />
          </div>
        </div>
      </div>

      <div className="tl-foot">
        <div className="tl-foot-item"><span className="tl-foot-pill tone-good">1 wk</span> Aggressive: decisions move quickly</div>
        <div className="tl-foot-item"><span className="tl-foot-pill tone-warn">2 wk</span> Conservative: approvals or facility info take longer</div>
      </div>
    </section>
  )
}

function TLRow({ owner, task }: { owner: string; task: string }) {
  return (
    <div className="tl-row">
      <span className="tl-row-owner">{owner}</span>
      <span className="tl-row-task">{task}</span>
    </div>
  )
}

function FilesPage({ openDrawer }: { openDrawer: (c: DrawerContent) => void }) {
  return (
    <section className="page page-files">
      <header className="page-head">
        <div className="page-eyebrow">Prepared Files</div>
        <h1 className="page-title">Project Brief — Downloadable Package</h1>
        <p className="page-lede">Every prepared artifact is downloadable. Open a group to see the full list and individual file purposes.</p>
      </header>

      <div className="files-grid">
        {preparedGroups.map((g) => (
          <article key={g.id} className="file-card" onClick={() => openDrawer({
            title: g.name,
            subtitle: 'Prepared Files',
            body: <FilesDrawerList files={g.files} />,
          })} role="button">
            <div className="file-card-head">
              <span className="file-card-num">{String(preparedGroups.indexOf(g) + 1).padStart(2, '0')}</span>
              <h3 className="file-card-title">{g.name}</h3>
            </div>
            <p className="file-card-sum">{g.summary}</p>
            <div className="file-card-foot">
              <span className="file-card-count">{g.files.length} files</span>
              <span className="file-card-cta">Open list →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FilesDrawerList({ files }: { files: PreparedFile[] }) {
  return (
    <ul className="drawer-files">
      {files.map((f) => (
        <li key={f.href}>
          <a className="drawer-file-link" href={f.href} download>
            <span className={`drawer-file-type type-${f.type.toLowerCase()}`}>{f.type}</span>
            <span className="drawer-file-name">{f.label}</span>
          </a>
          <p className="drawer-file-purpose">{f.purpose}</p>
        </li>
      ))}
    </ul>
  )
}

function ApprovalDrawerBody() {
  return (
    <>
      <p className="drawer-lede">Continue execution across all teams now. Hold all release actions until Compliance completes final review and TJ approves the next step.</p>
      <h4 className="drawer-h4">Do not</h4>
      <ul className="check-list">
        <CheckItem>Submit the package.</CheckItem>
        <CheckItem>Sign forms ahead of submission.</CheckItem>
        <CheckItem>Publish or publicly advertise approval.</CheckItem>
        <CheckItem>Issue certificates.</CheckItem>
      </ul>
      <h4 className="drawer-h4">Wait for</h4>
      <ul className="check-list">
        <CheckItem>Compliance final review completion.</CheckItem>
        <CheckItem>Catalog update applied.</CheckItem>
        <CheckItem>Reviewer access validated.</CheckItem>
        <CheckItem>TJ approval for next step.</CheckItem>
      </ul>
    </>
  )
}

function ApprovalPage({ onNav }: { onNav: (id: PageId) => void }) {
  return (
    <section className="page page-approval">
      <header className="page-head">
        <div className="page-eyebrow">Approval Gate</div>
        <h1 className="page-title">Ready for Execution · Not Yet Cleared for Release</h1>
        <p className="page-lede">Everything can keep moving forward now. Release actions stay blocked until final compliance review and TJ approval.</p>
      </header>

      <div className="gate-grid">
        <article className="gate-card gate-warn">
          <header className="gate-head"><span className="gate-icon"><LockIcon /></span><h3>Do Not</h3></header>
          <ul className="gate-list">
            <li>Submit the package.</li>
            <li>Sign forms ahead of submission.</li>
            <li>Publish or advertise approval.</li>
            <li>Issue certificates.</li>
          </ul>
        </article>
        <article className="gate-card gate-good">
          <header className="gate-head"><span className="gate-icon"><CheckIcon /></span><h3>Wait For</h3></header>
          <ul className="gate-list">
            <li>Compliance completes final review.</li>
            <li>Catalog update applied.</li>
            <li>Reviewer access validated.</li>
            <li>TJ approves the next step.</li>
          </ul>
        </article>
        <article className="gate-card gate-status">
          <header className="gate-head"><span className="gate-icon">●</span><h3>Current State</h3></header>
          <div className="gate-stat">Ready for Execution</div>
          <div className="gate-sub">All teams may proceed with their workstreams immediately.</div>
          <div className="gate-actions">
            <a className="action-link" href="#" onClick={(e) => { e.preventDefault(); onNav('overview') }}>← Return to overview</a>
            <a className="action-link action-strong" href="#" onClick={(e) => { e.preventDefault(); onNav('files') }}>Open prepared files →</a>
          </div>
        </article>
      </div>
    </section>
  )
}

function buildMarkdown() {
  const lines: string[] = []
  lines.push('# CI Institute of Nursing — Executive Brief')
  lines.push('')
  lines.push('CNA Recert, HHA Initial, HHA Renewal & Moodle Build')
  lines.push('')
  lines.push('## Overview')
  lines.push('- Core preparation is complete; teams now execute assigned workstreams.')
  lines.push('- TJ continues to oversee the project.')
  lines.push('- Timeline: 1 week aggressive / 2 weeks conservative.')
  lines.push('')
  lines.push('## Status')
  lines.push('- Phase 2: Conditional Hold')
  lines.push('- Phase 3: Prep Only, Not Go')
  lines.push('- No submission, no signatures, no live certificate issuance yet.')
  lines.push('')
  lines.push('## Workstreams')
  lines.push('- Compliance: validate forms, confirm open fields, update catalog, collect signatures, submit.')
  lines.push('- Marketing: TTS voice and design polish on provided narration/slides, then deliver upload-ready batch.')
  lines.push('- Moodle: build shells, configure gating, validate reviewer access; certificate issuance gated.')
  lines.push('- Website: minimum updates with strict claim safety.')
  lines.push('')
  lines.push('## Approval Gate')
  lines.push('Continue execution now. Do not submit, sign, publish, advertise approval, or issue certificates')
  lines.push('until Compliance completes final review and TJ approves the next step.')
  return lines.join('\n')
}

export default App
