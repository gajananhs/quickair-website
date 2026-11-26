/**
 * Quickair company facts, verbatim from https://www.quickair.in (crawled 18 Nov 2026).
 * Source of truth: CONTENT_INVENTORY.md. Edit here, never inside components.
 *
 * Note: Quickair is the modular piping brand of Canares Automation Pvt. Ltd.
 * The legal entity, address and e-mail addresses below are the ones the
 * Quickair site itself publishes.
 */

export const company = {
  brand: 'Quickair',
  siteName: 'Quickair',
  legalName: 'Canares Automation Pvt. Ltd.',
  tagline: 'Quick. Modular. Efficient.',
  summary: 'Quickair is the modular piping brand of Canares Automation Pvt. Ltd. We give industry end-to-end engineering support for compressed air, vacuum and industrial gases.',
  metaDescription: 'Quickair aluminium compressed air piping: modular push-fit pipes and fittings for compressed air, vacuum and industrial gases. 26+ years of modular piping experience.',
  phone: '9449840507',
  phoneDisplay: '+91 94498 40507',
  phoneHref: 'tel:+919449840507',
  officePhone: '080-23578010',
  officePhoneHref: 'tel:+918023578010',
  officePhones: ['080-23578010', '080-23578012', '080-23578014', '080-23578016'],
  whatsapp: 'https://wa.me/919449840507',
  email: 'sales@canares.com',
  emails: ['sales@canares.com', 'mahesh@canares.com'],
  address: {
    oneLine: 'Plot No. 85/0, Industrial Suburb, Industrial Layout, Yeshwanthpur, Bengaluru, Karnataka 560022, India.',
    short: 'Yeshwanthpur, Bengaluru',
    region: 'Karnataka 560022, India',
    mapLabel: '85 A, Gate no 6, Mahalakshmi Layout, APMC Yard, Yeshwanthpur, Bengaluru 560022',
    mapUrl: 'https://maps.google.com/maps?q=85%20A%2C%20Gate%20no%206%2C%20Mahalakshmi%20Layout%2C%20APMC%20Yard%2C%20Yeshwanthpur%20Industrial%20Suburb%2C%20Yeswanthpur%2C%20Bengaluru%2C%20Karnataka%20560022',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.21323144134!2d77.54094817454731!3d13.022089013770346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d8bf9bb14fb%3A0x18d1920a427d2edf!2sCanares%20Automation%20Pvt%20Ltd!5e0!3m2!1sen!2sin',
  },
  dealerRegistrationUrl: 'https://app.quickair.in/dealer-registration.php',
  social: [
    { label: 'YouTube', href: 'https://youtu.be/RZYnPhbRzBM' },
    { label: 'Instagram', href: 'https://www.instagram.com/gopicanares/' },
  ],
}

export const telHref = (n) => 'tel:' + n.replace(/[^\d+]/g, '')

/** Homepage statistics */
export const stats = [
  { value: '26+', label: 'years of modular piping experience' },
  { value: 'Largest', label: 'manufacturer of modular pipes and systems in India' },
  { value: '5', label: 'countries served: India, USA, Australia, Germany and Serbia' },
  { value: 'PAN-India', label: 'dealer network with technical support from enquiry to installation' },
]

/** Homepage hero slides (campaign banners with their original wording) */
export const heroSlides = [
  {
    src: '/qa/home/aluminium-compressed-air-piping-system-leak-free-modular-reliable-26-years-of-experience.webp',
    alt: 'Aluminium compressed air piping system. Leak-free, modular, reliable. 26+ years of experience.',
    title: 'Aluminium compressed air piping system',
    text: 'Leak-free. Modular. Reliable.',
  },
  {
    src: '/qa/home/faster-installation-no-welding-cut-push-run-push-fit-modular-pipes-that-your-team-can-install-wi.webp',
    alt: 'Faster installation, no welding. Cut. Push. Run. Push-fit modular pipes that your team can install with basic tools.',
    title: 'Faster installation, no welding',
    text: 'Cut. Push. Run. Push-fit modular pipes that your team can install with basic tools.',
  },
  {
    src: '/qa/home/industrial-compressed-air-system-efficient-air-generation-storage-and-distribution-leak-free-mod.webp',
    alt: 'Industrial compressed air system. Efficient air generation, storage and distribution. Leak-free, modular, high pressure tolerance, lightweight and durable.',
    title: 'Industrial compressed air system',
    text: 'Efficient air generation, storage and distribution. Leak-free, modular, high pressure tolerance, lightweight and durable.',
  },
]

