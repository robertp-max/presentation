export type ScenarioType = 'Low' | 'Base' | 'High'

export interface CostMetric {
  providerCount: number
  mau: number
  apiCalls: number
  storage: string
}

export interface CostData {
  google: number
  medplum: number
  aws: number
}

export interface RiskItem {
  id: number
  area: string
  risk: 'High' | 'Medium' | 'Low'
  detail: string
  mitigation: string
}

export interface RoadmapItem {
  phase: string
  focus: string
  items: string[]
}