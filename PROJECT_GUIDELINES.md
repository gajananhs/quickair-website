# Quick Air Website — Project Guidelines

Premium industrial-technology website for **Quick Air (Quickair)**, the modular piping brand of Canares Automation Pvt. Ltd. Standalone React + Vite application: static, multi-page, no backend, no WordPress, no PHP. Source of all content: https://quickair.in/

Read this file before adding a page or component. Companion documents: CONTENT_INVENTORY.md, WEBSITE_SITEMAP.md, MISSING_CONTENT_REPORT.md, FINAL_AUDIT.md.

The original Canares project (including its WordPress theme) is preserved untouched in `backups/canares-original-2026-11-18/`.

---

## 1. Ground rules

- The code lives in the `quickair-website` GitHub repository. Deployment to Hostinger is the manual workflow `.github/workflows/deploy.yml`; nothing deploys on push.
- Static site, with one exception: the "Talk to Quickair Assistant" button (`src/components/assistant/`) talks to a small PHP endpoint, `public/api/assistant.php`, which calls the Claude API and mails the lead to the sales team (see `docs/voice-assistant/`). No database, authentication or WordPress. The enquiry form opens WhatsApp with a pre-filled message.
- **Content is original Quick Air content.** Take wording from the data files listed in CONTENT_INVENTORY.md. Do not invent company facts. If something is missing on quickair.in, leave it out and record it in MISSING_CONTENT_REPORT.md.
- The legal entity (Canares Automation Pvt. Ltd.), its address and its @canares.com e-mail addresses stay, because quickair.in publishes them.
- JavaScript (no TypeScript). React function components only.
- No new dependency without a clear need.
- Every page must work at 360 px wide, with keyboard only, and with motion turned off.

## 2. Tech stack

| Concern | Tool | Notes |
| --- | --- | --- |
| Build | Vite 8 + `@vitejs/plugin-react` | `npm run dev`, `npm run build`, `npm run preview` |
| UI | React 19 | |
| Routing | `react-router-dom` 7 | Client-side routes; every page except Home is a lazy chunk |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) | Tokens live in CSS `@theme`; there is no `tailwind.config.js` |
| Animation | GSAP 3 + ScrollTrigger | Import only from `@/lib/motion` |
| Smooth scroll | Lenis | One instance, owned by `SmoothScrollProvider` |
| 3D | Three.js (plain) | Always lazy-loaded. React Three Fiber and Drei are not used: the scene is one imperative timeline |
| Icons | `lucide-react` | Named imports only |
| Fonts | `@fontsource-variable/sora`, `@fontsource-variable/inter` | Self-hosted, no font CDN |

Import alias: `@/` → `src/`.

## 3. Folder structure

```
public/qa/                 Quick Air images and PDF catalogues (brand, home, about, products, gallery, clients, media, catalogues)
src/
  main.jsx                 entry: fonts, global CSS, router, motion-ok class
  App.jsx                  maps the route table into <Routes>
  routes.jsx               route table (one line per page, all lazy except Home)
  styles/index.css         DESIGN TOKENS + base styles + custom utilities + section themes
  lib/
    motion.js              GSAP registration, motion tokens, reveal variants, motion preference, allow3DMotion()
    calculators.js         pipe size, pressure drop and electricity formulas (ported from quickair.in)
    cn.js                  class-name joiner
  providers/
    SmoothScrollProvider   Lenis + GSAP ticker sync, scroll reset, #hash scrolling, useLenis()
  hooks/
    useGsap.js             scoped GSAP with cleanup and reduced-motion guard
    useMediaQuery.js       useMediaQuery(), useReducedMotion()
  components/
    ui/                    Accordion, Button, Card, Container, Eyebrow, Logo, Section, SectionHeading, Seo, Stat
    layout/                Layout, Navbar (dropdowns + mobile menu), Footer
    motion/                Reveal, SplitText, ImageReveal, CountUp, Tilt (pointer-tilt card)
    sections/              PageHero, PipingShowcase (scroll-driven 3D), SystemExplorer (interactive 3D),
                           JointDiagram (hoverable cut-away), SteelVsAluminium, ProcessTimeline, Testimonials,
                           ClientMarquee, SpecTable, ArticleBody, EnquiryForm, ContactCta
    three/                 AssemblyCanvas (React mount point for the 3D scene)
  three/
    createAssemblyScene.js framework-free Three.js piping assembly (idle, scroll and explore modes)
  data/
    company.js             company facts, contacts, stats, hero slides, comparison, process, clients, testimonials, contact page
    products.js            product groups, 12 products, product ranges, joint diagram parts
    about.js               timeline, CEO, certifications, competitive edge, case-study order
    services.js            services page and gallery intro
    navigation.js          ROUTES, navbar menus, footer links
    generated/             articles.json (32 articles), blog-index.json, gallery.json — built from the crawl, do not hand-edit
  pages/                   Home, About, Products, ProductDetail, Services, Calculators (hub + 3 calculators),
                           Gallery, Blog (BlogIndex, CaseStudies, Article), Contact, NotFound
```