export const intro = {
  title: 'Quick. Modular. Efficient.',
  text: company.summary,
  points: ['India\'s only manufacturer of modular pipe fittings', 'Cost-effective, energy-efficient, high-performance systems', 'Over two decades of modular piping innovation'],
  cta: 'Read our company brief',
  image: { src: '/qa/home/quickair-blue-aluminium-compressed-air-piping-installed-in-a-factory.jpg', alt: 'Quickair blue aluminium compressed air piping installed in a factory' },
  badge: { value: '26+', label: 'years of modular piping experience' },
  /** From the earlier homepage (/home/) */
  extra: [
    'Quickair’s aluminium compressed air piping system delivers end-to-end engineering support — we’re India’s largest manufacturer of modular pipes & systems.',
    'Canares Automation Pvt. Ltd. has been at the forefront of modular piping innovations for over two decades. As India’s only manufacturer of modular pipe fittings, we specialize in providing cost-effective, energy-efficient, and high-performance piping solutions for global industries.',
    'We are setting an Global benchmark in terms of product, quality and services across INDIA, USA , AUSTRALIA, GERMANY, SERBIA .',
  ],
}

/** "Why plants switch from steel to aluminium" */
export const comparison = {
  title: 'Why plants switch from steel to aluminium',
  lead: 'Galvanised and black steel pipes rust from the inside, shed scale into your tools and leak at every threaded joint. Aluminium does not.',
  columns: ['What you care about', 'Steel (GI / black)', 'Quickair aluminium'],
  rows: [
    ['Corrosion and scale', 'Rusts inside over time', 'Corrosion-resistant bore'],
    ['Joints', 'Threaded or welded', 'Push-fit modular connections'],
    ['Installation', 'Skilled fitters, hot work', 'Basic tools, no welding'],
    ['Weight', 'Heavy, needs strong supports', 'Light, easy to hang'],
    ['Changing the layout', 'Cut and re-weld', 'Unscrew, extend, reconnect'],
    ['Airflow', 'Roughness grows with rust', 'Smooth bore stays smooth'],
  ],
  steelLabel: 'Steel (GI / black)',
  aluminiumLabel: 'Quickair aluminium',
}

/** "Complete modular piping from one manufacturer" */
export const system = {
  title: 'Complete modular piping from one manufacturer',
  lead: 'Pipes, fittings, valves and accessories are made to work together, so lines go in fast and stay easy to change.',
  photos: [
    { src: '/qa/home/quickair-piping-connected-to-a-compressor.jpg', alt: 'Quickair piping connected to a compressor', caption: 'Compressor' },
    { src: '/qa/home/compressor-line-with-valves-and-drop-legs.jpg', alt: 'Compressor line with valves and drop legs', caption: 'Compressor' },
    { src: '/qa/home/quickair-elbow-and-clamp-assembly.jpg', alt: 'Quickair elbow and clamp assembly', caption: 'Elbows and clamps' },
  ],
  families: [
    { name: 'Aluminium modular piping', text: 'The core Quickair system for compressed air, vacuum and gases.', to: '/products#aluminium' },
    { name: 'SS and PEX modular piping', text: 'Modular systems in stainless steel and PEX for other media and conditions.', to: '/products#pex' },
    { name: 'Valves and actuators', text: 'Isolation and control for each section of your line.', to: '/products#valves' },
    { name: 'Aluminium extrusions and accessories', text: 'Profiles and accessories for supports and workstations.', to: '/products#extrusions' },
    { name: 'Office pods and acoustic booths', text: 'Modular enclosures from the same engineering team.', to: '/contact' },
    { name: 'Conveyors and ESD workstations', text: 'Production-floor furniture and handling built on aluminium profiles.', to: '/products#extrusions' },
  ],
  fittings: ['End caps', 'Equal and reduced elbows', 'Equal and reduced tees', 'Reducers', 'Pipe-to-pipe connectors', 'Male and female thread connectors', '45° angle elbows', 'Droplets'],
}

/** "From enquiry to running air" */
export const process = {
  title: 'From enquiry to running air',
  steps: [
    { title: 'Share your floor plan', text: 'Send a drawing, a photo or just the machine locations and your compressor details.' },
    { title: 'Get a layout and quote', text: 'We route the main line and drops and send a parts list with pricing.' },
    { title: 'Receive the kit', text: 'Pipes, fittings and brackets arrive packed by section, ready to install.' },
    { title: 'Install and test', text: 'Your team or our installer fits the system, then pressure-tests every joint.' },
  ],
}

