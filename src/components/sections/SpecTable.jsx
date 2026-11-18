import Reveal from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

/** Two-column specification list. rows: [[label, value]] */
export default function SpecTable({ rows, caption, className }) {
  return (
    <Reveal as="dl" stagger={0.05} aria-label={caption} className={cn('border-t border-(--line)', className)}>
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-1 border-b border-(--line) py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8 sm:py-5">
          <dt className="font-display text-sm font-semibold uppercase tracking-wider text-(--fg-muted)">{label}</dt>
          <dd className="text-lg font-medium">{value}</dd>
        </div>
      ))}
    </Reveal>
  )
}
