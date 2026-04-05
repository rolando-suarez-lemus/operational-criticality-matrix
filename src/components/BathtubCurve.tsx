import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'
import { BathtubPhase } from '../types.js'

const bathtubData: BathtubPhase[] = [
  { phase: 'Burn-in', failureRate: 8, description: 'Manufacturing defects', duration: '0-5% lifetime' },
  { phase: 'Burn-in', failureRate: 6, description: '', duration: '' },
  { phase: 'Normal', failureRate: 2, description: 'Random failures', duration: '10-90% lifetime' },
  { phase: 'Normal', failureRate: 2, description: '', duration: '' },
  { phase: 'Normal', failureRate: 2, description: '', duration: '' },
  { phase: 'Wear-out', failureRate: 3, description: 'Age-related degradation', duration: '85-100% lifetime' },
  { phase: 'Wear-out', failureRate: 5, description: '', duration: '' },
  { phase: 'Wear-out', failureRate: 8, description: '', duration: '' },
]

const chartData = [
  { x: 0, y: 8, phase: 'Burn-in' },
  { x: 2, y: 6, phase: 'Burn-in' },
  { x: 5, y: 3, phase: 'Transition' },
  { x: 25, y: 2, phase: 'Normal' },
  { x: 50, y: 2, phase: 'Normal' },
  { x: 75, y: 2, phase: 'Normal' },
  { x: 85, y: 3, phase: 'Transition' },
  { x: 95, y: 6, phase: 'Wear-out' },
  { x: 100, y: 9, phase: 'Wear-out' },
]

export default function BathtubCurve() {
  return (
    <div className="bathtub-container">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="x"
            label={{ value: 'Equipment Lifecycle (%)', position: 'bottom', offset: 10 }}
            stroke="rgba(255,255,255,0.6)"
          />
          <YAxis
            label={{ value: 'Failure Rate (λ)', angle: -90, position: 'insideLeft' }}
            stroke="rgba(255,255,255,0.6)"
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(10, 22, 40, 0.95)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#00d4ff"
            strokeWidth={3}
            name="Failure Rate λ"
            dot={{ fill: '#ffc658', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="phases-legend">
        <div className="phase-item">
          <span className="phase-label">Burn-in Phase</span>
          <p>Early defects surface; high failure rate decreases with screening</p>
        </div>
        <div className="phase-item">
          <span className="phase-label">Normal Operation</span>
          <p>Constant, low failure rate; random failures only</p>
        </div>
        <div className="phase-item">
          <span className="phase-label">Wear-out Phase</span>
          <p>Age-related degradation; failure rate increases exponentially</p>
        </div>
      </div>
    </div>
  )
}
