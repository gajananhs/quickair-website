import { cn } from '@/lib/cn'

/** Large metric with a caption, e.g. "26+ / Years of modular piping". */
export default function Stat({ value, label, className }) {
  return (
    <div className={cn('flex flex-col gap-2 border-l border-(--line) pl-5', className)}>
      <span className="font-display text-h2 font-semibold text-(--fg)">{value}</span>
      <span className="text-sm text-(--fg-muted)">{label}</span>
    </div>
  )
}
