import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import photos from '@/data/generated/gallery.json'
import { galleryIntro } from '@/data/services'
import { gsap, prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ContactCta from '@/components/sections/ContactCta'
import Reveal from '@/components/motion/Reveal'

function Lightbox({ items, index, onClose, onStep }) {
  const photo = items[index]
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop?.()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start?.()
      document.documentElement.style.overflow = ''
    }
  }, [onClose, onStep])

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={photo.title} data-lenis-prevent className="fixed inset-0 z-[100] flex flex-col bg-navy-950/95 backdrop-blur" onClick={onClose}>
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-white">
        <span className="font-mono text-sm text-alu-400">{index + 1} / {items.length}</span>
        <button type="button" autoFocus onClick={onClose} aria-label="Close" className="grid size-11 place-items-center rounded-full border border-white/20 hover:border-cyan-400 hover:text-cyan-400"><X className="size-5" /></button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
        <img key={photo.src} src={photo.src} alt={photo.alt} className="max-h-full max-w-full animate-[fade-in_0.4s_ease-out] rounded-card object-contain" />
        <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-(--accent) sm:left-6"><ChevronLeft /></button>
        <button type="button" onClick={() => onStep(1)} aria-label="Next photo" className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-(--accent) sm:right-6"><ChevronRight /></button>
      </div>
      <div className="px-5 py-5 text-center text-white" onClick={(e) => e.stopPropagation()}>
        <span className="font-display text-eyebrow font-semibold uppercase text-cyan-400">{photo.category}</span>
        <p className="mt-1 font-display text-lg font-semibold">{photo.title}</p>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-alu-300">{photo.text}</p>
      </div>
    </div>,
    document.body,
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const gridRef = useRef(null)
  const shown = filter === 'All' ? photos : photos.filter((p) => p.category === filter)

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current.children, { autoAlpha: 0, y: 28, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.04, ease: 'power3.out', clearProps: 'transform' })
    }, gridRef)
    return () => ctx.revert()
  }, [filter])

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d) => setOpen((i) => (i + d + shown.length) % shown.length), [shown.length])

  return (
    <>
      <Seo title="Gallery" description={galleryIntro.lead} image={photos[0].src} />
      <PageHero crumbs={[['Gallery']]} title={galleryIntro.title} lead={galleryIntro.lead} image="/qa/gallery/run-through-a-new-steel-structure.jpg" />

      <section className="theme-dark border-b border-(--line)">
        <Reveal as="dl" stagger className="mx-auto grid max-w-site grid-cols-2 px-(--gutter) lg:grid-cols-4">
          {galleryIntro.stats.map((stat) => (
            <div key={stat.label} className="border-white/10 py-8 pr-6 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <dd className="font-display text-h3 font-semibold text-cyan-400">{stat.value}</dd>
              <dt className="mt-1 text-sm text-alu-400">{stat.label}</dt>
            </div>
          ))}
        </Reveal>
      </section>

      <div className="theme-light sticky top-(--spacing-header) z-30 border-b border-(--line) bg-white/90! backdrop-blur">
        <div role="group" aria-label="Filter photos" className="mx-auto flex max-w-site gap-2 overflow-x-auto px-(--gutter) py-3 [scrollbar-width:none]">
          {['All', ...galleryIntro.categories].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={cn('shrink-0 rounded-full border px-5 py-2.5 font-display text-sm font-semibold whitespace-nowrap transition-colors duration-300', filter === name ? 'border-navy-900 bg-navy-900 text-white' : 'border-(--line) hover:border-(--accent) hover:text-(--accent)')}
            >
              {name} <span className="ml-1 font-mono text-xs opacity-60">{name === 'All' ? photos.length : photos.filter((p) => p.category === name).length}</span>
            </button>
          ))}
        </div>
      </div>

      <Section theme="light">
        <ul ref={gridRef} className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {shown.map((photo, i) => (
            <li key={photo.src} className="mb-5 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-card bg-alu-50 text-left">
                <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} loading="lazy" className="w-full transition-transform duration-700 ease-out-expo group-hover:scale-105" />
                <span className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent p-5 text-white opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                  <span className="font-display text-eyebrow font-semibold uppercase text-cyan-400">{photo.category}</span>
                  <span className="mt-1 font-display text-lg font-semibold">{photo.title}</span>
                  <span className="mt-1 hidden text-sm text-alu-200 sm:block">{photo.text}</span>
                </span>
                <span aria-hidden="true" className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-navy-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100"><Expand className="size-4" /></span>
              </button>
            </li>
          ))}
        </ul>
      </Section>

      {open !== null && <Lightbox items={shown} index={open} onClose={close} onStep={step} />}
      <ContactCta />
    </>
  )
}
