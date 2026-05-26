/* ============================================================
   Evidências dos desafios, componentes "do mundo real" sendo
   inspecionados pelo aluno. Cada um demonstra uma barreira de
   acessibilidade específica para a pergunta correspondente.

   Mantém paleta clara fixa (independente do tema da app), porque
   representa um app externo sendo auditado.
   ============================================================ */

const SLATE_900 = '#0F172A'
const SLATE_700 = '#334155'
const SLATE_500 = '#64748B'
const SLATE_400 = '#94A3B8'
const SLATE_300 = '#CBD5E1'
const SLATE_200 = '#E2E8F0'
const SLATE_50 = '#F8FAFC'

/* --- 01 - Foco visível -------------------------------------- */
function BotaoSemFocoVisivel() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-body-sm" style={{ color: SLATE_500 }}>
        Tente passar o foco com Tab:
      </p>
      <button
        type="button"
        className="px-6 py-2.5 rounded-md text-label-md font-semibold focus:outline-none"
        style={{
          background: SLATE_900,
          color: '#fff',
        }}
      >
        Salvar alterações
      </button>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        outline: none;
      </p>
    </div>
  )
}

function FocoBomVsRuim() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-body-sm mb-2" style={{ color: SLATE_500 }}>
        Qual destes botões está focado pelo teclado?
      </p>
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="px-5 py-2 rounded-md text-label-md font-semibold focus:outline-none"
          style={{ background: SLATE_900, color: '#fff' }}
        >
          Botão A
        </button>
        <button
          type="button"
          className="px-5 py-2 rounded-md text-label-md font-semibold focus:outline-none"
          style={{
            background: SLATE_900,
            color: '#fff',
            outline: `3px solid #1E90FF`,
            outlineOffset: 2,
          }}
        >
          Botão B
        </button>
      </div>
    </div>
  )
}

function TabOrderQuebrada() {
  return (
    <form className="w-full max-w-sm flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="font-mono text-label-sm" style={{ color: SLATE_500 }}>
          Nome <span style={{ color: SLATE_400 }}>(tabIndex=3)</span>
        </span>
        <input
          tabIndex={3}
          className="h-10 px-3 rounded-md"
          style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_900 }}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-label-sm" style={{ color: SLATE_500 }}>
          E-mail <span style={{ color: SLATE_400 }}>(tabIndex=1)</span>
        </span>
        <input
          tabIndex={1}
          className="h-10 px-3 rounded-md"
          style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_900 }}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-mono text-label-sm" style={{ color: SLATE_500 }}>
          Telefone <span style={{ color: SLATE_400 }}>(tabIndex=2)</span>
        </span>
        <input
          tabIndex={2}
          className="h-10 px-3 rounded-md"
          style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_900 }}
        />
      </label>
    </form>
  )
}

/* --- 02 - Labels -------------------------------------------- */
function PlaceholderComoLabel() {
  return (
    <form className="w-full max-w-sm flex flex-col gap-3">
      <input
        type="email"
        placeholder="E-mail"
        className="h-11 px-3 rounded-md"
        style={{
          background: '#fff',
          border: `1px solid ${SLATE_200}`,
          color: SLATE_900,
        }}
      />
      <input
        type="password"
        placeholder="Senha"
        className="h-11 px-3 rounded-md"
        style={{
          background: '#fff',
          border: `1px solid ${SLATE_200}`,
          color: SLATE_900,
        }}
      />
      <button
        type="button"
        className="h-11 rounded-md text-label-md font-semibold"
        style={{ background: '#1E90FF', color: '#fff' }}
      >
        Entrar
      </button>
      <p className="font-mono text-label-sm mt-1" style={{ color: SLATE_400 }}>
        Nenhum &lt;label&gt; associado.
      </p>
    </form>
  )
}

function FormSemLabel() {
  return (
    <div className="w-full max-w-sm flex flex-col gap-3">
      <p className="text-body-sm" style={{ color: SLATE_700 }}>
        CPF
      </p>
      <input
        className="h-11 px-3 rounded-md"
        style={{
          background: '#fff',
          border: `1px solid ${SLATE_200}`,
          color: SLATE_900,
        }}
      />
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        &lt;p&gt; visualmente parece label,<br />mas não está conectado ao input.
      </p>
    </div>
  )
}

function FormSemAgrupamento() {
  return (
    <form className="w-full max-w-md flex flex-col gap-3">
      <p className="text-h3 font-semibold" style={{ color: SLATE_900 }}>
        Como prefere ser contatado?
      </p>
      <label className="flex items-center gap-2 text-body-sm" style={{ color: SLATE_700 }}>
        <input type="radio" name="contato" /> E-mail
      </label>
      <label className="flex items-center gap-2 text-body-sm" style={{ color: SLATE_700 }}>
        <input type="radio" name="contato" /> Telefone
      </label>
      <label className="flex items-center gap-2 text-body-sm" style={{ color: SLATE_700 }}>
        <input type="radio" name="contato" /> WhatsApp
      </label>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        Sem &lt;fieldset&gt; / &lt;legend&gt;
      </p>
    </form>
  )
}

