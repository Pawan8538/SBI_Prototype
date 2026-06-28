export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_SCREEN: 'SET_SCREEN',
  SET_RIGHT_TAB: 'SET_RIGHT_TAB',
  TOGGLE_MENU: 'TOGGLE_MENU',
  CLOSE_MENU: 'CLOSE_MENU',
  SET_HEALTH_SCORE: 'SET_HEALTH_SCORE',
  SHOW_INTERCEPT: 'SHOW_INTERCEPT',
  HIDE_INTERCEPT: 'HIDE_INTERCEPT',
  OPEN_MODAL: 'OPEN_MODAL',
  SET_MODAL_STEP: 'SET_MODAL_STEP',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SELECT_PRODUCT: 'SELECT_PRODUCT',
  ADD_LOG_LINES: 'ADD_LOG_LINES',
  CLEAR_LOGS: 'CLEAR_LOGS',
  SET_SYNC_SECONDS: 'SET_SYNC_SECONDS',
  START_DEMO: 'START_DEMO',
  SET_DEMO_STEP: 'SET_DEMO_STEP',
  STOP_DEMO: 'STOP_DEMO',
  ADD_CHAT: 'ADD_CHAT',
  SET_GEMINI_LOADING: 'SET_GEMINI_LOADING',
  SET_ALLOCATION_COMPLETE: 'SET_ALLOCATION_COMPLETE',
  SET_ALERT_COUNT: 'SET_ALERT_COUNT',
  SET_HAS_STARTED: 'SET_HAS_STARTED',
  SET_AUTO_QUERY: 'SET_AUTO_QUERY',
  SET_ALLOCATED_AMOUNT: 'SET_ALLOCATED_AMOUNT',
  SET_LISTENING: 'SET_LISTENING',
  SET_VOICE_TRANSCRIPT: 'SET_VOICE_TRANSCRIPT',
  SET_VOICE_RESPONSE: 'SET_VOICE_RESPONSE',
  DEBIT_ACCOUNT: 'DEBIT_ACCOUNT',
};

export function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };

    case ACTIONS.SET_SCREEN:
      return { ...state, currentScreen: action.payload };

    case ACTIONS.SET_RIGHT_TAB:
      return { ...state, activeRightTab: action.payload };

    case ACTIONS.TOGGLE_MENU:
      return { ...state, sideMenuOpen: !state.sideMenuOpen };

    case ACTIONS.CLOSE_MENU:
      return { ...state, sideMenuOpen: false };

    case ACTIONS.SET_HEALTH_SCORE:
      return { ...state, healthScore: action.payload };

    case ACTIONS.SHOW_INTERCEPT:
      return {
        ...state,
        interceptVisible: true,
        interceptType: action.payload,
      };

    case ACTIONS.HIDE_INTERCEPT:
      return { ...state, interceptVisible: false };

    case ACTIONS.OPEN_MODAL:
      return { ...state, modalOpen: true, modalStep: 'products' };

    case ACTIONS.SET_MODAL_STEP:
      return { ...state, modalStep: action.payload };

    case ACTIONS.CLOSE_MODAL:
      return { ...state, modalOpen: false, modalStep: 'products' };

    case ACTIONS.SELECT_PRODUCT:
      return { ...state, selectedProduct: action.payload };

    case ACTIONS.ADD_LOG_LINES:
      return {
        ...state,
        logLines: [...state.logLines, ...action.payload],
        lastSyncSeconds: 0,
      };

    case ACTIONS.CLEAR_LOGS:
      return { ...state, logLines: [] };

    case ACTIONS.SET_SYNC_SECONDS:
      return { ...state, lastSyncSeconds: action.payload };

    case ACTIONS.START_DEMO:
      return { ...state, demoRunning: true, demoStep: 0 };

    case ACTIONS.SET_DEMO_STEP:
      return { ...state, demoStep: action.payload };

    case ACTIONS.STOP_DEMO:
      return { ...state, demoRunning: false, demoStep: 0 };

    case ACTIONS.ADD_CHAT:
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };

    case ACTIONS.SET_GEMINI_LOADING:
      return { ...state, geminiLoading: action.payload };

    case ACTIONS.SET_ALLOCATION_COMPLETE:
      return { ...state, allocationComplete: action.payload };

    case ACTIONS.SET_ALERT_COUNT:
      return { ...state, alertCount: action.payload };

    case ACTIONS.SET_HAS_STARTED:
      return { ...state, hasStarted: action.payload };

    case ACTIONS.SET_AUTO_QUERY:
      return { ...state, autoQuery: action.payload };

    case ACTIONS.SET_ALLOCATED_AMOUNT:
      return { ...state, allocatedAmount: action.payload };

    case ACTIONS.SET_LISTENING:
      return { ...state, isListening: action.payload };

    case ACTIONS.SET_VOICE_TRANSCRIPT:
      return { ...state, voiceTranscript: action.payload };

    case ACTIONS.SET_VOICE_RESPONSE:
      return { ...state, voiceResponse: action.payload };
      
    case 'DEBIT_ACCOUNT':
      return { ...state, accountBalance: state.accountBalance - action.payload };

    default:
      return state;
  }
}
