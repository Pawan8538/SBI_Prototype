/**
 * lifeEventOracle.js
 * Scans transaction history and detects life event tags.
 * Pure function — no side effects, fully testable.
 */

// Keyword patterns for each life event category
const PATTERNS = {
  school_fees_upcoming: {
    keywords: ['school', 'college', 'tuition', 'fees', 'education', 'dps', 'national public', 'uniform', 'annual fees', 'kids'],
    minAmount: 1500,   // at least ₹1,500 debit to count
  },
  medical_expense: {
    keywords: ['hospital', 'pharmacy', 'clinic', 'medical', 'apollo', 'fortis', 'columbia', 'govt hospital', 'lab', 'doctor'],
    minAmount: 200,
  },
  salary_received: {
    keywords: ['salary', 'salary credit', 'infosys', 'tcs', 'wipro', 'payroll', 'hcl', 'accenture'],
    minAmount: 10000,  // must be a significant credit
    type: 'credit',
  },
  emi_active: {
    keywords: ['emi', 'home loan', 'car loan', 'hdfc bank emi', 'icici emi', 'sbi home', 'auto debit'],
    minAmount: 3000,
    recurring: true,   // flag: appears multiple times
  },
  family_event: {
    keywords: ['jewellery', 'tanishq', 'saree', 'kalaniketan', 'gold', 'wedding', 'festival', 'zara', 'silk'],
    minAmount: 5000,
  },
};

/**
 * detectLifeEvents(transactions)
 * @param {Array} transactions — array of transaction objects from transactions.json
 * @returns {Object} — { tags: string[], evidence: { [tag]: Transaction[] } }
 */
export function detectLifeEvents(transactions) {
  const tags = new Set();
  const evidence = {};

  for (const [tag, rule] of Object.entries(PATTERNS)) {
    const matches = transactions.filter(txn => {
      const descLower = txn.description.toLowerCase();
      const merchantLower = (txn.merchant || '').toLowerCase();
      const absAmount = Math.abs(txn.amount);

      // Check type constraint (credit vs debit)
      if (rule.type && txn.type !== rule.type) return false;

      // Check minimum amount threshold
      if (absAmount < rule.minAmount) return false;

      // Check keyword match in description or merchant
      const keywordMatch = rule.keywords.some(kw =>
        descLower.includes(kw) || merchantLower.includes(kw)
      );

      return keywordMatch;
    });

    if (matches.length === 0) continue;

    // emi_active needs recurring pattern (≥ 2 occurrences)
    if (rule.recurring && matches.length < 2) continue;

    tags.add(tag);
    evidence[tag] = matches;
  }

  return {
    tags: Array.from(tags),
    evidence,
  };
}

/**
 * getLatestEvent(tags)
 * Returns the highest-priority tag for immediate action.
 * Priority: school_fees_upcoming > emi_active > medical_expense > family_event > salary_received
 */
const PRIORITY_ORDER = [
  'school_fees_upcoming',
  'emi_active',
  'medical_expense',
  'family_event',
  'salary_received',
];

export function getLatestEvent(tags) {
  for (const tag of PRIORITY_ORDER) {
    if (tags.includes(tag)) return tag;
  }
  return tags[0] || null;
}
