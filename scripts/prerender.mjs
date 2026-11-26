/**
 * Build step 3 of `npm run build` (after the browser build and the Node build
 * of src/entry-server.jsx). For every page in siteRoutes() it writes a static
 * HTML file with that page's own <head> and full content, so search engines
 * and visitors without JavaScript get real pages. It also writes 404.html,
 * sitemap.xml, the list of valid routes in .htaccess (Apache / LiteSpeed hosts)
 * and keeps vercel.json (Vercel) in step with it.
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
// Plain alternations only, and several short rules instead of one long one, so the
// patterns stay well inside every server's line and regex limits as pages are added.
const chunks = (items, room = 900) => {
  const out = [[]]
  let used = 0
  for (const item of items) {
    if (used + item.length > room && out.at(-1).length) {
      out.push([])
      used = 0
    }
    out.at(-1).push(item)
    used += item.length + 1
  }
  return out.filter((chunk) => chunk.length)
}
const sections = new Map()
for (const route of routeList) {
  const [section, ...rest] = route.split('/')
  if (!sections.has(section)) sections.set(section, { own: false, children: [] })
  if (rest.length) sections.get(section).children.push(rest.join('/'))
  else sections.get(section).own = true
}
const rules = [...sections].flatMap(([section, { own, children }]) => [
  ...(own ? [`  RewriteRule ^(${section})$ _pages/$1.html [L]`] : []),
  ...chunks(children).map((chunk) => `  RewriteRule ^(${section}/(${chunk.join('|')}))$ _pages/$1.html [L]`),
])
// old WordPress addresses, grouped by the page they now lead to
const legacy = new Map()
for (const [from, to] of legacyRedirects()) {
  if (routes.some(({ path }) => path === '/' + from)) throw new Error(`Legacy address /${from} is a current route`)
  // "/blog/<slug>" style targets share one rule per section; fixed targets get their own
  const prefix = to.endsWith('/' + from) ? to.slice(0, -from.length - 1) : null
  const key = prefix === null ? `page ${to}` : `section ${prefix}`
  if (!legacy.has(key)) legacy.set(key, { target: prefix ?? to, keepSlug: prefix !== null, from: [] })
  legacy.get(key).from.push(escapeRegex(from))
}
const redirects = [...legacy.values()].flatMap(({ target, keepSlug, from }) => chunks(from).map((chunk) => `  RewriteRule ^(${chunk.join('|')})/?$ ${target}${keepSlug ? '/$1' : ''} [R=301,L]`))
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

// vercel.json: the same routing for Vercel, which ignores .htaccess. Vercel reads the
// file from the repository before it builds, so it is kept in git; this step only
// makes sure the committed copy matches the site's pages.
const vercelFile = join(root, 'vercel.json')
const vercel = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  cleanUrls: false,
  trailingSlash: false,
  redirects: [
    { source: '/:path*', has: [{ type: 'host', value: SITE_URL.replace('https://www.', '') }], destination: `${SITE_URL}/:path*`, permanent: true },
    ...[...legacy.values()].flatMap(({ target, keepSlug, from }) =>
      chunks(from, 3000).map((chunk) => ({ source: `/(${chunk.join('|')})`, destination: keepSlug ? `${target}/$1` : target, permanent: true })),
    ),
  ],
  // every address without a file extension is looked up among the prerendered pages;
  // if there is no such page Vercel answers 404 with /404.html
  rewrites: [{ source: '/((?!_pages/|assets/|qa/|api/)[^.]+)', destination: '/_pages/$1.html' }],
  headers: [
    { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }] },
    { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
  ],
}
const vercelJson = JSON.stringify(vercel, null, 2) + '\n'
const committed = await readFile(vercelFile, 'utf8').catch(() => '')
if (committed !== vercelJson) {
  if (process.env.CI || process.env.VERCEL) {
    problems.push('vercel.json does not match the site\'s pages: run `npm run build` locally and commit the updated vercel.json')
  } else {
    await writeFile(vercelFile, vercelJson)
    console.log('vercel.json updated to match the site\'s pages: commit it.')
  }
}

await rm(ssrDir, { recursive: true, force: true })

if (problems.length) {
  console.error('Prerender checks failed:\n  ' + problems.join('\n  '))
  process.exit(1)
}
console.log(`Prerendered ${routes.length} pages + 404.html, sitemap.xml (${routes.length} URLs) ${rules.length} route rules and ${redirects.length} redirect rules.`)
