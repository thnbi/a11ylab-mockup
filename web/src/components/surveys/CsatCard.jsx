import { useState } from 'react'
import { Star, CheckCircle2 } from 'lucide-react'
import { useSurvey } from '../../contexts/SurveyContext'

export default function CsatCard({ desafioId }) {
  const { submitCsat } = useSurvey()
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (rating) => {
    submitCsat(desafioId, rating)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-raised border border-border text-body-sm text-ink-muted"
      >
        <CheckCircle2 size={16} className="text-sucesso-700 shrink-0" aria-hidden="true" />
        Obrigado pelo feedback!
      </div>
    )
  }

  return (
    <div className="mt-6 px-4 py-3 rounded-lg bg-surface-raised border border-border">
      <p id="csat-label" className="text-body-sm text-ink-muted mb-2">
        Como foi esse desafio?
      </p>
      <div
        role="radiogroup"
        aria-labelledby="csat-label"
        className="flex items-center gap-1"
        onMouseLeave={() => setHoveredRating(0)}
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={false}
            aria-label={`${rating} estrela${rating > 1 ? 's' : ''}`}
            onClick={() => handleSelect(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            className="p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dodger-500"
          >
            <Star
              size={24}
              strokeWidth={2}
              aria-hidden="true"
              fill={rating <= hoveredRating ? 'currentColor' : 'none'}
              className={`transition-colors ${
                rating <= hoveredRating ? 'text-ambar-500' : 'text-ink-disabled'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
