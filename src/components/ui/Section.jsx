import { cn } from '@/lib/cn'
import Container from './Container'

const THEMES = {
  dark: 'theme-dark',
  navy: 'theme-navy',
  light: 'theme-light',
  alu: 'theme-alu',
}

/**
 * Page building block. Sets the colour theme (semantic --fg / --surface
 * variables) and the vertical rhythm. Every page is a stack of Sections.
 *
 *   <Section theme="light" id="products">…</Section>
 *   <Section theme="dark" bleed>full-width content, no Container</Section>
 */
export default function Section({
  as: Tag = 'section',
  theme = 'dark',
  bleed = false,
  flush = false,
  className,
  containerClassName,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn('relative isolate overflow-clip', THEMES[theme], !flush && 'py-(--section-y)', className)}
      {...rest}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  )
}