### Architecture rules

1. **Pages compose, components render.** A page file is a stack of `<Section>`s. A section used on two or more pages lives in `components/sections/`.
2. **Content lives in `src/data/`.** No company facts, product names or links inside components. Internal links use `ROUTES` from `data/navigation.js`.
3. **Primitives come from `@/components/ui`.** Do not rebuild a button or heading inline. Extend the primitive with a variant.
4. **No hex colours, font names or easing curves in components.** Use tokens (sections 4 and 6). The only exceptions are the rust tones of the steel comparison and the WhatsApp green.
5. **One component per file**, default export, PascalCase filename. Files that hold several small related pages (`Blog.jsx`, `LandingIndex.jsx`) use named exports.
6. Components accept `className` and merge it with `cn()`.
7. **Every page starts with a dark hero** (`PageHero` or a custom dark section) because the fixed navbar is transparent with light text until the page scrolls.

### Adding a page

1. Create `src/pages/Name.jsx` (default export). Put its text in `src/data/`.
2. Add one line to `src/routes.jsx` using the `page()` helper.
3. Start with `<Seo title description />` and `<PageHero crumbs title lead image />`.
4. Build the body from `<Section theme="…">` blocks. End with `<ContactCta />` where an enquiry makes sense.
5. Exactly one `<h1>` per page (PageHero renders it).

## 4. Design system

Direction: Apple-style product storytelling for an international engineering brand. Dark, calm, precise. Large type, generous space, metal and light as the only decoration. Avoid pages that are a grid of identical cards: vary structure (split layouts, numbered lists, sticky side columns, full-bleed panels, timelines, spec tables).

### Colour

Defined in `src/styles/index.css` under `@theme`. Tailwind generates utilities automatically (`bg-navy-900`, `text-cyan-400`, `border-alu-300`).

| Token | Hex | Use |
| --- | --- | --- |
| `navy-950` | `#031219` | Deepest surface: hero, 3D stage, footer |
| `navy-900` | `#051b26` | Default page background, dark sections |
| `navy-800` | `#07283a` | Alternate dark section, raised surface |
| `navy-700 / 600` | `#0b3a52 / #125673` | Cards on dark, borders, subtle fills |
| `electric-600` | `#007098` | **Quick Air logo blue** (sampled from the official logo). Accent on light surfaces |
| `electric-500` | `#0b8fc2` | Primary action, focus, glow |
| `electric-300 / 400 / 700` | `#8fd6ee / #35b2de / #00566f` | Tints and shade of the logo blue |
| `cyan-400` | `#2ccbf2` | Accent on dark surfaces: icons, labels, active states |
| `cyan-300 / 500` | `#9be7fb / #10a6cf` | Tint and shade of cyan |
| `pipe-500` | RAL 5012 blue | Product depictions only |
| `alu-50` | `#f3f7f9` | Soft light sections, image wells |
| `alu-600` | `#5d7280` | Muted text on light surfaces |
| white | `#FFFFFF` | Light sections, text on accent |

The palette is derived from the Quick Air logo (`public/qa/brand/quick-air-logo.png`): its teal-blue is the anchor, the dark surfaces are the same hue taken almost to black, and cyan is its lighter neighbour.

Rules:

- Electric blue is for interaction and emphasis only. One primary button per view.
- Cyan is the accent on dark surfaces; electric-600 is the accent on light surfaces.
- `pipe-500` is not a UI colour; it represents the physical product.
- Text contrast must meet WCAG AA. On dark use `alu-50` (body) and `alu-300/400` (muted). On light use `navy-900` and `alu-600`.

