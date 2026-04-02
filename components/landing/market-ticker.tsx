'use client';

import { useCommodityPrices } from '@/lib/use-commodity-prices';

function SkeletonPill() {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 shrink-0 animate-pulse">
      <div className="space-y-1.5">
        <div className="w-24 h-3 bg-white/10 rounded"/>
        <div className="w-14 h-2.5 bg-white/5 rounded"/>
      </div>
      <div className="space-y-1.5 text-right">
        <div className="w-20 h-3 bg-white/10 rounded"/>
        <div className="w-10 h-2.5 bg-white/5 rounded"/>
      </div>
    </div>
  );
}

export function LandingMarketTicker() {
  const { prices, loading, cached } = useCommodityPrices();

  // Duplicate for seamless loop
  const doubled = [...prices, ...prices];

  return (
    <section className="bg-brand-dark border-y border-white/8 py-7 overflow-hidden">
      {/* Header row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"/>
          </span>
          <span className="text-brand-light text-xs font-bold tracking-widest uppercase">
            Live NCX Market Prices
          </span>
        </div>
        <span className="text-white/30 text-xs hidden sm:block">
          {cached ? 'Cached · ' : ''}Sourced from ncx.com.ng · refreshes every 5 min
        </span>
      </div>

      {/* Ticker strip */}
      {loading ? (
        <div className="flex gap-4 px-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonPill key={i}/>)}
        </div>
      ) : prices.length === 0 ? (
        <p className="text-center text-white/30 text-sm py-2">
          Market data unavailable — check back shortly.
        </p>
      ) : (
        <div className="flex overflow-hidden">
          <div className="flex gap-4 animate-ticker-scroll">
            {doubled.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-xl px-5 py-3 shrink-0 hover:bg-white/8 transition-colors"
              >
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{p.name}</p>
                  <p className="text-white/35 text-xs font-mono mt-0.5">
                    {p.code}{p.location ? ` · ${p.location}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-brand-light font-bold text-sm">
                    ₦{p.price_ngn.toLocaleString()}<span className="text-white/40 font-normal text-xs">/kg</span>
                  </p>
                  <p className={`text-xs font-semibold mt-0.5 ${p.change_pct > 0 ? 'text-green-400' : p.change_pct < 0 ? 'text-red-400' : 'text-white/30'}`}>
                    {p.change_pct > 0 ? '▲' : p.change_pct < 0 ? '▼' : '–'}{' '}
                    {p.change_pct !== 0 ? `${Math.abs(p.change_pct).toFixed(1)}%` : 'Unchanged'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
