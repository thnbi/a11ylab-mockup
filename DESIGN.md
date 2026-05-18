---
version: alpha
name: A11yLAB — Dodger Estúdio
description: >
  Sistema de design para o A11yLAB, uma plataforma gamificada de ensino de
  acessibilidade web. Combina a energia do azul Dodger como cor de ação com
  o violeta acadêmico como cor de progresso, equilibrando curiosidade
  (Duolingo) e seriedade (Coursera/edX).

colors:
  # Marca
  dodger: "#1E90FF"
  dodger-50: "#EFF7FF"
  dodger-100: "#D9ECFF"
  dodger-200: "#B3D8FF"
  dodger-300: "#7CBEFF"
  dodger-400: "#46A4FF"
  dodger-500: "#1E90FF"
  dodger-600: "#1573D6"
  dodger-700: "#0F58A8"
  dodger-800: "#0B4180"
  dodger-900: "#072C5C"

  violeta: "#7C3AED"
  violeta-50: "#F5F0FF"
  violeta-100: "#EADDFF"
  violeta-200: "#D4BAFF"
  violeta-300: "#B895FA"
  violeta-400: "#9A6FF0"
  violeta-500: "#7C3AED"
  violeta-600: "#6A2BD1"
  violeta-700: "#5520A8"
  violeta-800: "#3F1880"
  violeta-900: "#2A1057"

  ambar: "#F59E0B"
  ambar-50: "#FFF8E6"
  ambar-100: "#FDECC8"
  ambar-300: "#FBC56B"
  ambar-500: "#F59E0B"
  ambar-700: "#B97509"

  teal: "#14B8A6"
  teal-50: "#E6FAF7"
  teal-100: "#C4F1EA"
  teal-500: "#14B8A6"
  teal-700: "#0E8175"

  # Estado
  sucesso: "#10B981"
  sucesso-50: "#E6F8F1"
  sucesso-100: "#C7EFDD"
  sucesso-500: "#10B981"
  sucesso-700: "#0B7F5A"

  erro: "#EF4444"
  erro-50: "#FDECEC"
  erro-100: "#FAD0D0"
  erro-500: "#EF4444"
  erro-700: "#B5292A"

  # Superfície e texto
  surface: "#FAFCFF"
  surface-raised: "#FFFFFF"
  surface-sunken: "#F1F5FB"
  surface-overlay: "#FFFFFFE6"

  ink: "#1E293B"
  ink-strong: "#0B1424"
  ink-muted: "#475569"
  ink-subtle: "#64748B"
  ink-disabled: "#94A3B8"
  ink-on-dark: "#FAFCFF"

  border: "#E2E8F0"
  border-strong: "#CBD5E1"
  border-focus: "#1E90FF"

  # Semânticas (apelidos)
  primary: "{colors.dodger-500}"
  primary-hover: "{colors.dodger-600}"
  secondary: "{colors.violeta-500}"
  secondary-hover: "{colors.violeta-600}"
  accent-xp: "{colors.ambar-500}"

typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.02em
  caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5

spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  page-margin: 32px
  sidebar-width: 240px
  content-max-width: 1200px

rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 14px
  xl: 20px
  pill: 9999px
  full: 9999px

elevation:
  none: "none"
  sm: "0 1px 2px rgba(15, 23, 42, 0.06)"
  md: "0 4px 12px rgba(15, 23, 42, 0.08)"
  lg: "0 10px 24px rgba(15, 23, 42, 0.10)"
  focus-ring: "0 0 0 3px rgba(30, 144, 255, 0.35)"

