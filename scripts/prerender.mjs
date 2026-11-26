/**
 * Build step 3 of `npm run build` (after the browser build and the Node build
 * of src/entry-server.jsx). For every page in siteRoutes() it writes a static
 * HTML file with that page's own <head> and full content, so search engines
 * and visitors without JavaScript get real pages. It also writes 404.html,
 * sitemap.xml and the list of valid routes in .htaccess.
 *
 *   dist/index.html              home page
 *   dist/_pages/<route>.html     every other page (served at /<route> by .htaccess)
 *   dist/404.html                sent with HTTP 404 for unknown addresses
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const { legacyRedirects, render, siteRoutes, SITE_URL } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const headHtml = (head) =>
  [
    `<title>${escape(head.title)}</title>`,
    ...head.meta.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${escape(content)}" />`),
    head.canonical ? `<link rel="canonical" href="${escape(head.canonical)}" />` : '',
    // "<" is escaped so page text can never close the script element
    ...head.jsonLd.map((data) => `<script type="application/ld+json" data-seo>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`),
  ]
    .filter(Boolean)
    .map((line) => '    ' + line)
    .join('\n')

const template = await readFile(join(dist, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty <div id="root"></div> to fill')
const shell = template.replace(/\s*<title>[\s\S]*?<\/title>/, '').replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')

async function page(path) {
  const { html, head } = await render(path)
  if (!head) throw new Error(`${path}: the page did not render <Seo>`)
  // React prints image preloads in front of the markup; they belong in <head>
  const preloads = html.match(/^(?:<link\b[^>]*>)+/)?.[0] ?? ''
  const body = html.slice(preloads.length)
  return {
    head,
    body,
    html: shell.replace('</head>', `${headHtml(head)}\n${preloads ? '    ' + preloads + '\n' : ''}  </head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`),
  }
}

const write = async (file, content) => {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, content)
}

const routes = siteRoutes()
const seen = { title: new Map(), description: new Map() }
const problems = []
await rm(join(dist, '_pages'), { recursive: true, force: true })

for (const { path } of routes) {
  const { html, head, body } = await page(path)
  await write(path === '/' ? join(dist, 'index.html') : join(dist, '_pages', path.slice(1) + '.html'), html)

  // every page must stand on its own in search results
  const description = head.meta.find(([, key]) => key === 'description')[2]
  for (const [kind, value] of [['title', head.title], ['description', description]]) {
    if (seen[kind].has(value)) problems.push(`${path}: same ${kind} as ${seen[kind].get(value)}`)
    seen[kind].set(value, path)
  }
  const h1 = body.match(/<h1[\s>]/g)?.length ?? 0
  if (h1 !== 1) problems.push(`${path}: ${h1} <h1> elements (expected 1)`)
  if (head.canonical !== SITE_URL + (path === '/' ? '/' : path)) problems.push(`${path}: canonical is ${head.canonical}`)
  if (/noindex/.test(head.meta.find(([, key]) => key === 'robots')[2])) problems.push(`${path}: rendered the not-found page`)
}

// 404 page: rendered from an address that matches no route
const notFound = await page('/404')
if (!/noindex/.test(notFound.head.meta.find(([, key]) => key === 'robots')[2])) throw new Error('The 404 page must be noindex')
await write(join(dist, '404.html'), notFound.html)

// sitemap.xml
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(({ path, lastmod }) => `  <url><loc>${SITE_URL}${path === '/' ? '/' : path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`),
  '</urlset>',
  '',
].join('\n')
await write(join(dist, 'sitemap.xml'), sitemap)

// .htaccess: the server answers only these routes with a page; anything else is a real 404
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const routeList = routes.filter(({ path }) => path !== '/').map(({ path }) => escapeRegex(path.slice(1)))
const htaccessFile = join(dist, '.htaccess')
const htaccess = await readFile(htaccessFile, 'utf8')
const marker = /# BEGIN prerendered routes[\s\S]*?# END prerendered routes/
if (!marker.test(htaccess)) throw new Error('public/.htaccess has no "# BEGIN prerendered routes … # END prerendered routes" block')
// one rule per section keeps every pattern short
const groups = new Map()
for (const route of routeList) {
  const [section, ...rest] = route.split('/')
  if (!groups.has(section)) groups.set(section, [])
  if (rest.length) groups.get(section).push(rest.join('/'))
  else groups.get(section).unshift('')
}
const rules = [...groups].map(([section, items]) => {
  const own = items.includes('')
  const children = items.filter(Boolean)
  const pattern = children.length ? `${section}${own ? '(?:' : ''}/(?:${children.join('|')})${own ? ')?' : ''}` : section
  return `  RewriteRule ^(${pattern})$ _pages/$1.html [L]`
})
// old WordPress addresses, grouped by the page they now lead to
const legacy = new Map()
for (const [from, to] of legacyRedirects()) {
  if (routes.some(({ path }) => path === '/' + from)) throw new Error(`Legacy address /${from} is a current route`)
  const prefix = to.endsWith('/' + from) ? to.slice(0, -from.length - 1) : null
  const key = prefix ?? to
  if (!legacy.has(key)) legacy.set(key, { keepSlug: prefix !== null, from: [] })
  legacy.get(key).from.push(escapeRegex(from))
}
const redirects = [...legacy].map(([target, { keepSlug, from }]) => `  RewriteRule ^(${from.join('|')})/?$ ${target}${keepSlug ? '/$1' : ''} [R=301,L]`)
const block = [
  '# BEGIN prerendered routes (written by scripts/prerender.mjs)',
  '  # 5. Old WordPress addresses -> current pages',
  ...redirects,
  '  #    One address per page: /about/ -> /about',
  '  RewriteCond %{REQUEST_FILENAME} !-d',
  '  RewriteRule ^(.+)/$ /$1 [R=301,L]',
  '  # 6. Current pages',
  ...rules,
  '  # END prerendered routes',
].join('\n')
await writeFile(htaccessFile, htaccess.replace(marker, () => block))

await rm(ssrDir, { recursive: true, force: true })

if (problems.length) {
  console.error('Prerender checks failed:\n  ' + problems.join('\n  '))
  process.exit(1)
}
console.log(`Prerendered ${routes.length} pages + 404.html, sitemap.xml (${routes.length} URLs) ${rules.length} route rules and ${redirects.length} redirect rules.`)
