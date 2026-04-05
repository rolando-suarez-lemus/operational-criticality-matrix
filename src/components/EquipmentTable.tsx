import { Equipment } from '../types.js'

interface EquipmentTableProps {
  data: Equipment[]
  selectedEquipment: Equipment | null
  onSelectEquipment: (eq: Equipment) => void
}

export default function EquipmentTable({
  data,
  selectedEquipment,
  onSelectEquipment,
}: EquipmentTableProps) {
  const sortedData = [...data].sort(
    (a, b) => b.impactScore * b.probabilityScore - a.impactScore * a.probabilityScore
  )

  return (
    <div className="table-wrapper">
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Equipment</th>
            <th>MTBF (h)</th>
            <th>MTTR (h)</th>
            <th>A₀ (%)</th>
            <th>Annual Downtime</th>
            <th>Impact × Prob</th>
            <th>Criticality</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((eq) => {
            const availability = (eq.mtbf / (eq.mtbf + eq.mttr)) * 100
            const annualDowntime = (1 - eq.mtbf / (eq.mtbf + eq.mttr)) * 8760
            const criticityIndex = eq.impactScore * eq.probabilityScore
            const isSelected = selectedEquipment?.id === eq.id

            return (
              <tr
                key={eq.id}
                className={`equipment-row ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectEquipment(eq)}
              >
                <td className="code">{eq.code}</td>
                <td>
                  <div className="eq-name">{eq.name}</div>
                  <div className="eq-description">{eq.description}</div>
                </td>
                <td className="numeric">{eq.mtbf}</td>
                <td className="numeric">{eq.mttr}</td>
                <td className="numeric highlight">{availability.toFixed(1)}</td>
                <td className="numeric">{annualDowntime.toFixed(0)}h</td>
                <td className="numeric numeric-emphasis">{criticityIndex}</td>
                <td>
                  <span className={`criticality-badge criticality-${eq.criticality}`}>
                    {eq.criticality.toUpperCase()}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
