import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'

/**
 * Dark opening section for inner pages: breadcrumb, animated title, lead and
 * an optional background photograph. Every page starts with a dark hero so
 * the transparent navbar always sits on a dark surface.
 *
 *   <PageHero crumbs={[['Products', '/products'], ['Fittings']]} title="Fittings" lead="…" image="/qa/…" />
 */
export default function PageHero({ crumbs = [], title, lead, image, imagePosition = 'center', size = 'md', children }) {
  return (
    <section className={cn('theme-dark relative isolate flex items-end overflow-clip pt-header', size === 'lg' ? 'min-h-[80svh]' : size === 'sm' ? 'min-h-[44svh]' : 'min-h-[62svh]')}>
      {image && (
        <img
          src={image}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
          style={{ objectPosition: imagePosition }}
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-900 via-navy-900/80 to-navy-900/40" />
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black,transparent_85%)]" />
      <div aria-hidden="true" className="bg-glow absolute -top-40 right-[-10%] -z-10 size-[42rem]" />

      <Container className="pt-16 pb-14 md:pb-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-display text-eyebrow font-semibold uppercase text-alu-400">
              <li>
                <Link to="/" className="hover:text-cyan-400">Home</Link>
              </li>
              {crumbs.map(([label, to]) => (
                <li key={label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3" aria-hidden="true" />
                  {to ? <Link to={to} className="hover:text-cyan-400">{label}</Link> : <span className="text-cyan-400" aria-current="page">{label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <SplitText as="h1" immediate delay={0.15} text={title} className="block max-w-5xl text-h1 text-metal" />
        {lead && (
          <Reveal delay={0.45} start="top bottom" className="mt-6 max-w-3xl text-lead text-alu-300">
            {lead}
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.6} start="top bottom" className="mt-9 flex flex-wrap gap-3">
            {children}
          </Reveal>
        )}
      </Container>
      <div aria-hidden="true" className="rule-glow absolute inset-x-0 bottom-0" />
    </section>
  )
}
