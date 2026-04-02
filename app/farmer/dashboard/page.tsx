'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Wheat,
  LogOut,
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFarmerSession, clearFarmerSession } from '@/lib/store';
import { getReceiptsByFarmer, type TokenMetadata } from '@/lib/mock-blockchain';
import { formatNaira, formatDate } from '@/lib/utils';
import { ReceiptQRCode } from '@/components/ui/receipt-qr-code';
import { useCommodityPrices } from '@/lib/use-commodity-prices';

export default function FarmerDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState(getFarmerSession());
  const [receipts, setReceipts] = useState<TokenMetadata[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const { prices: ncxPrices, loading: pricesLoading } = useCommodityPrices();

  useEffect(() => {
    if (!session) {
      router.replace('/farmer/register');
      return;
    }
    const farmerReceipts = getReceiptsByFarmer(session.bvn);
    setReceipts(farmerReceipts);
    setTotalValue(farmerReceipts.reduce((sum, r) => sum + r.market_value_ngn, 0));
  }, [session, router]);

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  }

  function handleLogout() {
    clearFarmerSession();
    router.push('/');
  }

  if (!session) return null;

  function GradeColor(grade: string) {
    if (grade === 'A') return 'success';
    if (grade === 'B') return 'warning';
    if (grade === 'C') return 'outline';
    return 'danger';
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">AgriToken</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{session.full_name}</p>
              <p className="text-xs text-muted-foreground">{session.bank_name}</p>
            </div>
            <div
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold"
            >
              {session.full_name.charAt(0)}
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* NCX Market Prices Ticker */}
      <div className="border-b bg-muted/40 overflow-hidden">
        <div className="flex items-center">
          {/* Label pill */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-r bg-background shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
              NCX Prices
            </span>
          </div>
          {/* Scrolling strip */}
          <div className="flex-1 overflow-hidden">
            {pricesLoading ? (
              <div className="flex gap-6 px-4 py-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 shrink-0 animate-pulse">
                    <div className="w-20 h-3 bg-muted-foreground/20 rounded" />
                    <div className="w-14 h-3 bg-muted-foreground/15 rounded" />
                  </div>
                ))}
              </div>
            ) : ncxPrices.length === 0 ? (
              <p className="text-xs text-muted-foreground px-4 py-2.5">
                Market data unavailable
              </p>
            ) : (
              <div className="flex animate-ticker-scroll">
                {[...ncxPrices, ...ncxPrices].map((p, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-2.5 shrink-0 border-r border-border/40">
                    <span className="text-xs font-medium text-foreground whitespace-nowrap">
                      {p.name}{p.location ? ` · ${p.location}` : ''}
                    </span>
                    <span className="text-xs font-bold text-primary whitespace-nowrap">
                      ₦{p.price_ngn.toLocaleString()}/kg
                    </span>
                    <span className={`text-xs font-semibold whitespace-nowrap ${
                      p.change_pct > 0 ? 'text-green-600' : p.change_pct < 0 ? 'text-red-500' : 'text-muted-foreground'
                    }`}>
                      {p.change_pct > 0 ? '▲' : p.change_pct < 0 ? '▼' : '–'}{' '}
                      {p.change_pct !== 0 ? `${Math.abs(p.change_pct).toFixed(1)}%` : '–'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Portfolio value banner */}
        <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <p className="text-sm opacity-80 mb-1">Estimated Portfolio Value</p>
          <p className="text-4xl font-bold mb-1">
            {totalValue > 0 ? formatNaira(totalValue) : '₦0'}
          </p>
          <p className="text-sm opacity-70">
            {receipts.length} receipt{receipts.length !== 1 ? 's' : ''} · {session.warehouse_name}
          </p>
        </div>

        {/* KYC status */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">KYC Verified</p>
                  <p className="text-xs text-muted-foreground">BVN linked · {session.bank_name}</p>
                </div>
                <Badge variant="success" className="ml-auto">
                  Verified
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-mono">0x</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">Wallet Address</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {session.wallet_address}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => copyToClipboard(session.wallet_address, 'Wallet address')}
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Receipts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Warehouse Receipts
            </h2>
            {receipts.length > 0 && (
              <span className="text-sm text-muted-foreground">{receipts.length} total</span>
            )}
          </div>

          {receipts.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Wheat className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-muted-foreground text-sm">No receipts yet.</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Visit a warehouse to deposit your grain and mint your first receipt.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {receipts.map((receipt) => (
                <Card key={receipt.token_id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start gap-4">
                      <ReceiptQRCode tokenId={receipt.token_id} size="mini" />
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">
                            Receipt #{receipt.token_id}
                          </span>
                          <Badge variant={GradeColor(receipt.grade) as any}>
                            {receipt.grade === 'REJECTED' ? 'Rejected' : `Grade ${receipt.grade}`}
                          </Badge>
                          {receipt.aflatoxin_ppb > 10 && (
                            <Badge variant="danger" className="gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              High Aflatoxin
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">
                          {receipt.commodity_type} · {receipt.weight_kg.toLocaleString()} kg ·{' '}
                          {receipt.warehouse_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(new Date(receipt.minted_at))}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                          <span className="truncate max-w-[180px]">{receipt.tx_hash}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(receipt.tx_hash, 'Tx hash')}
                          >
                            <Copy className="w-3 h-3 hover:text-foreground" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-primary">
                          {formatNaira(receipt.market_value_ngn)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₦{receipt.price_per_kg}/kg
                        </p>
                        <Link href={`/receipt/${receipt.token_id}`}>
                          <Button variant="ghost" size="sm" className="mt-2 gap-1 h-7 text-xs">
                            View
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
