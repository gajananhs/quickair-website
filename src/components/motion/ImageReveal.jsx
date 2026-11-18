import { useRef } from 'react'
import { gsap, DURATION, EASE, REVEAL_START } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'
import { cn } from '@/lib/cn'

/**
 * Image that wipes open while settling from a slight zoom.
 * `parallax` adds a slow vertical drift while the image crosses the viewport.
 * The wrapper sets the box (use an aspect-* class); the image covers it.
 */
export default function ImageReveal({ src, alt = '', className, imgClassName, parallax = false, eager = false, fit = 'cover', width, height, children }) {
  const ref = useRef(null)

  useGsap(
    ref,
    () => {
      const el = ref.current
      const img = el.querySelector('img')
      gsap.set(el, { autoAlpha: 1 })
      gsap.fromTo(
        el,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.slow, ease: EASE.inOut, scrollTrigger: { trigger: el, start: REVEAL_START, once: true } },
      )
      gsap.fromTo(img, { scale: 1.25 }, { scale: parallax ? 1.12 : 1, duration: DURATION.cinematic, ease: EASE.out, scrollTrigger: { trigger: el, start: REVEAL_START, once: true } })
      if (parallax) {
        gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: EASE.linear, scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      }
    },
    [parallax],
  )

  return (
    <div ref={ref} data-reveal="" className={cn('relative overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain', imgClassName)}
      />
      {children}
    </div>
  )
}
