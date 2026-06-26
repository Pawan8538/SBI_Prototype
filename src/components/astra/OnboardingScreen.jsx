import React from 'react';
import { Activity, Layers, ShieldCheck, Zap } from 'lucide-react';

const PILLARS = [
  {
    title: 'Digital Twin',
    sub: 'Simulates your financial future 90 days ahead',
    icon: <Activity className="w-6 h-6 text-purple-600" />,
    delay: '0s',
  },
  {
    title: 'Multi-Agent Swarm',
    sub: 'L1–L10 agents work in parallel to detect risk',
    icon: <Layers className="w-6 h-6 text-purple-600" />,
    delay: '0.15s',
  },
  {
    title: 'Sovereign Products',
    sub: 'PPF, SGB, SSY — government-backed recommendations',
    icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
    delay: '0.3s',
  },
  {
    title: 'Context Cards',
    sub: '1-click actions delivered at the exact right moment',
    icon: <Zap className="w-6 h-6 text-purple-600" />,
    delay: '0.45s',
  },
];

export default function OnboardingScreen({ onStart }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center bg-white rounded-2xl shadow-sm border border-gray-200">
      
      {/* Headline */}
      <div
        className="mb-10"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'all 0.7s ease 0.1s' }}
      >
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
          YONO SBI,<br />but it thinks ahead.
        </h1>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          An AI-native banking layer that detects life events, simulates outcomes,
          and recommends sovereign products — before you ask.
        </p>
      </div>

      {/* Feature pills */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-10 text-left">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="bg-white border border-purple-100 rounded-2xl p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(12px)',
              transition: `all 0.6s ease ${p.delay}`,
            }}
          >
            <div className={`w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-1 shadow-sm border border-purple-100`}>
              {p.icon}
            </div>
            <p className="text-sm font-semibold text-gray-800">{p.title}</p>
            <p className="text-xs text-gray-500 leading-snug">{p.sub}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-xl shadow-lg shadow-purple-300/40 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(10px)',
          transition: 'all 0.6s ease 0.6s',
        }}
      >
        Start Demo
      </button>
    </div>
  );
}
