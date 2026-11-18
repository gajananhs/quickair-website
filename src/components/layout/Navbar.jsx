import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { mainNav, primaryCta } from '@/data/navigation'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { Button, Container, Logo } from '@/components/ui'

const linkClass = (active) =>
  cn('inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-300 hover:text-white', active ? 'text-cyan-400' : 'text-alu-200')

function DesktopItem({ item, pathname }) {
  const active = pathname === item.to || item.children?.some((c) => c.to === pathname) || (item.to !== '/' && pathname.startsWith(item.to + '/'))
  if (!item.children) {
    return (
      <li>
        <NavLink to={item.to} className={linkClass(active)}>
          {item.label}
        </NavLink>
      </li>
    )
  }
  return (
    <li className="group relative">
      <NavLink to={item.to} className={linkClass(active)} aria-haspopup="true">
        {item.label}
        <ChevronDown className="size-3.5 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />
      </NavLink>
      {/* Dropdown: opens on hover and on keyboard focus */}
      <div className="invisible absolute top-full left-1/2 w-80 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-300 ease-out-expo group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <ul className="overflow-hidden rounded-card border border-white/10 bg-navy-900/95 p-2 shadow-card backdrop-blur-xl">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link to={child.to} className="group/item flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/5">
                <span>
                  <span className={cn('block text-sm font-semibold', pathname === child.to ? 'text-cyan-400' : 'text-white')}>{child.label}</span>
                  <span className="block text-xs text-alu-400">{child.note}</span>
                </span>
                <ArrowRight className="size-4 -translate-x-2 text-cyan-400 opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover/item:translate-x-0 group-hover/item:opacity-100" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    open ? lenis?.stop() : lenis?.start()
  }, [open, lenis])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b text-alu-50 transition-[background-color,border-color] duration-500',
        scrolled || open ? 'border-white/10 bg-navy-900/80 backdrop-blur-xl' : 'border-transparent',
      )}
    >
      <Container className="flex h-header items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <DesktopItem key={item.label} item={item} pathname={pathname} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button to={primaryCta.to} size="sm" icon={<ArrowRight />} className="max-sm:hidden">
            {primaryCta.label}
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} data-lenis-prevent className="h-[calc(100dvh-var(--spacing-header))] overflow-y-auto bg-navy-900 lg:hidden">
        <Container as="nav" aria-label="Mobile" className="flex flex-col gap-8 py-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-white/10">
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <ChevronDown className="size-5 text-cyan-400 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="flex flex-col gap-1 pb-4">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link to={child.to} className={cn('block rounded-lg px-3 py-2.5 text-base', pathname === child.to ? 'text-cyan-400' : 'text-alu-200')}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link to={item.to} className={cn('block py-4 font-display text-xl font-semibold', pathname === item.to && 'text-cyan-400')}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Button to={primaryCta.to} size="lg" icon={<ArrowRight />}>
            {primaryCta.label}
          </Button>
        </Container>
      </div>
    </header>
  )
}
