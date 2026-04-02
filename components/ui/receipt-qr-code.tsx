'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ReceiptQRCodeProps {
  tokenId: string;
  /** 'full' = large display on receipt page, 'mini' = compact card on dashboard */
  size?: 'full' | 'mini';
}

export function ReceiptQRCode({ tokenId, size = 'full' }: ReceiptQRCodeProps) {
  const [url, setUrl] = useState('');

  // Build the absolute URL client-side to avoid SSR mismatch
  useEffect(() => {
    setUrl(`${window.location.origin}/receipt/${tokenId}`);
  }, [tokenId]);

  if (!url) return null;

  if (size === 'mini') {
    return (
      <div className="rounded-lg border bg-white p-1.5 shrink-0">
        <QRCodeSVG value={url} size={52} level="M" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border bg-white p-5">
      <QRCodeSVG value={url} size={160} level="M" includeMargin={false} />
      <p className="text-xs text-muted-foreground text-center">
        Scan to verify this receipt on-chain
      </p>
    </div>
  );
}