components:
  button-primary:
    backgroundColor: "{colors.dodger-500}"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    typography: "{typography.label-md}"
  button-primary-hover:
    backgroundColor: "{colors.dodger-600}"
  button-primary-active:
    backgroundColor: "{colors.dodger-700}"
  button-primary-focus:
    backgroundColor: "{colors.dodger-500}"

  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.violeta-600}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    typography: "{typography.label-md}"
  button-secondary-hover:
    backgroundColor: "{colors.violeta-50}"
  button-secondary-active:
    backgroundColor: "{colors.violeta-100}"

  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    typography: "{typography.label-md}"
  button-ghost-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-strong}"

  input:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 12px 14px
    typography: "{typography.body-md}"
    height: 44px
  input-focus:
    backgroundColor: "{colors.surface-raised}"
  input-error:
    backgroundColor: "{colors.erro-50}"
    textColor: "{colors.erro-700}"

  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
  card-interactive-hover:
    backgroundColor: "{colors.dodger-50}"

  challenge-card:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
    typography: "{typography.h2}"
  challenge-card-hover:
    backgroundColor: "{colors.dodger-50}"
    borderColor: "{colors.dodger-300}"
  challenge-card-completed:
    backgroundColor: "{colors.sucesso-50}"
    borderColor: "{colors.sucesso-100}"
    textColor: "{colors.ink}"
  challenge-card-locked:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
  challenge-card-number:
    backgroundColor: "{colors.dodger-50}"
    textColor: "{colors.dodger-700}"
    rounded: "{rounded.md}"
    size: 48px
    typography: "{typography.h3}"

  option-card:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 16px
    typography: "{typography.body-md}"
  option-card-selected:
    backgroundColor: "{colors.dodger-50}"
    borderColor: "{colors.dodger-500}"
    textColor: "{colors.dodger-700}"
  option-card-correct:
    backgroundColor: "{colors.sucesso-50}"
    borderColor: "{colors.sucesso-500}"
    textColor: "{colors.sucesso-700}"
  option-card-wrong:
    backgroundColor: "{colors.erro-50}"
    borderColor: "{colors.erro-500}"
    textColor: "{colors.erro-700}"
  option-card-dimmed:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "transparent"
    textColor: "{colors.ink-muted}"
  option-card-letter:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    size: 36px
    typography: "{typography.label-md}"
  option-card-letter-selected:
    backgroundColor: "{colors.dodger-500}"
    textColor: "{colors.ink-on-dark}"
  option-card-letter-correct:
    backgroundColor: "{colors.sucesso-500}"
    textColor: "{colors.ink-on-dark}"
  option-card-letter-wrong:
    backgroundColor: "{colors.erro-500}"
    textColor: "{colors.ink-on-dark}"

  breadcrumb:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm}"
  breadcrumb-current:
    textColor: "{colors.ink-strong}"
    typography: "{typography.body-sm}"
  breadcrumb-separator:
    textColor: "{colors.ink-disabled}"

  back-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-md}"
    padding: 4px 0
  back-link-hover:
    textColor: "{colors.ink-strong}"

  evidence-frame:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
  evidence-frame-header:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-sm}"
    padding: 10px 16px
  evidence-frame-canvas:
    backgroundColor: "#FFFFFF"
    padding: 64px 40px

  feedback-panel-success:
    backgroundColor: "{colors.sucesso-50}"
    borderColor: "{colors.sucesso-100}"
    textColor: "{colors.sucesso-700}"
    rounded: "{rounded.lg}"
    padding: 24px
  feedback-panel-error:
    backgroundColor: "{colors.erro-50}"
    borderColor: "{colors.erro-100}"
    textColor: "{colors.erro-700}"
    rounded: "{rounded.lg}"
    padding: 24px

  tag:
    backgroundColor: "{colors.violeta-100}"
    textColor: "{colors.violeta-700}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
    typography: "{typography.label-sm}"

  tag-success:
    backgroundColor: "{colors.sucesso-100}"
    textColor: "{colors.sucesso-700}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
    typography: "{typography.label-sm}"

  tag-xp:
    backgroundColor: "{colors.ambar-100}"
    textColor: "{colors.ambar-700}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
    typography: "{typography.label-sm}"

  progress-track:
    backgroundColor: "{colors.surface-sunken}"
    rounded: "{rounded.pill}"
    height: 8px
  progress-fill:
    backgroundColor: "{colors.violeta-500}"
    rounded: "{rounded.pill}"
  progress-fill-success:
    backgroundColor: "{colors.sucesso-500}"

  sidebar:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
    width: 240px
  sidebar-header:
    backgroundColor: "{colors.surface-raised}"
    padding: 24px 24px 8px
  sidebar-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: 10px 12px
    typography: "{typography.label-md}"
  sidebar-link-active:
    backgroundColor: "{colors.dodger-50}"
    textColor: "{colors.dodger-700}"
  sidebar-link-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-strong}"

  xp-counter:
    backgroundColor: "{colors.ambar-50}"
    borderColor: "{colors.ambar-100}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
    typography: "{typography.h3}"
  xp-counter-badge:
    backgroundColor: "{colors.ambar-500}"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.md}"
    size: 40px
  xp-counter-label:
    textColor: "{colors.ambar-700}"
    typography: "{typography.caps}"

  achievement-badge:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.lg}"
    padding: 20px
    typography: "{typography.h3}"
  achievement-badge-unlocked:
    backgroundColor: "{colors.violeta-50}"
    borderColor: "{colors.violeta-200}"
    textColor: "{colors.violeta-700}"
  achievement-badge-locked:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
  achievement-badge-icon:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-disabled}"
    rounded: "{rounded.full}"
    size: 64px
  achievement-badge-icon-unlocked:
    backgroundColor: "{colors.violeta-500}"
    textColor: "{colors.ink-on-dark}"

  score-medal:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    rounded: "{rounded.lg}"
    padding: 16px
    typography: "{typography.caps}"
  score-medal-locked:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "{colors.border}"
  score-medal-icon:
    rounded: "{rounded.full}"
    size: 48px
  score-medal-tier-ambar:
    backgroundColor: "{colors.ambar-500}"
    textColor: "{colors.ink-on-dark}"
  score-medal-tier-teal:
    backgroundColor: "{colors.teal-500}"
    textColor: "{colors.ink-on-dark}"
  score-medal-tier-violeta:
    backgroundColor: "{colors.violeta-500}"
    textColor: "{colors.ink-on-dark}"
  score-medal-tier-dodger:
    backgroundColor: "{colors.dodger-500}"
    textColor: "{colors.ink-on-dark}"

  form-field-label:
    textColor: "{colors.ink-strong}"
    typography: "{typography.label-md}"
  form-field-input:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.md}"
    padding: 12px 14px 12px 44px
    height: 44px
    typography: "{typography.body-md}"
  form-field-input-focus:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.dodger-500}"

  trail-history-card:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 20px
  trail-history-card-completed:
    backgroundColor: "{colors.sucesso-50}"
    borderColor: "{colors.sucesso-100}"
  trail-history-card-icon:
    backgroundColor: "{colors.violeta-100}"
    textColor: "{colors.violeta-700}"
    rounded: "{rounded.md}"
    size: 48px
  trail-history-card-icon-completed:
    backgroundColor: "{colors.sucesso-100}"
    textColor: "{colors.sucesso-700}"

  roadmap-section-icon:
    backgroundColor: "{colors.violeta-100}"
    textColor: "{colors.violeta-700}"
    rounded: "{rounded.md}"
    size: 40px
  roadmap-section-number:
    textColor: "{colors.violeta-500}"
    typography: "{typography.h2}"

  topic-node:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.lg}"
    padding: 16px
    typography: "{typography.h3}"
  topic-node-completed:
    backgroundColor: "{colors.sucesso-50}"
    borderColor: "{colors.sucesso-200}"
    textColor: "{colors.ink-strong}"
  topic-node-current:
    backgroundColor: "{colors.ambar-50}"
    borderColor: "{colors.ambar-500}"
    textColor: "{colors.ink-strong}"
  topic-node-locked:
    backgroundColor: "{colors.surface-sunken}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
  topic-node-current-tag:
    backgroundColor: "{colors.ambar-500}"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.full}"
    padding: 2px 8px
    typography: "{typography.label-sm}"

  search-input:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.md}"
    padding: 12px 14px 12px 44px
    height: 44px
    typography: "{typography.body-md}"
    width: 320px

  trail-node:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    typography: "{typography.body-sm}"
  trail-node-current:
    backgroundColor: "{colors.ambar-100}"
    textColor: "{colors.ambar-700}"
  trail-node-completed:
    backgroundColor: "{colors.sucesso-50}"
    textColor: "{colors.sucesso-700}"
