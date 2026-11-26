/** Quickair products, verbatim from https://www.quickair.in/products/ (crawled 18 Nov 2026). */

const CAT = '/qa/catalogues/'

export const productsIntro = {
  eyebrow: 'Quickair products',
  kicker: 'Explore Aluminium pipe fittings for compressed air',
  title: 'Aluminium pipe fittings for compressed air, vacuum & inert gases',
  lead: 'Quickair manufactures aluminium pipe fittings for compressed air, vacuum and inert gas systems, engineered and extruded entirely in-house for zero-leakage performance.',
  whyTitle: 'Why choose Quickair aluminium pipe fittings for compressed air?',
  mainCatalogue: CAT + 'quickair-aluminium-engineering-plastic-catalogue.pdf',
  photos: [
    { src: '/qa/products/quickair-aluminium-compressed-air-piping-installed-at-an-industrial-plant.jpg', alt: 'Quickair aluminium compressed air piping installed at an industrial plant' },
    { src: '/qa/products/quickair-modular-piping-connected-to-air-receiver-tanks.jpg', alt: 'Quickair modular piping connected to air receiver tanks' },
  ],
  stats: [
    { value: 'Up to 40 Bar', label: 'Working pressure, crimping type' },
    { value: '-20°C to 200°C', label: 'Temperature range' },
    { value: '29.32″ Hg', label: 'Vacuum rating, aluminium push fit' },
    { value: 'ISO · CE', label: 'Certificate and safety norms' },
  ],
  helpTitle: 'Not sure which system fits your plant?',
  helpText: 'For other fluids and gases, or help choosing the right piping, valves or actuators, please contact us.',
  enquiryEyebrow: 'Enquiry',
  enquiryTitle: 'Tell us what you need',
  enquiryLead: 'Send a few details and we will come back with a suggestion and a quote.',
}

const PUSH_FIT_SPECS = [
  ['Application', 'Compressed air, vacuum, nitrogen, argon (other fluids and gases, please contact us)'],
  ['Connection type', 'Push fit type'],
  ['Maximum working pressure', 'Up to 20 Bar'],
  ['Vacuum', '29.32″ Hg'],
  ['Temperature', '-20°C to 200°C'],
  ['Design standards', 'ASME B 31.1/3'],
  ['Alloy', 'Aluminium alloy 6063 T5'],
  ['Tolerance', 'Std IS2763, IS3965, EN 755-2'],
  ['Colour', 'Blue (RAL 5012) / anodized, other colour on request'],
  ['Surface finish', '60 micron'],
]
const PUSH_FIT_KEY = [['Max pressure', 'Up to 20 Bar'], ['Temperature', '-20°C to 200°C'], ['Alloy', '6063 T5'], ['Colour', 'Blue RAL 5012']]

/** Compressed air piping first (aluminium, PEX, valves); allied products (extrusions, ESD) last. */
export const groups = [
  {
    id: 'aluminium',
    filter: 'Aluminium piping',
    eyebrow: 'Aluminium piping',
    title: 'Modular aluminium piping',
    lead: 'Push fit and crimping systems for compressed air, vacuum, nitrogen and argon. For other fluids and gases, please contact us.',
  },
  { id: 'pex', filter: 'PEX', eyebrow: 'PEX piping', title: 'Modular PEX with brass fitting', lead: 'The Quickpex push-to-fit system for compressed air and inert gases.' },
  {
    id: 'valves',
    filter: 'Valves & actuators',
    eyebrow: 'Valves and actuators',
    title: 'Valves, actuators and automation',
    lead: 'Protork ball and butterfly valves, Torquemate pneumatic actuators and valve automation systems.',
  },
  {
    id: 'extrusions',
    filter: 'Extrusions & ESD',
    eyebrow: 'Allied products: extrusions and ESD',
    title: 'Aluminium extrusions and ESD prevention',
    lead: 'Profiles and accessories for frameworks and cleanrooms, plus electrostatic discharge protection products.',
  },
]

