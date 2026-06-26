import React, { useEffect } from 'react';
import { useApp } from './store/AppContext';
import { ACTIONS } from './store/appReducer';

import MobileFrame from './components/layout/MobileFrame';
import SplashScreen from './components/yono/SplashScreen';
import HomeScreen from './components/yono/HomeScreen';
import SideMenu from './components/yono/SideMenu';
import YONOPayScreen from './components/yono/YONOPayScreen';
import TransactionSuccess from './components/yono/TransactionSuccess';
import DepositsScreen from './components/yono/DepositsScreen';
import InvestmentsScreen from './components/yono/InvestmentsScreen';
import LoansScreen from './components/yono/LoansScreen';

import InterceptCard from './components/astra/InterceptCard';
import ContextTerminal from './components/astra/ContextTerminal';
import SovereignModal from './components/astra/SovereignModal';
import AgentLogPanel from './components/astra/AgentLogPanel';
import TwinChart from './components/astra/TwinChart';
import OnboardingScreen from './components/astra/OnboardingScreen';
import ArchitectureScreen from './components/astra/ArchitectureScreen';
import ASTRAResponsePanel from './components/astra/ASTRAResponsePanel';
import LayerBadge from './components/shared/LayerBadge';

import { useScreenTransition } from './hooks/useScreenTransition';
import { useDemoMode } from './hooks/useDemoMode';

import userData from './data/user.json';

// ── Bottom nav tab definitions ────────────────────────────────────────────
const TABS = [
  {
    id: 'engine',
    label: 'Live Engine',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    id: 'askastra',
    label: 'Ask ASTRA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="3"/>
        <circle cx="3" cy="6" r="2"/><circle cx="21" cy="6" r="2"/>
        <circle cx="3" cy="18" r="2"/><circle cx="21" cy="18" r="2"/>
        <path d="M5 6.5l5.5 4.5M13 13l5.5 4.5M5 17.5l5.5-4.5M13 11 18.5 6.5"/>
      </svg>
    ),
  },
];

