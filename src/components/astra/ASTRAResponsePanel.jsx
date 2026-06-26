import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';
import { Sparkles, Send, RotateCcw, AlertCircle } from 'lucide-react';
import { askASTRA } from '../../engine/useGeminiAPI';

const QUICK_QUESTIONS = [
  "What's my biggest financial risk right now?",
  "How can I improve my health score?",
  "Explain the difference between PPF and SGB",
  "Am I safe to make a big purchase this month?",
];

/**
 * ASTRAResponsePanel — AI chat interface with quick-tap questions.
 * Uses central state for chat history and auto-query from demo mode.
 */
export default function ASTRAResponsePanel() {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Watch for auto-query from demo mode
  useEffect(() => {
    if (state.autoQuery) {
      handleSubmit(state.autoQuery);
      dispatch({ type: ACTIONS.SET_AUTO_QUERY, payload: null });
    }
  }, [state.autoQuery]);

  const handleSubmit = async (presetQuery) => {
    const q = (presetQuery || query).trim();
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
    setHistory(prev => [...prev, userEntry]);

    try {
      const key = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!key) throw new Error('No API key. Add VITE_GEMINI_API_KEY to your .env file.');
      
      const text = await askASTRA(q, state.currentScreen, key);
      const astraEntry = {
        id: Date.now() + 1,
        type: 'astra',
        text,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      setHistory(prev => [...prev, astraEntry]);
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

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-md mx-auto w-full">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-purple-600" />
          <span className="font-bold text-gray-800 text-sm">Ask ASTRA</span>
        </div>
        <button
          onClick={() => { setHistory([]); setError(null); }}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Clear Chat"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Conversation history */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 scrollbar-hide flex flex-col">
        {history.length === 0 && !loading && !error && (
          <div className="m-auto text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles size={20} className="text-purple-600" />
            </div>
            <p className="text-gray-500 text-sm font-medium">How can I help you today?</p>
            <p className="text-gray-400 text-xs mt-1">Ask me about your finances, risks, or products.</p>
          </div>
        )}

        {history.map((entry) => (
          <div key={entry.id} className={`flex flex-col gap-1 ${entry.type === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`text-[10px] font-medium ${entry.type === 'user' ? 'text-gray-400' : 'text-purple-600'}`}>
              {entry.type === 'user' ? 'You' : 'ASTRA'} · {entry.time}
            </div>
            <div className={`max-w-[85%] text-xs px-3 py-2 rounded-xl leading-relaxed ${
              entry.type === 'user'
                ? 'bg-gray-100 text-gray-800 rounded-br-none'
                : 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-md shadow-purple-200 rounded-bl-none'
            }`}>
              {entry.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-1">
            <div className="bg-gray-100 rounded-xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl p-3 mt-2 mx-auto max-w-[90%]">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span className="leading-tight">{error}</span>
          </div>
        )}
      </div>

      {/* Horizontal scrolling Quick Questions */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0 flex items-center gap-2">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleSubmit(q)}
            disabled={loading}
            className="inline-block text-[11px] px-3 py-1.5 rounded-full bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white shrink-0">
        <div className="flex items-center gap-2 border border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 rounded-xl overflow-hidden bg-white transition-all shadow-sm">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a question..."
            className="flex-1 min-w-0 text-sm px-3 py-2.5 bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!query.trim() || loading}
            className="shrink-0 m-1.5 w-8 h-8 bg-purple-700 text-white rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-800 transition-colors shadow-md"
          >
            <Send size={14} className="-ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
