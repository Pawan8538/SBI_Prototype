import React from 'react';
import { ArrowLeft, PieChart, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Food', value: 12500, color: '#f43f5e' },
  { name: 'Shopping', value: 8300, color: '#a855f7' },
  { name: 'EMI/Loans', value: 25000, color: '#3b82f6' },
  { name: 'Utilities', value: 4200, color: '#10b981' },
  { name: 'Travel', value: 3500, color: '#f59e0b' },
];

export default function BudgetCoachScreen({ onBack }) {
  const totalSpent = data.reduce((acc, item) => acc + item.value, 0);
  const budgetLimit = 65000;
  const percentage = Math.round((totalSpent / budgetLimit) * 100);

  return (
    <div className="bg-gray-100 flex flex-col h-full relative">
      <div className="bg-[#00529b] text-white px-4 py-3 flex items-center shadow-md shrink-0">
        <button onClick={onBack} className="mr-3 p-1 rounded hover:bg-white/10 active:bg-white/20 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold text-sm">Smart Budget Coach</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pb-20 scrollbar-hide">
        
        {/* Budget Utilization Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Monthly Budget (Nov)</p>
          <div className="flex items-end justify-center gap-1 mb-2">
            <span className="text-2xl font-bold text-gray-800">₹{totalSpent.toLocaleString()}</span>
            <span className="text-sm text-gray-400 mb-0.5">/ ₹{budgetLimit.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div 
              className={`h-2 rounded-full ${percentage > 80 ? 'bg-red-500' : 'bg-[#00b5cc]'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-500 text-right">{percentage}% Utilized</p>
        </div>

        {/* Expense Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Expense Breakdown</h2>
          <div className="h-40 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={data}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${value}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </RechartsPie>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <PieChart size={24} className="text-gray-300 mb-1" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center text-[10px] text-gray-600">
                <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 ml-1">AI Personalized Coaching</h3>

        {/* AI Coaching Cards */}
        <div className="bg-red-50 rounded-xl p-3 border border-red-100 flex gap-3 items-start mb-3 shadow-sm">
          <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0 mt-0.5">
            <AlertTriangle size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-800 leading-relaxed">
              <span className="font-bold text-red-700">Warning: </span>
              You spent 25% more on restaurants this month. You are approaching your food budget limit.
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-3 border border-green-100 flex gap-3 items-start mb-3 shadow-sm">
          <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0 mt-0.5">
            <ShieldCheck size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-800 leading-relaxed">
              <span className="font-bold text-green-700">Good Job: </span>
              Your EMI and Utility payments were made on time. Your expense discipline score is <span className="font-bold">88/100</span>.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 flex gap-3 items-start mb-4 shadow-sm">
          <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0 mt-0.5">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-800 leading-relaxed">
              <span className="font-bold text-amber-700">Savings Tip: </span>
              You can save ₹3,200 this month by reducing shopping expenses to match your 3-month average.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
