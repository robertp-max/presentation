# PHASE_2_PDF_REVISIT_QUEUE

Phase 2 remains open. This queue tracks blank PDF sections that must be either completed from source-supported data or explicitly retained blank with justification. This document also records the CDPH 192B checkbox/blank-field inspection completed in Phase 2 QA Correction.

---

## Queue Entries

| Output PDF Path | Source Form Path | Page/Section | Blank Table/Field | Why Blank Now | Source Needed | Complete Now or After Mapping | Responsible Follow-Up |
|---|---|---|---|---|---|---|---|
| `OUTPUT_CNA_RECERT/02_COMPLETED_FORMS/cdph192b_completed_editable.pdf` | `CNA Recert App/cdph192b.pdf` | Contact block | Email address | No source-confirmed general email | Confirmed official submission email/contact value | Now (when verified) | Update field + `FORM_FIELD_MAP_cdph192b.md` |
| `OUTPUT_CNA_RECERT/02_COMPLETED_FORMS/cdph192b_completed_editable.pdf` | `CNA Recert App/cdph192b.pdf` | Fee block | CE unit fee / membership fee | No approved pricing statement | Approved pricing decision from school administration | Now (when approved) | Update field + `FORM_FIELD_MAP_cdph192b.md` |
| `OUTPUT_CNA_RECERT/02_COMPLETED_FORMS/cdph193_completed_editable.pdf` | `CNA Recert App/cdph193.pdf` | Contact table | School ID, general email, contact emails, Contact #3 row | Missing verified values | Program ID and official contact emails | Now (when verified) | Update PDF + `FORM_FIELD_MAP_cdph193.md` |
| `OUTPUT_CNA_RECERT/02_COMPLETED_FORMS/cdph276e_completed_editable_conditional.pdf` | `CNA Recert App/cdph276e (1).pdf` | Nursing facility party table | Nursing facility name/address/admin/DON fields | Facility-side party not finalized | Confirmed counterpart facility signers/details | After facility package confirmation | Update conditional form or remove if not required |
| `OUTPUT_HHA_INITIAL_40_HOUR/02_COMPLETED_FORMS/cdph171_completed_editable.pdf` | `Home Health Aide/cdph171.pdf` | Provider/program contact and checklist | Provider email, program director email, clinical agreement detail text | No verified email values; agreement details not finalized | Official program emails and finalized agreement descriptor | Now (emails), agreement after document finalization | Update fields + `FORM_FIELD_MAP_cdph171.md` |
| `OUTPUT_HHA_INITIAL_40_HOUR/02_COMPLETED_FORMS/cdph171b_completed_editable.pdf` | `Home Health Aide/cdph171b.pdf` | RN rows 3–9 and participating consultants table | Multiple unused rows; consultant subject/hour rows mostly blank | Consultant roster and assignment matrix not finalized | Final consultant list and subject/hour assignments | After faculty matrix lock | Fill applicable rows; leave extra rows blank with note |
| `OUTPUT_HHA_INITIAL_40_HOUR/02_COMPLETED_FORMS/cdph193_completed_editable_if_required.pdf` | `Source/cdph193.pdf` | Contact table | School ID + Contact #3 row | Values not verified or optional | Program ID and optional third contact | Now (if required in final bundle) | Update form map and missing log |
| `OUTPUT_HHA_INITIAL_40_HOUR/02_COMPLETED_FORMS/cdph276e_completed_editable_if_required.pdf` | `Home Health Aide/cdph276e.pdf` | Nursing facility party table | Facility-side fields and dates/signatures | Facility-side signatures/details unavailable | Confirmed facility counterpart data | After facility agreement lock | Fill when agreement packet finalized |
| `OUTPUT_HHA_RENEWAL/02_COMPLETED_FORMS/cdph192_completed_editable_draft.pdf` | `Home Health Aide/cdph192.pdf` | **CE course table** | `Course1–35` and `CE Hours1–35` blank | Renewal course list not finalized; applicability still under confirmation | Source-supported HHA renewal course list + hour allocation and form applicability confirmation | **After renewal course mapping + compliance confirmation** | Complete table if track requires it; otherwise document non-applicability |
| `OUTPUT_HHA_RENEWAL/02_COMPLETED_FORMS/cdph193_completed_editable_draft.pdf` | `Source/cdph193.pdf` | Contact table | School ID + Contact #3 row | Missing verified values | Program ID and optional third contact | Now (when verified) | Update map and missing log |
| `OUTPUT_HHA_RENEWAL/02_COMPLETED_FORMS/cdph276e_completed_editable_draft.pdf` | `Home Health Aide/cdph276e.pdf` | Nursing facility party table | Facility-side fields | Counterparty details not finalized | Facility-side names/titles | After facility agreement confirmation | Update or remove if not required |

