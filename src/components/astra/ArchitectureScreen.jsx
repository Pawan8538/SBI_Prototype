import React, { useState } from 'react';

const LAYERS = [
  {
    id: 'canvas',
    label: 'User Canvas',
    x: 40, y: 60,
    desc: 'YONO mobile UI — the user-facing surface. HomeScreen, PayScreen, and overlay cards. All user interactions are captured and forwarded to the Behavior Engine.',
    color: '#7c3aed',
  },
  {
    id: 'behavior',
    label: 'Behavior Engine',
    x: 300, y: 60,
    desc: 'L1–L3 layers. Ingests transaction history, user fingerprint, and session data. Normalises all events into a canonical activity stream for downstream agents.',
    color: '#2563eb',
  },
  {
    id: 'analytics',
    label: 'Analytics Factory',
    x: 560, y: 60,
    desc: 'L4 Life Event Oracle. Pattern-matches transaction corpus to detect life events: school fees, EMI, salary, rent. Produces tagged event payloads.',
    color: '#0891b2',
  },
  {
    id: 'twin',
    label: 'Twin Memory',
    x: 560, y: 220,
    desc: 'L5 Digital Twin Simulator. Projects balance 90 days forward using detected events. Identifies risk windows and calculates severity scores.',
    color: '#059669',
  },
  {
    id: 'swarm',
    label: 'Swarm Core',
    x: 300, y: 220,
    desc: 'L6 Multi-Agent Swarm. Savings Agent, Compliance Agent, and Product Agent run in parallel. Each agent specialises in one concern and reports to the Sovereign Bus.',
    color: '#d97706',
  },
  {
    id: 'guardrails',
    label: 'Guardrails',
    x: 100, y: 220,
    desc: 'L7 Guardrail Layer. Pydantic schema validation, RBI compliance checks, KYC verification. Every recommended action must pass all guards before surfacing.',
    color: '#dc2626',
  },
  {
    id: 'dashboard',
    label: 'Dashboard UI',
    x: 40, y: 380,
    desc: 'L9 Canvas Renderer. The ASTRA intelligence panel on the right — TwinChart, AgentLogPanel, feature status chips. Renders in real-time alongside the mobile frame.',
    color: '#7c3aed',
  },
  {
    id: 'bus',
    label: 'Sovereign Product Bus',
    x: 300, y: 380,
    desc: 'L8 Product Bus. Maps detected life events to government-backed sovereign products: PPF (Public Provident Fund), SGB (Sovereign Gold Bond), SSY (Sukanya Samriddhi Yojana).',
    color: '#be185d',
  },
];

const ARROWS = [
  { from: 'canvas', to: 'behavior' },
  { from: 'behavior', to: 'analytics' },
  { from: 'analytics', to: 'twin' },
  { from: 'twin', to: 'swarm' },
  { from: 'swarm', to: 'guardrails' },
  { from: 'guardrails', to: 'dashboard' },
  { from: 'swarm', to: 'bus' },
];

const W = 160, H = 44;

function getCentre(layer) {
  return { cx: layer.x + W / 2, cy: layer.y + H / 2 };
}

export default function ArchitectureScreen() {
  const [active, setActive] = useState(null);
  const activeLayer = LAYERS.find(l => l.id === active);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 shrink-0">
        <h2 className="text-base font-bold text-gray-800">System Architecture</h2>
        <p className="text-xs text-gray-500 mt-0.5">Click any component to see its role in the ASTRA pipeline</p>
      </div>

      {/* SVG diagram */}
      <div className="flex-1 min-h-0 w-full p-4 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 760 470" preserveAspectRatio="xMidYMid meet">
          {/* Draw arrows */}
          {ARROWS.map(({ from, to }) => {
            const f = LAYERS.find(l => l.id === from);
            const t = LAYERS.find(l => l.id === to);
            const fc = getCentre(f);
            const tc = getCentre(t);
            return (
              <line
                key={`${from}-${to}`}
                x1={fc.cx} y1={fc.cy}
                x2={tc.cx} y2={tc.cy}
                stroke="#e2e8f0"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Arrow marker */}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#cbd5e1" />
            </marker>
          </defs>

          {/* Draw boxes */}
          {LAYERS.map((layer) => (
            <g key={layer.id} onClick={() => setActive(active === layer.id ? null : layer.id)} style={{ cursor: 'pointer' }}>
              <rect
                x={layer.x} y={layer.y}
                width={W} height={H}
                rx="8"
                fill={active === layer.id ? layer.color : '#f8fafc'}
                stroke={layer.color}
                strokeWidth={active === layer.id ? 0 : 1.5}
              />
              <text
                x={layer.x + W / 2} y={layer.y + H / 2 + 5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                fill={active === layer.id ? '#fff' : '#374151'}
              >
                {layer.label}
              </text>
            </g>
          ))}

          {/* Product bus sub-labels */}
          {['PPF', 'SGB', 'SSY'].map((p, i) => (
            <text key={p} x={260 + i * 80} y={460} textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fill="#6b7280" fontWeight="500">
              {p}
            </text>
          ))}
        </svg>
      </div>

      {/* Detail card */}
      {activeLayer && (
        <div className="shrink-0 mx-4 mb-4 p-4 rounded-xl border-l-4 bg-gray-50" style={{ borderColor: activeLayer.color }}>
          <p className="text-sm font-semibold text-gray-800 mb-1">{activeLayer.label}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{activeLayer.desc}</p>
        </div>
      )}
    </div>
  );
}
