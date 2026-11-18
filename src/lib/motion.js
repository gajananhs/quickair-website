/**
 * Motion tokens + the single GSAP entry point.
 * Always import gsap / ScrollTrigger from here so plugins are registered once.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = {
  out: 'expo.out', // entrances, reveals
  inOut: 'power3.inOut', // transitions between states
  soft: 'power2.out', // small UI movements
  linear: 'none', // scrubbed scroll animations
}

export const DURATION = {
  fast: 0.35,
  base: 0.9,
  slow: 1.4,
  cinematic: 2.2,
}

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.18,
}

/** Default ScrollTrigger start for reveals */
export const REVEAL_START = 'top 85%'

/** from-states for <Reveal variant="..."> */
export const REVEAL_VARIANTS = {
  'fade-up': { autoAlpha: 0, y: 48 },
  'fade-down': { autoAlpha: 0, y: -32 },
  'fade-left': { autoAlpha: 0, x: 56 },
  'fade-right': { autoAlpha: 0, x: -56 },
  fade: { autoAlpha: 0 },
  scale: { autoAlpha: 0, scale: 0.94 },
  blur: { autoAlpha: 0, y: 24, filter: 'blur(12px)' },
}

/**
 * Motion preference. Follows the operating system setting, with a manual
 * override for testing: open any page with ?motion=full (force animations)
 * or ?motion=reduce (force the static version). The choice lasts for the
 * browser tab session; ?motion=auto clears it.
 */
const motionOverride = (() => {
  try {
    const query = new URLSearchParams(window.location.search).get('motion')
    if (query === 'auto') sessionStorage.removeItem('quickair-motion')
    else if (query) sessionStorage.setItem('quickair-motion', query)
    return sessionStorage.getItem('quickair-motion')
  } catch {
    return null
  }
})()

export const prefersReducedMotion = () => {
  if (motionOverride === 'full') return false
  if (motionOverride === 'reduce') return true
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * The two 3D piping diagrams (hero model and the pinned scroll story) are the
 * centrepiece of the site, so they animate even when the device asks for
 * reduced motion. Only the explicit ?motion=reduce override turns them off.
 * Every other animation keeps following prefersReducedMotion().
 */
export const allow3DMotion = () => motionOverride !== 'reduce'

gsap.defaults({ ease: EASE.out, duration: DURATION.base })

export { gsap, ScrollTrigger }
