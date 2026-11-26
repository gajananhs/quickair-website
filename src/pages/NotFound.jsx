import { ArrowRight } from 'lucide-react'
import { ROUTES } from '@/data/navigation'
import { Button, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import RelatedLinks from '@/components/sections/RelatedLinks'

/**
 * Shown for any address that is not a page. The server sends it with HTTP 404
 * (public/.htaccess) and it is marked noindex, so it never stands in for the homepage.
 */
export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page does not exist on quickair.in. Use the links to find Quickair products, calculators, guides and contact details." noindex />
      <PageHero size="md" title="This page is not on the line" lead="Error 404: there is no page at this address. It may have moved, or the link may be mistyped.">
        <Button to={ROUTES.home} icon={<ArrowRight />}>Home</Button>
        <Button to={ROUTES.products} variant="secondary">View products</Button>
      </PageHero>
      <Section theme="light">
        <RelatedLinks
          title="Where to go from here"
          links={[
            { label: 'Aluminium compressed air piping products', to: ROUTES.products },
            { label: 'Design, supply and installation services', to: ROUTES.services },
            { label: 'Pipe size and pressure drop calculators', to: ROUTES.calculators },
            { label: 'Guides on compressed air piping', to: ROUTES.blog },
            { label: 'Case studies', to: ROUTES.caseStudies },
            { label: 'Contact Quickair', to: ROUTES.contact },
          ]}
        />
      </Section>
    </>
  )
}
