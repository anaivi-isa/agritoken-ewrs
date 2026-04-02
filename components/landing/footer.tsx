'use client';

import Link from 'next/link';

const footerLinks = {
  Platform: [
    { label: 'Home',         href: '#home' },
    { label: 'About',        href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features',     href: '#features' },
    { label: 'Roadmap',      href: '#roadmap' },
  ],
  Company: [
    { label: 'FAQ',       href: '#faq' },
    { label: 'Contact',   href: '#contact' },
    { label: 'Press Kit', href: '#' },
    { label: 'Careers',   href: '#' },
    { label: 'Privacy',   href: '#' },
  ],
};

const socials = [
  {
    label: 'Twitter/X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
];

export function LandingFooter() {
  const handleNav = (e: React.MouseEvent, href: string) => {
    if (href === '#') return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1C8 1 3 4.5 3 8.5a5 5 0 0010 0C13 4.5 8 1 8 1z" fill="#bbf7d0"/>
                  <path d="M8 4v7" stroke="#052e16" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M5.5 7l2.5-2.5L10.5 7" stroke="#052e16" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-2xl text-white">AgriToken</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-4">
              Empowering farmers. Unlocking capital.<br />
              Nigeria's blockchain-powered warehouse receipt system.
            </p>
            <Link
              href="/portal"
              className="inline-block bg-brand-primary hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 mb-6"
            >
              Launch App →
            </Link>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-primary flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap gap-6 text-sm text-white/40">
            <span>📍 Lagos, Nigeria</span>
            <span>📧 hello@agritoken.ng</span>
            <span>📞 +234 800 AGRI 01</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© 2026 AgriToken. All rights reserved.</p>
          <p>Made with ❤️ in Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}
