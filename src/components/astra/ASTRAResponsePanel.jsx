import React, { useState, useEffect } from 'react';
import { Sparkles, Send, RotateCcw, AlertCircle } from 'lucide-react';
import { askASTRA } from '../../engine/useGeminiAPI';

/**
 * ASTRAResponsePanel — Phase 5
 * 
 * Displays ASTRA's AI response in the right panel.
 * - Shows proactive messages triggered by screen navigation
 * - Has a query input for manual questions
 * - Calls Gemini 2.5 Flash API for real AI responses
 */
export default function ASTRAResponsePanel({ currentScreen, proactiveMessage, apiKey }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Show proactive message when screen changes
  useEffect(() => {
    if (proactiveMessage) {
      const entry = {
        id: Date.now(),
        type: 'proactive',
        text: proactiveMessage,
        screen: currentScreen,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setHistory(prev => [entry, ...prev]);
      setResponse(entry);
    }
  }, [proactiveMessage]);

  const handleSubmit = async () => {
    const q = query.trim();
    if (!q || loading) return;

    setQuery('');
    setLoading(true);
    setError(null);

    const userEntry = {
      id: Date.now(),
      type: 'user',
      text: q,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory(prev => [userEntry, ...prev]);

    try {
      const key = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!key) throw new Error('No API key. Add VITE_GEMINI_API_KEY to your .env file.');
      
      const text = await askASTRA(q, currentScreen, key);
      const astraEntry = {
        id: Date.now() + 1,
        type: 'astra',
        text,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setHistory(prev => [astraEntry, ...prev]);
      setResponse(astraEntry);
    } catch (err) {
      setError(err.message || 'ASTRA is temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Demo scenario quick-fire buttons (pre-wired for judges)
  const QUICK_QUERIES = [
    'Am I safe this month?',
    'Should I invest more right now?',
    'What is my biggest financial risk?',
  ];

  return (
    <div className="flex flex-col h-full gap-4">
      
      {/* Current ASTRA Response card */}
      <div className="shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#00529b] flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm text-gray-800">ASTRA Response</span>
          {response?.type === 'proactive' && (
            <span className="ml-auto text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">
              Proactive
            </span>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>ASTRA is analysing...</span>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && response && (
          <p className="text-gray-800 text-sm leading-relaxed font-medium">
            {response.text}
          </p>
        )}

        {!loading && !error && !response && (
          <p className="text-gray-400 text-sm italic">
            Ask ASTRA a question or navigate to a screen to trigger a proactive insight.
          </p>
        )}
      </div>

      {/* Query input */}
      <div className="shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Ask ASTRA</p>
        
        {/* Quick queries */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {QUICK_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => { setQuery(q); }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-[#00529b] border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your financial question..."
            className="flex-1 min-w-0 text-sm px-3 py-2.5 bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={handleSubmit}
            disabled={!query.trim() || loading}
            className="shrink-0 m-1.5 px-3 py-1.5 bg-[#00529b] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors"
          >
            <Send size={12} />
            Ask
          </button>
        </div>
      </div>

      {/* Conversation history */}
      {history.length > 0 && (
        <div className="flex-1 min-h-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Conversation Log</p>
            <button
              onClick={() => { setHistory([]); setResponse(null); setError(null); }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RotateCcw size={13} />
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {history.map((entry) => (
              <div key={entry.id} className={`flex flex-col gap-1 ${entry.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`text-[10px] font-medium ${entry.type === 'user' ? 'text-gray-400' : entry.type === 'proactive' ? 'text-blue-600' : 'text-[#00529b]'}`}>
                  {entry.type === 'user' ? 'You' : entry.type === 'proactive' ? `ASTRA · Proactive · ${entry.screen}` : 'ASTRA'} · {entry.time}
                </div>
                <div className={`max-w-[85%] text-xs px-3 py-2 rounded-xl leading-relaxed ${
                  entry.type === 'user'
                    ? 'bg-gray-100 text-gray-800'
                    : entry.type === 'proactive'
                    ? 'bg-blue-50 text-blue-900 border border-blue-100'
                    : 'bg-[#00529b] text-white'
                }`}>
                  {entry.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
