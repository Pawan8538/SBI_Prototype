import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './store/AppContext'

// StrictMode removed: it causes effects to run twice (mount→unmount→remount)
// which breaks the AgentLogPanel's setInterval log streaming logic.
createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
)
