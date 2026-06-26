import React from 'react';
import { Menu, Phone, Power } from 'lucide-react';

export default function YONOHeader({ onMenuClick }) {
  return (
    <div className="bg-white text-purple-900 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm relative shrink-0">
      <button onClick={onMenuClick} className="p-1 active:bg-gray-100 rounded-md z-10 text-purple-900">
        <Menu size={24} />
      </button>
      
      {/* Centered Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pr-6">
        <div className="flex items-center">
          <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-pink-600 to-purple-800 bg-clip-text text-transparent mr-1.5">yono</span>
          
          {/* SBI Logo Icon */}
          <div className="w-[22px] h-[22px] rounded-full bg-[#00b5cc] flex flex-col items-center justify-center relative shadow-sm mr-1">
            <div className="w-[8px] h-[8px] rounded-full bg-white mb-[1px]"></div>
            <div className="w-[3px] h-[6px] bg-white absolute bottom-[3px]"></div>
          </div>
          
          <span className="font-bold text-2xl tracking-tight text-[#00529b]">SBI</span>
        </div>
      </div>

      <div className="flex items-center gap-4 z-10 text-purple-900">
        <Phone size={20} className="opacity-90" />
        <Power size={20} className="opacity-90" />
      </div>
    </div>
  );
}
