import { cn } from '@/lib/cn'

/**
 * Surface for grouped content. Adapts to the parent Section theme.
 * `interactive` adds the hover lift + electric edge used for clickable cards.
 */
export default function Card({ as: Tag = 'div', interactive = false, className, children, ...rest }) {
  return (
    <Tag
      className={cn(
        'relative rounded-card border border-(--line) bg-(--surface-raised) p-6 sm:p-8',
        interactive &&
          'transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-(--accent) hover:shadow-glow',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
