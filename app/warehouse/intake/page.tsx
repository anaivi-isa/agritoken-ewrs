'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Warehouse,
  Wheat,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { WAREHOUSES } from '@/lib/store';
import { calculateGrade, calculateValue, type GradeResult } from '@/lib/grading';
import { mintWarehouseReceipt, type TokenMetadata } from '@/lib/mock-blockchain';
import { formatNaira, formatDate } from '@/lib/utils';

type Step = 1 | 2 | 3 | 4;

// Mock farmer lookup by QR / farmer ID
const DEMO_FARMERS = [
  { bvn: '22190000001', full_name: 'Baba Tunde Adeyemi', phone: '08012345678', bank_name: 'Access Bank' },
  { bvn: '22190000002', full_name: 'Aisha Mohammed', phone: '08023456789', bank_name: 'GTBank' },
  { bvn: '22190000003', full_name: 'Emeka Okafor', phone: '08034567890', bank_name: 'First Bank' },
  { bvn: '22190000004', full_name: 'Fatima Usman', phone: '08045678901', bank_name: 'Zenith Bank' },
];

export default function WarehouseIntakePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [warehouseId, setWarehouseId] = useState('');
  const [farmerBvn, setFarmerBvn] = useState('');
  const [farmerLookupState, setFarmerLookupState] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle');
  const [farmer, setFarmer] = useState<typeof DEMO_FARMERS[0] | null>(null);

  // Step 2
  const [commodityType, setCommodityType] = useState<'maize' | 'rice'>('maize');
  const [weightKg, setWeightKg] = useState('');
  const [weightLoading, setWeightLoading] = useState(false);
  const [moistureContent, setMoistureContent] = useState('');
  const [aflatoxinPpb, setAflatoxinPpb] = useState('');

  // Step 3 (grading summary)
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [totalValue, setTotalValue] = useState(0);

  // Step 4 (minting)
  const [mintState, setMintState] = useState<'idle' | 'minting' | 'done'>('idle');
  const [mintedToken, setMintedToken] = useState<TokenMetadata | null>(null);

  const warehouse = WAREHOUSES.find((w) => w.id === warehouseId);

  function lookupFarmer() {
    if (!farmerBvn.trim()) return toast.error('Enter farmer BVN or ID');
    setFarmerLookupState('loading');
    setTimeout(() => {
      const found = DEMO_FARMERS.find(
        (f) => f.bvn === farmerBvn || f.bvn.endsWith(farmerBvn)
      );
      if (found) {
        setFarmer(found);
        setFarmerLookupState('found');
        toast.success('Farmer identity verified');
      } else {
        setFarmerLookupState('not_found');
        toast.error('Farmer not found. Try: 22190000001');
      }
    }, 1200);
  }

  function simulateFetchWeight() {
    setWeightLoading(true);
    setTimeout(() => {
      const simulated = (1000 + Math.floor(Math.random() * 9000)).toString();
      setWeightKg(simulated);
      setWeightLoading(false);
      toast.success(`Scale reading: ${Number(simulated).toLocaleString()} kg`);
    }, 1500);
  }

  function handleStep1Next() {
    if (!warehouseId) return toast.error('Select warehouse');
    if (farmerLookupState !== 'found') return toast.error('Verify farmer identity first');
    setStep(2);
  }

  function handleStep2Next() {
    const weight = parseFloat(weightKg);
    const moisture = parseFloat(moistureContent);
    const aflatoxin = parseFloat(aflatoxinPpb);
    if (!weight || weight <= 0) return toast.error('Enter a valid weight');
    if (!moisture || moisture < 0) return toast.error('Enter moisture content');
    if (!aflatoxin && aflatoxin !== 0) return toast.error('Enter Aflatoxin level (0 if none)');

    const grade = calculateGrade(commodityType, moisture, aflatoxin);
    const value = calculateValue(weight, grade);
    setGradeResult(grade);
    setTotalValue(value);
    setStep(3);
  }

  async function handleMint() {
    if (!farmer || !warehouse || !gradeResult) return;
    setMintState('minting');
    setStep(4);
    try {
      const result = await mintWarehouseReceipt({
        farmer_name: farmer.full_name,
        farmer_bvn: farmer.bvn,
        commodity_type: commodityType,
        weight_kg: parseFloat(weightKg),
        moisture_content: parseFloat(moistureContent),
        aflatoxin_ppb: parseFloat(aflatoxinPpb),
        grade: gradeResult.grade,
        warehouse_id: warehouseId,
        warehouse_name: warehouse.name,
        market_value_ngn: totalValue,
        price_per_kg: gradeResult.pricePerKg,
      });
      setMintedToken(result.token);
      setMintState('done');
      toast.success(`Receipt #${result.token.token_id} minted on Sepolia`);
    } catch {
      toast.error('Minting failed — please retry');
      setMintState('idle');
      setStep(3);
    }
  }

  function reset() {
    setStep(1);
    setFarmerBvn('');
    setFarmerLookupState('idle');
    setFarmer(null);
    setWeightKg('');
    setMoistureContent('');
    setAflatoxinPpb('');
    setGradeResult(null);
    setTotalValue(0);
    setMintState('idle');
    setMintedToken(null);
  }

  const moistureVal = parseFloat(moistureContent) || 0;
  const aflatoxinVal = parseFloat(aflatoxinPpb) || 0;
  const isHighAflatoxin = aflatoxinVal > 10;
  const isCriticalAflatoxin = aflatoxinVal > 20;

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">AgriToken</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Warehouse className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Warehouse Intake</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Step indicator */}
        {step < 4 && (
          <div className="flex items-center gap-2 mb-8">
            {(['1', '2', '3'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    Number(step) > i + 1
                      ? 'bg-primary text-primary-foreground'
                      : Number(step) === i + 1
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {Number(step) > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                <span
                  className={`text-sm hidden sm:block ${Number(step) === i + 1 ? 'font-medium' : 'text-muted-foreground'}`}
                >
                  {['Identity & Logistics', 'Health Check', 'Grading & Summary'][i]}
                </span>
                {i < 2 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Identity & Logistics */}
        {step === 1 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Identity & Logistics</CardTitle>
              <CardDescription>Select warehouse and verify farmer identity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Warehouse</Label>
                <Select
                  value={warehouseId}
                  onChange={(e) => setWarehouseId(e.target.value)}
                  placeholder="Select warehouse…"
                >
                  {WAREHOUSES.map((wh) => (
                    <option key={wh.id} value={wh.id}>
                      {wh.name} — {wh.location}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmerBvn">Farmer BVN / QR Code ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="farmerBvn"
                    placeholder="e.g. 22190000001"
                    value={farmerBvn}
                    onChange={(e) => {
                      setFarmerBvn(e.target.value);
                      setFarmerLookupState('idle');
                      setFarmer(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && lookupFarmer()}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={lookupFarmer}
                    disabled={farmerLookupState === 'loading'}
                    className="shrink-0"
                  >
                    {farmerLookupState === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Lookup'
                    )}
                  </Button>
                </div>
                {farmerLookupState === 'found' && farmer && (
                  <div className="flex items-center gap-3 text-sm bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                      {farmer.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{farmer.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {farmer.phone} · {farmer.bank_name}
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                  </div>
                )}
                {farmerLookupState === 'not_found' && (
                  <p className="text-xs text-destructive">
                    Not found. Demo BVNs: 22190000001 to 22190000004
                  </p>
                )}
              </div>

              <Button className="w-full gap-2" onClick={handleStep1Next}>
                Proceed to Health Check
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Advanced Metrics */}
        {step === 2 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Health Check & Metrics</CardTitle>
              <CardDescription>
                Enter commodity details and quality readings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Commodity Type</Label>
                <Select
                  value={commodityType}
                  onChange={(e) => setCommodityType(e.target.value as 'maize' | 'rice')}
                >
                  <option value="maize">Maize</option>
                  <option value="rice">Rice</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Gross weight in kg"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    min={0}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={simulateFetchWeight}
                    disabled={weightLoading}
                    className="shrink-0 gap-1.5"
                  >
                    {weightLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Fetch Scale
                  </Button>
                </div>
              </div>

              {/* Health dials */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moisture">
                    Moisture Content (%)
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      Target &lt;{commodityType === 'maize' ? '13' : '14'}%
                    </span>
                  </Label>
                  <Input
                    id="moisture"
                    type="number"
                    step="0.1"
                    min={0}
                    max={40}
                    placeholder="e.g. 11.5"
                    value={moistureContent}
                    onChange={(e) => setMoistureContent(e.target.value)}
                    className={
                      moistureVal > (commodityType === 'maize' ? 13 : 14)
                        ? 'border-yellow-400 focus-visible:ring-yellow-400'
                        : ''
                    }
                  />
                  {moistureContent && (
                    <div
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        moistureVal < (commodityType === 'maize' ? 13 : 14)
                          ? 'bg-green-50 text-green-700'
                          : moistureVal <= 15
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {moistureVal < (commodityType === 'maize' ? 13 : 14)
                        ? '✓ Within target'
                        : moistureVal <= 15
                          ? '⚠ Slightly elevated'
                          : '✗ High moisture'}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aflatoxin">
                    Aflatoxin Level (ppb)
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      Safe &lt;4ppb
                    </span>
                  </Label>
                  <Input
                    id="aflatoxin"
                    type="number"
                    step="0.1"
                    min={0}
                    placeholder="e.g. 2.5"
                    value={aflatoxinPpb}
                    onChange={(e) => setAflatoxinPpb(e.target.value)}
                    className={
                      isHighAflatoxin
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {aflatoxinPpb && (
                    <div
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        aflatoxinVal <= 4
                          ? 'bg-green-50 text-green-700'
                          : aflatoxinVal <= 10
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {aflatoxinVal <= 4
                        ? '✓ Safe for export'
                        : aflatoxinVal <= 10
                          ? '⚠ Moderate — domestic only'
                          : isCriticalAflatoxin
                            ? '✗ CRITICAL — will be rejected'
                            : '✗ High toxicity — restricted'}
                    </div>
                  )}
                </div>
              </div>

              {isHighAflatoxin && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Aflatoxin &gt;10ppb detected.</strong>{' '}
                    {isCriticalAflatoxin
                      ? 'This commodity exceeds 20ppb and will be REJECTED from all markets.'
                      : 'This commodity is restricted from export and premium lending facilities.'}
                  </span>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button className="flex-1 gap-2" onClick={handleStep2Next}>
                  Generate Grade
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Grading summary */}
        {step === 3 && gradeResult && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Pre-Mint Summary</CardTitle>
              <CardDescription>
                Review before committing to the blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Grade badge */}
              <div
                className={`rounded-xl p-5 border-2 text-center ${
                  gradeResult.grade === 'A'
                    ? 'border-green-400 bg-green-50'
                    : gradeResult.grade === 'B'
                      ? 'border-yellow-400 bg-yellow-50'
                      : gradeResult.grade === 'REJECTED'
                        ? 'border-red-400 bg-red-50'
                        : 'border-orange-400 bg-orange-50'
                }`}
              >
                <p className="text-4xl font-black mb-1">
                  {gradeResult.grade === 'REJECTED' ? '✗' : gradeResult.grade}
                </p>
                <p className="text-lg font-bold">{gradeResult.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{gradeResult.description}</p>
              </div>

              {/* Summary table */}
              <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Farmer</span>
                  <span className="font-medium">{farmer?.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commodity</span>
                  <span className="font-medium capitalize">{commodityType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Weight</span>
                  <span className="font-medium">{parseFloat(weightKg).toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moisture</span>
                  <span className="font-medium">{moistureContent}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aflatoxin</span>
                  <span className={`font-medium ${isHighAflatoxin ? 'text-red-600' : ''}`}>
                    {aflatoxinPpb} ppb {isHighAflatoxin && '⚠'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Warehouse</span>
                  <span className="font-medium">{warehouse?.name}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="text-muted-foreground">Price per kg</span>
                  <span className="font-medium">
                    {gradeResult.pricePerKg > 0 ? `₦${gradeResult.pricePerKg}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Final Market Value</span>
                  <span className="font-bold text-primary text-lg">
                    {totalValue > 0 ? formatNaira(totalValue) : 'REJECTED'}
                  </span>
                </div>
              </div>

              {gradeResult.grade === 'REJECTED' && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  This commodity cannot be minted. Aflatoxin level is critically high.
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  className="flex-1 gap-2"
                  onClick={handleMint}
                  disabled={gradeResult.grade === 'REJECTED'}
                >
                  <Wheat className="w-4 h-4" />
                  Generate Digital Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Minting */}
        {step === 4 && (
          <Card className="animate-fade-in">
            <CardContent className="py-10 text-center space-y-4">
              {mintState === 'minting' && (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold">Minting on Sepolia…</h3>
                  <p className="text-sm text-muted-foreground">
                    Submitting to ERC-721 contract · waiting for block confirmation
                  </p>
                </>
              )}

              {mintState === 'done' && mintedToken && (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-bounce-in">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Receipt Minted!</h3>
                  <p className="text-muted-foreground text-sm">
                    Digital Receipt #{mintedToken.token_id} has been issued on Sepolia Testnet.
                  </p>

                  <div className="rounded-lg bg-muted p-4 text-left space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token ID</span>
                      <span className="font-bold">#{mintedToken.token_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Farmer</span>
                      <span className="font-medium">{mintedToken.farmer_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-bold text-primary">
                        {formatNaira(mintedToken.market_value_ngn)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Block</span>
                      <span className="font-mono text-xs">{mintedToken.block_number}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tx Hash</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs truncate max-w-[140px]">
                          {mintedToken.tx_hash.slice(0, 18)}…
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(mintedToken.tx_hash, 'Tx hash')}
                        >
                          <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network</span>
                      <Badge variant="outline" className="text-xs">
                        {mintedToken.network}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minted</span>
                      <span className="text-xs">{formatDate(new Date(mintedToken.minted_at))}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={reset} className="flex-1 gap-2">
                      <RefreshCw className="w-4 h-4" />
                      New Intake
                    </Button>
                    <Link href={`/receipt/${mintedToken.token_id}`} className="flex-1">
                      <Button className="w-full gap-2">
                        View Receipt
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
