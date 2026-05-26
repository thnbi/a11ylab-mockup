import { useState } from 'react'
import Sidebar from './Sidebar'
import PathScreen from './PathScreen'
import TrilhaScreen from './TrilhaScreen'
import DesafioScreen from './DesafioScreen'
import AulaScreen from './AulaScreen'
import ConquistasScreen from './ConquistasScreen'
import PerfilScreen from './PerfilScreen'
import AuthScreen from './AuthScreen'
import EmBreveScreen from './EmBreveScreen'
import SkipLink from './components/SkipLink'
import PreferenciasDialog from './components/PreferenciasDialog'
import TourGuide from './components/TourGuide'
import { useAuth } from './contexts/AuthContext'

export default function App() {
  const { user } = useAuth()
  const [secao, setSecao] = useState('trilhas')
  const [trilhaTela, setTrilhaTela] = useState({ nome: 'path' })
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [tourStartKey, setTourStartKey] = useState(0)

  if (!user) return <AuthScreen />

  const handleSecaoChange = (s) => {
    setSecao(s)
    if (s === 'trilhas') setTrilhaTela({ nome: 'path' })
  }

  return (
    <>
      <SkipLink />
      <div className="h-dvh flex bg-surface overflow-hidden">
        <Sidebar
          secao={secao}
          onChange={handleSecaoChange}
          onAbrirPreferencias={() => setPrefsOpen(true)}
        />
        <main
          id="conteudo-principal"
          tabIndex={-1}
          className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden focus:outline-none"
        >
          {secao === 'trilhas' && trilhaTela.nome === 'path' && (
            <PathScreen
              onAbrirTrilha={(trilhaId) => setTrilhaTela({ nome: 'trilha', trilhaId })}
              onAbrirEmBreve={(topico) => setTrilhaTela({ nome: 'em-breve', topico })}
            />
          )}
          {secao === 'trilhas' && trilhaTela.nome === 'trilha' && (
            <TrilhaScreen
              trilhaId={trilhaTela.trilhaId}
              onIniciar={(desafioId) =>
                setTrilhaTela((s) => ({ nome: 'desafio', trilhaId: s.trilhaId, desafioId }))
              }
              onAbrirAula={(aulaId) =>
                setTrilhaTela((s) => ({ nome: 'aula', trilhaId: s.trilhaId, aulaId }))
              }
              onVoltarRoadmap={() => setTrilhaTela({ nome: 'path' })}
            />
          )}
          {secao === 'trilhas' && trilhaTela.nome === 'aula' && (
            <AulaScreen
              trilhaId={trilhaTela.trilhaId}
              aulaId={trilhaTela.aulaId}
              onVoltarTrilha={() =>
                setTrilhaTela((s) => ({ nome: 'trilha', trilhaId: s.trilhaId }))
              }
              onIrParaDesafio={(desafioId) =>
                setTrilhaTela((s) => ({ nome: 'desafio', trilhaId: s.trilhaId, desafioId }))
              }
            />
          )}
          {secao === 'trilhas' && trilhaTela.nome === 'desafio' && (
            <DesafioScreen
              trilhaId={trilhaTela.trilhaId}
              desafioId={trilhaTela.desafioId}
              onVoltarTrilha={() =>
                setTrilhaTela((s) => ({ nome: 'trilha', trilhaId: s.trilhaId }))
              }
              onIrParaDesafio={(desafioId) =>
                setTrilhaTela((s) => ({ nome: 'desafio', trilhaId: s.trilhaId, desafioId }))
              }
            />
          )}
          {secao === 'trilhas' && trilhaTela.nome === 'em-breve' && (
            <EmBreveScreen
              topicoTitulo={trilhaTela.topico.titulo}
              topicoSubtitulo={trilhaTela.topico.subtitulo}
              onVoltarRoadmap={() => setTrilhaTela({ nome: 'path' })}
            />
          )}
          {secao === 'conquistas' && <ConquistasScreen />}
          {secao === 'perfil' && <PerfilScreen />}
        </main>
      </div>

      <PreferenciasDialog
        open={prefsOpen}
        onClose={() => setPrefsOpen(false)}
        onRefazerTour={() => {
          setPrefsOpen(false)
          setTourStartKey((k) => k + 1)
        }}
      />

      <TourGuide
        secao={secao}
        startSignal={tourStartKey}
        onIrPara={(s) => handleSecaoChange(s)}
      />
    </>
  )
}
