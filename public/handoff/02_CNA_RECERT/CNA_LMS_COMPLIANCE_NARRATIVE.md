# LMS Compliance Narrative — Online CNA Continuing Education

**CI Institute of Nursing**
419 E Hamilton Ave, Campbell, CA 95008
ciinstituteofnursing.com

**Document Type:** Compliance Narrative
**Policy Number:** CNA-POL-006
**Effective Date:** [To be completed upon final submission]
**Version:** 1.0 (Phase 2 Draft — Submission Quality)
**Supersedes:** N/A (Initial version)
**Approved By:** [Authorized Officer — signature required prior to submission]

---

## 1. Purpose

This narrative describes how the learning management system (LMS) used by CI Institute of Nursing to deliver online CNA continuing education (CE) courses satisfies the technical, administrative, and compliance requirements established by CDPH TPRU for online CE providers. This document is intended for submission to CDPH as part of the online CE provider application (CDPH 192B) and for use by CDPH reviewers evaluating the provider's LMS.

---

## 2. Scope

This narrative applies to the complete CI Institute of Nursing online CNA CE course catalog (courses CNA-CE-001 through CNA-CE-012) and covers:
- LMS platform capabilities and compliance controls.
- Identity verification configuration.
- Active time tracking and gate enforcement.
- Interactivity and assessment configuration.
- Certificate generation and delivery.
- Learner record retention.
- CDPH reviewer access configuration.

---

## 3. Policy Statement

CI Institute of Nursing uses a Moodle-based LMS environment to deliver, track, and document all online CNA CE course activity. The LMS is configured to enforce all CDPH TPRU requirements including identity verification, minimum active engagement time, required interactive elements, posttest passing thresholds, affidavit completion, and automated certificate release contingent on all required conditions. No CE certificate is released manually; all release events are triggered by verified LMS condition completion. All records are retained in the LMS and available to authorized CDPH reviewers.

---

## 4. LMS Platform Description

**Platform:** Moodle (open-source LMS)
**Hosting:** [To be completed — provider and URL prior to submission]
**Administrator:** CI Institute of Nursing, Program Director and designated LMS Administrator
**Public Access URL for Reviewer:** ciinstituteofnursing.com (learner portal link to be provided in CDPH 192B form)

Moodle is a widely used, FERPA-aware, open-source learning management system with built-in support for activity completion tracking, access restriction rules, quiz/assessment management, user enrollment management, role-based access control, and report generation.

---

## 5. Identity Verification Configuration

The LMS is configured to require the following identity fields as mandatory profile elements before a learner can access course content:
- Full Legal Name
- CNA Certificate Number
- Date of Birth
- Email Address

These fields are enforced at enrollment. Certificate release logic verifies the presence of required fields before generating a certificate. See CNA Identity Verification Policy (CNA-POL-001) for full detail.

---

## 6. Active Time Tracking and Gate Enforcement

### 6.1 — Timer Control Configuration

The LMS tracks learner session activity at the course level. The following controls are in place:
- Inactivity timeout: five (5) minutes or less.
- Active time accumulates across valid sessions until the minimum threshold is met.
- Active time is course-specific; time in one course does not transfer to another.

### 6.2 — Minimum Active Time Thresholds

| Course CE Hours | Minimum Active Minutes | Gate Event Triggered |
|---:|---:|---|
| 2 | 100 | Posttest access unlock |

### 6.3 — Posttest Access Gate

The final posttest for each course is configured with a Moodle restrict-access condition that requires:
1. All required lesson and activity completions are marked.
2. Minimum active minutes threshold is met or exceeded.

Learners who attempt to access the posttest before these conditions are met see a locked screen with a description of remaining requirements.

See CNA Online CE Timer and Seat-Time Policy (CNA-POL-003) for full detail.

---

## 7. Interactivity Requirements and Configuration

Each course in the online CNA CE catalog is built to the following interactivity standards, enforced through Moodle activity configuration:

| Interactive Element | Requirement | LMS Enforcement |
|---|---|---|
| Section Knowledge Checks | ≥3 per course | Required activity completion; completion logged |
| Scenario-Based Activity | ≥1 per course | Required completion; scenario embedded in Moodle Lesson or SCORM |
| Final Posttest | Required; ≥10 questions; ≥80% passing score | Gated by prior completions and active time |
| Affidavit Acknowledgement | Required before certificate release | Moodle assignment or lesson with required completion |
| Learner Feedback Survey | Optional; offered post-completion | Moodle survey or feedback module |

All required activities are configured with completion tracking enabled and tracked at the individual learner level.

