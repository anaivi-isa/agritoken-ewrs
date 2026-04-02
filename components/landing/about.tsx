'use client';

import { useScrollReveal } from '@/components/landing/use-scroll-reveal';

const stakeholders = [
  { icon: '🌾', label: 'Smallholder Farmers',     desc: 'Access credit without land titles' },
  { icon: '🏬', label: 'Aggregators & Warehouses', desc: 'Digitise your receipts instantly' },
  { icon: '🏦', label: 'Banks & Lenders',           desc: 'Verified, fraud-proof collateral' },
  { icon: '📋', label: 'Regulators (SEC / CBN)',     desc: 'Real-time oversight & compliance' },
];

export function LandingAbout() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-20 lg:py-28 bg-brand-cream">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Our Mission
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark leading-snug mb-6">
              Bridging the Gap Between the{' '}
              <span className="text-brand-primary italic">Farm and Finance</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5 text-lg">
              Nigeria's agricultural sector feeds millions, yet farmers remain locked out of formal
              credit — not because of risk, but because of <strong>invisible assets</strong>. A
              warehouse full of maize is worth nothing to a bank without a verifiable receipt.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              AgriToken converts physical commodities into tamper-proof digital collateral using
              blockchain and IoT-powered grading. We make the invisible, visible —
              and the untouchable, bankable.
            </p>

            {/* Stakeholder grid */}
            <div className="grid grid-cols-2 gap-4">
              {stakeholders.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-brand-light/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl mb-2 block">{s.icon}</span>
                  <p className="font-semibold text-brand-dark text-sm">{s.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative illustration */}
          <div className="flex justify-center lg:justify-end">
            <svg
              viewBox="0 0 420 560"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-sm lg:max-w-md"
            >
              {/* Blockchain hex nodes */}
              <polygon points="155,18 175,6 195,18 195,42 175,54 155,42" fill="#bbf7d0" stroke="#15803d" strokeWidth="2"/>
              <text x="175" y="33" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="600" fill="#052e16">0xA3</text>
              <line x1="196" y1="30" x2="224" y2="30" stroke="#15803d" strokeWidth="2"/>
              <polygon points="225,18 245,6 265,18 265,42 245,54 225,42" fill="#bbf7d0" stroke="#15803d" strokeWidth="2"/>
              <text x="245" y="33" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="600" fill="#052e16">0xF7</text>

              {/* Dashed connector */}
              <line x1="210" y1="55" x2="210" y2="74" stroke="#15803d" strokeWidth="2" strokeDasharray="5 3"/>
              <polyline points="197,90 210,78 223,90" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="197,100 210,88 223,100" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
              <polyline points="197,110 210,98 223,110" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>

              {/* Roof */}
              <polygon points="70,195 210,115 350,195" fill="#15803d" opacity="0.18"/>
              <polyline points="70,195 210,115 350,195" stroke="#15803d" strokeWidth="2.5" strokeLinejoin="round"/>
              <line x1="210" y1="115" x2="210" y2="195" stroke="#15803d" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>

              {/* Warehouse body */}
              <rect x="80" y="195" width="260" height="165" rx="4" fill="#15803d" opacity="0.1"/>
              <rect x="80" y="195" width="260" height="165" rx="4" stroke="#15803d" strokeWidth="2"/>

              {/* IoT sensors */}
              <circle cx="112" cy="240" r="14" fill="white" stroke="#15803d" strokeWidth="1.5" opacity="0.8"/>
              <circle cx="112" cy="240" r="7"  fill="#15803d" opacity="0.25"/>
              <circle cx="308" cy="240" r="14" fill="white" stroke="#15803d" strokeWidth="1.5" opacity="0.8"/>
              <circle cx="308" cy="240" r="7"  fill="#15803d" opacity="0.25"/>

              {/* Grain sacks */}
              <path d="M128,310 Q128,280 148,272 Q168,264 168,280 Q178,268 175,290 Q180,310 165,325 Q148,335 132,325 Z" fill="#d4a06a" stroke="#a0622a" strokeWidth="1.5"/>
              <ellipse cx="153" cy="272" rx="10" ry="5" fill="#a0622a" opacity="0.7"/>
              <path d="M252,310 Q252,280 272,272 Q292,264 292,280 Q302,268 299,290 Q304,310 289,325 Q272,335 256,325 Z" fill="#d4a06a" stroke="#a0622a" strokeWidth="1.5"/>
              <ellipse cx="277" cy="272" rx="10" ry="5" fill="#a0622a" opacity="0.7"/>

              {/* Door */}
              <rect x="183" y="255" width="54" height="105" rx="5" fill="white" stroke="#15803d" strokeWidth="1.5"/>

              {/* Connector */}
              <line x1="210" y1="360" x2="210" y2="390" stroke="#15803d" strokeWidth="2" strokeDasharray="5 3"/>

              {/* Platform */}
              <ellipse cx="210" cy="400" rx="100" ry="18" fill="#c8b99a" opacity="0.35"/>
              <polygon points="130,398 150,430 270,430 290,398" fill="#c8b99a" opacity="0.45"/>
              <ellipse cx="210" cy="430" rx="80" ry="12" fill="#b0a080" opacity="0.3"/>

              {/* Mobile phone */}
              <rect x="173" y="390" width="74" height="110" rx="12" fill="white" stroke="#15803d" strokeWidth="2"/>
              <rect x="180" y="400" width="60" height="88" rx="5" fill="#bbf7d0"/>
              <circle cx="210" cy="492" r="5" fill="#15803d" opacity="0.35"/>
              <text x="210" y="418" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="#15803d" opacity="0.7" fontWeight="600">LOAN AGREEMENT</text>
              <line x1="183" y1="422" x2="237" y2="422" stroke="#15803d" strokeWidth="0.8" opacity="0.4"/>
              <text x="190" y="436" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#052e16">eWRS</text>
              <text x="190" y="451" fontFamily="sans-serif" fontSize="9" fontWeight="600" fill="#15803d">✓ VERIFIED</text>
              <text x="190" y="465" fontFamily="sans-serif" fontSize="8" fill="#78350f">₦450,000 loan</text>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
