import { useState } from 'react'
import { Send } from 'lucide-react'
import { company, enquiry } from '@/data/company'
import { cn } from '@/lib/cn'

const fieldClass =
  'w-full rounded-xl border border-(--line) bg-(--surface) px-4 py-3 text-base text-(--fg) placeholder:text-(--fg-muted) transition-colors duration-200 focus:border-(--accent) focus:outline-none'
const labelClass = 'mb-2 block font-display text-sm font-semibold'

/**
 * Enquiry form. Front-end only: it opens WhatsApp with the details
 * pre-filled, so no backend is required.
 *
 *   <EnquiryForm />                                   homepage "What do you need?" options
 *   <EnquiryForm label="Product interest" types={enquiry.productTypes} />
 */
export default function EnquiryForm({ types = enquiry.types, label = enquiry.needLabel, defaultType, defaultDetails = '', placeholder = enquiry.detailsPlaceholder, className }) {
  const [sent, setSent] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    const f = new FormData(event.currentTarget)
    const text = ['Quickair enquiry', `Name: ${f.get('name')}`, `Company: ${f.get('company')}`, `Contact: ${f.get('contact')}`, `${label}: ${f.get('type')}`, `Details: ${f.get('details')}`].join('\n')
    setSent(true)
    window.open(`${company.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <form onSubmit={onSubmit} className={cn('grid gap-5 sm:grid-cols-2', className)}>
      <div>
        <label htmlFor="enq-name" className={labelClass}>Name</label>
        <input id="enq-name" name="name" required autoComplete="name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="enq-company" className={labelClass}>Company</label>
        <input id="enq-company" name="company" autoComplete="organization" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="enq-contact" className={labelClass}>Phone or email</label>
        <input id="enq-contact" name="contact" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="enq-type" className={labelClass}>{label}</label>
        <select id="enq-type" name="type" defaultValue={defaultType ?? types[0]} className={fieldClass}>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="enq-details" className={labelClass}>Details</label>
        <textarea id="enq-details" name="details" rows={4} defaultValue={defaultDetails} placeholder={placeholder} className={fieldClass} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex h-14 items-center gap-2 rounded-full bg-electric-500 px-9 font-display font-semibold text-white transition-[background-color,box-shadow,transform] duration-300 ease-out-expo hover:bg-electric-400 hover:shadow-glow active:scale-[0.98]"
        >
          {enquiry.submit}
          <Send className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <p role="status" className={cn('text-sm text-(--accent) transition-opacity duration-300', sent ? 'opacity-100' : 'opacity-0')}>
          {enquiry.success}
        </p>
      </div>
    </form>
  )
}
