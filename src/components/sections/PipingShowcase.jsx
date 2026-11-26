import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { allow3DMotion, gsap, ScrollTrigger } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui'

const AssemblyCanvas = lazy(() => import('@/components/three/AssemblyCanvas'))

/**
 * Stages of the scroll story. `at` is the progress where the stage begins
 * (matches the timeline in createAssemblyScene). All wording is original
 * Quickair copy (homepage, products and about pages).
 */
const STAGES = [
  {
    at: 0,
    label: 'The system',
    title: 'Complete modular piping from one manufacturer',
    text: 'Pipes, fittings, valves and accessories are made to work together, so lines go in fast and stay easy to change.',
  },
  {
    at: 0.14,
    label: 'The fittings',
    title: 'Zero Thread, Zero Leakage',
    text: 'Push-In Fittings (20-63mm). Push fit and crimping systems for compressed air, vacuum, nitrogen and argon.',
  },
  {
    at: 0.34,
    label: 'The joint',
    title: 'Cut. Push. Run.',
    text: 'Push-fit modular pipes that your team can install with basic tools. Faster installation, no welding.',
  },
  {
    at: 0.5,
    label: 'Every component',
    title: 'Integrated Elbow & Tee Design',
    text: 'Merged fittings cut parts and assembly time by 40%.',
    specs: ['Aluminium alloy 6063 T5', 'Blue (RAL 5012) / anodized', 'O-ring: HNBR / EPDM / Viton', 'Grab ring: spring steel'],
  },
  {
    at: 0.74,
    label: 'Changing the layout',
    title: 'Unscrew, extend, reconnect',
    text: 'Steel means cut and re-weld. Quickair aluminium is light, easy to hang and its smooth bore stays smooth.',
  },
  {
    at: 0.92,
    label: 'Ready for air',
    title: 'Install and test',
    text: 'Your team or our installer fits the system, then pressure-tests every joint. Up to 20 Bar push fit, up to 40 Bar crimping type.',
  },
]

const stageAt = (p) => STAGES.reduce((found, stage, i) => (p >= stage.at ? i : found), 0)

/**
 * Pinned, scroll-scrubbed 3D presentation of the piping assembly:
 * reveal → orbit → component highlights → connectors separate →
 * exploded view → reassembly → complete system.
 */
export default function PipingShowcase() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const barRef = useRef(null)
  const [active, setActive] = useState(0)
  // Follows allow3DMotion(), not the device's reduced-motion setting (see lib/motion.js).
  const [reduced] = useState(() => !allow3DMotion())

  // Not useGsap(): that hook skips its callback when the device asks for reduced motion.
  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return
    const ctx = gsap.context(() => {
      const mobile = window.innerWidth < 768
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: mobile ? '+=320%' : '+=480%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          canvasRef.current?.setProgress(self.progress)
          if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`
          setActive(stageAt(self.progress))
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} id="system" aria-label="The Quickair piping system in 3D" className="theme-dark relative isolate overflow-clip bg-navy-950!">
      <div className={cn('relative flex flex-col', reduced ? 'py-(--section-y)' : 'h-svh')}>
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div aria-hidden="true" className="bg-glow absolute top-1/2 left-1/2 -z-10 size-[min(70rem,140vw)] -translate-x-1/2 -translate-y-1/2" />

        {/* 3D stage */}
        <div className={cn('absolute inset-0', reduced && 'relative h-[60svh]')}>
          <Suspense fallback={null}>
            <AssemblyCanvas ref={canvasRef} shift />
          </Suspense>
        </div>

        {/* Scrim keeps captions readable over the model */}
        {!reduced && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/40 to-transparent lg:bg-linear-to-r lg:from-navy-950/90 lg:via-navy-950/30" />}

        {/* Stage captions */}
        {!reduced && (
          <Container className="pointer-events-none relative flex h-full flex-col pt-[calc(var(--spacing-header)+1.5rem)] pb-8">
            <div className="flex items-center justify-between font-display text-eyebrow font-semibold uppercase text-alu-400">
              <span className="text-cyan-400">Quickair in detail</span>
              <span aria-hidden="true">
                {String(active + 1).padStart(2, '0')} <span className="text-alu-600">/ {String(STAGES.length).padStart(2, '0')}</span>
              </span>
            </div>

            <div className="relative mt-auto min-h-[17rem] max-w-xl sm:min-h-[13rem] lg:my-auto">
              {STAGES.map((stage, i) => (
                <div
                  key={stage.title}
                  aria-hidden={i !== active}
                  className={cn(
                    'motion-3d-caption absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-700 ease-out-expo',
                    i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-6 opacity-0' : 'translate-y-6 opacity-0',
                  )}
                >
                  <p className="mb-3 font-display text-eyebrow font-semibold uppercase text-cyan-400">{stage.label}</p>
                  <h2 className="text-h2 text-metal">{stage.title}</h2>
                  <p className="mt-4 text-lead text-alu-300">{stage.text}</p>
                  {stage.specs && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {stage.specs.map((spec) => (
                        <li key={spec} className="rounded-full border border-white/15 bg-navy-900/70 px-3.5 py-1.5 text-xs text-alu-200 backdrop-blur">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 h-px w-full bg-white/10">
              <div ref={barRef} className="h-px origin-left scale-x-0 bg-linear-to-r from-electric-500 to-cyan-400" />
            </div>
          </Container>
        )}

        {/* Reduced motion: no pinning, every caption is simply listed */}
        {reduced && (
          <Container className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((stage) => (
              <div key={stage.title}>
                <p className="mb-2 font-display text-eyebrow font-semibold uppercase text-cyan-400">{stage.label}</p>
                <h2 className="text-h3">{stage.title}</h2>
                <p className="mt-3 text-alu-300">{stage.text}</p>
              </div>
            ))}
          </Container>
        )}
      </div>
    </section>
  )
}
