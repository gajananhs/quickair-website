import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { company } from '@/data/company'
import { footerNav } from '@/data/navigation'
import { Container, Logo } from '@/components/ui'

const headingClass = 'mb-5 font-display text-eyebrow font-semibold uppercase text-alu-400'
const linkClass = 'text-alu-200 transition-colors duration-200 hover:text-cyan-400'

export default function Footer() {
  return (
    <footer className="theme-dark relative overflow-clip border-t border-(--line) bg-navy-950!">
      <div aria-hidden="true" className="rule-glow absolute inset-x-0 top-0" />
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.5fr_2.4fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <Logo imgClassName="h-16" />
          <div>
            <h2 className={headingClass}>Contact Us</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan-400" aria-hidden="true" />
                <a href={company.address.mapUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  <address className="not-italic">{company.legalName} {company.address.oneLine}</address>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className={`inline-flex items-center gap-3 ${linkClass}`}>
                  <Mail className="size-4 text-cyan-400" aria-hidden="true" /> {company.email}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className={`inline-flex items-center gap-3 ${linkClass}`}>
                  <Phone className="size-4 text-cyan-400" aria-hidden="true" /> {company.phone}
                </a>
              </li>
              <li>
                <a href={company.whatsapp} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-3 ${linkClass}`}>
                  <MessageCircle className="size-4 text-cyan-400" aria-hidden="true" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className={headingClass}>{group.title}</h2>
              <ul className="flex flex-col gap-3 text-sm">
                {group.links.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className={linkClass}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className={headingClass}>Follow Us</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {company.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 ${linkClass}`}>
                    {item.label} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a href={company.dealerRegistrationUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 ${linkClass}`}>
                  Dealer registration <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="border-t border-(--line) py-6 text-xs text-(--fg-muted)">
        {/* the year is printed at build time and again in the browser; they differ only across a new year */}
        <p suppressHydrationWarning>© {new Date().getFullYear()} {company.legalName} All rights reserved. {company.brand} is the modular piping brand of {company.legalName}</p>
      </Container>
    </footer>
  )
}
