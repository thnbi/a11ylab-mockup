/* ============================================================
   Card, container genérico (surface raised + border).
   Variante `interactive` ganha hover sombra+translate.
   Segue DESIGN.md §Components.card / card-interactive-hover.
   ============================================================ */

export default function Card({
  as: Component = 'div',
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <Component
      {...rest}
      className={[
        'bg-surface-raised border border-border rounded-lg p-5',
        interactive
          ? 'transition-all hover:shadow-md hover:-translate-y-0.5'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Component>
  )
}
