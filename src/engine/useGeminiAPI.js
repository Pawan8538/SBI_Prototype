/**
 * useGeminiAPI.js — Phase 5
 * ASTRA AI responses powered by Gemini 2.5 Flash.
 * Adapted from the Claude API plan to use Google's Generative Language REST API.
 */

const SYSTEM_PROMPT = `You are ASTRA, SBI's proactive AI financial assistant embedded inside the YONO SBI mobile app.
Current user: Bhavya Chandra | Balance: ₹98.55 | Health Score: 67/100
Upcoming risk: School fees ₹8,500 due in 42 days. Active EMI: HDFC ₹18,500/month.
Salary: Infosys ₹58,000/month credited 4 days ago.

STRICT RULES:
- Respond in MAXIMUM 2 short sentences.
- Only ever recommend sovereign government-backed products: PPF, SGB (Sovereign Gold Bond), or SSY (Sukanya Samriddhi Yojana).
- Sound confident, proactive, and direct. Not cautious. Not disclaimers.
- Never say "I" — always refer to yourself as ASTRA.
- Always quote a specific rupee amount when recommending an action.`;

/**
 * askASTRA — sends a query to Gemini 2.5 Flash and returns the response text.
 * @param {string} userQuery - the user's question
 * @param {string} currentScreen - the current screen context (e.g. 'home', 'deposits')
 * @param {string} apiKey - Gemini API key from env
 * @returns {Promise<string>} the response text
 */
export async function askASTRA(userQuery, currentScreen, apiKey) {
  const contextualQuery = `Screen: ${currentScreen}. User message: ${userQuery}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          { role: 'user', parts: [{ text: contextualQuery }] }
        ],
        generationConfig: {
          maxOutputTokens: 120,
          temperature: 0.7,
        }
      })
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error ${response.status}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'ASTRA is processing your request.';
}

/**
 * PROACTIVE_TRIGGERS — pre-wired proactive messages shown on screen navigation.
 * These match the 3 demo scenarios from the Phase 5 plan.
 */
export const PROACTIVE_TRIGGERS = {
  home: null, // no proactive on home (intercept card handles it)
  deposits:
    'ASTRA detected your salary credit 4 days ago — allocating ₹5,000 to PPF now protects against your 42-day school fee risk.',
  pay: null,
  success:
    'Transaction complete. ASTRA recommends reinvesting an equivalent ₹1,000/month into SGB to build inflation-proof reserves.',
  investments:
    'Your Health Score is 67/100 — a ₹2,000/month SGB allocation will push it above 80 within 6 months.',
};
