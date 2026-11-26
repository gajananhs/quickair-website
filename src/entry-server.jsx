/**
 * Build-time renderer (not shipped to browsers). `npm run build` bundles this
 * file for Node and scripts/prerender.mjs calls render() once per page to
 * write static HTML that the browser bundle then hydrates.
 */
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from '@/App'
import { SeoContext } from '@/components/ui/Seo'

export { legacyRedirects, siteRoutes } from '@/lib/siteRoutes'
export { SITE_URL } from '@/lib/seo'

/**
 * prerender waits for every lazy-loaded chunk (pages, 3D canvases) before it
 * resolves. `progressiveChunkSize` is raised so React prints even large sections
 * in place: by default it parks them in a hidden holder that a script moves into
 * position, which leaves the page empty for anything that does not run scripts.
 */
export async function render(path) {
  const collector = {}
  const errors = []
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <SeoContext value={collector}>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </SeoContext>
    </StrictMode>,
    {
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      // a page that fails to render must fail the build, not ship half-empty
      onError(error) {
        errors.push(error)
      },
    },
  )
  if (errors.length) throw errors[0]
  let html = ''
  for await (const chunk of prelude) html += chunk
  if (/<template id="B:|<div hidden id="S:/.test(html)) throw new Error(`${path}: part of the page was printed out of place`)
  return { html, head: collector.head }
}
