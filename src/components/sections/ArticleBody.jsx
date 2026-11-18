import { Fragment } from 'react'
import { Link } from 'react-router-dom'

/** Renders [label](url) links inside otherwise plain text. Internal paths become router links. */
export function RichText({ text }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (!match) return <Fragment key={i}>{part}</Fragment>
    const [, label, href] = match
    if (href.startsWith('/')) return <Link key={i} to={href}>{label}</Link>
    if (/^(mailto:|tel:)/.test(href)) return <a key={i} href={href}>{label}</a>
    return <a key={i} href={href} target="_blank" rel="noreferrer">{label}</a>
  })
}

/**
 * Article content from src/data/generated/articles.json:
 * headings, paragraphs, lists, tables and images, in original order.
 */
export default function ArticleBody({ blocks }) {
  return (
    <div className="prose-article text-lg">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          const Tag = block.level <= 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4'
          return <Tag key={i}>{block.text}</Tag>
        }
        if (block.type === 'list') {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}><RichText text={item} /></li>
              ))}
            </ul>
          )
        }
        if (block.type === 'table') {
          const [head, ...rows] = block.rows
          return (
            <div key={i} className="overflow-x-auto rounded-card border border-(--line) bg-(--surface-raised) px-5 py-2" data-lenis-prevent>
              <table>
                <thead>
                  <tr>{head.map((cell, j) => <th key={j} scope="col">{cell}</th>)}</tr>
                </thead>
                <tbody>
                  {rows.map((row, r) => (
                    <tr key={r}>{row.map((cell, j) => (j === 0 ? <th key={j} scope="row" className="font-sans! font-medium! text-(--fg)!">{cell}</th> : <td key={j}>{cell}</td>))}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        if (block.type === 'image') {
          return (
            <figure key={i} className="overflow-hidden rounded-card bg-(--surface-raised)">
              <img src={block.src} alt={block.alt} width={block.w} height={block.h} loading="lazy" className="mx-auto max-h-[34rem] w-auto" />
            </figure>
          )
        }
        return <p key={i}><RichText text={block.text} /></p>
      })}
    </div>
  )
}
