import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useTransform, motion } from 'framer-motion';
import { Reveal } from '@/components/shared/Reveal';

const AnimatedNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: 2000
  });
  
  const rounded = useTransform(springValue, (latest) => {
    return Math.round(latest).toLocaleString('en-IN') + suffix;
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export const StatsBand = () => {
  const stats = [
    { num: 5000, label: "top designers", suffix: "+" },
    { num: 100, label: "crores procured", suffix: "+" },
    { num: 12000, label: "projects completed", suffix: "+" },
    { num: 500, label: "exclusive brands", suffix: "+" },
  ];

  return (
    <section className="bg-white border-y border-[#e5e2df] py-10 md:py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Reveal width="100%">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left space-y-2 border-l-2 border-[#fcf9f6] pl-6">
                <div className="text-4xl md:text-5xl font-headline font-bold text-[#1c1c1a]">
                  {stat.num === 100 ? (
                    <>
                      <span className="text-2xl">₹</span>
                      <AnimatedNumber value={stat.num} suffix="Cr+" />
                    </>
                  ) : (
                    <AnimatedNumber value={stat.num} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-[#74777d]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:text-left">
            <p className="text-[10px] uppercase text-[#74777d]">* as on 31 Dec 2024</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
