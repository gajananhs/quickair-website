import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/** Official Quick Air logo (transparent PNG from quickair.in), lifted slightly for dark backgrounds. */
export default function Logo({ className, imgClassName }) {
  return (
    <Link to="/" aria-label="Quick Air home" className={cn('inline-flex shrink-0 items-center', className)}>
      <img
        src="/qa/brand/quick-air-logo.png"
        alt="Quickair Modular Piping System: Aluminium | Stainless Steel | Pex"
        width="816"
        height="357"
        className={cn('h-11 w-auto brightness-[1.75] saturate-[1.15]', imgClassName)}
      />
    </Link>
  )
}
