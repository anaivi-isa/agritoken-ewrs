'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/components/landing/use-scroll-reveal';

const initialForm = { name: '', email: '', role: '', message: '' };

export function LandingContact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useScrollReveal();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.role)           e.role    = 'Please select your role';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-brand-dark relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(187,247,208,0.3) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <span className="inline-block bg-white/10 text-brand-light text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-white/20">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-snug mb-4">
            Ready to Unlock Your{' '}
            <span className="text-brand-light italic">Harvest's Value?</span>
          </h2>
          <p className="text-white/60 text-lg">
            Join the waitlist and be first to access AgriToken when we launch.
          </p>
        </div>

        {submitted ? (
          <div className="bg-brand-primary/20 border border-brand-light/40 backdrop-blur-sm rounded-3xl p-10 text-center">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l6 6 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
            <p className="text-brand-light/80">Thanks! We'll be in touch soon with early access details.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-brand-light/60 text-sm underline hover:text-brand-light transition-colors"
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-10 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">Full Name</label>
              <input
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Amaka Okonkwo"
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors ${
                  errors.name ? 'border-red-400' : 'border-white/20 focus:border-brand-primary'
                }`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors ${
                  errors.email ? 'border-red-400' : 'border-white/20 focus:border-brand-primary'
                }`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">I am a…</label>
              <select
                name="role" value={form.role} onChange={handleChange}
                className={`w-full bg-brand-dark border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors appearance-none cursor-pointer ${
                  errors.role ? 'border-red-400' : 'border-white/20 focus:border-brand-primary'
                } ${form.role === '' ? 'text-white/30' : 'text-white'}`}
              >
                <option value="" disabled>Select your role</option>
                <option value="Farmer">Farmer</option>
                <option value="Aggregator">Aggregator</option>
                <option value="Bank">Bank / Lender</option>
                <option value="Investor">Investor</option>
                <option value="Other">Other</option>
              </select>
              {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-1.5">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} rows={4}
                placeholder="Tell us about your use case or ask a question…"
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors resize-none ${
                  errors.message ? 'border-red-400' : 'border-white/20 focus:border-brand-primary'
                }`}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-900/40 text-base"
            >
              Submit — Get Early Access
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
