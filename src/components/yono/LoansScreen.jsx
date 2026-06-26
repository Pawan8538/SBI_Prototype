import React from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';
import { ArrowLeft, Home, Calendar, AlertTriangle } from 'lucide-react';

const loan = {
  type: 'Home Loan',
  bank: 'SBI',
  outstanding: '₹12,40,000',
  emi: '₹18,500',
  monthsLeft: 24,
  rate: '8.5% p.a.',
  nextEMI: 'Jul 5, 2026',
};

export default function LoansScreen() {
  const { dispatch } = useApp();
  const stableMonths = 19;
  const marginalMonths = 5;

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-yono-purple px-4 py-3 flex items-center gap-3 shrink-0">
        <button onClick={() => dispatch({ type: ACTIONS.SET_SCREEN, payload: 'home' })} className="text-white p-1">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-white font-semibold text-sm">My Loans</h2>
      </div>

      {/* Loan card */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-3">
        <div className="p-4 rounded-xl border-2 border-gray-100 bg-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Home size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{loan.type}</p>
                <p className="text-xs text-gray-400">{loan.bank}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">{loan.outstanding}</p>
              <p className="text-xs text-gray-400">Outstanding</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400">EMI</p>
              <p className="text-xs font-semibold text-gray-700">{loan.emi}/mo</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Rate</p>
              <p className="text-xs font-semibold text-gray-700">{loan.rate}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Remaining</p>
              <p className="text-xs font-semibold text-gray-700">{loan.monthsLeft} months</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
            <Calendar size={12} className="text-blue-500" />
            <span className="text-[10px] text-blue-700 font-medium">Next EMI: {loan.nextEMI}</span>
          </div>
        </div>

        {/* Stress Meter */}
        <div className="p-4 rounded-xl border-2 border-gray-100 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-amber-500" />
            <p className="text-xs font-semibold text-gray-700">EMI Stress Analysis</p>
          </div>

          {/* Segmented bar */}
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 flex-1 rounded-sm ${
                  i < stableMonths ? 'bg-green-400' : 'bg-amber-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <span className="text-green-600 font-medium">{stableMonths} months stable</span>
            <span className="text-amber-600 font-medium">{marginalMonths} months marginal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
