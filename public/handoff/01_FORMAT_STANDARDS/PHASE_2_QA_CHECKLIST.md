# PHASE_2_QA_CHECKLIST

## Structural and Folder Controls
- [x] Required folders exist: `OUTPUT_CNA_RECERT`, `OUTPUT_HHA_INITIAL_40_HOUR`, `OUTPUT_HHA_RENEWAL`
- [x] Obsolete folder `OUTPUT_HHA_RECERT` not created
- [x] Forms copied to output folders; source files preserved
- [x] Editable completed PDF drafts created where fillable
- [x] Non-fillable form (CDPH 171A) handled via field-mapping document
- [x] Signature fields intentionally left blank in draft forms
- [x] Unknown/unverified values left blank and logged
- [x] Field mapping docs created for forms used by each track
- [x] Track artifacts include policies, templates, checklists, and missing-information logs
- [x] Newly created formal DOCX documents generated from `Source/CI_ION Letterhead.docx`
- [x] No external submission performed
- [x] No live Moodle changes performed
- [x] No unsupported HHA online CE claim in package artifacts

## CNA Course Matrix and Course List
- [x] Expanded 12-course CNA CE matrix with per-course sections, learning objectives, module mapping, Moodle shell reference, quiz requirement, and certificate release gate — `OUTPUT_CNA_RECERT/03_COURSE_LIST/CNA_CE_COURSE_HOUR_MATRIX.md` (Phase 2 QA Correction)
- [x] Total CE library confirmed at 24 hours (12 × 2); no source-based reason to change
- [x] CDPH 192B course-list attachment created and updated with 12 courses, CE hours, delivery method, and posttest requirement — `OUTPUT_CNA_RECERT/03_COURSE_LIST/CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md` and `.docx`
- [x] CDPH 192B course list attachment explicitly designated as the required course list for CDPH 192B submission; no separate internal course table required in this form version

## CDPH 192B Checkbox and Blank Field Inspection
- [x] Application Type checkbox: **Initial Application** — SELECTED (confirmed in field map)
- [x] Application Type checkbox: Renewal — NOT selected (intentional; initial path)
- [x] Requesting Type of Approval: **Public Access** — SELECTED (confirmed in field map)
- [x] Requesting Type of Approval: Private Employee Only — NOT selected (intentional)
- [x] Contact Person Email: **blank** — documented as missing; must be obtained before submission
- [x] CE Unit Fee / Membership Fee: **blank** — documented as missing; pending pricing decision
- [x] NAC Number / Expiration: **blank** — intentional; initial application; assigned by CDPH upon approval
- [x] Printed Name (Vanessa Valerio): confirmed filled
- [x] Signature: **blank** — intentional; human signing required before submission
- [x] Date: **blank** — intentional; fill on submission date
- [x] All blank fields formally explained in `FORM_FIELD_MAP_cdph192b.md` with Blank Field Justification Register

## CDPH 192 Course Table (HHA Renewal)
- [ ] CDPH 192 course and CE-hour table completion is queued — `PHASE_2_PDF_REVISIT_QUEUE.md` entry active
- [ ] Cannot complete until HHA renewal course/module mapping and form applicability are confirmed by human reviewer

## Policy Documents
- [x] `CNA_IDENTITY_VERIFICATION_POLICY.md` — expanded to submission-quality with all 11 required sections (Phase 2 QA Correction)
- [x] `CNA_INTERACTIVITY_AND_FEEDBACK_POLICY.md` — expanded to submission-quality with all 11 required sections (Phase 2 QA Correction)
- [x] `CNA_ONLINE_CE_TIMER_SEAT_TIME_POLICY.md` — expanded to submission-quality with all 11 required sections (Phase 2 QA Correction)
- [x] `CNA_POSTTEST_EXAM_POLICY.md` — expanded to submission-quality with all 11 required sections (Phase 2 QA Correction)
- [x] `CNA_RECORDKEEPING_POLICY.md` — expanded to submission-quality with all 11 required sections (Phase 2 QA Correction; located in `07_RECORDKEEPING/`)
- [x] `CNA_LMS_COMPLIANCE_NARRATIVE.md` — expanded to submission-quality with all 17 required sections (Phase 2 QA Correction; located in `06_LMS_COMPLIANCE/`)
- [x] Each policy document includes: Purpose, Scope, Policy Statement, Procedure, Responsible Role, Required LMS Control, Evidence Retained, Recordkeeping/Audit Requirement, Exception Handling, Version/Revision Control, Source References
- [ ] `.docx` versions of expanded policies to be regenerated from expanded `.md` sources before submission — OPEN ITEM

