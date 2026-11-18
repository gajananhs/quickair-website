# Quick Air content inventory

Source: https://quickair.in (WordPress REST API and rendered pages), crawled 18 November 2026.
Generated from the data files the site is built from, so every row below is content that is in the build.

- Text lives in `src/data/*.js` (company, products, about, services, navigation) and `src/data/generated/*.json` (articles, blog index, gallery).
- Images and PDFs live in `public/qa/`.
- Wording is kept as published. Nothing was invented; items that could not be used are in MISSING_CONTENT_REPORT.md.

## 1. Pages on quickair.in and where they went

| Quick Air page | New route | Data file |
| --- | --- | --- |
| / (Home, current design) and /home/ (earlier homepage text) | / | company.js |
| /about/ (Company brief, CEO, product range, certifications, competitive edge) | /about | about.js, products.js |
| /products/ | /products and /products/:slug (12 products) | products.js |
| /home-v3-preview/ (services, process, resources) | /services | services.js |
| /quickair-pipe-size-pressure-drop-calculator/ | /calculators/pipe-size | lib/calculators.js |
| /pressure-drop-calculator/ (QuickAir Pressure Drop) | /calculators/pressure-drop | lib/calculators.js |
| /electricity-power-calculator/ | /calculators/electricity-cost | lib/calculators.js |
| /gallery/ | /gallery | generated/gallery.json, services.js |
| /case-study/ and 4 case study pages | /case-studies, /case-studies/:slug | about.js, generated/articles.json |
| /blog/ and 28 guide pages | /blog, /blog/:slug | generated/blog-index.json, generated/articles.json |
| /contact/ | /contact | company.js |
| Dealer-Registration (external app) | Link to https://app.quickair.in/dealer-registration.php in the footer and on /contact | company.js |

## 2. Articles (32)

