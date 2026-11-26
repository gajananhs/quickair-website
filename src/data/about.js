/** /about/ and /case-study/, verbatim from https://www.quickair.in (crawled 18 Nov 2026). */
import articles from './generated/articles.json'
import { ARTICLE_SEO, LINK_FIXES } from './articleSeo'

export const about = {
  metaTitle: 'Compressed Air Piping Manufacturer in India',
  metaDescription: 'Canares Automation Pvt Ltd is a leading compressed air piping manufacturer India has trusted since 1998, delivering leak-free modular piping for pneumatic air lines, compressed air, and industrial utilities under the Quickair brand.',
  heroTitle: 'Compressed air piping manufacturer in India since 1998',
  heroBrands: 'QUICKAIR - QUICKFRAME',
  seoDescription: 'Canares Automation Pvt. Ltd. has made Quickair modular piping for compressed air and industrial utilities since 1998, with in-house extrusion in Bengaluru.',
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
  ['performance-comparison-of-gi-piping-vs-aluminium-modular-piping-quickair', 'Performance Comparison of GI Piping vs Aluminium Modular Piping (Quickair)', '/qa/media/22.jpeg'],
  ['influence-of-piping-material-on-pressure-drop-and-air-quality', 'Influence of piping material on pressure drop and air quality', '/qa/media/whatsapp-image-2026-01-05-at-07-01-55.jpeg'],
  ['evolution-of-compressed-air-piping', 'Evolution of Compressed Air Piping', '/qa/media/21.jpeg'],
  ['leak-free-performance-of-quickair-modular-piping-system', 'How Canares guarantees leak-free modular piping', '/qa/media/11.jpeg'],
]

export const caseStudies = CASE_ORDER.map(([slug, label, image], i) => ({ ...articles.find((a) => a.slug === slug), number: i + 1, label, cover: image }))
export const guides = articles.filter((a) => a.kind === 'guide')
export const getArticle = (slug) => articles.find((a) => a.slug === slug)

/** Short name of an article for cards, breadcrumbs and link text. */
export const articleName = (article) => ARTICLE_SEO[article.slug]?.card ?? article.cardTitle ?? article.title

const FAQ_HEADING = /\b(faq|frequently asked)/i
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

/**
 * Article blocks ready to render, plus the article's FAQ pairs. The wording is
 * the published text; this only repairs structure:
 *   - links that pointed at the homepage or blog index go to the page their
 *     anchor text describes (LINK_FIXES);
 *   - heading levels are closed up so the outline runs H2, H3, H4 with no gaps
 *     (several articles were written starting at level 3);
 *   - FAQ questions, stored as paragraphs, become sub-headings.
 */
export function prepareArticle(article) {
  const fixes = LINK_FIXES[article.slug] ?? {}
  const relink = (text) =>
    text.replace(LINK, (whole, label, href) => {
      if (!(label in fixes) || (href !== '/' && href !== '/blog')) return whole
      return fixes[label] ? `[${label}](${fixes[label]})` : label
    })
  const plain = (text) => text.replace(LINK, '$1')

  const levels = [...new Set(article.blocks.filter((block) => block.type === 'heading').map((block) => block.level))].sort((x, y) => x - y)
  let blocks = article.blocks.map((block) => {
    if (block.type === 'heading') return { ...block, level: Math.min(levels.indexOf(block.level), 2) + 2 }
    if (block.type === 'p') return { ...block, text: relink(block.text) }
    if (block.type === 'list') return { ...block, items: block.items.map(relink) }
    return block
  })

  const start = blocks.findIndex((block) => block.type === 'heading' && FAQ_HEADING.test(block.text))
  if (start < 0) return { blocks, faq: [] }
  const level = blocks[start].level
  let end = blocks.findIndex((block, i) => i > start && block.type === 'heading' && block.level <= level)
  if (end < 0) end = blocks.length
  const faq = []
  const section = blocks.slice(start + 1, end).map((block) => {
    if (block.type === 'p' && /\?\s*$/.test(block.text)) {
      // a leading "1." is dropped: the question is a heading now
      const question = plain(block.text).replace(/^\d+[.)]\s*/, '').trim()
      faq.push([question, ''])
      return { type: 'heading', level: Math.min(level + 1, 4), text: question }
    }
    // some articles already store the questions as sub-headings
    if (block.type === 'heading') {
      faq.push([block.text.replace(/^\d+[.)]\s*/, '').trim(), ''])
      return block
    }
    if (faq.length && (block.type === 'p' || block.type === 'list')) {
      const text = block.type === 'p' ? plain(block.text) : block.items.map(plain).join(' ')
      faq.at(-1)[1] = (faq.at(-1)[1] + ' ' + text).trim()
    }
    return block
  })
  blocks = [...blocks.slice(0, start + 1), ...section, ...blocks.slice(end)]
  return { blocks, faq: faq.filter(([, answer]) => answer) }
}
