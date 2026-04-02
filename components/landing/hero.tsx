'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function LandingHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(187,247,208,0.08) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }}
    >
      {/* Decorative glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-earth/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-brand-light text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Agritech · Blockchain · Nigeria
        </div>

        {/* Heading */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Turn Your Harvest
          <br />
          <span className="text-brand-light italic">Into Capital</span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Nigerian farmers can now unlock credit in{' '}
          <span className="text-brand-light font-semibold">45 minutes</span> using
          stored commodities as digital collateral — powered by blockchain and IoT.
        </p>

        {/* Stat pills */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { label: '$2.5B Credit Gap',         icon: '📉' },
            { label: '5,000 Pilot Aggregators',  icon: '🌾' },
            { label: '45-Min Deposit to Credit', icon: '⚡' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              <span>{stat.icon}</span>
              {stat.label}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            href="/portal"
            className="bg-brand-primary hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-green-900/40 transition-all duration-200 text-base"
          >
            Launch App →
          </Link>
          <a
            href="#how-it-works"
            onClick={(e) => handleScroll(e, '#how-it-works')}
            className="border-2 border-white/40 hover:border-white/80 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base backdrop-blur-sm"
          >
            See How It Works →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="animate-bounce">
          <path d="M8 0v16M1 10l7 8 7-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
