import { Quote } from 'lucide-react'
import { testimonials } from '@/data/company'
import Reveal from '@/components/motion/Reveal'

/** Three client quotes: one large, two supporting. */
export default function Testimonials() {
  const [lead, ...rest] = testimonials
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <Reveal as="figure" className="relative">
        <Quote className="size-12 text-(--accent) opacity-60" aria-hidden="true" />
        <blockquote className="mt-6 font-display text-h3 font-semibold">“{lead.quote}”</blockquote>
        <figcaption className="mt-8 text-(--fg-muted)">
          <strong className="font-semibold text-(--fg)">{lead.author}</strong>, {lead.org}
        </figcaption>
      </Reveal>
      <Reveal stagger className="flex flex-col divide-y divide-(--line) border-y border-(--line)">
        {rest.map((item) => (
          <figure key={item.quote} className="py-8">
            <blockquote className="text-lead">“{item.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-(--fg-muted)">
              <strong className="font-semibold text-(--fg)">{item.author}</strong>
              {item.role && `, ${item.role}`}, {item.org}
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </div>
  )
}
