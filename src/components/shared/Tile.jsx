import React from 'react';

export default function Tile({ icon: Icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-purple-200 shadow-sm active:bg-purple-50 transition-colors"
    >
      <div className="text-purple-600 mb-2">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <span className="text-xs text-gray-800 text-center font-medium leading-tight">
        {label}
      </span>
    </button>
  );
}
