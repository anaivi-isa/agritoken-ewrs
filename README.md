# AgriToken eWRS — Electronic Warehouse Receipt System

> Hackathon Edition · Built on Sepolia Testnet

Convert physical grain (Maize/Rice) into a verified digital Warehouse Receipt NFT — backed by blockchain, trusted by lenders.

## Features

- **Farmer KYC Onboarding** — BVN verification, warehouse selection, auto wallet creation
- **Warehouse Intake Wizard** — Identity check, weight/moisture/aflatoxin metrics, auto-grading
- **Digital Receipt Minting** — Simulated ERC-721 NFT on Sepolia testnet
- **Farmer Dashboard** — Portfolio value, receipt history, status badges

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Flow

### As a Farmer:
1. Go to **"I'm a Farmer"** → Enter BVN `22190000001` → Verify
2. Select a warehouse → Complete registration
3. Your dashboard will show minted receipts

### As a Warehouse Manager:
1. Go to **"Warehouse Portal"**
2. Select warehouse → Enter farmer BVN `22190000001` → Lookup
3. Enter commodity metrics (weight, moisture, aflatoxin)
4. Review grade → Click **"Generate Digital Receipt"**

## Grading Rules

| Grade | Moisture | Aflatoxin | Price/kg |
|-------|----------|-----------|----------|
| A     | < 13%    | ≤ 4 ppb   | ₦900     |
| B     | ≤ 15%    | ≤ 10 ppb  | ₦750     |
| C     | > 15%    | ≤ 20 ppb  | ₦550     |
| ❌    | any      | > 20 ppb  | REJECTED |

## Tech Stack

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS** + shadcn-style UI components
- **Sepolia Testnet** (simulated via localStorage for hackathon)
- **Sonner** toasts

## Project Structure

```
app/
  page.tsx                  # Landing page
  farmer/register/          # 3-step KYC onboarding
  farmer/dashboard/         # Farmer receipt portfolio
  warehouse/intake/         # Manager intake wizard
  receipt/[id]/             # Receipt NFT detail

lib/
  mock-blockchain.ts        # Testnet simulation
  mock-bvn.ts               # BVN lookup simulation
  grading.ts                # Commodity grading logic
  store.ts                  # Session + warehouse data
```

## Environment

No environment variables needed for the hackathon build — all blockchain and BVN operations are simulated.

For production, wire up:
- `NEXT_PUBLIC_PRIVY_APP_ID` — wallet creation
- `NEXT_PUBLIC_RPC_URL` — Sepolia RPC endpoint
- `TERMII_API_KEY` — SMS notifications

---

Built for the **Tecchstars Hackathon** · AgriToken eWRS v0.1
