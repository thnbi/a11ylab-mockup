import { CheckCircle2, XCircle } from 'lucide-react'

/* ============================================================
   OptionCard, card de opção em quiz. Letra/ícone à esquerda
   + texto. Estados: default, selected, correct, wrong, dimmed.
   Borda de 2px transparente no default para evitar shift de
   layout entre estados (DESIGN.md §Components.option-card).
   ============================================================ */

const CARD_STYLES = {
  default:
    'bg-surface-sunken border-transparent text-ink hover:border-dodger-200 hover:bg-dodger-50/50',
  selected: 'bg-dodger-50 border-dodger-500 text-dodger-700 font-semibold',
  correct: 'bg-sucesso-50 border-sucesso-500 text-sucesso-700 font-semibold',
  'correct-highlight': 'bg-sucesso-50 border-sucesso-500 text-sucesso-700 font-semibold',
  wrong: 'bg-erro-50 border-erro-500 text-erro-700 font-semibold',
  dimmed: 'bg-surface-sunken border-transparent text-ink-muted opacity-60',
}

const LETTER_STYLES = {
  default: 'bg-surface-raised border border-border text-ink-muted',
  selected: 'bg-dodger-500 text-white',
  correct: 'bg-sucesso-500 text-white',
  'correct-highlight': 'bg-sucesso-500 text-white',
  wrong: 'bg-erro-500 text-white',
  dimmed: 'bg-surface-raised border border-border text-ink-disabled',
}

export default function OptionCard({ opcao, estado, onClick }) {
  const interactive = estado === 'default' || estado === 'selected'
  // 'correct-highlight' = right answer not chosen by user; must NOT be aria-checked=true
  // to avoid two radios checked simultaneously in the group
  const checked = estado === 'selected' || estado === 'correct' || estado === 'wrong'

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      disabled={!interactive}
      className={[
        'w-full text-left flex items-center gap-4 p-4 rounded-md border-2 transition-all',
        CARD_STYLES[estado],
        interactive ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-label-md',
          LETTER_STYLES[estado],
        ].join(' ')}
      >
        {estado === 'correct' || estado === 'correct-highlight' ? (
          <CheckCircle2 size={20} strokeWidth={2.5} />
        ) : estado === 'wrong' ? (
          <XCircle size={20} strokeWidth={2.5} />
        ) : (
          opcao.id
        )}
      </span>
      <span className="text-body-md flex-1">
        {opcao.texto}
        {estado === 'correct-highlight' && (
          <span className="sr-only"> (resposta correta)</span>
        )}
      </span>
    </button>
  )
}

export function getEstado(id, selected, confirmed, respostaCorreta) {
  if (!confirmed) {
    return selected === id ? 'selected' : 'default'
  }
  if (id === respostaCorreta && id === selected) return 'correct'
  if (id === respostaCorreta) return 'correct-highlight'
  if (id === selected) return 'wrong'
  return 'dimmed'
}
