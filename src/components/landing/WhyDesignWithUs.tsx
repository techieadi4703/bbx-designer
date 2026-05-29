import React from 'react';
import { Reveal } from '@/components/shared/Reveal';
import { CheckCircle2 } from 'lucide-react';

export const WhyDesignWithUs = () => {
  const benefits = [
    {
      title: "Trade-only Pricing",
      desc: "Unlock exclusive trade discounts up to 30% off retail pricing on top furniture, lighting, and material brands.",
    },
    {
      title: "Unified Procurement",
      desc: "Stop chasing multiple vendors. Manage all your sourcing, quotations, and deliveries from a single dashboard.",
    },
    {
      title: "Guaranteed Logistics",
      desc: "White-glove delivery straight to your project site. We handle the damages, returns, and tracking so you don't have to.",
    },
    {
      title: "Earn Commisions",
      desc: "Earn high sourcing commissions on every product you procure through the platform, adding a new revenue stream.",
    }
  ];

  return (
    <section className="py-24 bg-[#fcf9f6] relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tight text-[#1c1c1a] mb-6">
              Spend more time designing. <br />We'll handle the rest.
            </h2>
            <p className="text-lg text-[#74777d]">
              BuildBazaarX empowers you to focus on your creative vision while we streamline your entire procurement process.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 text-[#735c00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1c1c1a] mb-2">{b.title}</h3>
                  <p className="text-[#74777d] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
