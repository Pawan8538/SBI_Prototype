import React from 'react';
import { LOG_SEQUENCE } from '../../engine/logMessages';

/**
 * AgentLogPanel — STATELESS, zero timers, zero scrollTop.
 *
 * Uses CSS animation-delay to stagger each log entry appearance.
 * Container does NOT use column-reverse — instead, it starts scrolled
 * to the bottom via a CSS trick: the inner div uses padding-top that
 * equals the gap between content and container, so content starts visible at top,
 * and as items appear they push the view down naturally.
 *
 * Simpler: just render oldest-first, let them fill from the top.
 * The container is tall enough to show ~8 items at once. The first 8 are
 * immediately visible, the rest require scrolling — which is correct behaviour.
 */
export default function AgentLogPanel() {
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

      {/*
        Scroll container — renders all entries, oldest at top, newest at bottom.
        Entries fade in via CSS animation-delay so they appear to "stream" in.
        No JS needed. No scrollTop. Logs L1-L5 are visible immediately at top.
      */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide bg-gray-950 px-3 py-2">
        <div className="font-mono text-[11px] space-y-1">
          {LOG_SEQUENCE.map((log, i) => {
            const totalSec = i * 0.8;
            const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
            const ss = String(Math.floor(totalSec % 60)).padStart(2, '0');
            return (
              <div
                key={i}
                className="flex gap-2 leading-5"
                style={{
                  opacity: 0,
                  animation: `logFadeIn 0.35s ease-out ${(i * 0.8).toFixed(2)}s forwards`,
                }}
              >
                <span className="text-gray-600 shrink-0 tabular-nums">{mm}:{ss}</span>
                <span className={`shrink-0 ${log.color}`} style={{ minWidth: '84px' }}>
                  {log.layer}&nbsp;{log.label}
                </span>
                <span className="text-gray-600 shrink-0">—</span>
                <span className="text-gray-300 break-words min-w-0">{log.message}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