---

# A11yLAB — DESIGN.md

> Sistema de design da plataforma **A11yLAB**: um laboratório gamificado para
> aprender acessibilidade web (a11y) na prática, através de trilhas, desafios
> e conquistas.

## Overview

O A11yLAB é uma plataforma educacional focada em ensinar **acessibilidade
digital** para estudantes e desenvolvedores. O tom é o de um **estúdio
acadêmico moderno** — sério o suficiente para uma instituição (IFSC), mas
lúdico o suficiente para sustentar o engajamento contínuo do aprendiz.

A inspiração visual vem da intersecção entre:

- **Coursera / edX** — credibilidade institucional, layout limpo, foco em conteúdo.
- **Duolingo** — gamificação leve, progresso visível, recompensa frequente (XP, conquistas, trilhas).
- **Editores de código modernos** (VS Code, GitHub) — para os momentos em que o aluno inspeciona componentes "do mundo real" e identifica barreiras de acessibilidade.

**Personalidade:** estudioso, curioso, encorajador, rigoroso com padrões (WCAG).

**Princípio fundador:** a própria interface do A11yLAB **precisa ser exemplar
em acessibilidade**. Cada decisão de design aqui é também uma decisão de
acessibilidade — contraste, foco, tamanho de toque, semântica.

## Brand & Logo

A marca **A11yLAB** ("a11y" + "lab") é representada por um logo em que a
tipografia cursiva *a__y* abraça dois olhos centrais — alusão direta ao
foco da plataforma em **acessibilidade** ("a11y" é a abreviação numerônica
de "accessibility", com 11 letras entre 'a' e 'y') e à postura de **observar
e perceber barreiras**.

### Arquivos

- **`logo-completa.png`** — versão horizontal com o nome + olhos. Uso em
  cabeçalhos de sidebar, telas de login, materiais oficiais.
- **`logo-olhos.png`** — só os olhos. Uso em favicons, marcas reduzidas
  (avatares pequenos, espaços < 64px).

### Regras

- **Sempre fundo transparente** (PNG-32 ou SVG). Nunca embutir branco/cor
  sólida ao redor; o logo deve "flutuar" sobre a superfície de uso.
- **Tamanho mínimo:** 96px de largura para `logo-completa` (legibilidade dos
  olhos); 32px para `logo-olhos`.
- **Contraste:** o logo é monocromático em ink (`#1E293B` ou próximo). Em
  fundos escuros, inverter para `ink-on-dark`. Nunca aplicar gradientes
  ou colorização que altere a forma.
- **Espaço de respiro:** mínimo igual à altura de um "olho" em torno do
  logo. Não posicionar elementos colados.

## Colors

A paleta **Dodger Estúdio** combina o azul Dodger como **cor de ação** e
o violeta acadêmico como **cor de progresso**. Cores semânticas (sucesso,
erro) e o âmbar XP entram para reforçar feedback e recompensa.

### Marca

- **Dodger (`#1E90FF`)** — cor primária de ação. Botões principais, links,
  foco. É a cor que diz "clique aqui, vamos avançar".
- **Violeta acadêmico (`#7C3AED`)** — cor de progresso e identidade
  educacional. Barras de progresso, tags de tópico, marcadores de trilha.
- **Âmbar XP (`#F59E0B`)** — exclusivo para recompensa: pontos de XP,
  destaque de conquista, nó atual da trilha. Usado com parcimônia.
- **Teal (`#14B8A6`)** — acento secundário, usado para informações
  contextuais (dicas, metadados de tempo, badges neutros).

### Estado

- **Sucesso (`#10B981`)** — conclusão de desafios, resposta correta, check.
- **Erro (`#EF4444`)** — resposta incorreta, falha de validação, alerta crítico.

