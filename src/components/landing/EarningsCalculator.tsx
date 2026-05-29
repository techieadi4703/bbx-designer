import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Reveal, RevealItem } from '@/components/shared/Reveal';

export const EarningsCalculator = () => {
  const [projectValueLakhs, setProjectValueLakhs] = useState([10]);
  const [projectsPerMonth, setProjectsPerMonth] = useState([2]);

  // Assuming an average 8% sourcing commission on material value
  const commissionRate = 0.08;
  const earnings = Math.round(projectValueLakhs[0] * 100000 * projectsPerMonth[0] * commissionRate);

  return (
    <section className="py-16 md:py-24 bg-[#1c1c1a] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline tracking-tight">
                Estimate your <span className="italic text-[#735c00]">commissions</span>
              </h2>
              <p className="text-white/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                See how much you could earn by sourcing materials through BuildBazaarX. You focus on the design, and earn a commission on every product procured for your client's project.
              </p>
            </div>

            {/* Right Column */}
            <RevealItem className="w-full lg:w-1/2">
              <div className="bg-white text-[#1c1c1a] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#e5e2df]">
                
                <div className="mb-10 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#74777d] block mb-2">Estimated Monthly Commission</span>
                  <div className="text-5xl md:text-6xl font-headline font-bold text-[#735c00]">
                    ₹{earnings.toLocaleString('en-IN')}<span className="text-2xl font-body text-[#74777d] font-normal">/month</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                      <span className="text-[#74777d] text-[10px]">Avg Material Value per Project</span>
                      <span className="text-[#1c1c1a] text-xs">₹{projectValueLakhs[0]} Lakhs</span>
                    </div>
                    <Slider 
                      value={projectValueLakhs} 
                      onValueChange={setProjectValueLakhs} 
                      min={1} 
                      max={100} 
                      step={1}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                      <span className="text-[#74777d] text-[10px]">Projects per month</span>
                      <span className="text-[#1c1c1a] text-xs">{projectsPerMonth[0]} {projectsPerMonth[0] === 1 ? 'project' : 'projects'}</span>
                    </div>
                    <Slider 
                      value={projectsPerMonth} 
                      onValueChange={setProjectsPerMonth} 
                      min={1} 
                      max={10} 
                      step={1}
                      className="py-4"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-center text-[#74777d] mt-10">
                  Estimate only. Actual commissions vary by product category and brand margins.
                </p>
              </div>
            </RevealItem>

          </div>
        </Reveal>
      </div>
    </section>
  );
};
