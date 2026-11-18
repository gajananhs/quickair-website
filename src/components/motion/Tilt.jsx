import { useRef } from 'react'
import { cn } from '@/lib/cn'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Card that tilts a few degrees toward the pointer and moves a soft
 * highlight under it. Pure CSS transforms driven by two custom properties,
 * so it costs nothing when idle. Disabled on touch and reduced motion.
 */
export default function Tilt({ as: Tag = 'div', className, children, max = 6, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--rx', `${(0.5 - py) * max}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * max}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        'group/tilt relative transition-transform duration-500 ease-out-expo will-change-transform [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]',
        className,
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
        style={{ background: 'radial-gradient(22rem circle at var(--mx,50%) var(--my,50%), rgb(44 203 242 / 0.16), transparent 60%)' }}
      />
    </Tag>
  )
}