See CNA Interactivity and Feedback Policy (CNA-POL-002) for full detail.

---

## 8. Posttest Configuration

Each course posttest is configured in the Moodle Quiz module with the following settings:
- Minimum 10 questions drawn from a course-specific question bank.
- Randomization enabled where pool size allows.
- Passing grade set to 80% (configured as a grade-to-pass in the quiz settings).
- Maximum attempts: 3.
- Feedback displayed after each attempt.
- Time limit: [to be configured; recommended 30–45 minutes].

Posttest scores and attempt records are logged automatically by Moodle and are retained in the gradebook and quiz attempt logs.

See CNA Posttest and Exam Policy (CNA-POL-004) for full detail.

---

## 9. Certificate Generation and Release

Certificates are generated and delivered through the Moodle course completion and certificate module. Certificate release conditions are configured to require:

1. All required activities completed (lessons, knowledge checks, scenario).
2. Minimum active time verified.
3. Posttest passed at ≥80%.
4. Affidavit activity completed.
5. Required identity fields populated in learner profile.

When all conditions are met, Moodle triggers the certificate release event and makes the certificate available in the learner's course dashboard. A certificate issuance record is logged automatically.

Each certificate includes:
- CI Institute of Nursing name and address.
- Learner full name.
- CNA certificate number.
- Course title and course ID.
- CE hours awarded.
- Date of completion.
- Provider website: ciinstituteofnursing.com.
- NAC number (once issued by CDPH; placeholder until approval).

---

## 10. CDPH Reviewer Access

A dedicated CDPH reviewer account has been configured in the LMS to allow CDPH reviewers to:
- Navigate the full course path for any CNA CE course.
- Observe the sequential lock/unlock behavior of course sections and activities.
- View the posttest access gate in action (with timer conditions visible).
- Review affidavit placement and certificate release sequence.
- Access completion evidence export templates.

Reviewer login credentials are stored in a controlled artifact:
`OUTPUT_CNA_RECERT/08_SUBMISSION_EMAIL/REVIEWER_ACCESS/CDPH_REVIEWER_ACCESS_INSTRUCTIONS_CONTROLLED.md`

**Important:** Reviewer credentials must be rotated before final submission. Do not distribute reviewer credentials in any other document, email, or file.

---

## 11. Record Retention

All learner, completion, and assessment records generated by the LMS are retained for a minimum of five (5) years. The LMS provides export functionality for CDPH records requests. Full detail is in CNA Online CE Recordkeeping Policy (CNA-POL-005).

---

## 12. Responsible Roles

| Role | Responsibility |
|---|---|
| LMS Administrator | Configure and maintain all technical controls described in this narrative |
| Program Director | Approve configuration; review audit results; authorize reviewer access |
| Instructor / Course Author | Build course content meeting interactivity and gate requirements |
| CDPH Reviewer (external) | Access LMS via reviewer account to evaluate compliance |

---

## 13. Evidence Retained

- LMS configuration documentation (this narrative).
- Per-learner records per Section 10 of CNA Recordkeeping Policy.
- Annual LMS audit results.
- Reviewer access log.
- Change log for LMS configuration updates.

---

## 14. Recordkeeping and Audit Requirement

- Annual LMS compliance audit is required.
- Audit verifies all gate conditions, timer settings, posttest configuration, and certificate release logic.
- Audit results are reviewed by the Program Director and retained.

---

## 15. Exception Handling

- Any LMS technical failure affecting gate enforcement or record integrity must be logged and reported to the Program Director within 24 hours.
- Remediation steps are documented and verified before affected courses are returned to active use.
- No configuration change to gate conditions or passing thresholds may be made without Program Director approval.

---

## 16. Version and Revision Control

| Version | Date | Summary of Changes | Revised By |
|---|---|---|---|
| 1.0 | [Submission date] | Initial narrative — Phase 2 submission draft | CI Institute of Nursing |

---

## 17. Source References

- CDPH TPRU Online CNA CE Provider Application Requirements (CDPH 192B instructions)
- California Health and Safety Code, Division 2, Chapter 8.5
- CI Institute of Nursing Identity Verification Policy (CNA-POL-001)
- CI Institute of Nursing Interactivity and Feedback Policy (CNA-POL-002)
- CI Institute of Nursing Timer and Seat-Time Policy (CNA-POL-003)
- CI Institute of Nursing Posttest and Exam Policy (CNA-POL-004)
- CI Institute of Nursing Recordkeeping Policy (CNA-POL-005)
- Moodle documentation: docs.moodle.org
