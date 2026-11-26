import { useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone, Store } from 'lucide-react'
import { company, contact, dealerNetwork, telHref } from '@/data/company'
import { ROUTES } from '@/data/navigation'
import { localBusinessSchema } from '@/lib/seo'
import { useHydrated } from '@/hooks/useMediaQuery'
import { Button, Eyebrow, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import EnquiryForm from '@/components/sections/EnquiryForm'
import ZoneContacts from '@/components/sections/ZoneContacts'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import Tilt from '@/components/motion/Tilt'

const CARD_ICONS = [Mail, Phone, MapPin]

export default function Contact() {
  const [params] = useSearchParams()
  // ?product= and ?type=dealer are not known when the page is prerendered
  const hydrated = useHydrated()
  const product = hydrated ? params.get('product') : null
  const dealer = hydrated && params.get('type') === 'dealer'

  return (
    <>
      <Seo title="Contact Quickair: Quotes, Dealers and Technical Support" description={`${contact.lead} Head office: ${company.address.short}.`} image="/qa/home/quickair-piping-connected-to-a-compressor.jpg" crumbs={[['Contact']]} schema={[localBusinessSchema()]} />
      <PageHero crumbs={[['Contact']]} title={contact.title} lead={contact.lead} image="/qa/home/quickair-piping-connected-to-a-compressor.jpg">
        <Button href={company.phoneHref} icon={<Phone />}>Call {company.phone}</Button>
        <Button href={`mailto:${company.email}`} variant="secondary" icon={<Mail />}>{company.email}</Button>
      </PageHero>

      {/* contact cards */}
      <Section theme="dark" className="py-12!">
        <Reveal as="ul" stagger className="grid gap-5 md:grid-cols-3">
          {contact.cards.map((card, i) => {
            const Icon = CARD_ICONS[i]
            return (
              <Tilt as="li" key={card.label} className="rounded-panel border border-white/10 bg-navy-800/60 p-8">
                <Icon className="size-7 text-cyan-400" aria-hidden="true" />
                <span className="mt-6 block font-display text-eyebrow font-semibold uppercase text-alu-400">{card.label}</span>
                {card.lines.map((line) => (
                  <a key={line.text} href={line.href} className="mt-2 block font-display text-xl font-semibold break-words hover:text-cyan-400">{line.text}</a>
                ))}
                {card.note && <span className="mt-2 block text-sm text-alu-400">{card.note}</span>}
              </Tilt>
            )
          })}
        </Reveal>
      </Section>

      {/* visit + form */}
      <Section theme="light" id="visit" className="scroll-mt-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <Reveal><Eyebrow>{contact.visitEyebrow}</Eyebrow></Reveal>
            <SplitText as="h2" text={contact.visitTitle} className="mt-5 block text-h2" />
            <Reveal className="mt-4 text-lead text-(--fg-muted)">{contact.visitLead}</Reveal>
            <Reveal as="dl" stagger className="mt-10 flex flex-col border-t border-(--line)">
              <div className="border-b border-(--line) py-5">
                <dt className="font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">Address</dt>
                <dd className="mt-2"><address className="not-italic">{company.legalName}<br />{company.address.oneLine}</address></dd>
              </div>
              <div className="border-b border-(--line) py-5">
                <dt className="font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">Office phones</dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {company.officePhones.map((n) => <a key={n} href={telHref('+91' + n.slice(1))} className="font-display font-semibold hover:text-(--accent)">{n}</a>)}
                </dd>
              </div>
              <div className="border-b border-(--line) py-5">
                <dt className="font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">Email</dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                  {company.emails.map((e) => <a key={e} href={`mailto:${e}`} className="font-display font-semibold hover:text-(--accent)">{e}</a>)}
                </dd>
              </div>
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-3">
              <Button href={company.address.mapUrl} target="_blank" rel="noreferrer" variant="secondary" icon={<ArrowUpRight />}>Get directions</Button>
              <Button href={company.dealerRegistrationUrl} target="_blank" rel="noreferrer" variant="secondary" icon={<Store />}>Dealer registration</Button>
            </Reveal>
          </div>
          <Reveal variant="fade-left" id="quote" className="scroll-mt-28 rounded-panel bg-alu-50 p-6 sm:p-10">
            <h2 className="mb-7 text-h3">{contact.formTitle}</h2>
            <EnquiryForm
              key={`${product}-${dealer}`}
              types={contact.formTypes}
              label="Enquiry type"
              defaultType={dealer ? 'Dealer enquiry' : 'Quote'}
              defaultDetails={product ? `Enquiry about: ${product}` : ''}
            />
          </Reveal>
        </div>
      </Section>

      {/* zones */}
      <Section theme="navy">
        <div aria-hidden="true" className="bg-glow absolute -top-40 -right-40 -z-10 size-[44rem]" />
        <Reveal><Eyebrow>{contact.zonesEyebrow}</Eyebrow></Reveal>
        <SplitText as="h2" text={contact.zonesTitle} className="mt-5 block text-h2" />
        <Reveal className="mt-4 text-lead text-(--fg-muted)">{contact.zonesLead}</Reveal>
        <ZoneContacts />
      </Section>

      {/* dealers */}
      <Section theme="alu" id="dealers" className="scroll-mt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <SplitText as="h2" text={dealerNetwork.title} className="block text-h2" />
            <Reveal className="mt-4 text-lead text-(--fg-muted)">{dealerNetwork.lead}</Reveal>
            <Reveal className="mt-3 text-(--fg-muted)">{dealerNetwork.note}</Reveal>
          </div>
          <Reveal className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={company.dealerRegistrationUrl} target="_blank" rel="noreferrer" icon={<ArrowUpRight />}>{dealerNetwork.cta}</Button>
            <Button to={ROUTES.dealers} variant="secondary" icon={<ArrowRight />}>About the dealer programme</Button>
          </Reveal>
        </div>
      </Section>

      {/* map */}
      <Section theme="light" id="map">
        <Reveal><Eyebrow>{contact.mapEyebrow}</Eyebrow></Reveal>
        <SplitText as="h2" text={contact.mapTitle} className="mt-5 block text-h2" />
        <Reveal className="mt-3 text-(--fg-muted)">{company.address.mapLabel}</Reveal>
        <Reveal className="mt-10 overflow-hidden rounded-panel border border-(--line)">
          <iframe title="Canares Automation Pvt Ltd on Google Maps" src={company.address.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[28rem] w-full border-0" />
        </Reveal>
        <Reveal className="mt-12 text-center font-display text-h3 font-semibold text-electric-gradient">{contact.closing}</Reveal>
      </Section>
    </>
  )
}
