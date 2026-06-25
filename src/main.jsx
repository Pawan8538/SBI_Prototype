import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode removed: it causes effects to run twice (mount→unmount→remount)
// which breaks the AgentLogPanel's setInterval log streaming logic.
createRoot(document.getElementById('root')).render(<App />)
