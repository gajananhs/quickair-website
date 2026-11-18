# Quick Air website sitemap

Standalone React + Vite site. 16 route patterns, 59 pages in total.

## Navigation

- **Header:** About · Products (All products, Aluminium piping, PEX piping, Extrusions and ESD, Valves and actuators, Services) · Calculator (Pipe Size & Pressure Drop, Pressure Drop, Electricity Power) · Gallery · Resources (Blog, Case studies) · Contact · Get a quote
- **Footer:** Links, Calculator, Resources, contact details, Dealer registration (external), YouTube, Instagram

## Pages

| Route | Page | Sections | From quickair.in |
| --- | --- | --- | --- |
| `/` | Home | 3D hero, campaign banners, intro, steel vs aluminium, scroll-driven 3D showcase, product systems, services, process, calculators, clients and testimonials, articles, dealer network, enquiry | `/` and `/home/` |
| `/about` | About | Hero, figures, company brief timeline (1998–2023), CEO, product range, certifications, competitive edge, clients, enquiry | `/about/` |
| `/products` | Products | Hero, key figures, interactive 3D system explorer, filter, four product groups, push-fit joint diagram, help, enquiry | `/products/` |
| `/products/:slug` | Product detail (12) | Hero with key figures, interactive joint diagram (piping), full specifications or features, catalogue download, related products, enquiry | `/products/` |
| `/services` | Services | Hero, facts, what we offer (9), advantages, product lines, why choose us, five steps, resources, enquiry | `/home-v3-preview/` |
| `/calculators` | Calculator hub | Three calculators | Calculator menu |
| `/calculators/pipe-size` | QuickAir Pipe Size & Pressure Drop Calculator | Form, live pipe drawing, recommended size, actual drop | `/quickair-pipe-size-pressure-drop-calculator/` |
| `/calculators/pressure-drop` | QuickAir Pressure Drop Calculator | Form, live pipe drawing, drop in bar and psi, velocity | `/pressure-drop-calculator/` |
| `/calculators/electricity-cost` | Electricity Power Calculator | Form, power loss, cost in INR | `/electricity-power-calculator/` |
| `/gallery` | Gallery | Hero, figures, category filter, 20 photos, lightbox | `/gallery/` |
| `/case-studies` | Case Study | Numbered list of 4 | `/case-study/` |
| `/case-studies/:slug` | Case study (4) | Reading progress, article, related | 4 case study pages |
| `/blog` | Blog | Search, article cards, case study link | `/blog/` |
| `/blog/:slug` | Article (28) | Reading progress, contents, article, related | 28 guide pages |
| `/contact` | Contact | Contact cards, head office, quote form, four zones, dealer network, map | `/contact/` |
| `*` | Not found | | |

## Product pages

`/products/push-fit-aluminium-to-engineering-plastic`, `/products/push-fit-aluminium-to-aluminium`, `/products/crimping-type-integrated-fitting`, `/products/pex-push-to-fit`, `/products/aluminium-extrusions`, `/products/esd-prevention`, `/products/protork-a300-m300-ball-valves`, `/products/torquemate-pneumatic-actuators`, `/products/protork-a600-a800-ball-valves`, `/products/protork-as-at-ball-valves`, `/products/protork-bfv-butterfly-valves`, `/products/protork-valve-automation-system`

Article and case-study routes are listed one by one in CONTENT_INVENTORY.md section 2.

## External links

- Dealer registration: https://app.quickair.in/dealer-registration.php
- YouTube: https://youtu.be/RZYnPhbRzBM
- Instagram: https://www.instagram.com/gopicanares/
- WhatsApp enquiry: https://wa.me/919449840507
- Google Maps (directions and embedded map on `/contact`)
