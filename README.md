# Hacktropica (Tropical Web3 Philanthropy)

### *Where Compassion Meets the Blockchain.*

Hacktropica is a high-end, cinematic philanthropy platform built on the **Solana** blockchain. It empowers NGOs to raise funds transparently and enables donors to support causes globally with zero friction. By leveraging permanent ledgers and low-cost transactions, Hacktropica ensures that every drop of aid reaches its destination.

---

## 🌴 What Hacktropica Does

Hacktropica bridges the gap between traditional philanthropy and Web3. It provides a localized yet global platform for:
- **NGO Onboarding**: Seamless registration for non-profits with wallet-based identity.
- **Campaign Management**: Dynamic creation of donation drives with real-time tracking.
- **Permissionless Donations**: Secure, instant transactions using SOL and SPL tokens.
- **Trust & Transparency**: Built-in verification layers (Trust Badges) to ensure NGO credibility.
- **AI-Enhanced Insights**: Utilizing Google Generative AI to analyze and summarize campaign impacts.

---

## ✨ Why Hacktropica is Unique

1.  **Cinematic Experience**: Unlike typical "finance" looking Web3 apps, Hacktropica uses a premium, visual-heavy design (powered by **OGL** and **GSAP**) to evoke empathy.
2.  **Permissionless Ledger**: By building on Solana, we eliminate the 5-10% fees usually taken by traditional crowdfunding platforms.
3.  **AI-Verification**: We integrate Generative AI to help NGOs craft better narratives and provide donors with summarized impact reports.
4.  **Developer-First Foundation**: A clean, modular architecture designed for rapid scaling and easy integration of new Web3 protocols.

---

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
-   **Blockchain**: [Solana Web3.js](https://solana.com/) & [@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter)
-   **Database**: [MongoDB](https://www.mongodb.com/) (using native driver)
-   **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **AI**: [Google Generative AI](https://ai.google.dev/) (Gemini API)
-   **Animations**: [OGL](https://github.com/o-gl/ogl) & [Framer Motion](https://www.framer.com/motion/)
-   **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

---

## 📂 Folder Structure

```text
hacktropica/
├── public/                 # Static assets & Mock data
├── src/
│   ├── app/                # Next.js App Router (Pages & API)
│   │   ├── admin/          # Admin/NGO Management pages
│   │   ├── api/            # Serverless API routes (MongoDB/AI)
│   │   ├── campaign/       # Campaign detail views
│   │   ├── create-ngo/     # Registration workflow
│   │   └── dashboard/      # User/NGO workspace
│   ├── components/         # Atomic UI Components
│   │   ├── campaign/       # Campaign-specific widgets (TrustBadge, etc.)
│   │   └── ui/             # Reusable Shadcn components
│   ├── hooks/              # Custom React hooks (Wallet, Fetching)
│   ├── lib/                # Core logic (Solana, Mongo clients)
│   ├── services/           # Data fetching and API interaction layers
│   └── validator/          # Zod schemas for type-safe validation
├── tailwind.config.ts      # Styling configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (preferred) or npm
- A Solana Wallet (Phantom, Solflare)

### 2. Environment Setup
Create a `.env` file in the root:
```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_google_ai_key
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### 3. Installation
```bash
pnpm install
```

### 4. Development
```bash
pnpm dev
```

---

*Built with ❤️ for a more transparent world.*
