// Log messages library — complete set for all screens + auto-run
// Each screen has a named log script. Color by layer prefix.

// Color map by layer prefix
export const LOG_COLORS = {
  'L1': 'text-blue-400',
  'L2': 'text-blue-400',
  'L3': 'text-cyan-400',
  'L4': 'text-yellow-400',
  'L5': 'text-orange-400',
  'L6': 'text-purple-400',
  'L7': 'text-green-400',
  'L8': 'text-pink-400',
  'L9': 'text-indigo-400',
  'L10': 'text-white',
  'ASTRA': 'text-white',
  'AUTO-RUN': 'text-white',
  'ERROR': 'text-red-400',
};

// Helper: build a log line object
let logId = 0;
export const logLine = (layer, message) => ({
  id: ++logId,
  timestamp: new Date().toTimeString().slice(0, 8),
  layer,
  color: LOG_COLORS[layer] || 'text-gray-300',
  message,
});

// ─── HOME SCREEN LOGS (initial load) ───────────────────────────────────────
export const HOME_LOGS = () => [
  logLine('L1', 'Session ingestion complete — 90 days of transactions loaded'),
  logLine('L2', 'User fingerprint matched: Bhavya Chandra (bhavya-chandra-001)'),
  logLine('L3', 'Scanning transaction corpus for life event patterns...'),
  logLine('L4', 'Tag detected: school_fees_upcoming (DPS ₹8,500 × 2 occurrences)'),
  logLine('L4', 'Tag detected: emi_active (HDFC ₹18,500 × 3 months recurring)'),
  logLine('L4', 'Tag detected: salary_received (Infosys ₹58,000 × 4 credits)'),
  logLine('L5', 'Digital Twin simulation initiated — 90-day cash flow projected'),
  logLine('L5', 'Risk detected: Balance dip to ₹-4,800 at Day 42 (school fees)'),
  logLine('L5', 'Risk window: Day 35–49 | Severity: HIGH'),
  logLine('L6', 'Savings Agent spawned — evaluating sovereign product catalog'),
  logLine('L7', 'Pydantic schema validation: PASS — output structure verified'),
  logLine('L8', 'Sovereign Bus match: school_fees_upcoming → PPF (7.1% p.a.)'),
  logLine('L8', 'Recommended allocation: ₹5,000 to PPF'),
  logLine('L9', 'Context intercept card queued — rendering in 4s'),
  logLine('ASTRA', 'Monitoring active. Awaiting user interaction.'),
];

// ─── DEPOSITS SCREEN LOGS ───────────────────────────────────────────────────
export const DEPOSITS_LOGS = () => [
  logLine('L2', 'Screen focus: deposits_screen detected'),
  logLine('L3', 'FD corpus scan initiated — 3 active deposits found'),
  logLine('L4', 'Maturity event detected: FD #SBI-FD-2847 matures in 18 days'),
  logLine('L4', 'FD value at maturity: ₹50,000 + ₹3,400 interest'),
  logLine('L5', 'Twin update: FD maturity inflow modelled into Day 18 projection'),
  logLine('L6', 'Reinvestment Agent evaluating: Renew FD vs Redirect to SGB'),
  logLine('L7', 'Compliance check: SGB purchase limits verified — eligible'),
  logLine('L8', 'Recommendation: SGB at 8.05% p.a. vs FD renewal at 6.8% p.a.'),
  logLine('L9', 'Deposits intercept card rendered'),
  logLine('ASTRA', 'Awaiting user decision on FD #SBI-FD-2847.'),
];

// ─── INVESTMENTS SCREEN LOGS ────────────────────────────────────────────────
export const INVESTMENTS_LOGS = () => [
  logLine('L2', 'Screen focus: investments_screen detected'),
  logLine('L3', 'Portfolio scan: 1 mutual fund position, 0 SGB holdings'),
  logLine('L4', 'Idle surplus detected: ₹14,200 in savings — no sovereign allocation'),
  logLine('L5', 'Twin projection: Idle cash loses 4.8% real value over 12 months'),
  logLine('L6', 'Portfolio Agent: Evaluating SGB for inflation-protected allocation'),
  logLine('L7', 'Schema validated: SGB allocation within risk profile — PASS'),
  logLine('L8', 'Sovereign Bus: SGB tranche available — Series 2026-IV open'),
  logLine('L9', 'Investment intercept card rendered'),
  logLine('ASTRA', 'Surplus capital can be protected. Awaiting user confirmation.'),
];

// ─── LOANS SCREEN LOGS ──────────────────────────────────────────────────────
export const LOANS_LOGS = () => [
  logLine('L2', 'Screen focus: loans_screen detected'),
  logLine('L3', 'Liability scan: 1 active home loan — ₹12.4L outstanding'),
  logLine('L4', 'EMI pattern confirmed: ₹18,500/mo — 24 months remaining'),
  logLine('L5', 'Twin stress test: Running balance simulation with EMI obligation...'),
  logLine('L5', 'Stress result: Balance safe for 19/24 months | 5 months marginal'),
  logLine('L6', 'Risk Mitigation Agent: Evaluating prepayment vs liquidity buffer'),
  logLine('L7', 'Guardrail check: Prepayment > 3 months salary — flagged for review'),
  logLine('L8', 'Recommendation: Maintain EMI schedule, build ₹55,500 buffer fund'),
  logLine('L9', 'Loan intercept card rendered'),
  logLine('ASTRA', 'EMI stress analysis complete. Liquidity buffer advised.'),
];

// ─── 1-CLICK AUTO-RUN LOGS (after confirm) ──────────────────────────────────
export const AUTORUN_LOGS = () => [
  logLine('AUTO-RUN', 'Execution confirmed by user — initiating allocation'),
  logLine('L7', 'Pydantic re-validation: amount=5000, product=PPF, user=verified — PASS'),
  logLine('L7', 'Compliance guardrail: Annual PPF limit ₹1,50,000 — within bounds'),
  logLine('L8', 'Sovereign Bus: PPF allocation routing initiated'),
  logLine('L8', 'Reference generated: ASTRA-PPF-2026-0001'),
  logLine('L6', 'Savings Agent: Deduction scheduled against next salary credit'),
  logLine('L9', 'Balance state updated — post-allocation projection recalculated'),
  logLine('L5', 'Twin refresh: Risk window Day 35–49 severity reduced from HIGH → LOW'),
  logLine('ASTRA', 'Task complete. Health Score updated: 67 → 74. Monitoring resumed.'),
];

// Legacy export for backward compatibility during refactor
export const LOG_SEQUENCE = HOME_LOGS().map((line, i) => ({
  layer: line.layer,
  label: line.layer === 'ASTRA' ? 'ASTRA' : 
         ['L1','L2'].includes(line.layer) ? 'Telemetry' :
         line.layer === 'L3' ? 'Analytics' :
         line.layer === 'L4' ? 'Oracle' :
         line.layer === 'L5' ? 'Twin' :
         line.layer === 'L6' ? 'Swarm' :
         line.layer === 'L7' ? 'Guard' :
         line.layer === 'L8' ? 'Bus' :
         line.layer === 'L9' ? 'Canvas' : line.layer,
  color: line.color,
  message: line.message,
}));

export function getLogUpTo(index) {
  return LOG_SEQUENCE.slice(0, index + 1);
}
