import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';

import { DesignerHero } from '@/components/landing/DesignerHero';
import { StatsBand } from '@/components/landing/StatsBand';
import { WhyDesignWithUs } from '@/components/landing/WhyDesignWithUs';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { EarningsCalculator } from '@/components/landing/EarningsCalculator';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { StickyStartCTA } from '@/components/landing/StickyStartCTA';

export default function Landing() {
  return (
    <Layout>
      <Helmet>
        <title>Design with BuildBazaarX — India's premium sourcing platform for Designers</title>
        <meta name="description" content="Join 5,000+ top interior designers and architects. Seamless sourcing, trade pricing, and high commissions." />
        <meta property="og:title" content="Design with BuildBazaarX" />
        <meta property="og:description" content="Seamless sourcing, trade pricing, and high commissions for verified interior designers and architects across India." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://designer.buildbazaarx.com/" />
      </Helmet>

      <main className="relative bg-[#fcf9f6] w-full overflow-hidden text-[#1c1c1a]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap');
          .font-headline { font-family: 'Newsreader', serif; }
          .font-body { font-family: 'Manrope', sans-serif; }
        `}</style>
        
        <DesignerHero />
        <StatsBand />
        <WhyDesignWithUs />
        <HowItWorks />
        <EarningsCalculator />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <StickyStartCTA />
      </main>
    </Layout>
  );
}
