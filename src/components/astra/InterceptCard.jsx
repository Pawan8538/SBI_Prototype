import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';
import { INTERCEPT_CONTENT } from '../../data/screenIntercepts';
import { Zap } from 'lucide-react';

/**
 * InterceptCard — context-aware slide-up card.
 * Reads content from INTERCEPT_CONTENT based on state.interceptType.
 * Rendered in the MobileFrame overlay layer.
 */
export default function InterceptCard() {
  const { state, dispatch } = useApp();
  const [pulsing, setPulsing] = useState(false);
  const content = INTERCEPT_CONTENT[state.interceptType];

  // Pulse animation for 3 seconds after appearing
  useEffect(() => {
    if (state.interceptVisible) {
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 3000);
      return () => clearTimeout(t);
    }
  }, [state.interceptVisible]);

  if (!content) return null;

  const severityColors = {
    high: 'border-red-400 bg-gradient-to-b from-red-50 to-white',
    medium: 'border-amber-400 bg-gradient-to-b from-amber-50 to-white',
    positive: 'border-green-400 bg-gradient-to-b from-green-50 to-white',
  };

  return (
    <div
      className="absolute bottom-14 right-3 left-3 pointer-events-auto transition-all duration-500 ease-out"
      style={{
        transform: state.interceptVisible ? 'translateY(0)' : 'translateY(120%)',
        opacity: state.interceptVisible ? 1 : 0,
        pointerEvents: state.interceptVisible ? 'auto' : 'none',
      }}
    >
      <div className={`rounded-2xl border-2 shadow-2xl overflow-hidden ${severityColors[content.severity]} ${
        pulsing ? 'ring-2 ring-amber-400 ring-opacity-75 animate-pulse' : ''
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-purple-600 font-semibold">{content.badge}</span>
            <button
              onClick={() => dispatch({ type: ACTIONS.HIDE_INTERCEPT })}
              className="text-gray-400 text-xs font-medium px-2 py-0.5 rounded hover:bg-gray-100"
            >
              Later
            </button>
          </div>

          <h3 className="font-bold text-gray-900 text-sm">{content.title}</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{content.body}</p>

          <button
            onClick={() => {
              dispatch({ type: ACTIONS.OPEN_MODAL });
              dispatch({ type: ACTIONS.HIDE_INTERCEPT });
            }}
            className="w-full mt-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-300/50 active:opacity-90"
          >
            <Zap size={13} className="fill-white" />
            {content.action}
          </button>
        </div>
      </div>
    </div>
  );
}
