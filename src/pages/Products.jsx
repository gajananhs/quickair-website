import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Mail, Phone } from 'lucide-react'
import { groups, productsIn, productsIntro, fullName } from '@/data/products'
import { company, enquiry } from '@/data/company'
import { gsap, prefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/cn'
import { Button, Eyebrow, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ContactCta from '@/components/sections/ContactCta'
import SystemExplorer from '@/components/sections/SystemExplorer'
import JointDiagram from '@/components/sections/JointDiagram'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import ImageReveal from '@/components/motion/ImageReveal'
import Tilt from '@/components/motion/Tilt'

const THEMES = { aluminium: 'light', pex: 'alu', extrusions: 'light', valves: 'alu' }

/** Product with a photo and key figures (piping systems). `wide`: photo beside the details (a category's only card). */
function SystemCard({ product, wide = false }) {
  return (
    <Tilt as="article" className={cn('flex flex-col overflow-hidden rounded-card bg-white shadow-card-light', wide && 'md:grid md:grid-cols-[2fr_3fr]')}>
      <Link to={`/products/${product.slug}`} className={cn('group relative aspect-[16/10] overflow-hidden border-b border-(--line) bg-white', wide && 'md:aspect-auto md:border-r md:border-b-0')}>
        <img src={product.image.src} alt={product.image.alt} loading="lazy" className="absolute inset-0 size-full object-contain p-5 transition-transform duration-700 ease-out-expo group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <span className="font-display text-eyebrow font-semibold uppercase text-(--accent)">{product.tag}</span>
        <h3 className="mt-2 font-display text-xl leading-tight font-semibold tracking-tight">
          <Link to={`/products/${product.slug}`} className="transition-colors hover:text-(--accent)">{product.name}</Link>
        </h3>
        <p className="mt-1 text-sm text-(--fg-muted)">{product.variant}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-5 border-t border-(--line)">
          {product.key.map(([label, value]) => (
            <div key={label} className="border-b border-(--line) py-2.5">
              <dt className="text-xs text-(--fg-muted)">{label}</dt>
              <dd className="mt-0.5 font-display text-sm font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-wrap gap-x-6 pt-3">
          <Link to={`/products/${product.slug}`} className="group/l inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--accent)">
            Full specifications <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover/l:translate-x-1" aria-hidden="true" />
          </Link>
          <a href={product.catalogue} download className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--fg-muted) hover:text-(--accent)">
            <Download className="size-4" aria-hidden="true" /> Download catalogue
          </a>
        </div>
      </div>
    </Tilt>
  )
}

/** Product described by a feature list (extrusions, ESD, valves). */
function FeatureRow({ product, index }) {
  return (
    <Reveal as="article" className="group grid gap-4 border-b border-(--line) py-6 md:grid-cols-[1fr_1.7fr] md:gap-10 lg:py-7">
      <div>
        <span className="font-mono text-xs text-(--accent)">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="mt-1.5 max-w-sm font-display text-xl leading-tight font-semibold tracking-tight">
          <Link to={`/products/${product.slug}`} className="transition-colors hover:text-(--accent)">{product.name}</Link>
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-6">
          <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--accent)">
            Enquire now <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <a href={product.catalogue} download className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--fg-muted) hover:text-(--accent)">
            <Download className="size-4" aria-hidden="true" /> Download catalogue
          </a>
        </div>
      </div>
      <ul className="grid content-start gap-x-8 sm:grid-cols-2">
        {product.features.map((feature) => (
          <li key={feature} className="border-t border-(--line) py-2.5 text-sm leading-snug first:border-t-0 sm:[&:nth-child(2)]:border-t-0">{feature}</li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function Products() {
  const [filter, setFilter] = useState('all')
  const listRef = useRef(null)
  const shown = filter === 'all' ? groups : groups.filter((g) => g.id === filter)

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !listRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(listRef.current.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform' })
    }, listRef)
    return () => ctx.revert()
  }, [filter])

  return (
    <>
      <Seo title="Aluminium Pipe Fittings for Compressed Air" description="Explore Quickair's aluminium pipe fittings for compressed air, vacuum & inert gases, plus SS and PEX piping, valves & actuators. In-house extrusion." image={productsIntro.photos[0].src} />
      <PageHero crumbs={[['Products']]} title={productsIntro.title} lead={productsIntro.lead} image={productsIntro.photos[1].src} size="lg">
        <Button to="#enquiry" icon={<ArrowRight />}>Get a quote</Button>
        <Button href={productsIntro.mainCatalogue} download variant="secondary" icon={<Download />}>Download catalogue</Button>
      </PageHero>

      {/* key figures */}
      <section className="theme-dark border-b border-(--line)">
        <Reveal as="dl" stagger className="mx-auto grid max-w-site grid-cols-2 px-(--gutter) lg:grid-cols-4">
          {productsIntro.stats.map((stat) => (
            <div key={stat.label} className="border-white/10 py-8 pr-6 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <dd className="font-display text-h3 font-semibold text-cyan-400">{stat.value}</dd>
              <dt className="mt-1 text-sm text-alu-400">{stat.label}</dt>
            </div>
          ))}
        </Reveal>
      </section>

      {/* interactive 3D system */}
      <Section theme="dark">
        <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <Reveal><Eyebrow>Interactive 3D</Eyebrow></Reveal>
            <SplitText as="h2" text={productsIntro.whyTitle} className="mt-5 block text-h2" />
          </div>
          <Reveal className="text-(--fg-muted)">{productsIntro.lead}</Reveal>
        </div>
        <Reveal className="mt-12">
          <SystemExplorer />
        </Reveal>
      </Section>

      {/* filter */}
      <div className="theme-light sticky top-(--spacing-header) z-30 border-b border-(--line) bg-white/90! backdrop-blur">
        <div role="group" aria-label="Filter products" className="mx-auto flex max-w-site gap-2 overflow-x-auto px-(--gutter) py-3 [scrollbar-width:none]">
          {[{ id: 'all', filter: 'All products' }, ...groups].map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={filter === g.id}
              onClick={() => setFilter(g.id)}
              className={cn(
                'shrink-0 rounded-full border px-5 py-2.5 font-display text-sm font-semibold whitespace-nowrap transition-colors duration-300',
                filter === g.id ? 'border-navy-900 bg-navy-900 text-white' : 'border-(--line) hover:border-(--accent) hover:text-(--accent)',
              )}
            >
              {g.filter}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef}>
        {shown.map((group) => {
          const items = productsIn(group.id)
          const systems = items.filter((p) => p.specs)
          const featured = items.filter((p) => p.features)
          return (
            <Section key={group.id} id={group.id} theme={THEMES[group.id]} flush className="scroll-mt-32 py-14 md:py-16 lg:py-20">
              <div className="max-w-3xl">
                <Eyebrow>{group.eyebrow}</Eyebrow>
                <h2 className="mt-3 font-display text-[clamp(1.625rem,1.2rem+1.3vw,2.375rem)] leading-tight font-semibold tracking-tight">{group.title}</h2>
                <p className="mt-3 max-w-2xl text-base text-(--fg-muted) lg:text-[1.0625rem]">{group.lead}</p>
              </div>
              {systems.length > 0 && (
                <div className={cn('mt-8 grid gap-5 lg:mt-10', systems.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-3xl')}>
                  {systems.map((product) => <SystemCard key={product.slug} product={product} wide={systems.length === 1} />)}
                </div>
              )}
              {group.id === 'aluminium' && (
                <div className="mt-12 border-t border-(--line) pt-10 lg:mt-14">
                  <h3 className="font-display text-xl leading-tight font-semibold tracking-tight">Inside a push-fit joint</h3>
                  <p className="mt-1.5 text-sm text-(--fg-muted)">Hover the numbered points to see what each part is made of.</p>
                  <JointDiagram type="push-fit" className="mt-6" />
                </div>
              )}
              {featured.length > 0 && (
                <div className="mt-8 border-t border-(--line) lg:mt-10">
                  {featured.map((product, i) => <FeatureRow key={product.slug} product={product} index={i} />)}
                </div>
              )}
            </Section>
          )
        })}
      </div>

      {/* Not sure which system fits your plant? */}
      <Section theme="dark" className="bg-navy-950!">
        <div aria-hidden="true" className="bg-glow absolute top-1/2 left-1/2 -z-10 size-[50rem] -translate-x-1/2 -translate-y-1/2" />
        <div className="mx-auto max-w-3xl text-center">
          <SplitText as="h2" text={productsIntro.helpTitle} className="block text-h1 text-metal" />
          <Reveal className="mt-6 text-lead text-(--fg-muted)">{productsIntro.helpText}</Reveal>
          <Reveal className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={company.phoneHref} size="lg" icon={<Phone />}>Call {company.phone}</Button>
            <Button href={`mailto:${company.email}`} size="lg" variant="secondary" icon={<Mail />}>{company.email}</Button>
          </Reveal>
        </div>
      </Section>

      <ContactCta title={productsIntro.enquiryTitle} lead={productsIntro.enquiryLead} formProps={{ types: enquiry.productTypes, label: 'Product interest', placeholder: 'Pipe size, pressure, length, quantity' }} />
    </>
  )
}

export { fullName }
