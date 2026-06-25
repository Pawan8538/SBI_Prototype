import React from 'react';
import { X, User, Home, Vault, Banknote, LineChart, Umbrella, ShoppingCart, CreditCard, Bell, Phone } from 'lucide-react';

export default function SideMenu({ onClose }) {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Banknote, label: 'YONO Pay' },
    { icon: Vault, label: 'Deposits' },
    { icon: LineChart, label: 'Investments' },
    { icon: Banknote, label: 'Loans' },
    { icon: Bell, label: 'Service Request' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex">
      {/* Drawer */}
      <div className="w-[85%] bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 relative z-10">
        
        {/* Header Profile */}
        <div className="bg-gradient-to-r from-[#902462] to-[#3a0868] p-5 flex items-center gap-3 shrink-0 h-[80px]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400">
            <User size={24} />
          </div>
          <div className="text-white font-medium text-sm tracking-wide">Bhavya Chandra</div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto pb-4">
          {menuItems.map((item, index) => (
            <button key={index} className="w-full px-5 py-3.5 flex items-center justify-between border-b border-gray-100 active:bg-gray-50">
              <div className="flex items-center gap-4 text-gray-800">
                <item.icon size={20} className="text-[#a1688d]" strokeWidth={1.5} />
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
              <ChevronRightIcon />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-300 p-2 flex justify-between text-[10px] text-gray-600 shrink-0">
          <span>APM ID: E-Ch_Tran_1286</span>
          <span>Version : 1.23.57</span>
        </div>
      </div>
      
      {/* Overlay backdrop */}
      <div className="flex-1 bg-black/50" onClick={onClose}>
        {/* hamburger menu background mock */}
        <div className="bg-gray-200 h-12 w-full flex items-center justify-center opacity-0">
           <X size={24} className="text-black" />
        </div>
      </div>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );
}
