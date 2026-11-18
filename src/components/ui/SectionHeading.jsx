import { cn } from '@/lib/cn'
import Eyebrow from './Eyebrow'

/**
 * Standard section intro: eyebrow + title + optional lead paragraph.
 *
 *   <SectionHeading eyebrow="Products" title="Three series. One system." lead="…" align="center" />
 */
export default function SectionHeading({ eyebrow, title, lead, as: Tag = 'h2', align = 'left', className }) {
  return (
    <header className={cn('flex max-w-3xl flex-col gap-5', align === 'center' && 'mx-auto items-center text-center', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className={Tag === 'h1' ? 'text-h1' : 'text-h2'}>{title}</Tag>
      {lead && <p className="text-lead text-(--fg-muted)">{lead}</p>}
    </header>
  )
}
