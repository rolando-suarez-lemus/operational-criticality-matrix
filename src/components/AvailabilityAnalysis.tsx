import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Equipment } from '../types.js'

interface AvailabilityAnalysisProps {
  data: Equipment[]
  selectedEquipment: Equipment | null
  onSelectEquipment: (eq: Equipment) => void
}

export default function AvailabilityAnalysis({
  data,
  selectedEquipment,
  onSelectEquipment,
}: AvailabilityAnalysisProps) {
  const chartData = data.map((eq) => ({
    ...eq,
    availability: (eq.mtbf / (eq.mtbf + eq.mttr)) * 100,
    annualDowntime: (1 - eq.mtbf / (eq.mtbf + eq.mttr)) * 8760,
  }))

  const getColor = (availability: number) => {
    if (availability >= 95) return '#00d4ff'
    if (availability >= 90) return '#00ff00'
    if (availability >= 85) return '#ffc658'
    if (availability >= 80) return '#ff9900'
    return '#ff3333'
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis
          dataKey="code"
          stroke="rgba(255,255,255,0.6)"
          style={{ fontSize: '0.8rem' }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.6)"
          label={{ value: 'Availability (%)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(10, 22, 40, 0.95)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '8px',
          }}
          formatter={(value) =>
            typeof value === 'number' ? `${value.toFixed(2)}%` : value
          }
        />
        <Legend />
        <Bar
          dataKey="availability"
          name="Availability A₀"
          onClick={(e) => onSelectEquipment(e.payload)}
          style={{ cursor: 'pointer' }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.availability)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
