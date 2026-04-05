# Operational Criticality Matrix

Advanced **equipment criticality assessment** and **operational availability analysis** tool for industrial asset management. Implements ISO 55001 standard frameworks and RCM methodology.

---

## Overview

This tool provides enterprise-grade analytics for:

- **Criticality Matrix**: 2D risk assessment (Impact vs Probability)
- **Operational Availability (A₀)**: Quantifies equipment performance via MTBF/MTTR metrics
- **Bathtub Curve**: Equipment lifecycle failure pattern visualization
- **Maintenance Planning**: Data-driven prioritization for preventive/predictive strategies

### Core Mathematical Models

$$A_0 = \frac{MTBF}{MTBF + MTTR}$$

Where:
- **A₀** = Operational availability (fraction of time equipment is operational)
- **MTBF** = Mean Time Between Failures (hours)
- **MTTR** = Mean Time To Repair (hours)

$$C_i = \text{Impact Score} \times \text{Probability Score}$$

Criticality index for maintenance task prioritization.

---

## Key Features

### 1. **Equipment Criticality Matrix**
Interactive scatter plot mapping failure probability against production impact. Color-coded by criticality tier (Critical → Low).

### 2. **Operational Availability Dashboard**
Performance metrics for all equipment:
- Current availability percentage
- Annual downtime forecast
- Trend analysis

### 3. **Bathtub Curve Analysis**
Equipment lifecycle visualization:
- **Burn-in** (0-5%): Manufacturing defect screening
- **Normal** (10-90%): Stable operation phase
- **Wear-out** (85-100%): Age-related degradation

### 4. **Equipment Inventory**
Comprehensive table with:
- MTBF/MTTR metrics
- Calculated availability
- Criticality ranking
- Department/location tracking

---

## Technical Stack

- **Frontend**: React 19.2 + TypeScript 5.9
- **Build & Dev**: Vite 5.0 + HMR
- **Visualization**: Recharts 3.8 (Scatter, Bar, Line charts)
- **Styling**: CSS Grid + Glassmorphism (Lumina UI Protocol ID-LUM-001)
- **Validation**: Zod

---

## Installation & Setup

### Prerequisites
- Node.js 20+

### Development

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173` with hot reload.

### Production Build

```bash
npm run build
npm run preview
```

---

## Data Model

### Equipment Interface

```typescript
interface Equipment {
  id: string
  code: string // Equipment identifier
  name: string
  description: string
  mtbf: number // Mean Time Between Failures (hours)
  mttr: number // Mean Time To Repair (hours)
  criticality: 'critical' | 'high' | 'medium' | 'low'
  department: string
  impactScore: number // 1-10: Production impact
  probabilityScore: number // 1-10: Failure likelihood
}
```

---

## Sample Dataset

Pre-configured with 8 equipment items spanning:
- **Process**: Pumps, Motors, Valves
- **Utilities**: Cooling systems, Heat exchangers
- **Electrical**: VFD drives, Transformers
- **Instrumentation**: Sensors, Filters

Reflects real-world industrial asset portfolios.

---

## Architecture

```
src/
├── App.tsx                       # Main application
├── components/
│   ├── CriticalityMatrix.tsx     # Risk assessment chart
│   ├── AvailabilityAnalysis.tsx  # Performance metrics
│   ├── BathtubCurve.tsx          # Lifecycle analysis
│   └── EquipmentTable.tsx        # Inventory view
├── data/
│   └── sampleEquipment.ts        # Reference dataset
└── types.ts                      # TypeScript interfaces
```

---

## Mathematical Framework

### Availability Calculation

$$A_0 = \frac{MTBF}{MTBF + MTTR}$$

**Annual Downtime** = $(1 - A_0) \times 8760$ hours

### Criticality Classification

| Criticality | Impact × Probability | Maintenance Strategy |
|-------------|----------------------|----------------------|
| **Critical** | > 60 | Predictive + redundancy |
| **High** | 30-60 | Preventive + monitoring |
| **Medium** | 10-30 | Condition-based |
| **Low** | < 10 | Run-to-failure |

---

## References & Standards

- **ISO 55001**: Asset Management requirements and guidance
- **RCM Standard**: Reliability-Centered Maintenance (MIL-STD-3034)
- **Knezevic, J. (1997)**: "Reliability, Maintainability & Supportability Engineering"
- **Bathtub Curve Model**: Weibull analysis for equipment lifecycle

---

## Credits & Attribution

### Development Team

- **Rolando Suárez Lemus**
  - Mechanical Engineer
  - Specialist: Asset Management, Operational Reliability, RCM
  - ISO 55000 & Data Analytics
  - Author & Lead Developer

- **GitHub Copilot**
  - AI Assistant for Code Generation
  - Claude Haiku 4.5 Model

### Design Protocol

- **Lumina UI Aesthetics Engine (ID-LUM-001)**: Premium glassmorphism + industrial color palette

---

## License

Provided as-is for industrial asset management and maintenance planning.

---

**Last Updated**: April 5, 2026  
**Version**: 1.0.0
