import { contact, telHref } from '@/data/company'
import Reveal from '@/components/motion/Reveal'
import Tilt from '@/components/motion/Tilt'

/** Regional sales contacts (West, North, East, South), as published on the contact page. */
export default function ZoneContacts() {
  return (
    <Reveal as="ul" stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {contact.zones.map((zone) => (
        <Tilt as="li" key={zone.zone} className="rounded-panel border border-white/10 bg-white/[0.04] p-7">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-cyan-400" />
            <span className="relative inline-flex size-3 rounded-full bg-cyan-400" />
          </span>
          <span className="mt-5 block font-display text-eyebrow font-semibold uppercase text-cyan-400">{zone.zone}</span>
          <span className="mt-2 block font-display text-2xl font-semibold">{zone.person}</span>
          <a href={`mailto:${zone.email}`} className="mt-4 block text-sm break-all text-alu-300 hover:text-cyan-400">{zone.email}</a>
          <a href={telHref(zone.phone)} className="mt-1 block font-display font-semibold hover:text-cyan-400">{zone.phone}</a>
        </Tilt>
      ))}
    </Reveal>
  )
}
