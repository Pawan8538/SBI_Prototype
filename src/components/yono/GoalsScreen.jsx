import React, { useState } from 'react';
import { ArrowLeft, Target, TrendingUp, Calendar, AlertCircle, PlusCircle, Check } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export default function GoalsScreen({ onBack }) {
  const { state } = useApp();
  const [step, setStep] = useState('list'); // 'list' | 'create' | 'dashboard'
  
  // State for new goal
  const [goalName, setGoalName] = useState('Buy a Laptop');
  const [targetAmount, setTargetAmount] = useState('80000');
  const [deadlineMonths, setDeadlineMonths] = useState('8');
  const [priority, setPriority] = useState('High');

  // Simulated active goal state
  const [activeGoal, setActiveGoal] = useState(null);

  const handleCreate = () => {
    setActiveGoal({
      name: goalName,
      target: Number(targetAmount),
      months: Number(deadlineMonths),
      priority,
      saved: 0,
      monthlyRequired: Math.round(Number(targetAmount) / Number(deadlineMonths))
    });
    setStep('dashboard');
  };

  if (step === 'list') {
    return (
      <div className="bg-gray-100 flex flex-col h-full relative">
        <div className="bg-[#00529b] text-white px-4 py-3 flex items-center shadow-md shrink-0">
          <button onClick={onBack} className="mr-3 p-1 rounded hover:bg-white/10 active:bg-white/20 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-semibold text-sm">Smart Goals</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
            <Target size={40} />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">No Active Goals</h2>
          <p className="text-sm text-gray-500 mb-6 px-4">Create a financial goal and let ASTRA AI help you achieve it faster.</p>
          <button 
            onClick={() => setStep('create')}
            className="bg-[#00a1d6] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-300 flex items-center gap-2 active:scale-95 transition-transform"
          >
            <PlusCircle size={20} />
            Create Goal
          </button>
        </div>
      </div>
    );
  }

  if (step === 'create') {
    return (
      <div className="bg-white flex flex-col h-full relative">
        <div className="bg-[#00529b] text-white px-4 py-3 flex items-center shadow-md shrink-0">
          <button onClick={() => setStep('list')} className="mr-3 p-1 rounded hover:bg-white/10 active:bg-white/20 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-semibold text-sm">Create Goal</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Goal Name</label>
              <input 
                type="text" 
                value={goalName}
                onChange={e => setGoalName(e.target.value)}
                className="w-full border-b-2 border-gray-200 py-2 outline-none focus:border-[#00a1d6] font-medium text-gray-800 transition-colors"
                placeholder="e.g. Buy a Bike"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Target Amount (₹)</label>
              <input 
                type="number" 
                value={targetAmount}
                onChange={e => setTargetAmount(e.target.value)}
                className="w-full border-b-2 border-gray-200 py-2 outline-none focus:border-[#00a1d6] font-medium text-gray-800 transition-colors"
                placeholder="80000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Timeline (Months)</label>
              <input 
                type="number" 
                value={deadlineMonths}
                onChange={e => setDeadlineMonths(e.target.value)}
                className="w-full border-b-2 border-gray-200 py-2 outline-none focus:border-[#00a1d6] font-medium text-gray-800 transition-colors"
                placeholder="8"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Priority</label>
              <div className="flex gap-3">
                {['Low', 'Medium', 'High'].map(p => (
                  <button 
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition-colors ${
                      priority === p ? 'bg-[#00529b] text-white border-[#00529b]' : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-[#00a1d6] to-[#00529b] text-white font-bold py-4 rounded-xl shadow-lg active:opacity-90 flex items-center justify-center gap-2"
          >
            Generate AI Plan
          </button>
        </div>
      </div>
    );
  }

  // DASHBOARD
  const percentage = Math.round((activeGoal.saved / activeGoal.target) * 100);
  const remaining = activeGoal.target - activeGoal.saved;
  
  // Calculate stroke dash based on 351.8 length
  const strokeOffset = 351.8 - (351.8 * (percentage / 100));

  return (
    <div className="bg-gray-100 flex flex-col h-full relative">
      <div className="bg-[#00529b] text-white px-4 py-3 flex items-center shadow-md shrink-0">
        <button onClick={() => setStep('list')} className="mr-3 p-1 rounded hover:bg-white/10 active:bg-white/20 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold text-sm">Goal Tracking</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pb-20 scrollbar-hide">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4 flex flex-col items-center">
          <div className="w-full flex justify-between items-start mb-2">
            <h2 className="text-gray-800 font-bold text-lg">{activeGoal.name}</h2>
            <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
              activeGoal.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {activeGoal.priority} Priority
            </span>
          </div>
          
          <p className="text-gray-500 text-xs mb-4">Target: ₹{activeGoal.target.toLocaleString()}</p>
          
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#f3f4f6" strokeWidth="12" />
              <circle 
                cx="64" 
                cy="64" 
                r="56" 
                fill="none" 
                stroke="url(#goalGrad)" 
                strokeWidth="12" 
                strokeDasharray="351.8" 
                strokeDashoffset={strokeOffset} 
                strokeLinecap="round" 
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
              <defs>
                <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <span className="text-xl font-bold text-gray-800">{percentage}%</span>
              <span className="block text-[9px] text-gray-500 uppercase tracking-wide">Achieved</span>
            </div>
          </div>
          
          <div className="flex w-full justify-between mt-5 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 mb-0.5">Saved</p>
              <p className="font-bold text-green-600">₹{activeGoal.saved.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 mb-0.5">Remaining</p>
              <p className="font-bold text-gray-800">₹{remaining.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 mb-0.5">Deadline</p>
              <p className="font-bold text-gray-800">{activeGoal.months} Months</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 text-center">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Required Savings</p>
          <div className="flex items-end justify-center gap-1">
            <span className="text-2xl font-bold text-[#00529b]">₹{activeGoal.monthlyRequired.toLocaleString()}</span>
            <span className="text-sm text-gray-400 mb-0.5">/ month</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Based on your {activeGoal.months} month timeline</p>
        </div>

        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 ml-1">ASTRA AI Insights</h3>
        
        <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 flex gap-3 items-start mb-3 shadow-sm">
          <div className="bg-purple-100 p-2 rounded-full text-purple-700 shrink-0 mt-0.5">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-800 leading-relaxed">
              <span className="font-bold text-purple-800">Action Plan: </span>
              Based on your transaction history, reducing food delivery by 30% will help you save an extra ₹900/month.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 flex gap-3 items-start mb-3 shadow-sm">
          <div className="bg-blue-100 p-2 rounded-full text-blue-700 shrink-0 mt-0.5">
            <Target size={16} />
          </div>
          <div>
            <p className="text-xs text-gray-800 leading-relaxed">
              If you auto-transfer ₹{activeGoal.monthlyRequired.toLocaleString()} every salary day, your goal completion probability increases to <span className="font-bold text-blue-700">92%</span>.
            </p>
          </div>
        </div>
        
        {activeGoal.saved === 0 && (
          <div className="bg-green-50 rounded-xl p-3 border border-green-100 flex justify-between items-center shadow-sm cursor-pointer active:scale-[0.98] transition-transform">
            <div className="flex gap-3 items-center">
              <div className="bg-green-100 p-2 rounded-full text-green-700 shrink-0">
                <PlusCircle size={16} />
              </div>
              <div>
                <p className="text-xs text-green-800 font-bold">Start Saving Now</p>
                <p className="text-[10px] text-green-600">Fund from Ac XXXXXX8202</p>
              </div>
            </div>
            <ArrowLeft size={16} className="text-green-600 transform rotate-180" />
          </div>
        )}
      </div>
    </div>
  );
}
