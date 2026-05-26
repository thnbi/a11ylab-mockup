import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PreferencesProvider } from './contexts/PreferencesContext.jsx'
import { ProgressProvider } from './contexts/ProgressContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferencesProvider>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </PreferencesProvider>
  </StrictMode>,
)
