/* ============================================================
   Conteúdo das aulas, um componente React por aula.
   Cada aula segue o esqueleto:
     1. Cabeçalho (título + chamada)
     2. "O que é"
     3. "Por que importa"
     4. Exemplo prático (código antes/depois + demo opcional)
     5. Tabela / diagrama quando relevante
     6. Resumo
     7. Referências

   Conteúdo curado a partir de:
     W3C WCAG 2.2 - https://www.w3.org/WAI/WCAG22/
     MDN Web Docs, https://developer.mozilla.org/
     WebAIM, https://webaim.org/
     Deque University, https://www.deque.com/
     eMAG (BR), Movimento Web pra Todos (BR)
   ============================================================ */

import { Sparkles, AlertCircle, Lightbulb, Quote } from 'lucide-react'
import { Tag, ComparacaoCodigo, CodeBlock } from '../components/ui'
import { Evidencia } from './evidencias'
import { referencias } from './referencias'

/* ============================================================
   Componentes utilitários para o conteúdo
   ============================================================ */

function SecaoAula({ titulo, children, id }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-h2 text-ink-strong mb-4">
        {titulo}
      </h2>
      {children}
    </section>
  )
}

function Paragrafo({ children }) {
  return (
    <p className="text-body-md text-ink mt-4 leading-relaxed">{children}</p>
  )
}

