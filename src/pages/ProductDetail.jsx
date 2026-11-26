import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Download } from 'lucide-react'
import { fullName, getProduct, groups, productsIn } from '@/data/products'
import { enquiry } from '@/data/company'
import { ROUTES } from '@/data/navigation'
import { PRODUCT_RESOURCES } from '@/data/articleSeo'
import { productSchema } from '@/lib/seo'
import { Button, Container, Eyebrow, Section, Seo } from '@/components/ui'
import SpecTable from '@/components/sections/SpecTable'
import ContactCta from '@/components/sections/ContactCta'
import JointDiagram from '@/components/sections/JointDiagram'
import RelatedLinks from '@/components/sections/RelatedLinks'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import ImageReveal from '@/components/motion/ImageReveal'
import Tilt from '@/components/motion/Tilt'
import NotFound from './NotFound'

const GROUP_IMAGE = {
  extrusions: '/qa/gallery/run-through-a-new-steel-structure.jpg',
  valves: '/qa/gallery/large-bore-line-with-flanged-valves.jpg',
}

const GROUP_IMAGE_ALT = {
  extrusions: 'Piping run through a new steel structure',
  valves: 'Large-bore line with flanged valves',
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  const group = groups.find((g) => g.id === product.group)
  const siblings = productsIn(product.group).filter((p) => p.slug !== product.slug)
  const name = fullName(product)
  const path = `${ROUTES.products}/${product.slug}`
  const crumbs = [['Products', ROUTES.products], [name]]

  return (
    <>
      <Seo
        title={product.seo.title}
        description={product.seo.description}
        image={product.image?.src ?? GROUP_IMAGE[product.group]}
        type="product"
        crumbs={crumbs}
        schema={[productSchema(product, { name: `${group.title}: ${name}`, description: product.seo.description, path, category: group.title })]}
      />

      {/* product hero */}
      <section className="theme-dark relative isolate overflow-clip pt-header">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black,transparent_90%)]" />
        <div aria-hidden="true" className="bg-glow absolute top-0 right-0 -z-10 size-[48rem]" />
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-20">
          <div>
            <Reveal start="top bottom">
              <Link to={`${ROUTES.products}#${group.id}`} className="inline-flex items-center gap-2 font-display text-eyebrow font-semibold uppercase text-cyan-400 hover:text-white">
                <ArrowLeft className="size-3.5" aria-hidden="true" /> {group.title}
              </Link>
            </Reveal>
            {/* one heading for the whole product name: "Push Fit Type" + "Aluminium to aluminium" */}
            <h1 className="mt-6">
              <SplitText immediate delay={0.15} text={product.name} className="block text-h1 text-metal" />
              {product.variant && <Reveal as="span" delay={0.4} start="top bottom" className="mt-3 block font-display text-h3 font-semibold text-cyan-400">{product.variant}</Reveal>}
            </h1>
            <Reveal delay={0.5} start="top bottom" className="mt-6 max-w-xl text-lead text-alu-300">{group.lead}</Reveal>
            <Reveal delay={0.65} start="top bottom" className="mt-9 flex flex-wrap gap-3">
              <Button to="#enquiry" icon={<ArrowRight />}>Enquire now</Button>
              <Button href={product.catalogue} download variant="secondary" icon={<Download />}>Download catalogue</Button>
            </Reveal>
          </div>
          {product.image ? (
            <Tilt max={8} className="mx-auto w-full max-w-lg rounded-panel bg-white p-8 shadow-glow">
              <ImageReveal eager src={product.image.src} alt={product.image.alt} fit="contain" className="aspect-square" />
            </Tilt>
          ) : (
            <ImageReveal eager parallax src={GROUP_IMAGE[product.group]} alt={GROUP_IMAGE_ALT[product.group]} className="aspect-[4/3] rounded-panel" />
          )}
        </Container>
        {product.key && (
          <Reveal as="dl" stagger start="top bottom" className="mx-auto grid max-w-site grid-cols-2 border-t border-white/10 px-(--gutter) lg:grid-cols-4">
            {product.key.map(([label, value]) => (
              <div key={label} className="border-white/10 py-7 pr-6 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <dt className="text-sm text-alu-400">{label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-white">{value}</dd>
              </div>
            ))}
          </Reveal>
        )}
      </section>

      {/* interactive joint diagram */}
      {product.diagram && (
        <Section theme="light">
          <Reveal><Eyebrow>Interactive diagram</Eyebrow></Reveal>
          <SplitText as="h2" text={product.diagram === 'crimping' ? 'Inside the integrated fitting' : 'Inside a push-fit joint'} className="mt-5 block text-h2" />
          <Reveal className="mt-4 text-(--fg-muted)">Hover or tap the numbered points to see what each part is made of.</Reveal>
          <JointDiagram type={product.diagram} className="mt-10" />
        </Section>
      )}

      {/* specifications or features */}
      <Section theme={product.diagram ? 'alu' : 'light'}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SplitText as="h2" text={product.specs ? 'Full specifications' : 'Features'} className="block text-h2" />
            <Reveal className="mt-4 text-(--fg-muted)">{name}</Reveal>
            <Reveal className="mt-8">
              <Button href={product.catalogue} download variant="secondary" icon={<Download />}>Download catalogue</Button>
            </Reveal>
          </div>
          {product.specs ? (
            <SpecTable rows={product.specs} caption={`${name} specifications`} />
          ) : (
            <Reveal as="ul" stagger={0.06} className="border-t border-(--line)">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-4 border-b border-(--line) py-5 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-(--accent)" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </Reveal>
          )}
        </div>
      </Section>

      {/* guides, case studies and tools that go with this product */}
      <Section theme="light" className="py-12!">
        <RelatedLinks title="Guides and tools for this product" links={[...PRODUCT_RESOURCES[product.group], { label: 'All product catalogues (PDF)', to: ROUTES.downloads }]} />
      </Section>

      {/* other products in the group */}
      {siblings.length > 0 && (
        <Section theme="dark">
          <SplitText as="h2" text={`More in ${group.filter}`} className="block text-h3" />
          <Reveal as="ul" stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((item) => (
              <Tilt as="li" key={item.slug} className="rounded-card border border-white/10 bg-navy-800/60">
                <Link to={`/products/${item.slug}`} className="group flex h-full flex-col p-6">
                  <span className="font-display text-eyebrow font-semibold uppercase text-cyan-400">{item.tag}</span>
                  <span className="mt-3 flex-1 font-display text-lg font-semibold">{fullName(item)}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-400">
                    View <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Tilt>
            ))}
          </Reveal>
        </Section>
      )}

      <ContactCta formProps={{ types: enquiry.productTypes, label: 'Product interest', defaultDetails: `Enquiry about: ${name}`, placeholder: 'Pipe size, pressure, length, quantity' }} />
    </>
  )
}