/** "Trusted by plants across India" */
export const clients = {
  title: 'Trusted by plants across India',
  logos: ['HAL', 'Emmvee', 'BHEL', 'Toyota', 'Tata', 'Schneider Electric', 'Reliance', 'JLL', 'Intel', 'IFB', 'Foxconn', 'Emerson', 'Bosch', 'Biocon', 'Autoliv', 'Anthem', 'Alstom'].map((name) => ({
    name,
    src: `/qa/clients/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`,
  })),
}

export const testimonials = [
  { quote: 'The modular design made future expansion easy, and pressure loss has reduced significantly. The team was responsive and supportive throughout the project.', author: 'Rajendra', org: 'ITC' },
  { quote: 'Quick air piping delivers consistent air pressure across all production lines. The quality of the fittings and joints is excellent.', author: 'Vikram', role: 'Senior Engineer', org: 'Tata Hitachi' },
  { quote: 'The absence of welding and threading made the process clean and safe. It was installed much faster than traditional piping.', author: 'Kevin', org: 'ITC' },
]

/** "Join the Canares dealer network" */
export const dealerNetwork = {
  title: 'Join the Canares dealer network',
  lead: 'Partner with Canares and grow in the compressed air and modular piping industry.',
  points: ['Dealer pricing on premium aluminium pipes and fittings', 'PAN-India technical support for quotations, planning and execution', 'Product and installation training for you and your team'],
  note: 'We support you at every stage—from enquiry to installation.',
  cta: 'Become a dealer or distributor',
  image: { src: '/qa/home/quickair-piping-installed-by-canares-dealers-across-india.jpg', alt: 'Quickair piping installed by Canares dealers across India' },
  badge: { value: 'PAN-India', label: 'dealer network with technical support' },
}

/** Enquiry form ("Tell us about your air line") */
export const enquiry = {
  title: 'Tell us about your air line',
  lead: 'Send a few details and we will come back with a layout suggestion and a quote.',
  needLabel: 'What do you need?',
  types: ['New piping installation', 'Replace old steel pipes', 'Extend an existing line', 'Dealer or distributor enquiry', 'Not sure yet'],
  productTypes: ['Aluminium piping', 'PEX piping', 'Aluminium extrusions', 'ESD products', 'Valves and actuators', 'Catalogue or other'],
  detailsPlaceholder: 'Pipe length, pressure, number of drops',
  submit: 'Send enquiry',
  success: 'Thanks! WhatsApp is opening with your enquiry.',
}

/** /contact/ */
export const contact = {
  eyebrow: 'Contact · Quickair',
  title: 'Let’s plan your aluminium piping system',
  lead: 'Reach the Canares Automation team for quotes, dealer enquiries, or technical support. Delivering excellence with a strong PAN India presence.',
  cards: [
    { label: 'Get in touch', lines: company.emails.map((e) => ({ text: e, href: `mailto:${e}` })) },
    { label: 'Sales line', lines: [{ text: company.phone, href: company.phoneHref }], note: 'Quotes & product enquiries' },
    { label: 'Head office', lines: [{ text: company.address.short, href: '#visit' }], note: company.address.region },
  ],
  visitEyebrow: 'Head office',
  visitTitle: 'Visit Canares Automation',
  visitLead: 'Our headquarters in Bengaluru’s Yeshwanthpur industrial suburb.',
  formTitle: 'Request a quote',
  formTypes: ['Quote', 'Dealer enquiry', 'Technical support'],
  zonesEyebrow: 'Regional contacts',
  zonesTitle: 'Our zones across India',
  zonesLead: 'Connect directly with your regional sales lead.',
  zones: [
    { zone: 'West Zone', person: 'Prem Kumar', email: 'premkumar@canares.com', phone: '+91 94498 40523' },
    { zone: 'North Zone', person: 'Ramji Pandey', email: 'ramji@canares.com', phone: '+91 97200 04525' },
    { zone: 'East Zone', person: 'Harishiv', email: 'harishivdixit@canares.com', phone: '+91 94498 40513' },
    { zone: 'South Zone', person: 'Mahesh', email: 'mahesh@canares.com', phone: '+91-9449840509' },
  ],
  mapEyebrow: 'Find us',
  mapTitle: 'Office location',
  closing: 'Delivering Excellence With A Strong PAN India Presence',
}
