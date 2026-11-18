import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap ' +
  'transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-out-expo ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const VARIANTS = {
  primary: 'bg-electric-500 text-white hover:bg-electric-400 hover:shadow-glow',
  secondary: 'border border-(--line) text-(--fg) hover:border-(--accent) hover:text-(--accent)',
  metal: 'bg-brushed text-navy-900 hover:brightness-105 hover:shadow-card-light',
  ghost: 'text-(--fg) hover:text-(--accent)',
}

const SIZES = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-[0.9375rem]',
  lg: 'h-14 px-9 text-base',
}

/**
 * Renders a router <Link> (to), an <a> (href) or a <button>.
 * Pass a Lucide icon element as `icon`; it nudges right on hover.
 *
 *   <Button to="/contact" icon={<ArrowRight />}>Get a layout</Button>
 */
export default function Button({ variant = 'primary', size = 'md', to, href, icon, className, children, ...rest }) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], variant === 'ghost' && 'px-0', className)
  const content = (
    <>
      {children}
      {icon && (
        <span aria-hidden="true" className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1 [&>svg]:size-[1.1em]">
          {icon}
        </span>
      )}
    </>
  )

  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>
  return <button type="button" className={classes} {...rest}>{content}</button>
}
