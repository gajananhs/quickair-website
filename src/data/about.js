/** /about/ and /case-study/, verbatim from https://www.quickair.in (crawled 18 Nov 2026). */
import articles from './generated/articles.json'

export const about = {
  metaTitle: 'Compressed Air Piping Manufacturer India',
  metaDescription: 'Canares Automation Pvt Ltd is a leading compressed air piping manufacturer India has trusted since 1998, delivering leak-free modular piping for pneumatic air lines, compressed air, and industrial utilities under the Quickair brand.',
  heroTitle: 'QUICKAIR - QUICKFRAME',
  heroLines: ['Your Trusted Partner leading compressed air piping manufacturer', 'Your Trusted Partner End To End Industrial Solutions'],
  briefTitle: 'Company Brief',
  timeline: [
    {
      year: '1998',
      title: 'Foundation & Launch of Quickair™',
      text: 'Canares Automation Pvt Ltd is a leading compressed air piping manufacturer India has trusted since 1998, delivering leak-free modular piping for pneumatic air lines, compressed air, and industrial utilities under the Quickair brand. Quickair™ set new benchmarks by addressing air leakage, pressure drop, corrosion, and installation inefficiencies through innovative modular engineering.',
    },
    {
      year: '2018',
      title: 'Beginning of Global Export Journey',
      text: 'In 2018, Canares began its export operations, supplying modular piping and industrial solutions to international markets including Germany, the United States, Saudi Arabia, and other regions, reinforcing its global quality and compliance capabilities.',
    },
    {
      year: '2021',
      title: 'Introduction of QuickFrame™ Modular Systems',
      text: 'In 2021, Canares expanded into modular aluminium structural solutions with the launch of QuickFrame™, enabling the development of ESD workstations, conveyors, machine frames, safety enclosures, and customized industrial structures designed for flexibility, scalability, and modern factory environments.',
    },
    {
      year: '2023',
      title: 'In-House Aluminium Extrusion Manufacturing',
      text: 'To strengthen manufacturing control and cost efficiency, Canares commissioned its in-house aluminium extrusion plant in 2023, enabling precision profile manufacturing, faster lead times, enhanced customization, and competitive pricing.',
    },
  ],
  ceo: {
    title: 'Meet Our CEO',
    image: { src: '/qa/media/harikantra-gajanana-sukru-canares-automation-pvt-ltd.webp', alt: 'Harikantra Gajanana Sukru - Canares Automation Pvt. Ltd' },
    paragraphs: [
      'Mr Gajanana H. S., the dynamic CEO of Canares Automation Private Limited, is a trailblazer in the automation industry with over 26+ years of experience. He began his career designing energy-efficient systems for manufacturing giants, sparking a lifelong passion for innovative automation solutions.',
      'Under his leadership, Canares Automation has become a global leader in modular piping solutions for compressed air, vacuum, and inert gases, serving over 532+ clients across automotive, electronics, and pharmaceutical industries. Mr. Sukru’s vision led to the development of the Quickair™ system, a revolutionary modular piping solution that reduces energy costs by up to 30%.',
      'A hands-on leader, Mr. Sukru’s journey began in a small workshop in Bangalore, where he built his first automation prototype. This experience shaped his belief in practical, client-focused innovation.',
    ],
  },
  rangeTitle: 'Product range',
  certificationsTitle: 'Certifications',
  certifications: [
    { src: '/qa/media/screenshot-2025-12-23-112334.png', alt: 'Compressed air piping manufacturer India: certificate', w: 305, h: 491 },
    { src: '/qa/media/screenshot-2025-12-23-112326.png', alt: 'Quickair certificate', w: 309, h: 491 },
  ],
  edgeTitle: 'Competitive Edge',
  edgeColumns: ['Quickair', 'Features', 'Others'],
  edge: [
    { ours: 'Push-In Fittings (20-63mm), Zero Thread, Zero Leakage', oursImage: '/qa/about/edge-1.webp', theirs: 'NOT AVAILABLE' },
    {
      ours: 'Integrated Elbow & Tee Design. Merged fittings cut parts and assembly time by 40%',
      oursImage: '/qa/about/intergrated-coupler-elbow-and-tee.png',
      theirs: 'Requires multiple couplers',
      theirsImage: '/qa/about/three-coupler-tee-and-two-coupler-elbow.png',
    },
    { ours: 'Zero Thread, Zero Leakage Patented wall brackets and fittings eliminate leaks', oursImage: '/qa/about/edge-3.webp', theirs: 'Threaded, prone to leakage', theirsImage: '/qa/about/edge-7.webp' },
    {
      ours: 'Our ball and butterfly valves, powered by pneumatic or electrical actuators and controlled by PLC with SCADA monitoring, deliver near-flawless operation, cutting downtime with precise air flow control.',
      oursImage: '/qa/about/edge-4.webp',
      theirs: 'AUTO SYSTEMS NOT AVAILABLE. Competitors rely on manual or basic valves, risking leaks and delays.',
    },
    {
      ours: 'Unique male-female coupler arrangement with rubber support and an insert nut, snapping together like puzzle pieces to cut assembly time and ensure a leak-proof seal.',
      oursImage: '/qa/about/edge-5.webp',
      theirs: 'Competitors’ couplers lack this design, making them harder to install and prone to leaks.',
      theirsImage: '/qa/about/edge-8.webp',
    },
  ],
}

/** /case-study/ index: order, numbering and labels as on the original */
const CASE_ORDER = [
  ['performance-comparison-of-gi-piping-vs-aluminium-modular-piping-quickair', 'Performance Comparison of GI Piping vs Aluminium Modular Piping (QuickAir)', '/qa/media/22.jpeg'],
  ['influence-of-piping-material-on-pressure-drop-and-air-quality', 'Influence of piping material on pressure drop and air quality', '/qa/media/whatsapp-image-2026-01-05-at-07-01-55.jpeg'],
  ['evolution-of-compressed-air-piping', 'Evolution of Compressed Air Piping', '/qa/media/21.jpeg'],
  ['leak-free-performance-of-quickair-modular-piping-system', 'How Canares guarantees leak-free modular piping', '/qa/media/11.jpeg'],
]

export const caseStudies = CASE_ORDER.map(([slug, label, image], i) => ({ ...articles.find((a) => a.slug === slug), number: i + 1, label, cover: image }))
export const guides = articles.filter((a) => a.kind === 'guide')
export const getArticle = (slug) => articles.find((a) => a.slug === slug)
