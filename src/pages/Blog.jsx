import { useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import blogIndex from '@/data/generated/blog-index.json'
import { articleName, caseStudies, getArticle, guides, prepareArticle } from '@/data/about'
import { ARTICLE_SEO, CASE_STUDY_LINKS, clusterOf, CLUSTERS, PILLAR } from '@/data/articleSeo'
import { articleSchema, clip, faqSchema } from '@/lib/seo'
import { ROUTES } from '@/data/navigation'
import { gsap } from '@/lib/motion'
import { useGsap } from '@/hooks/useGsap'
import { Button, Container, Eyebrow, Section, Seo } from '@/components/ui'
import PageHero from '@/components/sections/PageHero'
import ContactCta from '@/components/sections/ContactCta'
import ArticleBody from '@/components/sections/ArticleBody'
import RelatedLinks from '@/components/sections/RelatedLinks'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import Tilt from '@/components/motion/Tilt'
import NotFound from './NotFound'

const FALLBACK_IMAGE = '/qa/gallery/flow-marked-manifold.jpg'
// UTC so the date reads the same on the server, in every browser and in every time zone
const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '')
const guideBySlug = Object.fromEntries(guides.map((guide) => [guide.slug, guide]))

function ArticleCard({ to, image, title, excerpt, tag }) {
  return (
    <Tilt as="li" className="overflow-hidden rounded-panel bg-white shadow-card-light">
      <Link to={to} className="group flex h-full flex-col">
        <span className="block aspect-[16/10] overflow-hidden bg-alu-50">
          <img src={image || FALLBACK_IMAGE} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-108" />
        </span>
        <span className="flex flex-1 flex-col p-7">
          {tag && <span className="font-display text-eyebrow font-semibold uppercase text-(--accent)">{tag}</span>}
          <span className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-(--accent)">{title}</span>
          {excerpt && <span className="mt-3 line-clamp-3 flex-1 text-(--fg-muted)">{excerpt}</span>}
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-(--accent)">
            Read more <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </span>
      </Link>
    </Tilt>
  )
}

