import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

/**
 * ContextTerminal — floating input bar at bottom of phone overlay.
 * Uses a bordered rectangular box (not pill/rounded-full) for reliable layout.
 */
export default function ContextTerminal({ onSubmit }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      onSubmit(e.target.value.trim());
      e.target.value = '';
    }
  };

  const handleClick = (e) => {
    const input = e.currentTarget.previousElementSibling;
    if (input && input.value.trim()) {
      onSubmit(input.value.trim());
      input.value = '';
    }
  };

  return (
    <div className="absolute bottom-3 left-3 right-3 pointer-events-auto">
      <div
        className="bg-white border border-gray-200 shadow-lg flex items-center rounded-xl overflow-hidden"
        style={{ minHeight: '44px' }}
      >
        {/* Icon */}
        <div className="pl-3 pr-2 flex items-center shrink-0">
          <Sparkles size={16} className="text-purple-500" />
        </div>

        {/* Input — min-w-0 prevents flex overflow */}
        <input
          type="text"
          placeholder="Ask ASTRA about your finances..."
          className="flex-1 min-w-0 text-xs py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
          onKeyDown={handleKey}
        />

        {/* Send button — fixed size, always inside the box */}
        <button
          className="shrink-0 m-1.5 w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center active:bg-purple-700"
          onPointerDown={(e) => {
            // Prevent the input from losing focus before we read value
            e.preventDefault();
            const input = e.currentTarget.closest('div').querySelector('input');
            if (input && input.value.trim()) {
              onSubmit(input.value.trim());
              input.value = '';
            }
          }}
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </div>
  );
}
