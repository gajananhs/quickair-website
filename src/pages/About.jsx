import { useRef } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { about } from '@/data/about'
import { company, stats } from '@/data/company'
import { productRanges, qualityPoints } from '@/data/products'
import { ROUTES } from '@/data/navigation'
import { gsap, EASE } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'
import { Button, Eyebrow, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ContactCta from '@/components/sections/ContactCta'
import ClientMarquee from '@/components/sections/ClientMarquee'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import ImageReveal from '@/components/motion/ImageReveal'
import CountUp from '@/components/motion/CountUp'
import Tilt from '@/components/motion/Tilt'

/** Company brief: a vertical line that fills as the years scroll past. */
function Timeline() {
  const ref = useRef(null)
  useGsap(
    ref,
    () => {
      gsap.fromTo('[data-line]', { scaleY: 0 }, { scaleY: 1, ease: EASE.linear, scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 65%', scrub: true } })
    },
    [],
  )
  return (
    <div ref={ref} className="relative mt-14">
      <div aria-hidden="true" className="absolute top-2 bottom-2 left-[1.05rem] w-0.5 bg-(--line) md:left-1/2">
        <div data-line className="h-full w-full origin-top bg-linear-to-b from-electric-500 to-cyan-400" />
      </div>
      <ol className="flex flex-col gap-12 md:gap-20">
        {about.timeline.map((item, i) => (
          <li key={item.year} className="relative grid gap-4 pl-14 md:grid-cols-2 md:gap-20 md:pl-0">
            <span aria-hidden="true" className="absolute top-2 left-2 size-5 rounded-full border-4 border-(--surface) bg-(--accent) shadow-glow md:left-1/2 md:-translate-x-1/2" />
            <Reveal variant={i % 2 ? 'fade-left' : 'fade-right'} className={i % 2 ? 'md:order-2' : 'md:text-right'}>
              <span className="font-display text-display leading-none font-semibold text-electric-gradient">{item.year}</span>
            </Reveal>
            <Reveal variant={i % 2 ? 'fade-right' : 'fade-left'} className={i % 2 ? 'md:order-1 md:text-right' : ''}>
              <h3 className="text-h3">{item.title}</h3>
              <p className="mt-3 text-(--fg-muted)">{item.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function About() {
  return (
    <>
      <Seo title={about.metaTitle} description={about.seoDescription} crumbs={[['About']]} />
      <PageHero crumbs={[['About']]} title={about.heroTitle} lead={`${about.heroBrands}. ${about.heroLines[0]}.`} image="/qa/home/quickair-blue-aluminium-compressed-air-piping-installed-in-a-factory.jpg" size="lg">
        <Button to="#brief" icon={<ArrowRight />}>{about.briefTitle}</Button>
        <Button to={ROUTES.contact} variant="secondary">Contact us</Button>
      </PageHero>

      {/* second hero line + figures */}
      <section className="theme-dark border-b border-(--line)">
        <div className="mx-auto max-w-site px-(--gutter) pt-10">
          <Reveal className="font-display text-h3 font-semibold text-cyan-400">{about.heroLines[1]}</Reveal>
        </div>
        <Reveal as="dl" stagger className="mx-auto grid max-w-site grid-cols-2 px-(--gutter) lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-white/10 py-8 pr-6 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <dd className="font-display text-h2 font-semibold text-white"><CountUp value={stat.value} /></dd>
              <dt className="mt-1 text-sm text-alu-400">{stat.label}</dt>
            </div>
          ))}
        </Reveal>
      </section>

      {/* company brief */}
      <Section theme="light" id="brief" className="scroll-mt-24">
        <Reveal><Eyebrow>{company.legalName}</Eyebrow></Reveal>
        <SplitText as="h2" text={about.briefTitle} className="mt-5 block text-h2" />
        <Timeline />
      </Section>

      {/* CEO */}
      <Section theme="navy" id="ceo" className="scroll-mt-24">
        <div aria-hidden="true" className="bg-glow absolute -top-40 -right-40 -z-10 size-[44rem]" />
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Tilt max={5} className="mx-auto w-full max-w-md overflow-hidden rounded-panel">
            <ImageReveal src={about.ceo.image.src} alt={about.ceo.image.alt} className="aspect-[4/5]" />
          </Tilt>
          <div>
            <Reveal><Eyebrow>Leadership</Eyebrow></Reveal>
            <SplitText as="h2" text={about.ceo.title} className="mt-5 block text-h2" />
            <Reveal stagger className="mt-8 flex flex-col gap-5 text-lg text-alu-200">
              {about.ceo.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* product range */}
      <Section theme="alu" id="range">
        <SplitText as="h2" text={about.rangeTitle} className="block text-h2" />
        <Reveal as="ul" stagger={0.07} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {productRanges.map((range, i) => (
            <Tilt as="li" key={range.name} className="rounded-panel bg-white p-8 shadow-card-light">
              <span className="font-mono text-sm text-(--accent)">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-h3">{range.name}</h3>
              <p className="mt-3 text-(--fg-muted)">{range.text}</p>
            </Tilt>
          ))}
        </Reveal>
        <Reveal as="ul" stagger={0.06} className="mt-16 grid gap-x-12 border-t border-(--line) md:grid-cols-2">
          {qualityPoints.map((point) => (
            <li key={point.name} className="flex gap-4 border-b border-(--line) py-6">
              <Check className="mt-1 size-5 shrink-0 text-(--accent)" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-semibold">{point.name}</h3>
                <p className="mt-1 text-(--fg-muted)">{point.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <Reveal className="mt-10">
          <Button to={ROUTES.products} icon={<ArrowRight />}>View all products</Button>
        </Reveal>
      </Section>

      {/* certifications */}
      <Section theme="light" id="certifications" className="scroll-mt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Reveal><Eyebrow>Standards</Eyebrow></Reveal>
            <SplitText as="h2" text={about.certificationsTitle} className="mt-5 block text-h2" />
            <Reveal className="mt-5 text-lead text-(--fg-muted)">ISO 9001:2015, CE; valves to API 607/609 and NAMUR; fittings to ASME.</Reveal>
          </div>
          <Reveal stagger className="grid grid-cols-2 gap-5">
            {about.certifications.map((cert) => (
              <Tilt key={cert.src} className="rounded-card border border-(--line) bg-white p-3 shadow-card-light">
                <a href={cert.src} target="_blank" rel="noreferrer" aria-label={`Open ${cert.alt}`}>
                  <img src={cert.src} alt={cert.alt} width={cert.w} height={cert.h} loading="lazy" className="w-full rounded-lg" />
                </a>
              </Tilt>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* competitive edge */}
      <Section theme="dark" id="edge">
        <SplitText as="h2" text={about.edgeTitle} className="block text-h2" />
        <div className="mt-10 hidden grid-cols-2 gap-6 font-display text-eyebrow font-semibold uppercase md:grid">
          <span className="text-cyan-400">{about.edgeColumns[0]}</span>
          <span className="text-alu-400">{about.edgeColumns[2]}</span>
        </div>
        <ol className="mt-4 flex flex-col gap-6">
          {about.edge.map((row, i) => (
            <Reveal as="li" key={row.ours.slice(0, 30)} className="grid gap-4 md:grid-cols-2 md:gap-6">
              <Tilt max={4} className="flex flex-col gap-5 rounded-panel border border-cyan-400/30 bg-navy-800/70 p-6 sm:flex-row sm:items-center sm:p-8">
                {row.oursImage && <img src={row.oursImage} alt="" loading="lazy" className="h-32 w-40 shrink-0 rounded-card bg-white object-contain p-2" />}
                <div>
                  <span className="inline-flex items-center gap-2 font-display text-eyebrow font-semibold uppercase text-cyan-400"><Check className="size-4" aria-hidden="true" /> Quickair · {String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-2 text-lg text-white">{row.ours}</p>
                </div>
              </Tilt>
              <div className="flex flex-col gap-5 rounded-panel border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:p-8">
                {row.theirsImage && <img src={row.theirsImage} alt="" loading="lazy" className="h-32 w-40 shrink-0 rounded-card bg-white object-contain p-2 opacity-80 grayscale" />}
                <div>
                  <span className="inline-flex items-center gap-2 font-display text-eyebrow font-semibold uppercase text-alu-400"><X className="size-4" aria-hidden="true" /> Others</span>
                  <p className="mt-2 text-alu-300">{row.theirs}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section theme="alu">
        <h2 className="text-center text-h3">Trusted by plants across India</h2>
        <div className="mt-10"><ClientMarquee /></div>
      </Section>

      <ContactCta />
    </>
  )
}
