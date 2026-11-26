import { useEffect, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion'

/**
 * The Lenis instance is kept in a small store instead of React context. A context
 * value that changes right after start-up makes React throw away prerendered
 * content that is still waiting for its script chunk and draw it again; a store
 * only re-renders the components that read it.
 */
let current = null
const listeners = new Set()
const setCurrent = (instance) => {
  current = instance
  listeners.forEach((notify) => notify())
}
const subscribe = (notify) => {
  listeners.add(notify)
  return () => listeners.delete(notify)
}

/** Access the Lenis instance (null when reduced motion is on). */
export const useLenis = () => useSyncExternalStore(subscribe, () => current, () => null)

/**
 * Owns the single Lenis instance, drives it from the GSAP ticker so
 * ScrollTrigger and smooth scroll stay in sync, resets scroll on route
 * change and scrolls to #hash targets.
 */
export default function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const instance = new Lenis({ lerp: 0.1, autoRaf: false })
    instance.on('scroll', ScrollTrigger.update)

    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    setCurrent(instance)
    window.__lenis = instance // handle used by the gallery lightbox and scroll tests

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
      setCurrent(null)
    }
  }, [])

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) {
      // Wait a frame so lazy sections have laid out before measuring.
      const id = setTimeout(() => {
        if (lenis) lenis.scrollTo(target, { offset: -80 })
        else target.scrollIntoView()
      }, 120)
      return () => clearTimeout(id)
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenis])

  // Images and lazy routes change page height after mount: keep triggers accurate.
  useEffect(() => {
    const timers = [200, 900, 2000].map((ms) => setTimeout(() => ScrollTrigger.refresh(), ms))
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', onLoad)
    }
  }, [pathname])

  return children
}
