import React from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';
import { ArrowLeft, PiggyBank, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const deposits = [
  {
    id: 'SBI-FD-2847',
    type: 'Fixed Deposit',
    amount: '₹50,000',
    rate: '6.8% p.a.',
    maturity: 'Jul 14, 2026',
    daysLeft: 18,
    urgent: true,
  },
  {
    id: 'SBI-FD-1923',
    type: 'Fixed Deposit',
    amount: '₹25,000',
    rate: '6.5% p.a.',
    maturity: 'Dec 20, 2026',
    daysLeft: 177,
    urgent: false,
  },
  {
    id: 'SBI-RD-0441',
    type: 'Recurring Deposit',
    amount: '₹2,000/mo',
    rate: '6.2% p.a.',
    maturity: 'Mar 2027',
    daysLeft: null,
    urgent: false,
  },
];

export default function DepositsScreen() {
  const { dispatch } = useApp();

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-yono-purple px-4 py-3 flex items-center gap-3 shrink-0">
        <button onClick={() => dispatch({ type: ACTIONS.SET_SCREEN, payload: 'home' })} className="text-white p-1">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-white font-semibold text-sm">My Deposits</h2>
      </div>

      {/* Summary card */}
      <div className="bg-purple-50 border-b border-purple-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank size={18} className="text-purple-600" />
            <span className="text-xs font-semibold text-purple-800">Total Deposits</span>
          </div>
          <span className="text-sm font-bold text-gray-800">₹77,000</span>
        </div>
        <p className="text-xs text-purple-500 mt-1">3 active deposits · 1 maturing soon</p>
      </div>

      {/* Deposit cards */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-3">
        {deposits.map(dep => (
          <div
            key={dep.id}
            className={`p-3 rounded-xl border-2 ${
              dep.urgent
                ? 'border-amber-300 bg-amber-50'
                : 'border-gray-100 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono">#{dep.id}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{dep.type}</p>
              </div>
              <span className="text-sm font-bold text-gray-800">{dep.amount}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-500">Rate: {dep.rate}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">Maturity: {dep.maturity}</span>
            </div>
            {dep.urgent && (
              <div className="flex items-center gap-1.5 mt-2 bg-amber-100 border border-amber-200 rounded-lg px-2 py-1">
                <AlertTriangle size={12} className="text-amber-600" />
                <span className="text-[10px] font-semibold text-amber-700">
                  Matures in {dep.daysLeft} days — ASTRA Alert
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
