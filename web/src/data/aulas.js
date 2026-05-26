/* ============================================================
   Aulas teóricas que precedem cada desafio. Apenas a trilha
   "fundamentos" tem aulas mockadas nesta entrega.

   Estrutura:
     aulasPorTrilha[trilhaId] = [ aula1, aula2, ... ]
   Cada aula referencia um componente de conteúdo em
   data/aulaConteudo.jsx via `conteudoId`.

   A ordem do array reflete a ordem visual na TrilhaScreen
   (intercalada com desafios).
   ============================================================ */

export const aulasPorTrilha = {
  fundamentos: [
    {
      id: 'aula-foco-visivel',
      desafioId: '01',
      titulo: 'Foco visível: o que é e por que importa',
      descricao:
        'Por que o indicador de foco salva a navegação por teclado, e como o CSS pode destruí-lo sem você perceber.',
      duracaoMin: 5,
      conteudoId: 'aula-foco-visivel',
    },
    {
      id: 'aula-labels',
      desafioId: '02',
      titulo: 'Labels acessíveis em formulários',
      descricao:
        'A diferença entre rótulo visual e label programático, e por que placeholder nunca substitui um <label>.',
      duracaoMin: 6,
      conteudoId: 'aula-labels',
    },
    {
      id: 'aula-contraste',
      desafioId: '03',
      titulo: 'Contraste de cor: as razões da WCAG',
      descricao:
        'Razões 4.5:1, 3:1 e 7:1 - quando se aplicam, como medir e o que conta como "texto grande".',
      duracaoMin: 6,
      conteudoId: 'aula-contraste',
    },
    {
      id: 'aula-teclado',
      desafioId: '04',
      titulo: 'Navegação por teclado e ordem de foco',
      descricao:
        'Tab order, focus trap, atalhos de uma tecla e por que `tabindex` positivo quase sempre é uma má ideia.',
      duracaoMin: 7,
      conteudoId: 'aula-teclado',
    },
    {
      id: 'aula-alt',
      desafioId: '05',
      titulo: 'Texto alternativo em imagens',
      descricao:
        'A árvore de decisão do W3C: quando descrever, quando silenciar com alt="" e quando trocar de tag.',
      duracaoMin: 7,
      conteudoId: 'aula-alt',
    },
  ],
}
