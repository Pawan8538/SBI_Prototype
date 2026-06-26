import React from 'react';
import { GraduationCap, Briefcase, Building, ChevronRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';

const eventScreenMap = {
  school_fees_upcoming: 'home',
  salary_received: 'investments',
  emi_active: 'loans',
};

export default function LifeEventTags({ events }) {
  const { dispatch } = useApp();

  if (!events || events.length === 0) return null;

  return (
    <div className="px-4 mb-2 space-y-3">
      <p className="text-[10px] font-mono text-purple-700 mb-1.5 font-bold tracking-wide uppercase">
        ASTRA DETECTED
      </p>
      {events.map(event => (
        <button
          key={event.id}
          onClick={() => {
            const screen = eventScreenMap[event.id];
            if (screen) {
              dispatch({ type: ACTIONS.SHOW_INTERCEPT, payload: screen });
            }
          }}
          className="w-full flex items-center bg-white rounded-xl border border-gray-200 shadow-sm p-3 text-left active:bg-gray-50 transition-colors"
        >
          {/* Left Icon */}
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
            {event.icon === 'GraduationCap' && <GraduationCap size={32} style={{ stroke: 'url(#yonoGradient)', strokeWidth: 1.5 }} />}
            {event.icon === 'Briefcase' && <Briefcase size={32} style={{ stroke: 'url(#yonoGradient)', strokeWidth: 1.5 }} />}
            {event.icon === 'Building' && <Building size={32} style={{ stroke: 'url(#yonoGradient)', strokeWidth: 1.5 }} />}
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-gray-200 mx-3" />

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">{event.label}</p>
            <p className="text-[10px] text-gray-600 mt-0.5 font-medium">{event.detail}</p>
            <p className="text-[9px] text-purple-700 font-bold mt-1 uppercase">{event.subtext}</p>
          </div>
          
          <ChevronRight size={18} className="text-gray-400 shrink-0 ml-2" />
        </button>
      ))}
    </div>
  );
}
