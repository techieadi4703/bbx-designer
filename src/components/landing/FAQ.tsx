import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is there a fee to join BuildBazaarX as a designer?",
      a: "No, joining BuildBazaarX as a verified designer or architect is completely free. There are no subscription fees or hidden charges."
    },
    {
      q: "How do I earn commissions?",
      a: "You earn a commission on every product you source through the platform for your clients. The commission percentage varies by brand and category, and earnings are paid out weekly directly to your bank account."
    },
    {
      q: "Who handles the delivery and logistics?",
      a: "BuildBazaarX handles all logistics. We provide white-glove delivery to your project site and take care of tracking, damages, and returns."
    },
    {
      q: "Are the prices competitive?",
      a: "Yes! Because of our scale, we negotiate exclusive trade pricing directly with manufacturers, ensuring you get better rates than standard retail pricing."
    },
    {
      q: "How do I get verified?",
      a: "Simply sign up with your phone number and provide basic details about your design practice. Our team will quickly review your application and approve your account within 24 hours."
    }
  ];

  return (
    <section className="py-24 bg-[#fcf9f6]">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tight text-[#1c1c1a]">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white border ${openIndex === i ? 'border-[#735c00]' : 'border-[#e5e2df]'} rounded-xl overflow-hidden transition-colors duration-300`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-[#1c1c1a] pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#74777d] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[#74777d] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
