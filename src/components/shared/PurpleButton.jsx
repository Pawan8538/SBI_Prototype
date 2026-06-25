import React from 'react';

export default function PurpleButton({ children, onClick, className = '' }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full bg-gradient-to-r from-purple-600 to-yono-purple text-white py-3 rounded-full font-semibold shadow-md active:opacity-90 transition-opacity ${className}`}
    >
      {children}
    </button>
  );
}