### Superfície e texto

- **Surface (`#FAFCFF`)** — fundo geral da aplicação, levemente azulado para
  diferenciar do branco puro dos cards.
- **Surface raised (`#FFFFFF`)** — cards, modais, sidebar.
- **Surface sunken (`#F1F5FB`)** — opções de quiz, áreas inertes, tracks de progresso.
- **Ink (`#1E293B`)** — texto padrão. Contraste 12.6:1 sobre surface (AAA).
- **Ink muted (`#475569`)** — texto secundário, metadados, captions.

### Acessibilidade da paleta

Todas as combinações de texto/fundo definidas nos componentes atendem
**WCAG AA (4.5:1)** para texto normal. As variantes `-700` de cada cor são
reservadas para texto sobre fundos `-50`/`-100` da mesma família, garantindo
contraste seguro.

## Typography

Duas famílias formam o sistema:

- **Plus Jakarta Sans** — geometria amigável e títulos com personalidade,
  para `display`, `h1`–`h3`. Reforça o lado "estúdio" e dá voz institucional
  sem rigidez.
- **Inter** — texto corrido, labels, UI. Otimizada para leitura em telas,
  excelente legibilidade em tamanhos pequenos (importante para metadados
  como "~8 min", "5 desafios").
- **JetBrains Mono** — exclusivo para trechos de código exibidos como
  "evidência" em desafios (ex.: inspecionar HTML, comparar `aria-label`).

### Hierarquia

| Nível | Uso |
| --- | --- |
| `display` (40/700) | Nome do produto, hero ocasional |
| `h1` (32/700) | Título de página ("Perfil", "Minhas conquistas") |
| `h2` (24/600) | Título de trilha ("Fundamentos da Acessibilidade") |
| `h3` (20/600) | Título de desafio ("Contraste de texto") |
| `body-md` (16/400) | Corpo padrão, descrições, perguntas |
| `body-sm` (14/400) | Metadados curtos, captions |
| `label-md` (14/500) | Labels de formulário, botões |
| `label-sm` (12/500) | Tags, chips, contadores XP |
| `caps` (11/600, tracked) | Categorias (`FUNDAMENTAL`, `INICIANTE`) |
| `mono` (14/400) | Código embutido em desafios |

**Regra de peso:** nunca mais de **dois pesos** convivendo na mesma tela do
mesmo família — tipicamente `400` (corpo) + `600/700` (títulos).

## Layout

O layout segue um **grid de duas colunas fixo** no desktop: sidebar de
navegação à esquerda (240px) e área de conteúdo à direita com largura máxima
de 1200px e gutter de 24px. Em mobile, a sidebar colapsa para uma barra
superior com menu.

### Espaçamento

Escala estrita de **8px** (`base`). Toda margem, padding e gap **deve**
resolver para múltiplos da escala — exceções precisam de justificativa
escrita em comentário.

| Token | Valor | Uso típico |
| --- | --- | --- |
| `xs` | 4px | Gap entre ícone e label |
| `sm` | 8px | Padding interno de tags |
| `md` | 16px | Espaçamento padrão entre elementos |
| `lg` | 24px | Espaçamento entre seções |
| `xl` | 32px | Margens de página |
| `2xl` | 48px | Separação entre blocos principais |
| `3xl` | 64px | Top spacing de páginas, blocos hero |

### Alvos de toque

Mínimo **44×44px** para qualquer alvo clicável (WCAG 2.5.5 / AAA 2.5.8).
Inputs e botões padrão têm altura de 44px.

## Elevation & Depth

A hierarquia é construída majoritariamente por **camadas tonais**, não por
sombras pesadas. A diferença entre `surface`, `surface-raised` e
`surface-sunken` já comunica boa parte da profundidade.

- **none** — usado por padrão; cards "encostam" na superfície.
- **sm** — hover sutil em cards interativos (ex.: card de desafio).
- **md** — modais, dropdowns abertos.
- **lg** — overlays de conquista desbloqueada (momento celebratório).
- **focus-ring** — anel azul Dodger de 3px com 35% de opacidade.
  **Nunca remover** este anel no foco de teclado.

## Shapes

A linguagem de forma é **levemente arredondada e consistente** — moderna,
mas com presença suficiente para parecer "construída". Nunca mistura cantos
afiados e arredondados na mesma view.

- `sm` (6px) — chips internos, ícones de status.
- `md` (10px) — padrão para botões, inputs e tags estruturais.
- `lg` (14px) — cards, modais, badges de conquista.
- `xl` (20px) — overlays grandes, hero cards.
- `pill` / `full` (9999px) — tags, contadores XP, barras de progresso.

## Icons

A biblioteca canônica é **Lucide** (`lucide-react` para React,
`lucide-svelte` ou `lucide` puro para outros stacks). **Não usar emojis
Unicode** (🔒, ✓, ⭐, etc.) — renderizam inconsistentemente entre
plataformas, têm leitura imprevisível em screen readers, e quebram o
tom institucional/exemplar da plataforma.

### Tamanhos canônicos

| Tamanho | Uso |
| --- | --- |
| 14px | Inline em metadata (`Clock` ao lado de "~8 min") |
| 18px | Ícones de status secundários (`Lock` em desafios bloqueados) |
| 20px | Itens de sidebar; `ChevronRight` em CTAs |
| 22px | Ícones de status primário (`CheckCircle2` em conclusão) |
| 32px+ | Hero/celebratório (badges de conquista, modais de vitória) |

