import { useEffect, useState } from 'react'

type HandoffFile = {
  href: string
  label: string
  description: string
  type: 'Excel' | 'Markdown'
}

type HandoffGroup = {
  id: string
  title: string
  intro: string
  files: HandoffFile[]
}

type WorkstreamLink = {
  label: string
  href: string
}

type Workstream = {
  id: string
  title: string
  summary: string
  keyPoints: string[]
  tasks: string[]
  handoff: string[]
  links: WorkstreamLink[]
}

const HANDOFF_BASE = '/handoff'

const handoffGroups: HandoffGroup[] = [
  {
    id: 'format-standards',
    title: '01 — Format Standards',
    intro:
      'Phase 2 QA artifacts and project-wide file format conventions. Source-of-truth for compliance review.',
    files: [
      {
        href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/FORMAT_CONVENTIONS.md`,
        label: 'FORMAT_CONVENTIONS.md',
        description: 'File format and letterhead rules for all project documents.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/OUTPUT_FILE_MANIFEST_PHASE_2.md`,
        label: 'OUTPUT_FILE_MANIFEST_PHASE_2.md',
        description: 'Full manifest of Phase 2 artifacts with file-type classifications.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/PHASE_2_QA_CHECKLIST.md`,
        label: 'PHASE_2_QA_CHECKLIST.md',
        description: 'Phase 2 gate checklist — pass/fail/open status per item.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/PHASE_2_MISSING_INFORMATION_SUMMARY.md`,
        label: 'PHASE_2_MISSING_INFORMATION_SUMMARY.md',
        description: 'All open/missing items grouped by track.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/PHASE_2_READY_FOR_REVIEW.md`,
        label: 'PHASE_2_READY_FOR_REVIEW.md',
        description: 'Human review action list and current compliance status.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/PHASE_2_PDF_REVISIT_QUEUE.md`,
        label: 'PHASE_2_PDF_REVISIT_QUEUE.md',
        description: 'Queue of blank PDF fields with justification register.',
        type: 'Markdown',
      },
    ],
  },
  {
    id: 'cna-recert',
    title: '02 — CNA Recert',
    intro:
      'CNA recert policy sources, course list workbook, and CDPH 192B course attachment. Convert .md policies to .docx with letterhead before submission.',
    files: [
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_ONLINE_CE_COURSE_LIST.xlsx`,
        label: 'CNA_ONLINE_CE_COURSE_LIST.xlsx',
        description: '12-course CE list with CE hours, delivery type, and source modules.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_CE_COURSE_HOUR_MATRIX.md`,
        label: 'CNA_CE_COURSE_HOUR_MATRIX.md',
        description: 'Expanded per-course matrix — source for XLSX/DOCX conversion.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md`,
        label: 'CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md',
        description: 'CDPH 192B course list attachment — source for DOCX conversion.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_IDENTITY_VERIFICATION_POLICY.md`,
        label: 'CNA_IDENTITY_VERIFICATION_POLICY.md',
        description: 'Submission-quality identity verification policy.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_INTERACTIVITY_AND_FEEDBACK_POLICY.md`,
        label: 'CNA_INTERACTIVITY_AND_FEEDBACK_POLICY.md',
        description: 'Interactivity and feedback policy for online CE delivery.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_ONLINE_CE_TIMER_SEAT_TIME_POLICY.md`,
        label: 'CNA_ONLINE_CE_TIMER_SEAT_TIME_POLICY.md',
        description: 'Seat-time and timer enforcement policy.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_POSTTEST_EXAM_POLICY.md`,
        label: 'CNA_POSTTEST_EXAM_POLICY.md',
        description: 'Post-test/exam policy.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_RECORDKEEPING_POLICY.md`,
        label: 'CNA_RECORDKEEPING_POLICY.md',
        description: 'Recordkeeping policy for CE records.',
        type: 'Markdown',
      },
      {
        href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_LMS_COMPLIANCE_NARRATIVE.md`,
        label: 'CNA_LMS_COMPLIANCE_NARRATIVE.md',
        description: 'LMS compliance narrative for submission package.',
        type: 'Markdown',
      },
    ],
  },
  {
    id: 'hha-initial',
    title: '03 — HHA Initial',
    intro: 'HHA 40-hour attendance and competency evaluation templates.',
    files: [
      {
        href: `${HANDOFF_BASE}/03_HHA_INITIAL/STUDENT_ATTENDANCE_TEMPLATE.xlsx`,
        label: 'STUDENT_ATTENDANCE_TEMPLATE.xlsx',
        description: 'HHA 40-hour student attendance tracking template.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/03_HHA_INITIAL/STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx`,
        label: 'STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx',
        description: 'HHA student competency evaluation form.',
        type: 'Excel',
      },
    ],
  },
  {
    id: 'hha-renewal',
    title: '04 — HHA Renewal',
    intro: 'HHA renewal training session templates.',
    files: [
      {
        href: `${HANDOFF_BASE}/04_HHA_RENEWAL/ATTENDANCE_TRAINING_TEMPLATE.xlsx`,
        label: 'ATTENDANCE_TRAINING_TEMPLATE.xlsx',
        description: 'HHA renewal training session attendance template.',
        type: 'Excel',
      },
    ],
  },
  {
    id: 'moodle-build',
    title: '05 — Moodle Build',
    intro:
      'All Moodle configuration workbooks: course shells, activities, completion rules, quiz banks, evidence reports.',
    files: [
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_MOODLE_BUILD_OVERVIEW.xlsx`,
        label: 'CNA_MOODLE_BUILD_OVERVIEW.xlsx',
        description: 'Multi-sheet build overview — one sheet per CNA-CE course.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_COURSE_IMPORT_TEMPLATE.xlsx`,
        label: 'CNA_COURSE_IMPORT_TEMPLATE.xlsx',
        description: 'Moodle course shell import workbook (12 courses).',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx`,
        label: 'CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx',
        description: 'Full activity-resource map for all 12 courses.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_COMPLETION_RULE_TEMPLATE.xlsx`,
        label: 'CNA_COMPLETION_RULE_TEMPLATE.xlsx',
        description: 'Certificate release gate conditions per course.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_QUIZ_BANK_TEMPLATE.xlsx`,
        label: 'CNA_QUIZ_BANK_TEMPLATE.xlsx',
        description: 'Quiz bank coverage map across all 12 courses.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx`,
        label: 'CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx',
        description: 'Completion evidence log template for CDPH records.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/COURSE_IMPORT_TEMPLATE_DRAFT.xlsx`,
        label: 'COURSE_IMPORT_TEMPLATE_DRAFT.xlsx',
        description: 'Blank course import draft template.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/ACTIVITY_RESOURCE_TEMPLATE_DRAFT.xlsx`,
        label: 'ACTIVITY_RESOURCE_TEMPLATE_DRAFT.xlsx',
        description: 'Blank activity resource draft template.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CERTIFICATE_COMPLETION_RULE_TEMPLATE_DRAFT.xlsx`,
        label: 'CERTIFICATE_COMPLETION_RULE_TEMPLATE_DRAFT.xlsx',
        description: 'Blank completion rule draft template.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/QUIZ_BANK_TEMPLATE_DRAFT.xlsx`,
        label: 'QUIZ_BANK_TEMPLATE_DRAFT.xlsx',
        description: 'Blank quiz bank draft template.',
        type: 'Excel',
      },
      {
        href: `${HANDOFF_BASE}/05_MOODLE_BUILD/REPORTING_COMPLETION_EVIDENCE_TEMPLATE_DRAFT.xlsx`,
        label: 'REPORTING_COMPLETION_EVIDENCE_TEMPLATE_DRAFT.xlsx',
        description: 'Blank reporting evidence draft template.',
        type: 'Excel',
      },
    ],
  },
]

