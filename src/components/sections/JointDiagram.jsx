import { useState } from 'react'
import { jointParts } from '@/data/products'
import { cn } from '@/lib/cn'

/**
 * Hotspot positions on the cut-away drawing (viewBox 0 0 640 300).
 * Each id matches an entry in jointParts[type].
 */
const SPOTS = {
  'push-fit': { pipe: [96, 150], body: [330, 92], seal: [258, 150], bore: [470, 150], std: [330, 218] },
  crimping: { body: [330, 86], end: [222, 150], seal: [268, 204], ring: [392, 204], thread: [520, 118], bore: [96, 150] },
}

/**
 * Hoverable technical diagram: a cut-away of a Quick Air joint.
 * Hovering (or focusing) a hotspot or a row highlights the part and shows its
 * specification. All values come from the product specification tables.
 */
export default function JointDiagram({ type = 'push-fit', className }) {
  const parts = jointParts[type]
  const spots = SPOTS[type]
  const [active, setActive] = useState(parts[0].id)
  const on = (id) => active === id
  const crimp = type === 'crimping'

  return (
    <div className={cn('grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12', className)}>
      <svg viewBox="0 0 640 300" role="img" aria-label={`Cut-away diagram of a Quick Air ${crimp ? 'crimping type integrated' : 'push fit'} joint`} className="w-full">
        <defs>
          <linearGradient id="jd-pipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5fb6ee" />
            <stop offset="0.5" stopColor="#1f7fd1" />
            <stop offset="1" stopColor="#0f4f8c" />
          </linearGradient>
          <linearGradient id="jd-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d6dde3" />
            <stop offset="0.5" stopColor="#8d969f" />
            <stop offset="1" stopColor="#5d6770" />
          </linearGradient>
        </defs>

        {/* left pipe */}
        <g className={cn('transition-opacity duration-300', !on('pipe') && !on('bore') && 'opacity-70')}>
          <rect x="20" y="112" width="240" height="76" rx="4" fill="url(#jd-pipe)" />
          <rect x="20" y="126" width="240" height="48" fill="#e8f4fb" />
        </g>
        {/* right pipe */}
        <g className={cn('transition-opacity duration-300', !on('pipe') && !on('bore') && 'opacity-70')}>
          <rect x="400" y="112" width="220" height="76" rx="4" fill="url(#jd-pipe)" />
          <rect x="400" y="126" width="220" height="48" fill="#e8f4fb" />
        </g>
        {/* air flow */}
        <path d="M24 150H616" stroke="#2ccbf2" strokeWidth="3" strokeDasharray="6 12" className="animate-flow" opacity={on('bore') ? 1 : 0.55} />

        {/* fitting body (cut-away: upper and lower shells) */}
        <g className={cn('transition-opacity duration-300', on('body') ? 'opacity-100' : 'opacity-80')}>
          <path d="M212 70h236a10 10 0 0 1 10 10v32H202V80a10 10 0 0 1 10-10Z" fill="url(#jd-body)" stroke={on('body') ? '#2ccbf2' : 'transparent'} strokeWidth="3" />
          <path d="M202 188h256v32a10 10 0 0 1-10 10H212a10 10 0 0 1-10-10Z" fill="url(#jd-body)" stroke={on('body') ? '#2ccbf2' : 'transparent'} strokeWidth="3" />
          <rect x="300" y="60" width="60" height="14" rx="3" fill="#b7c0ca" />
        </g>
        {/* collar nuts / end connectors */}
        <g className={cn('transition-opacity duration-300', on('end') || !crimp ? 'opacity-100' : 'opacity-75')}>
          <rect x="188" y="92" width="26" height="116" rx="5" fill="#14181d" stroke={on('end') ? '#2ccbf2' : 'transparent'} strokeWidth="3" />
          <rect x="446" y="92" width="26" height="116" rx="5" fill="#14181d" stroke={on('end') ? '#2ccbf2' : 'transparent'} strokeWidth="3" />
        </g>
        {/* O-rings */}
        {[250, 276, 384, 410].map((x) => (
          <g key={x}>
            <circle cx={x} cy="119" r="7" fill={on('seal') ? '#2ccbf2' : '#22303a'} className="transition-colors duration-300" />
            <circle cx={x} cy="181" r="7" fill={on('seal') ? '#2ccbf2' : '#22303a'} className="transition-colors duration-300" />
          </g>
        ))}
        {/* grab rings (crimping type) */}
        {crimp && [296, 364].map((x) => (
          <g key={x}>
            <path d={`M${x} 112l10 12-10 0Z`} fill={on('ring') ? '#2ccbf2' : '#c9d1da'} className="transition-colors duration-300" />
            <path d={`M${x} 188l10-12-10 0Z`} fill={on('ring') ? '#2ccbf2' : '#c9d1da'} className="transition-colors duration-300" />
          </g>
        ))}
        {/* threaded port (crimping type) */}
        {crimp && (
          <g>
            <rect x="500" y="92" width="44" height="20" fill="#8d969f" stroke={on('thread') ? '#2ccbf2' : 'transparent'} strokeWidth="3" />
            <path d="M506 92v20M514 92v20M522 92v20M530 92v20M538 92v20" stroke="#5d6770" strokeWidth="2" />
          </g>
        )}

        {/* hotspots */}
        {parts.map((part, i) => {
          const [x, y] = spots[part.id]
          return (
            <g
              key={part.id}
              role="button"
              tabIndex={0}
              aria-label={`${part.label}: ${part.value}`}
              onMouseEnter={() => setActive(part.id)}
              onFocus={() => setActive(part.id)}
              onClick={() => setActive(part.id)}
              className="cursor-pointer outline-none"
            >
              <circle cx={x} cy={y} r="13" fill="#2ccbf2" opacity="0.35" className={on(part.id) ? 'animate-ping-soft' : ''} />
              <circle cx={x} cy={y} r="13" fill={on(part.id) ? '#2ccbf2' : '#051b26'} stroke="#2ccbf2" strokeWidth="2" className="transition-colors duration-300" />
              <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={on(part.id) ? '#051b26' : '#ffffff'} fontFamily="var(--font-display)">
                {i + 1}
              </text>
            </g>
          )
        })}
      </svg>

      <ol className="flex flex-col">
        {parts.map((part, i) => (
          <li key={part.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(part.id)}
              onFocus={() => setActive(part.id)}
              onClick={() => setActive(part.id)}
              aria-pressed={on(part.id)}
              className={cn(
                'grid w-full grid-cols-[2rem_1fr] gap-x-4 border-b border-(--line) py-4 text-left transition-[padding,background-color] duration-300 ease-out-expo',
                on(part.id) && 'bg-(--accent)/8 pl-3',
              )}
            >
              <span className={cn('grid size-8 place-items-center rounded-full font-display text-sm font-bold transition-colors duration-300', on(part.id) ? 'bg-(--accent) text-(--surface)' : 'border border-(--line) text-(--fg-muted)')}>
                {i + 1}
              </span>
              <span>
                <span className="block font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">{part.label}</span>
                <span className="mt-1 block font-display text-lg font-semibold">{part.value}</span>
                {part.note && on(part.id) && <span className="mt-1 block text-sm text-(--fg-muted)">{part.note}</span>}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
