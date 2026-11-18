import { useRef } from 'react'
import { ClipboardList, FileImage, PackageCheck, Wrench } from 'lucide-react'
import { process } from '@/data/company'
import { gsap, EASE } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'
import Reveal from '@/components/motion/Reveal'

const ICONS = [FileImage, ClipboardList, PackageCheck, Wrench]

/** "From enquiry to running air": four steps along a pipe that fills as you scroll. */
export default function ProcessTimeline() {
  const ref = useRef(null)

  useGsap(
    ref,
    () => {
      gsap.fromTo('[data-line]', { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: EASE.linear, scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: true } })
    },
    [],
  )

  return (
    <div ref={ref} className="relative mt-16">
      {/* the "pipe": horizontal on desktop, vertical on mobile */}
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-7 w-1 rounded-full bg-(--line) lg:top-7 lg:right-0 lg:bottom-auto lg:left-0 lg:h-1 lg:w-auto">
        <div data-line className="h-full w-full origin-top rounded-full bg-linear-to-b from-electric-500 to-cyan-400 lg:origin-left lg:bg-linear-to-r" />
      </div>
      <Reveal as="ol" stagger={0.14} className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
        {process.steps.map((step, i) => {
          const Icon = ICONS[i]
          return (
            <li key={step.title} className="relative pl-20 lg:pt-24 lg:pl-0">
              <span className="absolute top-0 left-0 grid size-14 place-items-center rounded-full border border-(--line) bg-(--surface) text-(--accent) shadow-card-light">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="font-display text-eyebrow font-semibold uppercase text-(--accent)">Step {i + 1}</span>
              <h3 className="mt-2 text-h3">{step.title}</h3>
              <p className="mt-3 text-(--fg-muted)">{step.text}</p>
            </li>
          )
        })}
      </Reveal>
    </div>
  )
}
