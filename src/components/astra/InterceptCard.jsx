import React from 'react';
import { Zap } from 'lucide-react';

/**
 * InterceptCard
 * Rendered in the MobileFrame overlay layer (NOT inside the scroll area).
 * pointer-events-auto re-enabled here so buttons are clickable.
 */
export default function InterceptCard({ show, onConfirm, onDismiss }) {
  return (
    <div
      className="absolute bottom-20 right-4 left-4 pointer-events-auto transition-all duration-500 ease-out"
      style={{
        transform: show ? 'translateX(0)' : 'translateX(110%)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-500 overflow-hidden relative">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
              <Zap size={15} className="fill-purple-700" />
              <span>ASTRA Alert</span>
            </div>
            <button
              onClick={onDismiss}
              className="text-gray-400 text-xs font-medium px-2 py-1 rounded hover:bg-gray-100"
            >
              Later
            </button>
          </div>

          <div className="bg-red-50 text-red-800 p-3 rounded-lg mb-3 border border-red-100">
            <p className="text-sm font-semibold">Balance dip in 42 days</p>
            <p className="text-xs opacity-80 mt-0.5">School fees: ₹8,500</p>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-0.5">Recommended Action</p>
            <p className="text-sm text-gray-800 font-medium">Auto-allocate ₹5,000 to PPF now</p>
          </div>

          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-300/50 active:opacity-90"
          >
            <Zap size={15} className="fill-white" />
            Do it in 1 Click
          </button>
        </div>
      </div>
    </div>
  );
}