| # | Type | Title | Route | Words | Headings | Tables | Images | Original |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | guide | Pressure drop in compressed air piping | /blog/pressure-drop-in-compressed-air-piping | 2102 | 33 | 0 | 1 | https://www.quickair.in/pressure-drop-in-compressed-air-piping/ |
| 2 | guide | PVC vs Aluminium Compressed Air Pipe | /blog/pvc-vs-aluminium-compressed-air-pipe | 1566 | 15 | 1 | 1 | https://www.quickair.in/pvc-vs-aluminium-compressed-air-pipe/ |
| 3 | guide | Compressed Air Audit | /blog/compressed-air-audit | 1677 | 15 | 1 | 1 | https://www.quickair.in/compressed-air-audit/ |
| 4 | guide | Compressed Air Receiver Tank | /blog/compressed-air-receiver-tank | 2379 | 35 | 0 | 1 | https://www.quickair.in/compressed-air-receiver-tank/ |
| 5 | guide | Compressed Air Pressure Drop | /blog/compressed-air-pressure-drop | 2364 | 37 | 1 | 1 | https://www.quickair.in/compressed-air-pressure-drop/ |
| 6 | guide | PVC pipe for compressed air | /blog/pvc-pipe-for-compressed-air | 972 | 23 | 1 | 1 | https://www.quickair.in/pvc-pipe-for-compressed-air/ |
| 7 | guide | Compressed Air Pipe Size Chart | /blog/compressed-air-pipe-size-chart-2 | 1048 | 10 | 2 | 1 | https://www.quickair.in/compressed-air-pipe-size-chart-2/ |
| 8 | guide | CFM vs PSI Explanation | /blog/cfm-vs-psi-explaination | 841 | 10 | 1 | 1 | https://www.quickair.in/cfm-vs-psi-explaination/ |
| 9 | guide | Compressed Air Flow Calculation | /blog/compressed-air-flow-calculation | 987 | 8 | 2 | 1 | https://www.quickair.in/compressed-air-flow-calculation/ |
| 10 | guide | Industrial Compressed Air Piping | /blog/industrial-compressed-air-piping | 1124 | 10 | 1 | 0 | https://www.quickair.in/industrial-compressed-air-piping/ |
| 11 | guide | Compressed Air Distribution System | /blog/compressed-air-distribution-system | 734 | 7 | 0 | 1 | https://www.quickair.in/compressed-air-distribution-system/ |
| 12 | guide | Air pipe fittings | /blog/air-pipe-fittings | 966 | 6 | 0 | 0 | https://www.quickair.in/air-pipe-fittings/ |
| 13 | guide | Compressed air fittings | /blog/compressed-air-fittings | 919 | 7 | 0 | 0 | https://www.quickair.in/compressed-air-fittings/ |
| 14 | guide | Compressed Air Piping | /blog/compressed-air-piping | 609 | 6 | 0 | 0 | https://www.quickair.in/compressed-air-piping/ |
| 15 | guide | Pipe To Pipe Connector | /blog/pipe-to-pipe-connector | 442 | 5 | 0 | 0 | https://www.quickair.in/pipe-to-pipe-connector/ |
| 16 | guide | Air Piping Systems Suppliers | /blog/air-piping-systems-suppliers | 995 | 23 | 0 | 0 | https://www.quickair.in/air-piping-systems-suppliers/ |
| 17 | guide | PEX Compressed Air Piping: Is It Right for Your Facility? | /blog/pex-compressed-air-piping-is-it-right-for-your-facility | 658 | 5 | 1 | 0 | https://www.quickair.in/pex-compressed-air-piping-is-it-right-for-your-facility/ |
| 18 | guide | Stainless Steel Compressed Air Piping: When to Use It | /blog/stainless-steel-compressed-air-piping-when-to-use-it | 621 | 6 | 0 | 0 | https://www.quickair.in/stainless-steel-compressed-air-piping-when-to-use-it/ |
| 19 | guide | How Compressed Air Leaks Are Draining Manufacturing Profits? | /blog/compressed-air-leaks-in-manufacturing | 768 | 6 | 0 | 1 | https://www.quickair.in/compressed-air-leaks-in-manufacturing/ |
| 20 | guide | Energy Efficient Piping | /blog/energy-efficient-piping | 768 | 11 | 0 | 0 | https://www.quickair.in/energy-efficient-piping/ |
| 21 | guide | Corrosion Resistant Piping | /blog/corrosion-resistant-piping | 735 | 10 | 0 | 0 | https://www.quickair.in/corrosion-resistant-piping/ |
| 22 | guide | Modular piping system | /blog/modular-piping-system | 779 | 11 | 0 | 1 | https://www.quickair.in/modular-piping-system/ |
| 23 | guide | Compressed air system maintenance | /blog/compressed-air-system-maintenance | 794 | 8 | 0 | 0 | https://www.quickair.in/compressed-air-system-maintenance/ |
| 24 | guide | Modular Compressed Air Piping Installation | /blog/modular-compressed-air-piping-installation | 822 | 9 | 0 | 0 | https://www.quickair.in/modular-compressed-air-piping-installation/ |
| 25 | guide | Compressed Air Leak Detection | /blog/compressed-air-leak-detection | 729 | 10 | 0 | 0 | https://www.quickair.in/compressed-air-leak-detection/ |
| 26 | guide | Air pipe sizing guide | /blog/air-pipe-sizing-guide | 871 | 11 | 0 | 1 | https://www.quickair.in/air-pipe-sizing-guide/ |
| 27 | guide | Aluminium vs steel compressed air pipe | /blog/aluminium-vs-steel-compressed-air-pipe | 718 | 7 | 1 | 0 | https://www.quickair.in/aluminium-vs-steel-compressed-air-pipe/ |
| 28 | guide | Aluminium compressed air | /blog/aluminium-compressed-air | 872 | 11 | 0 | 1 | https://www.quickair.in/aluminium-compressed-air/ |
| 29 | case-study | Performance Comparison of GI Piping vs Aluminium Modular Piping (QuickAir) | /case-studies/performance-comparison-of-gi-piping-vs-aluminium-modular-piping-quickair | 189 | 6 | 2 | 1 | https://www.quickair.in/performance-comparison-of-gi-piping-vs-aluminium-modular-piping-quickair/ |
| 30 | case-study | Leak-Free Performance of QuickAir Modular Piping System | /case-studies/leak-free-performance-of-quickair-modular-piping-system | 223 | 3 | 0 | 1 | https://www.quickair.in/leak-free-performance-of-quickair-modular-piping-system/ |
| 31 | case-study | Evolution Of Compressed Air Piping | /case-studies/evolution-of-compressed-air-piping | 212 | 4 | 0 | 1 | https://www.quickair.in/evolution-of-compressed-air-piping/ |
| 32 | case-study | Influence of piping material on pressure drop and air quality | /case-studies/influence-of-piping-material-on-pressure-drop-and-air-quality | 311 | 4 | 0 | 0 | https://www.quickair.in/influence-of-piping-material-on-pressure-drop-and-air-quality/ |

