/**
 * logMessages.js
 * Realistic agent log message templates for AgentLogPanel.jsx (Phase 3).
 * Each entry: { layer, label, message, color }
 */

export const LOG_SEQUENCE = [
  { layer: 'L1', label: 'Telemetry',  color: 'text-blue-400',   message: 'Session ingestion complete — 90 days of transactions loaded' },
  { layer: 'L2', label: 'Telemetry',  color: 'text-blue-400',   message: 'User fingerprint matched: Bhavya Chandra (bhavya-chandra-001)' },
  { layer: 'L3', label: 'Oracle',     color: 'text-yellow-400', message: 'Scanning transaction corpus for life event patterns...' },
  { layer: 'L4', label: 'Oracle',     color: 'text-yellow-400', message: 'Tag detected: school_fees_upcoming (DPS ₹8,500 × 2 occurrences)' },
  { layer: 'L4', label: 'Oracle',     color: 'text-yellow-400', message: 'Tag detected: emi_active (HDFC ₹18,500 × 3 months recurring)' },
  { layer: 'L4', label: 'Oracle',     color: 'text-yellow-400', message: 'Tag detected: salary_received (Infosys ₹58,000 × 4 credits)' },
  { layer: 'L5', label: 'Twin',       color: 'text-purple-400', message: 'Digital Twin simulation initiated — 90-day cash flow projected' },
  { layer: 'L5', label: 'Twin',       color: 'text-purple-400', message: 'Risk detected: Balance dip to ₹-4,800 at Day 42 (school fees)' },
  { layer: 'L5', label: 'Twin',       color: 'text-purple-400', message: 'Risk window: Day 35–49 | Severity: HIGH' },
  { layer: 'L6', label: 'Swarm',      color: 'text-pink-400',   message: 'Savings Agent spawned — evaluating sovereign product catalog' },
  { layer: 'L6', label: 'Swarm',      color: 'text-pink-400',   message: 'Compliance Agent spawned — verifying RBI guidelines' },
  { layer: 'L7', label: 'Guard',      color: 'text-green-400',  message: 'Pydantic schema validation: PASSED' },
  { layer: 'L7', label: 'Guard',      color: 'text-green-400',  message: 'KYC compliance check: VERIFIED' },
  { layer: 'L8', label: 'Bus',        color: 'text-orange-400', message: 'Product match: PPF → school_fees_upcoming (confidence: 94%)' },
  { layer: 'L8', label: 'Bus',        color: 'text-orange-400', message: 'Action generated: Auto-Allocate ₹5,000 to PPF' },
  { layer: 'L9', label: 'Canvas',     color: 'text-cyan-400',   message: 'Intercept card rendered on HomeScreen' },
  { layer: 'L10', label: 'ASTRA',     color: 'text-white',      message: 'Awaiting user confirmation — 1-click action ready' },
];

/**
 * getLogUpTo(index)
 * Returns log messages 0..index for streaming simulation.
 */
export function getLogUpTo(index) {
  return LOG_SEQUENCE.slice(0, index + 1);
}
