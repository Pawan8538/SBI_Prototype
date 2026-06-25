import React, { useState, useEffect } from 'react';
import MobileFrame from './components/layout/MobileFrame';
import SplashScreen from './components/yono/SplashScreen';
import HomeScreen from './components/yono/HomeScreen';
import SideMenu from './components/yono/SideMenu';
import YONOPayScreen from './components/yono/YONOPayScreen';
import TransactionSuccess from './components/yono/TransactionSuccess';

import InterceptCard from './components/astra/InterceptCard';
import ContextTerminal from './components/astra/ContextTerminal';
import SingleClickConfirm from './components/astra/SingleClickConfirm';
import AgentLogPanel from './components/astra/AgentLogPanel';
import TwinChart from './components/astra/TwinChart';
import OnboardingScreen from './components/astra/OnboardingScreen';
import ArchitectureScreen from './components/astra/ArchitectureScreen';
import ASTRAResponsePanel from './components/astra/ASTRAResponsePanel';

import { PROACTIVE_TRIGGERS } from './engine/useGeminiAPI';

// ── Bottom nav tab definitions ────────────────────────────────────────────
const TABS = [
  {
    id: 'demo',
    label: 'Live Engine',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    id: 'astra',
    label: 'Ask ASTRA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'arch',
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
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');

  // Mobile navigation
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [menuOpen, setMenuOpen] = useState(false);

  // Overlay state
  const [showIntercept, setShowIntercept] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Phase 5: proactive message triggered by screen navigation
  const [proactiveMessage, setProactiveMessage] = useState(null);

  // Intercept card timing on home screen
  useEffect(() => {
    if (currentScreen === 'home' && hasStarted) {
      const t = setTimeout(() => setShowIntercept(true), 4000);
      return () => clearTimeout(t);
    } else {
      setShowIntercept(false);
      setShowConfirm(false);
    }
  }, [currentScreen, hasStarted]);

  // Phase 5: proactive trigger on screen changes
  useEffect(() => {
    if (!hasStarted) return;
    const msg = PROACTIVE_TRIGGERS[currentScreen] ?? null;
    if (msg) {
      setProactiveMessage(msg);
      // Auto-switch to Ask ASTRA tab to surface the proactive message
      setActiveTab('astra');
    }
  }, [currentScreen, hasStarted]);

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    setMenuOpen(false);
  };

  const handleStartDemo = () => {
    setHasStarted(true);
    navigateTo('home');
  };

  const handleRestart = () => {
    setHasStarted(false);
    setActiveTab('demo');
    setProactiveMessage(null);
    navigateTo('splash');
  };

  // Phase 5: ContextTerminal submits → surface Ask ASTRA tab
  const handleTerminalSubmit = (query) => {
    setShowIntercept(true);
    setActiveTab('astra');
    // Pre-populate? No — ContextTerminal is a phone overlay UI only.
    // The full query input is in ASTRAResponsePanel on the right panel.
  };

  // Overlay content rendered outside the scroll area
  const overlay = currentScreen === 'home' && hasStarted ? (
    <>
      <InterceptCard
        show={showIntercept}
        onDismiss={() => setShowIntercept(false)}
        onConfirm={() => { setShowIntercept(false); setShowConfirm(true); }}
      />
      <ContextTerminal onSubmit={handleTerminalSubmit} />
      <SingleClickConfirm
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onExecute={() => {
          setShowConfirm(false);
          alert('ASTRA Action Executed — Rs.5,000 allocated to PPF');
        }}
      />
    </>
  ) : null;

  return (
    <div
      style={{ height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      className="w-screen bg-slate-100 font-sans"
    >
      {/* ── Top header bar ── */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-[#00529b] flex items-center justify-center">
              <span className="text-white font-bold text-[8px] tracking-wider">SBI</span>
            </div>
            <span className="font-bold text-[#00529b] text-sm">yono SBI</span>
          </div>
          <span className="text-gray-300 text-xs">|</span>
          <span className="font-semibold text-gray-700 text-sm">ASTRA</span>
          <span className="text-gray-400 text-xs ml-2">Hackathon Demo · Pillar 03</span>
        </div>
        <button
          onClick={handleRestart}
          className="text-xs font-semibold text-[#00529b] px-4 py-1.5 rounded border border-[#00529b] hover:bg-blue-50 active:bg-blue-100 transition-colors"
        >
          Restart Demo
        </button>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-h-0 flex items-center justify-start gap-10 px-10 py-5 max-w-[1400px] mx-auto w-full">

        {/* LEFT: Mobile phone */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="w-[300px] h-[600px]">
            <MobileFrame overlay={overlay}>
              {currentScreen === 'splash' && <SplashScreen onComplete={() => navigateTo('home')} autoNav={hasStarted} />}
              {currentScreen === 'home' && (
                <HomeScreen
                  onMenuClick={() => setMenuOpen(true)}
                  onNavigate={(tile) => {
                    if (tile === 'pay') navigateTo('pay');
                    else if (tile === 'deposits') navigateTo('deposits');
                    else if (tile === 'investments') navigateTo('investments');
                  }}
                />
              )}
              {currentScreen === 'pay' && (
                <YONOPayScreen onBack={() => navigateTo('home')} onPay={() => navigateTo('success')} />
              )}
              {currentScreen === 'success' && (
                <TransactionSuccess onDone={() => navigateTo('home')} />
              )}
              {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
            </MobileFrame>
          </div>
        </div>

        {/* RIGHT: ASTRA intelligence panel */}
        <div className="flex-1 h-full flex flex-col gap-4 min-w-0">

          {!hasStarted ? (
            <div className="flex-1 h-full">
              <OnboardingScreen onStart={handleStartDemo} />
            </div>
          ) : (
            <>
              {/* Panel header */}
              <div className="shrink-0 flex items-center gap-2.5 px-1">
                <div className="w-8 h-8 rounded-lg bg-[#00529b] flex items-center justify-center shadow">
                  <span className="text-white font-bold text-[10px] tracking-wider">ASTRA</span>
                </div>
                <div>
                  <h2 className="text-gray-800 font-bold text-sm leading-tight">ASTRA Intelligence Engine</h2>
                  <p className="text-gray-400 text-[11px]">Gemini 2.5 Flash · Powered by Google AI</p>
                </div>
              </div>

              {/* Tab content */}
              {activeTab === 'demo' && (
                <>
                  <div className="shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-4" style={{ height: '220px' }}>
                    <TwinChart />
                  </div>
                  <div className="flex-1 min-h-0 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <AgentLogPanel />
                  </div>
                </>
              )}

              {activeTab === 'astra' && (
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
                  <ASTRAResponsePanel
                    currentScreen={currentScreen}
                    proactiveMessage={proactiveMessage}
                    apiKey={import.meta.env.VITE_GEMINI_API_KEY}
                  />
                </div>
              )}

              {activeTab === 'arch' && (
                <div className="flex-1 min-h-0 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <ArchitectureScreen />
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* ── Bottom nav tabs (only visible after demo starts) ── */}
      {hasStarted && (
        <div className="shrink-0 bg-white border-t border-gray-200 flex justify-center gap-2 px-6 py-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-[#00529b] border border-blue-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-[#00529b]' : ''}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
