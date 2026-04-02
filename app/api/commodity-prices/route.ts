import { NextResponse } from 'next/server';

export interface CommodityPrice {
  name: string;
  code: string;
  price_ngn: number;
  change_pct: number;
  location?: string;
}

// ---------------------------------------------------------------------------
// Seed data — real NCX prices from the most recent scrape.
// Shown immediately on first load while TinyFish refreshes in the background.
// ---------------------------------------------------------------------------
const SEED_PRICES: CommodityPrice[] = [
  { name: 'Cocoa',       code: 'COCOND', price_ngn: 5000, change_pct: 66.67 },
  { name: 'Maize White', code: 'MZWPLT', price_ngn: 258,  change_pct: 4.44,  location: 'Plateau' },
  { name: 'Maize White', code: 'MZWKAN', price_ngn: 250,  change_pct: 3.85,  location: 'Kano' },
  { name: 'Maize White', code: 'MZWKAD', price_ngn: 242,  change_pct: 6.56,  location: 'Kaduna' },
  { name: 'Millet Gero', code: 'MLGSKT', price_ngn: 340,  change_pct: 2.86,  location: 'Sokoto' },
  { name: 'Millet Gero', code: 'MLGJIG', price_ngn: 323,  change_pct: 2.87,  location: 'Jigawa' },
  { name: 'Paddy',       code: 'PDREBO', price_ngn: 493,  change_pct: 2.71,  location: 'Ebonyi' },
  { name: 'Paddy',       code: 'PDRTRB', price_ngn: 285,  change_pct: 4.04,  location: 'Taraba' },
  { name: 'Sesame',      code: 'SESNAS', price_ngn: 1100, change_pct: 0,     location: 'Nasarawa' },
  { name: 'Sesame',      code: 'SESKAN', price_ngn: 1150, change_pct: 13.53, location: 'Kano' },
  { name: 'Sorghum',     code: 'SGWKAD', price_ngn: 266,  change_pct: 0,     location: 'Kaduna' },
  { name: 'Sorghum',     code: 'SGWYBE', price_ngn: 261,  change_pct: 0,     location: 'Yobe' },
  { name: 'Soya',        code: 'SOYKAD', price_ngn: 623,  change_pct: 12.62, location: 'Kaduna' },
  { name: 'Soya',        code: 'SOYNAS', price_ngn: 650,  change_pct: 1.22,  location: 'Nasarawa' },
];

// In-process cache — starts pre-seeded so first request is instant.
// at: 0 means stale immediately → background refresh triggers on first hit.
let cache: { prices: CommodityPrice[]; at: number } = { prices: SEED_PRICES, at: 0 };
let refreshing = false;
const TTL = 10 * 60 * 1000; // 10 minutes

// ---------------------------------------------------------------------------
// Parses the TinyFish SSE result into a CommodityPrice array.
// The agent returns event.result.result as a markdown-fenced JSON string.
// ---------------------------------------------------------------------------
function extractPrices(raw: unknown): CommodityPrice[] | null {
  if (!raw) return null;

  // Direct { prices: [...] } object
  if (typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).prices)) {
    return (raw as { prices: CommodityPrice[] }).prices;
  }

  // String (or { result: string }) containing a markdown ```json ... ``` block
  const text =
    typeof raw === 'string' ? raw
    : typeof (raw as Record<string, unknown>).result === 'string'
      ? (raw as { result: string }).result
      : null;

  if (!text) return null;

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = fenceMatch ? fenceMatch[1].trim() : text.trim();

  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed?.prices)) return parsed.prices as CommodityPrice[];
    if (Array.isArray(parsed)) return parsed as CommodityPrice[];
  } catch {
    // not valid JSON
  }
  return null;
}

// ---------------------------------------------------------------------------
// Calls TinyFish in the background and updates the cache when done.
// Fire-and-forget — callers never await this.
// ---------------------------------------------------------------------------
async function backgroundRefresh(apiKey: string) {
  if (refreshing) return;
  refreshing = true;
  try {
    const res = await fetch('https://agent.tinyfish.ai/v1/automation/run-sse', {
      method: 'POST',
      headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://ncx.com.ng/',
        goal: `Extract every commodity price row from the market table.
Return JSON: {"prices":[{"name":"Maize White","code":"MZWPLT","price_ngn":258,"change_pct":4.44,"location":"Plateau"},...]}
All rows. price_ngn and change_pct as plain numbers. location = Nigerian state inferred from code suffix (PLT=Plateau, KAN=Kano, KAD=Kaduna, SKT=Sokoto, JIG=Jigawa, NAS=Nasarawa, TRB=Taraba, EBO=Ebonyi, YBE=Yobe).`,
      }),
      signal: AbortSignal.timeout(180_000), // 3-minute ceiling
    });

    if (!res.ok) return;

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    outer: while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (!payload) continue;
        try {
          const event = JSON.parse(payload);
          const isComplete =
            event.status === 'COMPLETED' || event.type === 'COMPLETE' || event.type === 'FINAL';
          if (isComplete) {
            const prices = extractPrices(event.result ?? event.data ?? event);
            if (prices?.length) {
              const normalised: CommodityPrice[] = prices.map((p) => ({
                name: String(p.name),
                code: String(p.code),
                price_ngn: Number(p.price_ngn),
                change_pct: Number(p.change_pct),
                ...(p.location ? { location: String(p.location) } : {}),
              }));
              cache = { prices: normalised, at: Date.now() };
            }
            break outer;
          }
        } catch {
          // skip malformed SSE lines
        }
      }
    }
  } catch {
    // silently swallow errors — stale seed data is fine
  } finally {
    refreshing = false;
  }
}

// ---------------------------------------------------------------------------
// GET /api/commodity-prices
// Always returns immediately. Triggers a background TinyFish refresh when
// the cache is stale (older than TTL).
// ---------------------------------------------------------------------------
export async function GET() {
  const apiKey = process.env.TINYFISH_API_KEY;

  // Kick off a background refresh if stale and we have a key
  if (apiKey && Date.now() - cache.at >= TTL) {
    backgroundRefresh(apiKey); // intentionally NOT awaited
  }

  const isFresh = Date.now() - cache.at < TTL;
  return NextResponse.json({
    prices: cache.prices,
    cached: isFresh,
    refreshing: !isFresh && !refreshing ? false : !isFresh,
  });
}
