export interface Equipment {
  id: string
  code: string
  name: string
  description: string
  mtbf: number // Mean Time Between Failures (hours)
  mttr: number // Mean Time To Repair (hours)
  criticality: 'critical' | 'high' | 'medium' | 'low'
  department: string
  impactScore: number // 1-10: Production impact if fails
  probabilityScore: number // 1-10: Likelihood of failure
}

export interface AvailabilityMetrics {
  equipment: Equipment
  availability: number // 0-1 (MTBF / (MTBF + MTTR))
  downtime: number // hours per year
  uptime: number // hours per year
}

export interface BathtubPhase {
  phase: 'Burn-in' | 'Normal' | 'Wear-out'
  failureRate: number
  description: string
  duration: string
}
