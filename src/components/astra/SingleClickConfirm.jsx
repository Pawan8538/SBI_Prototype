import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

/**
 * SingleClickConfirm — full-screen overlay modal.
 * Rendered in the MobileFrame overlay layer (NOT inside scroll area).
 */
export default function SingleClickConfirm({ show, onExecute, onClose }) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-auto bg-black/60 flex items-end justify-center">
      <div
        className="bg-white w-full rounded-t-3xl p-6"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to   { transform: translateY(0); }
          }
        `}</style>

        <div className="flex justify-between items-start mb-5">
          <h2 className="text-lg font-bold text-gray-800">Confirm Action</h2>
          <button onClick={onClose} className="text-gray-400 bg-gray-100 rounded-full p-1.5 active:bg-gray-200">
            <X size={16} />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Action</span>
            <span className="text-sm font-semibold text-gray-800">Transfer ₹5,000 → PPF</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Source Account</span>
            <span className="text-sm font-semibold text-gray-800">SB A/c XXXX8202</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">Validation</span>
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 size={14} />
              <span className="text-xs font-semibold">Pydantic Schema ✓</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-blue-800 bg-blue-50 border border-blue-100 p-2 rounded-lg mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
          </svg>
          <span>Sovereign Product · Government of India Backed</span>
        </div>

        <button
          onClick={onExecute}
          className="w-full bg-gradient-to-r from-[#902462] to-[#3a0868] text-white font-bold py-4 rounded-xl active:opacity-90 flex items-center justify-center gap-2"
        >
          Confirm &amp; Execute
        </button>
      </div>
    </div>
  );
}