### Convenções

- **Stroke width** padrão `2`. Em estados ativos/hover de navegação,
  aumentar para `2.5` para reforço visual.
- **Decorativo:** todo ícone que acompanha texto recebe `aria-hidden="true"`.
- **Significante isolado:** ícone sem texto adjacente exige `aria-label`
  descritivo (ex.: botão "Fechar" só com `X` → `aria-label="Fechar"`).
- **Cor:** herdar `currentColor` por padrão (`text-{token}` controla a cor
  do ícone via CSS), exceto quando o ícone é badge sólido (XP, conquista).

### Mapeamento canônico

| Conceito | Lucide |
| --- | --- |
| Trilhas / Conteúdo de navegação | `Compass` |
| Conquistas / Recompensas | `Trophy` |
| Perfil de usuário | `User` |
| Desafio concluído | `CheckCircle2` |
| Desafio bloqueado | `Lock` |
| Duração / Tempo estimado | `Clock` |
| Iniciar / Avançar | `ChevronRight` |
| Voltar | `ChevronLeft` |
| XP / Energia / Recompensa | `Zap` |
| Sucesso celebratório | `Sparkles` |
| Aviso | `AlertTriangle` |
| Erro | `XCircle` |

## Components

### Botões

- **`button-primary`** — ação principal por tela (`Iniciar desafio`,
  `Continuar trilha`). Fundo Dodger sólido, texto branco. Apenas **um** por
  contexto/tela.
- **`button-secondary`** — ação alternativa (`Voltar`, `Ver detalhes`).
  Outline com texto violeta.
- **`button-ghost`** — ação terciária, links em barras de ação.

### Inputs

Borda discreta, foco com anel azul Dodger de 3px (ver `elevation.focus-ring`).
Labels acima do campo, nunca usando apenas placeholders.

### Cards

- **`card`** — container genérico (lista de trilhas, perfil).
- **`challenge-card`** — card grande de desafio com numeração circular à
  esquerda, título, e duração estimada.
- **`option-card`** — opção de múltipla escolha. Letra/ícone redondo à
  esquerda. Estados: padrão, selecionado (Dodger 50), correto (sucesso 50),
  errado (erro 50).

### Tags / Chips

- **`tag`** — categoria de conteúdo (`HTML semântico`, `WCAG`). Violeta 100 + 700.
- **`tag-success`** — ratificação (`WCAG 2.4.7 ok`). Sucesso 100 + 700.
- **`tag-xp`** — recompensa de XP (`+120 XP`). Âmbar 100 + 700.

### Progresso e gamificação

- **`progress-track` / `progress-fill`** — barra de progresso da trilha.
  Fill violeta (`secondary`); muda para sucesso quando 100% concluído.
- **`xp-counter`** — bloco fixo no rodapé da sidebar exibindo `XP 1.240 pts`.
- **`achievement-badge`** — card de conquista. Estado `locked` usa surface
  sunken + ink disabled, sem cor de marca.
- **`trail-node`** — nó individual no mapa de trilhas (ver `path.png`).
  Variantes: padrão, **current** (âmbar), **completed** (sucesso).

### Navegação

- **`sidebar`** — branco, largura fixa 240px, altura total da viewport,
  estrutura em 3 zonas verticais: `sidebar-header` (com logo), `nav` (links
  empilhados, ocupa o espaço flexível), e `xp-counter` ancorado ao rodapé.
  **A sidebar não rola junto com o conteúdo principal** — quando os
  desafios excedem a altura da viewport, somente a área de conteúdo rola.
- **`sidebar-header`** — **sem borda inferior** (o logo integra
  visualmente com a lista de navegação sem divisor explícito). Contém o
  `logo-completa.png` **centralizado horizontalmente** com largura de
  ~128px (`w-32`).
- **`sidebar-link`** — contém **ícone Lucide à esquerda (20px)** seguido
  do label. Variante `active` usa fundo Dodger 50 + texto Dodger 700, com
  `aria-current="page"`, e ícone com `strokeWidth={2.5}` para reforço visual.

### Roadmap (home das trilhas)

