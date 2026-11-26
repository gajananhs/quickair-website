import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { company, contact, dealerNetwork } from '@/data/company'
import { ROUTES } from '@/data/navigation'
import { Button, Eyebrow, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ZoneContacts from '@/components/sections/ZoneContacts'
import RelatedLinks from '@/components/sections/RelatedLinks'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import ImageReveal from '@/components/motion/ImageReveal'

const CRUMBS = [['Dealers']]

/** /dealers: the dealer and distributor programme, from the dealer-network copy and regional contacts. */
export default function Dealers() {
  return (
    <>
      <Seo
        title="Become a Quickair Dealer or Distributor in India"
        description="Join the Canares dealer network for Quickair aluminium piping: dealer pricing, PAN-India technical support, and product and installation training."
        image={dealerNetwork.image.src}
        crumbs={CRUMBS}
      />
      <PageHero crumbs={CRUMBS} title="Become a Quickair dealer or distributor" lead={dealerNetwork.lead} image={dealerNetwork.image.src}>
        <Button href={company.dealerRegistrationUrl} target="_blank" rel="noreferrer" icon={<ArrowUpRight />}>Dealer registration form</Button>
        <Button to={`${ROUTES.contact}?type=dealer#quote`} variant="secondary" icon={<ArrowRight />}>Send a dealer enquiry</Button>
      </PageHero>

      <Section theme="light">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal><Eyebrow>Dealer network</Eyebrow></Reveal>
            <SplitText as="h2" text={dealerNetwork.title} className="mt-5 block text-h2" />
            <Reveal as="ul" stagger className="mt-7 border-t border-(--line)">
              {dealerNetwork.points.map((point) => (
                <li key={point} className="flex gap-4 border-b border-(--line) py-4 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-(--accent)" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </Reveal>
            <Reveal className="mt-5 text-(--fg-muted)">{dealerNetwork.note}</Reveal>
            <Reveal className="mt-8">
              <Button href={company.dealerRegistrationUrl} target="_blank" rel="noreferrer" icon={<ArrowUpRight />}>{dealerNetwork.cta}</Button>
            </Reveal>
          </div>
          <ImageReveal parallax src={dealerNetwork.image.src} alt={dealerNetwork.image.alt} className="aspect-[4/3] rounded-panel" />
        </div>
        <RelatedLinks
          className="mt-14"
          title="What dealers supply"
          links={[
            { label: 'Aluminium compressed air piping products', to: `${ROUTES.products}#aluminium` },
            { label: 'PEX piping with brass fittings', to: `${ROUTES.products}#pex` },
            { label: 'Valves and actuators', to: `${ROUTES.products}#valves` },
            { label: 'Product catalogues (PDF)', to: ROUTES.downloads },
            { label: 'Pipe size calculator for quotations', to: ROUTES.pipeSize },
            { label: 'Case studies from Quickair installations', to: ROUTES.caseStudies },
          ]}
        />
      </Section>

      <Section theme="navy">
        <div aria-hidden="true" className="bg-glow absolute -top-40 -right-40 -z-10 size-[44rem]" />
        <Reveal><Eyebrow>{contact.zonesEyebrow}</Eyebrow></Reveal>
        <SplitText as="h2" text={contact.zonesTitle} className="mt-5 block text-h2" />
        <Reveal className="mt-4 text-lead text-(--fg-muted)">{contact.zonesLead}</Reveal>
        <ZoneContacts />
      </Section>
    </>
  )
}
