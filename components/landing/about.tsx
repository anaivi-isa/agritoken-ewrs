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

          {/* Tokenisation flow diagram */}
          <div className="flex justify-center lg:justify-end">
            <svg
              viewBox="0 0 560 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-lg"
            >
              <defs>
                {/* Card background gradient */}
                <linearGradient id="ab-card" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15803d" stopOpacity="0.22"/>
                  <stop offset="100%" stopColor="#052e16" stopOpacity="0.55"/>
                </linearGradient>
                {/* Hex fill */}
                <radialGradient id="ab-hex" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.38"/>
                  <stop offset="100%" stopColor="#15803d" stopOpacity="0.1"/>
                </radialGradient>
                {/* NFT card gradient */}
                <linearGradient id="ab-nft" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15803d" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#052e16" stopOpacity="1"/>
                </linearGradient>
                {/* Ambient center glow */}
                <radialGradient id="ab-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#15803d" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#15803d" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* ── Background ── */}
              <rect width="560" height="420" rx="20" fill="#060f08"/>
              {/* Ambient glow */}
              <ellipse cx="280" cy="148" rx="220" ry="130" fill="url(#ab-glow)"/>
              {/* Dot grid */}
              {Array.from({ length: 9 }, (_, row) =>
                Array.from({ length: 20 }, (_, col) => (
                  <circle key={`${row}-${col}`} cx={14 + col * 28} cy={14 + row * 28} r="1" fill="#22c55e" fillOpacity="0.07"/>
                ))
              )}

              {/* ════════════════ CARD 1 — PHYSICAL ════════════════ */}
              <rect x="12" y="12" width="162" height="268" rx="13" fill="url(#ab-card)" stroke="#22c55e" strokeOpacity="0.3" strokeWidth="1.5"/>
              {/* Header chip */}
              <rect x="24" y="22" width="138" height="21" rx="6" fill="#15803d" fillOpacity="0.5"/>
              <text x="93" y="36.5" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fontWeight="700" letterSpacing="2" fill="#bbf7d0">PHYSICAL</text>

              {/* Warehouse roof */}
              <polygon points="40,90 93,52 146,90" fill="#15803d" fillOpacity="0.22" stroke="#4ade80" strokeWidth="1.5" strokeLinejoin="round"/>
              <line x1="93" y1="52" x2="93" y2="90" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.45"/>
              {/* Warehouse body */}
              <rect x="46" y="90" width="94" height="65" rx="3" fill="#15803d" fillOpacity="0.16" stroke="#4ade80" strokeWidth="1.4"/>
              {/* Door */}
              <rect x="76" y="115" width="34" height="40" rx="4" fill="#052e16" fillOpacity="0.5" stroke="#4ade80" strokeOpacity="0.4" strokeWidth="1"/>

              {/* IoT sensor — left (pulsing outer ring) */}
              <circle cx="60" cy="110" r="13" fill="none" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3">
                <animate attributeName="r" values="9;15;9" dur="2.4s" repeatCount="indefinite"/>
                <animate attributeName="strokeOpacity" values="0.25;0.05;0.25" dur="2.4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="60" cy="110" r="6" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.55"/>
              <circle cx="60" cy="110" r="2.5" fill="#4ade80" fillOpacity="0.85"/>
              {/* IoT sensor — right */}
              <circle cx="126" cy="110" r="13" fill="none" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 3">
                <animate attributeName="r" values="9;15;9" dur="2.4s" begin="1.2s" repeatCount="indefinite"/>
                <animate attributeName="strokeOpacity" values="0.25;0.05;0.25" dur="2.4s" begin="1.2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="126" cy="110" r="6" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.55"/>
              <circle cx="126" cy="110" r="2.5" fill="#4ade80" fillOpacity="0.85"/>

              {/* Grain sack — left */}
              <ellipse cx="65" cy="183" rx="20" ry="30" fill="#d97706" fillOpacity="0.55" stroke="#a0622a" strokeWidth="1.2"/>
              <ellipse cx="65" cy="158" rx="9" ry="4.5" fill="#a0622a" fillOpacity="0.7"/>
              <text x="65" y="188" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="700" fill="#fde68a" fillOpacity="0.85">Maize</text>
              {/* Grain sack — right */}
              <ellipse cx="121" cy="183" rx="20" ry="30" fill="#d97706" fillOpacity="0.55" stroke="#a0622a" strokeWidth="1.2"/>
              <ellipse cx="121" cy="158" rx="9" ry="4.5" fill="#a0622a" fillOpacity="0.7"/>
              <text x="121" y="188" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="700" fill="#fde68a" fillOpacity="0.85">Rice</text>

              {/* Data readout chip */}
              <rect x="24" y="223" width="138" height="42" rx="7" fill="#052e16" fillOpacity="0.7" stroke="#22c55e" strokeOpacity="0.18" strokeWidth="1"/>
              <text x="93" y="237" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fontWeight="600" fill="#4ade80">2,400 kg · 11% H₂O</text>
              <text x="93" y="251" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#86efac" fillOpacity="0.8">Aflatoxin 3.2 ppb  ✓ SEC</text>

              {/* ════════════════ ARROW 1 ════════════════ */}
              {/* Label above arrow */}
              <text x="187" y="130" textAnchor="middle" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#86efac" letterSpacing="1">GRADE</text>
              <text x="187" y="141" textAnchor="middle" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#86efac" letterSpacing="1">& MINT</text>
              {/* Arrow shaft */}
              <line x1="175" y1="152" x2="194" y2="152" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.7"/>
              {/* Arrowhead */}
              <polygon points="198,152 190,147 190,157" fill="#22c55e" fillOpacity="0.8"/>
              {/* Animated data packet */}
              <circle r="3" fill="#4ade80" fillOpacity="0.9">
                <animateMotion path="M175,152 L194,152" dur="1.2s" repeatCount="indefinite"/>
              </circle>
              <circle r="2" fill="#4ade80" fillOpacity="0.5">
                <animateMotion path="M175,152 L194,152" dur="1.2s" begin="0.4s" repeatCount="indefinite"/>
              </circle>

              {/* ════════════════ CARD 2 — BLOCKCHAIN ════════════════ */}
              <rect x="198" y="12" width="162" height="268" rx="13" fill="url(#ab-card)" stroke="#22c55e" strokeOpacity="0.3" strokeWidth="1.5"/>
              {/* Header chip */}
              <rect x="210" y="22" width="138" height="21" rx="6" fill="#15803d" fillOpacity="0.5"/>
              <text x="279" y="36.5" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fontWeight="700" letterSpacing="2" fill="#bbf7d0">BLOCKCHAIN</text>

              {/* Hex node — top center: cx=279, cy=88 */}
              <polygon points="301,88 290,69 268,69 257,88 268,107 290,107" fill="url(#ab-hex)" stroke="#22c55e" strokeWidth="1.6">
                <animate attributeName="strokeOpacity" values="1;0.4;1" dur="3s" repeatCount="indefinite"/>
              </polygon>
              <text x="279" y="92" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fontWeight="700" fill="#bbf7d0">0xA3F2</text>

              {/* Hex node — bottom left: cx=252, cy=148 */}
              <polygon points="274,148 263,129 241,129 230,148 241,167 263,167" fill="url(#ab-hex)" stroke="#22c55e" strokeWidth="1.6">
                <animate attributeName="strokeOpacity" values="1;0.4;1" dur="3s" begin="1s" repeatCount="indefinite"/>
              </polygon>
              <text x="252" y="152" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fontWeight="700" fill="#bbf7d0">0xF7C9</text>

              {/* Hex node — bottom right: cx=306, cy=148 */}
              <polygon points="328,148 317,129 295,129 284,148 295,167 317,167" fill="url(#ab-hex)" stroke="#22c55e" strokeWidth="1.6">
                <animate attributeName="strokeOpacity" values="1;0.4;1" dur="3s" begin="2s" repeatCount="indefinite"/>
              </polygon>
              <text x="306" y="152" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fontWeight="700" fill="#bbf7d0">0x2D8E</text>

              {/* Connector lines between hexes */}
              <line x1="269" y1="107" x2="252" y2="129" stroke="#22c55e" strokeWidth="1.4" strokeOpacity="0.55"/>
              <line x1="290" y1="107" x2="306" y2="129" stroke="#22c55e" strokeWidth="1.4" strokeOpacity="0.55"/>
              <line x1="274" y1="148" x2="284" y2="148" stroke="#22c55e" strokeWidth="1.4" strokeOpacity="0.55"/>
              {/* Glowing dots on connectors */}
              <circle cx="261" cy="118" r="2.5" fill="#4ade80" fillOpacity="0.7"/>
              <circle cx="298" cy="118" r="2.5" fill="#4ade80" fillOpacity="0.7"/>
              <circle cx="279" cy="148" r="2" fill="#4ade80" fillOpacity="0.7"/>

              {/* NFT token badge */}
              <rect x="232" y="176" width="94" height="22" rx="9" fill="#15803d" fillOpacity="0.55" stroke="#4ade80" strokeWidth="1.2" strokeOpacity="0.6"/>
              <text x="279" y="190.5" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#bbf7d0">TOKEN #2847</text>

              {/* TX hash chip */}
              <rect x="210" y="207" width="138" height="36" rx="7" fill="#052e16" fillOpacity="0.7" stroke="#22c55e" strokeOpacity="0.18" strokeWidth="1"/>
              <text x="279" y="220" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#4ade80" fillOpacity="0.75" letterSpacing="1">TX HASH</text>
              <text x="279" y="233" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#86efac">0x4f8a2c…9e3b</text>

              {/* Sepolia badge */}
              <rect x="232" y="252" width="94" height="18" rx="6" fill="#15803d" fillOpacity="0.32"/>
              <text x="279" y="264" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fontWeight="600" fill="#86efac">⛓ Sepolia</text>

              {/* ════════════════ ARROW 2 ════════════════ */}
              <text x="373" y="130" textAnchor="middle" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#86efac" letterSpacing="1">SEND</text>
              <text x="373" y="141" textAnchor="middle" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#86efac" letterSpacing="1">eWRS</text>
              <line x1="361" y1="152" x2="380" y2="152" stroke="#22c55e" strokeWidth="2" strokeOpacity="0.7"/>
              <polygon points="384,152 376,147 376,157" fill="#22c55e" fillOpacity="0.8"/>
              <circle r="3" fill="#4ade80" fillOpacity="0.9">
                <animateMotion path="M361,152 L380,152" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
              </circle>
              <circle r="2" fill="#4ade80" fillOpacity="0.5">
                <animateMotion path="M361,152 L380,152" dur="1.2s" begin="1s" repeatCount="indefinite"/>
              </circle>

              {/* ════════════════ CARD 3 — DIGITAL eWRS ════════════════ */}
              <rect x="384" y="12" width="162" height="268" rx="13" fill="url(#ab-card)" stroke="#22c55e" strokeOpacity="0.3" strokeWidth="1.5"/>
              {/* Header chip */}
              <rect x="396" y="22" width="138" height="21" rx="6" fill="#15803d" fillOpacity="0.5"/>
              <text x="465" y="36.5" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" letterSpacing="1.5" fill="#bbf7d0">DIGITAL eWRS</text>

              {/* Phone outer shell */}
              <rect x="421" y="48" width="88" height="138" rx="12" fill="#0c1f10" stroke="#4ade80" strokeWidth="1.6" strokeOpacity="0.6"/>
              {/* Notch */}
              <rect x="449" y="48" width="30" height="6" rx="3" fill="#060f08"/>
              {/* Camera dot */}
              <circle cx="464" cy="51" r="2" fill="#4ade80" fillOpacity="0.3"/>
              {/* Home bar */}
              <rect x="452" y="179" width="24" height="3" rx="1.5" fill="#4ade80" fillOpacity="0.35"/>

              {/* Phone screen with NFT receipt card */}
              <rect x="427" y="58" width="76" height="118" rx="7" fill="url(#ab-nft)"/>

              {/* Receipt card content */}
              {/* Top label */}
              <text x="465" y="71" textAnchor="middle" fontFamily="monospace" fontSize="7" fontWeight="700" letterSpacing="1.5" fill="#86efac">eWRS NFT</text>
              <line x1="427" y1="76" x2="503" y2="76" stroke="#22c55e" strokeOpacity="0.3" strokeWidth="0.8"/>

              {/* Grade A badge + verified */}
              <rect x="432" y="80" width="24" height="22" rx="5" fill="#15803d" fillOpacity="0.7" stroke="#4ade80" strokeWidth="0.8"/>
              <text x="444" y="95" textAnchor="middle" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#4ade80">A</text>
              <text x="487" y="88" textAnchor="middle" fontFamily="monospace" fontSize="6" fontWeight="700" fill="#4ade80">✓ VERIFIED</text>
              <text x="487" y="98" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#86efac" fillOpacity="0.7">ON-CHAIN</text>

              {/* Value */}
              <text x="465" y="114" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fontWeight="900" fill="#fde68a">₦2.16M</text>
              <text x="465" y="124" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#86efac" fillOpacity="0.8">2,400 kg Maize</text>
              <line x1="432" y1="129" x2="498" y2="129" stroke="#22c55e" strokeOpacity="0.2" strokeWidth="0.8"/>

              {/* QR code pattern */}
              {/* Top-left finder */}
              <rect x="436" y="133" width="10" height="10" rx="1.5" fill="none" stroke="#bbf7d0" strokeWidth="1.2" strokeOpacity="0.7"/>
              <rect x="438.5" y="135.5" width="5" height="5" rx="0.5" fill="#bbf7d0" fillOpacity="0.7"/>
              {/* Top-right finder */}
              <rect x="452" y="133" width="10" height="10" rx="1.5" fill="none" stroke="#bbf7d0" strokeWidth="1.2" strokeOpacity="0.7"/>
              <rect x="454.5" y="135.5" width="5" height="5" rx="0.5" fill="#bbf7d0" fillOpacity="0.7"/>
              {/* Bottom-left finder */}
              <rect x="436" y="149" width="10" height="10" rx="1.5" fill="none" stroke="#bbf7d0" strokeWidth="1.2" strokeOpacity="0.7"/>
              <rect x="438.5" y="151.5" width="5" height="5" rx="0.5" fill="#bbf7d0" fillOpacity="0.7"/>
              {/* Data dots */}
              <rect x="449" y="145" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>
              <rect x="453" y="149" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>
              <rect x="457" y="133" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>
              <rect x="461" y="137" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>
              <rect x="457" y="153" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>
              <rect x="463" y="149" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>
              <rect x="467" y="133" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>
              <rect x="471" y="145" width="3" height="3" fill="#bbf7d0" fillOpacity="0.55"/>

              {/* Token ID */}
              <text x="465" y="170" textAnchor="middle" fontFamily="monospace" fontSize="6" fill="#86efac" fillOpacity="0.6">#2847 · 0x8f2c…4a7d</text>

              {/* Wallet chip below phone */}
              <rect x="396" y="198" width="138" height="36" rx="7" fill="#052e16" fillOpacity="0.7" stroke="#22c55e" strokeOpacity="0.18" strokeWidth="1"/>
              <text x="465" y="211" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="#4ade80" fillOpacity="0.75" letterSpacing="1">FARMER WALLET</text>
              <text x="465" y="224" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#86efac">0x8f2c…4a7d</text>

              {/* Value pill */}
              <rect x="414" y="244" width="102" height="20" rx="8" fill="#15803d" fillOpacity="0.38" stroke="#22c55e" strokeOpacity="0.25" strokeWidth="1"/>
              <text x="465" y="257.5" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fontWeight="700" fill="#bbf7d0">₦900/kg · Grade A</text>

              {/* ════════════════ BOTTOM STEPS BAR ════════════════ */}
              <rect x="12" y="292" width="536" height="112" rx="12" fill="#0c1a0e" stroke="#22c55e" strokeOpacity="0.12" strokeWidth="1"/>
              {/* Dividers */}
              <line x1="187" y1="302" x2="187" y2="394" stroke="#22c55e" strokeOpacity="0.12" strokeWidth="1"/>
              <line x1="373" y1="302" x2="373" y2="394" stroke="#22c55e" strokeOpacity="0.12" strokeWidth="1"/>

              {/* Step 1 */}
              <text x="93" y="316" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="900" fill="#22c55e">01</text>
              <text x="93" y="333" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#bbf7d0">Deposit &amp; Grade</text>
              <text x="93" y="348" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#86efac" fillOpacity="0.7">IoT-verified intake</text>
              <text x="93" y="361" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#86efac" fillOpacity="0.7">at SEC warehouse</text>
              {/* Step 2 */}
              <text x="280" y="316" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="900" fill="#22c55e">02</text>
              <text x="280" y="333" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#bbf7d0">Mint NFT Receipt</text>
              <text x="280" y="348" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#86efac" fillOpacity="0.7">Tamper-proof token</text>
              <text x="280" y="361" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#86efac" fillOpacity="0.7">minted on-chain</text>
              {/* Step 3 */}
              <text x="466" y="316" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="900" fill="#22c55e">03</text>
              <text x="466" y="333" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#bbf7d0">Receive eWRS</text>
              <text x="466" y="348" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#86efac" fillOpacity="0.7">Digital receipt in</text>
              <text x="466" y="361" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fill="#86efac" fillOpacity="0.7">under 45 minutes</text>

              {/* Bottom tagline */}
              <text x="280" y="388" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fontWeight="600" fill="#15803d" letterSpacing="2">POWERED BY BLOCKCHAIN &amp; IoT</text>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
