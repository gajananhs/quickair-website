/** Single source of truth for routes, navbar menus and footer links. */
import { groups } from './products'

export const ROUTES = {
  home: '/',
  about: '/about',
  products: '/products',
  services: '/services',
  calculators: '/calculators',
  pipeSize: '/calculators/pipe-size',
  pressureDrop: '/calculators/pressure-drop',
  electricityCost: '/calculators/electricity-cost',
  gallery: '/gallery',
  caseStudies: '/case-studies',
  blog: '/blog',
  downloads: '/downloads',
  dealers: '/dealers',
  contact: '/contact',
}

/** Mirrors the Quickair menu (Home, About, Products, Calculator, Dealer-Registration, Gallery, Blog, Contact). */
export const mainNav = [
  { label: 'Home', to: ROUTES.home },
  { label: 'About', to: ROUTES.about },
  {
    label: 'Products',
    to: ROUTES.products,
    children: [
      { label: 'All products', to: ROUTES.products, note: 'Piping, PEX, extrusions, valves' },
      ...groups.map((g) => ({ label: g.filter, to: `${ROUTES.products}#${g.id}`, note: g.title })),
      { label: 'Services', to: ROUTES.services, note: 'Design, supply, installation, testing' },
    ],
  },
  {
    label: 'Calculator',
    to: ROUTES.calculators,
    children: [
      { label: 'Pipe Size & Pressure Drop', to: ROUTES.pipeSize, note: 'Recommended Quickair pipe size' },
      { label: 'Pressure Drop', to: ROUTES.pressureDrop, note: 'By material, medium and diameter' },
      { label: 'Electricity Power', to: ROUTES.electricityCost, note: 'Running cost of pressure loss' },
    ],
  },
  { label: 'Gallery', to: ROUTES.gallery },
  {
    label: 'Resources',
    to: ROUTES.blog,
    children: [
      { label: 'Blog', to: ROUTES.blog, note: 'Guides on compressed air piping' },
      { label: 'Case studies', to: ROUTES.caseStudies, note: 'Results from Quickair installations' },
      { label: 'Downloads', to: ROUTES.downloads, note: 'Product catalogues (PDF)' },
      { label: 'Dealers', to: ROUTES.dealers, note: 'Join the dealer network' },
    ],
  },
  { label: 'Contact', to: ROUTES.contact },
]

export const primaryCta = { label: 'Get a quote', to: ROUTES.contact }

export const footerNav = [
  {
    title: 'Links',
    links: [
      { label: 'Home', to: ROUTES.home },
      { label: 'About Us', to: ROUTES.about },
      { label: 'Products', to: ROUTES.products },
      { label: 'Services', to: ROUTES.services },
      { label: 'Gallery', to: ROUTES.gallery },
      { label: 'Contact', to: ROUTES.contact },
    ],
  },
  {
    title: 'Calculator',
    links: [
      { label: 'Pipe Size & Pressure Drop', to: ROUTES.pipeSize },
      { label: 'Pressure Drop Calculator', to: ROUTES.pressureDrop },
      { label: 'Electricity Power Calculator', to: ROUTES.electricityCost },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: ROUTES.blog },
      { label: 'Case studies', to: ROUTES.caseStudies },
      { label: 'Downloads', to: ROUTES.downloads },
      { label: 'Dealers', to: ROUTES.dealers },
    ],
  },
]
