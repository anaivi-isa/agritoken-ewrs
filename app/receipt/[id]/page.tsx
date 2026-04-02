'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Wheat,
  Copy,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getReceiptById, type TokenMetadata } from '@/lib/mock-blockchain';
import { formatNaira, formatDate } from '@/lib/utils';
import { ReceiptQRCode } from '@/components/ui/receipt-qr-code';

export default function ReceiptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [receipt, setReceipt] = useState<TokenMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getReceiptById(id);
    setReceipt(found);
    setLoading(false);
  }, [id]);

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading receipt…</div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <FileText className="w-12 h-12 text-muted-foreground opacity-30" />
        <p className="text-muted-foreground">Receipt not found.</p>
        <Link href="/">
          <Button variant="outline">Go home</Button>
        </Link>
      </div>
    );
  }

  const isHighAflatoxin = receipt.aflatoxin_ppb > 10;
  const gradeColor =
    receipt.grade === 'A'
      ? 'bg-green-50 border-green-300 text-green-800'
      : receipt.grade === 'B'
        ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
        : receipt.grade === 'C'
          ? 'bg-orange-50 border-orange-300 text-orange-800'
          : 'bg-red-50 border-red-300 text-red-800';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">AgriToken</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">Receipt #{receipt.token_id}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Hero value card */}
        <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80 mb-1">Warehouse Receipt NFT</p>
              <p className="text-3xl font-bold mb-1">#{receipt.token_id}</p>
              <p className="text-sm opacity-70">{receipt.warehouse_name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatNaira(receipt.market_value_ngn)}</p>
              <p className="text-xs opacity-70">@ ₦{receipt.price_per_kg}/kg</p>
            </div>
          </div>
        </div>

        {/* Grade + status */}
        <div className="flex gap-3 flex-wrap">
          <div
            className={`flex-1 min-w-[120px] rounded-xl border p-4 text-center font-black text-4xl ${gradeColor}`}
          >
            {receipt.grade === 'REJECTED' ? '✗' : receipt.grade}
            <p className="text-sm font-semibold mt-1">
              {receipt.grade === 'REJECTED' ? 'Rejected' : `Grade ${receipt.grade}`}
            </p>
          </div>
          <Card className="flex-1 min-w-[160px]">
            <CardContent className="pt-4 pb-4 space-y-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">On-chain Verified</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {receipt.network}
              </Badge>
              {isHighAflatoxin && (
                <Badge variant="danger" className="gap-1 text-xs">
                  <AlertTriangle className="w-3 h-3" />
                  High Aflatoxin
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* QR Code */}
        <ReceiptQRCode tokenId={receipt.token_id} size="full" />

        {/* Commodity details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Commodity Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: 'Commodity', value: receipt.commodity_type.charAt(0).toUpperCase() + receipt.commodity_type.slice(1) },
              { label: 'Gross Weight', value: `${receipt.weight_kg.toLocaleString()} kg` },
              { label: 'Moisture Content', value: `${receipt.moisture_content}%` },
              {
                label: 'Aflatoxin Level',
                value: `${receipt.aflatoxin_ppb} ppb`,
                danger: isHighAflatoxin,
              },
              { label: 'Warehouse', value: receipt.warehouse_name },
              { label: 'Minted', value: formatDate(new Date(receipt.minted_at)) },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-1 border-b last:border-0">
                <span className="text-muted-foreground">{row.label}</span>
                <span className={`font-medium ${row.danger ? 'text-red-600' : ''}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Farmer details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Farmer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: 'Full Name', value: receipt.farmer_name },
              { label: 'Wallet', value: receipt.farmer_wallet, mono: true, copyable: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-1 border-b last:border-0 gap-3">
                <span className="text-muted-foreground shrink-0">{row.label}</span>
                <div className="flex items-center gap-1 min-w-0">
                  <span
                    className={`font-medium truncate ${row.mono ? 'font-mono text-xs' : ''}`}
                  >
                    {row.value}
                  </span>
                  {row.copyable && (
                    <button type="button" onClick={() => copy(row.value, row.label)}>
                      <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Blockchain details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Blockchain Record
              <Badge variant="outline" className="text-xs font-normal">
                {receipt.network}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: 'Contract', value: receipt.contract_address },
              { label: 'Tx Hash', value: receipt.tx_hash },
              { label: 'Block', value: receipt.block_number.toString() },
              { label: 'IPFS URI', value: receipt.ipfs_uri },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-1 border-b last:border-0 gap-2"
              >
                <span className="text-muted-foreground shrink-0">{row.label}</span>
                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-mono text-xs truncate max-w-[200px]">{row.value}</span>
                  <button type="button" onClick={() => copy(row.value, row.label)}>
                    <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3 pb-8">
          <Link href="/farmer/dashboard" className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Button
            className="flex-1 gap-2"
            onClick={() =>
              window.open(
                `https://sepolia.etherscan.io/tx/${receipt.tx_hash}`,
                '_blank'
              )
            }
          >
            <ExternalLink className="w-4 h-4" />
            View on Etherscan
          </Button>
        </div>
      </main>
    </div>
  );
}
