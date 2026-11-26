import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Compact block of contextual internal links (guides, products, calculators).
 * Link labels describe the destination, so each one works as anchor text.
 *
 *   <RelatedLinks links={[{ label: 'Pipe size calculator', to: '/calculators/pipe-size' }]} />
 */
export default function RelatedLinks({ title = 'Related resources', links, className }) {
  if (!links?.length) return null
  return (
    <nav aria-label={title} className={cn('rounded-card border border-(--line) p-6 sm:p-7', className)}>
      <h2 className="font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">{title}</h2>
      <ul className="mt-4 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.to + link.label}>
            <Link to={link.to} className="group inline-flex items-start gap-1.5 text-[0.9375rem] font-semibold text-(--accent) hover:underline">
              {link.label}
              <ArrowRight className="mt-1 size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
