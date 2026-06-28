import React, { useState } from 'react';
import { ArrowLeft, Activity, Info, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialTwinScreen({ onBack }) {
  const [investment, setInvestment] = useState(5000);
  const [expenseReduction, setExpenseReduction] = useState(10); // percentage
  const [salaryIncrease, setSalaryIncrease] = useState(5); // percentage
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8); // percentage
  const [retirementAge, setRetirementAge] = useState(60);

  // User baseline
  const currentAge = 35;
  const yearsToRetirement = retirementAge - currentAge;

  // Mock data generation logic over 5 years (to keep graph visible, could extend to retirement)
  const currentData = [
    { year: 2024, amount: 45000 },
    { year: 2025, amount: 65000 },
    { year: 2026, amount: 90000 },
    { year: 2027, amount: 120000 },
    { year: 2028, amount: 155000 },
    { year: 2029, amount: 195000 },
  ];

  const simulatedData = currentData.map((d, i) => {
    const salaryBoost = i > 0 ? (i * 1000 * salaryIncrease) : 0;
    const loanDeduction = loanAmount > 0 ? (loanAmount / 5) * i : 0; // simple amortized over 5 yrs
    const interestGrowth = (investment * 12 * i) * (1 + (interestRate/100) * i);
    
    return {
      year: d.year,
      amount: d.amount + interestGrowth + (i * 2000 * (expenseReduction / 10)) + salaryBoost - loanDeduction,
      current: d.amount
    }
  });

  const endValueSimulated = simulatedData[simulatedData.length - 1].amount;
  const endValueCurrent = simulatedData[simulatedData.length - 1].current;
  const difference = endValueSimulated - endValueCurrent;

  return (
    <div className="bg-gray-100 flex flex-col h-full relative">
      <div className="bg-[#00529b] text-white px-4 py-3 flex items-center shadow-md shrink-0">
        <button onClick={onBack} className="mr-3 p-1 rounded hover:bg-white/10 active:bg-white/20 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold text-sm">Digital Financial Twin</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pb-20 scrollbar-hide">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-md p-4 mb-4 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-sm font-semibold opacity-90 mb-1">Projected Net Worth (5 Yrs)</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">₹{(endValueSimulated / 100000).toFixed(1)}L</span>
                <span className={`text-xs flex items-center ${difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {difference >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {difference >= 0 ? '+' : ''}₹{(difference / 100000).toFixed(1)}L vs Current
                </span>
              </div>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <Activity size={20} />
            </div>
          </div>
          
          <div className="h-32 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={simulatedData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSimulated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={endValueSimulated > endValueCurrent ? "#c084fc" : "#ef4444"} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={endValueSimulated > endValueCurrent ? "#c084fc" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1b4b', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="current" stroke="#94a3b8" fillOpacity={1} fill="url(#colorCurrent)" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="amount" stroke={endValueSimulated > endValueCurrent ? "#c084fc" : "#ef4444"} strokeWidth={2} fillOpacity={1} fill="url(#colorSimulated)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 ml-1">Simulation Variables</h3>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 space-y-5">
          {/* Investment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700">Monthly SIP Investment</label>
              <span className="text-xs font-bold text-[#00529b]">₹{investment.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="0" max="50000" step="1000"
              value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00529b]"
            />
          </div>

          {/* Salary Increase */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700">Annual Salary Hike</label>
              <span className="text-xs font-bold text-[#00529b]">{salaryIncrease}%</span>
            </div>
            <input 
              type="range" min="0" max="30" step="1"
              value={salaryIncrease} onChange={(e) => setSalaryIncrease(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00529b]"
            />
          </div>

          {/* Expense Reduction */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700">Reduce Expenses</label>
              <span className="text-xs font-bold text-purple-700">{expenseReduction}%</span>
            </div>
            <input 
              type="range" min="0" max="50" step="5"
              value={expenseReduction} onChange={(e) => setExpenseReduction(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Take Loan */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-gray-700">Simulate Loan (₹)</label>
              <span className="text-xs font-bold text-red-600">₹{loanAmount.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="0" max="2000000" step="100000"
              value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-semibold text-gray-700">Retirement Age</label>
                <span className="text-[10px] font-bold text-gray-800">{retirementAge}</span>
              </div>
              <input 
                type="range" min="45" max="70" step="1"
                value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-semibold text-gray-700">Est. Interest</label>
                <span className="text-[10px] font-bold text-gray-800">{interestRate}%</span>
              </div>
              <input 
                type="range" min="4" max="15" step="0.5"
                value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
              />
            </div>
          </div>
        </div>

        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 ml-1">Scenario Comparison</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <p className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Current Plan</p>
            <p className="font-bold text-gray-800">₹{(endValueCurrent / 100000).toFixed(1)} Lakhs</p>
            <p className="text-[9px] text-gray-400 mt-1">In 5 years</p>
          </div>
          
          <div className={`rounded-xl p-3 border shadow-sm flex flex-col items-center text-center ${difference >= 0 ? 'bg-purple-50 border-purple-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-[10px] uppercase font-bold mb-1 ${difference >= 0 ? 'text-purple-700' : 'text-red-700'}`}>Simulated</p>
            <p className={`font-bold ${difference >= 0 ? 'text-purple-900' : 'text-red-900'}`}>₹{(endValueSimulated / 100000).toFixed(1)} Lakhs</p>
            <div className={`flex items-center text-[9px] font-semibold mt-1 ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {difference >= 0 ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
              {difference >= 0 ? 'Better outcome' : 'Worse outcome'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