export const products = [
  {
    slug: 'push-fit-aluminium-to-engineering-plastic',
    group: 'aluminium',
    tag: 'Aluminium',
    name: 'Push Fit Type',
    variant: 'Aluminium to engineering plastic',
    image: { src: '/qa/products/modular-aluminium-piping-for-compressed-air-push-fit-type-aluminium-to-engineering-plastic.jpg', alt: 'Modular Aluminium Piping for compressed air, Push fit type · Aluminium to engineering plastic' },
    key: PUSH_FIT_KEY,
    specs: PUSH_FIT_SPECS,
    catalogue: CAT + 'quickair-aluminium-engineering-plastic-catalogue.pdf',
    diagram: 'push-fit',
  },
  {
    slug: 'push-fit-aluminium-to-aluminium',
    group: 'aluminium',
    tag: 'Aluminium',
    name: 'Push Fit Type',
    variant: 'Aluminium to aluminium',
    image: { src: '/qa/products/modular-aluminium-piping-for-compressed-air-push-fit-type-aluminium-to-aluminium.jpg', alt: 'Modular Aluminium Piping for compressed air, Push fit type · Aluminium to aluminium' },
    key: PUSH_FIT_KEY,
    specs: PUSH_FIT_SPECS,
    catalogue: CAT + 'aluminium-with-aluminium-fittings.pdf',
    diagram: 'push-fit',
  },
  {
    slug: 'crimping-type-integrated-fitting',
    group: 'aluminium',
    tag: 'Aluminium',
    name: 'Crimping Type',
    variant: 'Integrated fitting',
    image: { src: '/qa/products/modular-aluminium-piping-for-compressed-air-crimping-type-integrated-fitting.jpg', alt: 'Modular Aluminium Piping for compressed air, Crimping type · Integrated fitting' },
    key: [['Max pressure', 'Up to 40 Bar'], ['Temperature', '-20°C to 200°C'], ['Body', 'Aluminium, PA6 end'], ['Finish', 'Powder coated / anodized']],
    specs: [
      ['Material of construction', 'Aluminium body (Quickair), PA6 end connector'],
      ['Connection type', 'Integrated fitting type'],
      ['Certificate', 'ISO'],
      ['Maximum working pressure', 'Up to 40 Bar'],
      ['Plant testing pressure (1 hr @ 20°C)', '1.5 times the working pressure'],
      ['Quality testing pressure (1 hr @ 20°C)', '60 Bar'],
      ['O-ring and lip gasket', 'HNBR / EPDM / Viton (optional)'],
      ['Temperature', '-20°C to 200°C'],
      ['Grab ring', 'Spring steel'],
      ['Thread standard', 'BSP (Metric) / NPT'],
      ['Body surface treatment', 'Powder coated / anodized'],
      ['Safety norms', 'CE'],
    ],
    catalogue: CAT + 'al-crimping-grooving.pdf',
    diagram: 'crimping',
  },
  {
    slug: 'pex-push-to-fit',
    group: 'pex',
    tag: 'PEX',
    name: 'Push-to-Fit Type',
    variant: 'Sizes 20, 25, 32 mm',
    image: { src: '/qa/products/quickpex-pex-pipe-with-brass-push-to-fit-fitting.webp', alt: 'Modular PEX with Brass Fitting for compressed air, Push-to-fit type · Sizes 20, 25, 32 mm' },
    key: [['Max pressure', 'Up to 12 Bar'], ['Service temperature', '90°C continuous'], ['Fitting', 'Brass (Quickpex)'], ['Sizes', '20, 25, 32 mm']],
    specs: [
      ['Size', '20, 25, 32 mm'],
      ['Material of construction', 'Brass fitting (Quickpex)'],
      ['Connection type', 'Push to fit type'],
      ['Certificate', 'ISO'],
      ['Maximum working pressure', 'Up to 12 Bar'],
      ['Plant testing pressure (1 hr @ 20°C)', '1.5 times the working pressure'],
      ['Quality testing pressure (1 hr @ 20°C)', '18 Bar'],
      ['Continuous service temperature limit', '90°C'],
      ['Maximum peak temperature', '90°C'],
      ['O-ring and lip gasket', 'HNBR / EPDM'],
      ['Thread standard', 'BSP (Metric) / NPT'],
      ['Safety norms', 'CE'],
    ],
    catalogue: CAT + 'pex.pdf',
  },
  {
    slug: 'aluminium-extrusions',
    group: 'extrusions',
    tag: 'Extrusions',
    name: 'Aluminium Extrusions Products',
    features: [
      'Applications: structural frameworks, cleanrooms, assembly systems.',
      'Profile series: 20, 30, 40, 45, 50, 60, 80, 90, 100.',
      'Materials: corrosion-resistant aluminium extrusions.',
      'Standards: ISO 9001:2015.',
      'Accessories: bolts, brackets, connectors, nuts, joints.',
      'HEPA-filtered clean booth systems for pharmaceuticals and electronics.',
      'Load and deflection guides for profile selection.',
      'Customizable modular designs for versatile applications.',
    ],
    catalogue: CAT + 'aluminium-profile-catalogue-20-12-16-0.pdf',
  },
  {
    slug: 'esd-prevention',
    group: 'extrusions',
    tag: 'ESD',
    name: 'Electro Static Discharge Prevention (ESD)',
    features: [
      'Applications: electronics assembly, cleanrooms.',
      'Surface resistance: 10³ to 10⁹ Ohm for static dissipation.',
      'Materials: antistatic plastics, stainless steel, PVC, polyester.',
      'Standards: ISO 9001:2015, ESD-compliant.',
      'Products: PCB trays, crates, wrist straps, ESD shoes, mats, resistivity meters.',
      'Focus: component protection, worker safety, cleanroom compatibility.',
      'Testing equipment: surface resistivity meters, wrist strap and footwear testers.',
    ],
    catalogue: CAT + 'electro-static-discharge-prevention.pdf',
  },
  ...[
    {
      slug: 'protork-a300-m300-ball-valves',
      name: 'Protork A 300 & M 300 Series Ball Valves',
      features: ['3-piece design for easy maintenance', 'Regular and full bore options (1/4″ to 4″)', 'Temperature range: -30°C to 300°C', 'Materials: WCB, CF8, CF8M', 'Fire-safe design per API 607', 'Manual or actuated operation', 'Special variants: diverter and cryogenic valves'],
    },
    {
      slug: 'torquemate-pneumatic-actuators',
      name: 'Torquemate Pneumatic Actuators',
      features: ['Double-acting and spring-return configurations', 'Extruded aluminium body for corrosion resistance', 'Meets NAMUR and ISO standards', 'Modular spring packs for easy conversion', 'Compatible with limit switches and positioners', 'Torque outputs for small to large valves'],
    },
    {
      slug: 'protork-a600-a800-ball-valves',
      name: 'Protork A600 & A800 Series Ball Valves',
      features: ['#600 flanged and #800 screwed / socket / butt weld ends', 'Regular and full bore options (1/4″ to 4″)', 'Materials: CF8, CF8M, WCB', 'Fire-safe design per API 607', 'Antistatic devices for safety', 'Locking mechanisms to prevent accidental movement', 'ISO 5211 compliant for actuation'],
    },
    {
      slug: 'protork-as-at-ball-valves',
      name: 'Protork AS 150, AS 300, AT 150 & AT 300 Series Ball Valves',
      features: ['2-piece flanged design', 'Regular and full bore options (1/2″ to 8″)', 'Materials: CF8, CF8M, WCB, Duplex', 'Seat options: PTFE, PEEK', 'Meets ASME B16.5 and API 607 standards', 'Hand, gear, pneumatic or electric actuation'],
    },
    {
      slug: 'protork-bfv-butterfly-valves',
      name: 'Protork BFV Series Butterfly Valves',
      features: ['Wafer butterfly valve design', 'Sizes: 25 mm to 600 mm (larger on request)', 'Pressure ratings: PN 10/16', 'Temperature range: -20°C to 180°C', 'Materials: cast iron, CF8, CF8M', 'Single-stem design for reliability', 'API 609 compliant', 'Lever, gear, pneumatic or electric actuation'],
    },
    {
      slug: 'protork-valve-automation-system',
      name: 'Protork Valve Automation System',
      features: ['Turnkey automation with PLC and SCADA', 'Ball valves (#150, #300, #800) and butterfly valves', 'Pneumatic and electric actuators', 'Limit switch boxes and positioners', 'Valve manifolds for modular control', 'Remote control and monitoring', 'Safety systems with automatic shutdown'],
    },
  ].map((valve) => ({ ...valve, group: 'valves', tag: 'Valves', catalogue: CAT + '30-08-ball-valve-2page-catalogue-2-1.pdf' })),
]

