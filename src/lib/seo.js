/**
 * SEO helpers: canonical URLs, page titles and JSON-LD structured data.
 * Every value comes from src/data (company.js, products.js, articles.json);
 * nothing here invents prices, ratings, reviews or dates.
 */
import { company } from '@/data/company'

/** Canonical origin: https, www, no trailing slash (matches the live redirects and the sitemap). */
export const SITE_URL = 'https://www.quickair.in'
export const SITE_NAME = company.brand
export const DEFAULT_TITLE = 'Quickair | Aluminium Compressed Air Piping Systems'
export const DEFAULT_IMAGE = '/qa/home/quickair-blue-aluminium-compressed-air-piping-installed-in-a-factory.jpg'

/** "/products/" -> "/products"; "/" stays "/". */
export const cleanPath = (pathname = '/') => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/')

/** Absolute canonical URL for a site path or an asset path. */
export const absoluteUrl = (path = '/') => (/^https?:\/\//.test(path) ? path : SITE_URL + (path === '/' ? '/' : cleanPath(path)))

/** "Page title | Quickair"; the brand is left off when the title already carries it or would run past ~65 characters. */
export const pageTitle = (title) => {
  if (!title) return DEFAULT_TITLE
  const branded = `${title} | ${SITE_NAME}`
  return /quickair/i.test(title) || branded.length > 65 ? title : branded
}

/** Trim copy to a search-result length: whole sentences when they fit, otherwise whole words. */
export const clip = (text = '', max = 160) => {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat
  let kept = ''
  for (const sentence of flat.split(/(?<=[.!?])\s+/)) {
    if ((kept + ' ' + sentence).trim().length > max) break
    kept = (kept + ' ' + sentence).trim()
  }
  if (kept.length >= 90) return kept
  return flat.slice(0, max - 1).replace(/[\s,;:–-]+\S*$/, '') + '…'
}

const ORG_ID = `${SITE_URL}/#organization`

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'Plot No. 85/0, Industrial Suburb, Industrial Layout, Yeshwanthpur',
  addressLocality: 'Bengaluru',
  addressRegion: 'Karnataka',
  postalCode: '560022',
  addressCountry: 'IN',
}

/** The company behind the site. Used on every page. */
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: company.brand,
  legalName: company.legalName,
  url: SITE_URL + '/',
  logo: absoluteUrl('/qa/brand/quick-air-logo.png'),
  email: company.email,
  telephone: '+91' + company.phone,
  address: postalAddress,
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', telephone: '+91' + company.phone, email: company.email, areaServed: 'IN' }],
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: company.brand,
  url: SITE_URL + '/',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
})

/** Head office, for the contact page. Opening hours and geo are left out: they are not published. */
export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/contact#head-office`,
  name: company.legalName,
  url: absoluteUrl('/contact'),
  image: absoluteUrl(DEFAULT_IMAGE),
  email: company.email,
  telephone: '+91' + company.phone,
  address: postalAddress,
  hasMap: company.address.mapUrl,
  parentOrganization: { '@id': ORG_ID },
})

/** crumbs: [[label, path], …] below Home; the last one is the current page. */
export const breadcrumbSchema = (crumbs, currentPath) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...crumbs].map(([name, path], i, all) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: absoluteUrl(path ?? (i === all.length - 1 ? currentPath : '/')),
  })),
})

/** Product facts from the specification tables. No offers, prices, ratings or availability. */
export const productSchema = (product, { name, description, path, category }) => {
  const rows = product.specs ?? []
  const find = (label) => rows.find(([key]) => key.toLowerCase() === label)?.[1]
  const material = find('material of construction') ?? find('alloy')
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': absoluteUrl(path) + '#product',
    name,
    description,
    url: absoluteUrl(path),
    category,
    ...(product.image ? { image: absoluteUrl(product.image.src) } : {}),
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    // only where the site states the product is made in-house (aluminium piping and extrusions)
    ...(product.seo?.madeInHouse ? { manufacturer: { '@id': ORG_ID } } : {}),
    ...(material ? { material } : {}),
    ...(rows.length
      ? { additionalProperty: rows.map(([key, value]) => ({ '@type': 'PropertyValue', name: key, value })) }
      : { additionalProperty: (product.features ?? []).map((value) => ({ '@type': 'PropertyValue', name: 'Feature', value })) }),
  }
}

/** Guides and case studies. dateModified is the date the original page was last updated; no publish date or personal author is known. */
export const articleSchema = (article, { path, title, description }) => ({
  '@context': 'https://schema.org',
  '@type': article.kind === 'case-study' ? 'Article' : 'BlogPosting',
  '@id': absoluteUrl(path) + '#article',
  headline: title.slice(0, 110),
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  ...(article.image ? { image: absoluteUrl(article.image) } : {}),
  ...(article.modified ? { dateModified: article.modified } : {}),
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
})

/** Question-and-answer pairs that already exist in an article's FAQ section. */
export const faqSchema = (pairs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pairs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
})

export const calculatorSchema = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  description,
  url: absoluteUrl(path),
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  provider: { '@id': ORG_ID },
})