Blog index intro: "Guides on aluminum compressed air piping, modular piping systems, pipe sizing, and leak-free, corrosion-resistant industrial piping solutions."

The blog page on quickair.in shows 22 cards. The new /blog page shows those cards first, with their original titles and excerpts, then the remaining published guides that the original blog page does not link to.

## 3. Products (12)

| Group | Product | Route | Catalogue |
| --- | --- | --- | --- |
| aluminium | Push Fit Type · Aluminium to engineering plastic | /products/push-fit-aluminium-to-engineering-plastic | quickair-aluminium-engineering-plastic-catalogue.pdf |
| aluminium | Push Fit Type · Aluminium to aluminium | /products/push-fit-aluminium-to-aluminium | aluminium-with-aluminium-fittings.pdf |
| aluminium | Crimping Type · Integrated fitting | /products/crimping-type-integrated-fitting | al-crimping-grooving.pdf |
| pex | Push-to-Fit Type · Sizes 20, 25, 32 mm | /products/pex-push-to-fit | pex.pdf |
| extrusions | Aluminium Extrusions Products | /products/aluminium-extrusions | aluminium-profile-catalogue-20-12-16-0.pdf |
| extrusions | Electro Static Discharge Prevention (ESD) | /products/esd-prevention | electro-static-discharge-prevention.pdf |
| valves | Protork A 300 & M 300 Series Ball Valves | /products/protork-a300-m300-ball-valves | 30-08-ball-valve-2page-catalogue-2-1.pdf |
| valves | Torquemate Pneumatic Actuators | /products/torquemate-pneumatic-actuators | 30-08-ball-valve-2page-catalogue-2-1.pdf |
| valves | Protork A600 & A800 Series Ball Valves | /products/protork-a600-a800-ball-valves | 30-08-ball-valve-2page-catalogue-2-1.pdf |
| valves | Protork AS 150, AS 300, AT 150 & AT 300 Series Ball Valves | /products/protork-as-at-ball-valves | 30-08-ball-valve-2page-catalogue-2-1.pdf |
| valves | Protork BFV Series Butterfly Valves | /products/protork-bfv-butterfly-valves | 30-08-ball-valve-2page-catalogue-2-1.pdf |
| valves | Protork Valve Automation System | /products/protork-valve-automation-system | 30-08-ball-valve-2page-catalogue-2-1.pdf |

## 4. Gallery (20 photos)

