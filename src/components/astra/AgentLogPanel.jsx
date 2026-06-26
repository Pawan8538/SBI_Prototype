import React, { useEffect, useRef } from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';

/**
 * AgentLogPanel — color-coded log lines from central state.
 * Auto-scrolls to bottom on new entries.
 * Tracks "last sync" counter.
 */
export default function AgentLogPanel() {
  const { state, dispatch } = useApp();
  const logEndRef = useRef(null);
  const syncIntervalRef = useRef(null);

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.logLines]);

  // Last sync counter — increments every second
  useEffect(() => {
    syncIntervalRef.current = setInterval(() => {
      dispatch({ type: ACTIONS.SET_SYNC_SECONDS, payload: state.lastSyncSeconds + 1 });
    }, 1000);
    return () => clearInterval(syncIntervalRef.current);
  }, [state.lastSyncSeconds]);

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* Static header */}
      <div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-100 shrink-0 bg-white">
        <span className="text-gray-500 text-[11px] font-mono font-semibold tracking-widest uppercase">
          ASTRA Engine Live
        </span>
        <span className="flex items-center gap-1.5 text-green-600 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          RUNNING
        </span>
      </div>

      {/* Log lines from central state — color-coded */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide bg-gray-950 px-3 py-2">
        <div className="font-mono text-[11px] space-y-1">
          {state.logLines.length === 0 && (
            <div className="text-gray-600 text-center py-8">
              Awaiting screen navigation to begin agent processing...
            </div>
          )}
          {state.logLines.map((line) => (
            <div
              key={line.id}
              className="flex gap-2 leading-5"
              style={{ animation: 'logFadeIn 0.35s ease-out forwards' }}
            >
              <span className="text-gray-600 shrink-0 tabular-nums">{line.timestamp}</span>
              <span className={`shrink-0 font-semibold ${line.color}`} style={{ minWidth: '72px' }}>
                [{line.layer}]
              </span>
              <span className="text-gray-300 break-words min-w-0">{line.message}</span>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
