import React, { useState, useEffect } from 'react';

export const StickyStartCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when scrolled past the hero section (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white border-t border-[#e5e2df] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-headline font-bold text-[#1c1c1a] leading-tight">Design & Earn</p>
          <p className="text-[10px] uppercase font-bold text-[#735c00] tracking-widest mt-0.5">Start now</p>
        </div>
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-[#1c1c1a] text-white px-6 py-3 rounded-full font-bold text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