const workstreams: Workstream[] = [
  {
    id: 'compliance',
    title: 'Compliance',
    summary: 'Validate and finalize the prepared package, then authorize submission.',
    keyPoints: [
      'Compliance does not rebuild content — it validates, completes open fields, and authorizes.',
      'Confirm official emails, school ID, fee/membership wording, HHA identifiers, and facility info.',
      'Review catalog updates and supporting documents before final assembly.',
    ],
    tasks: [
      'Review CDPH 192B / 193 and all attachments and open fields.',
      'Confirm HHA Renewal applicability and CDPH 171 / 171A / 171B + 276E requirements.',
      'Confirm instructor roster, license/resume docs, business license, and signature authority.',
      'Collect signatures, date forms at submission time, and send final package after final review.',
    ],
    handoff: [
      'Final approved application packet with dated signatures.',
      'Confirmed official contact fields and fee language.',
      'Compliance clearance notice issued to Moodle, Marketing, and Website teams.',
    ],
    links: [
      { label: 'CDPH 192B course list attachment', href: `${HANDOFF_BASE}/02_CNA_RECERT/CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md` },
      { label: 'CNA LMS compliance narrative', href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_LMS_COMPLIANCE_NARRATIVE.md` },
      { label: 'Phase 2 ready-for-review list', href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/PHASE_2_READY_FOR_REVIEW.md` },
      { label: 'Phase 2 PDF revisit queue', href: `${HANDOFF_BASE}/01_FORMAT_STANDARDS/PHASE_2_PDF_REVISIT_QUEUE.md` },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    summary: 'Execute voice production and design polish using provided source materials.',
    keyPoints: [
      'Narration scripts are already provided — Marketing executes voice cloning / TTS.',
      'Slide content and module structure are already provided — Marketing executes design.',
    ],
    tasks: [
      'Generate TTS voice/audio from provided narration content.',
      'Apply professional visual design to provided slide/course content.',
      'Export final audio files and final deck assets.',
      'Organize outputs by course/module for Moodle upload.',
    ],
    handoff: [
      'Per-course / per-module audio package.',
      'Final slide decks and structured asset folders.',
      'Upload-ready batch delivered to Moodle team.',
    ],
    links: [
      { label: 'CNA CE course hour matrix', href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_CE_COURSE_HOUR_MATRIX.md` },
      { label: 'CNA Online CE course list (xlsx)', href: `${HANDOFF_BASE}/02_CNA_RECERT/CNA_ONLINE_CE_COURSE_LIST.xlsx` },
    ],
  },
  {
    id: 'moodle',
    title: 'Moodle',
    summary: 'Execute the platform build with strict gating and evidence controls.',
    keyPoints: [
      'Build guidance, runbook, and QA structure are already prepared.',
      'Live certificate issuance remains blocked until Compliance clearance.',
    ],
    tasks: [
      'Create categories/shells; build CNA Online CE 12-course library and HHA Initial 40-hour structure.',
      'Configure quiz banks, completion tracking, timers, affidavit gates, certificate release rules, and evidence exports.',
      'Create reviewer/test access after compliance credentials are approved.',
      'Upload final TTS and design assets after Marketing handoff.',
    ],
    handoff: [
      'Reviewer-ready Moodle environment with QA evidence exports.',
      'Credentialed reviewer access package for compliance review.',
      'Go-live checklist with certificate-release gate still disabled.',
    ],
    links: [
      { label: 'CNA Moodle build overview', href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_MOODLE_BUILD_OVERVIEW.xlsx` },
      { label: 'CNA course import template', href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_COURSE_IMPORT_TEMPLATE.xlsx` },
      { label: 'CNA activity-resource template', href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx` },
      { label: 'CNA completion rule template', href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_COMPLETION_RULE_TEMPLATE.xlsx` },
      { label: 'CNA quiz bank template', href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_QUIZ_BANK_TEMPLATE.xlsx` },
      { label: 'CNA reporting evidence template', href: `${HANDOFF_BASE}/05_MOODLE_BUILD/CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx` },
    ],
  },
  {
    id: 'website',
    title: 'Website Updates',
    summary: 'Apply minimum public updates now with strict claim safety.',
    keyPoints: [
      'Use CI Institute of Nursing branding, ciinstituteofnursing.com, 419 E Hamilton Ave Campbell CA 95008, (650) 799-5744.',
      'Add official email after Compliance confirmation.',
      'Add CNA Online CE page with pending-approval language and CDPH reviewer access path.',
      'Add cautious HHA Initial and HHA Renewal pages plus catalog update notice.',
    ],
    tasks: [
      'Publish minimum approved language and contact updates.',
      'Remove unsupported claims and prohibited identifiers from public/application-facing pages.',
      'Keep enrollment/payment calls to action disabled until cleared.',
    ],
    handoff: [
      'Updated public page list with claim-safe copy.',
      'Reviewer-access pathway ready for CDPH review.',
      'Compliance sign-off checklist for public statements.',
    ],
    links: [
      { label: 'ciinstituteofnursing.com', href: 'https://ciinstituteofnursing.com/' },
    ],
  },
]

const stationaryClaims = [
  'Do not claim CDPH approval before approval.',
  'Do not claim CNA CE certificates available now before approval.',
  'Do not claim HHA online CE unless Compliance confirms.',
  'Do not claim fully online HHA Initial if skills/clinical verification is required.',
  'Do not use CI-ION on public/application-facing pages.',
  'Do not show NAC# until CDPH issues it.',
  'Do not add public enrollment/payment buttons until cleared.',
]

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'status', label: 'Gate Status' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'moodle', label: 'Moodle' },
  { id: 'website', label: 'Website' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'handoff', label: 'Handoff Files' },
  { id: 'final-gate', label: 'Approval Gate' },
]

