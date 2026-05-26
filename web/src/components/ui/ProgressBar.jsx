/* ============================================================
   ProgressBar, barra com track surface-sunken e fill colorido.
   Segue DESIGN.md §Components.progress-track / progress-fill.

   Acessibilidade: aplica role="progressbar" + aria-valuenow.
   Se `label` for fornecido, ele é usado como `aria-label`.
   ============================================================ */

const FILLS = {
  violeta: 'bg-violeta-500',
  sucesso: 'bg-sucesso-500',
  ambar: 'bg-ambar-500',
  dodger: 'bg-dodger-500',
}

const SIZES = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-2.5',
}

export default function ProgressBar({
  value,
  max = 100,
  tone = 'violeta',
  size = 'md',
  label,
  className = '',
}) {
  const pct = max === 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={[
        'bg-surface-sunken rounded-full overflow-hidden w-full',
        SIZES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${FILLS[tone]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
