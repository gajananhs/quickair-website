# SEO setup

How search engines get real pages from this React + Vite site, and what to touch when content changes.

## Build

`npm run build` runs three steps:

1. `vite build`: the browser bundle in `dist/`.
2. `vite build --ssr src/entry-server.jsx`: the same app bundled for Node (temporary `dist-ssr/`).
3. `node scripts/prerender.mjs`: renders every page to static HTML and writes:
   - `dist/index.html` (home) and `dist/_pages/<route>.html` (every other page), each with its own
     `<title>`, description, canonical URL, Open Graph / Twitter tags, JSON-LD and full content;
   - `dist/404.html`, sent with HTTP 404 for unknown addresses;
   - `dist/sitemap.xml`;
   - the route and redirect rules inside `dist/.htaccess`.

The build fails if two pages share a title or description, if a page has no single `<h1>`, if a
canonical URL is wrong, or if a page throws while rendering.

In the browser the app hydrates this HTML, so animations, routing and the 3D models work as before.
`npm run dev` is unchanged (no prerendering).

## Where things live

| What | File |
| --- | --- |
| List of pages (prerender, sitemap, server routes) and old WordPress addresses | `src/lib/siteRoutes.js` |
| Canonical domain, title rules, JSON-LD builders | `src/lib/seo.js` |
| Per-page head tags (`<Seo>` component) | `src/components/ui/Seo.jsx` |
| Product search titles, descriptions, brands | `PRODUCT_SEO` in `src/data/products.js` |
| Article search titles, topic clusters, link repairs, related links | `src/data/articleSeo.js` |
| Article structure repairs (heading levels, FAQ) | `prepareArticle` in `src/data/about.js` |
| Server rules (redirects, 404, caching) | `public/.htaccess` |

## Adding a page

1. Create `src/pages/<Name>.jsx` and render `<Seo title="…" description="…" crumbs={[['Name']]} />` at the top.
2. Add its path to `ROUTES` in `src/data/navigation.js` and one line to `src/routes.jsx`.

It is then prerendered, added to the sitemap and routed by the server automatically. New products and
articles need no route work: they are picked up from `products.js` and `articles.json`.

## Rules followed

- One canonical address per page: `https://www.quickair.in/<path>`, no trailing slash.
- Structured data only states what the site's own data states: no prices, offers, ratings, reviews,
  opening hours or publish dates. Article `dateModified` is the date the original page was last updated.
- Article text is not rewritten. Structure repairs are listed in `articleSeo.js` and `about.js`.
