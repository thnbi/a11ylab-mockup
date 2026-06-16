import { useState, useMemo, useRef, useEffect } from 'react'
import {
  ChevronRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Clock,
  Heart,
  Flame,
  Trophy,
  RotateCcw,
  Compass,
} from 'lucide-react'
import { getDesafio, getProximoDesafio, getTrilha } from './data/helpers'
import { Evidencia } from './data/evidencias'
import { useProgress } from './contexts/ProgressContext'
import { useSurvey } from './contexts/SurveyContext'
import CsatCard from './components/surveys/CsatCard'
import { BackLink, Button, OptionCard, getEstado, Tag, ProgressBar } from './components/ui'

/* ============================================================
   DesafioScreen, mini-quiz com múltiplas perguntas. Cada
   pergunta tem sua própria evidência (componente do mundo real).

   Estados:
     - jogando: usuário responde perguntas
     - gameOver: vidas zeraram → reset local
     - concluido: todas respondidas → tela celebratória
   ============================================================ */

export default function DesafioScreen({
  trilhaId,
  desafioId,
  onVoltarTrilha,
  onIrParaDesafio,
}) {
  const trilha = getTrilha(trilhaId)
  const desafio = getDesafio(trilhaId, desafioId)
  const { marcarPerguntaAcertada, marcarDesafioConcluido } = useProgress()

  const [perguntaIdx, setPerguntaIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [vidas, setVidas] = useState(3)
  const [combo, setCombo] = useState(0)
  const [xpAcumulado, setXpAcumulado] = useState(0)
  const [tela, setTela] = useState('jogando')
  const [xpBurst, setXpBurst] = useState(null) // { key, xp }

  const proximoDesafio = useMemo(
    () => (trilha ? getProximoDesafio(trilhaId, desafioId) : null),
    [trilha, trilhaId, desafioId]
  )

  // Limpa o burst após a animação para liberar o DOM. Deve vir antes
  // de qualquer early return para respeitar a ordem fixa de hooks.
  useEffect(() => {
    if (!xpBurst) return
    const t = setTimeout(() => setXpBurst(null), 1700)
    return () => clearTimeout(t)
  }, [xpBurst])

  if (!desafio || !trilha) {
    return (
      <div className="max-w-[1200px] mx-auto px-10 py-8">
        <BackLink onClick={onVoltarTrilha} className='hover:bg-violet-200 rounded-2xl p-1 pr-2'>Voltar para a trilha</BackLink>
        <p className="mt-8 text-body-md text-ink-muted">
          Desafio "{desafioId}" não encontrado.
        </p>
      </div>
    )
  }

  const pergunta = desafio.perguntas[perguntaIdx]
  const totalPerguntas = desafio.perguntas.length
  const ehUltima = perguntaIdx === totalPerguntas - 1
  const acertou = selected === pergunta?.respostaCorreta

  const handleConfirmar = () => {
    setConfirmed(true)
    if (selected === pergunta.respostaCorreta) {
      setAcertos((a) => a + 1)
      setCombo((c) => c + 1)
      setXpAcumulado((xp) => xp + pergunta.xpReward)
      marcarPerguntaAcertada(trilhaId, desafioId, pergunta.id, pergunta.xpReward)
      setXpBurst({ key: Date.now(), xp: pergunta.xpReward })
    } else {
      setVidas((v) => v - 1)
      setCombo(0)
    }
  }

  const proximaAcaoEhGameOver = confirmed && !acertou && vidas === 0

  const handleAvancar = () => {
    if (proximaAcaoEhGameOver) {
      setTela('gameOver')
      return
    }
    if (ehUltima) {
      marcarDesafioConcluido(trilhaId, desafioId, 0)
      setTela('concluido')
      return
    }
    setPerguntaIdx((i) => i + 1)
    setSelected(null)
    setConfirmed(false)
  }

  const handleTentarDeNovo = () => {
    setPerguntaIdx(0)
    setSelected(null)
    setConfirmed(false)
    setAcertos(0)
    setVidas(3)
    setCombo(0)
    setXpAcumulado(0)
    setTela('jogando')
  }

  if (tela === 'concluido') {
    return (
      <TelaConclusao
        desafio={desafio}
        acertos={acertos}
        total={totalPerguntas}
        xpGanho={xpAcumulado}
        proximoDesafio={proximoDesafio}
        onVoltarTrilha={onVoltarTrilha}
        onProximo={() => proximoDesafio && onIrParaDesafio(proximoDesafio.id)}
      />
    )
  }

  if (tela === 'gameOver') {
    return (
      <TelaGameOver
        desafio={desafio}
        acertos={acertos}
        total={totalPerguntas}
        onTentarDeNovo={handleTentarDeNovo}
        onVoltarTrilha={onVoltarTrilha}
      />
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 lg:py-8">
      {/* Linha 1: back-link à esquerda, corações à direita (alinhados) */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <BackLink onClick={onVoltarTrilha} className='hover:bg-violet-200 rounded-2xl p-1 pr-2'>Voltar para a trilha</BackLink>
        <Vidas vidas={vidas} />
      </div>

      {/* Linha 2: breadcrumb compacta */}
      <nav aria-label="Localização" className="mb-2">
        <ol className="flex items-center gap-2 text-body-sm text-ink-muted flex-wrap">
          <li>{trilha.titulo}</li>
          <li aria-hidden="true" className="text-ink-disabled">/</li>
          <li className="text-ink-strong font-medium">{desafio.titulo}</li>
        </ol>
      </nav>

      {/* Linha 3: título grande + duração inline; descrição abaixo */}
      <header className="mb-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h1 className="text-h1 lg:text-display text-ink-strong">{desafio.titulo}</h1>
          <p className="inline-flex items-center gap-1.5 text-body-sm text-ink-muted">
            <Clock size={14} aria-hidden="true" /> ~{desafio.duracaoMin} min
          </p>
        </div>
        <p className="mt-2 text-body-md lg:text-body-lg text-ink-muted max-w-2xl">
          {desafio.descricao}
        </p>
      </header>

      {/* Linha 4: progresso compacto (uma linha) - desafio na trilha + dots da pergunta + combo */}
      <ProgressStrip
        trilhaTitulo={trilha.titulo}
        desafioId={desafio.id}
        totalDesafiosTrilha={trilha.desafios.length}
        perguntaIdx={perguntaIdx}
        totalPerguntas={totalPerguntas}
        combo={combo}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <Pergunta
          key={pergunta.id}
          pergunta={pergunta}
          selected={selected}
          confirmed={confirmed}
          onSelect={setSelected}
          onConfirm={handleConfirmar}
        />
        <EvidenciaFrame evidenciaId={pergunta.evidenciaId} />
      </div>

      {confirmed && (
        <Feedback
          acertou={acertou}
          explicacao={pergunta.explicacao}
          xpReward={pergunta.xpReward}
          respostaCorreta={pergunta.respostaCorreta}
          ehUltima={ehUltima}
          ehGameOver={proximaAcaoEhGameOver}
          onAvancar={handleAvancar}
          perguntaId={pergunta.id}
        />
      )}

      {xpBurst && <XpBurst key={xpBurst.key} xp={xpBurst.xp} />}
    </div>
  )
}

/* ============================================================
   Overlay flutuante "+XX XP" - aparece, pulsa e sobe ao acertar.
   Renderizado em `fixed` para flutuar sobre qualquer conteúdo;
   `pointer-events-none` para não bloquear interação.
   `aria-hidden` porque o feedback já anuncia o ganho de XP via
   role="status" - esta é decoração visual redundante.
   ============================================================ */
function XpBurst({ xp }) {
  return (
    <div
      aria-hidden="true"
      className="fixed top-1/3 left-1/2 z-50 pointer-events-none animate-xp-burst"
    >
      <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-ambar-500 to-ambar-700 text-white text-h2 font-bold shadow-lg ring-4 ring-ambar-100/80">
        <Sparkles size={26} fill="currentColor" strokeWidth={2.4} />
        +{xp} XP
      </span>
    </div>
  )
}

/* ============================================================
   ProgressStrip, uma linha compacta com:
     - Texto contextual "Desafio 03/05 • Pergunta 1/4"
     - Dots de pergunta (largura horizontal)
     - Combo (quando ativo)
   Corações ficam fora desta strip (estão no topo da página).
   ============================================================ */
function ProgressStrip({
  trilhaTitulo,
  desafioId,
  totalDesafiosTrilha,
  perguntaIdx,
  totalPerguntas,
  combo,
}) {
  const posicao = perguntaIdx + 1
  return (
    <div className="mb-6 px-4 py-3 rounded-md bg-surface-sunken border border-border flex items-center gap-4 flex-wrap">
      <p className="text-label-sm text-ink-muted">
        <span className="hidden sm:inline">{trilhaTitulo} • </span>
        Desafio <span className="font-semibold text-ink-strong">{desafioId}</span>/
        {String(totalDesafiosTrilha).padStart(2, '0')}
        <span aria-hidden="true" className="mx-1.5">•</span>
        <span className="font-semibold text-ink-strong">Pergunta {posicao}/{totalPerguntas}</span>
      </p>
      <ol aria-hidden="true" className="flex items-center gap-1.5 flex-1 min-w-0 justify-center sm:justify-start">
        {Array.from({ length: totalPerguntas }).map((_, i) => {
          const concluida = i < perguntaIdx
          const atual = i === perguntaIdx
          return (
            <li
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                concluida
                  ? 'w-7 bg-sucesso-500'
                  : atual
                  ? 'w-10 bg-dodger-500'
                  : 'w-7 bg-surface-raised border border-border'
              }`}
            />
          )
        })}
      </ol>
      {combo >= 2 && (
        <Tag tone="xp" size="sm" icon={Flame} iconFill aria-label={`Combo de ${combo} acertos seguidos`}>
          {combo}× combo
        </Tag>
      )}
    </div>
  )
}

/* ============================================================
   Vidas, três corações grandes. Quando o usuário erra, o
   coração da posição que acabou de virar "vazia" toca uma
   animação de quebra (scale + rotate + fade-out) revelando o
   coração vazio cinza embaixo.

   Implementação: duas camadas sobrepostas, empty cinza ao
   fundo, filled vermelho na frente. Ativos mostram o filled;
   ao perder vida, mantemos o filled brevemente com a classe
   animate-heart-break, que o anima até desaparecer.
   ============================================================ */
function Vidas({ vidas, tamanho = 30 }) {
  const prevVidasRef = useRef(vidas)
  const [perdidoAgora, setPerdidoAgora] = useState(null)

  useEffect(() => {
    const prev = prevVidasRef.current
    prevVidasRef.current = vidas
    if (vidas < prev) {
      const idx = prev - 1 // índice do coração que acabou de virar vazio
      setPerdidoAgora(idx)
      const t = setTimeout(() => setPerdidoAgora(null), 700)
      return () => clearTimeout(t)
    }
  }, [vidas])

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label={`${vidas} de 3 vidas restantes`}
    >
      {Array.from({ length: 3 }).map((_, i) => {
        const ativo = i < vidas
        const quebrandoAgora = perdidoAgora === i
        return <HeartSlot key={i} ativo={ativo} quebrandoAgora={quebrandoAgora} tamanho={tamanho} />
      })}
    </div>
  )
}

function HeartSlot({ ativo, quebrandoAgora, tamanho }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block"
      style={{ width: tamanho, height: tamanho }}
    >
      {/* fundo: coração vazio cinza (sempre presente) */}
      <Heart
        size={tamanho}
        strokeWidth={2.2}
        className="absolute inset-0 text-ink-disabled"
      />
      {/* topo: coração cheio vermelho, visível enquanto ativo OU
          enquanto a animação de quebra estiver tocando */}
      {(ativo || quebrandoAgora) && (
        <Heart
          size={tamanho}
          strokeWidth={2.2}
          fill="currentColor"
          className={`absolute inset-0 text-erro-500 ${quebrandoAgora ? 'animate-heart-break' : ''}`}
        />
      )}
    </span>
  )
}

/* ============================================================
   Pergunta + opções
   ============================================================ */
function Pergunta({ pergunta, selected, confirmed, onSelect, onConfirm }) {
  return (
    <section className="bg-surface-raised border border-border rounded-lg p-6 flex flex-col">
      <h2 className="text-h2 text-ink-strong mb-5">{pergunta.enunciado}</h2>
      <ul className="space-y-3 flex-1" role="radiogroup" aria-label="Opções de resposta">
        {pergunta.opcoes.map((op) => (
          <li key={op.id}>
            <OptionCard
              opcao={op}
              estado={getEstado(op.id, selected, confirmed, pergunta.respostaCorreta)}
              onClick={() => !confirmed && onSelect(op.id)}
            />
          </li>
        ))}
      </ul>
      {!confirmed && (
        <Button
          variant="primary"
          fullWidth
          disabled={!selected}
          onClick={onConfirm}
          className="mt-6"
        >
          Confirmar resposta
        </Button>
      )}
    </section>
  )
}

/* ============================================================
   Evidence frame - "janela" estilo editor com componente sob
   análise no centro. Header de surface-sunken + 3 dots macOS.
   ============================================================ */
function EvidenciaFrame({ evidenciaId }) {
  return (
    <section className="bg-surface-raised border border-border rounded-lg overflow-hidden flex flex-col">
      <header className="bg-surface-sunken border-b border-border px-4 py-2.5 flex items-center justify-between">
        <span className="font-mono text-label-sm text-ink-muted">
          Componente em análise
        </span>
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-erro-500" />
          <span className="w-2 h-2 rounded-full bg-ambar-500" />
          <span className="w-2 h-2 rounded-full bg-sucesso-500" />
        </span>
      </header>
      <div
        key={evidenciaId}
        className="flex-1 bg-white px-10 py-12 flex flex-col items-center justify-center"
      >
        <Evidencia id={evidenciaId} />
      </div>
    </section>
  )
}

/* ============================================================
   Frases de incentivo, escolhidas de forma estável por pergunta.
   Não usamos Math.random no render para evitar troca de texto a
   cada re-render (ex.: ao mexer no estado xpBurst).
   ============================================================ */
const FRASES_ACERTO = [
  'Mandou bem! Olha só por que isso importa…',
  'Isso aí! Você pegou a ideia.',
  'Boa! Esse é o caminho.',
  'Show de bola! Segue assim.',
]
const FRASES_ERRO = [
  'Sem stress, vamos entender juntos!',
  'Errar faz parte — bora destrinchar.',
  'Quase! Olha só a explicação.',
  'Calma, isso aqui pega muita gente.',
]
function frasePorId(arr, id) {
  const s = String(id ?? '')
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return arr[h % arr.length]
}

/* ============================================================
   Painel de feedback após confirmar
   ============================================================ */
function Feedback({
  acertou,
  explicacao,
  xpReward,
  respostaCorreta,
  ehUltima,
  ehGameOver,
  onAvancar,
  perguntaId,
}) {
  const labelBotao = ehGameOver
    ? 'Ver resultado'
    : ehUltima
    ? 'Concluir desafio'
    : 'Próxima pergunta'

  const fraseIncentivo = acertou
    ? frasePorId(FRASES_ACERTO, perguntaId)
    : frasePorId(FRASES_ERRO, perguntaId)

  return (
    <section
      role="status"
      aria-live="polite"
      className={`mt-6 rounded-lg p-6 border-2 ${
        acertou ? 'bg-sucesso-50 border-sucesso-100' : 'bg-erro-50 border-erro-100'
      }`}
    >
      <header className="flex items-start gap-4 mb-3 flex-wrap">
        <Mascote acertou={acertou} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            {acertou ? (
              <CheckCircle2 size={28} className="text-sucesso-700" aria-hidden="true" />
            ) : (
              <XCircle size={28} className="text-erro-700" aria-hidden="true" />
            )}
            <h3
              className={`text-h3 font-bold ${
                acertou ? 'text-sucesso-700' : 'text-erro-700'
              }`}
            >
              {acertou
                ? 'Resposta correta!'
                : `Não foi dessa vez. A opção correta era ${respostaCorreta}.`}
            </h3>
            {acertou && (
              <Tag tone="xp" size="md" icon={Sparkles} className="ml-auto">
                +{xpReward} XP
              </Tag>
            )}
          </div>
          <p
            className={`mt-1 text-body-sm font-semibold ${
              acertou ? 'text-sucesso-700' : 'text-erro-700'
            }`}
          >
            {fraseIncentivo}
          </p>
        </div>
      </header>
      <p className="text-body-md text-ink">{explicacao}</p>
      <div className="mt-5 flex gap-3 flex-wrap">
        <Button variant="primary" onClick={onAvancar} iconRight={ChevronRight}>
          {labelBotao}
        </Button>
      </div>
    </section>
  )
}

function Mascote({ acertou }) {
  return (
    <span
      aria-hidden="true"
      className={`
        shrink-0 inline-flex items-center justify-center
        w-20 h-20 rounded-full bg-white shadow-sm
        ring-4 ${acertou ? 'ring-sucesso-200 motion-safe:animate-cheer-bounce' : 'ring-erro-200 motion-safe:animate-sad-wobble'}
      `}
    >
      <img src="/logo-olhos.png" alt="" className="w-12 h-auto" />
    </span>
  )
}

/* ============================================================
   Confete CSS-only, partículas posicionadas em ângulos diferentes
   caindo do topo da tela. Sem libs externas, sem JS de animação.
   `aria-hidden`: decoração — a conclusão já tem texto e XP visíveis.
   ============================================================ */
const CONFETTI_CORES = [
  'var(--color-ambar-500)',
  'var(--color-dodger-500)',
  'var(--color-violeta-500)',
  'var(--color-sucesso-500)',
  'var(--color-teal-500)',
]
function Confetti({ count = 24 }) {
  const pecas = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 100) / count + (i % 3) * 2,
        delay: (i % 7) * 0.12,
        duration: 2.2 + (i % 5) * 0.25,
        cor: CONFETTI_CORES[i % CONFETTI_CORES.length],
        rotate: (i * 47) % 360,
        size: 6 + (i % 4) * 2,
      })),
    [count]
  )
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden motion-reduce:hidden"
    >
      {pecas.map((p, i) => (
        <span
          key={i}
          className="absolute top-[-20px] block motion-safe:animate-confetti-fall"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.cor,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  )
}

/* ============================================================
   Tela de conclusão do desafio
   ============================================================ */
function TelaConclusao({
  desafio,
  acertos,
  total,
  xpGanho,
  proximoDesafio,
  onVoltarTrilha,
  onProximo,
}) {
  const aproveitamento = total === 0 ? 0 : (acertos / total) * 100
  const perfeito = acertos === total
  const { shouldShowCsat } = useSurvey()
  const titulo = perfeito
    ? 'Desafio dominado!'
    : acertos >= total / 2
    ? 'Desafio concluído!'
    : 'Desafio concluído'

  return (
    <div className="max-w-[800px] mx-auto px-10 py-12 relative">
      {perfeito && <Confetti />}
      <div className="flex flex-col items-center text-center gap-5">
        <span
          aria-hidden="true"
          className={`
            inline-flex items-center justify-center w-28 h-28 rounded-full
            ${perfeito
              ? 'bg-gradient-to-br from-ambar-500 to-violeta-500 text-white ring-8 ring-ambar-100 motion-safe:animate-cheer-bounce'
              : 'bg-sucesso-500 text-white ring-8 ring-sucesso-100'}
            shadow-lg
          `}
        >
          {perfeito ? (
            <Trophy size={50} strokeWidth={2.4} />
          ) : (
            <CheckCircle2 size={50} strokeWidth={2.4} />
          )}
        </span>
        <Tag tone={perfeito ? 'xp' : 'success'} size="md" icon={Sparkles}>
          {perfeito ? 'Desempenho perfeito' : 'Bom trabalho'}
        </Tag>
        <h1 className="text-display text-ink-strong">{titulo}</h1>
        <p className="text-body-lg text-ink-muted max-w-lg">
          Você concluiu <strong className="text-ink-strong">{desafio.titulo}</strong>{' '}
          acertando {acertos} de {total} perguntas.
        </p>

        <div className="w-full max-w-md mt-2">
          <ProgressBar
            value={acertos}
            max={total}
            tone={perfeito ? 'ambar' : 'sucesso'}
            size="lg"
            label={`${acertos} de ${total} perguntas acertadas`}
          />
          <p className="mt-2 text-label-sm text-ink-muted">
            {Math.round(aproveitamento)}% de aproveitamento
          </p>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-ambar-50 border border-ambar-100">
          <Sparkles size={18} className="text-ambar-700" aria-hidden="true" fill="currentColor" />
          <span className="text-h3 font-bold text-ambar-700">+{xpGanho} XP</span>
          <span className="text-label-md text-ink-muted">ganhos neste desafio</span>
        </div>

        {shouldShowCsat(desafio.id) && (
          <CsatCard desafioId={desafio.id} />
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary" iconLeft={Compass} onClick={onVoltarTrilha}>
            Voltar para a trilha
          </Button>
          {proximoDesafio && (
            <Button variant="primary" iconRight={ChevronRight} onClick={onProximo}>
              Próximo desafio
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Tela de game over (vidas zeraram)
   ============================================================ */
const FRASES_GAME_OVER = [
  'Errar faz parte de aprender — e você já chegou longe.',
  'Cada tentativa te aproxima do "ahá!" final.',
  'Respira fundo, dá pra refazer com calma. ✨',
  'Não é fracasso, é prática. Bora de novo?',
]

function TelaGameOver({ desafio, acertos, total, onTentarDeNovo, onVoltarTrilha }) {
  const fraseIncentivo = useMemo(
    () => frasePorId(FRASES_GAME_OVER, desafio.id),
    [desafio.id]
  )
  return (
    <div className="max-w-[700px] mx-auto px-10 py-16">
      <div className="flex flex-col items-center text-center gap-5">
        <div className="relative">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-md ring-8 ring-violeta-100 motion-safe:animate-sad-wobble"
          >
            <img src="/logo-olhos.png" alt="" className="w-16 h-auto" />
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-10 h-10 rounded-full bg-erro-50 border-2 border-erro-100"
          >
            <Heart size={20} className="text-erro-500" strokeWidth={2.4} />
          </span>
        </div>
        <h1 className="text-h1 text-ink-strong">Quase lá!</h1>
        <p className="text-body-lg text-ink-muted max-w-md">
          No <strong className="text-ink-strong">{desafio.titulo}</strong> você
          acertou <strong className="text-ink-strong">{acertos} de {total}</strong>.
        </p>
        <p className="text-body-md text-violeta-700 font-semibold max-w-md">
          {fraseIncentivo}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary" onClick={onVoltarTrilha}>
            Voltar para a trilha
          </Button>
          <Button variant="primary" iconLeft={RotateCcw} onClick={onTentarDeNovo}>
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  )
}
