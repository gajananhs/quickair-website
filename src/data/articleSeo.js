/**
 * Search titles and internal-link structure for the guides and case studies.
 *
 * The article text itself (articles.json) is the published content and is not
 * rewritten here. This file only adds:
 *   - a distinct search title per article, taken from the article's own headline,
 *     so pages on neighbouring topics do not compete for the same search;
 *   - topic clusters, used for "Related resources" and "Keep reading" links.
 *
 * No authors, publish dates, statistics or claims are added.
 */
import { ROUTES } from './navigation'

/** The main guide every other guide links back to. */
export const PILLAR = 'aluminium-compressed-air'

/**
 * slug -> { title, heading?, card? }
 *   title    <title> and social title
 *   heading  replaces the on-page H1 where the stored title does not describe the article
 *   card     replaces the short name used on cards and breadcrumbs
 */
export const ARTICLE_SEO = {
  // This article is about compressed air audits (its stored title was "Pressure drop in compressed air piping").
  'pressure-drop-in-compressed-air-piping': {
    title: 'Compressed Air System Audit: Find Leaks and Cut Energy Costs',
    heading: 'Compressed Air Audit: How to Identify Air Leaks and Reduce Energy Costs',
    card: 'Compressed Air System Audit',
  },
  'compressed-air-audit': { title: 'Compressed Air Audit: 7 Ways to Improve Energy Efficiency' },
  'pvc-vs-aluminium-compressed-air-pipe': { title: 'PVC vs Aluminium Compressed Air Pipe: Which Is Better?' },
  'pvc-pipe-for-compressed-air': { title: 'PVC Pipe for Compressed Air: Is It Safe?' },
  'compressed-air-receiver-tank': { title: 'Compressed Air Receiver Tank: Sizing, Benefits, Installation' },
  'compressed-air-pressure-drop': { title: 'Compressed Air Pressure Drop: Causes, Calculation, Fixes' },
  'compressed-air-pipe-size-chart-2': { title: 'Compressed Air Pipe Size Chart: CFM, Length and Diameter' },
  'cfm-vs-psi-explaination': { title: 'CFM vs PSI: The Difference and Why Both Matter' },
  'compressed-air-flow-calculation': { title: 'Compressed Air Flow Calculation: A Practical Guide' },
  'industrial-compressed-air-piping': { title: 'Industrial Compressed Air Piping Guide' },
  'compressed-air-distribution-system': { title: 'Compressed Air Distribution System for Industrial Air Supply' },
  'air-pipe-fittings': { title: 'What Are Air Pipe Fittings? Rigid Pipe Fittings Explained' },
  'compressed-air-fittings': { title: 'What Are Compressed Air Fittings? Pneumatic Connectors' },
  'compressed-air-piping': { title: 'Compressed Air Piping for Industrial Air Distribution' },
  'pipe-to-pipe-connector': { title: 'Pipe to Pipe Connector for Compressed Air Piping' },
  'air-piping-systems-suppliers': { title: 'Compressed Air Piping Systems Suppliers in India' },
  'pex-compressed-air-piping-is-it-right-for-your-facility': { title: 'PEX Compressed Air Piping: Is It Right for Your Facility?' },
  'stainless-steel-compressed-air-piping-when-to-use-it': { title: 'Stainless Steel Compressed Air Piping: When to Use It' },
  'compressed-air-leaks-in-manufacturing': { title: 'How Compressed Air Leaks Drain Manufacturing Profits' },
  'compressed-air-leak-detection': { title: 'Compressed Air Leak Detection: Methods, Signs and Costs' },
  'energy-efficient-piping': { title: 'Energy Efficient Piping: How Design Affects Energy Costs' },
  'corrosion-resistant-piping': { title: 'Corrosion Resistant Piping for Compressed Air' },
  'modular-piping-system': { title: 'What Is a Modular Piping System?' },
  'compressed-air-system-maintenance': { title: 'Compressed Air System Maintenance Checklist' },
  'modular-compressed-air-piping-installation': { title: 'Modular Compressed Air Piping Installation: Step by Step' },
  'air-pipe-sizing-guide': { title: 'Air Pipe Sizing Guide: Choose the Right Pipe Diameter' },
  'aluminium-vs-steel-compressed-air-pipe': { title: 'Aluminium vs Steel Compressed Air Pipe: Which Is Better?' },
  'aluminium-compressed-air': { title: 'Aluminium Compressed Air Piping System: A Complete Guide' },
  // case studies
  'performance-comparison-of-gi-piping-vs-aluminium-modular-piping-quickair': { title: 'GI vs Aluminium Modular Piping: Performance Comparison' },
  'leak-free-performance-of-quickair-modular-piping-system': { title: 'Leak-Free Performance of Quickair Modular Piping: Case Study' },
  'evolution-of-compressed-air-piping': { title: 'Evolution of Compressed Air Piping: Case Study' },
  'influence-of-piping-material-on-pressure-drop-and-air-quality': { title: 'Piping Material, Pressure Drop and Air Quality: Case Study' },
}

