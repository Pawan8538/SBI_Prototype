import React, { useEffect } from 'react';

export default function SplashScreen({ onComplete, autoNav = true }) {
  useEffect(() => {
    if (!autoNav) return;
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete, autoNav]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-pink-500 to-yono-light flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center bg-white rounded-full w-40 h-40 shadow-xl mb-4 p-4">
        <div className="flex items-center">
          <span className="font-bold text-3xl tracking-tight bg-gradient-to-r from-pink-600 to-purple-800 bg-clip-text text-transparent mr-1.5">yono</span>
          
          {/* SBI Logo Icon */}
          <div className="w-[28px] h-[28px] rounded-full bg-[#00b5cc] flex flex-col items-center justify-center relative shadow-sm mr-1">
            <div className="w-[10px] h-[10px] rounded-full bg-white mb-[1px]"></div>
            <div className="w-[4px] h-[8px] bg-white absolute bottom-[4px]"></div>
          </div>
          
          <span className="font-bold text-3xl tracking-tight text-[#00529b]">SBI</span>
        </div>
      </div>
      <div className="text-lg opacity-90 tracking-wide">you only need one</div>
    </div>
  );
}
