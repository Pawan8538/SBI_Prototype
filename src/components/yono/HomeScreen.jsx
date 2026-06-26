import React, { useEffect, useRef } from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';
import YONOHeader from '../layout/YONOHeader';
import HealthScoreBadge from '../astra/HealthScoreBadge';
import LifeEventTags from '../astra/LifeEventTags';
import { Search, Banknote, Landmark, PiggyBank, TrendingUp, HandCoins, ShoppingCart, FileText, Car, TrainFront } from 'lucide-react';

function Tile({ icon: Icon, label, onClick, isRightBorder }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 bg-white active:bg-gray-50 ${isRightBorder ? 'border-r border-gray-100' : ''}`}
    >
      <div className="mb-2">
        <Icon className="w-6 h-6" style={{ stroke: 'url(#yonoGradient)', strokeWidth: 1.5 }} />
      </div>
      <span className="text-[10px] text-gray-800 font-medium text-center">{label}</span>
    </button>
  );
}

function SquareCard({ icon: Icon, label }) {
  return (
    <button
      className="flex flex-col items-center justify-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm active:bg-gray-50 aspect-square"
      onClick={() => alert("Coming soon!")}
    >
      <Icon className="w-5 h-5 mb-1" style={{ stroke: 'url(#yonoGradient)', strokeWidth: 1.5 }} />
      <span className="text-[9px] text-gray-700 font-medium text-center leading-tight">{label}</span>
    </button>
  );
}

export default function HomeScreen({ onMenuClick, onNavigate }) {
  const { state, dispatch } = useApp();
  const animRef = useRef(null);

  // Animate health score from 0 → target on mount
  useEffect(() => {
    if (!state.hasStarted) return;
    const target = state.allocationComplete ? 74 : 67;
    let current = state.healthScore;
    if (current >= target) return;

    animRef.current = setInterval(() => {
      current += 1;
      dispatch({ type: ACTIONS.SET_HEALTH_SCORE, payload: Math.min(current, target) });
      if (current >= target) clearInterval(animRef.current);
    }, 22);

    return () => clearInterval(animRef.current);
  }, [state.hasStarted, state.allocationComplete]);

  const user = state.user;

  return (
    <div className="bg-gray-100 flex flex-col h-full relative">
      <YONOHeader onMenuClick={onMenuClick} />

      {/* SVG Gradient Definition */}
      <svg width="0" height="0">
        <linearGradient id="yonoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#db2777" offset="0%" /> {/* Pink-600 */}
          <stop stopColor="#7e22ce" offset="100%" /> {/* Purple-700 */}
        </linearGradient>
      </svg>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* Search bar */}
        <div className="px-4 py-4 shrink-0">
          <div className="flex items-center bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-200">
            <input
              type="text"
              placeholder="Search...."
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
            />
            <Search size={18} className="text-black" strokeWidth={2.5} />
          </div>
        </div>

        {/* Health Score Badge */}
        {state.hasStarted && (
          <div className="px-4 pb-2">
            <HealthScoreBadge score={state.healthScore} />
          </div>
        )}

        {/* Main Grid (White Card) */}
        <div className="mx-4 mb-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-2">
            <Tile icon={PiggyBank} label="Deposits" onClick={() => onNavigate('deposits')} isRightBorder={true} />
            <Tile icon={HandCoins} label="Loans" onClick={() => onNavigate('loans')} isRightBorder={false} />
            <div className="col-span-2 border-t border-gray-100" />
            <Tile icon={TrendingUp} label="Investments" onClick={() => onNavigate('investments')} isRightBorder={true} />
            <Tile icon={Banknote} label="YONO Pay" onClick={() => onNavigate('pay')} isRightBorder={false} />
          </div>
        </div>

        {/* Secondary Grid (4 Square Cards) */}
        <div className="mx-4 mb-4 grid grid-cols-4 gap-2">
          <SquareCard icon={ShoppingCart} label="Shop & Order" />
          <SquareCard icon={FileText} label="Bill Payment" />
          <SquareCard icon={Car} label="Mobility" />
          <SquareCard icon={TrainFront} label="Train Ticket" />
        </div>

        {/* Life Event Tags */}
        {state.hasStarted && user?.life_events && (
          <div className="mb-4">
            <LifeEventTags events={user.life_events} />
          </div>
        )}
      </div>
    </div>
  );
}
