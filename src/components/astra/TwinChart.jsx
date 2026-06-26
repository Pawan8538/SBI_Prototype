import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceDot, ReferenceLine } from 'recharts';
import { buildChartData, getRiskWindow } from '../../engine/twinSimulator';

// Build data once at module level so chart never re-renders with changing data
const CHART_DATA = buildChartData();
const RISK_WINDOW = getRiskWindow();

export default function TwinChart() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-1 shrink-0">
        <h3 className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
          Digital Twin — 90-Day Cash Flow
        </h3>
        <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded text-[9px] font-bold tracking-wide">
          RISK DETECTED
        </span>
      </div>

      {/* Chart fills remaining space in the card */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CHART_DATA} margin={{ top: 5, right: 8, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#ccc"
              tick={{ fill: '#aaa', fontSize: 9 }}
              tickCount={7}
            />
            <YAxis
              stroke="#ccc"
              tick={{ fill: '#aaa', fontSize: 9 }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
              formatter={(val, name) => [`₹${val.toLocaleString()}`, name === 'actual' ? 'Current' : 'Projected']}
              labelFormatter={(l) => `Day ${l}`}
            />
            {/* Zero line */}
            <ReferenceArea y1={-10000} y2={0} fill="#fee2e2" fillOpacity={0.5} />
            {/* Risk zone */}
            <ReferenceArea
              x1={RISK_WINDOW.start}
              x2={RISK_WINDOW.end}
              fill="#fca5a5"
              fillOpacity={0.25}
              stroke="#ef4444"
              strokeWidth={0.5}
            />
            {/* Risk peak dot */}
            <ReferenceDot
              x={RISK_WINDOW.peak}
              y={RISK_WINDOW.amount}
              r={4}
              fill="#ef4444"
              stroke="#fff"
              strokeWidth={2}
            />

            {/* Zero balance floor line */}
            <ReferenceLine
              y={0}
              stroke="#EF4444"
              strokeDasharray="4 2"
              label={{ value: '₹0 Floor', position: 'insideTopRight', fill: '#EF4444', fontSize: 10 }}
            />

            {/* Day 42 risk marker */}
            <ReferenceLine
              x={42}
              stroke="#F59E0B"
              strokeDasharray="4 2"
              label={{ value: '⚠ Day 42', position: 'insideTopLeft', fill: '#F59E0B', fontSize: 10 }}
            />

            <Bar dataKey="actual" fill="#7e22ce" isAnimationActive={false} name="actual" />
            <Bar dataKey="projected" fill="#ef4444" isAnimationActive={false} name="projected" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend row */}
      <div className="flex gap-4 mt-1 shrink-0">
        <span className="flex items-center gap-1 text-[10px] text-gray-500">
          <span className="inline-block w-5 h-0.5 bg-purple-700" /> Current
        </span>
        <span className="flex items-center gap-1 text-[10px] text-gray-500">
          <span className="inline-block w-5 h-0.5 bg-red-500 border-dashed" style={{ borderTop: '1.5px dashed #ef4444', background: 'none' }} /> Projected
        </span>
        <span className="flex items-center gap-1 text-[10px] text-red-500">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400" /> Risk Zone (Day {RISK_WINDOW.start}–{RISK_WINDOW.end})
        </span>
      </div>
    </div>
  );
}