---

## CDPH 192B Checkbox and Blank-Field Inspection Record (Phase 2 QA Correction — May 2026)

All CDPH 192B checkbox and field statuses are formally documented in `OUTPUT_CNA_RECERT/02_COMPLETED_FORMS/FORM_FIELD_MAP_cdph192b.md`. Summary:

| Field / Checkbox | Status |
|---|---|
| Application Type: Initial Application | **SELECTED** — confirmed correct for this application path |
| Application Type: Renewal | Not selected — intentional |
| Approval Type: Public Access | **SELECTED** — confirmed correct for public listing objective |
| Approval Type: Private Employee Only | Not selected — intentional |
| Provider Name and Address | Filled — verified |
| Provider Phone | Filled — verified |
| Provider Website | Filled — ciinstituteofnursing.com |
| Contact Person Name | Filled — Vanessa Valerio, RN |
| Contact Person Phone | Filled — verified |
| Printed Name | Filled — Vanessa Valerio |
| Contact Person Email | **Blank — missing; must be obtained before submission** |
| CE Unit Fee / Membership Fee | **Blank — missing; pending pricing decision** |
| NAC Number / Expiration | Blank — intentional; initial application |
| Signature | **Blank — intentional; human signing required before submission** |
| Date | **Blank — intentional; complete on submission date** |

---

## Credential Handling Reconciliation

- `CDPH 192B` includes credential fields by form design (User ID / Password).
- Draft credentials are present in `OUTPUT_CNA_RECERT/02_COMPLETED_FORMS/cdph192b_completed_editable.pdf` by form requirement.
- **Controlled credential reference is limited exclusively to:**
  - `OUTPUT_CNA_RECERT/08_SUBMISSION_EMAIL/REVIEWER_ACCESS/CDPH_REVIEWER_ACCESS_INSTRUCTIONS_CONTROLLED.md`
- Credential leak audit (Phase 2 QA Correction): **PASSED** — no credentials found outside the controlled artifact.
- Password rotation control:
  - **Rotate reviewer password before final submission** and update controlled credential artifact and CDPH 192B PDF form fields accordingly.

---

## CDPH 192 / 192B Course-Table Revisit Rule

- **CDPH 192B** (CNA online CE track) does not contain an internal multi-row course table in this form version.
  - Course data is provided in the attached course list: `OUTPUT_CNA_RECERT/03_COURSE_LIST/CDPH_192B_CNA_COURSE_LIST_ATTACHMENT.md` and `.docx`.
  - Attachment updated in Phase 2 QA Correction: 12 courses with names, CE hours, delivery method, and posttest requirement.
- **CDPH 192** (HHA Renewal track) contains embedded course and CE-hour table fields.
  - Status: Queued — waiting for HHA renewal course/module mapping and form applicability confirmation.
  - Entry remains active in queue above.

---

## Queue Gate

Phase 2 GO for Phase 3 is blocked until:
1. Every known course/module/hour table is completed or explicitly queued with justification.
2. Website/name standardization checks pass.
3. All blank fields are either resolved from source or explicitly justified in missing-information logs.
4. .docx policy files are regenerated from expanded .md sources before submission.
5. Contact email and fee fields are resolved.

Current gate state:
- **Phase 2: CONDITIONAL HOLD**
- **Phase 3: PREP ONLY (NOT GO)**

Last updated: Phase 2 QA Correction — May 2026
