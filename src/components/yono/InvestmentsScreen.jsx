import React from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';
import { ArrowLeft, TrendingUp, Sparkles } from 'lucide-react';

const investments = [
  {
    name: 'SBI Bluechip Fund',
    type: 'Mutual Fund',
    invested: '₹14,200',
    current: '₹15,840',
    returns: '+11.5%',
    positive: true,
    empty: false,
  },
  {
    name: 'Sovereign Gold Bond',
    type: 'SGB',
    invested: null,
    current: null,
    returns: null,
    positive: null,
    empty: true,
  },
];

export default function InvestmentsScreen() {
  const { dispatch } = useApp();

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-yono-purple px-4 py-3 flex items-center gap-3 shrink-0">
        <button onClick={() => dispatch({ type: ACTIONS.SET_SCREEN, payload: 'home' })} className="text-white p-1">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-white font-semibold text-sm">My Investments</h2>
      </div>

      {/* Summary card */}
      <div className="bg-purple-50 border-b border-purple-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-600" />
            <span className="text-xs font-semibold text-purple-800">Portfolio Value</span>
          </div>
          <span className="text-sm font-bold text-gray-800">₹15,840</span>
        </div>
        <p className="text-xs text-green-600 font-medium mt-1">+₹1,640 (+11.5%) overall returns</p>
      </div>

      {/* Investment cards */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-3">
        {investments.map((inv, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl border-2 ${
              inv.empty
                ? 'border-dashed border-purple-300 bg-purple-50'
                : 'border-gray-100 bg-white'
            }`}
          >
            {!inv.empty ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{inv.name}</p>
                    <p className="text-xs text-gray-400">{inv.type}</p>
                  </div>
                  <span className={`text-sm font-bold ${inv.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {inv.returns}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <p className="text-[10px] text-gray-400">Invested</p>
                    <p className="text-xs font-semibold text-gray-700">{inv.invested}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Current</p>
                    <p className="text-xs font-semibold text-gray-700">{inv.current}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm font-semibold text-purple-700">{inv.name}</p>
                <p className="text-xs text-purple-400 mt-0.5">0 Units Held</p>
                <button
                  onClick={() => dispatch({ type: ACTIONS.SHOW_INTERCEPT, payload: 'investments' })}
                  className="mt-3 inline-flex items-center gap-1.5 bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  <Sparkles size={12} />
                  ASTRA Recommends SGB Series 2026-IV
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