function ListaResumo({ items }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-3 text-body-md text-ink leading-relaxed"
        >
          <Sparkles
            size={18}
            className="shrink-0 mt-1 text-violeta-600"
            strokeWidth={2.4}
            aria-hidden="true"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Aviso({ tipo = 'info', titulo, children }) {
  const config = {
    info: {
      bg: 'bg-dodger-50 border-dodger-100',
      icon: Lightbulb,
      iconCls: 'text-dodger-700',
      titleCls: 'text-dodger-700',
    },
    aviso: {
      bg: 'bg-ambar-50 border-ambar-100',
      icon: AlertCircle,
      iconCls: 'text-ambar-700',
      titleCls: 'text-ambar-700',
    },
    citacao: {
      bg: 'bg-surface-sunken border-border',
      icon: Quote,
      iconCls: 'text-ink-muted',
      titleCls: 'text-ink-strong',
    },
  }
  const c = config[tipo] ?? config.info
  const Icon = c.icon
  return (
    <aside className={`mt-6 rounded-lg border ${c.bg} p-5 flex gap-3`}>
      <Icon size={20} className={`shrink-0 mt-0.5 ${c.iconCls}`} strokeWidth={2.4} aria-hidden="true" />
      <div className="flex-1">
        {titulo && (
          <p className={`text-label-md font-bold ${c.titleCls} mb-1`}>{titulo}</p>
        )}
        <div className="text-body-sm text-ink leading-relaxed">{children}</div>
      </div>
    </aside>
  )
}

function DemoInterativa({ evidenciaId, titulo = 'Exemplo na prática', legenda }) {
  return (
    <figure className="mt-6 rounded-lg border border-border overflow-hidden">
      <figcaption className="bg-surface-sunken border-b border-border px-4 py-2 text-label-sm font-semibold text-ink-muted">
        {titulo}
      </figcaption>
      <div className="bg-white px-8 py-10 flex items-center justify-center">
        <Evidencia id={evidenciaId} />
      </div>
      {legenda && (
        <p className="bg-surface-sunken border-t border-border px-4 py-2 text-body-sm text-ink-muted">
          {legenda}
        </p>
      )}
    </figure>
  )
}

function Referencias({ ids }) {
  return (
    <section aria-labelledby="referencias-heading" className="mt-10 pt-6 border-t border-border">
      <h2 id="referencias-heading" className="text-h2 text-ink-strong mb-1">
        Referências
      </h2>
      <p className="text-body-sm text-ink-muted mb-4">
        Fontes consultadas para construir esta aula. Use-as para aprofundar.
      </p>
      <ol className="space-y-3 list-decimal pl-5 marker:text-ink-muted marker:font-bold">
        {ids.map((id) => {
          const r = referencias[id]
          if (!r) return null
          return (
            <li key={id} className="text-body-sm text-ink">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dodger-700 underline hover:text-dodger-900 font-medium"
              >
                {r.titulo}
              </a>
              <span className="text-ink-muted"> - {r.fonte}</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ============================================================
   AULA 01 - Foco visível
   ============================================================ */

const CODIGO_FOCO_ANTES = `/* Remove o outline padrão do navegador */
button:focus {
  outline: none;
}

/*  Botão fica indistinguível ao Tab.
   Quem navega por teclado se perde
   completamente na página. */`

const CODIGO_FOCO_DEPOIS = `/* Use :focus-visible, só destaca quando
   o foco chegou via teclado, não no clique. */
button:focus-visible {
  outline: 3px solid #1E90FF;
  outline-offset: 2px;
  border-radius: 4px;
}

/*  Foco nítido com contraste >= 3:1
   contra o fundo adjacente. */`

function AulaFocoVisivel() {
  return (
    <article>
      <header>
        <Tag tone="violeta" size="md">
          Aula 01 - Fundamentos
        </Tag>
        <h1 className="text-display text-ink-strong mt-3">
          Foco visível: o que é e por que importa
        </h1>
        <p className="mt-3 text-body-lg text-ink-muted max-w-3xl">
          O indicador de foco é a "seta do mouse" para quem usa teclado.
          Sem ele, navegar é como digitar de olhos fechados.
        </p>
      </header>

      <SecaoAula titulo="O que é" id="o-que-e">
        <Paragrafo>
          O <strong>indicador de foco</strong> é a borda, contorno ou destaque
          que o navegador desenha em torno do elemento que receberá o próximo
          comando do teclado. Quando você pressiona <kbd>Tab</kbd>, o foco se
          move para o próximo elemento interativo (link, botão, campo) - e o
          indicador é a única forma visual de saber onde você está.
        </Paragrafo>
        <Paragrafo>
          A pseudo-classe CSS <code className="font-mono text-dodger-700">:focus-visible</code>{' '}
          aplica o estilo apenas quando o foco veio do teclado (não do clique
          de mouse), o que evita o efeito "anel cinza" indesejado em botões
          clicados.
        </Paragrafo>
      </SecaoAula>

      <SecaoAula titulo="Por que importa" id="por-que-importa">
        <Paragrafo>
          A WCAG 2.2 define dois critérios diretamente ligados ao foco visível:
        </Paragrafo>
        <ListaResumo
          items={[
            <span key="1">
              <strong>2.4.7 Focus Visible (AA)</strong> - qualquer interface
              operável por teclado precisa ter um modo de foco que torna o
              indicador de foco do teclado <em>visível</em>.
            </span>,
            <span key="2">
              <strong>2.4.11 Focus Not Obscured (AA, novo na WCAG 2.2)</strong>{' '}
              - quando um item recebe foco, ele <em>não</em> pode ser totalmente
              escondido por elementos criados pela página (ex.: barras fixas,
              banners de cookies).
            </span>,
            <span key="3">
              <strong>WCAG 1.4.11 Non-text Contrast</strong> exige razão de
              contraste mínima de <strong>3:1</strong> entre o anel de foco e a
              cor adjacente.
            </span>,
          ]}
        />
        <Aviso tipo="aviso" titulo="Erro mais comum">
          Escrever <code className="font-mono">outline: none</code> "porque
          fica feio" e nunca substituir por outro estilo. Isso quebra a
          experiência de qualquer pessoa que use teclado, incluindo usuários
          com deficiência motora, dor de pulso, ou simplesmente um mouse
          quebrado.
        </Aviso>
      </SecaoAula>

      <SecaoAula titulo="Exemplo prático" id="exemplo-pratico">
        <Paragrafo>
          O <code className="font-mono">outline</code> nativo do navegador é
          feio? Tudo bem, substitua, não remova.
        </Paragrafo>
        <ComparacaoCodigo
          language="css"
          antes={CODIGO_FOCO_ANTES}
          depois={CODIGO_FOCO_DEPOIS}
        />
        <DemoInterativa
          evidenciaId="foco-bom-vs-ruim"
          titulo="Demo interativa — pressione Tab para alternar entre os botões"
          legenda="Botão A não tem foco visível. Botão B usa outline azul com offset, apenas o B é navegável com confiança."
        />
      </SecaoAula>

      <SecaoAula titulo="Boas práticas" id="boas-praticas">
        <ListaResumo
          items={[
            'Prefira :focus-visible a :focus para evitar destaque indesejado no clique.',
            'Use outline-offset para "respirar" o anel do conteúdo (1–3px).',
            'Garanta contraste mínimo 3:1 entre o anel de foco e o fundo.',
            'Nunca esconda foco com display:none, opacity:0 ou clip, torne-o visível.',
            'Em navegação fixa (header sticky), aplique scroll-padding-top para não esconder o foco.',
          ]}
        />
      </SecaoAula>

      <Referencias
        ids={[
          'wcag-2-4-7',
          'wcag-2-4-11',
          'wcag-1-4-11',
          'mdn-focus-visible',
          'mdn-outline',
          'webaim-focus',
          'emag',
        ]}
      />
    </article>
  )
}

/* ============================================================
   AULA 02 - Labels em formulários
   ============================================================ */

const CODIGO_LABEL_ANTES = `<!--  Placeholder como label.
     Some quando o usuário começa a digitar
     e geralmente tem contraste insuficiente. -->
<input
  type="email"
  placeholder="E-mail"
/>

<!--  Texto solto que parece label
     mas não está conectado ao input. -->
<p>CPF</p>
<input type="text" />`

const CODIGO_LABEL_DEPOIS = `<!--  Associação explícita via for/id -->
<label for="email">E-mail</label>
<input id="email" type="email" />

<!--  Associação implícita (envolvendo) -->
<label>
  CPF
  <input type="text" />
</label>

<!--  Último recurso: aria-label
     (use só quando não há rótulo visual) -->
<button aria-label="Fechar diálogo">×</button>`

function AulaLabels() {
  return (
    <article>
      <header>
        <Tag tone="violeta" size="md">
          Aula 02 - Fundamentos
        </Tag>
        <h1 className="text-display text-ink-strong mt-3">
          Labels acessíveis em formulários
        </h1>
        <p className="mt-3 text-body-lg text-ink-muted max-w-3xl">
          Todo campo de entrada precisa de um rótulo, visível, programático e
          permanente. Veja por que <code className="font-mono">placeholder</code>{' '}
          não conta.
        </p>
      </header>

      <SecaoAula titulo="O que é" id="o-que-e">
        <Paragrafo>
          Um <strong>label acessível</strong> é um rótulo de texto associado
          programaticamente a um controle de formulário (input, select,
          textarea). Quando associado corretamente, o leitor de tela anuncia o
          texto do label assim que o controle recebe foco; o clique no label
          também envia o foco para o campo, dobrando a área alvo.
        </Paragrafo>
        <Paragrafo>Há três formas válidas de associar um label:</Paragrafo>
        <ListaResumo
          items={[
            <span key="1">
              <strong>Explícita</strong> -{' '}
              <code className="font-mono">&lt;label for="id"&gt;</code> aponta
              para um <code className="font-mono">&lt;input id="id"&gt;</code>.
              Mais flexível para layout.
            </span>,
            <span key="2">
              <strong>Implícita</strong> - <code className="font-mono">&lt;label&gt;</code> envolve
              o input. Não precisa de id, mas restringe o layout.
            </span>,
            <span key="3">
              <strong>ARIA</strong> -{' '}
              <code className="font-mono">aria-label</code> ou{' '}
              <code className="font-mono">aria-labelledby</code>. Use só quando
              não há rótulo visual (ex.: botão de ícone "×" para fechar).
            </span>,
          ]}
        />
      </SecaoAula>

      <SecaoAula titulo="Por que importa" id="por-que-importa">
        <Paragrafo>
          Três critérios da WCAG 2.2 são afetados diretamente por rótulos
          ausentes ou mal associados:
        </Paragrafo>
        <ListaResumo
          items={[
            <span key="1">
              <strong>1.3.1 Info and Relationships (A)</strong> - o vínculo
              entre rótulo e campo precisa ser detectável por software, não
              apenas visual.
            </span>,
            <span key="2">
              <strong>3.3.2 Labels or Instructions (A)</strong> - todo controle
              que recebe entrada do usuário precisa de rótulo ou instrução.
            </span>,
            <span key="3">
              <strong>4.1.2 Name, Role, Value (A)</strong> - todo componente de
              interface deve ter um "nome acessível" exposto às tecnologias
              assistivas.
            </span>,
          ]}
        />
        <Aviso tipo="aviso" titulo="O problema do placeholder">
          O atributo <code className="font-mono">placeholder</code> some assim
          que o usuário começa a digitar, costuma ter contraste insuficiente
          (cinza claro sobre branco), é confundido com valor já preenchido por
          pessoas com déficit de atenção, e não é anunciado por todos os
          leitores de tela.{' '}
          <strong>Placeholder é uma dica, não um rótulo.</strong>
        </Aviso>
      </SecaoAula>

      <SecaoAula titulo="Exemplo prático" id="exemplo-pratico">
        <ComparacaoCodigo
          antes={CODIGO_LABEL_ANTES}
          depois={CODIGO_LABEL_DEPOIS}
        />
        <DemoInterativa
          evidenciaId="placeholder-como-label"
          titulo="Exemplo prático — placeholder no lugar de label"
          legenda="Quando o usuário começa a digitar a senha, o placeholder some, não há mais como confirmar qual campo é qual."
        />
      </SecaoAula>

      <SecaoAula titulo="Agrupando campos relacionados" id="agrupamento">
        <Paragrafo>
          Para grupos (radios, checkboxes), use{' '}
          <code className="font-mono">&lt;fieldset&gt;</code> com{' '}
          <code className="font-mono">&lt;legend&gt;</code>. Sem isso, o leitor
          de tela anuncia cada opção sem o contexto da pergunta.
        </Paragrafo>
        <CodeBlock language="html" label="✅ Agrupamento correto" tone="sucesso">{`<fieldset>
  <legend>Como prefere ser contatado?</legend>
  <label><input type="radio" name="contato" value="email" /> E-mail</label>
  <label><input type="radio" name="contato" value="tel" /> Telefone</label>
  <label><input type="radio" name="contato" value="wpp" /> WhatsApp</label>
</fieldset>`}</CodeBlock>
      </SecaoAula>

      <SecaoAula titulo="Boas práticas" id="boas-praticas">
        <ListaResumo
          items={[
            'Sempre use <label> ou aria-label, nunca dependa só de placeholder.',
            'Mantenha o rótulo visível mesmo quando o campo está preenchido (floating label, por exemplo).',
            'Indique campos obrigatórios com texto, não só com cor (ex.: "E-mail (obrigatório)").',
            'Use <fieldset> + <legend> para grupos de radio/checkbox.',
            'Para erros, associe a mensagem com aria-describedby + aria-invalid="true".',
          ]}
        />
      </SecaoAula>

      <Referencias
        ids={[
          'wcag-1-3-1',
          'wcag-3-3-2',
          'wcag-4-1-2',
          'mdn-label',
          'webaim-forms',
          'deque-placeholder',
          'w3c-forms-tutorial',
          'emag',
        ]}
      />
    </article>
  )
}

/* ============================================================
   AULA 03 - Contraste de cor
   ============================================================ */

const CODIGO_CONTRASTE_ANTES = `/*  Cinza claro sobre branco
   #CBD5E1 sobre #FFFFFF
   Razão de contraste: 1.61:1
   Falha WCAG AA por larga margem. */
.policy-text {
  color: #CBD5E1;
  background: #FFFFFF;
}

/*  Botão "fantasma" - texto cinza
   muito claro. Razão 2.3:1, falha AA. */
.btn-ghost {
  color: #A0AEC0;
  background: #FFFFFF;
}`

const CODIGO_CONTRASTE_DEPOIS = `/*  Cinza escuro sobre branco
   #475569 sobre #FFFFFF
   Razão: 7.50:1 - passa AAA. */
.policy-text {
  color: #475569;
  background: #FFFFFF;
}

/*  Botão "fantasma" com cor sólida
   #1D4ED8 sobre #FFFFFF
   Razão: 8.59:1 - passa AAA. */
.btn-ghost {
  color: #1D4ED8;
  background: #FFFFFF;
}`

function TabelaContraste() {
  const linhas = [
    { tipo: 'Texto normal (< 18pt)', aa: '4.5:1', aaa: '7:1' },
    { tipo: 'Texto grande (≥ 18pt regular ou ≥ 14pt bold)', aa: '3:1', aaa: '4.5:1' },
    { tipo: 'Componentes não-textuais (ícones, bordas, foco)', aa: '3:1', aaa: '-' },
    { tipo: 'Texto incidental, logotipo, decorativo', aa: 'isento', aaa: 'isento' },
  ]
  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-body-sm">
        <caption className="sr-only">
          Razões de contraste mínimas exigidas pela WCAG 2.2 para diferentes
          tipos de conteúdo
        </caption>
        <thead className="bg-surface-sunken">
          <tr>
            <th className="text-left px-4 py-2.5 font-semibold text-ink-strong">
              Tipo de conteúdo
            </th>
            <th className="text-left px-4 py-2.5 font-semibold text-ink-strong">
              Nível AA (mínimo)
            </th>
            <th className="text-left px-4 py-2.5 font-semibold text-ink-strong">
              Nível AAA (avançado)
            </th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-4 py-2.5 text-ink">{l.tipo}</td>
              <td className="px-4 py-2.5 font-mono text-violeta-700 font-bold">
                {l.aa}
              </td>
              <td className="px-4 py-2.5 font-mono text-ink-muted">{l.aaa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AulaContraste() {
  return (
    <article>
      <header>
        <Tag tone="violeta" size="md">
          Aula 03 - Fundamentos
        </Tag>
        <h1 className="text-display text-ink-strong mt-3">
          Contraste de cor: as razões da WCAG
        </h1>
        <p className="mt-3 text-body-lg text-ink-muted max-w-3xl">
          4.5:1, 3:1, 7:1 - números mágicos que decidem se o seu texto é
          legível para 217 milhões de pessoas com baixa visão.
        </p>
      </header>

      <SecaoAula titulo="O que é" id="o-que-e">
        <Paragrafo>
          A <strong>razão de contraste</strong> é a relação matemática entre a
          luminância do texto e a luminância do fundo, calculada pela fórmula
          definida pela WCAG (baseada em sRGB). O resultado é sempre entre{' '}
          <strong>1:1</strong> (cores idênticas, ilegível) e{' '}
          <strong>21:1</strong> (preto puro sobre branco puro, máximo).
        </Paragrafo>
        <Paragrafo>
          A WCAG 2.2 define limites diferentes para texto pequeno, texto
          grande e componentes não-textuais (ícones, bordas, estados de foco).
        </Paragrafo>
      </SecaoAula>

      <SecaoAula titulo="Tabela de razões mínimas" id="tabela">
        <TabelaContraste />
        <Aviso tipo="info" titulo='O que conta como "texto grande"?'>
          A WCAG define <strong>texto grande</strong> como ≥ 18pt regular
          (aproximadamente 24px) <em>ou</em> ≥ 14pt bold (~18.66px). Letras
          maiores são mais legíveis, então a exigência cai de 4.5:1 para 3:1.
        </Aviso>
      </SecaoAula>

      <SecaoAula titulo="Por que importa" id="por-que-importa">
        <Paragrafo>
          O contraste afeta diretamente:
        </Paragrafo>
        <ListaResumo
          items={[
            'Pessoas com baixa visão (217M no mundo, OMS 2023).',
            'Pessoas com daltonismo (8% dos homens, 0,5% das mulheres) - algumas paletas só funcionam por luminância.',
            'Quem usa o aplicativo no sol, em telas baratas ou com filtro de luz azul ativado.',
            'Idosos: a partir dos 40 anos, a sensibilidade ao contraste cai progressivamente.',
          ]}
        />
        <Aviso tipo="aviso" titulo="Erro recorrente">
          Designers reduzem a opacidade de um texto para "suavizar" o
          parágrafo (ex.:{' '}
          <code className="font-mono">color: rgba(0, 0, 0, 0.5)</code>). O
          resultado é uma razão real ≈ 4.5:1 sobre branco, passa por pouco,
          mas falha sobre qualquer outro fundo.
        </Aviso>
      </SecaoAula>

      <SecaoAula titulo="Exemplo prático" id="exemplo-pratico">
        <ComparacaoCodigo
          language="css"
          antes={CODIGO_CONTRASTE_ANTES}
          depois={CODIGO_CONTRASTE_DEPOIS}
        />
        <DemoInterativa
          evidenciaId="texto-cinza-claro"
          titulo="Exemplo visual — texto com contraste insuficiente"
          legenda="Parágrafo em #CBD5E1 sobre branco, razão 1.6:1. Falha brutal em WCAG AA (mínimo 4.5:1)."
        />
      </SecaoAula>

      <SecaoAula titulo="Como medir" id="como-medir">
        <ListaResumo
          items={[
            <span key="1">
              <a
                href="https://webaim.org/resources/contrastchecker/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dodger-700 underline hover:text-dodger-900"
              >
                WebAIM Contrast Checker
              </a>{' '}
              - cole hex de texto e fundo; ele calcula AA/AAA na hora.
            </span>,
            'DevTools do Chrome/Firefox: ao inspecionar um elemento de texto, abre a paleta de cor com o cálculo de contraste embutido.',
            'Extensão Stark, axe DevTools, varredura automática de página inteira.',
            'Não confie só no olho: cores que parecem contrastantes podem ter razão baixa por matiz, e vice-versa.',
          ]}
        />
      </SecaoAula>

      <SecaoAula titulo="Boas práticas" id="boas-praticas">
        <ListaResumo
          items={[
            'Construa a paleta com contraste em mente: cor principal sobre branco/preto deve passar AA.',
            'Para texto sobre imagem ou gradiente, use overlay sólido por trás do texto.',
            'Cor não pode ser o único meio de comunicar informação (ex.: links subliminados, ícones com texto).',
            'Estados de foco/hover/disabled também precisam ser distinguíveis sem cor.',
            'Teste com simuladores de daltonismo (Chrome DevTools → Rendering → Emulate vision deficiencies).',
          ]}
        />
      </SecaoAula>

      <Referencias
        ids={[
          'wcag-1-4-3',
          'wcag-1-4-6',
          'wcag-1-4-11',
          'webaim-contrast',
          'webaim-contrast-checker',
          'mwpt-contraste',
          'emag',
        ]}
      />
    </article>
  )
}

/* ============================================================
   AULA 04 - Navegação por teclado
   ============================================================ */

const CODIGO_TECLADO_ANTES = `<!--  div com onClick, não é focável,
     não dispara em Enter/Espaço,
     leitor de tela ignora. -->
<div
  class="card"
  onclick="selecionarPlano()"
>
  Plano Premium
</div>

<!--  tabindex positivo quebra a
     ordem natural do DOM. -->
<input tabindex="3" />
<input tabindex="1" />
<input tabindex="2" />`

const CODIGO_TECLADO_DEPOIS = `<!--  Use o elemento semântico correto.
     <button> já é focável, recebe Enter
     e Espaço, e é anunciado como botão. -->
<button
  type="button"
  class="card"
  onclick="selecionarPlano()"
>
  Plano Premium
</button>

<!--  Sem tabindex: ordem segue o DOM,
     que deve refletir a ordem visual. -->
<input />
<input />
<input />`

function AulaTeclado() {
  return (
    <article>
      <header>
        <Tag tone="violeta" size="md">
          Aula 04 - Fundamentos
        </Tag>
        <h1 className="text-display text-ink-strong mt-3">
          Navegação por teclado e ordem de foco
        </h1>
        <p className="mt-3 text-body-lg text-ink-muted max-w-3xl">
          Se a interface funciona com <kbd>Tab</kbd>, <kbd>Shift+Tab</kbd>,{' '}
          <kbd>Enter</kbd>, <kbd>Espaço</kbd> e <kbd>Esc</kbd>, ela funciona
          para quase todo mundo. Comece por aqui.
        </p>
      </header>

      <SecaoAula titulo="Quem depende do teclado" id="quem-depende">
        <ListaResumo
          items={[
            'Pessoas com deficiência motora (paralisia, tremor, amputação) que não conseguem usar mouse.',
            'Pessoas cegas, usam leitor de tela quase exclusivamente pelo teclado.',
            'Pessoas com baixa visão que ampliam a tela e perdem o cursor do mouse.',
            'Usuários avançados que preferem teclado por velocidade.',
            'Qualquer um cujo mouse parou de funcionar.',
          ]}
        />
      </SecaoAula>

      <SecaoAula titulo="Os critérios WCAG" id="criterios">
        <ListaResumo
          items={[
            <span key="1">
              <strong>2.1.1 Keyboard (A)</strong> - toda funcionalidade deve
              ser operável por teclado, sem exigir tempos específicos de
              pressão.
            </span>,
            <span key="2">
              <strong>2.1.2 No Keyboard Trap (A)</strong> - o foco nunca pode
              ficar "preso" em um componente sem forma documentada de sair.
            </span>,
            <span key="3">
              <strong>2.4.3 Focus Order (A)</strong> - a sequência de foco
              deve preservar significado e operabilidade.
            </span>,
            <span key="4">
              <strong>2.1.4 Character Key Shortcuts (A)</strong> - atalhos de
              tecla única (como pressionar <kbd>S</kbd> para abrir busca)
              precisam poder ser desligados ou só funcionar com modificador.
            </span>,
          ]}
        />
      </SecaoAula>

      <SecaoAula titulo="Elementos nativamente focáveis" id="focaveis">
        <Paragrafo>
          O navegador já gerencia foco para os seguintes elementos -{' '}
          <strong>não reinvente o que já existe</strong>:
        </Paragrafo>
        <CodeBlock language="html" label="Elementos focáveis por padrão" tone="neutral">{`<a href="...">   <!-- link com destino -->
<button>         <!-- botão -->
<input>          <!-- inputs (exceto type="hidden") -->
<select>         <!-- listas -->
<textarea>       <!-- áreas de texto -->
<audio controls>
<video controls>
[contenteditable]
[tabindex]       <!-- qualquer elemento com tabindex -->`}</CodeBlock>
      </SecaoAula>

      <SecaoAula titulo="O atributo tabindex" id="tabindex">
        <Paragrafo>
          O <code className="font-mono">tabindex</code> controla se e como um
          elemento entra na ordem de tabulação:
        </Paragrafo>
        <div className="mt-3 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-body-sm">
            <thead className="bg-surface-sunken">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-strong">
                  Valor
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-strong">
                  Efeito
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-ink-strong">
                  Quando usar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-2.5 font-mono font-bold text-sucesso-700">
                  0
                </td>
                <td className="px-4 py-2.5 text-ink">
                  Entra no fluxo natural, na ordem do DOM
                </td>
                <td className="px-4 py-2.5 text-ink-muted">
                  Custom widgets que precisam ser focáveis (ex.: card que vira
                  botão)
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2.5 font-mono font-bold text-violeta-700">
                  -1
                </td>
                <td className="px-4 py-2.5 text-ink">
                  Focável só por código (.focus()), fora do Tab
                </td>
                <td className="px-4 py-2.5 text-ink-muted">
                  Mover foco para containers (ex.: ao abrir modal, mensagem de
                  erro)
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-2.5 font-mono font-bold text-erro-700">
                  &gt; 0
                </td>
                <td className="px-4 py-2.5 text-ink">
                  Sobrescreve a ordem natural, números menores vêm primeiro
                </td>
                <td className="px-4 py-2.5 text-ink-muted">
                  <strong>Quase nunca.</strong> Anti-padrão na maioria dos
                  casos.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Aviso tipo="aviso" titulo="Regra de ouro do tabindex">
          Se você precisa usar <code className="font-mono">tabindex</code>{' '}
          positivo, provavelmente está resolvendo o problema errado.
          Reordenar o DOM para refletir a ordem visual é quase sempre a
          solução correta.
        </Aviso>
      </SecaoAula>

      <SecaoAula titulo="Exemplo prático" id="exemplo-pratico">
        <ComparacaoCodigo
          antes={CODIGO_TECLADO_ANTES}
          depois={CODIGO_TECLADO_DEPOIS}
        />
        <DemoInterativa
          evidenciaId="tab-order-quebrada"
          titulo="Demo interativa — pressione Tab para sentir a ordem quebrada"
          legenda="Os tabindex positivos forçam a ordem 1 → 2 → 3 mesmo o usuário esperando seguir a ordem visual Nome → E-mail → Telefone."
        />
      </SecaoAula>

      <SecaoAula titulo="Boas práticas" id="boas-praticas">
        <ListaResumo
          items={[
            'Use o elemento semântico correto (<button>, <a>) antes de pensar em ARIA.',
            'Ordem do DOM deve refletir ordem visual, use Flex/Grid para reordenar visualmente sem mexer no DOM.',
            'Modais devem prender o foco enquanto abertos e devolvê-lo ao elemento que abriu o modal ao fechar.',
            'Evite atalhos de tecla única; sempre ofereça desligar ou exigir modificador (Ctrl, Alt).',
            'Teste fechando os olhos e usando só o teclado, se você se perder, seu usuário também vai.',
          ]}
        />
      </SecaoAula>

      <Referencias
        ids={[
          'wcag-2-1-1',
          'wcag-2-1-2',
          'wcag-2-1-4',
          'wcag-2-4-3',
          'mdn-tabindex',
          'mdn-keyboard-widgets',
          'webaim-keyboard',
          'w3c-keyboard-design',
        ]}
      />
    </article>
  )
}

/* ============================================================
   AULA 05 - Texto alternativo em imagens
   ============================================================ */

const CODIGO_ALT_ANTES = `<!--  Sem atributo alt.
     Leitor de tela lê o nome do arquivo
     "marina-silva-jpg" - inútil. -->
<img src="marina-silva.jpg" />

<!--  Alt redundante com "imagem de"
     (o leitor já anuncia "imagem"). -->
<img src="grafico.png"
     alt="Imagem de um gráfico de vendas" />

<!--  Imagem decorativa sem alt="".
     Vira ruído no leitor de tela. -->
<img src="padrao-fundo.png" />`

const CODIGO_ALT_DEPOIS = `<!--  Foto informativa: descreve o que importa
     no contexto da página. -->
<img
  src="marina-silva.jpg"
  alt="Marina Silva, gerente de produto"
/>

<!--  Para um gráfico, o alt resume a
     informação principal. -->
<img
  src="grafico.png"
  alt="Vendas em alta de 12% no Q4"
/>

<!--  Imagem decorativa explicitamente
     ignorada pelo leitor de tela. -->
<img src="padrao-fundo.png" alt="" />`

function ArvoreDecisaoAlt() {
  return (
    <div className="mt-5 rounded-lg border border-border bg-surface-raised p-5">
      <h3 className="text-h3 font-bold text-ink-strong mb-3">
        Árvore de decisão (W3C)
      </h3>
      <ol className="space-y-3 text-body-md text-ink">
        <li className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-violeta-100 text-violeta-700 font-bold flex items-center justify-center text-label-sm">
            1
          </span>
          <div>
            <strong>A imagem é puramente decorativa?</strong>
            <p className="text-body-sm text-ink-muted mt-0.5">
              Ex.: borda, padrão, separador, ícone redundante ao texto ao
              lado. → <code className="font-mono">alt=""</code> (vazio) ou{' '}
              <code className="font-mono">role="presentation"</code>.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-violeta-100 text-violeta-700 font-bold flex items-center justify-center text-label-sm">
            2
          </span>
          <div>
            <strong>A imagem usa texto?</strong>
            <p className="text-body-sm text-ink-muted mt-0.5">
              Ex.: logotipo, banner com palavras. → o alt deve conter{' '}
              <em>exatamente</em> o texto da imagem.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-violeta-100 text-violeta-700 font-bold flex items-center justify-center text-label-sm">
            3
          </span>
          <div>
            <strong>A imagem é um link ou botão?</strong>
            <p className="text-body-sm text-ink-muted mt-0.5">
              O alt descreve o <em>destino</em> ou <em>ação</em>, não a
              imagem. Ex.: alt="Ir para a página inicial".
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-violeta-100 text-violeta-700 font-bold flex items-center justify-center text-label-sm">
            4
          </span>
          <div>
            <strong>A imagem complementa o texto vizinho?</strong>
            <p className="text-body-sm text-ink-muted mt-0.5">
              Se o texto já descreve o que a imagem mostra, use{' '}
              <code className="font-mono">alt=""</code> para evitar
              redundância.
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-violeta-100 text-violeta-700 font-bold flex items-center justify-center text-label-sm">
            5
          </span>
          <div>
            <strong>A imagem é complexa (gráfico, infográfico)?</strong>
            <p className="text-body-sm text-ink-muted mt-0.5">
              alt curto + descrição longa próxima (texto vizinho ou{' '}
              <code className="font-mono">aria-describedby</code>).
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 w-7 h-7 rounded-full bg-violeta-100 text-violeta-700 font-bold flex items-center justify-center text-label-sm">
            6
          </span>
          <div>
            <strong>Senão, imagem informativa.</strong>
            <p className="text-body-sm text-ink-muted mt-0.5">
              alt curto (até ~125 caracteres) descrevendo o que importa no
              contexto. Não comece com "Imagem de…".
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}

function AulaAlt() {
  return (
    <article>
      <header>
        <Tag tone="violeta" size="md">
          Aula 05 - Fundamentos
        </Tag>
        <h1 className="text-display text-ink-strong mt-3">
          Texto alternativo em imagens
        </h1>
        <p className="mt-3 text-body-lg text-ink-muted max-w-3xl">
          O atributo <code className="font-mono">alt</code> não é "descreva a
          imagem". É "explique o que esta imagem faz <em>nesta</em> página".
        </p>
      </header>

      <SecaoAula titulo="O que é" id="o-que-e">
        <Paragrafo>
          O atributo <code className="font-mono">alt</code> do{' '}
          <code className="font-mono">&lt;img&gt;</code> é o texto que será
          anunciado por leitores de tela e mostrado quando a imagem não puder
          ser carregada (rede ruim, modo de economia). Ele também aparece em
          tooltips em alguns navegadores e ajuda em SEO.
        </Paragrafo>
        <Aviso tipo="citacao" titulo="Pense assim">
          Se você lesse esta página em voz alta para alguém ao telefone, o
          que diria sobre essa imagem? Esse é o seu alt.
        </Aviso>
      </SecaoAula>

      <SecaoAula titulo="Por que importa" id="por-que-importa">
        <Paragrafo>
          A WCAG 2.2 cobre imagens no critério mais antigo e mais violado da
          web:
        </Paragrafo>
        <ListaResumo
          items={[
            <span key="1">
              <strong>1.1.1 Non-text Content (A)</strong> - todo conteúdo
              não-textual precisa de uma alternativa textual que cumpra o
              mesmo propósito.
            </span>,
            'WebAIM Million 2024 - 54% das páginas analisadas têm imagens sem alt ou com alt errado.',
            'Sem alt, leitores de tela leem o nome do arquivo ("DSC_4523.jpg") ou pulam a imagem em silêncio.',
          ]}
        />
      </SecaoAula>

      <SecaoAula titulo="Árvore de decisão" id="arvore">
        <Paragrafo>
          O W3C oferece uma{' '}
          <a
            href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dodger-700 underline hover:text-dodger-900"
          >
            árvore de decisão oficial
          </a>{' '}
          para escolher o alt correto. Veja a versão resumida:
        </Paragrafo>
        <ArvoreDecisaoAlt />
      </SecaoAula>

      <SecaoAula titulo="Exemplo prático" id="exemplo-pratico">
        <ComparacaoCodigo
          antes={CODIGO_ALT_ANTES}
          depois={CODIGO_ALT_DEPOIS}
        />
        <DemoInterativa
          evidenciaId="imagem-sem-alt"
          titulo="Exemplo visual — imagem sem texto alternativo"
          legenda="Avatar sem alt. Para um leitor de tela, esta imagem é equivalente a um caractere de pontuação sem sentido."
        />
      </SecaoAula>

      <SecaoAula titulo="Padrões para SVG e ícones" id="svg">
        <Paragrafo>
          SVGs inline não têm <code className="font-mono">alt</code>. Use{' '}
          <code className="font-mono">role="img"</code> +{' '}
          <code className="font-mono">aria-label</code> ou
          {' '}
          <code className="font-mono">&lt;title&gt;</code>:
        </Paragrafo>
        <CodeBlock language="html" label="✅ SVG com nome acessível" tone="sucesso">{`<!-- SVG informativo -->
<svg role="img" aria-label="Carrinho de compras" viewBox="0 0 24 24">
  <path d="..." />
</svg>

<!-- SVG decorativo (ao lado de texto que já explica) -->
<button>
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="..." /></svg>
  Adicionar ao carrinho
</button>`}</CodeBlock>
      </SecaoAula>

      <SecaoAula titulo="Boas práticas" id="boas-praticas">
        <ListaResumo
          items={[
            'Sempre escreva o alt, vazio ("") quando decorativo, descritivo quando informativo. Nunca omita.',
            'Não comece com "Imagem de…", "Foto de…" - o leitor de tela já anuncia o tipo.',
            'Para imagens dentro de links/botões, descreva a AÇÃO ou o DESTINO, não a foto.',
            'Mantenha o alt curto (até ~125 caracteres). Use texto vizinho para descrições longas.',
            'Para gráficos complexos, ofereça uma alternativa em tabela ou prosa.',
            'Em CMS, eduque autores de conteúdo: campo alt vazio é uma decisão, não um esquecimento.',
          ]}
        />
      </SecaoAula>

      <Referencias
        ids={[
          'wcag-1-1-1',
          'w3c-alt-decision-tree',
          'w3c-images-tutorial',
          'mdn-img',
          'webaim-alt',
          'mwpt-imagens',
          'emag',
        ]}
      />
    </article>
  )
}

/* ============================================================
   Registry + componente despachante
   ============================================================ */

export const aulaConteudos = {
  'aula-foco-visivel': AulaFocoVisivel,
  'aula-labels': AulaLabels,
  'aula-contraste': AulaContraste,
  'aula-teclado': AulaTeclado,
  'aula-alt': AulaAlt,
}

export function AulaConteudo({ id }) {
  const Component = aulaConteudos[id]
  if (!Component) {
    return (
      <p className="font-mono text-body-sm text-ink-disabled">
        Conteúdo de aula "{id}" não encontrado.
      </p>
    )
  }
  return <Component />
}