export const getProduct = (slug) => {
  const product = products.find((p) => p.slug === slug)
  return product && { ...product, ...PRODUCT_SEO[slug], seo: PRODUCT_SEO[slug] }
}
export const productsIn = (groupId) => products.filter((p) => p.group === groupId)
export const fullName = (p) => (p.variant ? `${p.name} · ${p.variant}` : p.name)

/**
 * Search title, search description and brand for each product page.
 * Every figure repeats the product's own specification or feature list above.
 * `madeInHouse` marks the products the site says Canares manufactures itself
 * (modular aluminium pipe fittings; aluminium extrusions from the in-house plant).
 */
export const PRODUCT_SEO = {
  "push-fit-aluminium-to-engineering-plastic": { madeInHouse: true, brand: "Quickair", title: "Push-Fit Aluminium Air Piping, Engineering Plastic Fittings", description: "Quickair push-fit aluminium piping with engineering plastic fittings for compressed air, vacuum, nitrogen and argon. Up to 20 Bar, alloy 6063 T5." },
  "push-fit-aluminium-to-aluminium": { madeInHouse: true, brand: "Quickair", title: "Push-Fit Aluminium Air Piping with Aluminium Fittings", description: "Quickair push-fit aluminium piping with all-aluminium fittings for compressed air, vacuum, nitrogen and argon. Up to 20 Bar, -20°C to 200°C." },
  "crimping-type-integrated-fitting": { madeInHouse: true, brand: "Quickair", title: "Crimping Type Aluminium Piping with Integrated Fitting", description: "Quickair crimping type aluminium piping with integrated fittings: up to 40 Bar working pressure, quality tested at 60 Bar, -20°C to 200°C, BSP or NPT threads." },
  "pex-push-to-fit": { brand: "Quickpex", title: "PEX Compressed Air Piping with Brass Push-to-Fit Fittings", description: "Quickpex modular PEX piping with brass push-to-fit fittings for compressed air and inert gases. Sizes 20, 25 and 32 mm, up to 12 Bar, 90°C continuous service." },
  "aluminium-extrusions": { madeInHouse: true, title: "Aluminium Extrusion Profiles and Accessories", description: "Aluminium extrusion profiles in series 20 to 100, with bolts, brackets, connectors and joints, for structural frameworks, cleanrooms and assembly systems." },
  "esd-prevention": { title: "ESD Prevention Products for Electronics Assembly", description: "ESD prevention products: PCB trays, crates, wrist straps, ESD shoes, mats and resistivity meters for electronics assembly and cleanrooms." },
  "protork-a300-m300-ball-valves": { brand: "Protork", title: "Protork A 300 & M 300 Series 3-Piece Ball Valves", description: "Protork A 300 and M 300 series 3-piece ball valves: regular and full bore from 1/4″ to 4″, -30°C to 300°C, in WCB, CF8 and CF8M, fire-safe design per API 607." },
  "torquemate-pneumatic-actuators": { brand: "Torquemate", title: "Torquemate Pneumatic Actuators: Double-Acting, Spring-Return", description: "Torquemate pneumatic actuators in double-acting and spring-return configurations, with extruded aluminium bodies, built to NAMUR and ISO standards." },
  "protork-a600-a800-ball-valves": { brand: "Protork", title: "Protork A600 & A800 Series Ball Valves", description: "Protork A600 and A800 series ball valves: #600 flanged and #800 screwed, socket or butt weld ends, 1/4″ to 4″, in CF8, CF8M and WCB, fire-safe per API 607." },
  "protork-as-at-ball-valves": { brand: "Protork", title: "Protork AS & AT Series 2-Piece Flanged Ball Valves", description: "Protork AS 150, AS 300, AT 150 and AT 300 series 2-piece flanged ball valves, 1/2″ to 8″, in CF8, CF8M, WCB and Duplex, to ASME B16.5 and API 607." },
  "protork-bfv-butterfly-valves": { brand: "Protork", title: "Protork BFV Series Wafer Butterfly Valves", description: "Protork BFV series wafer butterfly valves from 25 mm to 600 mm, PN 10/16, -20°C to 180°C, in cast iron, CF8 and CF8M. API 609 compliant." },
  "protork-valve-automation-system": { brand: "Protork", title: "Protork Valve Automation System with PLC and SCADA", description: "Protork valve automation: turnkey PLC and SCADA control with ball and butterfly valves, pneumatic and electric actuators, limit switch boxes and positioners." },
}

