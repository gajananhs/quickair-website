import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Gauge, Ruler, Zap } from 'lucide-react'
import { ROUTES } from '@/data/navigation'
import { services } from '@/data/services'
import { electricityCost, FLOW_UNITS, LENGTH_UNITS, LINES, MATERIALS, MEDIA, pipeSize, pressureDrop, QUICKAIR_PIPES, SYSTEMS } from '@/lib/calculators'
import { cn } from '@/lib/cn'
import { calculatorSchema } from '@/lib/seo'
import { Button, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ContactCta from '@/components/sections/ContactCta'
import RelatedLinks from '@/components/sections/RelatedLinks'
import Reveal from '@/components/motion/Reveal'
import Tilt from '@/components/motion/Tilt'

const inputClass = 'w-full rounded-xl border border-(--line) bg-(--surface) px-4 py-3 text-base text-(--fg) transition-colors duration-200 focus:border-(--accent) focus:outline-none'

function Field({ label, children, className }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-2 block font-display text-sm font-semibold">{label}</span>
      {children}
    </label>
  )
}
const Num = ({ value, onChange, ...rest }) => <input type="number" inputMode="decimal" min="0" step="any" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter value" className={inputClass} {...rest} />
const Pick = ({ value, onChange, options }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
    {(Array.isArray(options) ? options.map((o) => [o, o]) : Object.entries(options)).map(([key, text]) => (
      <option key={key} value={key}>{text}</option>
    ))}
  </select>
)
const WithUnit = ({ children }) => <div className="grid grid-cols-[1fr_8.5rem] gap-2">{children}</div>
const num = (v) => (v === '' ? NaN : Number(v))

/** Live drawing: pipe cross-section to scale, air stream speed and a pressure-drop meter. */
function PipeVisual({ outer, inner, drop, limit = 0.2, caption }) {
  const scale = Math.min(1, Math.max(0.16, (outer ?? 63) / 290))
  const R = 26 + scale * 74
  const r = inner && outer ? R * (inner / outer) : R * 0.88
  const ratio = Number.isFinite(drop) ? Math.min(1, drop / (limit * 2)) : 0
  const state = !Number.isFinite(drop) ? 'idle' : drop <= limit ? 'good' : drop <= limit * 2 ? 'warn' : 'bad'
  const color = { idle: '#5d7280', good: '#2ccbf2', warn: '#f2b12c', bad: '#f25c2c' }[state]
  return (
    <figure className="rounded-panel border border-white/10 bg-navy-950 p-6 text-white sm:p-8">
      <svg viewBox="0 0 420 240" role="img" aria-label={caption} className="w-full">
        <defs>
          <linearGradient id="pv-wall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5fb6ee" />
            <stop offset="1" stopColor="#0f4f8c" />
          </linearGradient>
        </defs>
        {/* side view */}
        <rect x="170" y={120 - R * 0.55} width="240" height={R * 1.1} rx="6" fill="url(#pv-wall)" className="transition-all duration-500 ease-out-expo" />
        <rect x="170" y={120 - r * 0.55} width="240" height={r * 1.1} fill="#e8f4fb" className="transition-all duration-500 ease-out-expo" />
        <path d="M172 120H408" stroke={color} strokeWidth="3" strokeDasharray="6 12" className="animate-flow" style={{ animationDuration: `${state === 'bad' ? 0.35 : state === 'warn' ? 0.6 : 1}s` }} />
        {/* cross-section */}
        <circle cx="90" cy="120" r={R} fill="url(#pv-wall)" className="transition-all duration-500 ease-out-expo" />
        <circle cx="90" cy="120" r={r} fill="#051b26" className="transition-all duration-500 ease-out-expo" />
        <text x="90" y="116" textAnchor="middle" fontSize="20" fontWeight="700" fill="#ffffff" fontFamily="var(--font-display)">{outer ?? '—'}</text>
        <text x="90" y="134" textAnchor="middle" fontSize="10" fill="#8fd6ee">mm OD</text>
      </svg>
      <div className="mt-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-alu-400">Pressure drop</span>
          <span className="font-display text-xl font-semibold" style={{ color }}>{Number.isFinite(drop) ? `${drop.toFixed(4)} bar` : '—'}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full transition-[width,background-color] duration-700 ease-out-expo" style={{ width: `${ratio * 100}%`, backgroundColor: color }} />
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-alu-400">{caption}</figcaption>
    </figure>
  )
}

