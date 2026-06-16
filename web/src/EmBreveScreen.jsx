import { Hammer, Clock, Zap, ChevronRight } from 'lucide-react'
import { BackLink, Button } from './components/ui'
import { sections } from './data/trilhas'
import { getTrilha } from './data/helpers'

/* ============================================================
   EmBreveScreen, placeholder amigável para tópicos que ainda
   não têm trilha de verdade. Substitui qualquer sensação de
   "bloqueado" por "estamos preparando".
   ============================================================ */

function getSugestoes(limite = 2) {
  const sugestoes = []
  for (const section of sections) {
    for (const topico of section.topicos) {
      if (topico.trilhaId && sugestoes.length < limite) {
        sugestoes.push(topico)
      }
    }
    if (sugestoes.length >= limite) break
  }
  return sugestoes
}

export default function EmBreveScreen({
  topicoTitulo,
  topicoSubtitulo,
  onVoltarRoadmap,
  onAbrirTrilha,
}) {
  const sugestoes = getSugestoes(2)

  return (
    <div className="max-w-[800px] mx-auto px-6 py-10">
      <BackLink onClick={onVoltarRoadmap} className="mb-6 hover:bg-violet-200 rounded-2xl p-1 pr-2">
        Voltar ao roadmap
      </BackLink>

      <div className="flex flex-col items-center text-center gap-5">
        <div className="relative">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-md ring-8 ring-violeta-100 motion-safe:animate-float"
          >
            <img src="/logo-olhos.png" alt="" className="w-16 h-auto" />
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-11 h-11 rounded-full bg-violeta-50 border-2 border-violeta-200"
          >
            <Hammer size={20} strokeWidth={2.4} className="text-violeta-700" />
          </span>
        </div>

        <h1 className="text-display text-ink-strong">
          {topicoTitulo}
        </h1>
        {topicoSubtitulo && (
          <p className="text-body-lg text-ink-muted">{topicoSubtitulo}</p>
        )}

        <div
          className="mt-2 max-w-lg rounded-lg bg-violeta-50 border-2 border-violeta-100 px-5 py-4"
          role="status"
        >
          <p className="text-body-md text-violeta-700 font-semibold">
            Tô preparando essa trilha com carinho. <span aria-hidden="true">💛</span>
          </p>
          <p className="mt-1 text-body-sm text-ink-muted">
            Logo, logo ela vai estar cheia de desafios interativos por aqui.
          </p>
        </div>

        {sugestoes.length > 0 && onAbrirTrilha && (
          <section className="w-full max-w-lg mt-4 text-left">
            <h2 className="text-label-sm text-caps text-ink-muted mb-3">
              Enquanto isso, que tal explorar?
            </h2>
            <ul className="space-y-3">
              {sugestoes.map((topico) => {
                const trilha = getTrilha(topico.trilhaId)
                if (!trilha) return null
                const xpTotal = trilha.desafios.reduce((s, d) => s + d.xp, 0)
                return (
                  <li key={topico.id}>
                    <button
                      type="button"
                      onClick={() => onAbrirTrilha(topico.trilhaId)}
                      className="w-full text-left flex items-center gap-4 p-4 rounded-lg border-2 border-border bg-surface-raised hover:border-dodger-500 hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-h3 font-bold text-ink-strong leading-tight">
                          {topico.titulo}
                        </h3>
                        {topico.subtitulo && (
                          <p className="text-body-sm text-ink-muted mt-0.5">
                            {topico.subtitulo}
                          </p>
                        )}
                        <p className="mt-2 inline-flex items-center gap-2 text-label-sm text-ink-muted">
                          <Clock size={12} aria-hidden="true" />~{trilha.duracaoMin} min
                          <span aria-hidden="true">•</span>
                          <Zap size={12} strokeWidth={2.5} fill="currentColor" className="text-ambar-500" aria-hidden="true" />
                          {xpTotal} XP
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-ink-muted shrink-0" aria-hidden="true" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <Button variant="secondary" onClick={onVoltarRoadmap} className="mt-4">
          Voltar para o roadmap
        </Button>
      </div>
    </div>
  )
}
