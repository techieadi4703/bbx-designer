import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#1c1c1a] text-white text-center">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-headline tracking-tight mb-8">
          Ready to elevate your <span className="italic text-[#735c00]">practice?</span>
        </h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Join thousands of designers sourcing seamlessly and earning more with BuildBazaarX.
        </p>
        <button 
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="bg-[#fcf9f6] text-[#1c1c1a] px-8 py-4 rounded-full font-bold hover:bg-[#735c00] hover:text-white transition-colors"
        >
          Start your application
        </button>
      </div>
    </section>
  );
};
