'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features',     href: '#features' },
  { label: 'Roadmap',      href: '#roadmap' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contact',      href: '#contact' },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#home" onClick={(e) => handleNav(e, '#home')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C8 1 3 4.5 3 8.5a5 5 0 0010 0C13 4.5 8 1 8 1z" fill="#bbf7d0"/>
                <path d="M8 4v7" stroke="#052e16" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M5.5 7l2.5-2.5L10.5 7" stroke="#052e16" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-brand-dark' : 'text-white'}`}>
              AgriToken
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-brand-primary ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="/portal"
              className="bg-brand-primary hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Launch App →
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke={scrolled ? '#052e16' : 'white'}
              strokeWidth="2" strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 shadow-xl bg-white">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="font-semibold py-3 px-4 rounded-xl hover:bg-brand-cream transition-colors text-brand-dark"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/portal"
              className="mt-3 bg-brand-primary text-white font-semibold py-3 px-4 rounded-full text-center hover:bg-green-700 transition-colors"
            >
              Launch App →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
