export type Grade = 'A' | 'B' | 'C' | 'REJECTED';

export interface GradeResult {
  grade: Grade;
  label: string;
  pricePerKg: number;
  color: string;
  description: string;
}

// Market prices per kg in Naira (simulated)
const MARKET_PRICES: Record<Grade, number> = {
  A: 900,
  B: 750,
  C: 550,
  REJECTED: 0,
};

// Grading logic based on PRD:
// Moisture target: <13% for Maize
// Aflatoxin: >10ppb = HIGH TOXICITY
export function calculateGrade(
  commodityType: 'maize' | 'rice',
  moistureContent: number,
  aflatoxinPpb: number
): GradeResult {
  // Rejected if aflatoxin is critically high
  if (aflatoxinPpb > 20) {
    return {
      grade: 'REJECTED',
      label: 'Rejected',
      pricePerKg: 0,
      color: 'red',
      description: 'Aflatoxin exceeds 20ppb — unsafe for all markets.',
    };
  }

  const moistureThreshold = commodityType === 'maize' ? 13 : 14;

  if (moistureContent < moistureThreshold && aflatoxinPpb <= 4) {
    return {
      grade: 'A',
      label: 'Grade A',
      pricePerKg: MARKET_PRICES.A,
      color: 'green',
      description: 'Premium — eligible for export and all lending facilities.',
    };
  }

  if (moistureContent <= moistureThreshold + 2 && aflatoxinPpb <= 10) {
    return {
      grade: 'B',
      label: 'Grade B',
      pricePerKg: MARKET_PRICES.B,
      color: 'yellow',
      description: 'Standard — eligible for domestic markets and most loans.',
    };
  }

  return {
    grade: 'C',
    label: 'Grade C',
    pricePerKg: MARKET_PRICES.C,
    color: 'orange',
    description: 'Below standard — restricted from export and premium loans.',
  };
}

export function calculateValue(weightKg: number, grade: GradeResult): number {
  return weightKg * grade.pricePerKg;
}
