'use client';

import { useScrollReveal } from '@/components/landing/use-scroll-reveal';

const phases = [
  {
    phase: 'Phase 1',
    date: 'Q3 2026',
    title: 'Digital Registry',
    dotColor: 'bg-brand-primary',
    borderColor: 'border-brand-primary',
    badgeBg: 'bg-brand-light',
    badgeText: 'text-brand-primary',
    description:
      'Migrate all paper warehouse receipts to a Distributed Ledger Technology (DLT) registry. The SEC issues Smart Licenses exclusively to IoT-integrated warehouses that meet grading and security standards.',
    milestones: ['DLT Registry live', 'SEC Smart License framework', 'Pilot with 5,000 aggregators', 'eWRS mobile app launch'],
  },
  {
    phase: 'Phase 2',
    date: 'Q1 2027',
    title: 'Secondary Market',
    dotColor: 'bg-brand-earth',
    borderColor: 'border-brand-earth',
    badgeBg: 'bg-brand-sand',
    badgeText: 'text-brand-earth',
    description:
      'Enable fractional ownership of warehouse receipts so retail investors can access commodity-backed tokens. Aggregators unlock immediate cash flow without waiting for harvest season.',
    milestones: ['Fractional token marketplace', 'Retail investor onboarding', 'NCX & AFEX integration', 'CBN eNaira smart contract'],
  },
  {
    phase: 'Phase 3',
    date: 'Q3 2027',
    title: 'Export Linkage',
    dotColor: 'bg-brand-dark',
    borderColor: 'border-brand-dark',
    badgeBg: 'bg-brand-light/40',
    badgeText: 'text-brand-dark',
    description:
      'Integrate with international shipping blockchains for end-to-end traceability of Nigerian agricultural exports to Europe and the United States — opening premium markets to verified Nigerian commodities.',
    milestones: ['Global shipping chain integration', 'EU & US export traceability', 'Premium buyer marketplace', 'Cross-border settlement'],
  },
];

export function LandingRoadmap() {
  const ref = useScrollReveal();

  return (
    <section id="roadmap" className="py-20 lg:py-28 bg-white">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Roadmap
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark leading-snug">
            Our Path to Transforming{' '}
            <span className="text-brand-primary italic">Nigerian Agriculture</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary via-brand-earth to-brand-dark" />

          <div className="space-y-12">
            {phases.map((p, i) => (
              <div key={p.phase} className="relative flex gap-8">
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <div className={`w-10 h-10 rounded-full ${p.dotColor} flex items-center justify-center shadow-md`}>
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                </div>

                <div className={`flex-1 border-l-4 ${p.borderColor} bg-brand-cream rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${p.badgeBg} ${p.badgeText}`}>
                      {p.phase}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 bg-white border border-gray-200 px-3 py-1 rounded-full">
                      {p.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{p.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {p.milestones.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
