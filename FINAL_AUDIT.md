# Quick Air website — final audit

18 November 2026. Standalone React + Vite application. No WordPress, no PHP, no backend.

## What was done

1. **Backup.** The whole Canares project (source, assets, documents, WordPress theme and ZIPs) was copied to `backups/canares-original-2026-11-18/` before any change (315 files, 154 MB).
2. **Content.** quickair.in was crawled through its public pages and WordPress REST API: 57 pages and 253 media items inspected. Usable content was extracted into data files; see CONTENT_INVENTORY.md. What could not be used is in MISSING_CONTENT_REPORT.md.
3. **Brand.** Quick Air logo and favicon; palette re-anchored on the logo blue (#007098). Canares name, logo, products, pages, images, SEO text and colours removed from the site. The legal entity, address and e-mail addresses remain because quickair.in publishes them.
4. **Pages.** 16 route patterns, 59 pages: Home, About, Products, 12 product pages, Services, calculator hub and 3 calculators, Gallery, Case Study index and 4 case studies, Blog index and 28 articles, Contact, Not found.
5. **Removed.** Old Canares pages and data, `public/assets/`, the `wordpress/` folder, both theme ZIPs, the WordPress preview launcher and the Canares/WordPress documents. All remain in the backup.

## Animation and interaction

| Feature | Where | Status |
| --- | --- | --- |
| 3D piping model, idle rotation and pointer tilt | Home hero | Kept, recoloured |
| Scroll-controlled 3D (rotate, explode, reassemble, pinned captions) | Home | Kept, captions rewritten with Quick Air wording |
| Interactive 3D explorer (drag to rotate, hover names a part, exploded-view slider) | Products | New |
| Hoverable technical cut-away diagram (push-fit and crimping joints) | Products, piping product pages | New |
| Live calculator drawing (pipe to scale, stream speed, pressure-drop meter) | 3 calculators | New |
| Pointer-tilt cards with moving highlight | Most card grids | New |
| Scroll-filled timelines | About (company brief), Services (steps), Home (process) | New and kept |
| Text reveals, image wipes and parallax, count-up figures, marquee, animated buttons and navigation, page transition, smooth scroll | Every page | Kept |
| Gallery filter animation and lightbox (keyboard: arrows, Esc) | Gallery | New |
| Reading progress bar | Articles and case studies | New |

## Tests run

| Check | Result |
| --- | --- |
| `npm run build` | Passes, no errors |
| All 59 pages opened in the dev server | Every page renders with an `<h1>`; no console errors |
| Images | 0 broken on any page; static audit found every referenced file in `public/qa/` |
| Internal links | Static audit of all links in source and article data: 0 unresolved |
| Pipe size calculator | 500 CFM, 7 bar, 100 m, header, open loop → 63 mm, 0.2058 bar. Matches the original formula by hand calculation |
| Pressure drop calculator | Aluminium, air, 7 bar, 500 CFM, 100 m, 63 mm → 0.1435 bar, 2.081 psi, 10.83 m/s. Matches |
| Electricity calculator | 500 CFM, 0.5 bar, 8000 h, 8 INR/kWh → 11,798.69 W, 888,371.66 INR. Matches |
| 3D explorer | Renders; hover shows the part name ("Equal and reduced tees"); slider explodes the assembly |
| Joint diagram | Renders with 6 labelled points and highlights on hover |
| Gallery lightbox | Opens above the header, shows caption and counter |
| Mobile, 375 px | 15 representative pages: no horizontal overflow; menu, forms and 3D hero fit |

## Not verified or known limits

- Tested in the built-in Chromium browser only. Safari and Firefox were not tested.
- Tablet width (768 px) was not checked separately; layouts use the same breakpoints as mobile and desktop.
- The enquiry form opens WhatsApp; the WhatsApp hand-off itself was not sent.
- The Google Maps embed and the external dealer-registration link need an internet connection.
- The two largest script files are about 570 kB each (Three.js for 3D, and the main bundle, which includes the article text). Both are compressed to about 150 kB in transit. Article text could be split per article later if load time matters.
- `public/qa/` is 67 MB, mostly the seven PDF catalogues.
- On this PC, Windows "Animation effects" is off, so decorative animations are stilled unless the page is opened with `?motion=full`. The 3D diagrams animate regardless.

## Run it

```
npm run dev
```

Then open the address it prints (http://localhost:5173, or 5174 if 5173 is in use).
