'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wheat, CheckCircle2, Loader2, MapPin, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select } from '@/components/ui/select';
import { lookupBvn, validateBvnFormat, type BvnRecord } from '@/lib/mock-bvn';
import {
  getWarehousesSortedByDistance,
  saveFarmerSession,
  WAREHOUSES,
  type Warehouse,
} from '@/lib/store';

type Step = 1 | 2 | 3;

export default function FarmerRegisterPage() {
  const router = useRouter();

  // Step 1 fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bvn, setBvn] = useState('');
  const [showBvn, setShowBvn] = useState(false);
  const [bvnLookupState, setBvnLookupState] = useState<'idle' | 'loading' | 'verified' | 'error'>('idle');
  const [bvnRecord, setBvnRecord] = useState<BvnRecord | null>(null);

  // Step 2 fields
  const [warehouses, setWarehouses] = useState<(Warehouse & { distance_km: number })[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  // Step state
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load warehouses sorted by distance when step 2 renders
  useEffect(() => {
    if (step === 2) {
      setLocationLoading(true);
      navigator.geolocation?.getCurrentPosition(
        (pos) => {
          const sorted = getWarehousesSortedByDistance(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setWarehouses(sorted);
          setLocationGranted(true);
          setLocationLoading(false);
        },
        () => {
          // Fallback: use Kaduna coords
          const sorted = getWarehousesSortedByDistance(10.5222, 7.4383);
          setWarehouses(sorted);
          setLocationLoading(false);
        }
      );
    }
  }, [step]);

  async function handleBvnVerify() {
    if (!validateBvnFormat(bvn)) {
      toast.error('BVN must be 11 digits');
      return;
    }
    setBvnLookupState('loading');
    const record = await lookupBvn(bvn);
    if (record) {
      setBvnRecord(record);
      setFullName(record.full_name);
      setPhone(record.phone);
      setBvnLookupState('verified');
      toast.success('BVN verified — identity confirmed');
    } else {
      setBvnLookupState('error');
      toast.error('BVN not found. Try: 22190000001');
    }
  }

  function handleStep1Next() {
    if (!fullName.trim()) return toast.error('Full name is required');
    if (!phone.trim()) return toast.error('Phone number is required');
    if (bvnLookupState !== 'verified') return toast.error('Please verify your BVN first');
    setStep(2);
  }

  function handleStep2Next() {
    if (!selectedWarehouseId) return toast.error('Please select a warehouse');
    setStep(3);
  }

  async function handleFinish() {
    setIsSubmitting(true);
    // Simulate wallet creation (Privy would do this in prod)
    await new Promise((r) => setTimeout(r, 1500));
    const warehouse = WAREHOUSES.find((w) => w.id === selectedWarehouseId)!;
    const walletAddress =
      '0x' +
      Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
    saveFarmerSession({
      bvn,
      full_name: fullName,
      phone,
      bank_name: bvnRecord!.bank_name,
      wallet_address: walletAddress,
      warehouse_id: selectedWarehouseId,
      warehouse_name: warehouse.name,
      registered_at: new Date().toISOString(),
    });
    toast.success('Registration complete!');
    router.push('/farmer/dashboard');
  }

  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-amber-50">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">AgriToken</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">Farmer Registration</span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span className={step >= 1 ? 'text-primary font-medium' : ''}>KYC & Identity</span>
            <span className={step >= 2 ? 'text-primary font-medium' : ''}>Select Warehouse</span>
            <span className={step >= 3 ? 'text-primary font-medium' : ''}>Digital Wallet</span>
          </div>
          <Progress value={progressValue} />
          <p className="text-right text-xs text-muted-foreground mt-1">Step {step} of 3</p>
        </div>

        {/* Step 1: KYC */}
        {step === 1 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Verify your identity</CardTitle>
              <CardDescription>
                Your BVN links your identity to a trusted bank record.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* BVN field */}
              <div className="space-y-2">
                <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="bvn"
                      type={showBvn ? 'text' : 'password'}
                      inputMode="numeric"
                      maxLength={11}
                      placeholder="Enter 11-digit BVN"
                      value={bvn}
                      onChange={(e) => {
                        setBvn(e.target.value.replace(/\D/g, ''));
                        setBvnLookupState('idle');
                        setBvnRecord(null);
                      }}
                      className={
                        bvnLookupState === 'verified'
                          ? 'border-green-500 focus-visible:ring-green-500'
                          : bvnLookupState === 'error'
                            ? 'border-destructive'
                            : ''
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowBvn((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showBvn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBvnVerify}
                    disabled={bvn.length !== 11 || bvnLookupState === 'loading' || bvnLookupState === 'verified'}
                    className="shrink-0"
                  >
                    {bvnLookupState === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : bvnLookupState === 'verified' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </div>
                {bvnLookupState === 'verified' && bvnRecord && (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-2 animate-fade-in">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: bvnRecord.avatar_color }}
                    >
                      {bvnRecord.avatar_initials}
                    </div>
                    <div>
                      <p className="font-medium">{bvnRecord.full_name}</p>
                      <p className="text-xs text-green-600">{bvnRecord.bank_name}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 ml-auto text-green-600" />
                  </div>
                )}
                {bvnLookupState === 'error' && (
                  <p className="text-xs text-destructive">BVN not found. Demo: try 22190000001</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Auto-filled from BVN"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  readOnly={bvnLookupState === 'verified'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={bvnLookupState === 'verified'}
                />
              </div>

              <Button className="w-full gap-2" onClick={handleStep1Next}>
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Warehouse selection */}
        {step === 2 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Select a warehouse</CardTitle>
              <CardDescription>
                Choose the accredited hub where you will deposit your grain.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {locationLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Finding closest warehouses…
                </div>
              ) : (
                <>
                  {locationGranted && (
                    <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 rounded px-2 py-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Sorted by distance from your location
                    </div>
                  )}
                  <div className="space-y-2">
                    {warehouses.map((wh) => (
                      <button
                        key={wh.id}
                        type="button"
                        onClick={() => setSelectedWarehouseId(wh.id)}
                        className={`w-full text-left rounded-lg border p-4 transition-all ${
                          selectedWarehouseId === wh.id
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{wh.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{wh.location}</p>
                            <p className="text-xs text-muted-foreground">Mgr: {wh.manager}</p>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <p className="text-sm font-medium text-primary">
                              {wh.distance_km} km
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {wh.capacity_tonnes.toLocaleString()}t cap
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button className="flex-1 gap-2" onClick={handleStep2Next}>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Wallet creation */}
        {step === 3 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Create your digital wallet</CardTitle>
              <CardDescription>
                A non-custodial wallet will be created and linked to your phone number.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div className="rounded-lg bg-muted p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Name</span>
                  <span className="font-medium">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-medium">{bvnRecord?.bank_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warehouse</span>
                  <span className="font-medium text-right">
                    {WAREHOUSES.find((w) => w.id === selectedWarehouseId)?.name}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-sm space-y-1.5">
                <p className="font-medium text-primary">What happens next</p>
                <p className="text-muted-foreground">
                  A Sepolia testnet wallet is auto-generated and linked to your BVN profile. You
                  will receive an NFT receipt for every deposit.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2" disabled={isSubmitting}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button className="flex-1 gap-2" onClick={handleFinish} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating wallet…
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
