import { useLayoutEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import { comparison } from '@/data/company'
import { gsap, STAGGER, prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Section } from '@/components/ui'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'

const RUST = Array.from({ length: 14 }, (_, i) => ({ cx: 30 + i * 42, cy: i % 2 ? 114 : 66, r: 7 + (i % 3) * 3 }))

/** Cut-away pipe: rusted steel bore or a clean aluminium bore with flowing air. */
function CrossSection({ steel }) {
  return (
    <svg viewBox="0 0 600 180" role="img" aria-label={steel ? 'Cross-section of a rusted steel pipe' : 'Cross-section of a clean Quickair aluminium pipe with air flowing'} className="w-full">
      <defs>
        <linearGradient id="wall-alu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fb6ee" />
          <stop offset="0.5" stopColor="#1f7fd1" />
          <stop offset="1" stopColor="#0f4f8c" />
        </linearGradient>
        <linearGradient id="wall-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a3acb9" />
          <stop offset="1" stopColor="#5d7280" />
        </linearGradient>
      </defs>
      <rect x="0" y="34" width="600" height="112" rx="10" fill={steel ? 'url(#wall-steel)' : 'url(#wall-alu)'} />
      <rect x="0" y="50" width="600" height="80" fill={steel ? '#5b3a29' : '#e8f4fb'} />
      {steel ? (
        RUST.map((c) => <circle key={c.cx} {...c} fill="#a4532b" />)
      ) : (
        <>
          <path d="M0 78H600M0 102H600" stroke="#2ccbf2" strokeWidth="2" strokeDasharray="3 15" className="animate-flow" opacity="0.7" />
          <path d="M0 90H600" stroke="#0b8fc2" strokeWidth="4" strokeDasharray="6 12" className="animate-flow" />
        </>
      )}
    </svg>
  )
}

/**
 * "Why plants switch from steel to aluminium": the original comparison
 * table, presented as an interactive switch between the two materials.
 */
export default function SteelVsAluminium({ heading = 'h2' }) {
  const [side, setSide] = useState('aluminium')
  const ref = useRef(null)
  const steel = side === 'steel'

  // Replay the list entrance each time the switch flips.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-fact]', { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, stagger: STAGGER.tight, duration: 0.6 })
      gsap.fromTo('[data-pipe]', { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.7 })
    }, ref)
    return () => ctx.revert()
  }, [side])

  return (
    <Section theme="dark" id="why" className={cn('transition-colors duration-700', steel ? 'bg-[#15110f]!' : '')}>
      <div aria-hidden="true" className={cn('absolute inset-0 -z-10 transition-opacity duration-700', steel ? 'opacity-0' : 'opacity-100')}>
        <div className="bg-glow absolute top-1/2 left-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <SplitText as={heading} text={comparison.title} className="block text-h2" />
        <Reveal className="mt-5 text-lead text-(--fg-muted)">{comparison.lead}</Reveal>

        <Reveal className="mt-10 inline-flex rounded-full border border-white/15 bg-white/5 p-1.5" role="group" aria-label="Pipe material">
          {[['steel', comparison.steelLabel], ['aluminium', comparison.aluminiumLabel]].map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={side === key}
              onClick={() => setSide(key)}
              className={cn(
                'rounded-full px-5 py-3 font-display text-sm font-semibold transition-[background-color,color,box-shadow] duration-400 ease-out-expo sm:px-7',
                side === key ? (key === 'steel' ? 'bg-[#a4532b] text-white' : 'bg-electric-500 text-white shadow-glow') : 'text-alu-300 hover:text-white',
              )}
            >
              {label}
            </button>
          ))}
        </Reveal>
      </div>

      <div ref={ref} className="mt-14 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <figure data-pipe>
          <CrossSection steel={steel} />
        </figure>
        <dl className="flex flex-col">
          {comparison.rows.map(([topic, steelValue, aluValue]) => (
            <div key={topic} data-fact className="grid grid-cols-[2rem_1fr] items-center gap-x-4 border-b border-white/10 py-4">
              <span className={cn('grid size-8 place-items-center rounded-full', steel ? 'bg-[#a4532b]/25 text-[#e08a5b]' : 'bg-electric-500/20 text-cyan-400')}>
                {steel ? <X className="size-4" aria-hidden="true" /> : <Check className="size-4" aria-hidden="true" />}
              </span>
              <div>
                <dt className="font-display text-eyebrow font-semibold uppercase text-alu-400">{topic}</dt>
                <dd className="mt-1 text-lg font-medium text-white">{steel ? steelValue : aluValue}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
