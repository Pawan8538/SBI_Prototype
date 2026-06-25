import React, { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';

export default function TransactionSuccess({ onDone }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-gray-100 flex flex-col relative">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#902462] to-[#3a0868] text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="font-medium text-lg tracking-wide">Enter OTP</div>
        <button onClick={onDone} className="p-1 border border-white/30 rounded-full">
          <X size={16} className="text-white/70" />
        </button>
      </div>

      <div className="bg-white p-4 flex-1">
        <p className="text-sm text-gray-800 mb-6 leading-tight">
          We have sent an OTP to your mobile number XXXXXX2243 registered with SBI. Please enter the OTP and proceed.
        </p>
        
        <div className="border-b border-gray-300 pb-2 mb-2 text-xl tracking-widest text-gray-800">
          ......
        </div>
        
        <div className="text-right text-xs text-purple-700 font-medium mb-10">
          Resend OTP
        </div>
      </div>
      
      {/* Bottom Text & Button */}
      <div className="p-4 bg-gray-100 flex flex-col items-center justify-end h-40 shrink-0">
         <p className="text-[10px] text-gray-500 text-center mb-4 leading-tight px-4">
           If your phone number is different from SBI records, Please visit an SBI branch to update the phone number
         </p>
         <button className="w-full py-3 bg-white text-[#00a1d6] opacity-50 font-medium text-sm rounded shadow-sm border border-gray-200" disabled>
           Next
         </button>
      </div>

      {/* SUCCESS MODAL OVERLAY */}
      {showModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded p-6 w-full max-w-[320px] flex flex-col items-center text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full border-2 border-[#00a1d6] flex items-center justify-center mb-4">
              <Check size={32} className="text-[#00a1d6]" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction is successful!</h3>
            <p className="text-sm text-gray-800 mb-8 leading-relaxed">
              You have paid ₹ 1.00<br/>
              successfully to Mummy.<br/>
              Remaining Balance in A/c<br/>
              XXXXXXX8202 is ₹ 98.55.
            </p>
            <div className="w-full border-t border-gray-200 pt-4">
              <button onClick={onDone} className="text-[#00a1d6] font-medium text-sm w-full outline-none">
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