function Result({ label, value, sub }) {
  return (
    <div className="rounded-card bg-(--surface-raised) p-5">
      <span className="block font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">{label}</span>
      <span className="mt-2 block font-display text-h3 font-semibold text-(--accent)">{value}</span>
      {sub && <span className="mt-1 block text-sm text-(--fg-muted)">{sub}</span>}
    </div>
  )
}

/** Search title and description of each calculator (also used for its WebApplication data). */
const CALC_SEO = {
  pipeSize: { title: 'Quickair Pipe Size & Pressure Drop Calculator', description: 'Find the right Quickair pipe size for your flow of air or inert gas and your line length, and see the pressure drop across the line.' },
  pressureDrop: { title: 'Compressed Air Pressure Drop Calculator by Quickair', description: 'Calculate the pressure drop across a compressed air line from the pipe material, medium, diameter, flow and length, in bar and psi.' },
  electricityCost: { title: 'Compressed Air Electricity Cost Calculator', description: "This compressed air electricity cost calculator estimates your compressor's running cost and the savings from an efficient piping upgrade." },
}

const CALC_LINKS = [
  { label: 'Guide: how to choose the right compressed air pipe diameter', to: `${ROUTES.blog}/air-pipe-sizing-guide` },
  { label: 'Guide: compressed air pressure drop, causes and calculation', to: `${ROUTES.blog}/compressed-air-pressure-drop` },
  { label: 'Compressed air pipe size chart', to: `${ROUTES.blog}/compressed-air-pipe-size-chart-2` },
  { label: 'Aluminium compressed air piping products', to: `${ROUTES.products}#aluminium` },
]

function Shell({ title, lead, crumbs, form, visual, results, note }) {
  return (
    <>
      <PageHero crumbs={crumbs} title={title} lead={lead} size="sm" />
      <Section theme="light">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="rounded-panel border border-(--line) bg-alu-50 p-6 sm:p-9">{form}</Reveal>
          <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="fade-left">{visual}</Reveal>
            <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">{results}</div>
            {note && <p className="text-sm text-(--fg-muted)">{note}</p>}
          </div>
        </div>
        <RelatedLinks className="mt-12" title="Guides and products for this calculation" links={CALC_LINKS} />
      </Section>
      <OtherCalculators />
      <ContactCta />
    </>
  )
}

const CALCS = [
  { to: ROUTES.pipeSize, icon: Ruler, title: 'Quickair Pipe Size & Pressure Drop Calculator', text: 'Find the right Quickair pipe size for your flow and line length.' },
  { to: ROUTES.pressureDrop, icon: Gauge, title: 'Quickair Pressure Drop Calculator', text: 'Check the pressure drop across your compressed air line.' },
  { to: ROUTES.electricityCost, icon: Zap, title: 'Electricity Power Calculator', text: 'Estimate the running cost of compressed air.' },
]

function OtherCalculators() {
  return (
    <Section theme="dark">
      <h2 className="text-h3">Engineering calculators</h2>
      <Reveal as="ul" stagger className="mt-8 grid gap-4 md:grid-cols-3">
        {CALCS.map(({ to, icon: Icon, title, text }) => (
          <Tilt as="li" key={to} className="rounded-card border border-white/10 bg-navy-800/60">
            <Link to={to} className="group flex h-full flex-col p-7">
              <Icon className="size-7 text-cyan-400" aria-hidden="true" />
              <span className="mt-5 font-display text-lg font-semibold">{title}</span>
              <span className="mt-2 flex-1 text-sm text-(--fg-muted)">{text}</span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400">
                Open <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Tilt>
        ))}
      </Reveal>
    </Section>
  )
}

