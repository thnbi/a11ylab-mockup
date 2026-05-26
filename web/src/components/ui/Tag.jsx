/* ============================================================
   Tag, pill compacta para categorias, status e XP.
   Segue DESIGN.md §Components.tag*.
   ============================================================ */

const TONES = {
  violeta: 'bg-violeta-100 text-violeta-700',
  success: 'bg-sucesso-100 text-sucesso-700',
  xp: 'bg-ambar-100 text-ambar-700',
  info: 'bg-teal-100 text-teal-700',
  ambar: 'bg-ambar-500 text-ink-on-dark',     // "Você está aqui"
  neutral: 'bg-surface-sunken text-ink-muted',
  erro: 'bg-erro-100 text-erro-700',
}

const SIZES = {
  sm: 'px-2 py-0.5 text-label-sm',
  md: 'px-3 py-1 text-label-sm',
  lg: 'px-3 py-1.5 text-label-md',
}

export default function Tag({
  tone = 'violeta',
  size = 'md',
  icon: Icon,
  iconFill = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <span
      {...rest}
      className={[
        'inline-flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap',
        TONES[tone],
        SIZES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Icon && (
        <Icon
          size={size === 'lg' ? 14 : 12}
          strokeWidth={2.5}
          fill={iconFill ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
