'use client';

import { useEffect, useState } from 'react';
import type { CommodityPrice } from '@/app/api/commodity-prices/route';

export type { CommodityPrice };

interface State {
  prices: CommodityPrice[];
  loading: boolean;
  error: string | null;
  cached: boolean;
}

export function useCommodityPrices(): State {
  const [state, setState] = useState<State>({
    prices: [],
    loading: true,
    error: null,
    cached: false,
  });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/commodity-prices')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.error) {
          setState((s) => ({ ...s, loading: false, error: data.error }));
        } else {
          setState({ prices: data.prices ?? [], loading: false, error: null, cached: !!data.cached });
        }
      })
      .catch((e) => {
        if (!cancelled)
          setState((s) => ({ ...s, loading: false, error: e.message }));
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
