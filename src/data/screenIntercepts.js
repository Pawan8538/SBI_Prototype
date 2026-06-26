// Intercept card content per screen — used by InterceptCard component
export const INTERCEPT_CONTENT = {
  home: {
    badge: 'L9 · Context Intercept',
    title: 'Balance risk in 42 days',
    body: 'School fees of ₹8,500 detected twice in your history. Your Digital Twin projects a balance dip to ₹-4,800 at Day 42.',
    action: 'Auto-Allocate ₹5,000 to PPF',
    severity: 'high',
    productId: 'PPF',
  },
  deposits: {
    badge: 'L9 · Context Intercept',
    title: 'FD matures in 18 days',
    body: 'Your Fixed Deposit #SBI-FD-2847 (₹50,000) matures July 14. SGB at 8.05% p.a. outperforms FD renewal at 6.8%.',
    action: 'Redirect Maturity to SGB',
    severity: 'medium',
    productId: 'SGB',
  },
  investments: {
    badge: 'L9 · Context Intercept',
    title: 'Idle surplus losing value',
    body: '₹14,200 is sitting in savings earning 2.7%. Sovereign Gold Bond Series 2026-IV offers 8.05% with government guarantee.',
    action: 'Allocate ₹3,000 to SGB Now',
    severity: 'medium',
    productId: 'SGB',
  },
  loans: {
    badge: 'L9 · Context Intercept',
    title: 'EMI stress window detected',
    body: 'Your ₹18,500 EMI creates 5 marginal months in the next 24. ASTRA recommends building a ₹55,500 liquidity buffer.',
    action: 'Build Buffer via PPF SIP',
    severity: 'high',
    productId: 'PPF',
  },
};
