type PreparedFile = {
  href: string
  label: string
  purpose: string
  type: 'XLSX' | 'MD' | 'PS1'
}

type PreparedGroup = {
  id: string
  name: string
  files: PreparedFile[]
}

const FILES = '/handoff'

const preparedGroups: PreparedGroup[] = [
  {
    id: 'format-standards',
    name: 'Format Standards',
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
    files: [
      { href: `${FILES}/02_CNA_RECERT/CNA_ONLINE_CE_COURSE_LIST.xlsx`, label: 'CNA_ONLINE_CE_COURSE_LIST.xlsx', purpose: '12-course CE list with hours.', type: 'XLSX' },
      { href: `${FILES}/02_CNA_RECERT/CNA_CE_COURSE_HOUR_MATRIX.md`, label: 'CNA_CE_COURSE_HOUR_MATRIX.md', purpose: 'Per-course CE hour matrix.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md`, label: 'CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md', purpose: 'CDPH 192B attachment source.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_IDENTITY_VERIFICATION_POLICY.md`, label: 'CNA_IDENTITY_VERIFICATION_POLICY.md', purpose: 'Identity verification policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_INTERACTIVITY_AND_FEEDBACK_POLICY.md`, label: 'CNA_INTERACTIVITY_AND_FEEDBACK_POLICY.md', purpose: 'Interactivity and feedback policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_ONLINE_CE_TIMER_SEAT_TIME_POLICY.md`, label: 'CNA_ONLINE_CE_TIMER_SEAT_TIME_POLICY.md', purpose: 'Seat-time / timer policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_POSTTEST_EXAM_POLICY.md`, label: 'CNA_POSTTEST_EXAM_POLICY.md', purpose: 'Post-test / exam policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_RECORDKEEPING_POLICY.md`, label: 'CNA_RECORDKEEPING_POLICY.md', purpose: 'Recordkeeping policy.', type: 'MD' },
      { href: `${FILES}/02_CNA_RECERT/CNA_LMS_COMPLIANCE_NARRATIVE.md`, label: 'CNA_LMS_COMPLIANCE_NARRATIVE.md', purpose: 'LMS compliance narrative.', type: 'MD' },
    ],
  },
  {
    id: 'hha-initial',
    name: 'HHA Initial',
    files: [
      { href: `${FILES}/03_HHA_INITIAL/STUDENT_ATTENDANCE_TEMPLATE.xlsx`, label: 'STUDENT_ATTENDANCE_TEMPLATE.xlsx', purpose: 'HHA attendance template.', type: 'XLSX' },
      { href: `${FILES}/03_HHA_INITIAL/STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx`, label: 'STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx', purpose: 'HHA competency evaluation form.', type: 'XLSX' },
    ],
  },
  {
    id: 'hha-renewal',
    name: 'HHA Renewal',
    files: [
      { href: `${FILES}/04_HHA_RENEWAL/ATTENDANCE_TRAINING_TEMPLATE.xlsx`, label: 'ATTENDANCE_TRAINING_TEMPLATE.xlsx', purpose: 'HHA renewal attendance template.', type: 'XLSX' },
    ],
  },
  {
    id: 'moodle-build',
    name: 'Moodle Build',
    files: [
      { href: `${FILES}/05_MOODLE_BUILD/CNA_MOODLE_BUILD_OVERVIEW.xlsx`, label: 'CNA_MOODLE_BUILD_OVERVIEW.xlsx', purpose: 'Multi-sheet build overview.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_COURSE_IMPORT_TEMPLATE.xlsx`, label: 'CNA_COURSE_IMPORT_TEMPLATE.xlsx', purpose: 'Moodle course shell import.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx`, label: 'CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx', purpose: 'Activity / resource map.', type: 'XLSX' },
      { href: `${FILES}/05_MOODLE_BUILD/CNA_COMPLETION_RULE_TEMPLATE.xlsx`, label: 'CNA_COMPLETION_RULE_TEMPLATE.xlsx', purpose: 'Certificate release gates.', type: 'XLSX' },
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
    name: 'Index & Build Utility',
    files: [
      { href: `${FILES}/HANDOFF_INDEX.md`, label: 'HANDOFF_INDEX.md', purpose: 'Master index of prepared package.', type: 'MD' },
      { href: `${FILES}/BUILD_XLSX.ps1`, label: 'BUILD_XLSX.ps1', purpose: 'XLSX build utility script.', type: 'PS1' },
    ],
  },
]

const statusItems = [
  { label: 'Phase 2', value: 'Conditional Hold' },
  { label: 'Phase 3', value: 'Prep Only' },
  { label: 'Forms', value: 'Drafts Filled' },
  { label: 'Signatures', value: 'Pending' },
  { label: 'Catalog', value: 'Needs Review' },
  { label: 'Moodle', value: 'Prep Ready' },
  { label: 'Website', value: 'Updates Needed' },
  { label: 'Certificates', value: 'Not Issued' },
]

function App() {
  const onPrint = () => window.print()

  const onDownloadMarkdown = () => {
    const md = buildMarkdown()
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'CIIN_Project_Brief.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="brief">
      <header className="brief-head">
        <div className="brief-head-inner">
          <div className="brand">
            <img className="brand-mark" src="/assets/brand/ci-ion-logo-original.svg" alt="CI Institute of Nursing" />
          </div>
          <div className="brief-actions">
            <a className="link" href="#download" onClick={(e) => { e.preventDefault(); onDownloadMarkdown() }}>Download Brief</a>
            <a className="link link-strong" href="#print" onClick={(e) => { e.preventDefault(); onPrint() }}>Export PDF</a>
          </div>
        </div>
      </header>

      <main className="brief-main">
        <section className="hero">
          <div className="eyebrow">Project Brief · Executive Summary</div>
          <h1 className="hero-title">CNA Recert · HHA Initial · HHA Renewal · Moodle Build</h1>
          <p className="hero-lede">
            Core preparation is complete. Teams are now executing their assigned workstreams.
            TJ continues to oversee the project. Target timeline: 1 week aggressive / 2 weeks conservative.
          </p>
        </section>

        <section className="status">
          <h2 className="h2">Current Status</h2>
          <div className="status-grid">
            {statusItems.map((s) => (
              <div className="status-cell" key={s.label}>
                <div className="status-label">{s.label}</div>
                <div className="status-value">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="workstreams">
          <h2 className="h2">Workstreams</h2>
          <div className="ws-grid">
            <article className="ws">
              <h3>Compliance</h3>
              <p>Review the prepared CDPH package, confirm open fields (official emails, school ID, CE fee wording, HHA identifiers, facility info), update the catalog, collect signatures at submission time, and authorize submission.</p>
            </article>
            <article className="ws">
              <h3>Marketing</h3>
              <p>Narration scripts and slide content are provided. Marketing executes TTS voice and professional design, exports final audio and decks, and delivers an organized batch to the Moodle team.</p>
            </article>
            <article className="ws">
              <h3>Moodle</h3>
              <p>Build categories and shells, the CNA Online CE 12-course library, the HHA Initial 40-hour structure, quizzes and banks, completion tracking, gating, and evidence exports. Live certificate issuance stays disabled until Compliance clears the package.</p>
            </article>
            <article className="ws">
              <h3>Website</h3>
              <p>Apply minimum public updates with strict claim safety: contact info, CNA Online CE page with pending-CDPH language, reviewer access path, cautious HHA pages, and catalog update notice. No CDPH-approved or certificate-availability claims before clearance.</p>
            </article>
          </div>
        </section>

        <section className="timeline">
          <h2 className="h2">Timeline</h2>
          <div className="tl-grid">
            <div className="tl-week">
              <div className="tl-week-head">Week 1</div>
              <ul>
                <li>Compliance reviews forms, catalog, and open fields.</li>
                <li>Moodle builds shells and gating logic.</li>
                <li>Marketing begins TTS and slide design.</li>
                <li>Website implements minimum updates.</li>
              </ul>
            </div>
            <div className="tl-week">
              <div className="tl-week-head">Week 2</div>
              <ul>
                <li>Compliance finalizes blockers and signatures.</li>
                <li>Moodle QA and reviewer access validated.</li>
                <li>Marketing finalizes upload-ready assets.</li>
                <li>Final package assembled for submission.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="files">
          <h2 className="h2">Prepared Files</h2>
          <p className="files-note">All prepared deliverables — click any filename to download.</p>
          {preparedGroups.map((g) => (
            <div className="file-group" key={g.id}>
              <h3 className="file-group-title">{g.name}</h3>
              <ul className="file-list">
                {g.files.map((f) => (
                  <li className="file-row" key={f.href}>
                    <a className="file-name" href={f.href} download>{f.label}</a>
                    <span className={`file-type type-${f.type.toLowerCase()}`}>{f.type}</span>
                    <span className="file-purpose">{f.purpose}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="gate">
          <h2 className="h2">Approval Gate</h2>
          <p>
            Execution continues now. Do not submit, sign, publish, advertise approval, or issue
            certificates until Compliance completes final review and TJ approves the next step.
          </p>
        </section>

        <footer className="foot">
          <span>© 2026 CI Institute of Nursing — Internal Project Brief</span>
          <a className="link" href="https://ciinstituteofnursing.com/" target="_blank" rel="noreferrer">ciinstituteofnursing.com</a>
        </footer>
      </main>
    </div>
  )
}

function buildMarkdown() {
  const lines: string[] = []
  lines.push('# CI Institute of Nursing — Project Brief')
  lines.push('CNA Recert · HHA Initial · HHA Renewal · Moodle Build')
  lines.push('')
  lines.push('Core preparation is complete. Teams are now executing assigned workstreams.')
  lines.push('TJ continues to oversee the project. Timeline: 1 week aggressive / 2 weeks conservative.')
  lines.push('')
  lines.push('## Status')
  statusItems.forEach((s) => lines.push(`- ${s.label}: ${s.value}`))
  lines.push('')
  lines.push('## Workstreams')
  lines.push('- Compliance: validate CDPH package, confirm open fields, collect signatures, authorize submission.')
  lines.push('- Marketing: TTS voice and design polish on provided narration and slides, deliver upload-ready batch.')
  lines.push('- Moodle: build shells and gating; live certificate issuance gated.')
  lines.push('- Website: minimum updates with strict claim safety.')
  lines.push('')
  lines.push('## Timeline')
  lines.push('- Week 1: compliance review, Moodle shells, Marketing TTS/design, website updates.')
  lines.push('- Week 2: signatures, QA, asset finalization, final package assembly.')
  lines.push('')
  lines.push('## Approval Gate')
  lines.push('Execution continues now. Do not submit, sign, publish, advertise approval, or issue certificates')
  lines.push('until Compliance completes final review and TJ approves the next step.')
  return lines.join('\n')
}

export default App
