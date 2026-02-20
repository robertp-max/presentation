import { CostData, CostMetric, RoadmapItem, RiskItem, ScenarioType } from '../types'

export const SCENARIO_METRICS: Record<ScenarioType, CostMetric> = {
  Low: {
    providerCount: 100,
    mau: 25,
    apiCalls: 200,
    storage: '10 MB/provider',
  },
  Base: {
    providerCount: 100,
    mau: 50,
    apiCalls: 1000,
    storage: '30 MB/provider',
  },
  High: {
    providerCount: 100,
    mau: 100,
    apiCalls: 5000,
    storage: '150 MB/provider',
  },
}

export const ANNUAL_COSTS: Record<ScenarioType, CostData> = {
  Low: {
    google: 0,
    medplum: 24000,
    aws: 660,
  },
  Base: {
    google: 373,
    medplum: 24000,
    aws: 1393,
  },
  High: {
    google: 881,
    medplum: 24000,
    aws: 3021,
  },
}

export const RISKS: RiskItem[] = [
  {
    id: 1,
    area: 'Logging & Observability',
    risk: 'High',
    detail: 'Accidental PHI leakage into logs/headers is the #1 early MVP risk.',
    mitigation: 'Structured logging allowlists; block headers in API Gateway.',
  },
  {
    id: 2,
    area: 'Vercel Frontend',
    risk: 'Medium',
    detail: 'Server-side functions may process ePHI, requiring BAA coverage.',
    mitigation: 'Use Static-only mode (recommended) or Vercel BAA (Pro plan).',
  },
  {
    id: 3,
    area: 'Data Boundary',
    risk: 'Low',
    detail: 'Scope creep leads to accidental PHI intake (e.g. free text fields).',
    mitigation: "Strict 'No PHI' input policy; aggregates only for reporting.",
  },
]

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    phase: '30 Days',
    focus: 'Foundation & Risk',
    items: [
      'Data-flow map + Risk Analysis v1',
      'Decide Vercel mode (Static vs BAA)',
      'Identity + RBAC setup',
      'Central logging with PHI-safe rules',
    ],
  },
  {
    phase: '60 Days',
    focus: 'Ops & Audit',
    items: [
      'Admin review console + audit trails',
      'Document storage hardening (Signed URLs)',
      'Incident response runbooks',
      'WAF / Rate limiting',
    ],
  },
  {
    phase: '90 Days',
    focus: 'Launch Readiness',
    items: ['Launch Evidence Packet', 'Tabletop incident exercise', 'Reassess FHIR trigger'],
  },
]