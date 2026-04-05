import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Equipment } from '../types.js'

interface CriticalityMatrixProps {
  data: Equipment[]
  selectedEquipment: Equipment | null
  onSelectEquipment: (eq: Equipment) => void
}

export default function CriticalityMatrix({
  data,
  selectedEquipment,
  onSelectEquipment,
}: CriticalityMatrixProps) {
  const chartData = data.map((eq) => ({
    ...eq,
    criticityIndex: eq.impactScore * eq.probabilityScore,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis
          type="number"
          dataKey="probabilityScore"
          name="Probability (1-10)"
          label={{ value: 'Probability of Failure', position: 'insideBottomRight', offset: -5 }}
          stroke="rgba(255,255,255,0.6)"
        />
        <YAxis
          type="number"
          dataKey="impactScore"
          name="Impact (1-10)"
          label={{ value: 'Production Impact', angle: -90, position: 'insideLeft' }}
          stroke="rgba(255,255,255,0.6)"
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(10, 22, 40, 0.95)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '8px',
          }}
          cursor={{ strokeDasharray: '3 3' }}
        />
        <Legend />
        <ReferenceLine x={5} stroke="rgba(255, 255, 255, 0.2)" label="Medium Threshold" />
        <ReferenceLine y={5} stroke="rgba(255, 255, 255, 0.2)" />
        <Scatter
          name="Critical"
          data={chartData.filter((eq) => eq.criticality === 'critical')}
          fill="#ff3333"
          fillOpacity={0.8}
          onClick={(e) => onSelectEquipment(e.payload)}
        />
        <Scatter
          name="High"
          data={chartData.filter((eq) => eq.criticality === 'high')}
          fill="#ff9900"
          fillOpacity={0.8}
          onClick={(e) => onSelectEquipment(e.payload)}
        />
        <Scatter
          name="Medium"
          data={chartData.filter((eq) => eq.criticality === 'medium')}
          fill="#ffc658"
          fillOpacity={0.8}
          onClick={(e) => onSelectEquipment(e.payload)}
        />
        <Scatter
          name="Low"
          data={chartData.filter((eq) => eq.criticality === 'low')}
          fill="#00d4ff"
          fillOpacity={0.8}
          onClick={(e) => onSelectEquipment(e.payload)}
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
