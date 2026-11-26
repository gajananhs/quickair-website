import { lazy, Suspense, useRef, useState } from 'react'
import { Hand, MousePointer2, Move3d } from 'lucide-react'
import { system } from '@/data/company'
import { cn } from '@/lib/cn'

const AssemblyCanvas = lazy(() => import('@/components/three/AssemblyCanvas'))

/**
 * Interactive 3D diagram of a Quickair line.
 * Drag to rotate, hover a part to see what it is, and use the slider to
 * pull the assembly apart into an exploded view.
 */
export default function SystemExplorer({ className }) {
  const canvasRef = useRef(null)
  const [hover, setHover] = useState(null)
  const [explode, setExplode] = useState(0)

  const onExplode = (value) => {
    setExplode(value)
    canvasRef.current?.setExplode(value / 100)
  }

  return (
    <div className={cn('relative overflow-hidden rounded-panel border border-white/10 bg-navy-950', className)}>
      <div aria-hidden="true" className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div aria-hidden="true" className="bg-glow absolute top-1/2 left-1/2 size-[min(60rem,130%)] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative h-[26rem] sm:h-[34rem]">
        <Suspense fallback={null}>
          <AssemblyCanvas ref={canvasRef} explore onHover={setHover} />
        </Suspense>

        {/* part label follows the pointer */}
        <div
          role="status"
          className={cn(
            'pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[160%] rounded-full border border-cyan-400/50 bg-navy-900/90 px-4 py-2 font-display text-sm font-semibold whitespace-nowrap text-white shadow-glow backdrop-blur transition-opacity duration-200',
            hover ? 'opacity-100' : 'opacity-0',
          )}
          style={{ left: hover?.x ?? 0, top: hover?.y ?? 0 }}
        >
          {hover?.name}
        </div>

        <ul className="pointer-events-none absolute top-5 left-5 flex flex-col gap-2 text-xs text-alu-300">
          <li className="flex items-center gap-2"><Move3d className="size-4 text-cyan-400" aria-hidden="true" /> Drag to rotate</li>
          <li className="flex items-center gap-2 max-sm:hidden"><MousePointer2 className="size-4 text-cyan-400" aria-hidden="true" /> Hover a part to identify it</li>
          <li className="flex items-center gap-2 sm:hidden"><Hand className="size-4 text-cyan-400" aria-hidden="true" /> Tap a part to identify it</li>
        </ul>
      </div>

      <div className="relative grid gap-6 border-t border-white/10 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <ul className="flex flex-wrap gap-2">
          {system.fittings.map((name) => (
            <li
              key={name}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300',
                hover?.name === name ? 'border-cyan-400 bg-cyan-400/15 text-white' : 'border-white/15 text-alu-300',
              )}
            >
              {name}
            </li>
          ))}
        </ul>
        <label className="flex items-center gap-4 font-display text-sm font-semibold text-white">
          <span className="whitespace-nowrap">Exploded view</span>
          <input
            type="range"
            min="0"
            max="100"
            value={explode}
            onChange={(e) => onExplode(Number(e.target.value))}
            className="h-1.5 w-40 cursor-pointer appearance-none rounded-full bg-white/15 accent-cyan-400"
            aria-label="Exploded view amount"
          />
        </label>
      </div>
    </div>
  )
}
