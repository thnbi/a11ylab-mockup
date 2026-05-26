/* ============================================================
   Registry central de referências bibliográficas usadas pelas
   aulas. Cada aula importa apenas os IDs que cita.

   Campos:
     - titulo: nome humano da referência (mostrado ao usuário)
     - url: link direto
     - fonte: organização/site (ex: "W3C", "MDN", "WebAIM")
   ============================================================ */

export const referencias = {
  /* --- WCAG 2.2 - critérios de sucesso oficiais ---------------- */
  'wcag-1-1-1': {
    titulo: 'WCAG 2.2 - 1.1.1 Non-text Content (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    fonte: 'W3C',
  },
  'wcag-1-3-1': {
    titulo: 'WCAG 2.2 - 1.3.1 Info and Relationships (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    fonte: 'W3C',
  },
  'wcag-1-4-3': {
    titulo: 'WCAG 2.2 - 1.4.3 Contrast (Minimum) (Nível AA)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
    fonte: 'W3C',
  },
  'wcag-1-4-6': {
    titulo: 'WCAG 2.2 - 1.4.6 Contrast (Enhanced) (Nível AAA)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html',
    fonte: 'W3C',
  },
  'wcag-1-4-11': {
    titulo: 'WCAG 2.2 - 1.4.11 Non-text Contrast (Nível AA)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html',
    fonte: 'W3C',
  },
  'wcag-2-1-1': {
    titulo: 'WCAG 2.2 - 2.1.1 Keyboard (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
    fonte: 'W3C',
  },
  'wcag-2-1-2': {
    titulo: 'WCAG 2.2 - 2.1.2 No Keyboard Trap (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html',
    fonte: 'W3C',
  },
  'wcag-2-1-4': {
    titulo: 'WCAG 2.2 - 2.1.4 Character Key Shortcuts (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html',
    fonte: 'W3C',
  },
  'wcag-2-4-3': {
    titulo: 'WCAG 2.2 - 2.4.3 Focus Order (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html',
    fonte: 'W3C',
  },
  'wcag-2-4-7': {
    titulo: 'WCAG 2.2 - 2.4.7 Focus Visible (Nível AA)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html',
    fonte: 'W3C',
  },
  'wcag-2-4-11': {
    titulo: 'WCAG 2.2 - 2.4.11 Focus Not Obscured (Minimum) (Nível AA)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
    fonte: 'W3C',
  },
  'wcag-3-3-2': {
    titulo: 'WCAG 2.2 - 3.3.2 Labels or Instructions (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html',
    fonte: 'W3C',
  },
  'wcag-4-1-2': {
    titulo: 'WCAG 2.2 - 4.1.2 Name, Role, Value (Nível A)',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html',
    fonte: 'W3C',
  },

  /* --- Técnicas e tutoriais W3C --------------------------------- */
  'w3c-alt-decision-tree': {
    titulo: 'An alt Decision Tree, árvore de decisão para texto alternativo',
    url: 'https://www.w3.org/WAI/tutorials/images/decision-tree/',
    fonte: 'W3C WAI',
  },
  'w3c-images-tutorial': {
    titulo: 'Web Accessibility Tutorials, Images',
    url: 'https://www.w3.org/WAI/tutorials/images/',
    fonte: 'W3C WAI',
  },
  'w3c-forms-tutorial': {
    titulo: 'Web Accessibility Tutorials, Forms (Labeling Controls)',
    url: 'https://www.w3.org/WAI/tutorials/forms/labels/',
    fonte: 'W3C WAI',
  },
  'w3c-keyboard-design': {
    titulo: 'ARIA Authoring Practices, Developing a Keyboard Interface',
    url: 'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/',
    fonte: 'W3C WAI',
  },

  /* --- MDN Web Docs --------------------------------------------- */
  'mdn-focus-visible': {
    titulo: 'CSS :focus-visible',
    url: 'https://developer.mozilla.org/docs/Web/CSS/:focus-visible',
    fonte: 'MDN',
  },
  'mdn-outline': {
    titulo: 'CSS outline, propriedade shorthand',
    url: 'https://developer.mozilla.org/docs/Web/CSS/outline',
    fonte: 'MDN',
  },
  'mdn-label': {
    titulo: 'HTML <label> - The Label element',
    url: 'https://developer.mozilla.org/docs/Web/HTML/Element/label',
    fonte: 'MDN',
  },
  'mdn-img': {
    titulo: 'HTML <img> - The Image Embed element (atributo alt)',
    url: 'https://developer.mozilla.org/docs/Web/HTML/Element/img',
    fonte: 'MDN',
  },
  'mdn-tabindex': {
    titulo: 'HTML atributo tabindex',
    url: 'https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex',
    fonte: 'MDN',
  },
  'mdn-keyboard-widgets': {
    titulo: 'Keyboard-navigable JavaScript widgets',
    url: 'https://developer.mozilla.org/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets',
    fonte: 'MDN',
  },

  /* --- WebAIM --------------------------------------------------- */
  'webaim-focus': {
    titulo: 'Keyboard Accessibility, Focus',
    url: 'https://webaim.org/techniques/keyboard/#focus',
    fonte: 'WebAIM',
  },
  'webaim-forms': {
    titulo: 'Creating Accessible Forms',
    url: 'https://webaim.org/techniques/forms/',
    fonte: 'WebAIM',
  },
  'webaim-contrast': {
    titulo: 'Contrast and Color Accessibility',
    url: 'https://webaim.org/articles/contrast/',
    fonte: 'WebAIM',
  },
  'webaim-contrast-checker': {
    titulo: 'Contrast Checker, ferramenta online',
    url: 'https://webaim.org/resources/contrastchecker/',
    fonte: 'WebAIM',
  },
  'webaim-alt': {
    titulo: 'Alternative Text, guia de texto alternativo',
    url: 'https://webaim.org/techniques/alttext/',
    fonte: 'WebAIM',
  },
  'webaim-keyboard': {
    titulo: 'Keyboard Accessibility',
    url: 'https://webaim.org/techniques/keyboard/',
    fonte: 'WebAIM',
  },

  /* --- Deque University ----------------------------------------- */
  'deque-placeholder': {
    titulo: 'Placeholder Attribute Is Not a Replacement for Labels',
    url: 'https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/',
    fonte: 'Deque University',
  },

  /* --- Conteúdo em português ----------------------------------- */
  'emag': {
    titulo: 'eMAG, Modelo de Acessibilidade em Governo Eletrônico (v3.1)',
    url: 'https://emag.governoeletronico.gov.br/',
    fonte: 'Governo Federal (Brasil)',
  },
  'mwpt-imagens': {
    titulo: 'Movimento Web pra Todos, Descrições de imagens',
    url: 'https://mwpt.com.br/voce-conhece-todos-os-tipos-de-descricoes-de-imagens/',
    fonte: 'Movimento Web pra Todos',
  },
  'mwpt-contraste': {
    titulo: 'Movimento Web pra Todos, Contraste de cores',
    url: 'https://mwpt.com.br/contraste-de-cores-na-acessibilidade-digital/',
    fonte: 'Movimento Web pra Todos',
  },
  'lbi': {
    titulo: 'Lei Brasileira de Inclusão, Lei nº 13.146/2015 (LBI)',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm',
    fonte: 'Planalto / Brasil',
  },
}
