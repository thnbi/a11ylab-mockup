import { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import { useSurvey } from '../../contexts/SurveyContext'

function getScoreColor(score, hoveredScore) {
  if (hoveredScore === null || score > hoveredScore) {
    return 'bg-surface-raised border border-border text-ink-muted hover:bg-surface-sunken'
  }
  if (hoveredScore >= 9) return 'bg-dodger-100 text-dodger-700 border border-dodger-200'
  if (hoveredScore <= 6) return 'bg-erro-100 text-erro-700 border border-erro-200'
  return 'bg-ambar-100 text-ambar-700 border border-ambar-200'
}

export default function NpsCard({ onDismiss }) {
  const { submitNps, dismissNps } = useSurvey()
  const [hoveredScore, setHoveredScore] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (score) => {
    submitNps(score)
    setSubmitted(true)
  }

  const handleDismiss = () => {
    dismissNps()
    onDismiss?.()
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-raised border border-border text-body-sm text-ink-muted"
      >
        <CheckCircle2 size={16} className="text-sucesso-700 shrink-0" aria-hidden="true" />
        Obrigado! Seu feedback nos ajuda a melhorar.
      </div>
    )
  }

  return (
    <div className="px-4 py-4 rounded-lg bg-surface-raised border border-border">
      <div className="flex items-start justify-between gap-4 mb-3">
        <p id="nps-label" className="text-body-sm text-ink-muted">
          O quanto você indicaria o Ally para um colega?
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dispensar pesquisa"
          className="shrink-0 p-1 rounded text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger-500"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div
        role="radiogroup"
        aria-labelledby="nps-label"
        className="flex items-center gap-1 flex-wrap"
        onMouseLeave={() => setHoveredScore(null)}
      >
        {Array.from({ length: 11 }, (_, i) => i).map((score) => (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={false}
            aria-label={`${score}`}
            onClick={() => handleSelect(score)}
            onMouseEnter={() => setHoveredScore(score)}
            className={`
              w-9 h-9 rounded text-label-sm font-semibold transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger-500
              ${getScoreColor(score, hoveredScore)}
            `}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-label-sm text-ink-disabled">Nada provável</span>
        <span className="text-label-sm text-ink-disabled">Extremamente provável</span>
      </div>
    </div>
  )
}