/** /blog */
export function BlogIndex() {
  const [query, setQuery] = useState('')
  const featured = new Set(blogIndex.cards.map((c) => c.to))
  // Guides published on quickair.in that the blog page itself does not link to.
  const more = guides.filter((g) => !featured.has(`/blog/${g.slug}`)).map((g) => ({ to: `/blog/${g.slug}`, image: g.image, title: articleName(g), excerpt: g.description }))
  const q = query.trim().toLowerCase()
  // a card whose stored name does not describe its article takes the corrected name
  const named = blogIndex.cards.map((card) => ({ ...card, title: ARTICLE_SEO[card.to.split('/').pop()]?.card ?? card.title }))
  const cards = [...named, ...more].filter((c) => !q || `${c.title} ${c.excerpt}`.toLowerCase().includes(q))

  return (
    <>
      <Seo title="Compressed Air Piping Blog: Guides and How-Tos" description={blogIndex.intro} image="/qa/gallery/large-bore-line-with-flanged-valves.jpg" crumbs={[['Blog']]} />
      <PageHero crumbs={[['Blog']]} title="Compressed air piping guides" lead={blogIndex.intro} image="/qa/gallery/large-bore-line-with-flanged-valves.jpg" />
      <Section theme="alu">
        <label className="relative mb-10 block max-w-md">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-(--fg-muted)" aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" className="w-full rounded-full border border-(--line) bg-white py-3 pr-5 pl-12 focus:border-(--accent) focus:outline-none" />
        </label>
        <p aria-live="polite" className="mb-6 text-sm text-(--fg-muted)">{cards.length} article{cards.length === 1 ? '' : 's'}</p>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => <ArticleCard key={card.to} {...card} />)}
        </ul>
        {cards.length === 0 && <p className="py-10 text-center text-(--fg-muted)">No articles match “{query}”.</p>}
      </Section>
      {/* every guide, grouped by topic, with the products and tools that go with it */}
      <Section theme="light" id="topics">
        <Eyebrow>Guides by topic</Eyebrow>
        <h2 className="mt-4 text-h2">Find a guide by topic</h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {CLUSTERS.map((cluster) => (
            <div key={cluster.id}>
              <h3 className="font-display text-xl font-semibold">{cluster.label}</h3>
              <ul className="mt-4 flex flex-col gap-2 border-t border-(--line) pt-4 text-[0.9375rem]">
                {cluster.slugs.map((slug) => (
                  <li key={slug}>
                    <Link to={`${ROUTES.blog}/${slug}`} className="text-(--fg) hover:text-(--accent) hover:underline">{ARTICLE_SEO[slug].title}</Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-(--fg-muted)">
                Related:{' '}
                {cluster.links.map((link, i) => (
                  <span key={link.to}>
                    {i > 0 && ' · '}
                    <Link to={link.to} className="font-semibold text-(--accent) hover:underline">{link.label}</Link>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section theme="dark">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Case study</Eyebrow>
            <h2 className="mt-4 text-h2">Results from Quickair installations.</h2>
          </div>
          <Button to={ROUTES.caseStudies} variant="secondary" icon={<ArrowRight />}>All case studies</Button>
        </div>
      </Section>
      <ContactCta />
    </>
  )
}

/** /case-studies */
export function CaseStudies() {
  return (
    <>
      <Seo title="Compressed Air Piping Case Studies" description="Quickair case studies: GI piping versus aluminium modular piping, piping material and pressure drop, and the performance of modular piping joints." image={caseStudies[0].cover} crumbs={[['Case Study']]} />
      <PageHero crumbs={[['Case Study']]} title="Compressed air piping case studies" lead="Results from Quickair installations." image={caseStudies[0].cover} />
      <Section theme="light">
        <ol className="flex flex-col">
          {caseStudies.map((study) => (
            <Reveal as="li" key={study.slug} className="border-b border-(--line) first:border-t">
              <Link to={`/case-studies/${study.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-[5rem_1fr_18rem_auto] md:gap-10 md:py-10">
                <span className="font-display text-h2 font-semibold text-(--line) transition-colors duration-500 group-hover:text-(--accent)">{String(study.number).padStart(2, '0')}</span>
                <span>
                  <span className="font-display text-eyebrow font-semibold uppercase text-(--accent)">Case Study {study.number}</span>
                  <span className="mt-2 block text-h3 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">{study.label}</span>
                </span>
                <span className="block aspect-[16/10] overflow-hidden rounded-card bg-alu-50">
                  <img src={study.cover} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-108" />
                </span>
                <span className="grid size-13 place-items-center rounded-full border border-(--line) transition-colors duration-300 group-hover:border-(--accent) group-hover:bg-(--accent) group-hover:text-white">
                  <ArrowRight className="size-5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
        <RelatedLinks className="mt-12" links={CASE_STUDY_LINKS} />
      </Section>
      <ContactCta />
    </>
  )
}

/** Thin bar under the header that fills as the article is read. */
function ReadingProgress({ target }) {
  const bar = useRef(null)
  useGsap(
    bar,
    () => {
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: target.current, start: 'top top', end: 'bottom bottom', scrub: true } })
    },
    [],
  )
  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1 origin-left scale-x-0 bg-linear-to-r from-electric-500 to-cyan-400" />
}

/** /blog/:slug and /case-studies/:slug */
export function Article() {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const body = useRef(null)
  const article = getArticle(slug)
  const isCase = pathname.startsWith(ROUTES.caseStudies)
  if (!article || (article.kind === 'case-study') !== isCase) return <NotFound />

  const back = isCase ? ROUTES.caseStudies : ROUTES.blog
  const path = `${back}/${slug}`
  const seo = ARTICLE_SEO[slug] ?? { title: article.title }
  const name = articleName(article)
  const heading = seo.heading ?? article.title
  const description = clip(article.description)
  const crumbs = [[isCase ? 'Case Study' : 'Blog', back], [name]]
  const { blocks, faq } = prepareArticle(article)

  // "Keep reading": the next guides on the same topic (case studies: the other case studies)
  const cluster = isCase ? null : clusterOf(slug)
  const list = isCase ? caseStudies : (cluster?.slugs ?? []).map((s) => guideBySlug[s]).filter(Boolean)
  const at = list.findIndex((a) => a.slug === slug)
  const related = [1, 2, 3].map((d) => list[(at + d) % list.length]).filter((a, i, all) => a && a.slug !== slug && all.indexOf(a) === i)
  const resources = isCase
    ? CASE_STUDY_LINKS
    : [...(slug === PILLAR ? [] : [{ label: `Main guide: ${ARTICLE_SEO[PILLAR].title}`, to: `${ROUTES.blog}/${PILLAR}` }]), ...(cluster?.links ?? []), { label: 'All guides by topic', to: `${ROUTES.blog}#topics` }]
  const headings = blocks.filter((b) => b.type === 'heading' && b.level === 2).slice(0, 12)

  return (
    <>
      <Seo
        title={seo.title}
        description={description}
        image={article.image}
        type="article"
        crumbs={crumbs}
        schema={[articleSchema(article, { path, title: seo.title, description }), ...(faq.length ? [faqSchema(faq)] : [])]}
      />
      <ReadingProgress target={body} />
      <PageHero crumbs={crumbs} title={heading} lead={seo.heading ? description : article.subtitle || article.description} image={article.image || FALLBACK_IMAGE} />
      <Section theme="light" key={slug}>
        <Container className="grid gap-12 px-0! lg:grid-cols-[16rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Link to={back} className="inline-flex items-center gap-2 font-display text-sm font-semibold text-(--accent)"><ArrowLeft className="size-4" aria-hidden="true" /> {isCase ? 'All case studies' : 'All articles'}</Link>
            {article.modified && <p className="mt-6 text-sm text-(--fg-muted)">Updated {formatDate(article.modified)}</p>}
            {headings.length > 2 && (
              <nav aria-label="In this article" className="mt-8 hidden border-l border-(--line) lg:block">
                <span className="block pl-4 font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">In this article</span>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {headings.map((h, i) => <li key={i} className="pl-4 text-(--fg-muted)">{h.text}</li>)}
                </ul>
              </nav>
            )}
          </aside>
          <div ref={body} className="min-w-0 max-w-3xl">
            <ArticleBody blocks={blocks} />
            <RelatedLinks className="mt-14" links={resources} />
            {/* closing call to action */}
            <div className="mt-8 rounded-card bg-(--surface-raised) p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold">Planning or upgrading a compressed air line?</h2>
              <p className="mt-2 text-(--fg-muted)">Send your layout, flow and pressure, and the Quickair team will suggest a pipe size and a parts list.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button to={ROUTES.contact} icon={<ArrowRight />}>Get a quote</Button>
                <Button to={ROUTES.pipeSize} variant="secondary">Pipe size calculator</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      {related.length > 0 && (
        <Section theme="alu">
          <SplitText as="h2" text={isCase ? 'More case studies' : 'Keep reading'} className="block text-h3" />
          <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} to={`${back}/${item.slug}`} image={item.cover || item.image} title={item.label || articleName(item)} excerpt={item.description} tag={isCase ? `Case Study ${item.number}` : undefined} />
            ))}
          </ul>
        </Section>
      )}
      <ContactCta />
    </>
  )
}
