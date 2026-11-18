import { cn } from '@/lib/cn'

/** Small uppercase label that sits above headings. */
export default function Eyebrow({ className, children }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 font-display text-eyebrow font-semibold uppercase text-(--accent)',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  )
}
