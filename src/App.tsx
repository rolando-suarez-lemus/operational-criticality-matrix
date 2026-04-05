import { useState } from 'react'
import './App.css'
import './components/index.css'
import CriticalityMatrix from './components/CriticalityMatrix.js'
import AvailabilityAnalysis from './components/AvailabilityAnalysis.js'
import BathtubCurve from './components/BathtubCurve.js'
import EquipmentTable from './components/EquipmentTable.js'
import { Equipment } from './types.js'
import { sampleEquipment } from './data/sampleEquipment.js'

function App() {
  const [equipment, setEquipment] = useState<Equipment[]>(sampleEquipment)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Operational Criticality Matrix</h1>
        <p className="subtitle">
          Equipment Availability & Asset Criticality Management
        </p>
        <div className="credits">
          <p>
            Developed by <strong>Rolando Suárez Lemus</strong>
            <br />
            Mechanical Engineer | Asset Management & RCM Specialist
            <br />
            Operational Reliability (ISO 55000, RCM) | Data Analytics
            <br />
            <em>with GitHub Copilot assistance | UI Protocol: Lumina ID-LUM-001</em>
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="visualization-grid">
          <div className="chart-panel">
            <h2>Equipment Criticality Matrix</h2>
            <p className="panel-description">Impact vs Probability ranking</p>
            <CriticalityMatrix
              data={equipment}
              selectedEquipment={selectedEquipment}
              onSelectEquipment={setSelectedEquipment}
            />
          </div>

          <div className="chart-panel">
            <h2>Operational Availability (A₀)</h2>
            <p className="panel-description">MTBF / (MTBF + MTTR)</p>
            <AvailabilityAnalysis
              data={equipment}
              selectedEquipment={selectedEquipment}
              onSelectEquipment={setSelectedEquipment}
            />
          </div>
        </section>

        <section className="chart-panel-full">
          <h2>Bathtub Curve: Equipment Lifecycle</h2>
          <p className="panel-description">Failure rate evolution over equipment life</p>
          <BathtubCurve />
        </section>

        <section className="table-section">
          <h2>Equipment Inventory & Metrics</h2>
          <EquipmentTable
            data={equipment}
            selectedEquipment={selectedEquipment}
            onSelectEquipment={setSelectedEquipment}
          />
        </section>

        <section className="info-section">
          <h3>Mathematical Models</h3>
          <div className="formulas-grid">
            <div className="formula-box">
              <h4>Operational Availability</h4>
              <p>A₀ = MTBF / (MTBF + MTTR)</p>
              <p className="formula-note">
                Fraction of time equipment is available for production
              </p>
            </div>
            <div className="formula-box">
              <h4>Annual Downtime</h4>
              <p>D = (1 - A₀) × 8760 hours</p>
              <p className="formula-note">
                Total downtime in a calendar year
              </p>
            </div>
            <div className="formula-box">
              <h4>Criticality Index</h4>
              <p>C = Impact Score × Probability Score</p>
              <p className="formula-note">
                Combined measure for maintenance planning
              </p>
            </div>
          </div>
          <p className="model-source">
            Based on: Knezevic, J. (1997) "Reliability, Maintainability & Supportability Engineering"
            | ISO 55001 Asset Management Standard
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
