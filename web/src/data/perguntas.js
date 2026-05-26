/* ============================================================
   Banco de perguntas, trilha "Fundamentos da Acessibilidade".
   Cada desafio tem 4 perguntas; cada pergunta referencia uma
   evidência (registry em data/evidencias.jsx).

   xpReward por pergunta soma exatamente o xp do desafio
   declarado em data/trilhas.js, mantendo a economia coerente.
   ============================================================ */

export const perguntasPorDesafio = {
  // ---------- 01 - Foco visível em botões (80 XP) -------------
  '01': [
    {
      id: 'p-foco-1',
      enunciado:
        'O CSS deste botão faz `outline: none` no estado de foco, sem fornecer alternativa visual. Qual diretriz da WCAG isso viola?',
      opcoes: [
        { id: 'A', texto: '1.4.3 - Contraste mínimo' },
        { id: 'B', texto: '2.4.7 - Foco visível' },
        { id: 'C', texto: '3.3.2 - Rótulos ou instruções' },
        { id: 'D', texto: '4.1.2 - Nome, função, valor' },
      ],
      respostaCorreta: 'B',
      explicacao:
        'A diretriz 2.4.7 (nível AA) exige que o foco do teclado seja sempre visualmente perceptível. Remover o outline sem fornecer um indicador alternativo (ring, borda, sombra) deixa usuários de teclado sem saber onde estão na página, exatamente o que esta evidência demonstra.',
      evidenciaId: 'botao-sem-foco-visivel',
      xpReward: 15,
    },
    {
      id: 'p-foco-2',
      enunciado:
        'Olhando os dois botões, o Botão B exibe um indicador de foco eficaz. O que torna um indicador de foco "eficaz" segundo a WCAG 2.4.11?',
      opcoes: [
        { id: 'A', texto: 'Ser sempre amarelo, pois é a cor mais visível' },
        { id: 'B', texto: 'Aparecer apenas em links, nunca em botões' },
        { id: 'C', texto: 'Ter contraste de pelo menos 3:1 com o estado não-focado e área mínima' },
        { id: 'D', texto: 'Ser sutil para não distrair o usuário' },
      ],
      respostaCorreta: 'C',
      explicacao:
        'A diretriz 2.4.11 (Focus Appearance, nível AAA na WCAG 2.2) exige contraste mínimo de 3:1 entre o estado focado e o não-focado, e uma área mínima ao redor do elemento. O Botão B tem um anel azul de 3px com offset, visível independente do tamanho do botão ou da cor de fundo.',
      evidenciaId: 'foco-bom-vs-ruim',
      xpReward: 20,
    },
    {
      id: 'p-foco-3',
      enunciado:
        'Este formulário declara `tabIndex` positivos. Qual problema isso causa para usuários de teclado?',
      opcoes: [
        { id: 'A', texto: 'Nenhum, é uma boa prática para controlar a ordem' },
        { id: 'B', texto: 'A ordem de tabulação não corresponde à ordem visual, confundindo a navegação' },
        { id: 'C', texto: 'Os campos perdem o foco automaticamente após 5 segundos' },
        { id: 'D', texto: 'Apenas o primeiro campo recebe foco; os demais são ignorados' },
      ],
      respostaCorreta: 'B',
      explicacao:
        '`tabIndex` positivos sobrescrevem a ordem natural do DOM. Quando o valor não corresponde à ordem visual (como aqui: E-mail → Telefone → Nome), o usuário de teclado é jogado para fora do fluxo de leitura. A recomendação é manter `tabIndex="0"` (segue DOM) ou reordenar o HTML.',
      evidenciaId: 'tab-order-quebrada',
      xpReward: 20,
    },
    {
      id: 'p-foco-4',
      enunciado:
        'Você quer que o foco seja visível apenas quando o usuário navega por teclado, sem mostrar o ring ao clicar com o mouse. Qual seletor CSS resolve isso?',
      opcoes: [
        { id: 'A', texto: ':hover' },
        { id: 'B', texto: ':focus' },
        { id: 'C', texto: ':focus-visible' },
        { id: 'D', texto: ':focus-within' },
      ],
      respostaCorreta: 'C',
      explicacao:
        '`:focus-visible` aplica estilos apenas quando o navegador heuristicamente determina que o foco deve ser indicado (tipicamente, navegação por teclado). `:focus` se aplica também após clique, o que pode parecer "ruído visual". Use `:focus-visible` para o ring de teclado e `:focus` apenas em casos específicos.',
      evidenciaId: 'botao-sem-foco-visivel',
      xpReward: 25,
    },
  ],

  // ---------- 02 - Labels em formulários (100 XP) -------------
  '02': [
    {
      id: 'p-label-1',
      enunciado:
        'Este formulário usa apenas `placeholder` para identificar os campos. Por que isso é um problema de acessibilidade?',
      opcoes: [
        { id: 'A', texto: 'Placeholders desaparecem quando o usuário começa a digitar, removendo a referência' },
        { id: 'B', texto: 'Placeholders são lidos primeiro pelo navegador, atrasando o foco' },
        { id: 'C', texto: 'Placeholders só funcionam em campos de texto, não em senhas' },
        { id: 'D', texto: 'Nenhum problema, é uma prática moderna recomendada' },
      ],
      respostaCorreta: 'A',
      explicacao:
        'O placeholder some assim que o usuário digita, fazendo o rótulo desaparecer no momento em que ele mais precisa de referência (revisar o que estava preenchendo). Além disso, contraste de placeholder é normalmente baixo, leitores de tela podem ignorá-lo, e usuários com déficit de memória de curto prazo são prejudicados. A WCAG 3.3.2 exige rótulo visível.',
      evidenciaId: 'placeholder-como-label',
      xpReward: 20,
    },
    {
      id: 'p-label-2',
      enunciado:
        'O `<p>` "CPF" parece um rótulo, mas o leitor de tela não anuncia "CPF" ao focar no input. Qual o jeito correto de conectar um label a um input?',
      opcoes: [
        { id: 'A', texto: 'Envolver o input com um `<div class="label">` antes' },
        { id: 'B', texto: 'Usar `<label for="id">` apontando para o `id` do input, ou envolver o input com `<label>`' },
        { id: 'C', texto: 'Adicionar `title="CPF"` ao input' },
        { id: 'D', texto: 'Colocar `name="CPF"` no input' },
      ],
      respostaCorreta: 'B',
      explicacao:
        'Apenas o elemento `<label>` cria a associação semântica que leitores de tela anunciam, e o `for="id"` (apontando para o `id` do input) ou o envolvimento (`<label>CPF <input/></label>`) ativa essa associação. `title` e `name` não cumprem o papel - `title` é dica, `name` é envio do formulário.',
      evidenciaId: 'form-sem-label',
      xpReward: 25,
    },
    {
      id: 'p-label-3',
      enunciado:
        'Esses botões são apenas ícones, sem texto visível. Para que o leitor de tela anuncie o que cada um faz, qual atributo você usaria?',
      opcoes: [
        { id: 'A', texto: '`title` nos botões' },
        { id: 'B', texto: '`alt` nos SVGs internos' },
        { id: 'C', texto: '`aria-label` em cada `<button>` descrevendo a ação' },
        { id: 'D', texto: 'Nenhum, leitores de tela inferem do SVG automaticamente' },
      ],
      respostaCorreta: 'C',
      explicacao:
        '`aria-label` no `<button>` fornece um nome acessível quando não há texto visível. `alt` só vale para `<img>`, não para SVG inline ou ícone-em-botão. `title` é dica do navegador e nem todos os leitores anunciam. Use `aria-labelledby` quando o nome já existe em outro elemento da página.',
      evidenciaId: 'botao-icone-sem-label',
      xpReward: 25,
    },
    {
      id: 'p-label-4',
      enunciado:
        'Este grupo de radio buttons pergunta "Como prefere ser contatado?". Visualmente o título está acima das opções, mas o leitor de tela anuncia cada opção isolada, sem contexto. Como agrupar corretamente?',
      opcoes: [
        { id: 'A', texto: 'Adicionar `aria-label` em cada `<input type="radio">` repetindo a pergunta' },
        { id: 'B', texto: 'Envolver o grupo em `<fieldset>` com `<legend>` contendo a pergunta' },
        { id: 'C', texto: 'Usar `<div role="group">` apenas, sem mais nada' },
        { id: 'D', texto: 'Trocar os radios por `<select>` para simplificar' },
      ],
      respostaCorreta: 'B',
      explicacao:
        '`<fieldset>` + `<legend>` é a estrutura semântica nativa para agrupar campos relacionados. Leitores de tela anunciam o `<legend>` ao focar em cada radio, dando contexto ("Como prefere ser contatado? - E-mail"). É preferível à abordagem de `aria-label` repetido em cada radio, que é prolixa e fácil de divergir.',
      evidenciaId: 'form-sem-agrupamento',
      xpReward: 30,
    },
  ],

  // ---------- 03 - Contraste (120 XP) -------------------------
  '03': [
    {
      id: 'p-contraste-1',
      enunciado:
        'Por que este botão "Confirmar pedido" representa uma barreira de acessibilidade?',
      opcoes: [
        { id: 'A', texto: 'O botão está pequeno demais para ser tocado' },
        { id: 'B', texto: 'O contraste entre o texto e o fundo é insuficiente' },
        { id: 'C', texto: 'O rótulo não descreve claramente a ação' },
        { id: 'D', texto: 'Não há navegação por teclado disponível' },
      ],
      respostaCorreta: 'B',
      explicacao:
        'O contraste entre o texto (#CBD5E1) e o fundo (#FFFFFF) é de apenas 1.6:1 - muito abaixo do mínimo de 4.5:1 exigido pela WCAG AA para texto normal. Pessoas com baixa visão, daltonismo, ou usando o app em ambientes com luz forte não conseguem ler o rótulo.',
      evidenciaId: 'botao-baixo-contraste',
      xpReward: 25,
    },
    {
      id: 'p-contraste-2',
      enunciado:
        'Qual a razão de contraste mínima exigida pela WCAG AA para texto normal (menor que 18pt regular ou 14pt bold)?',
      opcoes: [
        { id: 'A', texto: '2:1' },
        { id: 'B', texto: '3:1' },
        { id: 'C', texto: '4.5:1' },
        { id: 'D', texto: '7:1' },
      ],
      respostaCorreta: 'C',
      explicacao:
        'WCAG 1.4.3 (nível AA) exige 4.5:1 para texto normal e 3:1 para texto grande (18pt+ ou 14pt+ bold). O nível AAA pede 7:1 / 4.5:1. Este parágrafo cinza tem cerca de 1.6:1 - invisível para muita gente.',
      evidenciaId: 'texto-cinza-claro',
      xpReward: 30,
    },
    {
      id: 'p-contraste-3',
      enunciado:
        'Os dois links neste parágrafo estão diferenciados apenas por uma tonalidade levemente mais clara que o texto. Qual diretriz isso viola?',
      opcoes: [
        { id: 'A', texto: '1.4.1 - Uso de cor (informação não pode depender só de cor)' },
        { id: 'B', texto: '2.1.1 - Teclado (todo conteúdo deve ser acessível por teclado)' },
        { id: 'C', texto: '3.1.1 - Idioma da página' },
        { id: 'D', texto: '4.1.3 - Mensagens de status' },
      ],
      respostaCorreta: 'A',
      explicacao:
        'A WCAG 1.4.1 proíbe usar cor como único meio de comunicar significado. Pessoas com daltonismo (~8% dos homens, ~0.5% das mulheres) ou em telas monocromáticas não veem diferença. A solução padrão para links é adicionar `text-decoration: underline` - visual claro independente da cor.',
      evidenciaId: 'link-color-only',
      xpReward: 30,
    },
    {
      id: 'p-contraste-4',
      enunciado:
        'O texto "Promoção de outono" está em branco sobre uma área da imagem que também é quase branca. Qual a melhor solução para garantir legibilidade?',
      opcoes: [
        { id: 'A', texto: 'Aumentar o tamanho da fonte para 32pt' },
        { id: 'B', texto: 'Adicionar `text-shadow` discreto ao texto' },
        { id: 'C', texto: 'Aplicar um overlay escuro semitransparente sobre a imagem, garantindo contraste ≥ 4.5:1 com o texto' },
        { id: 'D', texto: 'Trocar a imagem por uma cor sólida' },
      ],
      respostaCorreta: 'C',
      explicacao:
        'Um overlay semitransparente (ex.: `rgba(0,0,0,0.4)`) sobre a imagem garante contraste consistente do texto, independentemente de qual parte da imagem está atrás dele. Aumentar fonte não resolve contraste; `text-shadow` ajuda marginalmente mas é frágil; trocar a imagem perde a intenção do design.',
      evidenciaId: 'texto-sobre-imagem',
      xpReward: 35,
    },
  ],

  // ---------- 04 - Navegação por teclado (150 XP) -------------
  '04': [
    {
      id: 'p-teclado-1',
      enunciado:
        'Este "Plano Premium" é uma `<div>` com `onClick`. Por que esse padrão é problemático para acessibilidade?',
      opcoes: [
        { id: 'A', texto: 'Divs não podem ter eventos onClick em React' },
        { id: 'B', texto: 'Não é focável por teclado, não tem semântica de botão e não responde a Enter/Espaço' },
        { id: 'C', texto: 'Sem problema, onClick funciona em qualquer elemento' },
        { id: 'D', texto: 'Apenas viola a estética, não a acessibilidade' },
      ],
      respostaCorreta: 'B',
      explicacao:
        '`<div>` por padrão não está no tab order, não anuncia "botão" para leitores de tela, e onClick em React só dispara com mouse, Enter/Espaço não chamam o handler. A correção canônica é trocar por `<button type="button">`. Se não for possível, adicionar `role="button"`, `tabIndex={0}` e handlers de keyboard, mas o `<button>` nativo é sempre preferível.',
      evidenciaId: 'area-clicavel-sem-aria-label',
      xpReward: 30,
    },
    {
      id: 'p-teclado-2',
      enunciado:
        'Você precisa que um elemento seja focável por teclado. Quando usar `tabIndex="0"` em vez de `tabIndex="5"`?',
      opcoes: [
        { id: 'A', texto: 'Sempre que possível - `tabIndex="0"` mantém o fluxo natural do DOM' },
        { id: 'B', texto: 'Apenas quando o elemento aparece no topo da página' },
        { id: 'C', texto: '`tabIndex` positivos são equivalentes e podem ser usados livremente' },
        { id: 'D', texto: '`tabIndex="0"` é obsoleto, sempre use valores positivos' },
      ],
      respostaCorreta: 'A',
      explicacao:
        '`tabIndex="0"` adiciona o elemento ao tab order respeitando a ordem do DOM. `tabIndex` positivos (1, 2, 3…) criam um tab order separado que precede tudo, quebrando a relação entre ordem visual e ordem de leitura. A regra de ouro: nunca usar `tabIndex > 0`. Use `tabIndex="-1"` para tirar elementos do tab order (mas mantê-los focáveis via JS).',
      evidenciaId: 'tabindex-positivo',
      xpReward: 35,
    },
    {
      id: 'p-teclado-3',
      enunciado:
        'Neste modal "Excluir conta?", o foco "escapa" para a página atrás ao pressionar Tab. Como esse problema é chamado e como se resolve?',
      opcoes: [
        { id: 'A', texto: '"Focus leak" - resolve-se com `aria-hidden="true"` no modal' },
        { id: 'B', texto: '"Falta de focus trap" - o foco precisa ficar circulando dentro do modal enquanto ele está aberto' },
        { id: 'C', texto: '"Modal duplicado" - não há solução, é uma limitação do HTML' },
        { id: 'D', texto: '"Z-index baixo" - resolve aumentando o z-index do modal' },
      ],
      respostaCorreta: 'B',
      explicacao:
        'Modais devem implementar "focus trap": o Tab deve circular apenas entre os elementos focáveis dentro do modal enquanto ele está aberto, e Esc deve fechar. O elemento `<dialog>` nativo do HTML5 já implementa isso automaticamente; bibliotecas como `focus-trap-react` resolvem para modais customizados.',
      evidenciaId: 'modal-sem-focus-trap',
      xpReward: 40,
    },
    {
      id: 'p-teclado-4',
      enunciado:
        'Sua aplicação tem um atalho global: pressionar `S` em qualquer lugar abre a busca. Que tipo de usuário pode ser prejudicado e qual a solução recomendada (WCAG 2.1.4)?',
      opcoes: [
        { id: 'A', texto: 'Ninguém, atalhos são sempre uma melhoria' },
        { id: 'B', texto: 'Usuários de leitores de tela e ditado por voz, que podem disparar atalhos involuntariamente. A solução é permitir desativar, remapear ou exigir uma tecla modificadora' },
        { id: 'C', texto: 'Apenas usuários de mouse, que não usam atalhos' },
        { id: 'D', texto: 'Apenas em smartphones, onde teclas únicas não existem' },
      ],
      respostaCorreta: 'B',
      explicacao:
        'A WCAG 2.1.4 (Atalhos de teclado em caractere único) exige que atalhos compostos por apenas uma letra/número/símbolo possam ser: desativados, remapeados, ou só ativos quando o componente está focado. Leitores de tela como NVDA/JAWS usam letras únicas como comandos de navegação ("H" pula heading), e ditado por voz pode disparar comandos involuntariamente.',
      evidenciaId: 'atalho-conflitante',
      xpReward: 45,
    },
  ],

  // ---------- 05 - Imagens com texto alternativo (180 XP) -----
  '05': [
    {
      id: 'p-alt-1',
      enunciado:
        'Esta `<img>` foi colocada sem o atributo `alt`. O que um leitor de tela como NVDA tipicamente anuncia?',
      opcoes: [
        { id: 'A', texto: 'Nada, o leitor pula a imagem silenciosamente' },
        { id: 'B', texto: '"Imagem" genericamente, sem identificação' },
        { id: 'C', texto: 'O nome do arquivo (ex.: "marina-silva.jpg"), o que costuma ser ruído inútil' },
        { id: 'D', texto: 'O texto extraído por OCR da imagem' },
      ],
      respostaCorreta: 'C',
      explicacao:
        'Sem `alt`, a maioria dos leitores de tela anuncia o nome do arquivo, que costuma ser ininteligível ("IMG_3421.png", "marina-silva.jpg"). Imagens informativas precisam de `alt` descritivo ("Avatar de Marina Silva, autora do artigo"); imagens decorativas precisam de `alt=""` (vazio) para o leitor pulá-las explicitamente.',
      evidenciaId: 'imagem-sem-alt',
      xpReward: 40,
    },
    {
      id: 'p-alt-2',
      enunciado:
        'Esta imagem de fundo é puramente decorativa (textura azul). O `alt` declarado é "Padrão decorativo de fundo azul claro". Por que isso ainda é problemático?',
      opcoes: [
        { id: 'A', texto: 'O alt está em português, deveria estar em inglês' },
        { id: 'B', texto: 'Imagens decorativas devem ter `alt=""` (vazio) para que leitores de tela as ignorem; descrever decoração polui a leitura' },
        { id: 'C', texto: 'O alt está curto demais; deveria ter pelo menos 200 caracteres' },
        { id: 'D', texto: 'Não é problemático, qualquer alt descritivo é melhor que nada' },
      ],
      respostaCorreta: 'B',
      explicacao:
        'Imagens puramente decorativas devem ter `alt=""` (atributo presente, valor vazio). Isso sinaliza explicitamente ao leitor que a imagem deve ser pulada. Descrever uma decoração ("padrão azul de fundo") força o usuário a processar informação irrelevante. Alternativas: usar `role="presentation"` ou implementar via CSS `background-image`.',
      evidenciaId: 'imagem-alt-decorativo',
      xpReward: 45,
    },
    {
      id: 'p-alt-3',
      enunciado:
        'Esta barra de ferramentas tem três botões representados apenas por ícones. Qual o atributo correto para tornar cada botão acessível?',
      opcoes: [
        { id: 'A', texto: '`alt` no SVG dentro do botão' },
        { id: 'B', texto: '`aria-label` no `<button>` descrevendo a ação ("Fechar", "Reproduzir", "Avisar")' },
        { id: 'C', texto: '`title` no SVG' },
        { id: 'D', texto: 'Nenhum atributo é necessário se o ícone é universal' },
      ],
      respostaCorreta: 'B',
      explicacao:
        '`aria-label` no elemento interativo (`<button>`, `<a>`) fornece o nome acessível quando não há texto visível. SVGs internos devem ter `aria-hidden="true"` para o leitor não anunciá-los duas vezes. Ícones "universais" como X, play, alerta ainda assim variam de interpretação, sempre dê um nome explícito.',
      evidenciaId: 'botao-icone-sem-label',
      xpReward: 45,
    },
    {
      id: 'p-alt-4',
      enunciado:
        'Esta página declara `<h1>` → `<h3>` → `<h2>`, pulando da H1 direto para H3. Por que a hierarquia importa para acessibilidade?',
      opcoes: [
        { id: 'A', texto: 'Não importa, leitores de tela ignoram a tag e leem só o texto' },
        { id: 'B', texto: 'Leitores de tela permitem navegação por headings (tecla "H"); hierarquia quebrada confunde a estrutura mental da página' },
        { id: 'C', texto: 'Importa apenas para SEO, não para acessibilidade' },
        { id: 'D', texto: 'Pular níveis é exigido pela WCAG quando há pouco conteúdo' },
      ],
      respostaCorreta: 'B',
      explicacao:
        'Leitores de tela como NVDA, JAWS e VoiceOver permitem listar e navegar entre headings (atalho "H"). Uma hierarquia consistente (H1 → H2 → H3 → H2 → H3…) cria um sumário mental da página. Pular níveis ou usar tags H apenas por estilo visual quebra esse contrato. Use CSS para estilizar, não headings.',
      evidenciaId: 'heading-fora-de-ordem',
      xpReward: 50,
    },
  ],
}
