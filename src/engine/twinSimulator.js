/**
 * twinSimulator.js
 * Reads twin_projection.json and adds a tiny ±noise to make
 * the chart feel "live" on each render. Also exports helper
 * utilities used by TwinChart.jsx in Phase 3.
 */

import twinData from '../data/twin_projection.json';

// ── Noise function: ±2% random variation per data point ──
function addNoise(value, seed = 0) {
  // Deterministic pseudo-random using seed for consistent renders
  const x = Math.sin(seed + 1) * 10000;
  const noise = (x - Math.floor(x)) * 0.04 - 0.02; // ±2%
  return Math.round(value + value * noise);
}

/**
 * getLiveProjection()
 * Returns the twin projection data with subtle noise applied.
 * Called each time the TwinChart mounts to simulate a "fresh" computation.
 */
export function getLiveProjection() {
  const baseline = twinData.baseline.map((v, i) => addNoise(v, i * 7));
  const projected = twinData.projected.map((v, i) => addNoise(v, i * 13));

  return {
    baseline,
    projected,
    risk_day: twinData.risk_day,
    risk_amount: twinData.risk_amount,
    risk_reason: twinData.risk_reason,
    days: twinData.days,
  };
}

/**
 * buildChartData()
 * Returns an array suitable for Recharts ComposedChart:
 * [{ day: 0, actual: 98, projected: 98 }, ...]
 */
export function buildChartData() {
  const { baseline, projected, days } = getLiveProjection();
  return Array.from({ length: days }, (_, i) => ({
    day: i,
    actual: baseline[i] ?? null,
    projected: projected[i] ?? null,
  }));
}

/**
 * getRiskWindow()
 * Returns the start and end indices of the risk zone for chart shading.
 */
export function getRiskWindow() {
  const { risk_day } = twinData;
  return {
    start: Math.max(0, risk_day - 7),
    end: Math.min(twinData.days - 1, risk_day + 7),
    peak: risk_day,
    amount: twinData.risk_amount,
    reason: twinData.risk_reason,
  };
}

/**
 * getSummaryStats(transactions)
 * Computes basic stats for a HealthScoreBadge display.
 */
export function getSummaryStats(transactions) {
  const credits = transactions.filter(t => t.type === 'credit');
  const debits  = transactions.filter(t => t.type === 'debit');
  const totalIn  = credits.reduce((s, t) => s + t.amount, 0);
  const totalOut = debits.reduce((s, t) => s + Math.abs(t.amount), 0);
  const savingsRate = totalIn > 0 ? ((totalIn - totalOut) / totalIn) * 100 : 0;

  // Category breakdown
  const categories = {};
  debits.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + Math.abs(t.amount);
  });

  return {
    totalIn,
    totalOut,
    savingsRate: Math.max(0, savingsRate).toFixed(1),
    categories,
    transactionCount: transactions.length,
  };
}
