import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ZoomIn } from 'lucide-react'
import { ROUTES } from '@/data/navigation'
import { cn } from '@/lib/cn'
import AssemblyCanvas from '@/components/three/AssemblyCanvas'

/**
 * Product page for each part of the 3D assembly (part names come from
 * createAssemblyScene). The model is a push-fit aluminium-to-aluminium line:
 * blue aluminium pipe with aluminium fittings; its valve is a 3-piece manual
 * ball valve, and its support clamps and brackets are aluminium accessories.
 * There are no pages for single fittings, so the pipe and the fittings open
 * the push-fit aluminium page that covers them.
 */
const PIPING = 'push-fit-aluminium-to-aluminium'
const PART_PRODUCTS = {
  'Valves and actuators': 'protork-a300-m300-ball-valves',
  'Clamps and brackets': 'aluminium-extrusions',
}
const productHref = (name) => `${ROUTES.products}/${PART_PRODUCTS[name] ?? PIPING}`

/**
 * Homepage hero assembly: same idle presentation, plus the part label from the
 * All Products explorer. Hover (or tap) a part to see its name, click it (or
 * tap it again, or tap the label) to open its product page. Zooming in over
 * the model pulls it apart into its components (the scene handles that).
 * Always import lazily, like AssemblyCanvas.
 */
export default function HeroAssembly() {
  const navigate = useNavigate()
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const tipRef = useRef(null)
  const hideTimer = useRef(0)
  const [tip, setTip] = useState(null) // { id, name, touch }
  const tipNow = useRef(null) // read synchronously: scene callbacks can fire back to back

  const show = (info, touch = false) => {
    clearTimeout(hideTimer.current)
    tipNow.current = info ? { ...info, touch } : null
    setTip(tipNow.current)
  }
  // a short grace period lets the pointer move from the part onto its label
  const hideSoon = () => {
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => show(null), 180)
  }

  const onHover = (info) => {
    if (info) show(info, tipNow.current?.touch && tipNow.current.id === info.id)
    else if (!tipNow.current?.touch) hideSoon()
  }

  const onPick = (info, pointerType) => {
    if (!info) return show(null)
    // touch: the first tap names the part, a second tap opens it
    if (pointerType !== 'mouse' && tipNow.current?.id !== info.id) return show(info, true)
    navigate(productHref(info.name))
  }

  // keep the label on its part while the model turns (no re-render per frame)
  const onAnchor = (x, y) => {
    if (tipRef.current) {
      tipRef.current.style.left = `${x}px`
      tipRef.current.style.top = `${y}px`
    }
  }

  // touch: tapping anywhere else hides the label
  useEffect(() => {
    if (!tip?.touch) return
    const away = (e) => {
      if (wrapRef.current?.contains(e.target)) return
      // page content overlaps the model, so also go by where the tap landed
      const r = wrapRef.current?.getBoundingClientRect()
      if (r && e.clientX >= r.left && e.clientX < r.right && e.clientY >= r.top && e.clientY < r.bottom && !e.target.closest?.('a, button, input, select, textarea, label, [role="button"]')) return
      canvasRef.current?.clearHover()
      show(null)
    }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [tip?.touch])

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <AssemblyCanvas ref={canvasRef} idle links onHover={onHover} onPick={onPick} onAnchor={onAnchor} />

      {/* zoom cue: sits above the model, clear of its parts, and never takes pointer events */}
      <div className="pointer-events-none absolute top-2 right-(--gutter) flex max-w-[calc(100%-2*var(--gutter))] items-center gap-3 lg:top-[calc(var(--spacing-header)+1.75rem)] lg:flex-row-reverse lg:text-right">
        <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-cyan-400/50 bg-navy-900/70 text-cyan-400 shadow-glow backdrop-blur lg:size-11">
          <span aria-hidden="true" className="animate-ping-soft absolute inset-0 rounded-full border border-cyan-400/60 motion-reduce:hidden" />
          <ZoomIn className="size-4.5" aria-hidden="true" />
        </span>
        <p className="flex flex-col gap-0.5">
          <span className="font-display text-xs font-semibold tracking-[0.22em] text-cyan-400 uppercase">Zoom in to explore</span>
          <span className="max-w-64 text-xs leading-snug text-alu-400 max-sm:hidden">Get closer. Discover how every component comes together.</span>
        </p>
      </div>

      {/* part label, same look as the All Products explorer; links to the product */}
      <Link
        ref={tipRef}
        to={tip ? productHref(tip.name) : ROUTES.products}
        tabIndex={-1}
        aria-hidden={!tip}
        onPointerEnter={() => clearTimeout(hideTimer.current)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && hideSoon()}
        className={cn(
          'absolute z-10 -translate-x-1/2 -translate-y-[160%] rounded-full border border-cyan-400/50 bg-navy-900/90 px-4 py-2 font-display text-sm font-semibold whitespace-nowrap text-white shadow-glow backdrop-blur transition-opacity duration-200',
          tip ? 'pointer-events-auto cursor-pointer opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {tip?.name}
      </Link>
    </div>
  )
}
