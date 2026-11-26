import { useSyncExternalStore } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

/** Subscribe to a CSS media query. useMediaQuery('(min-width: 1024px)') */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/**
 * False while the prerendered HTML is being attached, true from the next render on.
 * For values the static page cannot know (query-string parameters): render the
 * default first, exactly as prerendered, then the real value.
 */
export const useHydrated = () => useSyncExternalStore(() => () => {}, () => true, () => false)

/** True when animations are off (OS setting or the ?motion= override). Fixed for the page's lifetime. */
export const useReducedMotion = () => prefersReducedMotion()
