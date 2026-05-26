import { Hammer } from 'lucide-react'
import { BackLink, Button } from './components/ui'

/* ============================================================
   EmBreveScreen, placeholder amigável para tópicos que ainda
   não têm trilha de verdade. Substitui qualquer sensação de
   "bloqueado" por "estamos preparando".
   ============================================================ */

export default function EmBreveScreen({ topicoTitulo, topicoSubtitulo, onVoltarRoadmap }) {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-10">
      <BackLink onClick={onVoltarRoadmap} className="mb-6">
        Voltar ao roadmap
      </BackLink>

      <div className="flex flex-col items-center text-center gap-5">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-violeta-50 text-violeta-700 ring-8 ring-violeta-100"
        >
          <Hammer size={40} strokeWidth={2.2} />
        </span>

        <h1 className="text-display text-ink-strong">
          {topicoTitulo}
        </h1>
        {topicoSubtitulo && (
          <p className="text-body-lg text-ink-muted">{topicoSubtitulo}</p>
        )}

        <div className="mt-2 max-w-lg space-y-3">
          <p className="text-body-md text-ink">
            Esta trilha está sendo preparada, em breve teremos desafios
            interativos aqui.
          </p>
          <p className="text-body-sm text-ink-muted">
            Enquanto isso, você pode explorar livremente as outras trilhas
            do roadmap.
          </p>
        </div>

        <Button variant="primary" onClick={onVoltarRoadmap} className="mt-4">
          Voltar para o roadmap
        </Button>
      </div>
    </div>
  )
}
