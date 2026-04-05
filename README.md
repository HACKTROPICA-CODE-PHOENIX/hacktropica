<p align="center">
  <a href="https://donorfi.vercel.app" target="_blank">
    <img src="https://donorfi.vercel.app/images/logo.png" height="50" alt="DonorFi Logo" />
  </a>
</p>

<h1 align="center">DONOR FI</h1>

<p align="center">
  <strong>The Permissionless Philanthropy Layer on Solana</strong>
  <br />
  <i>Where Compassion Meets the Blockchain</i>
</p>

<p align="center">
  <a href="https://solana.com">
    <img src="https://img.shields.io/badge/Solana-black?style=for-the-badge&logo=solana" alt="Solana" />
  </a>
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  </a>
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://ai.google.dev">
    <img src="https://img.shields.io/badge/AI-Gemini-blue?style=for-the-badge&logo=google-gemini" alt="Gemini AI" />
  </a>
  <a href="https://mongodb.com">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <br />
  <a href="https://ui.shadcn.com">
    <img src="https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn UI" />
  </a>
  <a href="https://www.radix-ui.com">
    <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white" alt="Radix UI" />
  </a>
  <a href="https://react-hook-form.com">
    <img src="https://img.shields.io/badge/Hook_Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white" alt="React Hook Form" />
  </a>
  <a href="https://zod.dev">
    <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  </a>
  <a href="https://lucide.dev">
    <img src="https://img.shields.io/badge/Lucide_Icons-F7B93E?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide Icons" />
  </a>
  <a href="https://pnpm.io">
    <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  </a>
</p>

---

DonorFi is a high-end, cinematic philanthropy platform built on the **Solana** blockchain. It empowers NGOs to raise funds transparently and enables donors to support causes globally with zero friction. By leveraging permanent ledgers and low-cost transactions, DonorFi ensures that every drop of aid reaches its destination.

---

## 🌴 What DonorFi Does

DonorFi bridges the gap between traditional philanthropy and Web3. It provides a localized yet global platform for:
- **NGO Onboarding**: Seamless registration for non-profits with wallet-based identity.
- **Campaign Management**: Dynamic creation of donation drives with real-time tracking.
- **Permissionless Donations**: Secure, instant transactions using SOL and SPL tokens.
- **Trust & Transparency**: Built-in verification layers (Trust Badges) to ensure NGO credibility.
- **AI-Enhanced Insights**: Utilizing Google Generative AI to analyze and summarize campaign impacts.

---

## ✨ Why DonorFi is Unique

1.  **Cinematic Experience**: Unlike typical "finance" looking Web3 apps, DonorFi uses a premium, visual-heavy design (powered by **OGL** and **GSAP**) to evoke empathy.
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