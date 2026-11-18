import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { company } from '@/data/company'

const SITE = 'Quick Air'

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-page <title>, meta description and Open Graph tags.
 * Render once at the top of every page component.
 */
export default function Seo({ title, description = company.metaDescription, image = '/qa/home/quickair-blue-aluminium-compressed-air-piping-installed-in-a-factory.jpg', type = 'website' }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : `Quick Air | Aluminium Compressed Air Piping System`
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', new URL(image, window.location.origin).href)
    setMeta('property', 'og:url', window.location.origin + pathname)
    setMeta('property', 'og:site_name', SITE)
    setMeta('name', 'twitter:card', 'summary_large_image')
  }, [title, description, image, type, pathname])

  return null
}
