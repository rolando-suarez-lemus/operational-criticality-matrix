# Matriz de Criticidad Operacional: Estructura de Decisión en Mantenimiento

## Problema Operativo

En portfolios de múltiples activos, la diferenciación entre equipos por riesgo es incompleta sin considerar conjuntamente la probabilidad de falla y su impacto operacional. Esto genera distribución ineficiente de recursos: inversión en prevención de equipos de bajo riesgo mientras equipos críticos operan sin monitoreo.

La disponibilidad operacional (A₀) estructurada bajo criticidad permite asignar estrategia distinta según riesgo:

$$A_0 = \frac{MTBF}{MTBF + MTTR}$$

Donde:
- **MTBF** = Tiempo medio entre fallos (horas)
- **MTTR** = Tiempo medio de reparación (horas)
- **A₀** = Fracción de tiempo que el equipo está disponible operacionalmente

La criticidad se calcula:
$$C_i = \text{Impacto} \times \text{Probabilidad}$$

Esto estructura cómo concentrar inversión en **prevención predictiva** en equipos críticos, mientras equipos de bajo riesgo operan bajo política **run-to-failure**.


---

## Estructura del Análisis

### 1. Matriz de Criticidad (Impacto vs Probabilidad)
Scatter 2D que posiciona cada equipo. Los cuadrantes definen estrategia:

| Cuadrante | Impacto | Probabilidad | Estrategia |
|-----------|---------|--------------|-----------|
| **Crítico** | Alto | Alto | Predictiva + redundancia |
| **Alto** | Alto/Medio | Medio/Bajo | Preventiva sistemática |
| **Medio** | Bajo/Medio | Medio | Condición-basada (CBM) |
| **Low** | Bajo | Bajo | Run-to-failure |

### 2. Disponibilidad Operacional (A₀)
Métrica cuantificable de performance:

$$\text{Tiempo inactividad anual} = (1 - A_0) \times 8760 \text{ horas}$$

Permite comparar equipo A: A₀=95% vs equipo B: A₀=98% en términos de horas/año fuera de servicio.

### 3. Ciclo de Vida (Bathtub Curve)
Estructura de confiabilidad según fase:
- **Mortalidad Infantil (0-5%)**: Defectos de fabricación; inspección entrada crítica
- **Operación Normal (10-90%)**: Fallas aleatorias; mantenimiento preventivo por intervalo
- **Desgaste (85-100%)**: Fatiga material; cambio de componentes preventivo

### 4. Inventario de Activos
Tabla consolidada: MTBF, MTTR, A₀ calculada, ranking de criticidad. Permite auditar si inversión preventiva correlaciona con reducción de MTTR o con aumento de MTBF.

---

## Asignación de Recursos

### Equipos Críticos (C_i > 60)
- Inversión en monitoreo continuo (sensores, telemetría)
- Almacén de repuestos disponible 24/7
- MTTR objetivo: < 4 horas
- Meta A₀: ≥ 99%

### Equipos Alto Riesgo (C_i 30-60)
- Inspecciones mensuales sistemáticas
- Mantenimiento preventivo por intervalo fijo
- MTTR objetivo: < 12 horas
- Meta A₀: ≥ 95%

### Equipos Bajo Riesgo (C_i < 30)
- Inspección visual a demanda
- Reemplazo reactivo; no requiere stock permanente
- No hay MTTR objetivo formal
- A₀ natural, sin inversión

---

## Formato de Datos

Equipo incluye:

```typescript
interface Equipment {
  id: string
  code: string
  name: string
  mtbf: number  // horas
  mttr: number  // horas
  impactScore: number  // 1-10
  probabilityScore: number  // 1-10
  department: string
}
```

Criticidad calculada automáticamente: **C_i = impactScore × probabilityScore**

---

## Arquitectura

```
src/
├── App.tsx
├── components/
│   ├── CriticalityMatrix.tsx
│   ├── AvailabilityAnalysis.tsx
│   ├── BathtubCurve.tsx
│   └── EquipmentTable.tsx
└── data/sampleEquipment.ts
```

---

## Stack Técnico

- **React 19.2** + TypeScript 5.9
- **Vite 5.0** + HMR
- **Recharts 3.8**: Scatter, bar, line charts
- **CSS Grid** + Glasmorphism
- **Zod**: Validación

---

## Instalación

```bash
npm install
npm run dev
# http://localhost:5173

npm run build
npm run preview
```

---

## Impacto en Decisión Operacional

### Diferenciación de Inversión
Sin criticidad estructurada, presupuesto de mantenimiento se distribuye por igual. Con matriz, la inversión se concentra donde costo de falla es mayor.

### Predicción de Disponibilidad
A₀ permite forecasting: si equipo tiene MTBF=800h y MTTR=20h, es posible predecir inactividad anual y planificar reemplazos o redundancia técnica.

### Auditoría Post-Intervención
Comparar C_i antes/después de intervención (cambio de componentes, rediseño, capacitación operacional) cuantifica si mejora fue efectiva o superficial.

---

## Referencias

- **ISO 55001**: Asset Management
- **RCM Standard**: ISO/IEC 60812; MIL-STD-3034
- **Knezevic, J.** (1997): Reliability, Maintainability & Supportability Engineering
- **Weibull Analysis**: Equipment lifecycle modeling

---

## Equipo

**Rolando Suárez Lemus**  
Ingeniero Mecánico | Especialista en Gestión de Activos y Confiabilidad  
ISO 55000, RCM, Data Analytics

GitHub: [@rolando-suarez-lemus](https://github.com/rolando-suarez-lemus)

---

**Versión**: 1.0.0 | Abril 2026