A tela inicial das **Trilhas** é um **roadmap visual** inspirado em
[roadmap.sh](https://roadmap.sh) (estrutura de etapas conectadas) e
**Duolingo** (caminho linear com destaque para "onde você está"). É a
porta de entrada para qualquer trilha — a `TrilhaScreen` só é alcançável
clicando em um `topic-node` daqui.

**Estrutura:**

1. **Header** com `text-display` "Não sabe por onde começar?", subtítulo
   convidativo, e `search-input` à direita para busca rápida de tópicos.
2. **Lista vertical de etapas (`section`)**, cada uma com:
   - **`roadmap-section-icon`** quadrado 40px em `violeta-100`/`violeta-700`
     com ícone Lucide identificando o tema (BookOpen, Code2, Palette, Zap).
   - Número (`roadmap-section-number`) em violeta + título em `text-h2`.
   - Descrição opcional em `body-md` `ink-muted`.
   - **Sequência horizontal de `topic-node`** conectados por `ChevronRight`
     (em desktop) ou `ChevronDown` (em mobile, quando os nós empilham).

**`topic-node` — 4 estados:**

| Estado | Visual | Interação |
| --- | --- | --- |
| `completed` | Fundo `sucesso-50`, borda `sucesso-200`, badge `CheckCircle2` + "Concluído" no header | Clicável (revisitar) |
| `current` | Fundo `ambar-50`, borda 2px `ambar-500`, **pill "Você está aqui"** em `ambar-500`/branco no header com `Sparkles`, progresso ("2/5 desafios") em `ambar-700` à direita | Clicável → abre `TrilhaScreen` |
| `available` | Fundo `surface-raised`, borda neutra, sem badge | Clicável |
| `locked` | Fundo `surface-sunken`, borda neutra, ícone `Lock` solitário no canto superior direito, título em `ink-muted` | Não clicável |

Cada nó tem **largura mínima 220px e máxima 280px** (`flex: 1`), de modo
que linhas com 3 ou 4 nós ocupem o espaço disponível sem cards gigantes.

**Hover de nós clicáveis:** `hover:-translate-y-0.5` + `hover:shadow-md` —
um pequeno levantamento que reforça a affordance sem distrair.

**Trilha única e contínua em padrão snake:** todos os elementos do
roadmap — títulos de etapa, cards de tópico, revisões de unidade e a meta
final — são **waypoints na mesma linha tracejada** que serpenteia como
uma cobra. Linhas alternam direção (LTR ↔ RTL) e curvas em U conectam o
fim de uma linha ao começo da próxima.

**Arquitetura: chunks fixos + `flex-row-reverse` em linhas pares**

```jsx
const ITEMS_PER_ROW = 5
const rows = chunkArray(waypoints, ITEMS_PER_ROW)

{rows.map((rowItems, rowIdx) => {
  const isReverse = rowIdx % 2 === 1
  return (
    <Fragment>
      <SnakeRow items={rowItems} reverse={isReverse} />
      {!lastRow && <InterRowConnector side={isReverse ? 'left' : 'right'} />}
    </Fragment>
  )
})}
```

Cada `SnakeRow` é um `<ol className="flex items-stretch">` com
`flex-row-reverse` aplicado em linhas de índice ímpar. A ordem do DOM
sempre segue a sequência de leitura (acessível); o `row-reverse` apenas
inverte o visual — assim o trilho continua naturalmente do canto direito
da linha N para o canto direito da linha N+1 (que, por estar invertida,
começa visualmente à direita).

**`items-stretch` é essencial:** sem ele, os cards mais curtos (sections
de uma linha, reviews) ficariam centralizados verticalmente e criariam
**espaço vazio entre o card e a linha vertical do `InterRowConnector`**.
Com `stretch`, todos os waypoints da linha esticam até a altura do mais
alto, fazendo a borda inferior de cada card encostar na linha que desce
para a próxima row. Gap visual zero.

**`DashedConnector` entre waypoints** — `border-t-2 border-dashed
border-border-strong` com `flex-grow` toma todo o espaço disponível
entre cards. Isso espalha os itens pela largura total e dá presença
visual à trilha (cada conector vira um "trecho de caminho").

**`InterRowConnector` entre linhas** — **linha vertical reta tracejada**
desenhada como um `<div>` com `border-l-2 border-dashed`, posicionado
absolutamente a **95px da borda** correspondente (direita ou esquerda).
95px equivale à metade da largura padrão de um card (190px), então a
linha alinha exatamente com o **centro do primeiro card da próxima row**,
independente da largura do viewport. Isso é mais robusto que SVG com
percentuais, que distorcem quando o container muda de tamanho.
**Altura do conector: `h-12` (48px)** — curto o suficiente para o trilho
parecer "contínuo" entre rows, longo o suficiente para ler ~3 dashes.

**Linha decorativa dentro da review pill** — como o pill é mais baixo
que outros cards e fica centralizado verticalmente, há um gap entre o
topo da row (onde a linha vertical chega) e o topo do pill. Uma linha
tracejada absoluta dentro da `<article>` da review (`top: 0`,
`left: 50%`, `height: calc(50% - 30px)`, `border-l-2 border-dashed`)
preenche esse gap visualmente — a linha vertical da InterRowConnector
parece *continuar dentro do card* até tocar o topo do pill.

**4 tipos de waypoint:**

| Tipo | Visual | Propósito |
| --- | --- | --- |
| `section` | **Apenas texto** (sem borda, sem fundo): ícone Lucide em `violeta-700` à esquerda + "Etapa N" em `caps`/`violeta-700` + título em `text-h3`/`ink-strong` | Marco/signpost da etapa — o "letreiro" que se posiciona no meio da trilha entre o último card da etapa anterior e o primeiro da próxima |
| `topic` | Card retangular `rounded-lg` com bordas, conforme estados (`em-andamento`, `bloqueado`, etc.) | Unidade de aprendizado clicável |
| `review` | **Pill horizontal compacta** (`rounded-[2.5rem]` = 40px, layout `flex items-center` com ícone esquerda + texto + status direita) em paleta violeta (fundo `violeta-50`, borda `violeta-200`/`violeta-500`). LI esticada à row (`items-stretch`) com o pill centralizado verticalmente, e **uma linha decorativa tracejada interna** vai do topo da LI até o topo do pill — assim a linha vertical do `InterRowConnector` parece *continuar dentro do card* e os conectores horizontais (que ficam no meio da row) saem dos lados do pill centralizado | Revisão de unidade ao final de cada etapa. **Verde fica reservado exclusivamente para "concluído"**, então review usa violeta (mesma família das seções, mas com identidade própria via formato pill curto e arredondado) |
| `goal` | Emblema circular grande em `dodger-500` com ícone `Flag`, "Meta final" abaixo | Endpoint da trilha — recompensa visual ao chegar no fim |

**Destaque do nó atual:** o tópico `em-andamento` recebe fundo `ambar-50`,
borda `ambar-500` e **`ring-4 ring-ambar-500/20`** — halo sutil que faz
o card "pulsar" visualmente sem precisar de animação.

**Mobile:** o `flex-wrap` quebra para uma coluna naturalmente quando os
cards não cabem lado a lado. Os conectores entre items continuam
tracejados (mas verticalmente). Mesma trilha contínua, sem acrobacias
gráficas adicionais.

### Navegação entre as telas das Trilhas

```
PathScreen (home das trilhas)
   ↓ clicar em topic-node clicável
TrilhaScreen (lista de desafios)
   ↓ clicar em "Iniciar" de um desafio
DesafioScreen (quiz interativo)
   ↑ "Voltar para a trilha"
TrilhaScreen
   ↑ "Voltar ao roadmap"
PathScreen
```

Cada nível tem um back-link `ChevronLeft` no topo. Trocar de seção pela
sidebar (`Conquistas` ou `Perfil` e voltar para `Trilhas`) reseta o
estado para `PathScreen` — sem manter "trilha aberta" entre seções.

### Desafio (Quiz interativo)

Cada **desafio** é uma micro-experiência de avaliação em duas fases que
combina **leitura** (a pergunta) e **inspeção visual** (o componente real
sendo criticado, no `evidence-frame` à direita).

**Estrutura da tela:**

1. **`back-link`** — botão de retorno no topo (ChevronLeft + "Voltar para
   a trilha"). Estilo ghost para não competir com a ação principal.
2. **`breadcrumb`** — caminho de localização (`Trilha / Desafio atual`).
   O item final é destacado em `ink-strong`; os anteriores em `ink-muted`.
3. **Título + instrução** — `text-display` para o nome do desafio,
   `text-body-lg` em `ink-muted` para a instrução de execução.
4. **Grid de duas colunas (`lg:grid-cols-2`):**
   - **Esquerda:** card com pergunta (`text-h2`) e lista de `option-card`s.
   - **Direita:** `evidence-frame` com o componente real para inspeção.
   - **As duas colunas têm a mesma altura** (`items-stretch`, o padrão do
     grid). O canvas do `evidence-frame` cresce (`flex-1`) para preencher
     o espaço, e o componente sob análise fica centralizado vertical e
     horizontalmente dentro dele. Isso evita uma assimetria onde o card
     da pergunta seria mais alto que o frame da evidência.

**Fluxo do `option-card`:**

| Fase | Estado | Visual |
| --- | --- | --- |
| Antes de confirmar | `default` | Fundo `surface-sunken`, borda transparente, letra em círculo neutro |
| Antes de confirmar | `selected` | Fundo `dodger-50`, borda `dodger-500`, letra em círculo Dodger sólido com texto branco |
| Após confirmar | `correct` | Fundo `sucesso-50`, borda `sucesso-500`, letra substituída por ícone `CheckCircle2` em círculo verde sólido |
| Após confirmar | `wrong` | Fundo `erro-50`, borda `erro-500`, letra substituída por ícone `XCircle` em círculo vermelho sólido |
| Após confirmar | `dimmed` | Mesmo visual do `default` com `opacity-60` — opções não escolhidas ficam recuadas mas legíveis |

A borda é sempre de 2px (transparente no estado `default`) para evitar
deslocamentos de layout quando o estado muda — comportamento canônico de
componentes que mudam visualmente sem reordenar a UI.

**`evidence-frame`:** moldura de "janela" inspirada em editores de código,
com header em `surface-sunken` mostrando o nome (`Componente em análise` em
`font-mono`) e três círculos coloridos (vermelho/âmbar/verde) à direita —
referência visual ao macOS sem implicar funcionalidade. Dentro, fundo
branco puro (`#FFFFFF`) para mostrar o componente sendo criticado **no
contexto real em que apareceria**.

**`feedback-panel`:** aparece após o usuário confirmar a resposta. Variante
`success` exibe ícone `CheckCircle2`, título "Resposta correta!", pill âmbar
com `+XX XP` à direita, e explicação técnica detalhada. Variante `error`
exibe ícone `XCircle`, título "Não foi dessa vez. A opção correta era X.",
sem pill de XP, e a mesma explicação (para que o erro também ensine).

### Gamificação (XP)

- **`xp-counter`** — bloco fixo no rodapé da sidebar. Fundo `ambar-50` com
  borda `ambar-100`, contém um `xp-counter-badge` (quadrado 40px em
  `ambar-500` com ícone `Zap`) à esquerda, e uma coluna à direita com
  label "XP" em `caps`/`ambar-700` e a pontuação em `typography.h3` bold.
  É o único uso permanente do âmbar na UI — o resto da paleta âmbar fica
  reservado para momentos celebratórios de recompensa.

### Perfil

A tela de Perfil é deliberadamente enxuta: apenas o título `Perfil`, o
card "Dados pessoais" com o formulário, e a lista "Histórico de trilhas".
**Sem hero de identidade no topo** — o XP do usuário já é visível
permanentemente no `xp-counter` da sidebar, então duplicá-lo aqui seria
redundante. Esse minimalismo segue o mockup original e mantém o foco em
"editar perfil" como a ação central da tela.

- **`form-field`** — agrupamento padrão de label + input para formulários.
  - **`form-field-label`** sempre **visível e acima do input** (nunca apenas
    placeholder — viola `WCAG 3.3.2`). Estilo `label-md` em `ink-strong`,
    semibold, com `mb-2` antes do input.
  - **`form-field-input`** com ícone `Lucide` à esquerda como dica visual
    (User para nome, Mail para email, Lock para senha). O ícone fica em
    posição absoluta a 16px da borda esquerda, `pointer-events-none`, com
    `pl-11` no input para acomodá-lo. Foco substitui `border-border` por
    `border-dodger-500` e troca o fundo de `surface` para `surface-raised`.

- **`trail-history-card`** — item da lista "Histórico de trilhas". Mesma
  estrutura visual do `challenge-card` (ícone 48px à esquerda, título +
  metadata no centro, badge de status à direita), mas com **mini-barra de
  progresso** (`max-w-md`, `h-1.5`) abaixo da metadata mostrando o avanço
  atual. Variantes: padrão (violeta, em andamento) e `completed` (sucesso).

### Conquistas

A tela de Conquistas é dividida em duas seções: **conquistas de trilhas**
(badges desbloqueados ao completar trilhas específicas) e **conquistas de
pontuação** (medalhas desbloqueadas ao atingir thresholds de XP).

- **`achievement-badge`** — card vertical em grid de 4 colunas (2 em
  mobile). Centralizado: ícone circular 64px no topo, nome em `text-h3`
  bold, descrição em `body-sm` `ink-muted` abaixo.
  - **`unlocked`**: fundo `violeta-50`, borda `violeta-200` (vira
    `violeta-500` no hover), ícone em círculo `violeta-500` sólido com
    `BadgeCheck`/`Trophy`/etc. em branco, nome em `violeta-700`, e uma
    `tag` "Desbloqueada" abaixo da descrição.
  - **`locked`**: fundo `surface-sunken`, ícone em círculo
    `surface-raised` com `Lock` cinza, nome em `ink-muted`.

- **`score-medal`** — card menor (grid de 4×2), com ícone circular 48px
  no topo, nome em `caps`, valor de XP em `label-sm` bold abaixo. As
  variantes de **tier** usam cores ascendentes para reforçar progressão:
  - **Bronze (1k–3k XP):** `ambar-500` — Iniciante, Entusiasta.
  - **Prata (5k–7.5k XP):** `teal-500` — Praticante, Exemplar.
  - **Ouro (10k–15k XP):** `violeta-500` — Profissional, Mestre.
  - **Especial (20k–30k XP):** `dodger-500` — Guardião, Mentor.

  Medalha bloqueada usa fundo `surface-sunken`, círculo neutro com `Lock`,
  e `opacity-70` para recuar visualmente.

- **Header da tela:** Além do `text-display`, mostra contagem dinâmica
  ("X de Y conquistas desbloqueadas") e — quando houver — a próxima
  medalha alcançável com o XP faltante destacado em `ambar-700`. Isso
  cria um gancho de progressão visível em todo acesso à tela.

## Do's and Don'ts

### ✅ Do

- **Use Dodger apenas para a ação primária mais importante de cada tela.**
  Múltiplos botões Dodger competindo destroem a hierarquia.
- **Use violeta para comunicar progresso e identidade pedagógica.** Não
  use violeta para chamar à ação.
- **Use âmbar XP com parcimônia** — quanto mais raro, mais brilhante o
  momento de recompensa.
- **Sempre mantenha o focus-ring de 3px no foco de teclado.** É o exemplo
  vivo do princípio que a plataforma ensina (`WCAG 2.4.7`).
- **Mantenha contraste mínimo de 4.5:1** para texto normal e 3:1 para
  texto grande/UI components.
- **Use labels visíveis** em todos os campos de formulário. Placeholder não
  é label (`WCAG 3.3.2`).
- **Garanta alvos de toque de 44×44px** em todos os controles interativos.
- **Use semântica HTML correta** antes de recorrer a ARIA — `<button>`
  antes de `<div role="button">`.

### ❌ Don't

- **Não misture cantos arredondados e cantos retos na mesma view.**
- **Não remova o anel de foco** para "limpar" o visual — é violação de
  WCAG e contradiz o propósito da plataforma.
- **Não use apenas cor para transmitir significado** (acerto/erro precisam
  vir acompanhados de ícone ou texto — `WCAG 1.4.1`).
- **Não use mais de dois pesos tipográficos por tela** dentro da mesma
  família.
- **Não use o âmbar XP para alertas ou erros** — ele é exclusivo de
  recompensa positiva. Para aviso, use o `tag` violeta neutro ou um
  componente de toast dedicado.
- **Não use texto sobre imagens sem overlay** que garanta contraste
  suficiente.
- **Não autoplay nada** (áudio, vídeo, animações longas) — respeito
  cognitivo e `prefers-reduced-motion`.
- **Não escreva conteúdo em CAPS LOCK** fora do estilo `caps` definido
  (categorias curtas). Leitores de tela soletram letra por letra.
