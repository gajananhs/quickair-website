import { ROUTES } from '@/data/navigation'
import { products } from '@/data/products'
import { caseStudies, guides } from '@/data/about'

/**
 * Every public, indexable page of the site. The build prerenders one HTML file
 * per entry and writes sitemap.xml and the server's route list from the same
 * array, so the three can never drift apart. `lastmod` is set only where a real
 * date is known (the date an article was last updated).
 */
export const siteRoutes = () => [
  ...Object.values(ROUTES).map((path) => ({ path })),
  ...products.map((product) => ({ path: `${ROUTES.products}/${product.slug}` })),
  ...guides.map((article) => ({ path: `${ROUTES.blog}/${article.slug}`, lastmod: article.modified })),
  ...caseStudies.map((article) => ({ path: `${ROUTES.caseStudies}/${article.slug}`, lastmod: article.modified })),
]

/**
 * Addresses the earlier WordPress site used, with the page that replaced each one.
 * The server answers them with a 301 so old links and search results keep working.
 * Article addresses come from `originalUrl` in articles.json; the rest are listed
 * in WEBSITE_SITEMAP.md.
 */
const wasOnWordPress = (article) => article.originalUrl === `https://www.quickair.in/${article.slug}/`

export const legacyRedirects = () => [
  ['home', ROUTES.home],
  ['home-v3-preview', ROUTES.services],
  ['case-study', ROUTES.caseStudies],
  ['quickair-pipe-size-pressure-drop-calculator', ROUTES.pipeSize],
  ['pressure-drop-calculator', ROUTES.pressureDrop],
  ['electricity-power-calculator', ROUTES.electricityCost],
  // only articles that existed on the WordPress site (they carry its address); later articles never had an old address
  ...guides.filter(wasOnWordPress).map((article) => [article.slug, `${ROUTES.blog}/${article.slug}`]),
  ...caseStudies.filter(wasOnWordPress).map((article) => [article.slug, `${ROUTES.caseStudies}/${article.slug}`]),
]
