/**
 * useGeminiAPI.js
 * ASTRA AI responses powered by Gemini 2.5 Flash.
 * Updated system prompt with full financial context for richer responses.
 */

const SYSTEM_PROMPT = `You are ASTRA, SBI's proactive AI financial assistant embedded in YONO.
User: Bhavya Chandra | Account: XXXXXXXX8202
Current balance: ₹98.55 | Health Score: 67/100
Life events detected: school_fees_upcoming (₹8,500 in 42 days), emi_active (₹18,500/mo), salary_received (₹58,000)
Digital Twin status: Balance risk at Day 42 | Severity: HIGH

Rules:
- Max 3 sentences per response
- Only recommend PPF (7.1%), SGB (8.05%), or SSY (8.2%) — never third-party funds
- Be proactive and specific, not generic
- Always reference the user's actual data, not hypotheticals
- Sound like an enterprise AI system, not a chatbot
- Never say "I" — always refer to yourself as ASTRA`;

/**
 * askASTRA — sends a query to Gemini 2.5 Flash and returns the response text.
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
          maxOutputTokens: 500,
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
 * PROACTIVE_TRIGGERS — kept for backward compatibility but no longer used
 * in the new architecture (replaced by useScreenTransition + intercept cards)
 */
export const PROACTIVE_TRIGGERS = {
  home: null,
  deposits: null,
  pay: null,
  success: null,
  investments: null,
};