function BotaoIconeSemLabel() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-body-sm" style={{ color: SLATE_500 }}>
        Barra de ferramentas:
      </p>
      <div className="flex items-center gap-2 p-2 rounded-md" style={{ background: SLATE_50 }}>
        <button
          type="button"
          className="w-10 h-10 rounded-md flex items-center justify-center"
          style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_700 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-md flex items-center justify-center"
          style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_700 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/></svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-md flex items-center justify-center"
          style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_700 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 22,22 2,22"/></svg>
        </button>
      </div>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        Nenhum botão tem texto ou aria-label.
      </p>
    </div>
  )
}

/* --- 03 - Contraste ----------------------------------------- */
function BotaoBaixoContraste() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-mono text-body-sm" style={{ color: SLATE_500 }}>
        Finalize seu pedido para receber em casa:
      </p>
      <button
        type="button"
        className="px-8 py-3 rounded-md bg-white border text-label-md font-semibold"
        style={{ color: SLATE_300, borderColor: SLATE_200 }}
      >
        Confirmar pedido
      </button>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        contrast ratio: 1.6:1
      </p>
    </div>
  )
}

function TextoCinzaClaro() {
  return (
    <div className="max-w-md flex flex-col gap-3">
      <p className="text-h3 font-semibold" style={{ color: SLATE_900 }}>
        Política de privacidade
      </p>
      <p className="text-body-md" style={{ color: SLATE_300 }}>
        Coletamos apenas dados necessários para a prestação do serviço.
        Você pode solicitar a exclusão a qualquer momento, gratuitamente,
        seguindo as diretrizes da LGPD.
      </p>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        text color #CBD5E1 sobre #FFFFFF - 1.6:1
      </p>
    </div>
  )
}

function LinkColorOnly() {
  return (
    <div className="max-w-md">
      <p className="text-body-md" style={{ color: SLATE_700 }}>
        Para mais informações, consulte os{' '}
        <a href="#" className="no-underline" style={{ color: SLATE_500 }}>
          termos de uso
        </a>{' '}
        ou entre em{' '}
        <a href="#" className="no-underline" style={{ color: SLATE_500 }}>
          contato com o suporte
        </a>.
      </p>
      <p className="font-mono text-label-sm mt-4" style={{ color: SLATE_400 }}>
        Links diferenciados apenas por tom de cinza.
      </p>
    </div>
  )
}

function TextoSobreImagem() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-72 h-40 rounded-lg flex items-center justify-center text-h2 font-bold relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #FBC56B 0%, #FFFFFF 50%, #C4F1EA 100%)',
          color: '#fff',
        }}
      >
        <span style={{ textShadow: 'none' }}>Promoção de outono</span>
      </div>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        Texto branco sobre área quase branca.
      </p>
    </div>
  )
}

/* --- 04 - Teclado ------------------------------------------- */
function AreaClicavelSemAriaLabel() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-body-sm" style={{ color: SLATE_500 }}>
        Card clicável:
      </p>
      <div
        onClick={() => {}}
        className="w-64 p-4 rounded-lg cursor-pointer"
        style={{ background: '#fff', border: `1px solid ${SLATE_200}` }}
      >
        <p className="text-h3 font-semibold" style={{ color: SLATE_900 }}>
          Plano Premium
        </p>
        <p className="text-body-sm" style={{ color: SLATE_500 }}>
          R$ 29/mês, clique para escolher
        </p>
      </div>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        &lt;div onClick&gt;, sem role, tabIndex ou keyboard handler.
      </p>
    </div>
  )
}

function TabIndexPositivo() {
  return (
    <form className="w-full max-w-sm flex flex-col gap-2">
      <label className="text-body-sm" style={{ color: SLATE_700 }}>
        Pesquisar
      </label>
      <input
        tabIndex={5}
        className="h-10 px-3 rounded-md"
        style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_900 }}
      />
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          tabIndex={2}
          className="px-3 h-9 rounded-md text-label-sm font-semibold"
          style={{ background: '#fff', border: `1px solid ${SLATE_200}`, color: SLATE_700 }}
        >
          Filtros
        </button>
        <button
          type="button"
          tabIndex={1}
          className="px-3 h-9 rounded-md text-label-sm font-semibold"
          style={{ background: '#1E90FF', color: '#fff' }}
        >
          Buscar
        </button>
      </div>
      <p className="font-mono text-label-sm mt-2" style={{ color: SLATE_400 }}>
        tabIndex 5 → 2 → 1 fora do fluxo visual.
      </p>
    </form>
  )
}

