import { createContext, useContext, useEffect, useState } from 'react'

const KEYS = {
  csat: (id) => `ally_survey_csat_${id}`,
  nps: 'ally_survey_nps',
  sessionCount: 'ally_survey_session_count',
  npsLastShown: 'ally_survey_nps_last_shown',
}

const NPS_SESSION_THRESHOLD = 5
const NPS_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000

const SurveyContext = createContext(null)

export function SurveyProvider({ children }) {
  const [npsDismissedThisSession, setNpsDismissedThisSession] = useState(false)

  useEffect(() => {
    const count = parseInt(localStorage.getItem(KEYS.sessionCount) ?? '0', 10)
    localStorage.setItem(KEYS.sessionCount, String(count + 1))
  }, [])

  function _cooldownExpirado() {
    const lastShown = parseInt(localStorage.getItem(KEYS.npsLastShown) ?? '0', 10)
    return Date.now() - lastShown > NPS_COOLDOWN_MS
  }

  function shouldShowCsat(desafioId) {
    return !localStorage.getItem(KEYS.csat(desafioId))
  }

  function shouldShowNps() {
    if (npsDismissedThisSession) return false
    return _cooldownExpirado()
  }

  function shouldShowNpsSession() {
    if (!shouldShowNps()) return false
    const count = parseInt(localStorage.getItem(KEYS.sessionCount) ?? '0', 10)
    return count >= NPS_SESSION_THRESHOLD
  }

  function submitCsat(desafioId, rating) {
    localStorage.setItem(KEYS.csat(desafioId), JSON.stringify({ rating, ts: Date.now() }))
  }

  function submitNps(score) {
    localStorage.setItem(KEYS.nps, JSON.stringify({ score, ts: Date.now() }))
    localStorage.setItem(KEYS.npsLastShown, String(Date.now()))
  }

  function dismissNps() {
    setNpsDismissedThisSession(true)
  }

  return (
    <SurveyContext.Provider
      value={{ shouldShowCsat, shouldShowNps, shouldShowNpsSession, submitCsat, submitNps, dismissNps }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export function useSurvey() {
  return useContext(SurveyContext)
}
