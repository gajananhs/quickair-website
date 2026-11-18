# Missing content report

What on https://quickair.in could not be carried into the new site, and why. Crawled 18 November 2026. Nothing was invented to fill these gaps.

## 1. Pages left out on purpose

| Page | Reason |
| --- | --- |
| `/projects/` | Not Quick Air content. It is the WordPress theme's demo page ("Electricians", lorem ipsum text, stock photos). |
| `/terms-and-conditions/` | Published but empty. |
| `/aluminium-air-line-piping/` | Published but empty. |
| `/privacy-policy/` | Linked from the footer, returns 404. The new footer does not link to it. |
| `/company-brief/` | Linked from the homepage ("Read our company brief"), returns 404. The link now goes to `/about#brief`, which holds the company brief. |
| Employee, Elgi portal and login pages | Private portals behind a login. Not public website content, and they need a backend. |
| Dealer registration form | Runs on a separate application (app.quickair.in). The new site links to it; it is not rebuilt. |

## 2. Broken links inside articles

These links in the original articles point to pages that do not exist. They now go to `/blog` instead of a dead page:

- `/aluminium-vs-steel-piping/`
- `/air-system-maintenance/`
- `/compressed-air-pipe-sizing-guide/`
- `/aluminium-compressed-air-piping-system-guide/`

## 3. Content that needs your input

| Item | Detail |
| --- | --- |
| Privacy policy and terms | No text exists on quickair.in. Supply the text and a page can be added. |
| Catalogue PDFs | All 7 catalogues are offered as downloads. Several are scanned images, so their text was not extracted into product pages. Valve and extrusion products therefore show the feature lists from the products page only. |
| Valve and extrusion product photos | quickair.in has no individual photos for the six valve products or the two extrusion products. Their pages use an installation photo from the gallery instead. |
| Articles without a cover image | Seven guides (`industrial-compressed-air-piping`, `air-pipe-fittings`, `compressed-air-fittings`, `compressed-air-piping`, `pex-compressed-air-piping…`, `stainless-steel-compressed-air-piping…`, `corrosion-resistant-piping`) and one case study have no featured image on the original. A gallery photo is used as the hero background. |
| "Office pods and acoustic booths", "Conveyors and ESD workstations" | Named on the homepage with one line each. There are no dedicated pages or details on quickair.in, so they link to Contact and Products. |
| Testimonials | Three short quotes (first names and company only), as published. |
| Enquiry form | quickair.in sends form data to its WordPress backend. This site has no backend, so the form opens WhatsApp with the details filled in. To receive e-mails instead, a form service or server endpoint is needed. |

## 4. Things kept exactly as published

- Spellings such as "Vaccum", "Co2" and "ACM" in the pressure-drop calculator options.
- The pipe size calculator's recommended size can show an actual drop above the allowed drop for the line. That is how the original formula behaves; it was ported unchanged.
- The legal entity name, address and @canares.com e-mail addresses, because Quick Air publishes them as its contact details.
- Dates on articles are the "last modified" dates from quickair.in.

## 5. 3D models

quickair.in has no 3D model files. The 3D piping assembly is built in code (Three.js) from the fittings the site lists: pipes, elbows, tees, connectors, valves, end caps, droplets, clamps. It is a representative illustration, not a CAD-accurate model.
