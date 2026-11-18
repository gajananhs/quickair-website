import { useRef } from 'react'
import { gsap, DURATION, REVEAL_START, REVEAL_VARIANTS, STAGGER } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'

/**
 * Scroll-triggered entrance. The default way to animate content in.
 *
 *   <Reveal>…</Reveal>                         single block, fade-up
 *   <Reveal variant="scale" delay={0.2}>…</Reveal>
 *   <Reveal stagger className="grid …">        animates direct children in sequence
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'fade-up',
  delay = 0,
  duration = DURATION.base,
  stagger = false,
  start = REVEAL_START,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useGsap(
    ref,
    () => {
      const el = ref.current
      const targets = stagger ? el.children : el
      const from = REVEAL_VARIANTS[variant] ?? REVEAL_VARIANTS['fade-up']
      // The CSS pre-hide sits on the wrapper; in stagger mode the children carry it instead.
      if (stagger) gsap.set(el, { autoAlpha: 1 })

      gsap.fromTo(targets, from, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration,
        delay,
        stagger: stagger ? (stagger === true ? STAGGER.base : stagger) : 0,
        clearProps: 'transform,filter',
        scrollTrigger: { trigger: el, start, once: true },
      })
    },
    [variant, delay, duration, stagger, start],
  )

  return (
    <Tag ref={ref} data-reveal="" {...rest}>
      {children}
    </Tag>
  )
}
