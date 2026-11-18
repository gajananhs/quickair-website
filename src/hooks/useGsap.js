import { useLayoutEffect } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

/**
 * Run GSAP code scoped to a ref, with automatic cleanup.
 * The callback is skipped entirely when the user prefers reduced motion,
 * so content must be visible/usable in its un-animated state.
 *
 *   useGsap(ref, () => { gsap.from('.item', { y: 40, stagger: 0.1 }) }, [])
 */
export function useGsap(scopeRef, callback, deps = []) {
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !scopeRef.current) return
    const ctx = gsap.context(callback, scopeRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