/** /calculators */
export function CalculatorsHub() {
  return (
    <>
      <Seo title="Compressed Air Piping Calculators" description="Free compressed air piping calculators: pipe size by flow and line length, pressure drop by material and diameter, and the electricity cost of pressure loss." image="/qa/gallery/flow-marked-manifold.jpg" crumbs={[['Calculator']]} />
      <PageHero crumbs={[['Calculator']]} title="Compressed air piping calculators" lead={services.resourcesLead} image="/qa/gallery/flow-marked-manifold.jpg" />
      <Section theme="light">
        <Reveal as="ul" stagger className="grid gap-6 md:grid-cols-3">
          {CALCS.map(({ to, icon: Icon, title, text }) => (
            <Tilt as="li" key={to} className="rounded-panel bg-white shadow-card-light">
              <Link to={to} className="group flex h-full flex-col p-8">
                <span className="grid size-14 place-items-center rounded-2xl bg-electric-500/10 text-(--accent)"><Icon className="size-7" aria-hidden="true" /></span>
                <h2 className="mt-8 text-h3">{title}</h2>
                <p className="mt-3 flex-1 text-(--fg-muted)">{text}</p>
                <span className="mt-8 inline-flex items-center gap-1.5 font-display font-semibold text-(--accent)">
                  Open <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Tilt>
          ))}
        </Reveal>
      </Section>
      <ContactCta />
    </>
  )
}