const PRODUCT = (slug) => `${ROUTES.products}/${slug}`

/**
 * Topic clusters. Each guide belongs to one; its page links to the cluster's
 * other guides and to the products and tools that fit the topic.
 */
export const CLUSTERS = [
  {
    id: 'systems',
    label: 'Compressed air piping systems',
    slugs: ['aluminium-compressed-air', 'compressed-air-piping', 'industrial-compressed-air-piping', 'compressed-air-distribution-system', 'modular-piping-system', 'modular-compressed-air-piping-installation', 'compressed-air-receiver-tank', 'air-piping-systems-suppliers'],
    links: [
      { label: 'Aluminium piping products', to: `${ROUTES.products}#aluminium` },
      { label: 'Design, supply and installation services', to: ROUTES.services },
      { label: 'Pipe size calculator', to: ROUTES.pipeSize },
    ],
  },
  {
    id: 'sizing',
    label: 'Pipe sizing and pressure drop',
    slugs: ['air-pipe-sizing-guide', 'compressed-air-pipe-size-chart-2', 'compressed-air-pressure-drop', 'compressed-air-flow-calculation', 'cfm-vs-psi-explaination'],
    links: [
      { label: 'Pipe size calculator', to: ROUTES.pipeSize },
      { label: 'Pressure drop calculator', to: ROUTES.pressureDrop },
      { label: 'Aluminium piping products', to: `${ROUTES.products}#aluminium` },
    ],
  },
  {
    id: 'leaks',
    label: 'Leaks, audits and energy costs',
    slugs: ['compressed-air-leak-detection', 'compressed-air-leaks-in-manufacturing', 'compressed-air-audit', 'pressure-drop-in-compressed-air-piping', 'energy-efficient-piping', 'compressed-air-system-maintenance'],
    links: [
      { label: 'Electricity cost calculator', to: ROUTES.electricityCost },
      { label: 'Pressure drop calculator', to: ROUTES.pressureDrop },
      { label: 'Case study: GI piping vs aluminium modular piping', to: `${ROUTES.caseStudies}/performance-comparison-of-gi-piping-vs-aluminium-modular-piping-quickair` },
    ],
  },
  {
    id: 'materials',
    label: 'Choosing a pipe material',
    slugs: ['aluminium-vs-steel-compressed-air-pipe', 'pvc-vs-aluminium-compressed-air-pipe', 'pvc-pipe-for-compressed-air', 'pex-compressed-air-piping-is-it-right-for-your-facility', 'stainless-steel-compressed-air-piping-when-to-use-it', 'corrosion-resistant-piping'],
    links: [
      { label: 'Push-fit aluminium piping with aluminium fittings', to: PRODUCT('push-fit-aluminium-to-aluminium') },
      { label: 'PEX piping with brass push-to-fit fittings', to: PRODUCT('pex-push-to-fit') },
      { label: 'Case study: piping material, pressure drop and air quality', to: `${ROUTES.caseStudies}/influence-of-piping-material-on-pressure-drop-and-air-quality` },
    ],
  },
  {
    id: 'fittings',
    label: 'Fittings and connectors',
    slugs: ['air-pipe-fittings', 'compressed-air-fittings', 'pipe-to-pipe-connector'],
    links: [
      { label: 'Push-fit aluminium piping with engineering plastic fittings', to: PRODUCT('push-fit-aluminium-to-engineering-plastic') },
      { label: 'Crimping type piping with integrated fittings', to: PRODUCT('crimping-type-integrated-fitting') },
      { label: 'Valves and actuators', to: `${ROUTES.products}#valves` },
    ],
  },
]