function App() {
  const [activeId, setActiveId] = useState<string>('overview')

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 140
      let current = navSections[0].id
      for (const section of navSections) {
        const element = document.getElementById(section.id)
        if (element && element.offsetTop <= offset) {
          current = section.id
        }
      }
      setActiveId(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="page">
      <nav className="topnav">
        <div className="topnav-inner">
          <a href="#overview" className="brand">
            <img
              className="brand-logo"
              src="/assets/brand/ci-ion-logo-original.svg"
              alt="CI Institute of Nursing"
            />
            <span className="brand-text">CI Institute of Nursing</span>
          </a>
          <div className="topnav-links">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`nav-link ${activeId === section.id ? 'is-active' : ''}`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="content">
        <header id="overview" className="hero">
          <p className="hero-eyebrow">Executive Summary — Project Brief for Team Execution</p>
          <h1 className="hero-title">
            CNA Recert, HHA Initial, HHA Renewal & Moodle Build
          </h1>
          <p className="hero-lede">
            Core preparation is complete. Teams now execute their assigned workstreams.
            TJ continues to oversee the project. Target timeline:{' '}
            <a className="inline-link" href="#timeline">1 week aggressive / 2 weeks conservative</a>.
          </p>
          <p className="hero-meta">
            Jump to:{' '}
            <a className="inline-link" href="#handoff">Handoff Files</a> ·{' '}
            <a className="inline-link" href="#compliance">Compliance</a> ·{' '}
            <a className="inline-link" href="#moodle">Moodle</a> ·{' '}
            <a className="inline-link" href="#final-gate">Approval Gate</a>
          </p>
        </header>

        <section id="status" className="section">
          <h2 className="section-title">Current Gate Status</h2>
          <p className="section-lede">
            Controlled hold while final compliance verification is completed.
          </p>
          <ul className="status-list">
            <li><span className="status-pill status-hold">Phase 2</span> Conditional Hold</li>
            <li><span className="status-pill status-prep">Phase 3</span> Prep Only — Not Go</li>
            <li><span className="status-pill status-blocked">Submission</span> Not sent</li>
            <li><span className="status-pill status-blocked">Signatures</span> Not executed</li>
            <li><span className="status-pill status-blocked">Certificates</span> Not issued</li>
            <li><span className="status-pill status-warn">Public Claims</span> No unsupported HHA online CE claims</li>
          </ul>
        </section>

        {workstreams.map((stream) => (
          <section key={stream.id} id={stream.id} className="section">
            <h2 className="section-title">{stream.title}</h2>
            <p className="section-lede">{stream.summary}</p>

            <div className="three-col">
              <div>
                <h3 className="col-title">Direction</h3>
                <ul className="dash-list">
                  {stream.keyPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="col-title">Execution Tasks</h3>
                <ul className="dash-list">
                  {stream.tasks.map((task) => <li key={task}>{task}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="col-title">Hand-off Outputs</h3>
                <ul className="dash-list">
                  {stream.handoff.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            {stream.links.length > 0 && (
              <p className="inline-resources">
                Resources:{' '}
                {stream.links.map((link, index) => (
                  <span key={link.href}>
                    <a className="inline-link" href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" download={!link.href.startsWith('http')}>
                      {link.label}
                    </a>
                    {index < stream.links.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            )}

            {stream.id === 'website' && (
              <div className="callout">
                <h3 className="callout-title">Claims that must not appear on public/application pages</h3>
                <ul className="dash-list">
                  {stationaryClaims.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            )}
          </section>
        ))}

        <section id="timeline" className="section">
          <h2 className="section-title">Timeline</h2>
          <p className="section-lede">
            Target execution window: 1–2 weeks with parallel workstreams.
          </p>
          <div className="two-col">
            <div>
              <h3 className="col-title">Week 1</h3>
              <ul className="dash-list">
                <li>Compliance reviews forms, catalog, and open fields.</li>
                <li>Moodle builds shells and gating logic.</li>
                <li>Marketing begins TTS and slide design.</li>
                <li>Website minimum updates are implemented.</li>
              </ul>
            </div>
            <div>
              <h3 className="col-title">Week 2</h3>
              <ul className="dash-list">
                <li>Compliance finalizes blockers and signatures.</li>
                <li>Moodle QA and reviewer access validated.</li>
                <li>Marketing finalizes or batches upload-ready assets.</li>
                <li>Final package assembled for submission.</li>
              </ul>
            </div>
          </div>
          <p className="section-note">
            Aggressive path: 1 week with fast decisions. Conservative path: 2 weeks if approvals,
            signatures, or facility details lag.
          </p>
        </section>

        <section id="handoff" className="section">
          <h2 className="section-title">Handoff Files — Downloadable</h2>
          <p className="section-lede">
            Every prepared deliverable is downloadable directly from this page. Click any file name to download.
          </p>

          {handoffGroups.map((group) => (
            <div key={group.id} className="handoff-group">
              <h3 className="handoff-title">{group.title}</h3>
              <p className="handoff-intro">{group.intro}</p>
              <ul className="file-list">
                {group.files.map((file) => (
                  <li key={file.href} className="file-row">
                    <a className="file-link" href={file.href} download>
                      {file.label}
                    </a>
                    <span className={`file-type file-type-${file.type.toLowerCase()}`}>{file.type}</span>
                    <span className="file-description">{file.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="section-note">
            See also:{' '}
            <a className="inline-link" href={`${HANDOFF_BASE}/HANDOFF_INDEX.md`} download>
              HANDOFF_INDEX.md
            </a>
          </p>
        </section>

        <section id="final-gate" className="section section-final">
          <h2 className="section-title">Final Rule / Approval Gate</h2>
          <p className="section-lede">
            Execution continues now; release actions remain gated.
          </p>
          <ul className="dash-list">
            <li>Continue execution across all teams immediately.</li>
            <li>
              Do not submit, sign, publish, advertise approval, or issue certificates until
              Compliance final review is complete and TJ approves the next step.
            </li>
          </ul>
          <p className="section-note">
            Sequence: prepared inputs → verified compliance → approved release.
          </p>
        </section>

        <footer className="footer">
          <span>© 2026 CI Institute of Nursing — Internal Project Brief</span>
          <span>
            <a className="inline-link" href="https://ciinstituteofnursing.com/" target="_blank" rel="noreferrer">
              ciinstituteofnursing.com
            </a>
          </span>
        </footer>
      </main>
    </div>
  )
}

export default App
