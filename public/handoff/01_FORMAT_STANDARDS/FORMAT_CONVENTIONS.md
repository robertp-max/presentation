# CI Institute of Nursing — Project File Format Conventions

**Project:** CI Institute of Nursing — CDPH Application Package (CNA Recert / HHA)
**Version:** 1.0 — May 2026
**Applies to:** All AI-generated and human-edited project artifacts

---

## Rule 1 — Formal Documents → Editable DOCX with Letterhead

Use `.docx` format for all submission-facing, policy, narrative, and compliance documents.

**Letterhead source:** `C:\AI\CIION\Source\CI_ION Letterhead.docx`

**Apply to every formal document:**
- Font: Roboto Light (or closest available sans-serif substitute)
- Footer on every page — same line:
  - Left: `[Document Name] / TJ Padilla`
  - Right: `Page [page number]`
- Provider name: **CI Institute of Nursing** (never CI-ION in application-facing text)
- Website: **ciinstituteofnursing.com**

**File types that are formal DOCX documents:**
- Policy and procedure documents
- Compliance narratives
- Submission email drafts
- Course list attachments (submission copies)
- Certificate templates
- Faculty/instructor qualification letters

---

## Rule 2 — Structured Tables, Trackers, Matrices, Logs → `.xlsx` Excel Workbook

**Do not use CSV for any human-review document.**

Use `.xlsx` for all:

| Document Type | Example File Names |
|---|---|
| Application requirements matrix | `00_APPLICATION_REQUIREMENTS_MATRIX.xlsx` |
| Missing information log | `PHASE_2_MISSING_INFORMATION_SUMMARY.xlsx` |
| PDF revisit queue | `PHASE_2_PDF_REVISIT_QUEUE.xlsx` |
| Phase blocker closure board | `PHASE_2_BLOCKER_CLOSURE_BOARD.xlsx` |
| Course-hour matrix | `CNA_CE_COURSE_HOUR_MATRIX.xlsx` |
| Question coverage / quiz bank map | `CNA_QUIZ_BANK_TEMPLATE.xlsx` |
| Asset inventory | `MOODLE_ASSET_INVENTORY.xlsx` |
| Moodle configuration checklist | `MOODLE_CONFIGURATION_CHECKLIST.xlsx` |
| Activity/resource map | `CNA_ACTIVITY_RESOURCE_TEMPLATE.xlsx` |
| Completion rule template | `CNA_COMPLETION_RULE_TEMPLATE.xlsx` |
| Completion/reporting evidence log | `CNA_REPORTING_EVIDENCE_TEMPLATE.xlsx` |
| QA checklist | `PHASE_2_QA_CHECKLIST.xlsx` |
| Field-mapping workbook | `FORM_FIELD_MAP_cdph192b.xlsx` |
| Student attendance template | `STUDENT_ATTENDANCE_TEMPLATE.xlsx` |
| Student competency evaluation | `STUDENT_EVALUATION_COMPETENCY_TEMPLATE.xlsx` |
| Online CE course list (working) | `CNA_ONLINE_CE_COURSE_LIST.xlsx` |

**XLSX formatting standard:**
- Row 1: Bold header row, background fill (e.g., light gray or light blue)
- Freeze top row
- Auto-fit column widths
- Text wrap enabled for long-text columns (descriptions, notes, rationales)
- Each logical table on its own named sheet
- File is fully editable — no protection unless intentionally locked

---

## Rule 3 — Moodle Import Files → CSV Only Where Moodle Requires It

Use CSV **only** when the Moodle import function specifically requires CSV format.

For every Moodle import CSV, also create a companion `.xlsx` working version:

| Purpose | File |
|---|---|
| Human review / editing | `CNA_COURSE_IMPORT_TEMPLATE.xlsx` |
| Moodle import (only if Moodle requires CSV) | `CNA_COURSE_IMPORT_TEMPLATE.csv` |

If Moodle accepts XML or other formats, prefer those over CSV.

---

## Rule 4 — Question Banks

Do not store question bank content as CSV.

| Format | Use |
|---|---|
| `.xlsx` | Human authoring, editing, and review |
| Moodle GIFT format (`.txt`) | Moodle import — preferred if Moodle supports |
| Moodle XML (`.xml`) | Moodle import — preferred for full metadata |
| `.md` | Internal readable backup / reference only |

---

## Rule 5 — TTS Narration and Slide Planning

Do not use CSV for narration or slide planning.

| Content Type | Format |
|---|---|
| TTS narration script | DOCX (with letterhead) |
| Asset inventory | XLSX |
| Question coverage map | XLSX |
| Slides (final) | PPTX or approved slide design tool |
| Slide planning notes | DOCX or XLSX |
| Internal working backup | Markdown `.md` only if needed |

---

## Rule 6 — Internal Working Files

Markdown `.md` is acceptable for:
- Internal project notes
- AI working drafts that will be converted to DOCX or XLSX before handoff
- Policy sources (as source for DOCX generation)
- Readable reference versions of content already in DOCX/XLSX

Markdown `.md` is **not acceptable** as the final handoff format for:
- Formal submission documents
- Structured data tables or trackers
- Question banks
- Templates intended for human editing

---

## Summary Decision Table

| Document Type | Format |
|---|---|
| Formal policy / narrative / compliance document | **DOCX** (letterhead) |
| Submission form attachment | **DOCX** (letterhead) |
| Tracker / matrix / log / checklist / field map | **XLSX** |
| Student attendance or evaluation template | **XLSX** |
| Course list (human review) | **XLSX** |
| Question bank (human review/edit) | **XLSX** |
| Question bank (Moodle import) | GIFT `.txt` or Moodle XML |
| Moodle course configuration import | CSV (Moodle-required) + **XLSX** companion |
| Certificate template | **DOCX** (letterhead) |
| Narration script | **DOCX** (letterhead) |
| Slide asset | **PPTX** |
| Internal working notes / AI source | Markdown `.md` |
| Completed PDF application form | **PDF** (editable draft) |

---

## File Naming Conventions

- Use `UPPER_SNAKE_CASE` for project tracking and template files.
- Use descriptive names that include the document type (e.g., `_TEMPLATE`, `_MATRIX`, `_POLICY`, `_CHECKLIST`).
- Include version or phase suffix where relevant (e.g., `_PHASE_2`, `_V1`).
- Do not use spaces in file names.
- Do not use `CI-ION` in application-facing file names visible to submitting party.

---

*Last updated: May 2026 — Phase 2 QA Correction*
