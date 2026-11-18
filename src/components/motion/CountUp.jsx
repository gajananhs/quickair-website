import { useRef } from 'react'
import { gsap, DURATION } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'

/**
 * Counts the leading number of a value up from zero when it scrolls into view.
 * Non-numeric values ("PAN-India") are rendered unchanged.
 */
export default function CountUp({ value, className }) {
  const ref = useRef(null)
  const match = /^(\d+)(.*)$/.exec(String(value))

  useGsap(
    ref,
    () => {
      if (!match) return
      const state = { n: 0 }
      const target = Number(match[1])
      gsap.to(state, {
        n: target,
        duration: DURATION.slow,
        ease: 'power2.out',
        // fire as soon as the number is on screen at all (hero stats sit at the fold)
        scrollTrigger: { trigger: ref.current, start: 'top 98%', once: true },
        onUpdate: () => {
          ref.current.textContent = Math.round(state.n) + match[2]
        },
      })
    },
    [value],
  )

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
