# CLAUDE.md — AgriToken eWRS

## Project

**AgriToken eWRS** — Electronic Warehouse Receipt System (Hackathon Edition). Converts physical grain (Maize/Rice) into a digital NFT Warehouse Receipt on Sepolia testnet.

## Stack

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS** + custom shadcn-style components in `components/ui/`
- **Sonner** for toast notifications
- **Sepolia Testnet** — all blockchain operations are simulated via `lib/mock-blockchain.ts` (localStorage as chain state)

## Commands

```bash
pnpm dev        # Dev server at http://localhost:3000
pnpm build      # Production build
pnpm typecheck  # TypeScript check
pnpm lint       # ESLint
```

## Architecture

```
app/
  page.tsx                  # Landing (farmer vs warehouse portal)
  farmer/
    register/page.tsx       # 3-step KYC onboarding (BVN → Warehouse → Wallet)
    dashboard/page.tsx      # Farmer receipt portfolio
  warehouse/
    intake/page.tsx         # Manager intake wizard (identity → metrics → grade → mint)
  receipt/[id]/page.tsx     # Individual receipt detail

lib/
  mock-blockchain.ts        # Simulated testnet mint + localStorage chain state
  mock-bvn.ts               # Simulated BVN lookup (demo: 22190000001–22190000004)
  grading.ts                # Grade A/B/C logic based on moisture + aflatoxin
  store.ts                  # Farmer session (localStorage) + warehouse list
  utils.ts                  # cn, formatNaira, formatDate, generateId

components/ui/              # Button, Card, Input, Badge, Progress, Label, Select
```

## Key Logic

### Grading (lib/grading.ts)
- **Grade A**: moisture < 13% (maize) AND aflatoxin ≤ 4ppb → ₦900/kg
- **Grade B**: moisture ≤ 15% AND aflatoxin ≤ 10ppb → ₦750/kg
- **Grade C**: below B thresholds → ₦550/kg
- **REJECTED**: aflatoxin > 20ppb

### Demo BVNs
| BVN         | Name                 | Bank        |
|-------------|----------------------|-------------|
| 22190000001 | Baba Tunde Adeyemi   | Access Bank |
| 22190000002 | Aisha Mohammed       | GTBank      |
| 22190000003 | Emeka Okafor         | First Bank  |
| 22190000004 | Fatima Usman         | Zenith Bank |

## Conventions

- TypeScript strict mode
- `snake_case` for data/DB fields, `camelCase` for React props/vars
- UI components: local `components/ui/` (no external registry for this standalone repo)
- No `@ts-ignore`, no `eslint-disable` without justification

## Testnet Note

All blockchain operations are mocked. `mintWarehouseReceipt()` in `lib/mock-blockchain.ts` simulates Sepolia ERC-721 minting with a 2–3s delay and generates realistic tx hashes. Data persists in `localStorage` under `agritoken_receipts`.