### Section themes

`<Section theme>` sets semantic CSS variables that all primitives read, so components work on any background:

| Theme | Surface | Use |
| --- | --- | --- |
| `dark` (default) | `navy-900` | Heroes and cinematic sections (add `bg-navy-950!` for the deepest stage) |
| `navy` | `navy-800` | Alternating dark section |
| `light` | white | Specs, long reading, product grids |
| `alu` | `alu-50` | Soft light break between sections |

Semantic variables: `--surface`, `--surface-raised`, `--fg`, `--fg-muted`, `--line`, `--accent`. Inside components prefer these (`text-(--fg-muted)`, `border-(--line)`, `text-(--accent)`) over fixed palette colours.

Alternate light and dark down the page; avoid three dark sections in a row without a visual change.

### Utilities

| Class | Effect |
| --- | --- |
| `text-metal` | Aluminium gradient text for hero words (dark sections only) |
| `text-electric-gradient` | Cyan-to-electric gradient for one emphasis phrase |
| `bg-brushed` | Brushed aluminium surface |
| `glass` | Frosted navy panel with hairline border |
| `bg-grid` | Blueprint grid backdrop; pair with a `mask-*` fade |
| `bg-glow` | Radial electric glow behind 3D or product imagery |
| `rule-glow` | Thin luminous divider |
| `shadow-glow`, `shadow-card`, `shadow-card-light` | Elevation |
| `animate-marquee`, `animate-flow` | Logo marquee, air-flow dashes |
| `prose-canares` | Long-form article typography |
| `motion-off:` variant | Styles that apply when animations are disabled |

Use at most one atmosphere effect (grid or glow) per section. `text-metal` and `text-electric-gradient` on a `<SplitText>` are moved onto the words automatically.

### Typography

| Role | Font | Class |
| --- | --- | --- |
| Display, headings, buttons, eyebrows | **Sora Variable** (600) | `font-display` |
| Body, UI text | **Inter Variable** (400/500) | `font-sans` (default) |
| Step numbers, technical values | System mono | `font-mono` |

Fluid scale (clamps between 360 px and 1440 px; line-height and tracking are built in):

| Class | Size range | Use |
| --- | --- | --- |
| `text-display` | 44 → 96 px | Home hero only |
| `text-h1` | 36 → 68 px | Page titles, statement headings |
| `text-h2` | 30 → 50 px | Section titles |
| `text-h3` | 22 → 30 px | Item titles, pull statements |
| `text-lead` | 17 → 21 px | Intro paragraphs |
| base | 16 px | Body |
| `text-eyebrow` | 12 px, uppercase, 0.18em | Labels above headings |

Rules: keep original capitalisation of original headings; body line length ≤ 70 characters (`max-w-2xl`/`max-w-3xl`); `h1–h4` get `font-display` and balanced wrapping from base styles.

### Layout and spacing

- `<Container>`: max width `82rem` (`max-w-site`), fluid gutter `--gutter` (20 → 48 px).
- `<Section>`: vertical padding `--section-y` (72 → 144 px). `flush` removes it, `bleed` gives full-width content.
- Fixed header height: `--spacing-header` (72 px) → `h-header`, `pt-header`.
- Radius: `rounded-card` (20 px), `rounded-panel` (32 px) for large media, `rounded-full` for buttons and chips.
- Mobile first. Tailwind default breakpoints. The navbar switches to the mobile menu below `lg` (1024 px).
- Touch targets at least 44 px high for buttons; text links in grids get `min-h-11`.

### Components

| Component | Purpose | Key props |
| --- | --- | --- |
| `Button` | Actions and links styled as actions | `variant` primary / secondary / metal / ghost, `size`, `to`, `href`, `icon` |
| `Section`, `Container` | Themed page block, width + gutter | `theme`, `bleed`, `flush`, `id` |
| `SectionHeading`, `Eyebrow` | Section intro, small label | |
| `Seo` | Per-page title, description, Open Graph | `title`, `description`, `image`, `type` |
| `Accordion` | FAQ on native `<details>` | `items: [[q, a]]` |
| `Logo` | Official Quickair logo (PNG, brightened for dark) | |
| `PageHero` | Dark page opening with breadcrumb | `crumbs`, `title`, `lead`, `image`, `size` |
| `ContactCta`, `EnquiryForm` | Closing enquiry block, form | `defaultType`, `defaultDetails` |
| `SpecTable` | Two-column specification list | `rows: [[label, value]]` |
| `SteelVsAluminium` | Interactive steel/aluminium comparison | |
| `PipingShowcase` | Pinned 3D scroll story | |
| `ProcessTimeline`, `Testimonials`, `ClientMarquee` | Home sections | |
| `Reveal`, `SplitText`, `ImageReveal`, `CountUp` | Motion wrappers (section 6) | |
| `AssemblyCanvas` | 3D scene mount | `idle`, `shift`, `ref.setProgress()` |

