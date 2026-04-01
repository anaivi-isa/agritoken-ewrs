// Simulated testnet blockchain for hackathon
// Uses localStorage as the "chain" state — in production this would be
// a real ERC-721 contract on Sepolia testnet via wagmi/viem.

export interface TokenMetadata {
  token_id: string;
  farmer_name: string;
  farmer_bvn: string;
  farmer_wallet: string;
  commodity_type: 'maize' | 'rice';
  weight_kg: number;
  moisture_content: number;
  aflatoxin_ppb: number;
  grade: 'A' | 'B' | 'C' | 'REJECTED';
  warehouse_id: string;
  warehouse_name: string;
  market_value_ngn: number;
  price_per_kg: number;
  minted_at: string;
  tx_hash: string;
  block_number: number;
  network: 'Sepolia Testnet';
  contract_address: string;
  ipfs_uri: string;
}

const CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9B7e3f1A2bEf9';
const TESTNET_RPC = 'https://sepolia.infura.io/v3/demo';

function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function generateWalletAddress(): string {
  const chars = '0123456789abcdef';
  let addr = '0x';
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

function generateIpfsUri(tokenId: string): string {
  const cid = 'QmY' + tokenId + 'agritoken' + Math.random().toString(36).substring(2, 10);
  return `ipfs://${cid}`;
}

export interface MintResult {
  success: boolean;
  token: TokenMetadata;
  tx_hash: string;
  block_number: number;
}

export function mintWarehouseReceipt(
  data: Omit<
    TokenMetadata,
    'token_id' | 'tx_hash' | 'block_number' | 'minted_at' | 'network' | 'contract_address' | 'ipfs_uri' | 'farmer_wallet'
  >
): Promise<MintResult> {
  return new Promise((resolve) => {
    // Simulate block confirmation delay (2-3 seconds)
    setTimeout(
      () => {
        const token_id = (1000 + Math.floor(Math.random() * 9000)).toString();
        const tx_hash = generateTxHash();
        const block_number = 5_200_000 + Math.floor(Math.random() * 100_000);
        const farmer_wallet = generateWalletAddress();
        const ipfs_uri = generateIpfsUri(token_id);

        const token: TokenMetadata = {
          ...data,
          token_id,
          farmer_wallet,
          tx_hash,
          block_number,
          minted_at: new Date().toISOString(),
          network: 'Sepolia Testnet',
          contract_address: CONTRACT_ADDRESS,
          ipfs_uri,
        };

        // Persist to localStorage as our "chain"
        const existing = getStoredReceipts();
        existing.push(token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('agritoken_receipts', JSON.stringify(existing));
        }

        resolve({ success: true, token, tx_hash, block_number });
      },
      2500 + Math.random() * 1000
    );
  });
}

export function getStoredReceipts(): TokenMetadata[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('agritoken_receipts');
    return raw ? (JSON.parse(raw) as TokenMetadata[]) : [];
  } catch {
    return [];
  }
}

export function getReceiptById(id: string): TokenMetadata | null {
  return getStoredReceipts().find((r) => r.token_id === id) ?? null;
}

export function getReceiptsByFarmer(bvn: string): TokenMetadata[] {
  return getStoredReceipts().filter((r) => r.farmer_bvn === bvn);
}

export { CONTRACT_ADDRESS, TESTNET_RPC };
