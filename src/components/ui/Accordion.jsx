import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Question/answer list built on native <details> (keyboard and no-JS friendly). items: [[question, answer]] */
export default function Accordion({ items, className }) {
  return (
    <div className={cn('divide-y divide-(--line) border-y border-(--line)', className)}>
      {items.map(([question, answer]) => (
        <details key={question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {question}
            <Plus className="size-5 shrink-0 text-(--accent) transition-transform duration-300 ease-out-expo group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="max-w-2xl pb-6 text-(--fg-muted)">{answer}</p>
        </details>
      ))}
    </div>
  )
}
