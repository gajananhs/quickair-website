import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BadgeIndianRupee, Check, Clock, GraduationCap, Workflow } from 'lucide-react'
import { services } from '@/data/services'
import { ROUTES } from '@/data/navigation'
import { gsap, EASE } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'
import { Button, Eyebrow, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ContactCta from '@/components/sections/ContactCta'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import ImageReveal from '@/components/motion/ImageReveal'
import Tilt from '@/components/motion/Tilt'

const WHY_ICONS = [Clock, GraduationCap, BadgeIndianRupee, Workflow]

/** Five steps joined by a pipe that fills with air as the section scrolls. */
function Steps() {
  const ref = useRef(null)
  useGsap(
    ref,
    () => {
      gsap.fromTo('[data-line]', { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: EASE.linear, scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: true } })
    },
    [],
  )
  return (
    <div ref={ref} className="relative mt-16">
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-6 w-1 rounded-full bg-white/10 lg:top-6 lg:right-0 lg:bottom-auto lg:left-0 lg:h-1 lg:w-auto">
        <div data-line className="h-full w-full origin-top rounded-full bg-linear-to-b from-electric-500 to-cyan-400 lg:origin-left lg:bg-linear-to-r" />
      </div>
      <Reveal as="ol" stagger={0.12} className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {services.steps.map((step, i) => (
          <li key={step.title} className="relative pl-18 lg:pt-20 lg:pl-0">
            <span className="absolute top-0 left-0 grid size-13 place-items-center rounded-full border border-cyan-400/40 bg-navy-900 font-display text-lg font-semibold text-cyan-400">{i + 1}</span>
            <h3 className="font-display text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-(--fg-muted)">{step.text}</p>
          </li>
        ))}
      </Reveal>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <Seo title={services.heroTitle} description={services.heroLead} />
      <PageHero crumbs={[[services.eyebrow]]} title={services.heroTitle} lead={services.heroLead} image="/qa/home/compressor-line-with-valves-and-drop-legs.jpg" size="lg">
        <Button to="#enquiry" icon={<ArrowRight />}>Get a quote</Button>
        <Button to="#steps" variant="secondary">Our steps</Button>
      </PageHero>

      <section className="theme-dark border-b border-(--line)">
        <Reveal as="dl" stagger className="mx-auto grid max-w-site grid-cols-2 px-(--gutter) lg:grid-cols-4">
          {services.facts.map((fact) => (
            <div key={fact.label} className="border-white/10 py-8 pr-6 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <dd className="font-display text-h3 font-semibold text-cyan-400">{fact.value}</dd>
              <dt className="mt-1 text-sm text-alu-400">{fact.label}</dt>
            </div>
          ))}
        </Reveal>
      </section>

      {/* what we offer */}
      <Section theme="light" id="offer">
        <div className="max-w-3xl">
          <SplitText as="h2" text={services.offerTitle} className="block text-h2" />
          <Reveal className="mt-4 text-lead text-(--fg-muted)">{services.offerLead}</Reveal>
        </div>
        <Reveal as="ul" stagger={0.06} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.offer.map((item, i) => (
            <Tilt as="li" key={item.title} className="rounded-panel bg-alu-50">
              <Link to={item.to} className="group flex h-full flex-col p-8">
                <span className="flex items-center justify-between">
                  <span className="font-mono text-sm text-(--accent)">{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRight className="size-5 text-(--fg-muted) transition-all duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent)" aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-h3">{item.title}</h3>
                <p className="mt-3 text-(--fg-muted)">{item.text}</p>
              </Link>
            </Tilt>
          ))}
        </Reveal>
      </Section>

      {/* advantages */}
      <Section theme="navy">
        <div aria-hidden="true" className="bg-glow absolute -top-40 -left-40 -z-10 size-[44rem]" />
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ImageReveal parallax src="/qa/home/quickair-elbow-and-clamp-assembly.jpg" alt="Quickair elbow and clamp assembly" className="aspect-[4/3] rounded-panel" />
          <div>
            <Reveal><Eyebrow>{services.advantagesEyebrow}</Eyebrow></Reveal>
            <SplitText as="h2" text={services.advantagesTitle} className="mt-5 block text-h2" />
            <Reveal className="mt-5 text-lead text-(--fg-muted)">{services.advantagesLead}</Reveal>
            <Reveal as="ul" stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.advantages.map((text) => (
                <li key={text} className="flex gap-3 rounded-card border border-white/10 bg-white/[0.04] p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* our products */}
      <Section theme="alu">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SplitText as="h2" text={services.productsTitle} className="block text-h2" />
            <Reveal className="mt-4 text-lead text-(--fg-muted)">{services.productsLead}</Reveal>
            <Reveal className="mt-8"><Button to={ROUTES.products} icon={<ArrowRight />}>View products</Button></Reveal>
          </div>
          <Reveal as="ul" stagger={0.05} className="border-t border-(--line)">
            {services.productLines.map(([name, text]) => (
              <li key={name} className="group grid gap-1 border-b border-(--line) py-5 transition-[padding] duration-300 ease-out-expo hover:pl-3 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
                <span className="font-display text-lg font-semibold group-hover:text-(--accent)">{name}</span>
                <span className="text-(--fg-muted)">{text}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* why choose our services */}
      <Section theme="light">
        <Reveal><Eyebrow>{services.whyEyebrow}</Eyebrow></Reveal>
        <SplitText as="h2" text={services.whyTitle} className="mt-5 block text-h2" />
        <Reveal as="ul" stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.why.map((item, i) => {
            const Icon = WHY_ICONS[i]
            return (
              <Tilt as="li" key={item.title} className="rounded-panel bg-white p-8 shadow-card-light">
                <span className="grid size-13 place-items-center rounded-2xl bg-electric-500/10 text-(--accent)"><Icon className="size-6" aria-hidden="true" /></span>
                <h3 className="mt-7 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-(--fg-muted)">{item.text}</p>
              </Tilt>
            )
          })}
        </Reveal>
      </Section>

      {/* our steps */}
      <Section theme="dark" id="steps" className="scroll-mt-24">
        <Reveal><Eyebrow>{services.stepsEyebrow}</Eyebrow></Reveal>
        <SplitText as="h2" text={services.stepsTitle} className="mt-5 block text-h2" />
        <Steps />
      </Section>

      {/* resources */}
      <Section theme="alu">
        <Reveal><Eyebrow>{services.resourcesEyebrow}</Eyebrow></Reveal>
        <SplitText as="h2" text={services.resourcesTitle} className="mt-5 block text-h2" />
        <Reveal className="mt-4 text-lead text-(--fg-muted)">{services.resourcesLead}</Reveal>
        <Reveal as="ul" stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.resources.map((item) => (
            <li key={item.title}>
              <Link to={item.to} className="group flex h-full items-start justify-between gap-4 rounded-card bg-white p-6 shadow-card-light transition-transform duration-300 ease-out-expo hover:-translate-y-1">
                <span>
                  <span className="block font-display text-lg font-semibold group-hover:text-(--accent)">{item.title}</span>
                  <span className="mt-1 block text-sm text-(--fg-muted)">{item.text}</span>
                </span>
                <ArrowRight className="mt-1 size-5 shrink-0 text-(--accent) transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </Reveal>
      </Section>

      <ContactCta title={services.closingTitle} lead={services.closingText} />
    </>
  )
}
