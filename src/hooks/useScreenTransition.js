import { useEffect, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { ACTIONS } from '../store/appReducer';
import { HOME_LOGS, DEPOSITS_LOGS, INVESTMENTS_LOGS, LOANS_LOGS } from '../engine/logMessages';

const SCREEN_LOG_MAP = {
  home: HOME_LOGS,
  deposits: DEPOSITS_LOGS,
  investments: INVESTMENTS_LOGS,
  loans: LOANS_LOGS,
};

// Screens that show an intercept card (not pay/success)
const INTERCEPT_SCREENS = ['home', 'deposits', 'investments', 'loans'];

export function useScreenTransition() {
  const { state, dispatch } = useApp();
  const prevScreen = useRef(null);

  useEffect(() => {
    // Only run when screen actually changes and app has started
    if (!state.hasStarted) return;
    if (state.currentScreen === prevScreen.current) return;
    prevScreen.current = state.currentScreen;

    const logFactory = SCREEN_LOG_MAP[state.currentScreen];
    if (!logFactory) return;

    const logs = logFactory();
    const timeouts = [];

    // Stream log lines in with 600ms stagger
    logs.forEach((line, i) => {
      const t = setTimeout(() => {
        dispatch({ type: ACTIONS.ADD_LOG_LINES, payload: [line] });
      }, i * 600);
      timeouts.push(t);
    });

    // Show intercept card after logs are done (logs.length * 600 + 800ms)
    if (INTERCEPT_SCREENS.includes(state.currentScreen) && !state.allocationComplete) {
      const interceptDelay = logs.length * 600 + 800;
      const interceptTimeout = setTimeout(() => {
        dispatch({ type: ACTIONS.SHOW_INTERCEPT, payload: state.currentScreen });
      }, interceptDelay);
      timeouts.push(interceptTimeout);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [state.currentScreen, state.hasStarted]);
}
