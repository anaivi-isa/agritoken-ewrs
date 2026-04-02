'use client';

import { useScrollReveal } from '@/components/landing/use-scroll-reveal';

const features = [
  {
    title: 'Digital Twin Framework',
    description: `Every bag of grain has a tamper-proof digital mirror on the blockchain. What's in the warehouse is exactly what's on-chain.`,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="4" width="18" height="18" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <rect x="26" y="4" width="18" height="18" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5" opacity="0.5"/>
        <rect x="4" y="26" width="18" height="18" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5" opacity="0.5"/>
        <rect x="26" y="26" width="18" height="18" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M22 13h4M24 11v4" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 35h4M24 33v4" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    badge: 'Blockchain',
  },
  {
    title: 'Smart Liens',
    description: 'Mathematically impossible to pledge the same commodity twice. Our smart contracts eliminate collateral fraud before it can happen.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 4L6 12v12c0 10 8 18.5 18 22 10-3.5 18-12 18-22V12L24 4z" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M16 24l5 5 11-11" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: 'Fraud-Proof',
  },
  {
    title: 'Instant Liquidity',
    description: 'Integrated with eNaira, NCX, and AFEX for real-time loan disbursement. No bank branch. No paperwork. Funds in 45 minutes.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M24 14v20M18 18l6-6 6 6" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 32h14" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    badge: 'eNaira',
  },
  {
    title: 'IoT-Powered Grading',
    description: 'Automated weight, moisture, and quality sensors remove human error and bias from commodity assessment. Grade is objective, always.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="20" width="32" height="18" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <circle cx="16" cy="12" r="5" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5"/>
        <circle cx="32" cy="12" r="5" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5"/>
        <path d="M16 17v3M32 17v3" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 30h20" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="30" r="2" fill="#15803d"/>
      </svg>
    ),
    badge: 'IoT',
  },
  {
    title: 'SEC-Compliant',
    description: "Fully backed by Nigeria's Investment & Securities Act 2025. Smart Licenses issued to IoT-integrated warehouses by the SEC.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="6" width="32" height="36" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M16 16h16M16 22h16M16 28h10" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="35" cy="35" r="7" fill="#15803d"/>
        <path d="M32 35l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: 'ISA 2025',
  },
  {
    title: 'Fractional Ownership',
    description: 'Retail investors can buy tokenised fractions of stored commodities. Aggregators get instant cash flow; investors get commodity-backed returns.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="16" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M24 8v16l10 6" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 24L14 30" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <circle cx="24" cy="24" r="3" fill="#15803d"/>
      </svg>
    ),
    badge: 'DeFi',
  },
];

export function LandingFeatures() {
  const ref = useScrollReveal();

  return (
    <section id="features" className="py-20 lg:py-28 bg-brand-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Platform Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark">
            Built for Trust.{' '}
            <span className="text-brand-primary italic">Designed for Farmers.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white border border-brand-light/50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-brand-cream rounded-xl">{f.icon}</div>
                <span className="text-xs font-semibold bg-brand-sand text-brand-earth px-2.5 py-1 rounded-full border border-brand-earth/20">
                  {f.badge}
                </span>
              </div>
              <h3 className="font-semibold text-brand-dark text-lg mb-2 group-hover:text-brand-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
