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
      <div className="text-4xl font-bold mb-4 flex items-center tracking-tight">
        yono <div className="w-6 h-6 bg-white rounded-full mx-2"></div> SBI
      </div>
      <div className="text-lg opacity-90 tracking-wide">you only need one</div>
    </div>
  );
}
