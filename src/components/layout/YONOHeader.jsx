import React from 'react';
import { Menu, Phone, Power } from 'lucide-react';

export default function YONOHeader({ onMenuClick }) {
  return (
    <div className="bg-yono-purple text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm relative">
      <button onClick={onMenuClick} className="p-1 active:bg-purple-800 rounded-md z-10">
        <Menu size={24} />
      </button>
      
      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="font-bold text-xl flex items-center tracking-tight">
          <span>yono</span>
          <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
          <span>SBI</span>
        </div>
      </div>

      <div className="flex items-center gap-4 z-10">
        <Phone size={20} className="opacity-90" />
        <Power size={20} className="opacity-90" />
      </div>
    </div>
  );
}
