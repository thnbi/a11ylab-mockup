/* ============================================================
   Button, primary / secondary / ghost.
   Segue DESIGN.md §Components.button-*. Garante alvo de toque
   ≥ 44px e foco visível via outline global.
   ============================================================ */

const VARIANTS = {
  primary:
    'bg-dodger-500 text-ink-on-dark hover:bg-dodger-600 active:bg-dodger-700 disabled:bg-ink-disabled',
  secondary:
    'bg-surface-raised text-violeta-700 border border-violeta-200 hover:bg-violeta-50 active:bg-violeta-100 disabled:text-ink-disabled disabled:border-border',
  ghost:
    'bg-transparent text-ink-muted hover:bg-surface-sunken hover:text-ink-strong disabled:text-ink-disabled',
}

const SIZES = {
  md: 'h-11 px-5 text-label-md',
  sm: 'h-9 px-3 text-label-sm',
  lg: 'h-12 px-6 text-label-md',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      {...rest}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-md font-bold whitespace-nowrap',
        'transition-colors disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {IconLeft && <IconLeft size={size === 'sm' ? 14 : 18} strokeWidth={2.5} aria-hidden="true" />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : 18} strokeWidth={2.5} aria-hidden="true" />}
    </button>
  )
}