/** /about/ "product range" pairs: range + quality statement */
export const productRanges = [
  { name: 'AP & AA Series', text: 'Advanced modular piping systems for compressed air and industrial gases, featuring zero-leakage push-to-fit fittings and rapid installation.' },
  { name: 'SP & SA Series', text: 'High-pressure piping solutions engineered for durability, compliant with Indian and European standards.' },
  { name: 'E Series PEX', text: 'Cross-linked polyethylene pipes in blue, white, and yellow for air, gas, and water lines, supporting recirculation up to 140°F.' },
  { name: 'Manifolds & Valves', text: 'Precision manifolds and valves for optimal flow control and system reliability.' },
  { name: 'Tools & Accessories', text: 'Tools, clips, and wall brackets for seamless installation and maintenance of piping systems.' },
  { name: 'Quickair™ Fittings', text: 'Leak-resistant plastic fittings with O-ring seals, offering compression-based installation without special tools.' },
]

export const qualityPoints = [
  { name: 'Industry-Proven Quality', text: 'Quickair products are engineered for reliable performance in industrial compressed air and piping applications.' },
  { name: 'Precision Manufacturing', text: 'Each component is manufactured with high accuracy to ensure leak-free fitment and long service life.' },
  { name: 'Quick Installation System', text: 'Designed for fast, hassle-free installation, reducing downtime and labor costs.' },
  { name: 'Quality Assurance Standards', text: 'Every Quickair product undergoes strict quality checks before dispatch.' },
  { name: 'Cost-Effective Solutions', text: 'Long-lasting products that reduce maintenance and replacement costs.' },
  { name: 'Reliable Technical Support', text: 'Backed by expert guidance for product selection and application support.' },
]

