import Link from 'next/link';
import { Wheat, Warehouse, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-amber-50">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">AgriToken</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
              Sepolia Testnet
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/warehouse/intake">
              <Button variant="ghost" size="sm">
                <Warehouse className="w-4 h-4 mr-1" />
                Warehouse Portal
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live on Sepolia Testnet
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Your harvest,
            <span className="text-primary"> tokenized.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Convert physical grain into a verified digital Warehouse Receipt — backed by blockchain,
            trusted by lenders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/farmer/register">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Wheat className="w-5 h-5" />
                I&apos;m a Farmer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/warehouse/intake">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Warehouse className="w-5 h-5" />
                Warehouse Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="font-semibold mb-1">1. Verify Identity</h3>
              <p className="text-sm text-muted-foreground">
                Register with your BVN for a KYC-verified Trust Profile that financial institutions
                recognize.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                <Warehouse className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-semibold mb-1">2. Grade & Weigh</h3>
              <p className="text-sm text-muted-foreground">
                Warehouse manager records weight, moisture, and Aflatoxin levels. System auto-grades
                your commodity.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-semibold mb-1">3. Mint Receipt NFT</h3>
              <p className="text-sm text-muted-foreground">
                A tamper-proof digital receipt is minted on the blockchain. Use it to access loans
                and markets.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-6 rounded-xl bg-card border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">5</p>
            <p className="text-xs text-muted-foreground mt-1">Warehouses</p>
          </div>
          <div className="text-center border-x">
            <p className="text-2xl font-bold text-primary">Sepolia</p>
            <p className="text-xs text-muted-foreground mt-1">Network</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">ERC-721</p>
            <p className="text-xs text-muted-foreground mt-1">Token Standard</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          AgriToken eWRS — Hackathon Edition · Built on Sepolia Testnet
        </p>
      </footer>
    </div>
  );
}
