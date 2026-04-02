'use client';

import { useScrollReveal } from '@/components/landing/use-scroll-reveal';

const steps = [
  {
    number: '01',
    title: 'Deposit',
    description: 'Farmer brings produce to an SEC-accredited warehouse. Intake is logged digitally with timestamp and farmer ID.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="16" width="32" height="20" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M12 16V12a8 8 0 0116 0v4" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="26" r="3" fill="#15803d"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Grade',
    description: 'IoT sensors automatically capture weight, moisture content, and quality grade — removing human error and bias.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="14" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M14 20l4 4 8-8" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="30" cy="10" r="5" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5"/>
        <path d="M28 10h4M30 8v4" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Mint',
    description: 'A Digital Twin NFT is minted — a tamper-proof blockchain record that mirrors the physical commodity exactly.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <polygon points="20,4 36,14 36,26 20,36 4,26 4,14" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M13 20h14M20 13v14" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="#15803d"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Receive',
    description: `An Electronic Warehouse Receipt (eWRS) is sent directly to the farmer's mobile device — readable even on a basic smartphone.`,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="12" y="4" width="16" height="32" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <rect x="16" y="9" width="8" height="16" rx="2" fill="white"/>
        <circle cx="20" cy="31" r="2" fill="#15803d" opacity="0.5"/>
        <path d="M17 15l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Credit',
    description: 'A smart contract automatically triggers an eNaira loan disbursement. Funds arrive in ~45 minutes — no paperwork, no queues.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="10" width="32" height="22" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.5"/>
        <path d="M4 17h32" stroke="#15803d" strokeWidth="1.5"/>
        <circle cx="12" cy="26" r="3" fill="#15803d" opacity="0.4"/>
        <rect x="20" y="23" width="12" height="5" rx="2.5" fill="#15803d" opacity="0.3"/>
      </svg>
    ),
  },
];

export function LandingHowItWorks() {
  const ref = useScrollReveal();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            The Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark leading-snug">
            From Grain to Credit
            <br />
            <span className="text-brand-primary italic">in 45 Minutes</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-light via-brand-primary to-brand-light transform lg:-translate-x-0.5" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex items-start gap-6 lg:gap-0 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="relative z-10 flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border-2 border-brand-light flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                </div>

                <div
                  className={`ml-4 lg:ml-0 lg:w-5/12 bg-brand-cream border border-brand-light/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                    i % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-brand-light select-none">
                      {step.number}
                    </span>
                    <h3 className="font-semibold text-brand-dark text-lg">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
