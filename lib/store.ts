// Lightweight localStorage-based session store
// Simulates what Privy/Supabase would handle in production

export interface FarmerSession {
  bvn: string;
  full_name: string;
  phone: string;
  bank_name: string;
  wallet_address: string;
  warehouse_id: string;
  warehouse_name: string;
  registered_at: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  capacity_tonnes: number;
  manager: string;
}

export const WAREHOUSES: Warehouse[] = [
  { id: 'wh-001', name: 'Kaduna Central Hub', location: 'Kaduna, Kaduna State', lat: 10.5222, lng: 7.4383, capacity_tonnes: 5000, manager: 'Chidi Okonkwo' },
  { id: 'wh-002', name: 'Zaria Aggregation Point', location: 'Zaria, Kaduna State', lat: 11.0856, lng: 7.7186, capacity_tonnes: 3000, manager: 'Musa Ibrahim' },
  { id: 'wh-003', name: 'Kano Grain Terminal', location: 'Kano, Kano State', lat: 12.0022, lng: 8.5920, capacity_tonnes: 8000, manager: 'Yusuf Abdullahi' },
  { id: 'wh-004', name: 'Abuja FCT Depot', location: 'Abuja, FCT', lat: 9.0579, lng: 7.4951, capacity_tonnes: 2000, manager: 'Ada Eze' },
  { id: 'wh-005', name: 'Ibadan South Hub', location: 'Ibadan, Oyo State', lat: 7.3775, lng: 3.9470, capacity_tonnes: 4000, manager: 'Lanre Adewale' },
];

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getWarehousesSortedByDistance(
  userLat: number,
  userLng: number
): (Warehouse & { distance_km: number })[] {
  return WAREHOUSES.map((w) => ({
    ...w,
    distance_km: Math.round(distanceKm(userLat, userLng, w.lat, w.lng) * 10) / 10,
  })).sort((a, b) => a.distance_km - b.distance_km);
}

export function saveFarmerSession(session: FarmerSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('agritoken_farmer', JSON.stringify(session));
}

export function getFarmerSession(): FarmerSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('agritoken_farmer');
    return raw ? (JSON.parse(raw) as FarmerSession) : null;
  } catch {
    return null;
  }
}

export function clearFarmerSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('agritoken_farmer');
}