function ModalSemFocusTrap() {
  return (
    <div className="relative w-72 h-44 rounded-lg overflow-hidden" style={{ background: SLATE_50, border: `1px solid ${SLATE_200}` }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(11, 20, 36, 0.4)' }}>
        <div className="bg-white rounded-lg p-4 w-56 shadow-lg" style={{ border: `1px solid ${SLATE_200}` }}>
          <p className="text-label-md font-semibold mb-2" style={{ color: SLATE_900 }}>Excluir conta?</p>
          <p className="text-body-sm mb-3" style={{ color: SLATE_500 }}>Esta ação é permanente.</p>
          <div className="flex gap-2 justify-end">
            <button className="text-label-sm px-3 py-1.5 rounded-md" style={{ color: SLATE_700, border: `1px solid ${SLATE_200}` }}>Cancelar</button>
            <button className="text-label-sm px-3 py-1.5 rounded-md" style={{ background: '#EF4444', color: '#fff' }}>Excluir</button>
          </div>
        </div>
      </div>
      <p className="absolute bottom-1 left-2 font-mono text-label-sm" style={{ color: SLATE_400 }}>
        Tab "escapa" para o conteúdo atrás.
      </p>
    </div>
  )
}

function AtalhoConflitante() {
  return (
    <div className="max-w-sm flex flex-col gap-3 items-center text-center">
      <div className="px-3 py-1.5 rounded-md font-mono text-label-md" style={{ background: SLATE_900, color: '#fff' }}>
        Atalho: <kbd style={{ background: SLATE_700, padding: '0 6px', borderRadius: 4 }}>S</kbd>
      </div>
      <p className="text-body-sm" style={{ color: SLATE_700 }}>
        Pressione <strong>S</strong> em qualquer lugar para buscar.
      </p>
      <p className="font-mono text-label-sm mt-1" style={{ color: SLATE_400 }}>
        Conflito com leitores de tela que usam letras únicas como comandos.
      </p>
    </div>
  )
}

/* --- 05 - Imagens / Alt ------------------------------------- */
function ImagemSemAlt() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-44 h-44 rounded-lg flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #1E90FF)',
        }}
      >
        <span className="text-white text-h2 font-bold">A11y</span>
      </div>
      <p className="text-body-sm" style={{ color: SLATE_700 }}>
        Avatar do usuário Marina Silva
      </p>
      <p className="font-mono text-label-sm" style={{ color: SLATE_400 }}>
        &lt;img src="marina-silva.jpg"&gt; sem atributo alt.
      </p>
    </div>
  )
}

function ImagemAltDecorativo() {
  return (
    <article className="max-w-sm flex flex-col gap-2">
      <div
        className="w-full h-24 rounded-md"
        style={{
          background:
            'repeating-linear-gradient(45deg, #EFF7FF, #EFF7FF 8px, #D9ECFF 8px, #D9ECFF 16px)',
        }}
      />
      <p className="text-h3 font-semibold" style={{ color: SLATE_900 }}>
        Bem-vinda, Marina!
      </p>
      <p className="text-body-sm" style={{ color: SLATE_500 }}>
        Pronta para continuar sua trilha?
      </p>
      <p className="font-mono text-label-sm mt-2" style={{ color: SLATE_400 }}>
        alt="Padrão decorativo de fundo azul claro"
      </p>
    </article>
  )
}

function HeadingForaDeOrdem() {
  return (
    <div className="max-w-sm flex flex-col gap-2">
      <h1 className="text-h2 font-bold" style={{ color: SLATE_900 }}>
        Minha conta
      </h1>
      <h3 className="text-body-md font-semibold" style={{ color: SLATE_700 }}>
        Dados pessoais
      </h3>
      <p className="text-body-sm" style={{ color: SLATE_500 }}>
        Nome, e-mail, telefone…
      </p>
      <h2 className="text-h3 font-semibold mt-2" style={{ color: SLATE_700 }}>
        Segurança
      </h2>
      <p className="text-body-sm" style={{ color: SLATE_500 }}>
        Senha, autenticação em dois fatores.
      </p>
      <p className="font-mono text-label-sm mt-1" style={{ color: SLATE_400 }}>
        h1 → h3 → h2 - hierarquia quebrada.
      </p>
    </div>
  )
}

/* --- Registry ----------------------------------------------- */
export const evidencias = {
  'botao-sem-foco-visivel': BotaoSemFocoVisivel,
  'foco-bom-vs-ruim': FocoBomVsRuim,
  'tab-order-quebrada': TabOrderQuebrada,
  'placeholder-como-label': PlaceholderComoLabel,
  'form-sem-label': FormSemLabel,
  'form-sem-agrupamento': FormSemAgrupamento,
  'botao-icone-sem-label': BotaoIconeSemLabel,
  'botao-baixo-contraste': BotaoBaixoContraste,
  'texto-cinza-claro': TextoCinzaClaro,
  'link-color-only': LinkColorOnly,
  'texto-sobre-imagem': TextoSobreImagem,
  'area-clicavel-sem-aria-label': AreaClicavelSemAriaLabel,
  'tabindex-positivo': TabIndexPositivo,
  'modal-sem-focus-trap': ModalSemFocusTrap,
  'atalho-conflitante': AtalhoConflitante,
  'imagem-sem-alt': ImagemSemAlt,
  'imagem-alt-decorativo': ImagemAltDecorativo,
  'heading-fora-de-ordem': HeadingForaDeOrdem,
}

export function Evidencia({ id }) {
  const Component = evidencias[id]
  if (!Component) {
    return (
      <p className="font-mono text-body-sm text-ink-disabled">
        Evidência "{id}" não encontrada.
      </p>
    )
  }
  return <Component />
}
