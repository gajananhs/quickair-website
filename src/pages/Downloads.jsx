import { Link } from 'react-router-dom'
import { ArrowRight, Download, FileText } from 'lucide-react'
import { downloads } from '@/data/downloads'
import { ROUTES } from '@/data/navigation'
import { Button, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ContactCta from '@/components/sections/ContactCta'
import RelatedLinks from '@/components/sections/RelatedLinks'
import Reveal from '@/components/motion/Reveal'

const CRUMBS = [['Downloads']]
const LEAD = 'Product catalogues for Quickair aluminium piping, PEX piping, valves and actuators, aluminium extrusion profiles and ESD products, as PDF files.'

/** /downloads: every catalogue PDF on the site in one place. */
export default function Downloads() {
  return (
    <>
      <Seo title="Catalogue Downloads: Piping, Valves, Extrusions" description={LEAD} crumbs={CRUMBS} />
      <PageHero crumbs={CRUMBS} title="Product catalogue downloads" lead={LEAD} image="/qa/gallery/flow-marked-manifold.jpg" size="sm" />
      <Section theme="light">
        <Reveal as="ul" stagger={0.05} className="border-t border-(--line)">
          {downloads.map((file) => (
            <li key={file.href} className="grid items-center gap-5 border-b border-(--line) py-6 md:grid-cols-[auto_1fr_auto] md:gap-8">
              <span className="hidden size-12 place-items-center rounded-2xl bg-electric-500/10 text-(--accent) md:grid"><FileText className="size-6" aria-hidden="true" /></span>
              <div>
                <h2 className="font-display text-xl leading-tight font-semibold tracking-tight">{file.title} catalogue</h2>
                <p className="mt-1.5 text-sm text-(--fg-muted)">
                  PDF, {file.size}
                  {file.products.length > 0 && ' · For: '}
                  {file.products.map((product, i) => (
                    <span key={product.to}>
                      {i > 0 && ', '}
                      <Link to={product.to} className="font-semibold text-(--accent) hover:underline">{product.name}</Link>
                    </span>
                  ))}
                </p>
              </div>
              <Button href={file.href} download variant="secondary" icon={<Download />} aria-label={`Download the ${file.title} catalogue (PDF, ${file.size})`}>Download</Button>
            </li>
          ))}
        </Reveal>
        <RelatedLinks
          className="mt-12"
          links={[
            { label: 'All Quickair products', to: ROUTES.products },
            { label: 'Pipe size calculator', to: ROUTES.pipeSize },
            { label: 'Pressure drop calculator', to: ROUTES.pressureDrop },
            { label: 'Guides on compressed air piping', to: ROUTES.blog },
          ]}
        />
        <Reveal className="mt-10">
          <Button to={ROUTES.contact} icon={<ArrowRight />}>Ask for a quote or a specification</Button>
        </Reveal>
      </Section>
      <ContactCta />
    </>
  )
}
