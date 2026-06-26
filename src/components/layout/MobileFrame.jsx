import React from 'react';

/**
 * MobileFrame
 * 
 * Layout:
 *   [Root: relative, overflow-hidden]
 *     ├── StatusBar (shrink-0)
 *     ├── ScrollContent (flex-1, overflow-y-auto) ← children go here
 *     └── OverlayLayer (absolute inset-0, pointer-events-none) ← overlay prop goes here
 * 
 * The overlay layer sits on top of the scroll content but is NOT inside it,
 * so overlays can never affect scrollHeight or trigger auto-scroll.
 */
export default function MobileFrame({ children, overlay }) {
  return (
    <div
      className="relative shrink-0 bg-white rounded-[36px] shadow-2xl border-[8px] border-gray-900 flex flex-col overflow-hidden w-full h-full"
    >
      {/* ── Status Bar ── */}
      <div className="w-full bg-white flex items-center justify-between px-5 text-[11px] text-gray-800 shrink-0 py-[6px]">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1.5">
          <span>▲▼</span>
          <span>4G</span>
          <span>47%</span>
          <span>🔋</span>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div
        className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-yono-bg scrollbar-hide"
        style={{ overscrollBehavior: 'contain' }}
      >
        {children}
      </div>

      {/* ── Overlay Layer (absolute, above content, NOT inside scroll area) ── */}
      {overlay && (
        <div className="absolute inset-0 top-8 pointer-events-none z-50">
          {/* pointer-events-auto re-enabled on each child via the overlay components themselves */}
          <div className="relative w-full h-full pointer-events-none">
            {overlay}
          </div>
        </div>
      )}
    </div>
  );
}
