import { NextResponse } from 'next/server';

export interface CommodityPrice {
  name: string;
  code: string;
  price_ngn: number;
  change_pct: number;
  location?: string;
}

// Simple in-process cache — refreshes every 5 minutes
let cache: { prices: CommodityPrice[]; at: number } | null = null;
const TTL = 5 * 60 * 1000;

const GOAL = `Extract every row from the commodity prices table on this page.
Return JSON with this exact structure:
{"prices":[{"name":"Maize White","code":"MZWPLT","price_ngn":258,"change_pct":4.44,"location":"Plateau"},...]}
Rules:
- Include ALL rows shown in the table, not just a few.
- price_ngn and change_pct must be plain numbers (no ₦, %, commas or other symbols).
- location is the Nigerian city/state you can infer from the code suffix (e.g. PLT=Plateau, KAN=Kano, KAD=Kaduna, SKT=Sokoto, JIG=Jigawa, NAS=Nasarawa, TRB=Taraba, EBO=Ebonyi). Omit if unknown.
- If a commodity appears multiple times (different locations), include each row separately.`;

export async function GET() {
  // Serve from cache if still fresh
  if (cache && Date.now() - cache.at < TTL) {
    return NextResponse.json({ prices: cache.prices, cached: true });
  }

  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'TINYFISH_API_KEY not set' }, { status: 500 });
  }

  try {
    const res = await fetch('https://agent.tinyfish.ai/v1/automation/run-sse', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: 'https://ncx.com.ng/', goal: GOAL }),
      signal: AbortSignal.timeout(60_000), // 60s max for the agent
    });

    if (!res.ok) {
      throw new Error(`TinyFish responded with ${res.status}`);
    }

    // Parse the SSE stream looking for the COMPLETED event
    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let prices: CommodityPrice[] | null = null;

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
            event.status === 'COMPLETED' ||
            event.type === 'COMPLETE' ||
            event.type === 'FINAL';
          if (isComplete) {
            const result = event.result ?? event.data ?? event;
            if (Array.isArray(result?.prices)) {
              prices = result.prices;
              break outer;
            }
          }
        } catch {
          // skip malformed SSE lines
        }
      }
    }

    if (!prices?.length) {
      throw new Error('Agent returned no price data');
    }

    // Normalise: ensure numbers are numbers
    const normalised: CommodityPrice[] = prices.map((p) => ({
      name: String(p.name),
      code: String(p.code),
      price_ngn: Number(p.price_ngn),
      change_pct: Number(p.change_pct),
      ...(p.location ? { location: String(p.location) } : {}),
    }));

    cache = { prices: normalised, at: Date.now() };
    return NextResponse.json({ prices: normalised, cached: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // Return stale cache rather than a hard error, if available
    if (cache) {
      return NextResponse.json({ prices: cache.prices, cached: true, stale: true });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
