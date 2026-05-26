/* ============================================================
   Estrutura de trilhas + roadmap.

   `sections` define o roadmap visual da home (PathScreen).
   Cada tópico que tem `trilhaId` aponta para uma trilha jogável
   em `trilhas`. Tópicos sem trilhaId continuam "bloqueado".

   Apenas a trilha "fundamentos" está mockada completamente
   nesta entrega (5 desafios × 4 perguntas).
   ============================================================ */

import { BookOpen, Code2, Palette, Zap } from 'lucide-react'
import { perguntasPorDesafio } from './perguntas'

export const ICON_MAP = { BookOpen, Code2, Palette, Zap }

export const sections = [
  {
    id: 'inicio',
    numero: 0,
    titulo: 'Início',
    iconName: 'BookOpen',
    topicos: [
      {
        id: 'fundamentos',
        trilhaId: 'fundamentos',
        titulo: 'Fundamentos da Acessibilidade',
        subtitulo: 'A11y, WCAG, semântica',
      },
      {
        id: 'wcag',
        titulo: '4 princípios da WCAG',
        subtitulo: 'Perceptível, Operável, Compreensível, Robusto',
      },
      {
        id: 'contraste',
        titulo: 'Contraste, Cores e Leitores',
        subtitulo: 'Daltonismo e screen readers',
      },
      {
        id: 'legislacao',
        titulo: 'Legislação',
        subtitulo: 'LBI, Lei nº 13.146/2015',
      },
    ],
  },
  {
    id: 'html',
    numero: 1,
    titulo: 'Conhecendo o HTML',
    iconName: 'Code2',
    topicos: [
      { id: 'html-intro', titulo: 'Introdução ao HTML', subtitulo: 'Tags, elementos, atributos' },
      { id: 'html-semantico', titulo: 'HTML Semântico', subtitulo: 'main, nav, article, aside' },
      { id: 'aria', titulo: 'WAI-ARIA', subtitulo: 'Quando NÃO usar' },
    ],
  },
  {
    id: 'css',
    numero: 2,
    titulo: 'Estilizando com CSS',
    iconName: 'Palette',
    topicos: [
      { id: 'focus', titulo: 'Estados de foco', subtitulo: 'WCAG 2.4.7' },
      { id: 'motion', titulo: 'prefers-reduced-motion', subtitulo: 'Respeitar quem precisa de calma' },
      { id: 'contrast', titulo: 'Sistema de contraste', subtitulo: 'Construir uma paleta AA' },
    ],
  },
  {
    id: 'js',
    numero: 3,
    titulo: 'JavaScript acessível',
    iconName: 'Zap',
    topicos: [
      { id: 'keyboard', titulo: 'Navegação por teclado', subtitulo: 'Tab order, focus trap' },
      { id: 'focus-mgmt', titulo: 'Gestão de foco', subtitulo: 'Modais, drawers, menus' },
      { id: 'live-regions', titulo: 'Live regions', subtitulo: 'aria-live, status updates' },
    ],
  },
]

export const trilhas = {
  fundamentos: {
    id: 'fundamentos',
    titulo: 'Fundamentos da Acessibilidade',
    descricao:
      'A base de tudo: WCAG, HTML semântico, foco visível e contraste. O que diferencia uma página acessível de uma promessa vazia.',
    duracaoMin: 45,
    bonusFinal: 200,
    recompensaNome: 'Fundamental',
    desafios: [
      {
        id: '01',
        titulo: 'Foco visível em botões',
        descricao: 'Identifique quando um indicador de foco é insuficiente.',
        duracaoMin: 8,
        xp: 80,
        dificuldade: 1,
        perguntas: perguntasPorDesafio['01'],
      },
      {
        id: '02',
        titulo: 'Labels em campos de formulário',
        descricao: 'Reconheça padrões de rótulos que parecem corretos mas não são.',
        duracaoMin: 10,
        xp: 100,
        dificuldade: 1,
        perguntas: perguntasPorDesafio['02'],
      },
      {
        id: '03',
        titulo: 'Contraste de texto',
        descricao: 'Aplique as razões da WCAG AA em situações reais.',
        duracaoMin: 8,
        xp: 120,
        dificuldade: 2,
        perguntas: perguntasPorDesafio['03'],
      },
      {
        id: '04',
        titulo: 'Navegação por teclado',
        descricao: 'Avalie tab order, semântica e atalhos sob a ótica de teclado puro.',
        duracaoMin: 12,
        xp: 150,
        dificuldade: 2,
        perguntas: perguntasPorDesafio['04'],
      },
      {
        id: '05',
        titulo: 'Imagens com texto alternativo',
        descricao: 'Decida quando descrever, quando silenciar e quando trocar de tag.',
        duracaoMin: 11,
        xp: 180,
        dificuldade: 3,
        perguntas: perguntasPorDesafio['05'],
      },
    ],
  },
}

/* Soma dos xps dos desafios (sem bônus). Útil para mostrar no header. */
export function xpTotalTrilha(trilha) {
  return trilha.desafios.reduce((soma, d) => soma + d.xp, 0)
}

export function totalPerguntasTrilha(trilha) {
  return trilha.desafios.reduce((soma, d) => soma + d.perguntas.length, 0)
}