/**
 * Labelled parts for the interactive joint diagrams. Every value comes from
 * the specification tables above.
 */
export const jointParts = {
  'push-fit': [
    { id: 'pipe', label: 'Pipe', value: 'Aluminium alloy 6063 T5', note: 'Blue (RAL 5012) / anodized, 60 micron surface finish' },
    { id: 'body', label: 'Fitting', value: 'Push fit type', note: 'Aluminium to engineering plastic, or aluminium to aluminium' },
    { id: 'seal', label: 'Pressure', value: 'Up to 20 Bar', note: 'Vacuum 29.32″ Hg' },
    { id: 'bore', label: 'Media', value: 'Compressed air, vacuum, nitrogen, argon', note: '-20°C to 200°C' },
    { id: 'std', label: 'Standards', value: 'ASME B 31.1/3', note: 'Tolerance: Std IS2763, IS3965, EN 755-2' },
  ],
  crimping: [
    { id: 'body', label: 'Body', value: 'Aluminium body (Quickair)', note: 'Powder coated / anodized' },
    { id: 'end', label: 'End connector', value: 'PA6', note: 'Integrated fitting type' },
    { id: 'seal', label: 'O-ring and lip gasket', value: 'HNBR / EPDM / Viton (optional)', note: '' },
    { id: 'ring', label: 'Grab ring', value: 'Spring steel', note: '' },
    { id: 'thread', label: 'Thread standard', value: 'BSP (Metric) / NPT', note: '' },
    { id: 'bore', label: 'Pressure', value: 'Up to 40 Bar', note: 'Quality tested at 60 Bar for 1 hr @ 20°C' },
  ],
}
