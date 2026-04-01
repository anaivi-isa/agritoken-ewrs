// Simulated BVN lookup database for hackathon demo

export interface BvnRecord {
  bvn: string;
  full_name: string;
  phone: string;
  bank_name: string;
  account_number: string;
  avatar_initials: string;
  avatar_color: string;
}

const BVN_DATABASE: BvnRecord[] = [
  {
    bvn: '22190000001',
    full_name: 'Baba Tunde Adeyemi',
    phone: '08012345678',
    bank_name: 'Access Bank',
    account_number: '0123456789',
    avatar_initials: 'BT',
    avatar_color: '#16a34a',
  },
  {
    bvn: '22190000002',
    full_name: 'Aisha Mohammed',
    phone: '08023456789',
    bank_name: 'GTBank',
    account_number: '0234567890',
    avatar_initials: 'AM',
    avatar_color: '#ca8a04',
  },
  {
    bvn: '22190000003',
    full_name: 'Emeka Okafor',
    phone: '08034567890',
    bank_name: 'First Bank',
    account_number: '0345678901',
    avatar_initials: 'EO',
    avatar_color: '#1d4ed8',
  },
  {
    bvn: '22190000004',
    full_name: 'Fatima Usman',
    phone: '08045678901',
    bank_name: 'Zenith Bank',
    account_number: '0456789012',
    avatar_initials: 'FU',
    avatar_color: '#7c3aed',
  },
];

export function lookupBvn(bvn: string): Promise<BvnRecord | null> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const record = BVN_DATABASE.find((r) => r.bvn === bvn) ?? null;
      resolve(record);
    }, 1500);
  });
}

export function validateBvnFormat(bvn: string): boolean {
  return /^\d{11}$/.test(bvn);
}
