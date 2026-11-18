import { ArrowRight } from 'lucide-react'
import { ROUTES } from '@/data/navigation'
import { Button, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <PageHero size="lg" title="This page is not on the line" lead="The address may have changed. Head back to the homepage or go straight to the products.">
        <Button to={ROUTES.home} icon={<ArrowRight />}>Home</Button>
        <Button to={ROUTES.products} variant="secondary">View products</Button>
      </PageHero>
    </>
  )
}
