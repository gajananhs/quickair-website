import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Calculator, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { clients, company, dealerNetwork, heroSlides, intro, process, stats, system } from '@/data/company'
import { services } from '@/data/services'
import { caseStudies } from '@/data/about'
import { ROUTES } from '@/data/navigation'
import { gsap, EASE } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'
import { cn } from '@/lib/cn'
import { Button, Container, Eyebrow, Section, Seo } from '@/components/ui'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import ImageReveal from '@/components/motion/ImageReveal'
import CountUp from '@/components/motion/CountUp'
import Tilt from '@/components/motion/Tilt'
import SteelVsAluminium from '@/components/sections/SteelVsAluminium'
import PipingShowcase from '@/components/sections/PipingShowcase'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import Testimonials from '@/components/sections/Testimonials'
import ClientMarquee from '@/components/sections/ClientMarquee'
import ContactCta from '@/components/sections/ContactCta'

const HeroAssembly = lazy(() => import('@/components/three/HeroAssembly'))

function Hero() {
  const ref = useRef(null)

  useGsap(
    ref,
    () => {
      gsap.to('[data-hero-stage]', { yPercent: -12, autoAlpha: 0.2, ease: EASE.linear, scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('[data-hero-copy]', { yPercent: -6, ease: EASE.linear, scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    },
    [],
  )

  return (
    <section ref={ref} id="home" className="theme-dark relative isolate flex min-h-svh flex-col overflow-clip bg-navy-950! pt-header">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black_30%,transparent)]" />
      <div aria-hidden="true" className="bg-glow absolute top-[18%] right-[-12%] -z-10 size-[min(64rem,130vw)]" />
      {/* drifting air streaks */}
      <svg aria-hidden="true" viewBox="0 0 1200 600" preserveAspectRatio="none" className="animate-drift absolute inset-0 -z-10 h-full w-[124%] opacity-40">
        {[90, 190, 300, 420, 520].map((y, i) => (
          <path key={y} d={`M0 ${y} C 300 ${y - 40}, 600 ${y + 50}, 1200 ${y - 10}`} fill="none" stroke="#2ccbf2" strokeWidth="1" strokeDasharray="2 22" className="animate-flow" style={{ animationDuration: `${2.4 + i * 0.5}s` }} />
        ))}
      </svg>

      <Container className="pointer-events-none flex flex-1 flex-col *:pointer-events-auto">
        <div data-hero-copy className="flex max-w-2xl flex-col pt-8 lg:flex-1 lg:justify-center lg:pt-0 lg:pb-10">
          <Reveal start="top bottom">
            <Eyebrow>{heroSlides[0].title}</Eyebrow>
          </Reveal>
          <SplitText
            as="h1"
            immediate
            delay={0.2}
            stagger={0.14}
            text={[['Quick.', 'text-metal'], ['Modular.', 'text-metal'], ['Efficient.', 'text-electric-gradient']]}
            className="mt-6 block text-display font-semibold"
          />
          <Reveal delay={0.7} start="top bottom" className="mt-7 max-w-xl text-lead text-alu-300">
            {company.summary}
          </Reveal>
          <Reveal delay={0.85} start="top bottom" className="mt-9 flex flex-wrap gap-3">
            <Button to={ROUTES.contact} size="lg" icon={<ArrowRight />}>Get a quote</Button>
            <Button to={ROUTES.products} size="lg" variant="secondary">View products</Button>
          </Reveal>
        </div>

        <div data-hero-stage className="relative -z-10 -mx-(--gutter) h-[38svh] min-h-64 flex-1 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[38%] lg:mx-0 lg:h-auto">
          <Suspense fallback={null}>
            <HeroAssembly />
          </Suspense>
        </div>

        <Reveal as="dl" stagger delay={1} start="top bottom" className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 py-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp value={stat.value} className="block font-display text-h3 font-semibold text-white" />
                <span className="mt-1 block text-sm text-alu-400">{stat.label}</span>
              </dd>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}

/** The three campaign banners from the Quick Air homepage, as a snap carousel. */
function Campaigns() {
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const current = useRef(0)
  const paused = useRef(false)
  const go = (dir) => {
    const el = track.current
    if (!el) return
    const next = (current.current + dir + heroSlides.length) % heroSlides.length
    current.current = next
    setIndex(next)
    const slide = el.children[next]
    const left = Math.max(0, Math.min(slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2, el.scrollWidth - el.clientWidth))
    // Snap is switched off while the track glides, then restored.
    el.style.scrollSnapType = 'none'
    gsap.to(el, { scrollLeft: left, duration: 0.7, ease: 'power3.inOut', overwrite: true, onComplete: () => { el.style.scrollSnapType = '' } })
  }
  // Slides advance right to left on their own; hovering or touching pauses them.
  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current && !document.hidden) go(1)
    }, 2800)
    return () => {
      clearInterval(timer)
      gsap.killTweensOf(track.current)
    }
  }, [])
  const pause = () => { paused.current = true }
  const resume = () => { paused.current = false }
  return (
    <Section theme="dark" bleed className="py-16!" onPointerEnter={pause} onPointerLeave={resume} onFocus={pause} onBlur={resume}>
      <ul ref={track} data-lenis-prevent className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-(--gutter) pb-2 [scrollbar-width:none]">
        {heroSlides.map((slide) => (
          <li key={slide.src} className="w-[min(88vw,64rem)] shrink-0 snap-center">
            <figure className="group relative overflow-hidden rounded-panel border border-white/10">
              <img src={slide.src} alt={slide.alt} loading="lazy" className="aspect-[16/7] w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-950/95 to-transparent p-5 pt-16 sm:p-8 sm:pt-24">
                <span className="block font-display text-h3 font-semibold text-white">{slide.title}</span>
                <span className="mt-1 block max-w-2xl text-sm text-alu-300 sm:text-base">{slide.text}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Container className="mt-6 flex items-center justify-end gap-3">
        <span className="mr-2 font-mono text-sm text-alu-400">0{index + 1} / 0{heroSlides.length}</span>
        <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"><ChevronLeft className="size-5" /></button>
        <button type="button" aria-label="Next slide" onClick={() => go(1)} className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"><ChevronRight className="size-5" /></button>
      </Container>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Campaigns />

      {/* Introduction */}
      <Section theme="light" id="about">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <ImageReveal parallax src={intro.image.src} alt={intro.image.alt} className="aspect-[823/793] rounded-panel" />
            <Reveal variant="scale" delay={0.3} className="absolute -right-3 -bottom-6 rounded-card bg-navy-900 px-6 py-5 text-white shadow-glow sm:-right-8">
              <span className="block font-display text-h2 font-semibold text-cyan-400">{intro.badge.value}</span>
              <span className="block max-w-[11rem] text-sm text-alu-300">{intro.badge.label}</span>
            </Reveal>
          </div>
          <div>
            <SplitText as="h2" text={intro.title} className="block text-h1" />
            <Reveal className="mt-6 text-lead">{intro.text}</Reveal>
            <Reveal as="ul" stagger className="mt-7 flex flex-col gap-3">
              {intro.points.map((point) => (
                <li key={point} className="flex gap-3 font-medium">
                  <Check className="mt-0.5 size-5 shrink-0 text-(--accent)" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </Reveal>
            <Reveal stagger className="mt-7 flex flex-col gap-4 text-(--fg-muted)">
              {intro.extra.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal className="mt-9">
              <Button to={`${ROUTES.about}#brief`} icon={<ArrowRight />}>{intro.cta}</Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <SteelVsAluminium />

      <PipingShowcase />

      {/* Complete system: product families */}
      <Section theme="light" id="systems">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal><Eyebrow>Product portfolio</Eyebrow></Reveal>
            <SplitText as="h2" text={system.title} className="mt-5 block text-h2" />
            <Reveal className="mt-5 text-lead text-(--fg-muted)">{system.lead}</Reveal>
            <Reveal as="ul" stagger={0.04} className="mt-7 flex flex-wrap gap-2">
              {system.fittings.map((fitting) => (
                <li key={fitting} className="rounded-full border border-(--line) px-3.5 py-1.5 text-sm font-medium">{fitting}</li>
              ))}
            </Reveal>
            <Reveal className="mt-8">
              <Button to={ROUTES.products} icon={<ArrowRight />}>View products</Button>
            </Reveal>
          </div>
          <div>
            <Reveal as="ul" stagger className="border-t border-(--line)">
              {system.families.map((family, i) => (
                <li key={family.name} className="border-b border-(--line)">
                  <Link to={family.to} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 sm:gap-8">
                    <span className="font-mono text-sm text-(--fg-muted)">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-display text-h3 font-semibold transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-(--accent)">{family.name}</span>
                      <span className="mt-1 block text-(--fg-muted)">{family.text}</span>
                    </span>
                    <ArrowUpRight className="size-6 text-(--fg-muted) transition-[color,transform] duration-300 group-hover:rotate-45 group-hover:text-(--accent)" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </Reveal>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {system.photos.map((photo) => (
                <figure key={photo.src}>
                  <ImageReveal src={photo.src} alt={photo.alt} className="aspect-square rounded-card" />
                  <figcaption className="mt-2 text-sm text-(--fg-muted)">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section theme="dark" id="services">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal><Eyebrow>{services.eyebrow}</Eyebrow></Reveal>
            <SplitText as="h2" text={services.offerTitle} className="mt-5 block text-h2" />
            <Reveal className="mt-4 text-lead text-(--fg-muted)">{services.offerLead}</Reveal>
          </div>
          <Button to={ROUTES.services} variant="secondary" icon={<ArrowRight />}>All services</Button>
        </div>
        <Reveal stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.offer.map((item, i) => (
            <Tilt key={item.title} className="rounded-card border border-white/10 bg-navy-800/60">
              <Link to={item.to} className="group flex h-full flex-col p-7">
                <span className="font-mono text-sm text-cyan-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-(--fg-muted)">{item.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400">
                  Learn more <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Tilt>
          ))}
        </Reveal>
      </Section>

      {/* Process */}
      <Section theme="light" id="how">
        <Reveal><Eyebrow>How it works</Eyebrow></Reveal>
        <SplitText as="h2" text={process.title} className="mt-5 block text-h2" />
        <ProcessTimeline />
      </Section>

      {/* Engineering tools */}
      <Section theme="alu" id="tools">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Reveal><Eyebrow>{services.resourcesEyebrow}</Eyebrow></Reveal>
            <SplitText as="h2" text={services.resourcesTitle} className="mt-5 block text-h2" />
            <Reveal className="mt-5 text-lead text-(--fg-muted)">{services.resourcesLead}</Reveal>
            <Reveal className="mt-8">
              <Button to={ROUTES.calculators} icon={<Calculator />}>Open the calculators</Button>
            </Reveal>
          </div>
          <Reveal as="ul" stagger={0.06} className="grid gap-4 sm:grid-cols-2">
            {services.resources.map((item) => (
              <Tilt as="li" key={item.title} className="rounded-card bg-white shadow-card-light">
                <Link to={item.to} className="group flex h-full flex-col p-6">
                  <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-(--accent)">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-(--fg-muted)">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-(--accent)">
                    Open <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Tilt>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Clients and testimonials */}
      <Section theme="light" id="clients">
        <SplitText as="h2" text={clients.title} className="block text-center text-h2" />
        <Reveal className="mt-12">
          <ClientMarquee />
        </Reveal>
        <Testimonials />
      </Section>

      {/* Latest insights */}
      <Section theme="navy" id="insights">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><Eyebrow>Knowledge</Eyebrow></Reveal>
            <SplitText as="h2" text="Latest insights" className="mt-5 block text-h2" />
          </div>
          <Button to={ROUTES.blog} variant="secondary" icon={<ArrowRight />}>All articles</Button>
        </div>
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((item) => (
            <Tilt key={item.slug} className="overflow-hidden rounded-card border border-white/10 bg-navy-900">
              <Link to={`${ROUTES.caseStudies}/${item.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <span className="font-display text-eyebrow font-semibold uppercase text-cyan-400">Case study {item.number}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{item.label}</h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400">
                    Read <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Tilt>
          ))}
        </Reveal>
      </Section>

      {/* Dealer network */}
      <Section theme="light" id="dealer">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal><Eyebrow>Dealers</Eyebrow></Reveal>
            <SplitText as="h2" text={dealerNetwork.title} className="mt-5 block text-h2" />
            <Reveal className="mt-5 text-lead text-(--fg-muted)">{dealerNetwork.lead}</Reveal>
            <Reveal as="ul" stagger className="mt-7 border-t border-(--line)">
              {dealerNetwork.points.map((point) => (
                <li key={point} className="flex gap-4 border-b border-(--line) py-4 text-lg font-medium">
                  <Check className="mt-1 size-5 shrink-0 text-(--accent)" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </Reveal>
            <Reveal className="mt-5 text-(--fg-muted)">{dealerNetwork.note}</Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-3">
              <Button href={company.dealerRegistrationUrl} target="_blank" rel="noreferrer" icon={<ArrowUpRight />}>{dealerNetwork.cta}</Button>
              <Button to={`${ROUTES.contact}?type=dealer`} variant="secondary">Dealer enquiry</Button>
            </Reveal>
          </div>
          <div className="relative">
            <ImageReveal parallax src={dealerNetwork.image.src} alt={dealerNetwork.image.alt} className="aspect-[823/533] rounded-panel" />
            <Reveal variant="scale" delay={0.3} className={cn('absolute -bottom-6 left-4 rounded-card bg-navy-900 px-6 py-5 text-white shadow-glow sm:-left-8')}>
              <span className="block font-display text-h3 font-semibold text-cyan-400">{dealerNetwork.badge.value}</span>
              <span className="block text-sm text-alu-300">{dealerNetwork.badge.label}</span>
            </Reveal>
          </div>
        </div>
      </Section>

      <ContactCta id="quote" />
    </>
  )
}
