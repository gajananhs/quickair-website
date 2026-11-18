import { Mail, MapPin, Phone } from 'lucide-react'
import { company, enquiry } from '@/data/company'
import { Section } from '@/components/ui'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import EnquiryForm from './EnquiryForm'

/** Closing enquiry section used on most pages: contact details beside the form. */
export default function ContactCta({ id = 'enquiry', title = enquiry.title, lead = enquiry.lead, formProps }) {
  return (
    <Section theme="navy" id={id}>
      <div aria-hidden="true" className="bg-glow absolute -bottom-60 -left-40 -z-10 size-[46rem]" />
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SplitText as="h2" text={title} className="block text-h2" />
          <Reveal className="mt-5 max-w-md text-lead text-(--fg-muted)">{lead}</Reveal>
          <Reveal stagger as="ul" className="mt-10 flex flex-col gap-6">
            <li className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <span className="block font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">Phone</span>
                <a href={company.phoneHref} className="mt-1 block font-display text-xl font-semibold hover:text-cyan-400">{company.phone}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <span className="block font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">Email</span>
                <a href={`mailto:${company.email}`} className="mt-1 block font-display text-xl font-semibold hover:text-cyan-400">{company.email}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <span className="block font-display text-eyebrow font-semibold uppercase text-(--fg-muted)">Address</span>
                <address className="mt-1 max-w-sm not-italic text-alu-200">
                  {company.legalName}, {company.address.oneLine}
                </address>
              </div>
            </li>
          </Reveal>
        </div>
        <Reveal variant="fade-left" className="rounded-panel border border-(--line) bg-(--surface-raised)/60 p-6 backdrop-blur sm:p-10">
          <EnquiryForm {...formProps} />
        </Reveal>
      </div>
    </Section>
  )
}
