/**
 * Calculator formulas, ported unchanged from the calculators on quickair.in
 * (pipe size, pressure drop and electricity power).
 */

/** QuickAir pipe sizes: outer diameter → inner diameter (mm) */
export const QUICKAIR_PIPES = { 20: 17.5, 25: 21.84, 32: 28.72, 40: 35.86, 50: 45.92, 63: 58.88, 76: 72.12, 90: 84.82, 113: 109.36, 168: 163.18, 205: 197.84, 260: 250, 290: 280 }

export const FLOW_UNITS = { cfm: 'CFM', lps: 'L/s', m3hr: 'm³/hr', m3min: 'm³/min' }
export const LENGTH_UNITS = { m: 'Meters', ft: 'Feet' }
export const MATERIALS = ['Aluminium 6063 T5', 'Aluminium 6063 T6', 'SS 304', 'SS 316', 'Mild Steel - MS', 'GI']
export const MEDIA = ['Air', 'Nitrogen', 'Argon', 'ACM', 'Vaccum', 'Co2', 'Others']
export const LINES = { header: 'Header line', sub: 'Sub header line', drop: 'Drop line' }
export const SYSTEMS = { open: 'Open loop', closed: 'Closed loop (ring main)' }

/** Friction factor f by pipe material */
const FRICTION = { 'Aluminium 6063 T5': 0.015, 'Aluminium 6063 T6': 0.015, 'SS 304': 0.018, 'SS 316': 0.018, 'Mild Steel - MS': 0.035, GI: 0.035 }
/** Density ρ (kg/m³) at standard conditions by medium */
const DENSITY = { Air: 1.2, Nitrogen: 1.16, Argon: 1.63, ACM: 1.16, Vaccum: 0.24, Co2: 1.84, Others: 1.2 }

export const toM3PerMin = (value, unit) => (unit === 'm3min' ? value : unit === 'm3hr' ? value / 60 : unit === 'lps' ? value * 0.06 : unit === 'cfm' ? value * 0.028316846592 : 0)
export const toMeters = (value, unit) => (unit === 'ft' ? value * 0.3048 : value)

/** Pressure drop (bar) for flow Q (m³/min), length L (m), inner diameter d (mm), pressure P (bar) */
export const flowPressureDrop = (Q, L, d, P) => (d > 0 && P > 0 ? (7.57 * Math.pow(Q, 1.85) * L * 10000) / (Math.pow(d, 5) * P) : 0)

const standardSize = (d) => (d < 21 ? 20 : d <= 28 ? 25 : d <= 35 ? 32 : d <= 45 ? 40 : d <= 58 ? 50 : d <= 72 ? 63 : d <= 85 ? 76 : d <= 105 ? 90 : d <= 140 ? 113 : d <= 183 ? 168 : d <= 220 ? 205 : d <= 270 ? 260 : 290)

/**
 * QuickAir Pipe Size Calculator.
 * Allowed drop: header 0.1 bar, sub header 0.15 bar, drop line 0.2 bar.
 * A closed loop halves the flow in each leg.
 */
export function pipeSize({ flow, flowUnit, pressure, length, lengthUnit, system, line }) {
  let Q = toM3PerMin(flow, flowUnit)
  const L = toMeters(length, lengthUnit)
  if (system === 'closed') Q /= 2
  const allowed = line === 'sub' ? 0.15 : line === 'drop' ? 0.2 : 0.1
  const calculated = Math.round(Math.pow((7.57 * Math.pow(Q, 1.85) * L * 10000) / (allowed * pressure), 0.2))
  const outer = standardSize(calculated)
  const inner = QUICKAIR_PIPES[outer]
  return { Q, L, allowed, calculated, outer, inner, drop: flowPressureDrop(Q, L, inner, pressure), dropFor: (od) => flowPressureDrop(Q, L, QUICKAIR_PIPES[od], pressure) }
}

/** QuickAir Pressure Drop Calculator (Darcy-Weisbach). */
export function pressureDrop({ material, medium, pressure, flow, flowUnit, length, lengthUnit, system, inner }) {
  let L = toMeters(length, lengthUnit)
  const f = FRICTION[material] ?? 0.015
  const rho = DENSITY[medium] ?? 1.2
  const D = inner / 1000
  const Pabs = pressure + 1
  const Qline = toM3PerMin(flow, flowUnit) / Pabs / 60 // m³/s at line pressure
  let V = Qline / (Math.PI * (D / 2) ** 2)
  if (system === 'closed') {
    L /= 2
    V /= 2
  }
  const pa = (f * L * rho * Pabs * V ** 2) / (2 * D)
  return { bar: pa / 1e5, psi: (pa / 1e5) * 14.503773773, velocity: V, friction: f, density: rho }
}

/** Electricity Power Calculator: power lost to a pressure drop and what it costs. η = 85%. */
export function electricityCost({ flow, flowUnit, drop, dropUnit, time, timeUnit, rate }) {
  const ETA = 0.85
  const Qmin = flowUnit === 'cfm' ? flow * 0.0283168466 : flowUnit === 'lps' ? flow * 0.06 : flowUnit === 'm3sec' ? flow * 60 : flow
  const pa = (dropUnit === 'pa' ? drop / 100000 : drop) * 100000
  const hours = timeUnit === 'min' ? time / 60 : time
  const watts = pa * (Qmin / 60)
  return { watts, cost: (watts / ETA) * hours * rate / 1000, eta: ETA }
}
