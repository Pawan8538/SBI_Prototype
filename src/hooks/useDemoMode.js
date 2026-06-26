import { useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { ACTIONS } from '../store/appReducer';

export function useDemoMode() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (!state.demoRunning) return;

    const go = (fn, delay) => setTimeout(fn, delay);
    const timeouts = [];

    // t=0s: Reset to splash
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SET_SCREEN, payload: 'splash' });
      dispatch({ type: ACTIONS.CLEAR_LOGS });
      dispatch({ type: ACTIONS.SET_HEALTH_SCORE, payload: 0 });
      dispatch({ type: ACTIONS.SET_ALERT_COUNT, payload: 1 });
      dispatch({ type: ACTIONS.HIDE_INTERCEPT });
      dispatch({ type: ACTIONS.SET_ALLOCATION_COMPLETE, payload: false });
      dispatch({ type: ACTIONS.SET_RIGHT_TAB, payload: 'engine' });
    }, 0));

    // t=2s: Navigate to home (triggers HOME_LOGS via useScreenTransition)
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SET_SCREEN, payload: 'home' });
    }, 2000));

    // t=4s: Animate health score 0 → 67
    timeouts.push(go(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        dispatch({ type: ACTIONS.SET_HEALTH_SCORE, payload: Math.min(current, 67) });
        if (current >= 67) clearInterval(interval);
      }, 30);
    }, 4000));

    // t=15s: Show intercept card (logs will have streamed by now)
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SHOW_INTERCEPT, payload: 'home' });
    }, 15000));

    // t=20s: Auto-click "Do it in 1 Click" → open modal
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.HIDE_INTERCEPT });
      dispatch({ type: ACTIONS.OPEN_MODAL });
    }, 20000));

    // t=23s: Auto-click Confirm → start validation
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SET_MODAL_STEP, payload: 'validating' });
    }, 23000));

    // t=27s: Safety timeout — ensure success
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SET_MODAL_STEP, payload: 'success' });
      dispatch({ type: ACTIONS.SET_ALLOCATION_COMPLETE, payload: true });
      dispatch({ type: ACTIONS.SET_ALERT_COUNT, payload: 0 });
      dispatch({ type: ACTIONS.SET_HEALTH_SCORE, payload: 74 });
    }, 27000));

    // t=31s: Close modal
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.CLOSE_MODAL });
    }, 31000));

    // t=33s: Navigate to Deposits
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.CLEAR_LOGS });
      dispatch({ type: ACTIONS.HIDE_INTERCEPT });
      dispatch({ type: ACTIONS.SET_SCREEN, payload: 'deposits' });
    }, 33000));

    // t=40s: Switch to Ask ASTRA tab
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SET_RIGHT_TAB, payload: 'askastra' });
    }, 40000));

    // t=43s: Auto-type and submit a question
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SET_AUTO_QUERY, payload: "What should I do with my EMI savings?" });
    }, 43000));

    // t=55s: Switch to Architecture tab
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.SET_RIGHT_TAB, payload: 'architecture' });
    }, 55000));

    // t=65s: Demo complete
    timeouts.push(go(() => {
      dispatch({ type: ACTIONS.STOP_DEMO });
    }, 65000));

    return () => timeouts.forEach(clearTimeout);
  }, [state.demoRunning]);
}