## School Name and Website Standardization
- [x] Website standardized to `ciinstituteofnursing.com` in all generated application-facing artifacts
- [x] Public-facing school name standardized as `CI Institute of Nursing` in all application-facing documents
- [x] Abbreviation `CI-ION` not used in application-facing documents (internal project file names only)

## Name Usage Verification
- [x] Vanessa Valerio, RN: confirmed as Program Director via `Source/Initial NATP Approval Letter.pdf`; used in all responsible officer, contact, and printed name fields
- [x] Maria Bustos / Maria Divina Bustos, LVN: confirmed as Instructor via `Source/Initial NATP Approval Letter.pdf`; used only in instructor/faculty fields
- [x] Dee Bustos: NOT confirmed as a legal or source-backed name in any workspace source document; NOT used in application-facing officer, contact, or responsible party fields
- [x] Name-equivalence issue formally documented in `OUTPUT_CNA_RECERT/01_SOURCE_INFORMATION_EXTRACT.md`
- [ ] Open item: If Dee Bustos is legally equivalent to Maria Bustos/Maria Divina Bustos, human reviewer must confirm with a source document before using Dee Bustos in any submission field

## Credential and Security Controls
- [x] `PHASE_2_PDF_REVISIT_QUEUE.md` created and updated
- [x] Reviewer credentials (User ID / Password) contained only in `OUTPUT_CNA_RECERT/08_SUBMISSION_EMAIL/REVIEWER_ACCESS/CDPH_REVIEWER_ACCESS_INSTRUCTIONS_CONTROLLED.md`
- [x] Credential leak check performed: no credential values appear outside the controlled artifact
- [x] `06_LMS_COMPLIANCE/CDPH_REVIEWER_ACCESS_INSTRUCTIONS_TEMPLATE.md` is credential-sanitized
- [x] All policy documents, manifests, QA files, and Moodle templates are credential-free
- [x] Password rotation requirement documented: rotate before final submission

## Phase 2 Gate Status

### Conditions Blocking Phase 2 GO

| Condition | Status |
|---|---|
| 12-course CNA CE matrix expanded with full per-course detail | COMPLETE |
| CDPH 192B course list attachment complete with names and CE hours | COMPLETE |
| CDPH 192 course table for HHA Renewal completed or queued | QUEUED — pending renewal course mapping and applicability confirmation |
| Policy documents expanded beyond short summaries | COMPLETE |
| Website standardized to ciinstituteofnursing.com | COMPLETE |
| School name standardized as CI Institute of Nursing | COMPLETE |
| Name usage for Dee/Maria/Vanessa verified and documented | COMPLETE — open item for human confirmation of Dee/Maria equivalence |
| All blank fields explained with justification | COMPLETE (registered in field maps and missing-information summary) |
| Contact email and fee fields resolved | INCOMPLETE — missing values not yet confirmed |
| Signature fields remain blank | COMPLETE |
| .docx policy files regenerated from expanded .md sources | INCOMPLETE — open item |

**Phase 2 Gate Status: CONDITIONAL HOLD**
**Phase 3 Status: PREP ONLY (NOT GO)**

Phase 2 may not advance to GO until all INCOMPLETE conditions above are resolved by a human reviewer with source-confirmed data.
