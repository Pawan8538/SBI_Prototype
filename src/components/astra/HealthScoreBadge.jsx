import React from 'react';

/**
 * HealthScoreBadge — CSS conic-gradient circular progress ring
 * Pure CSS, no external package needed.
 */
export default function HealthScoreBadge({ score }) {
  const color = score >= 71 ? '#10B981' : score >= 41 ? '#F59E0B' : '#EF4444';
  const pct = (score / 100) * 360;
  const statusText = score >= 71
    ? '✓ Good Standing'
    : score >= 41
    ? '⚠ Moderate Risk — 1 action suggested'
    : '🔴 Action Required';

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm mx-3 mb-2">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: `conic-gradient(${color} ${pct}deg, #E5E7EB ${pct}deg)`,
        }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800">
          {score}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-700">Financial Health Score</p>
        <p className={`text-xs mt-0.5 ${
          score >= 71 ? 'text-green-600' : score >= 41 ? 'text-amber-600' : 'text-red-600'
        }`}>
          {statusText}
        </p>
      </div>
    </div>
  );
}
