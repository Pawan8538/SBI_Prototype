// Central application state — single source of truth
// All components receive these via props or React Context

export const INITIAL_STATE = {
  // User
  user: null,                    // loaded from user.json
  healthScore: 0,                // animated from 0 → 67 on load
  healthScoreTarget: 67,

  // Navigation
  currentScreen: 'splash',       // splash | home | pay | success | deposits | investments | loans
  activeRightTab: 'engine',      // engine | askastra | architecture
  sideMenuOpen: false,

  // Intercept system
  interceptVisible: false,
  interceptType: null,           // 'home' | 'deposits' | 'investments' | 'loans'
  interceptCompleted: false,

  // Modal
  modalOpen: false,              // sovereign product modal
  modalStep: 'products',         // products | validating | success
  selectedProduct: 'PPF',        // PPF | SGB | SSY

  // Log panel
  logLines: [],                  // { id, timestamp, layer, color, message }
  lastSyncSeconds: 0,            // counts up, resets on new log batch

  // Demo mode
  demoRunning: false,
  demoStep: 0,

  // Ask ASTRA
  chatHistory: [],               // { role: 'user'|'astra', text, timestamp }
  geminiLoading: false,
  autoQuery: null,               // set by demo mode to auto-submit a question

  // Post-action state
  allocationComplete: false,     // true after 1-click confirm
  alertCount: 1,                 // shown in header, decrements after action

  // App started flag
  hasStarted: false,

  // Voice Assistant
  isListening: false,
  voiceTranscript: '',
  voiceResponse: '',
  
  // Unified Account Balance
  accountBalance: 45200,
};