| Category | Title | Caption | File |
| --- | --- | --- | --- |
| Compressor rooms | Receiver, dryer and filter in one bay | A compact compressor bay tied in with modular aluminium: receiver, filters and dryer. | /qa/gallery/receiver-dryer-and-filter-in-one-bay.jpg |
| Compressor rooms | Multi-receiver manifold | Receivers, isolation valves and a filter on a single push-fit manifold. | /qa/gallery/multi-receiver-manifold.jpg |
| Manifolds & valves | Four-drop distribution manifold | Valved drops from one header, supported on channel brackets. | /qa/gallery/four-drop-distribution-manifold.jpg |
| Overhead & structure | Run through a new steel structure | A long, light aluminium line clamped along the structure. No hot work. | /qa/gallery/run-through-a-new-steel-structure.jpg |
| Manifolds & valves | Flow-marked manifold | Flow-direction arrows, tees, valves and filters connected push-fit. | /qa/gallery/flow-marked-manifold.jpg |
| Manifolds & valves | Manifold with pressure gauge | Four isolation valves and a gauge tapped off the main line. | /qa/gallery/manifold-with-pressure-gauge.jpg |
| Compressor rooms | Receiver with wall-mounted filter panel | Wall run dropping into a receiver, with a filter and regulator panel alongside. | /qa/gallery/receiver-with-wall-mounted-filter-panel.jpg |
| Overhead & structure | Overhead run along roof trusses | Light aluminium pipe clamped to steel trusses, no welding or hot work. | /qa/gallery/overhead-run-along-roof-trusses.jpg |
| Manifolds & valves | Desiccant air dryer connections | Clean vertical drops with a tee and ball valve around an air dryer. | /qa/gallery/desiccant-air-dryer-connections.jpg |
| Retrofit & large bore | Large-bore line with flanged valves | Large-diameter modular pipe with butterfly valves and flanged take-offs. | /qa/gallery/large-bore-line-with-flanged-valves.jpg |
| Manifolds & valves | Receiver outlet with isolation valve | Quickair line with a ball valve and flanged connection at a receiver. | /qa/gallery/receiver-outlet-with-isolation-valve.jpg |
| Overhead & structure | Receiver tie-in at height | An overhead drop with an isolation valve, coming down to a blue receiver. | /qa/gallery/receiver-tie-in-at-height.jpg |
| Retrofit & large bore | Large-bore receiver connection | Elbow and clamp assembly connecting a red receiver to the main line. | /qa/gallery/large-bore-receiver-connection.jpg |
| Compressor rooms | Dryer and filter station | Flow-marked pipe, ball valves and a filter between receiver and dryer. | /qa/gallery/dryer-and-filter-station.jpg |
| Retrofit & large bore | Underfloor trench run | Modular line laid in a trench on channel supports, ready for the cover plates. | /qa/gallery/underfloor-trench-run.jpg |
| Compressor rooms | Receiver tank connections | Elbows and flanged adapters linking air receivers to the main line. | /qa/gallery/receiver-tank-connections.jpg |
| Compressor rooms | Outdoor shed receiver connection | Vertical drops and valves beside a receiver in a sheet-metal shed. | /qa/gallery/outdoor-shed-receiver-connection.jpg |
| Retrofit & large bore | Retrofit onto an existing steel line | A modular branch tied into old black steel pipe with a ball valve. | /qa/gallery/retrofit-onto-an-existing-steel-line.jpg |
| Compressor rooms | Compressed air room installation | Overhead and floor-level runs around receivers, dryer and compressor. | /qa/gallery/compressed-air-room-installation.jpg |
| Compressor rooms | Receiver and dryer header | Compact header with valves and a filter between two air receivers. | /qa/gallery/receiver-and-dryer-header.jpg |

## 5. Assets (103 files in public/qa)

