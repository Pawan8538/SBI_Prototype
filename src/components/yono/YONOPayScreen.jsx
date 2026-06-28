import React, { useState } from 'react';
import { ArrowLeft, User, ChevronDown, EyeOff } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export default function YONOPayScreen({ onBack, onPay }) {
  const { state } = useApp();
  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto pb-10 scrollbar-hide">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#902462] to-[#3a0868] text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 active:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div className="font-medium text-lg tracking-wide">YONO Pay</div>
        </div>
      </div>

      <div className="p-4 flex-1">
        <h2 className="text-gray-800 font-medium mb-4">Payment Details</h2>

        {/* Paying To */}
        <div className="mb-6">
          <label className="text-xs text-gray-800 font-medium block mb-3">Paying to</label>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
            <span className="text-sm text-gray-600">Mummy</span>
          </div>
          <div className="flex justify-between items-center ml-12 text-sm text-gray-800">
            <div className="flex items-center gap-2">
               <span>XXXXXXXXX9482</span>
               <EyeOff size={14} className="text-purple-700" />
            </div>
            <span className="text-xs text-gray-600 font-medium">CNRB</span>
          </div>
        </div>

        {/* Paying From */}
        <div className="mb-6">
          <label className="text-xs text-gray-800 font-medium block mb-2">Paying from</label>
          <div className="border border-gray-300 rounded p-3 flex justify-between items-center mb-2">
            <span className="text-sm text-gray-700">SB A/c - XXXXXXX8202</span>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
          <div className="text-xs text-gray-600">Available Balance - ₹ {state.accountBalance.toLocaleString()}</div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="text-xs text-gray-800 font-medium block mb-1">Amount</label>
          <div className="border-b border-gray-300 pb-1 text-sm text-gray-800 font-medium">
            ₹ 1
          </div>
        </div>

        {/* Warning Text */}
        <p className="text-[10px] text-gray-400 leading-tight mb-6">
          Please note that the beneficiary account number and IFSC information will only be used for electronic fund transfer (please ensure correctness), the beneficiary name provided will not be considered as per RBI guidelines
        </p>

        {/* Limits */}
        <div className="mb-4">
          <label className="text-xs text-gray-800 font-medium block mb-1">Maximum Limit</label>
          <div className="text-sm text-gray-800">5,00,000</div>
        </div>

        {/* Purpose */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 block mb-1">Purpose</label>
          <div className="border-b border-gray-300 pb-2 flex justify-between items-center">
            <span className="text-sm text-gray-700">Transfer to family or friends</span>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
        </div>

        <p className="text-sm text-gray-800 font-medium text-center">
          You can immediately transfer up to ₹25000.
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="flex border-t border-gray-200 bg-white">
        <button onClick={onBack} className="flex-1 py-4 text-center font-medium text-gray-600 text-sm border-r border-gray-200 active:bg-gray-50">
          Back
        </button>
        <button onClick={() => onPay('1')} className="flex-1 py-4 text-center font-medium text-[#00a1d6] text-sm active:bg-gray-50">
          Pay
        </button>
      </div>
    </div>
  );
}
