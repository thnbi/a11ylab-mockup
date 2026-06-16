import { Clock, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react'
import { getAula, getDesafio } from './data/helpers'
import { AulaConteudo } from './data/aulaConteudo'
import { useProgress } from './contexts/ProgressContext'
import { BackLink, Button, Tag } from './components/ui'

/* ============================================================
   AulaScreen, exibe o conteúdo teórico que precede um desafio.
   Recebe trilhaId e aulaId; busca em data/aulas.js + renderiza
   o componente correspondente de data/aulaConteudo.jsx.

   Ações no rodapé:
     - "Marcar como concluída" → marcarAulaVista + volta à trilha
     - "Iniciar desafio" → marca como vista + abre o desafio ligado
   ============================================================ */

export default function AulaScreen({
  trilhaId,
  aulaId,
  onVoltarTrilha,
  onIrParaDesafio,
}) {
  const aula = getAula(trilhaId, aulaId)
  const { marcarAulaVista, getStatusAula } = useProgress()

  if (!aula) {
    return (
      <div className="max-w-[820px] mx-auto px-10 py-8">
        <BackLink onClick={onVoltarTrilha} className='hover:bg-violet-200 rounded-2xl p-1 pr-2'>Voltar para a trilha</BackLink>
        <p className="mt-8 text-body-md text-ink-muted">
          Aula "{aulaId}" não encontrada.
        </p>
      </div>
    )
  }

  const desafioRelacionado = getDesafio(trilhaId, aula.desafioId)
  const status = getStatusAula(trilhaId, aulaId)
  const jaVista = status === 'vista'

  const handleConcluir = () => {
    marcarAulaVista(trilhaId, aulaId)
    onVoltarTrilha()
  }

  const handleIrDesafio = () => {
    marcarAulaVista(trilhaId, aulaId)
    onIrParaDesafio(aula.desafioId)
  }

  return (
    <div className="max-w-[820px] mx-auto px-10 py-8">
      <BackLink onClick={onVoltarTrilha} className="mb-4 hover:bg-violet-200 rounded-2xl p-1 pr-2">
        Voltar para a trilha
      </BackLink>

      <div className="mb-3 flex items-center gap-3 flex-wrap">
        <Tag tone="violeta" size="md" icon={BookOpen}>
          Aula
        </Tag>
        {jaVista && (
          <Tag tone="success" size="md" icon={CheckCircle2}>
            Já vista
          </Tag>
        )}
        <span className="inline-flex items-center gap-1 text-body-sm text-ink-muted">
          <Clock size={14} aria-hidden="true" /> ~{aula.duracaoMin} min de leitura
        </span>
      </div>

      <AulaConteudo id={aula.conteudoId} />

      <footer className="mt-12 pt-6 border-t border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-caps text-ink-muted">Próximo passo</p>
          {desafioRelacionado ? (
            <p className="text-body-md text-ink-strong">
              Desafio{' '}
              <span className="font-bold">{desafioRelacionado.id}</span> -{' '}
              {desafioRelacionado.titulo}
            </p>
          ) : (
            <p className="text-body-md text-ink-muted">
              Sem desafio vinculado a esta aula.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={handleConcluir}>
            Marcar como concluída
          </Button>
          {desafioRelacionado && (
            <Button
              variant="primary"
              iconRight={ChevronRight}
              onClick={handleIrDesafio}
            >
              Iniciar desafio
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
