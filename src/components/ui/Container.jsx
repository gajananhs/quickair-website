import { cn } from '@/lib/cn'

/** Centres content at the site max-width with the fluid gutter. */
export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-site px-(--gutter)', className)} {...rest}>
      {children}
    </Tag>
  )
}
