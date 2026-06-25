/**
 * sovereignBus.js
 * Maps detected life event tags → sovereign product recommendations.
 * Returns a recommendation object with product, action, rationale, and UPI target.
 */

export const PRODUCT_MAP = {
  school_fees_upcoming: {
    product: 'PPF',
    full_name: 'Public Provident Fund',
    action: 'Auto-Allocate ₹5,000',
    icon: '🏛️',
    interest_rate: '7.1% p.a.',
    backed_by: 'Government of India',
    rationale:
      'School fees of ₹8,500 are expected in 42 days. Your projected balance dips to ₹-4,800. ' +
      'Auto-allocating ₹5,000 into PPF now creates a liquid safety buffer backed by the Government of India — ' +
      'completely risk-free and earns 7.1% tax-free interest.',
    upi_action: 'Transfer ₹5,000 → PPF A/c',
    urgency: 'high',
  },

  medical_expense: {
    product: 'SGB',
    full_name: 'Sovereign Gold Bond',
    action: 'Buy 1g Gold Bond',
    icon: '🥇',
    interest_rate: '2.5% + gold appreciation',
    backed_by: 'Reserve Bank of India',
    rationale:
      'Recent medical expenses detected (₹3,500+ in hospital visits). Gold Bonds serve as a ' +
      'long-term wealth buffer against healthcare cost inflation. Government-guaranteed return ' +
      'of 2.5% p.a. plus gold price appreciation — safer than physical gold.',
    upi_action: 'Buy 1g SGB via SBI',
    urgency: 'medium',
  },

  salary_received: {
    product: 'SSY',
    full_name: 'Sukanya Samriddhi Yojana',
    action: 'Transfer ₹2,000 to SSY',
    icon: '👧',
    interest_rate: '8.2% p.a.',
    backed_by: 'Ministry of Finance',
    rationale:
      'Salary of ₹58,000 credited! Best time to invest a small portion in SSY — India\'s highest ' +
      'interest-bearing small savings scheme at 8.2% p.a. Designed for girl child education and ' +
      'marriage. Completely tax-exempt under Section 80C.',
    upi_action: 'Invest ₹2,000 → SSY',
    urgency: 'low',
  },

  emi_active: {
    product: 'PPF',
    full_name: 'Public Provident Fund',
    action: 'Start ₹500/month PPF SIP',
    icon: '🏛️',
    interest_rate: '7.1% p.a.',
    backed_by: 'Government of India',
    rationale:
      'Multiple active EMIs detected (₹18,500+/month). High EMI burden reduces your monthly ' +
      'liquidity. Starting a small ₹500/month PPF SIP creates a guaranteed debt-free corpus ' +
      'over time, reducing financial stress without impacting cash flow significantly.',
    upi_action: 'Set ₹500 monthly PPF SIP',
    urgency: 'medium',
  },

  family_event: {
    product: 'SGB',
    full_name: 'Sovereign Gold Bond',
    action: 'Buy 2g Gold Bond',
    icon: '🥇',
    interest_rate: '2.5% + gold appreciation',
    backed_by: 'Reserve Bank of India',
    rationale:
      'Festival or family event spending detected (jewellery/silk purchases). Instead of buying ' +
      'physical gold that attracts making charges and storage risk, Sovereign Gold Bonds give you ' +
      'the same gold exposure with 2.5% annual interest and zero GST — purely digital, purely safe.',
    upi_action: 'Buy 2g SGB via SBI',
    urgency: 'low',
  },
};

/**
 * getRecommendation(tag)
 * @param {string} tag — a life event tag from lifeEventOracle
 * @returns {Object|null} — the product recommendation object
 */
export function getRecommendation(tag) {
  return PRODUCT_MAP[tag] || null;
}

/**
 * getAllRecommendations(tags)
 * Returns an array of recommendation objects for all detected tags.
 * @param {string[]} tags
 * @returns {Array}
 */
export function getAllRecommendations(tags) {
  return tags
    .map(tag => ({ tag, ...PRODUCT_MAP[tag] }))
    .filter(r => r.product !== undefined);
}