export const clusterOf = (slug) => CLUSTERS.find((cluster) => cluster.slugs.includes(slug))

/** Links shown at the end of every case study. */
export const CASE_STUDY_LINKS = [
  { label: 'Aluminium piping products', to: `${ROUTES.products}#aluminium` },
  { label: 'Design, supply and installation services', to: ROUTES.services },
  { label: 'Pressure drop calculator', to: ROUTES.pressureDrop },
]

/** Guides, case studies and tools that go with each product group (shown on product pages). */
export const PRODUCT_RESOURCES = {
  aluminium: [
    { label: 'Guide: aluminium compressed air piping systems', to: `${ROUTES.blog}/${PILLAR}` },
    { label: 'Guide: aluminium vs steel compressed air pipe', to: `${ROUTES.blog}/aluminium-vs-steel-compressed-air-pipe` },
    { label: 'Case study: GI piping vs aluminium modular piping', to: `${ROUTES.caseStudies}/performance-comparison-of-gi-piping-vs-aluminium-modular-piping-quickair` },
    { label: 'Pipe size calculator', to: ROUTES.pipeSize },
    { label: 'Pressure drop calculator', to: ROUTES.pressureDrop },
    { label: 'Design, supply and installation services', to: ROUTES.services },
  ],
  pex: [
    { label: 'Guide: is PEX compressed air piping right for your facility?', to: `${ROUTES.blog}/pex-compressed-air-piping-is-it-right-for-your-facility` },
    { label: 'Guide: air pipe sizing', to: `${ROUTES.blog}/air-pipe-sizing-guide` },
    { label: 'Pipe size calculator', to: ROUTES.pipeSize },
    { label: 'Aluminium piping products', to: `${ROUTES.products}#aluminium` },
  ],
  valves: [
    { label: 'Aluminium piping products', to: `${ROUTES.products}#aluminium` },
    { label: 'Guide: compressed air distribution systems', to: `${ROUTES.blog}/compressed-air-distribution-system` },
    { label: 'Design, supply and installation services', to: ROUTES.services },
  ],
  extrusions: [
    { label: 'About Canares Automation and in-house extrusion', to: `${ROUTES.about}#brief` },
    { label: 'Project gallery', to: ROUTES.gallery },
  ],
}

/**
 * In-article links that the published text points at the homepage or the blog
 * index. Each is sent to the page its anchor text describes; an article that
 * links its own topic to the homepage keeps the words and loses the link (null).
 * Keys are the article slug and the exact link text.
 */
const GUIDE = (slug) => `${ROUTES.blog}/${slug}`
export const LINK_FIXES = {
  'pressure-drop-in-compressed-air-piping': { 'A compressed air audit': GUIDE('compressed-air-audit') },
  'pvc-vs-aluminium-compressed-air-pipe': { 'Aluminium Compressed Air Piping System': GUIDE(PILLAR) },
  'compressed-air-audit': { 'Compressed Air Piping System': GUIDE('compressed-air-piping') },
  'compressed-air-receiver-tank': { 'Compressed Air Receiver Tank': null },
  'compressed-air-pressure-drop': { 'compressed air pressure drop': null },
  'pvc-pipe-for-compressed-air': { 'PVC pipe for compressed air': null },
  'compressed-air-pipe-size-chart-2': { 'compressed air pipe': GUIDE('compressed-air-piping') },
  'cfm-vs-psi-explaination': { 'air compressor': null },
  'compressed-air-distribution-system': { 'compressed air distribution system': null },
  'compressed-air-piping': { 'compressed air piping': null },
  'pex-compressed-air-piping-is-it-right-for-your-facility': { 'aluminium vs. steel piping': GUIDE('aluminium-vs-steel-compressed-air-pipe'), 'air system maintenance guide': GUIDE('compressed-air-system-maintenance') },
  'energy-efficient-piping': { 'compressed air pipe sizing guide': GUIDE('air-pipe-sizing-guide') },
  'corrosion-resistant-piping': { 'compressed air pipe sizing guide': GUIDE('air-pipe-sizing-guide') },
  'modular-piping-system': { 'compressed air pipe sizing guide': GUIDE('air-pipe-sizing-guide') },
  'aluminium-vs-steel-compressed-air-pipe': { 'Aluminium piping systems': GUIDE(PILLAR) },
}