function App() {
  const { state, dispatch } = useApp();

  // Load user data on mount
  useEffect(() => {
    dispatch({ type: ACTIONS.SET_USER, payload: userData });
  }, []);

  // Wire the screen transition hook (log streaming + intercept cards)
  useScreenTransition();

  // Wire the demo mode auto-play hook
  useDemoMode();

  const navigateTo = (screen) => {
    dispatch({ type: ACTIONS.CLEAR_LOGS });
    dispatch({ type: ACTIONS.HIDE_INTERCEPT });
    dispatch({ type: ACTIONS.SET_SCREEN, payload: screen });
    dispatch({ type: ACTIONS.CLOSE_MENU });
  };

  const handleStartDemo = () => {
    dispatch({ type: ACTIONS.SET_HAS_STARTED, payload: true });
    navigateTo('home');
  };

  const handleRestart = () => {
    dispatch({ type: ACTIONS.SET_HAS_STARTED, payload: false });
    dispatch({ type: ACTIONS.SET_RIGHT_TAB, payload: 'engine' });
    dispatch({ type: ACTIONS.SET_ALLOCATION_COMPLETE, payload: false });
    dispatch({ type: ACTIONS.SET_ALERT_COUNT, payload: 1 });
    dispatch({ type: ACTIONS.SET_HEALTH_SCORE, payload: 0 });
    dispatch({ type: ACTIONS.CLEAR_LOGS });
    dispatch({ type: ACTIONS.HIDE_INTERCEPT });
    dispatch({ type: ACTIONS.CLOSE_MODAL });
    dispatch({ type: ACTIONS.STOP_DEMO });
    dispatch({ type: ACTIONS.SET_SCREEN, payload: 'splash' });
  };

  // Context Terminal submits → surface Ask ASTRA tab and set query
  const handleTerminalSubmit = (query) => {
    dispatch({ type: ACTIONS.SET_RIGHT_TAB, payload: 'askastra' });
    if (query) {
      dispatch({ type: ACTIONS.SET_AUTO_QUERY, payload: query });
    }
  };

  // Determine if intercept should show
  const showIntercept = state.interceptVisible && state.hasStarted;

  // Screens that support the intercept + context terminal overlay
  const interceptScreens = ['home', 'deposits', 'investments', 'loans'];
  const showOverlay = interceptScreens.includes(state.currentScreen) && state.hasStarted;

  // Overlay content rendered outside the scroll area
  const overlay = showOverlay ? (
    <>
      <InterceptCard />
      <ContextTerminal onSubmit={handleTerminalSubmit} />
    </>
  ) : null;

  // Screen router
  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => navigateTo('home')} autoNav={state.hasStarted} />;
      case 'home':
        return (
          <HomeScreen
            onMenuClick={() => dispatch({ type: ACTIONS.TOGGLE_MENU })}
            onNavigate={(tile) => {
              if (tile === 'pay') navigateTo('pay');
              else if (tile === 'deposits') navigateTo('deposits');
              else if (tile === 'investments') navigateTo('investments');
              else if (tile === 'loans') navigateTo('loans');
            }}
          />
        );
      case 'pay':
        return <YONOPayScreen onBack={() => navigateTo('home')} onPay={() => navigateTo('success')} />;
      case 'success':
        return <TransactionSuccess onDone={() => navigateTo('home')} />;
      case 'deposits':
        return <DepositsScreen />;
      case 'investments':
        return <InvestmentsScreen />;
      case 'loans':
        return <LoansScreen />;
      default:
        return <HomeScreen onMenuClick={() => dispatch({ type: ACTIONS.TOGGLE_MENU })} onNavigate={() => {}} />;
    }
  };

  return (
    <div
      style={{ height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      className="w-screen bg-slate-100 font-sans"
    >
      {/* ── Top header bar ── */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-pink-600 to-purple-800 bg-clip-text text-transparent mr-1.5">yono</span>
            <div className="w-[18px] h-[18px] rounded-full bg-[#00b5cc] flex flex-col items-center justify-center relative shadow-sm mr-1">
              <div className="w-[6px] h-[6px] rounded-full bg-white mb-[1px]"></div>
              <div className="w-[2px] h-[5px] bg-white absolute bottom-[2px]"></div>
            </div>
            <span className="font-bold text-lg tracking-tight text-[#00529b]">SBI</span>
          </div>
          <span className="text-gray-300 text-xs">|</span>
          <span className="font-bold text-purple-700 text-sm">ASTRA</span>
        </div>

        {/* Center: User context */}
        {state.hasStarted && (
          <div className="text-center hidden md:block">
            <p className="text-xs text-gray-500">
              User: <span className="font-semibold text-gray-700">Bhavya Chandra</span>
              {' · '}Score: <span className="font-semibold text-purple-700">{state.healthScore}/100</span>
              {' · '}
              {state.alertCount > 0 ? (
                <span className="text-amber-500 font-semibold animate-pulse">⚠ {state.alertCount} Alert Active</span>
              ) : (
                <span className="text-green-600 font-semibold">✓ No Active Alerts</span>
              )}
            </p>
          </div>
        )}

        {/* Right: Controls */}
        <div className="flex items-center gap-2 pr-4">
          {state.hasStarted && (
            <button
              onClick={() => dispatch({ type: ACTIONS.START_DEMO })}
              disabled={state.demoRunning}
              className="bg-purple-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg disabled:opacity-50 hover:bg-purple-800 transition-colors"
            >
              {state.demoRunning ? '⏳ Demo Running...' : '▶ Run Full Demo'}
            </button>
          )}
          <button
            onClick={handleRestart}
            className="text-xs font-semibold text-[#00529b] px-4 py-1.5 rounded border border-[#00529b] hover:bg-blue-50 active:bg-blue-100 transition-colors"
          >
            Restart
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-h-0 flex items-center justify-start gap-10 px-10 py-5 max-w-[1400px] mx-auto w-full">

        {/* LEFT: Mobile phone */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="w-[300px] h-[600px]">
            <MobileFrame overlay={overlay}>
              {renderScreen()}
              {state.sideMenuOpen && (
                <SideMenu onClose={() => dispatch({ type: ACTIONS.CLOSE_MENU })} />
              )}
            </MobileFrame>
          </div>
        </div>

        {/* RIGHT: ASTRA intelligence panel */}
        <div className="flex-1 h-full flex flex-col min-w-0 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          {!state.hasStarted ? (
            <div className="flex-1 h-full">
              <OnboardingScreen onStart={handleStartDemo} />
            </div>
          ) : (
            <>
              {/* Panel header — integrated */}
              <div className="shrink-0 bg-gray-50 p-4 border-b border-gray-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-700 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-sm">A</div>
                    <div className="min-w-0">
                      <p className="text-gray-900 font-bold text-sm truncate">ASTRA INTERCEPT OS <span className="text-purple-600 font-normal text-xs ml-1">v1.0.0</span></p>
                      <p className="text-gray-500 text-[11px] truncate">Bhavya Chandra · XXXXXXXX8202</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="flex items-center justify-end gap-1.5 text-green-600 text-xs font-mono font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      ACTIVE
                    </div>
                    <p className="text-gray-400 text-[10px] mt-0.5">Sync: {state.lastSyncSeconds}s</p>
                  </div>
                </div>
                {/* Stats */}
                <div className="flex gap-4 text-[10px] text-gray-600 font-mono">
                  <span className="whitespace-nowrap">Agents: <span className="text-green-600 font-bold">10/10</span> RUNNING</span>
                  <span className="whitespace-nowrap">Layers: <span className="text-purple-600 font-bold">L1–L10</span> ACTIVE</span>
                  <span className="whitespace-nowrap">
                    Alerts: <span className={`font-bold ${state.alertCount > 0 ? 'text-amber-600 animate-pulse' : 'text-green-600'}`}>
                      {state.alertCount > 0 ? `${state.alertCount} ACTIVE` : '✓ CLEAR'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Tab content */}
              <div className="flex-1 min-h-0 flex flex-col p-4 bg-white">
                {state.activeRightTab === 'engine' && (
                  <div className="flex-1 min-h-0 flex flex-col gap-4">
                    <div className="shrink-0 flex flex-col" style={{ height: '220px' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <LayerBadge layer="L5 · Digital Twin" description="Layer 5: Digital Financial Twin Memory — PostgreSQL JSONB Shadow State Repositories" />
                      </div>
                      <div className="flex-1 min-h-0 border border-gray-100 rounded-xl p-2 bg-gray-50/50">
                        <TwinChart />
                      </div>
                    </div>
                    <div className="flex-1 min-h-0 flex flex-col">
                      <div className="mb-2">
                        <LayerBadge layer="L6 · Swarm Core" description="Layer 6: Agentic AI Core Swarm — CrewAI Architecture with Local LLM Routing" />
                      </div>
                      <div className="flex-1 min-h-0 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <AgentLogPanel />
                      </div>
                    </div>
                  </div>
                )}

              {state.activeRightTab === 'askastra' && (
                <div className="flex-1 min-h-0 flex flex-col pt-1">
                  <ASTRAResponsePanel />
                </div>
              )}

              {state.activeRightTab === 'architecture' && (
                <div className="flex-1 min-h-0 bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col mt-2">
                  <ArchitectureScreen />
                </div>
              )}
              </div>
            </>
          )}

        </div>
      </div>

      {/* ── Bottom nav tabs (only visible after demo starts) ── */}
      {state.hasStarted && (
        <div className="shrink-0 bg-white border-t border-gray-200 flex justify-center gap-2 px-6 py-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: ACTIONS.SET_RIGHT_TAB, payload: tab.id })}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                state.activeRightTab === tab.id
                  ? 'bg-blue-50 text-[#00529b] border border-blue-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <span className={state.activeRightTab === tab.id ? 'text-[#00529b]' : ''}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Sovereign Modal (renders as full-screen overlay) ── */}
      <SovereignModal />
    </div>
  );
}

export default App;
