import React, { useState } from 'react';

/**
 * LayerBadge — small architecture layer tag with hover tooltip.
 * Placed at the top of each right-panel section.
 */
export default function LayerBadge({ layer, description }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className="text-[10px] font-mono bg-purple-900/80 text-purple-300 border border-purple-700 px-2 py-0.5 rounded-full hover:bg-purple-800 transition-colors"
      >
        {layer}
      </button>
      {showTip && (
        <div className="absolute left-0 top-6 z-50 bg-gray-800 text-white text-xs rounded-lg p-2.5 w-60 border border-gray-600 shadow-xl leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
}
