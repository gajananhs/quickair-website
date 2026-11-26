import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { company } from '@/data/company'
import { absoluteUrl, breadcrumbSchema, cleanPath, clip, DEFAULT_IMAGE, organizationSchema, pageTitle, SITE_NAME } from '@/lib/seo'

/**
 * During the build-time prerender this context holds a collector object; <Seo>
 * writes the page's head into it so it can be printed into the static HTML.
 * In the browser it is null and <Seo> updates document.head instead.
 */
export const SeoContext = createContext(null)

/** Everything the <head> needs for one page, as plain data. */
export function buildHead({ title, description, image, type = 'website', noindex = false, crumbs, schema = [], pathname }) {
  const url = absoluteUrl(cleanPath(pathname))
  const fullTitle = pageTitle(title)
  const text = clip(description || company.metaDescription)
  const imageUrl = absoluteUrl(image || DEFAULT_IMAGE)
  return {
    title: fullTitle,
    canonical: noindex ? null : url,
    meta: [
      ['name', 'description', text],
      ['name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
      ['property', 'og:title', fullTitle],
      ['property', 'og:description', text],
      ['property', 'og:type', type],
      ['property', 'og:url', url],
      ['property', 'og:image', imageUrl],
      ['property', 'og:site_name', SITE_NAME],
      ['property', 'og:locale', 'en_IN'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', fullTitle],
      ['name', 'twitter:description', text],
      ['name', 'twitter:image', imageUrl],
    ],
    jsonLd: noindex ? [] : [organizationSchema(), ...(crumbs?.length ? [breadcrumbSchema(crumbs, cleanPath(pathname))] : []), ...schema],
  }
}

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

function applyHead(head) {
  document.title = head.title
  for (const [attr, key, content] of head.meta) {
    upsert(`meta[${attr}="${key}"]`, () => {
      const el = document.createElement('meta')
      el.setAttribute(attr, key)
      return el
    }).setAttribute('content', content)
  }
  if (head.canonical) {
    upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).setAttribute('href', head.canonical)
  } else {
    document.head.querySelector('link[rel="canonical"]')?.remove()
  }
  document.head.querySelectorAll('script[type="application/ld+json"][data-seo]').forEach((el) => el.remove())
  for (const data of head.jsonLd) {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.seo = ''
    el.textContent = JSON.stringify(data)
    document.head.appendChild(el)
  }
}

/**
 * Per-page <title>, description, canonical URL, Open Graph / Twitter tags and
 * JSON-LD. Render once at the top of every page component.
 *
 *   <Seo title="Contact" description="…" crumbs={[['Contact']]} schema={[localBusinessSchema()]} />
 *
 * `crumbs` mirrors PageHero's breadcrumb and becomes a BreadcrumbList.
 * `noindex` is for pages that must stay out of search results (the 404 page).
 */
export default function Seo(props) {
  const { pathname } = useLocation()
  const collector = useContext(SeoContext)
  const head = buildHead({ ...props, pathname })
  if (collector) collector.head = head

  const signature = JSON.stringify(head)
  useEffect(() => {
    applyHead(JSON.parse(signature))
  }, [signature])

  return null
}
