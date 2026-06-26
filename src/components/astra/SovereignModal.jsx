import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { ACTIONS } from '../../store/appReducer';
import { AUTORUN_LOGS } from '../../engine/logMessages';
import products from '../../data/products.json';
import { X, Check, Shield, Landmark, Coins, Baby, Pencil } from 'lucide-react';

/**
 * SovereignModal — 3-step modal for the 1-click auto-run flow
 * Step 1: Product selection (PPF/SGB/SSY cards)
 * Step 2: Pydantic validation animation
 * Step 3: Success confirmation
 */
export default function SovereignModal() {
  const { state, dispatch } = useApp();
  
  if (!state.modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        style={{ animation: 'modalSlideUp 0.35s ease-out' }}
      >
        <style>{`
          @keyframes modalSlideUp {
            from { transform: translateY(40px); opacity: 0; }
            to   { transform: translateY(0); opacity: 1; }
          }
          @keyframes checkScale {
            0%   { transform: scale(0); }
            60%  { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}</style>

        {state.modalStep === 'products' && <ProductsView />}
        {state.modalStep === 'validating' && <ValidatingView />}
        {state.modalStep === 'success' && <SuccessView />}
      </div>
    </div>
  );
}

function ProductsView() {
  const { state, dispatch } = useApp();
  const selectedProduct = state.selectedProduct;

  const intercept = {
    home: { productId: 'PPF', amount: 5000 },
    deposits: { productId: 'SGB', amount: 3000 },
    investments: { productId: 'SGB', amount: 3000 },
    loans: { productId: 'PPF', amount: 5000 },
  };

  const ctx = intercept[state.interceptType] || intercept.home;

  const handleConfirm = () => {
    dispatch({ type: ACTIONS.SET_MODAL_STEP, payload: 'validating' });
    dispatch({ type: ACTIONS.SET_ALLOCATED_AMOUNT, payload: amount });
  };

  const [amount, setAmount] = useState(ctx.amount);

  const selected = products.find(p => p.id === selectedProduct);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-4 flex items-center justify-between">
        <div>
          <p className="text-purple-200 text-xs font-mono">L8 · Sovereign Product Bus</p>
          <h3 className="text-white font-bold text-base mt-0.5">Select Sovereign Product</h3>
        </div>
        <button
          onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}
          className="text-purple-300 hover:text-white transition-colors p-1"
        >
          <X size={18} />
        </button>
      </div>

      {/* Product cards */}
      <div className="p-4 space-y-3">
        {products.map(product => {
          const isSelected = selectedProduct === product.id;
          const isRecommended = product.id === ctx.productId;
          return (
            <button
              key={product.id}
              onClick={() => dispatch({ type: ACTIONS.SELECT_PRODUCT, payload: product.id })}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-purple-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {product.icon === 'Landmark' && <Landmark size={24} className="text-purple-600" />}
                    {product.icon === 'Coins' && <Coins size={24} className="text-purple-600" />}
                    {product.icon === 'Baby' && <Baby size={24} className="text-purple-600" />}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-purple-700 font-bold text-sm">{product.rate}</span>
                      <span className="text-gray-400 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{product.tenor}</span>
                    </div>
                  </div>
                </div>
                {isRecommended && (
                  <span className="text-[9px] font-bold bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                    ✓ ASTRA Recommends
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                  {product.tag}
                </span>
              </div>
              <p className="text-xs text-gray-400 italic mt-1.5">{product.astraReason}</p>
            </button>
          );
        })}
      </div>

      {/* Confirm button and Input */}
      <div className="px-4 pb-4">
        <div className="mb-4 bg-gray-50 rounded-xl p-3 border border-gray-200">
          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 block">Allocation Amount</label>
          <div className="flex items-center">
            <span className="text-xl text-gray-400 font-medium mr-1">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-transparent text-xl font-bold text-gray-800 w-full outline-none"
            />
            <Pencil size={16} className="text-gray-400" />
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-300/40 active:opacity-90 transition-opacity"
        >
          <Shield size={16} />
          Confirm Auto-Allocation → ₹{amount.toLocaleString()} to {selectedProduct}
        </button>
      </div>
    </>
  );
}

function ValidatingView() {
  const { state, dispatch } = useApp();
  const [steps, setSteps] = useState([
    { label: 'Checking balance sufficiency...', status: 'pending' },
    { label: 'Pydantic schema validation...', status: 'hidden' },
    { label: 'Sovereign route mapping...', status: 'hidden' },
  ]);

  useEffect(() => {
    const timeouts = [];

    // Step 1 appears immediately (already pending)
    // Step 1 passes at 500ms
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === 0 ? { ...s, status: 'pass' } : s));
    }, 500));

    // Step 2 appears at 600ms
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === 1 ? { ...s, status: 'pending' } : s));
    }, 600));

    // Step 2 passes at 1100ms
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === 1 ? { ...s, status: 'pass' } : s));
    }, 1100));

    // Step 3 appears at 1200ms
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === 2 ? { ...s, status: 'pending' } : s));
    }, 1200));

    // Step 3 passes at 1700ms
    timeouts.push(setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === 2 ? { ...s, status: 'pass' } : s));
    }, 1700));

    // Advance to success at 1800ms
    timeouts.push(setTimeout(() => {
      dispatch({ type: ACTIONS.SET_MODAL_STEP, payload: 'success' });
      dispatch({ type: ACTIONS.ADD_LOG_LINES, payload: AUTORUN_LOGS() });
      dispatch({ type: ACTIONS.SET_ALLOCATION_COMPLETE, payload: true });
      dispatch({ type: ACTIONS.SET_ALERT_COUNT, payload: 0 });
      dispatch({ type: ACTIONS.SET_HEALTH_SCORE, payload: 74 });
    }, 2200));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <p className="text-xs font-mono text-purple-600 mb-1">L7 · Pydantic Guard</p>
        <h3 className="text-gray-800 font-bold text-lg">Validating Transaction</h3>
      </div>
      <div className="space-y-4">
        {steps.map((step, i) => (
          step.status !== 'hidden' && (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                step.status === 'pass'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
              style={{ animation: 'modalSlideUp 0.3s ease-out' }}
            >
              {step.status === 'pending' && (
                <div className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
              )}
              {step.status === 'pass' && (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <span className={`text-sm font-medium ${
                step.status === 'pass' ? 'text-green-800' : 'text-gray-600'
              }`}>
                {step.label}
                {step.status === 'pass' && (
                  <span className="text-green-600 font-bold ml-2">PASS</span>
                )}
              </span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function SuccessView() {
  const { state, dispatch } = useApp();
  const selected = products.find(p => p.id === state.selectedProduct);

  return (
    <div className="p-8 text-center">
      {/* Animated checkmark */}
      <div
        className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-4"
        style={{ animation: 'checkScale 0.5s ease-out' }}
      >
        <Check size={32} className="text-white" strokeWidth={3} />
      </div>

      <h3 className="text-gray-800 font-bold text-lg mb-1">
        ₹{(state.allocatedAmount || selected?.recommendedAmount || 5000).toLocaleString()} allocated to {state.selectedProduct}
      </h3>
      
      <div className="text-sm text-gray-500 space-y-1 mb-4">
        <p>Account: XXXXXXXX8202</p>
        <p>Reference: ASTRA-{state.selectedProduct}-2026-0001</p>
      </div>

      {/* Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
        <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
          ✓ Pydantic Validated
        </span>
        <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
          ✓ Gov. Guaranteed
        </span>
        <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
          ✓ Tax-Free
        </span>
      </div>

      <button
        onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}
        className="bg-gray-100 text-gray-700 font-semibold px-8 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
      >
        Close
      </button>
    </div>
  );
}