/** /calculators/pipe-size */
export function PipeSizeCalculator() {
  const [v, setV] = useState({ flow: '', flowUnit: 'cfm', pressure: '', length: '', lengthUnit: 'm', material: MATERIALS[0], system: 'open', line: 'header', od: '' })
  const set = (key) => (value) => setV((s) => ({ ...s, [key]: value }))
  const result = useMemo(() => {
    const flow = num(v.flow), pressure = num(v.pressure), length = num(v.length)
    return flow > 0 && pressure > 0 && length > 0 ? pipeSize({ ...v, flow, pressure, length }) : null
  }, [v])
  const od = v.od || result?.outer
  const drop = result ? (v.od ? result.dropFor(v.od) : result.drop) : NaN

  return (
    <>
      <Seo {...CALC_SEO.pipeSize} crumbs={[['Calculator', ROUTES.calculators], ['Pipe size']]} schema={[calculatorSchema({ ...CALC_SEO.pipeSize, name: CALC_SEO.pipeSize.title, path: ROUTES.pipeSize })]} />
      <Shell
        crumbs={[['Calculator', ROUTES.calculators], ['Pipe size']]}
        title="Quickair Pipe Size & Pressure Drop Calculator"
        lead="Pipe Size Calculator By Flow Of Air & Inert Gases"
        form={
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <Field label="FAD (Flow Of Air Discharge)" className="sm:col-span-2"><WithUnit><Num value={v.flow} onChange={set('flow')} /><Pick value={v.flowUnit} onChange={set('flowUnit')} options={FLOW_UNITS} /></WithUnit></Field>
            <Field label="Working Pressure (bar)"><Num value={v.pressure} onChange={set('pressure')} /></Field>
            <Field label="Pipe Length"><WithUnit><Num value={v.length} onChange={set('length')} /><Pick value={v.lengthUnit} onChange={set('lengthUnit')} options={LENGTH_UNITS} /></WithUnit></Field>
            <Field label="Pipe Material"><Pick value={v.material} onChange={set('material')} options={MATERIALS} /></Field>
            <Field label="Pipe Line System"><Pick value={v.system} onChange={set('system')} options={SYSTEMS} /></Field>
            <Field label="Pipe Line" className="sm:col-span-2">
              <div role="group" className="grid grid-cols-3 gap-2">
                {Object.entries(LINES).map(([key, text]) => (
                  <button key={key} type="button" aria-pressed={v.line === key} onClick={() => set('line')(key)} className={cn('rounded-xl border px-3 py-3 text-sm font-semibold transition-colors', v.line === key ? 'border-navy-900 bg-navy-900 text-white' : 'border-(--line) bg-white hover:border-(--accent)')}>
                    {text}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Select Diameter to Calculate Pressure Drop (outer, mm)" className="sm:col-span-2">
              <div role="group" className="flex flex-wrap gap-2">
                {Object.keys(QUICKAIR_PIPES).map((size) => (
                  <button key={size} type="button" aria-pressed={String(od) === size} onClick={() => set('od')(v.od === size ? '' : size)} className={cn('min-w-12 rounded-full border px-3 py-2 font-mono text-sm transition-colors', String(od) === size ? 'border-(--accent) bg-(--accent) text-white' : 'border-(--line) bg-white hover:border-(--accent)', result && Number(size) === result.outer && 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-alu-50')}>
                    {size}
                  </button>
                ))}
              </div>
            </Field>
            <div className="sm:col-span-2">
              <Button variant="secondary" size="sm" onClick={() => setV((s) => ({ ...s, flow: '', pressure: '', length: '', od: '' }))}>Clear</Button>
            </div>
          </form>
        }
        visual={<PipeVisual outer={od ? Number(od) : undefined} inner={od ? QUICKAIR_PIPES[od] : undefined} drop={drop} limit={result?.allowed ?? 0.1} caption={result ? `Allowed drop for this line: ${result.allowed} bar. The ringed size is the Quickair recommendation.` : 'Enter flow, pressure and length to size the line.'} />}
        results={
          <>
            <Result label="Quickair Recommended Pipe Size" value={result ? `${result.outer} mm` : '—'} sub={result ? `Inner diameter ${result.inner} mm` : 'Outer diameter'} />
            <Result label="Quickair Actual Pressure Drop" value={Number.isFinite(drop) ? `${drop.toFixed(4)} bar` : '—'} sub={od ? `For ${od} mm pipe` : undefined} />
          </>
        }
        note="Formula: Δp = 7.57 × Q^1.85 × L × 10⁴ ÷ (d⁵ × P), with Q in m³/min, L in m, d in mm and P in bar. A closed loop halves the flow in each leg."
      />
    </>
  )
}

/** /calculators/pressure-drop */
export function PressureDropCalculator() {
  const [v, setV] = useState({ material: MATERIALS[0], medium: 'Air', pressure: '', flow: '', flowUnit: 'cfm', length: '', lengthUnit: 'm', system: 'open', od: '63' })
  const set = (key) => (value) => setV((s) => ({ ...s, [key]: value }))
  const inner = QUICKAIR_PIPES[v.od]
  const result = useMemo(() => {
    const pressure = num(v.pressure), flow = num(v.flow), length = num(v.length)
    return pressure >= 0 && flow > 0 && length > 0 ? pressureDrop({ ...v, pressure, flow, length, inner }) : null
  }, [v, inner])

  return (
    <>
      <Seo {...CALC_SEO.pressureDrop} crumbs={[['Calculator', ROUTES.calculators], ['Pressure drop']]} schema={[calculatorSchema({ ...CALC_SEO.pressureDrop, name: CALC_SEO.pressureDrop.title, path: ROUTES.pressureDrop })]} />
      <Shell
        crumbs={[['Calculator', ROUTES.calculators], ['Pressure drop']]}
        title="Quickair Pressure Drop Calculator"
        lead="Pressure Drop Calculation"
        form={
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <Field label="Pipe Material *"><Pick value={v.material} onChange={set('material')} options={MATERIALS} /></Field>
            <Field label="Working Medium *"><Pick value={v.medium} onChange={set('medium')} options={MEDIA} /></Field>
            <Field label="Working Pressure (bar) *"><Num value={v.pressure} onChange={set('pressure')} /></Field>
            <Field label="FAD (Free Air Discharge) *"><WithUnit><Num value={v.flow} onChange={set('flow')} /><Pick value={v.flowUnit} onChange={set('flowUnit')} options={FLOW_UNITS} /></WithUnit></Field>
            <Field label="Pipe Length *"><WithUnit><Num value={v.length} onChange={set('length')} /><Pick value={v.lengthUnit} onChange={set('lengthUnit')} options={LENGTH_UNITS} /></WithUnit></Field>
            <Field label="Pipe Line System *"><Pick value={v.system} onChange={set('system')} options={SYSTEMS} /></Field>
            <Field label={`Outer diameter (mm) · inner ${inner} mm`} className="sm:col-span-2">
              <div role="group" className="flex flex-wrap gap-2">
                {Object.keys(QUICKAIR_PIPES).map((size) => (
                  <button key={size} type="button" aria-pressed={v.od === size} onClick={() => set('od')(size)} className={cn('min-w-12 rounded-full border px-3 py-2 font-mono text-sm transition-colors', v.od === size ? 'border-(--accent) bg-(--accent) text-white' : 'border-(--line) bg-white hover:border-(--accent)')}>
                    {size}
                  </button>
                ))}
              </div>
            </Field>
            <div className="sm:col-span-2">
              <Button variant="secondary" size="sm" onClick={() => setV((s) => ({ ...s, pressure: '', flow: '', length: '' }))}>Clear</Button>
            </div>
          </form>
        }
        visual={<PipeVisual outer={Number(v.od)} inner={inner} drop={result ? result.bar : NaN} limit={0.1} caption={result ? `Air velocity ${result.velocity.toFixed(2)} m/s · friction factor ${result.friction} · density ${result.density} kg/m³` : 'Enter pressure, flow and length to calculate.'} />}
        results={
          <>
            <Result label="Pressure Drop" value={result ? `${result.bar.toFixed(4)} bar` : '—'} sub={result ? `${result.psi.toFixed(3)} psi` : undefined} />
            <Result label="Velocity" value={result ? `${result.velocity.toFixed(2)} m/s` : '—'} sub="In the pipe at line pressure" />
          </>
        }
        note="Darcy-Weisbach: Δp = f × L × ρ × V² ÷ (2 × D). A closed loop halves the effective length and velocity."
      />
    </>
  )
}

/** /calculators/electricity-cost */
export function ElectricityCalculator() {
  const [v, setV] = useState({ flow: '', flowUnit: 'cfm', drop: '', dropUnit: 'bar', time: '', timeUnit: 'hour', rate: '' })
  const set = (key) => (value) => setV((s) => ({ ...s, [key]: value }))
  const result = useMemo(() => {
    const flow = num(v.flow), drop = num(v.drop), time = num(v.time), rate = num(v.rate)
    return [flow, drop, time, rate].every((n) => Number.isFinite(n) && n >= 0) && flow > 0 ? electricityCost({ ...v, flow, drop, time, rate }) : null
  }, [v])
  const dropBar = result ? (v.dropUnit === 'pa' ? num(v.drop) / 100000 : num(v.drop)) : NaN

  return (
    <>
      <Seo {...CALC_SEO.electricityCost} crumbs={[['Calculator', ROUTES.calculators], ['Electricity power']]} schema={[calculatorSchema({ ...CALC_SEO.electricityCost, name: CALC_SEO.electricityCost.title, path: ROUTES.electricityCost })]} />
      <Shell
        crumbs={[['Calculator', ROUTES.calculators], ['Electricity power']]}
        title="Compressed Air Electricity Cost Calculator"
        lead="This compressed air electricity cost calculator estimates your compressor's running cost and the savings from an efficient piping upgrade."
        form={
          <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-h3">Electricity Power Calculator</h2>
            <Field label="Flow of Air Discharge (Q)"><WithUnit><Num value={v.flow} onChange={set('flow')} /><Pick value={v.flowUnit} onChange={set('flowUnit')} options={{ cfm: 'CFM', lps: 'L/s', m3min: 'm³/min', m3sec: 'm³/s' }} /></WithUnit></Field>
            <Field label="Pressure Drop (ΔP)"><WithUnit><Num value={v.drop} onChange={set('drop')} /><Pick value={v.dropUnit} onChange={set('dropUnit')} options={{ bar: 'bar', pa: 'Pascal' }} /></WithUnit></Field>
            <Field label="Operating Time"><WithUnit><Num value={v.time} onChange={set('time')} /><Pick value={v.timeUnit} onChange={set('timeUnit')} options={{ hour: 'Hour', min: 'Minute' }} /></WithUnit></Field>
            <Field label="Electricity Rate (INR per kWh)"><Num value={v.rate} onChange={set('rate')} /></Field>
            <div><Button variant="secondary" size="sm" onClick={() => setV((s) => ({ ...s, flow: '', drop: '', time: '', rate: '' }))}>Clear</Button></div>
          </form>
        }
        visual={<PipeVisual outer={63} inner={58.88} drop={dropBar} limit={0.1} caption="The faster the stream and the redder the meter, the more compressor energy is being spent overcoming pressure loss." />}
        results={
          <>
            <Result label="Power Loss" value={result ? `${result.watts.toFixed(2)} W` : '—'} />
            <Result label="Electricity Cost" value={result ? `${result.cost.toFixed(2)} INR` : '—'} sub="For the operating time entered" />
          </>
        }
        note="ΔP considered in pascal internally • Q in m³/s • t in hours • η = 85%"
      />
    </>
  )
}
