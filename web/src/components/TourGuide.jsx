import { useEffect, useRef } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

/* ============================================================
   TourGuide, tour acessível na primeira entrada.

   Dispara automaticamente se a flag `a11ylab.tour-done` não está
   em localStorage. Também pode ser disparado manualmente pelo
   diálogo de preferências via incremento de `startSignal`.

   Antes de iniciar, força a navegação para a seção "trilhas" -
   é onde os elementos com `data-tour` ficam visíveis.
   ============================================================ */

const TOUR_DONE_KEY = 'a11ylab.tour-done'

export default function TourGuide({ secao, startSignal, onIrPara }) {
  const lastSignalRef = useRef(0)
  const driverRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const jaFez = window.localStorage.getItem(TOUR_DONE_KEY) === '1'
    const reativadoManualmente = startSignal > lastSignalRef.current

    if (jaFez && !reativadoManualmente) return
    lastSignalRef.current = startSignal

    // Garante que estamos em "trilhas" antes do tour rodar
    if (secao !== 'trilhas') {
      onIrPara?.('trilhas')
    }

    // Pequeno delay para os componentes da seção montarem
    const tStart = setTimeout(() => {
      driverRef.current = driver({
        showProgress: true,
        animate: true,
        smoothScroll: true,
        allowClose: true,
        overlayOpacity: 0.6,
        stagePadding: 6,
        stageRadius: 12,
        progressText: 'Passo {{current}} de {{total}}',
        nextBtnText: 'Próximo →',
        prevBtnText: '← Voltar',
        doneBtnText: 'Começar a aprender 👀',
        steps: [
          {
            popover: {
              title: 'Boas-vindas ao A11yLAB! 👀',
              description:
                'Em 4 passinhos vou te mostrar o essencial. Você pode pular a qualquer momento, e refazer este tour pelas Preferências.',
              align: 'center',
            },
          },
          {
            element: '[data-tour="sidebar-nav"]',
            popover: {
              title: 'Navegação principal',
              description:
                '<strong>Trilhas</strong> é onde você aprende na prática. <strong>Conquistas</strong> guarda seus selos. <strong>Perfil</strong> mostra suas estatísticas.',
              side: 'right',
              align: 'start',
            },
          },
          {
            element: '[data-tour="roadmap"]',
            popover: {
              title: 'Roadmap livre',
              description:
                'Você pode começar por <strong>qualquer tópico</strong> - não existe ordem obrigatória. Use a busca para filtrar pelo que precisa aprender agora.',
              side: 'bottom',
              align: 'center',
            },
          },
          {
            element: '[data-tour="acessibilidade"]',
            popover: {
              title: 'Tudo aqui é ajustável',
              description:
                'Contraste alto, fonte maior, modo escuro, redução de movimento, fonte para dislexia. Afinal, é uma plataforma <strong>sobre</strong> acessibilidade.',
              side: 'right',
              align: 'center',
            },
          },
        ],
        onDestroyed: () => {
          window.localStorage.setItem(TOUR_DONE_KEY, '1')
        },
      })
      driverRef.current.drive()
    }, 600)

    return () => {
      clearTimeout(tStart)
      if (driverRef.current?.isActive?.()) {
        driverRef.current.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSignal])

  return null
}
