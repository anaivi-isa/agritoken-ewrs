'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/components/landing/use-scroll-reveal';

const faqs = [
  {
    question: 'What is an Electronic Warehouse Receipt (eWRS)?',
    answer:
      'An Electronic Warehouse Receipt (eWRS) is a digital document issued by an accredited warehouse confirming that a specific quantity and quality of commodity is stored there. On AgriToken, every eWRS is minted as a blockchain record — making it tamper-proof, instantly verifiable, and usable as collateral with any integrated lender.',
  },
  {
    question: 'Do I need a smartphone to use this platform?',
    answer:
      'No. While a smartphone enhances the experience (you can view your eWRS and loan status in our app), farmers with basic feature phones can receive their warehouse receipt via SMS. Aggregators and warehouse agents handle the IoT scanning process — farmers only need to deposit their produce and share a phone number.',
  },
  {
    question: 'Is my commodity and data safe?',
    answer:
      'Yes. Physically, all accredited warehouses meet SEC-mandated security and storage standards. Digitally, your data is stored on a permissioned blockchain where only authorised parties (you, the warehouse, and your chosen lender) can access your records. No third party can modify or delete your receipt.',
  },
  {
    question: 'Which banks are integrated with the platform?',
    answer:
      'We are in active pilot discussions with tier-1 commercial banks and microfinance institutions in Nigeria. Our platform is designed to be bank-agnostic — any CBN-licensed lender can plug in via our smart contract API. We will announce integrated partners publicly in Q3 2026 as pilots go live.',
  },
  {
    question: 'Is this legally recognised in Nigeria?',
    answer:
      "Yes. AgriToken operates under Nigeria's Investment & Securities Act (ISA) 2025, which formally recognises digital warehouse receipts and blockchain-based securities. The SEC issues Smart Licenses to warehouses that meet IoT integration standards, giving our eWRS receipts the same legal standing as traditional paper receipts.",
  },
  {
    question: 'What commodities are currently supported?',
    answer:
      'Our pilot phase (Q3 2026) supports maize, sorghum, rice, and soybeans — the four highest-volume staple commodities in Nigeria. We plan to expand to sesame, cocoa, cashew, and other export crops in Phase 2 (Q1 2027) alongside secondary market launch.',
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-brand-light/60 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 lg:p-6 text-left hover:bg-brand-cream transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-brand-dark pr-4 text-sm lg:text-base leading-snug">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-brand-primary flex items-center justify-center transition-transform duration-300 ${
            isOpen ? 'rotate-45 bg-brand-primary' : 'bg-white'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke={isOpen ? 'white' : '#15803d'} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-5 lg:px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-brand-light/40 pt-4">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useScrollReveal();

  return (
    <section id="faq" className="py-20 lg:py-28 bg-brand-cream">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark">
            Frequently Asked{' '}
            <span className="text-brand-primary italic">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