### Imagery

- Use original Quick Air assets from `public/qa/` (CONTENT_INVENTORY.md section 5). Do not add stock imagery without recording it in FINAL_AUDIT.md as a placeholder.
- Product thumbnails are small (100 to 300 px): show them in white or `alu-50` wells with `object-contain`, never stretched full-width.
- Photos use `<ImageReveal>` with an `aspect-*` class so the box is reserved before load. Add `loading="lazy"` (default) and meaningful `alt`; decorative backgrounds use `alt=""`.
- Images behind text get a navy gradient overlay.

### Icons

Lucide only. Size with Tailwind (`size-5`). Decorative icons get `aria-hidden="true"`; icon-only buttons need `aria-label`.

## 5. 3D conventions (Three.js)

- Scenes are plain factory functions in `src/three/`: `createXScene(container, options) → { setProgress(0..1), dispose() }`. No Three.js code in React components.
- The React wrapper in `components/three/` is **always** imported with `React.lazy` so Three.js (142 kB gzip) stays out of the main bundle.
- **The scene is a pure function of progress.** `apply(progress)` positions every part, light and the camera. That makes scroll scrubbing reversible and frame-rate independent. Timing that is not scroll-driven (the entrance) uses wall-clock time, never frame counts.
- Timeline of `createAssemblyScene` (keep `PipingShowcase` stage boundaries in sync):

  | Progress | Stage |
  | --- | --- |
  | 0.00–0.14 | Complete assembly, slow rotation |
  | 0.14–0.34 | Camera orbits in, fittings light up one by one |
  | 0.34–0.50 | Selected connectors slide off their pipes |
  | 0.50–0.74 | Exploded view |
  | 0.74–0.92 | Parts return |
  | 0.92–1.00 | Complete system, camera pulls back |

- Material language: pipe = blue powder coat (physical material with clearcoat); fittings = grey aluminium with black collar nuts; bores and rims = bright aluminium. Reflections come from `RoomEnvironment` (no HDR download). One shadow-casting key light, a cyan rim light, a blue fill, and a ground `ShadowMaterial`.
- Low-power mode (viewport under 768 px or 4 CPU cores or fewer): no shadows, no antialiasing, pixel ratio capped at 1.5, fewer segments. Otherwise pixel ratio is capped at 2.
- The render loop pauses when the canvas is off screen (IntersectionObserver). Geometries are shared; everything is disposed on unmount.
- The canvas is decorative (`aria-hidden`). If WebGL fails the container stays empty and the page still reads correctly.
- With motion off: one static frame, no pointer tracking, and `PipingShowcase` lists its captions instead of pinning.

## 6. Animation conventions

All motion values come from `src/lib/motion.js`. Import `gsap` and `ScrollTrigger` from there, never from `gsap` directly, so plugins register once.

| Token | Value | Use |
| --- | --- | --- |
| `EASE.out` | `expo.out` | Entrances and reveals (default) |
| `EASE.inOut` | `power3.inOut` | State changes, image wipes |
| `EASE.soft` | `power2.out` | Small UI movement |
| `EASE.linear` | `none` | Scrubbed scroll animation |
| `DURATION.fast / base / slow / cinematic` | 0.35 / 0.9 / 1.4 / 2.2 s | |
| `STAGGER.tight / base / loose` | 0.06 / 0.1 / 0.18 s | |
| `REVEAL_START` | `top 85%` | Default trigger point |

CSS equivalents for hover and focus: `ease-out-expo`, `ease-in-out-smooth`, `duration-300` (UI) or `duration-500` (cards).

Rules:

