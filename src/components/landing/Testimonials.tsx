import React from 'react';
import { Star } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Rohan K.",
      role: "Interior Designer, Mumbai",
      content: "BuildBazaarX changed how I run my studio. I no longer have to spend hours coordinating with different vendors for ply, laminates, and hardware. Everything is sourced seamlessly, and the commissions are a great bonus.",
      rating: 5
    },
    {
      name: "Anjali S.",
      role: "Architect, Delhi",
      content: "The trade pricing is unbeatable. My clients are happy with the quality, and I am happy with the transparent pricing and on-time delivery. It's a win-win for everyone.",
      rating: 5
    },
    {
      name: "Vikram P.",
      role: "Design & Build Contractor, Bangalore",
      content: "Managing procurement for multiple sites used to be a nightmare. Now, with the unified dashboard, I can track deliveries for all my projects in one place. Highly recommended for any serious designer.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-[#e5e2df]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tight text-[#1c1c1a] mb-6">
              Trusted by top <span className="italic text-[#735c00]">designers</span>
            </h2>
            <p className="text-lg text-[#74777d]">
              Don't just take our word for it. Here is what other architects and interior designers have to say about partnering with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#fcf9f6] p-8 rounded-2xl border border-[#e5e2df] flex flex-col h-full card-hover-lift">
                <div className="flex gap-1 mb-6 text-[#735c00]">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-[#1c1c1a] leading-relaxed mb-8 flex-1 font-medium text-lg">
                  "{t.content}"
                </p>
                <div>
                  <p className="font-bold text-[#1c1c1a]">{t.name}</p>
                  <p className="text-sm text-[#74777d]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
