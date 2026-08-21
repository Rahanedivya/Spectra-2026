import React, { useEffect, useState } from 'react';
import MandalaArt from './MandalaArt';
import WarliArt from './WarliArt';

export default function SplashScreen({ onFinish }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.3 seconds
    const timer1 = setTimeout(() => {
      setFadingOut(true);
    }, 2300);

    // Unmount / dismiss after 2.8 seconds total
    const timer2 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 bg-[#F8D8AD] text-[#332A27] font-sans transition-opacity duration-500 ease-out select-none ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      
      {/* Top Traditional Decorative Border */}
      <div className="w-full max-w-4xl pt-4">
        <div className="flex items-center justify-between opacity-80 mb-2 text-[#741C35] text-xs font-serif font-bold tracking-widest uppercase">
          <span>❖ ❖ ❖</span>
          <span>INDIAN HERITAGE & CULTURE</span>
          <span>❖ ❖ ❖</span>
        </div>
        <div className="h-1.5 w-full bg-gradient-to-r from-[#741C35] via-[#E87516] to-[#741C35] rounded-full" />
      </div>

      {/* Central Brand & Mandala Area */}
      <div className="flex flex-col items-center justify-center text-center my-auto space-y-6 max-w-md px-4">
        
        {/* Animated Mandala Art */}
        <div className="relative flex items-center justify-center animate-in zoom-in-90 duration-700">
          <MandalaArt className="w-56 h-56 sm:w-64 sm:h-64 animate-spin-slow opacity-95" color="#741C35" accentColor="#D4A72C" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#FFF8EC] border-2 border-[#741C35] flex items-center justify-center shadow-lg">
              <span className="text-3xl">🏛️</span>
            </div>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heritage text-[#741C35] tracking-tight">
            Atithya AI
          </h1>

          <p className="text-sm sm:text-base font-bold text-[#E87516] tracking-wide uppercase font-serif">
            Atithi Devo Bhava
          </p>

          <p className="text-xs sm:text-sm text-[#6F625D] font-medium italic pt-1">
            "Atithi Devo Bhava — Smart Cultural Tourism for India"
          </p>
        </div>

        {/* Subtle Pulse Progress Dots */}
        <div className="flex items-center space-x-2 pt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#741C35] animate-ping" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E87516] animate-ping delay-150" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4A72C] animate-ping delay-300" />
        </div>

      </div>

      {/* Bottom Traditional Warli Silhouette & Border */}
      <div className="w-full max-w-4xl pb-2">
        <WarliArt className="w-full h-14 mb-2 opacity-85" color="#741C35" />
        <div className="h-1.5 w-full bg-gradient-to-r from-[#741C35] via-[#E87516] to-[#741C35] rounded-full" />
        <p className="text-[10px] text-center text-[#6F625D] font-medium mt-2">
          Built for Spectra 2026 AI Innovation • Powered by Atithya AI Engine
        </p>
      </div>

    </div>
  );
}
