import { ChevronLeft } from 'lucide-react'

/* ============================================================
   BackLink, chevron-left + texto. Estilo ghost, sem fundo.
   Segue DESIGN.md §Components.back-link.
   ============================================================ */

export default function BackLink({ onClick, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1 text-label-md text-ink-muted hover:text-ink-strong transition-colors',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
      {children}
    </button>
  )
}
