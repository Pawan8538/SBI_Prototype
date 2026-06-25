import React from 'react';
import YONOHeader from '../layout/YONOHeader';
import { Search, Wallet, IndianRupee, Landmark, PiggyBank, TrendingUp, HandCoins } from 'lucide-react';

const icons = {
  accounts: () => <Wallet className="w-7 h-7 text-yono-light" strokeWidth={1.5} />,
  yonoPay: () => <IndianRupee className="w-7 h-7 text-yono-light" strokeWidth={1.5} />,
  yonoCash: () => <Landmark className="w-7 h-7 text-yono-light" strokeWidth={1.5} />,
  deposits: () => <PiggyBank className="w-7 h-7 text-yono-light" strokeWidth={1.5} />,
  investments: () => <TrendingUp className="w-7 h-7 text-yono-light" strokeWidth={1.5} />,
  loans: () => <HandCoins className="w-7 h-7 text-yono-light" strokeWidth={1.5} />
};

function Tile({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white border-b border-r border-purple-100 active:bg-purple-50"
    >
      <div className="mb-2"><Icon /></div>
      <span className="text-xs text-gray-700 font-medium text-center">{label}</span>
    </button>
  );
}

export default function HomeScreen({ onMenuClick, onNavigate }) {
  return (
    <div className="bg-white flex flex-col h-full">
      <YONOHeader onMenuClick={onMenuClick} />

      {/* Search bar */}
      <div className="bg-gradient-to-r from-purple-900 to-yono-purple px-4 py-4 shrink-0">
        <div className="flex items-center border-b border-purple-400 pb-1">
          <input
            type="text"
            placeholder="I'm looking for"
            className="w-full bg-transparent text-white placeholder-purple-200 outline-none text-sm"
          />
          <Search size={20} className="text-white" />
        </div>
      </div>

      {/* View Balance */}
      <div className="border-b-4 border-purple-100">
        <button className="w-full py-4 text-yono-purple font-semibold text-lg text-center bg-white active:bg-gray-50">
          View Balance
        </button>
      </div>

      {/* Tile grid */}
      <div className="border-b border-purple-100 flex-1">
        <div className="grid grid-cols-3">
          <Tile icon={icons.accounts}    label="Accounts"    onClick={() => onNavigate('accounts')} />
          <Tile icon={icons.yonoPay}     label="YONO Pay"    onClick={() => onNavigate('pay')} />
          <Tile icon={icons.yonoCash}    label="YONO Cash"   onClick={() => onNavigate('cash')} />
          <Tile icon={icons.deposits}    label="Deposits"    onClick={() => onNavigate('deposits')} />
          <Tile icon={icons.investments} label="Investments" onClick={() => onNavigate('investments')} />
          <Tile icon={icons.loans}       label="Loans"       onClick={() => onNavigate('loans')} />
        </div>
      </div>
    </div>
  );
}
