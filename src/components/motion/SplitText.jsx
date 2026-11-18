import { useRef } from 'react'
import { gsap, DURATION, EASE, REVEAL_START } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'

/**
 * Headline whose words rise into place one after another.
 *
 *   <SplitText as="h1" className="text-display" text="Quick. Modular. Efficient." />
 *   <SplitText text={[['Engineered', 'text-metal'], ['in aluminium.', 'text-electric-gradient']]} />
 *
 * `immediate` plays on mount (hero); otherwise it plays when scrolled into view.
 */
export default function SplitText({ as: Tag = 'span', text, className, delay = 0, immediate = false, stagger = 0.07, ...rest }) {
  const ref = useRef(null)
  // Gradient text (background-clip) does not paint through the transformed word
  // wrappers, so those classes are moved from the heading onto each word.
  const gradient = /text-(metal|electric-gradient)/.exec(className ?? '')?.[0]
  const tagClass = gradient ? className.replace(gradient, '').trim() : className
  const segments = typeof text === 'string' ? [[text, gradient]] : text

  useGsap(
    ref,
    () => {
      gsap.fromTo(
        ref.current.querySelectorAll('.split-word > span'),
        { yPercent: 115, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: DURATION.slow,
          ease: EASE.out,
          stagger,
          delay,
          scrollTrigger: immediate ? undefined : { trigger: ref.current, start: REVEAL_START, once: true },
        },
      )
    },
    [delay, immediate, stagger],
  )

  return (
    <Tag ref={ref} className={tagClass} {...rest}>
      {segments.map(([segment, segmentClass], i) =>
        segment.split(' ').map((word, j) => (
          <span key={`${i}-${j}`} className="split-word">
            <span className={segmentClass}>{word}</span>
            {' '}
          </span>
        )),
      )}
    </Tag>
  )
}