| File | Source | Size | Dimensions |
| --- | --- | --- | --- |
| /qa/home/aluminium-compressed-air-piping-system-leak-free-modular-reliable-26-years-of-experience.webp | inline image on / | 143 KB | 1600×640 |
| /qa/home/faster-installation-no-welding-cut-push-run-push-fit-modular-pipes-that-your-team-can-install-wi.webp | inline image on / | 140 KB | 1600×727 |
| /qa/home/industrial-compressed-air-system-efficient-air-generation-storage-and-distribution-leak-free-mod.webp | inline image on / | 132 KB | 1600×640 |
| /qa/home/quickair-blue-aluminium-compressed-air-piping-installed-in-a-factory.jpg | inline image on / | 149 KB | 823×793 |
| /qa/home/quickair-piping-connected-to-a-compressor.jpg | inline image on / | 45 KB | 400×400 |
| /qa/home/compressor-line-with-valves-and-drop-legs.jpg | inline image on / | 56 KB | 600×370 |
| /qa/home/quickair-elbow-and-clamp-assembly.jpg | inline image on / | 49 KB | 433×500 |
| /qa/clients/hal.jpg | inline image on / | 6 KB | 240×240 |
| /qa/clients/emmvee.jpg | inline image on / | 4 KB | 240×240 |
| /qa/clients/bhel.jpg | inline image on / | 7 KB | 240×240 |
| /qa/clients/toyota.jpg | inline image on / | 7 KB | 240×240 |
| /qa/clients/tata.jpg | inline image on / | 7 KB | 240×240 |
| /qa/clients/schneider-electric.jpg | inline image on / | 4 KB | 240×240 |
| /qa/clients/reliance.jpg | inline image on / | 6 KB | 240×240 |
| /qa/clients/jll.jpg | inline image on / | 5 KB | 240×240 |
| /qa/clients/intel.jpg | inline image on / | 4 KB | 240×240 |
| /qa/clients/ifb.jpg | inline image on / | 3 KB | 240×240 |
| /qa/clients/foxconn.jpg | inline image on / | 3 KB | 240×240 |
| /qa/clients/emerson.jpg | inline image on / | 4 KB | 240×240 |
| /qa/clients/bosch.jpg | inline image on / | 4 KB | 240×240 |
| /qa/clients/biocon.jpg | inline image on / | 4 KB | 240×240 |
| /qa/clients/autoliv.jpg | inline image on / | 5 KB | 240×240 |
| /qa/clients/anthem.jpg | inline image on / | 3 KB | 240×240 |
| /qa/clients/alstom.jpg | inline image on / | 3 KB | 240×240 |
| /qa/home/quickair-piping-installed-by-canares-dealers-across-india.jpg | inline image on / | 99 KB | 823×533 |
| /qa/products/quickair-aluminium-compressed-air-piping-installed-at-an-industrial-plant.jpg | inline image on /products/ | 166 KB | 900×1200 |
| /qa/products/quickair-modular-piping-connected-to-air-receiver-tanks.jpg | inline image on /products/ | 50 KB | 640×458 |
| /qa/products/modular-aluminium-piping-for-compressed-air-push-fit-type-aluminium-to-engineering-plastic.jpg | inline image on /products/ | 28 KB | 700×700 |
| /qa/products/modular-aluminium-piping-for-compressed-air-push-fit-type-aluminium-to-aluminium.jpg | inline image on /products/ | 34 KB | 700×679 |
| /qa/products/modular-aluminium-piping-for-compressed-air-crimping-type-integrated-fitting.jpg | inline image on /products/ | 28 KB | 700×607 |
| /qa/gallery/receiver-dryer-and-filter-in-one-bay.jpg | inline image on /gallery/ | 100 KB | 1100×825 |
| /qa/gallery/multi-receiver-manifold.jpg | inline image on /gallery/ | 122 KB | 901×1200 |
| /qa/gallery/four-drop-distribution-manifold.jpg | inline image on /gallery/ | 38 KB | 619×1100 |
| /qa/gallery/run-through-a-new-steel-structure.jpg | inline image on /gallery/ | 111 KB | 1100×619 |
| /qa/gallery/flow-marked-manifold.jpg | inline image on /gallery/ | 70 KB | 1200×542 |
| /qa/gallery/manifold-with-pressure-gauge.jpg | inline image on /gallery/ | 49 KB | 618×1100 |
| /qa/gallery/receiver-with-wall-mounted-filter-panel.jpg | inline image on /gallery/ | 74 KB | 497×1100 |
| /qa/gallery/overhead-run-along-roof-trusses.jpg | inline image on /gallery/ | 112 KB | 768×1024 |
| /qa/gallery/desiccant-air-dryer-connections.jpg | inline image on /gallery/ | 45 KB | 497×1100 |
| /qa/gallery/large-bore-line-with-flanged-valves.jpg | inline image on /gallery/ | 97 KB | 825×1100 |
| /qa/gallery/receiver-outlet-with-isolation-valve.jpg | inline image on /gallery/ | 132 KB | 900×1200 |
| /qa/gallery/receiver-tie-in-at-height.jpg | inline image on /gallery/ | 64 KB | 497×1100 |
| /qa/gallery/large-bore-receiver-connection.jpg | inline image on /gallery/ | 71 KB | 1100×825 |
| /qa/gallery/dryer-and-filter-station.jpg | inline image on /gallery/ | 70 KB | 497×1100 |
| /qa/gallery/underfloor-trench-run.jpg | inline image on /gallery/ | 75 KB | 825×1100 |
| /qa/gallery/receiver-tank-connections.jpg | inline image on /gallery/ | 125 KB | 901×1200 |
| /qa/gallery/outdoor-shed-receiver-connection.jpg | inline image on /gallery/ | 68 KB | 497×1100 |
| /qa/gallery/retrofit-onto-an-existing-steel-line.jpg | inline image on /gallery/ | 34 KB | 497×1100 |
| /qa/gallery/compressed-air-room-installation.jpg | inline image on /gallery/ | 123 KB | 1200×901 |
| /qa/gallery/receiver-and-dryer-header.jpg | inline image on /gallery/ | 51 KB | 1200×542 |
| /qa/media/whatsapp-image-2026-11-03-at-3-36-50-pm.webp | https://www.quickair.in/wp-content/uploads/2026/11/WhatsApp-Image-2026-11-03-at-3.36.50-PM.jpeg | 109 KB | 1600×900 |
| /qa/media/aluminium-compressed-air-piping-system-300x196-jpg-utm-source-chatgpt.com | https://www.quickair.in/wp-content/uploads/2026/08/Aluminium-Compressed-Air-Piping-System-300x196.jpg?utm_source=chatgpt.com | 16 KB | 300×196 |
| /qa/media/compressed-air-line-modular-aluminium-piping-1000x1000-1.webp | https://www.quickair.in/wp-content/uploads/2026/10/compressed-air-line-modular-aluminium-piping-1000x1000-1.webp | 90 KB | 1000×750 |
| /qa/media/blue-compressed-air-system-in-plant-room.webp | https://www.quickair.in/wp-content/uploads/2026/10/Blue-Compressed-Air-System-in-Plant-Room.png | 125 KB | 1536×1024 |
| /qa/media/blue-compressed-air-pipeline-and-gauge.webp | https://www.quickair.in/wp-content/uploads/2026/10/Blue-Compressed-Air-Pipeline-and-Gauge.png | 149 KB | 1536×1024 |
| /qa/media/aluminium-compressed-air-piping-system.jpg | https://www.quickair.in/wp-content/uploads/2026/08/Aluminium-Compressed-Air-Piping-System.jpg | 241 KB | 1300×850 |
| /qa/media/compressed-air-pipe-size-chart.webp | https://www.quickair.in/wp-content/uploads/2026/10/compressed-air-pipe-size-chart.png | 45 KB | 1600×840 |
| /qa/media/psi-vs-cfm.webp | https://www.quickair.in/wp-content/uploads/2026/10/psi-vs-cfm.png | 32 KB | 840×365 |
| /qa/media/calculate-compressed.jpg | https://www.quickair.in/wp-content/uploads/2026/10/calculate-compressed.jpg | 42 KB | 600×450 |
| /qa/media/push-fit-compressed-air-piping.jpg | https://luthrapneumsys.com/wp-content/uploads/2025/10/Push-Fit-Compressed-Air-Piping.jpg | 225 KB | 1300×850 |
| /qa/media/pipeline-1-768x1152-1.webp | https://www.quickair.in/wp-content/uploads/2026/10/pipeline-1-768x1152-1.png | 12 KB | 768×1152 |
| /qa/media/quick-air-50mm-pipe-to-pipe-connector.jpeg | https://www.quickair.in/wp-content/uploads/2026/08/quick-air-50mm-pipe-to-pipe-connector.jpeg | 34 KB | 1000×1413 |
| /qa/media/compressed-air-leaks-in-manufacturing.jpg | https://www.quickair.in/wp-content/uploads/2026/07/compressed-air-leaks-in-manufacturing.jpg | 36 KB | 790×388 |
| /qa/media/modular-piping-system.jpg | https://www.quickair.in/wp-content/uploads/2026/07/modular-piping-system.jpg | 21 KB | 546×366 |
| /qa/media/air-pipe-sizing-guide.jpg | https://www.quickair.in/wp-content/uploads/2026/08/Air-pipe-sizing-guide.jpg | 13 KB | 400×330 |
| /qa/media/21.jpeg | https://www.quickair.in/wp-content/uploads/2025/12/21.jpeg | 139 KB | 1040×780 |
| /qa/media/17.jpeg | https://www.quickair.in/wp-content/uploads/2025/12/17.jpeg | 116 KB | 1280×960 |
| /qa/media/10.jpeg | https://www.quickair.in/wp-content/uploads/2025/12/10.jpeg | 195 KB | 1600×1200 |
| /qa/media/11.jpeg | https://www.quickair.in/wp-content/uploads/2025/12/11.jpeg | 237 KB | 1600×1200 |
| /qa/media/34-1.jpeg | https://www.quickair.in/wp-content/uploads/2025/12/34-1.jpeg | 78 KB | 1152×519 |
| /qa/media/compressed-air-pipe.webp | https://www.quickair.in/wp-content/uploads/2026/08/compressed-air-pipe.png | 136 KB | 1536×1024 |
| /qa/media/3.webp | https://www.quickair.in/wp-content/uploads/2026/08/3.png | 116 KB | 1536×1024 |
| /qa/media/air-pipe-sizing-guide.webp | https://www.quickair.in/wp-content/uploads/2026/07/Air-pipe-sizing-guide.png | 94 KB | 1264×848 |
| /qa/media/5.webp | https://www.quickair.in/wp-content/uploads/2026/08/5.png | 121 KB | 1536×1024 |
| /qa/media/4.webp | https://www.quickair.in/wp-content/uploads/2026/08/4.png | 139 KB | 1536×1024 |
| /qa/media/2.webp | https://www.quickair.in/wp-content/uploads/2026/08/2.png | 39 KB | 1536×1024 |
| /qa/media/energy-efficient-piping.webp | https://www.quickair.in/wp-content/uploads/2026/07/energy-efficient-piping.png | 233 KB | 1536×1024 |
| /qa/media/compressed-air-1-scaled.webp | https://www.quickair.in/wp-content/uploads/2026/08/Compressed-air-1-scaled.jpeg | 159 KB | 1600×1200 |
| /qa/media/untitled-design-1.webp | https://www.quickair.in/wp-content/uploads/2026/08/Untitled-design-1.png | 20 KB | 1536×1024 |
| /qa/media/calculate-compressed.jpg | https://www.quickair.in/wp-content/uploads/2026/10/calculate-compressed.jpg | 42 KB | 600×450 |
| /qa/media/psi-vs-cfm-1.webp | https://www.quickair.in/wp-content/uploads/2026/10/psi-vs-cfm-1.png | 32 KB | 840×365 |
| /qa/media/compressed-air-pipe-size-chart.webp | https://www.quickair.in/wp-content/uploads/2026/10/compressed-air-pipe-size-chart.png | 45 KB | 1600×840 |
| /qa/media/aluminium-compressed-air-piping-system.jpg | https://www.quickair.in/wp-content/uploads/2026/08/Aluminium-Compressed-Air-Piping-System.jpg | 241 KB | 1300×850 |
| /qa/media/blue-compressed-air-pipeline-and-gauge.webp | https://www.quickair.in/wp-content/uploads/2026/10/Blue-Compressed-Air-Pipeline-and-Gauge.png | 149 KB | 1536×1024 |
| /qa/media/blue-compressed-air-system-in-plant-room.webp | https://www.quickair.in/wp-content/uploads/2026/10/Blue-Compressed-Air-System-in-Plant-Room.png | 125 KB | 1536×1024 |
| /qa/media/compressed-air-line-modular-aluminium-piping-1000x1000-1.webp | https://www.quickair.in/wp-content/uploads/2026/10/compressed-air-line-modular-aluminium-piping-1000x1000-1.webp | 90 KB | 1000×750 |
| /qa/media/aluminium-compressed-air-piping-system-300x196-1.jpg | https://www.quickair.in/wp-content/uploads/2026/11/Aluminium-Compressed-Air-Piping-System-300x196-1.jpg | 16 KB | 300×196 |
| /qa/media/harikantra-gajanana-sukru-canares-automation-pvt-ltd.webp | https://www.quickair.in/wp-content/uploads/2025/05/Harikantra-Gajanana-Sukru-Canares-Automation-Pvt.-Ltd.webp | 40 KB | 1353×1600 |
| /qa/media/screenshot-2025-12-23-112334.png | https://www.quickair.in/wp-content/uploads/2025/12/Screenshot-2025-12-23-112334.png | 137 KB | 305×491 |
| /qa/media/screenshot-2025-12-23-112326.png | https://www.quickair.in/wp-content/uploads/2025/12/Screenshot-2025-12-23-112326.png | 181 KB | 309×491 |
| /qa/media/22.jpeg | https://www.quickair.in/wp-content/uploads/2025/12/22.jpeg | 202 KB | 1280×960 |
| /qa/media/whatsapp-image-2026-01-05-at-07-01-55.jpeg | https://www.quickair.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-05-at-07.01.55.jpeg | 179 KB | 1600×1305 |
| /qa/media/whatsapp-image-2026-01-05-at-07-01-56-1.webp | https://www.quickair.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-05-at-07.01.56-1.jpeg | 202 KB | 1600×946 |
| /qa/media/11.jpeg | https://www.quickair.in/wp-content/uploads/2025/12/11.jpeg | 237 KB | 1600×1200 |
| /qa/media/chatgpt-image-jan-8-2026-11-15-19-am.webp | https://www.quickair.in/wp-content/uploads/2026/01/ChatGPT-Image-Jan-8-2026-11_15_19-AM.png | 24 KB | 1024×1536 |
| /qa/catalogues/quickair-aluminium-engineering-plastic-catalogue.pdf | https://www.quickair.in/wp-content/uploads/2025/05/quickair-aluminium-engineering-plastic-catalogue.pdf | 2328 KB |  |
| /qa/catalogues/aluminium-with-aluminium-fittings.pdf | https://quickair.in/wp-content/uploads/2026/01/Aluminium-With-Aluminium-Fittings.pdf | 12585 KB |  |
| /qa/catalogues/al-crimping-grooving.pdf | https://quickair.in/wp-content/uploads/2026/01/AL-crimping-grooving-.pdf | 3533 KB |  |
| /qa/catalogues/pex.pdf | https://quickair.in/wp-content/uploads/2026/01/PEX-.pdf | 3533 KB |  |
| /qa/catalogues/aluminium-profile-catalogue-20-12-16-0.pdf | https://www.quickair.in/wp-content/uploads/2026/01/ALUMINIUM-PROFILE-CATALOGUE-20-12-16.0.pdf | 33637 KB |  |
| /qa/catalogues/electro-static-discharge-prevention.pdf | https://www.quickair.in/wp-content/uploads/2026/09/Electro-Static-Discharge-Prevention.pdf | 3487 KB |  |
| /qa/catalogues/30-08-ball-valve-2page-catalogue-2-1.pdf | https://quickair.in/wp-content/uploads/2026/01/30-08-BALL-VALVE-2PAGE-CATALOGUE-2-1.pdf | 1566 KB |  |
| /qa/brand/quick-air-logo.png | https://www.quickair.in/wp-content/uploads/2025/05/quick-air-logo.png | 34 KB | 816×357 |

## 6. Company facts

See `src/data/company.js`: brand, legal entity (Canares Automation Pvt. Ltd.), phone numbers, e-mail addresses, address, map, social links, statistics, hero banners, comparison table, process steps, 17 client logos, 3 testimonials, dealer network text, 4 zone contacts.
