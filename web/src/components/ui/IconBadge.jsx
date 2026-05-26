/* ============================================================
   IconBadge, círculo/quadrado colorido com ícone Lucide ao
   centro. Reutilizado em conquistas, perfil, trilha-history,
   roadmap-section-icon, etc.
   ============================================================ */

const TONES = {
  violeta: 'bg-violeta-100 text-violeta-700',
  sucesso: 'bg-sucesso-100 text-sucesso-700',
  ambar: 'bg-ambar-500 text-ink-on-dark',
  teal: 'bg-teal-100 text-teal-700',
  dodger: 'bg-dodger-500 text-ink-on-dark',
  neutral: 'bg-surface-sunken text-ink-disabled border border-border',
  'violeta-solid': 'bg-violeta-500 text-ink-on-dark',
  'sucesso-solid': 'bg-sucesso-500 text-ink-on-dark',
}

const SIZES = {
  sm: { box: 'w-9 h-9', icon: 18 },
  md: { box: 'w-12 h-12', icon: 22 },
  lg: { box: 'w-16 h-16', icon: 30 },
  xl: { box: 'w-20 h-20', icon: 38 },
}

export default function IconBadge({
  icon: Icon,
  tone = 'violeta',
  size = 'md',
  shape = 'rounded',     // 'rounded' = rounded-md; 'circle' = rounded-full
  className = '',
  iconStrokeWidth = 2.2,
  'aria-label': ariaLabel,
}) {
  const s = SIZES[size]
  return (
    <span
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={[
        'inline-flex shrink-0 items-center justify-center',
        s.box,
        shape === 'circle' ? 'rounded-full' : 'rounded-md',
        TONES[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Icon && <Icon size={s.icon} strokeWidth={iconStrokeWidth} />}
    </span>
  )
}
