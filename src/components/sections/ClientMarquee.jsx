import { clients } from '@/data/company'

/** Endless row of client logos (pauses on hover; static wrap under reduced motion). */
export default function ClientMarquee() {
  const row = [...clients.logos, ...clients.logos]
  return (
    <div className="group relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul className="animate-marquee flex w-max items-center gap-6 group-hover:[animation-play-state:paused] motion-off:w-full motion-off:animate-none motion-off:flex-wrap motion-off:justify-center">
        {row.map((logo, i) => (
          <li key={logo.name + i} aria-hidden={i >= clients.logos.length} className="grid h-24 w-40 shrink-0 place-items-center rounded-card bg-white p-5 shadow-card-light motion-off:[&:nth-child(n+15)]:hidden">
            <img src={logo.src} alt={i < clients.logos.length ? logo.name : ''} loading="lazy" className="max-h-full max-w-full object-contain" />
          </li>
        ))}
      </ul>
    </div>
  )
}