1. **Content entering on scroll uses `<Reveal>`.** Variants: `fade-up` (default), `fade-down`, `fade-left`, `fade-right`, `fade`, `scale`, `blur`. Use `stagger` on lists and grids.
2. **Headings use `<SplitText>`** (`immediate` in heroes). **Photos use `<ImageReveal>`** (`parallax` for feature images). **Numbers use `<CountUp>`.**
3. **Custom timelines use `useGsap(ref, fn, deps)`.** It scopes selectors, reverts on unmount (which also kills its ScrollTriggers) and skips the callback when motion is off. Never call GSAP in a bare `useEffect`.
4. **Animate only `transform`, `opacity`, `clip-path` and `filter`.** Never animate layout properties.
5. **Reveals play once.** At most one pinned sequence per page.
6. **Content is visible without animation.** The un-animated state is the final state. `[data-reveal]` elements are pre-hidden by CSS only when `<html>` has the `motion-ok` class.
7. **Never put a transform on an ancestor of a pinned section** (it breaks fixed positioning). The page transition is opacity-only for this reason.
8. **Smooth scroll:** one Lenis instance. Use `useLenis()` → `lenis.scrollTo(target)`; call `lenis.stop()` / `start()` around overlays. Scrollable overlays need `data-lenis-prevent`.
9. **Feel:** slow and confident. Entrances travel 24–56 px. No bounce, no elastic, no spin.
10. Hover states are CSS transitions, not GSAP.

### Motion preference

Decorative animations follow the operating system's "reduce motion" setting. `main.jsx` adds `motion-ok` to `<html>` when animations are allowed; CSS and JS motion key off that switch.

The 3D diagrams (hero model, scroll-driven showcase, system explorer) are product content, not decoration, so they always animate: they check `allow3DMotion()` instead. Only `?motion=reduce` stills them.

Override for testing or demos (lasts for the browser tab, stored as `quickair-motion`):

- `?motion=full` forces animations on.
- `?motion=reduce` forces the static version, including 3D.
- `?motion=auto` returns to the system setting.

`window.__lenis` exposes the scroll instance (used by the gallery lightbox and by scroll tests).

### Interactive pieces

- **SystemExplorer** (`/products`): drag to rotate, hover a part for its name, slider for the exploded view. On touch screens drag works and names are listed as chips.
- **JointDiagram** (`/products`, product pages): SVG cut-away; hover, focus or tap a numbered point. Data comes from `jointParts` in `products.js`.
- **Calculators**: results and the pipe drawing update as you type. Formulas live only in `lib/calculators.js`.
- **Tilt**: wrap a card to give it pointer tilt and a moving highlight. Off on touch and reduced motion.

## 7. Accessibility, SEO and quality

- Landmarks: `header`, `nav`, `main#main`, `footer`; skip link in `Layout`.
- All interactive elements are keyboard reachable with the global `:focus-visible` ring. Dropdowns open on hover and on focus.
- One `<h1>` per page; headings descend in order.
- `<Seo>` on every page: unique title, meta description, Open Graph tags.
- No horizontal page scroll at any width.
- Before calling a page done: `npm run build` passes, no console errors, checked at 375 px and 1440 px, and checked once with `?motion=reduce`.

## 8. Routes

| Route | Page file |
| --- | --- |
| `/` | `Home.jsx` |
| `/about` | `About.jsx` |
| `/products` | `Products.jsx` |
| `/products/:slug` | `ProductDetail.jsx` |
| `/services` | `Services.jsx` |
| `/calculators` | `Calculators.jsx` (CalculatorsHub) |
| `/calculators/pipe-size`, `/calculators/pressure-drop`, `/calculators/electricity-cost` | `Calculators.jsx` (PipeSizeCalculator, PressureDropCalculator, ElectricityCalculator) |
| `/gallery` | `Gallery.jsx` |
| `/case-studies`, `/case-studies/:slug` | `Blog.jsx` (CaseStudies, Article) |
| `/blog`, `/blog/:slug` | `Blog.jsx` (BlogIndex, Article) |
| `/contact` | `Contact.jsx` (`?product=` pre-fills the form, `?type=dealer` selects dealer enquiry) |
| `*` | `NotFound.jsx` |

How each route maps to quickair.in: WEBSITE_SITEMAP.md.

## 9. Running it

```
npm install
npm run dev      # local development, http://localhost:5173 (or the next free port)
npm run build    # production files in dist/
npm run preview  # serve dist/ locally
```
