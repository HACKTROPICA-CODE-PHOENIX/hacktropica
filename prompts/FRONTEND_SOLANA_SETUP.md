# 🧩 Frontend + Solana Setup (Step 1)

## ✅ Current Status

The project has been initialized with:

* Next.js (App Router, TypeScript)
* `src/` directory enabled
* Base folder structure created manually

This step focuses ONLY on:

* Frontend UI foundation
* Solana wallet connection
* Basic layout (no backend integration yet)

---

## 🎯 Objective

Set up a working frontend with:

1. Wallet connection (Phantom)
2. UI skeleton for all pages
3. Reusable components using shadcn/ui
4. Placeholder/mock data (NO API calls yet)

---

## ⚠️ Strict Rules

* DO NOT implement backend logic
* DO NOT connect to real APIs
* DO NOT use database
* Use mock data where needed
* Keep everything modular and clean

---

## 📦 Required Installations

Install:

* @solana/web3.js
* @solana/wallet-adapter-react
* @solana/wallet-adapter-react-ui
* @solana/wallet-adapter-wallets

Also install:

* shadcn/ui components:

  * button
  * card
  * input
  * dialog
  * badge
  * toast

---

## 🔗 Wallet Setup

### Create:

src/lib/solana/connection.ts

* Export Solana connection (devnet)

---

src/lib/solana/wallet.ts

* Configure wallet adapters (Phantom)

---

### Create Hook:

src/hooks/useWallet.ts

Responsibilities:

* Connect wallet
* Disconnect wallet
* Expose wallet address
* Expose connection status

---

## 🧱 Global Layout

### Modify:

src/app/layout.tsx

Add:

* Wallet Provider wrapper
* Basic Navbar

---

## 🧭 Pages (UI Skeleton Only)

### 1. Home Page

src/app/page.tsx

* Display list of campaigns (mock data)
* Use CampaignCard component

---

### 2. Campaign Detail Page

src/app/campaign/[id]/page.tsx

* Show:

  * CampaignHeader
  * Description
  * DonationBox
  * Timeline

---

### 3. Dashboard Page

src/app/dashboard/page.tsx

* Show:

  * List of donations (mock)
  * Timeline per donation

---

## 🧩 Components to Implement

### common/

* Navbar.tsx

  * Includes wallet connect button

* WalletConnect.tsx

  * Connect/disconnect wallet
  * Show shortened wallet address

---

### campaign/

* CampaignCard.tsx
* CampaignHeader.tsx
* DonationBox.tsx (UI only, no real tx yet)
* TrustBadge.tsx

---

### timeline/

* Timeline.tsx
* TimelineItem.tsx

---

### dashboard/

* DonationCard.tsx

---

### feedback/

* SuccessModal.tsx (UI only)

---

## 🧪 Mock Data

Create:

src/constants/mockData.ts

Copy the contents from public/data/mock_data.ts
* Add sample timeline updates

---

## 🎨 UI Guidelines

* Use shadcn components
* Minimal, clean layout
* Fintech-style design

### Trust Colors:

* Green → high trust
* Yellow → medium
* Red → low

---

## 🔁 Expected Flow (UI Only)

Home → Campaign Detail → Click Donate → Show Success Modal

(No real transaction yet)

---

## 🧠 Deliverables for This Step

By the end of this step:

* Wallet connects successfully
* UI pages render correctly
* Navigation works
* Mock data is displayed
* Components are reusable

---

## 🚫 Out of Scope

* Backend APIs
* Database
* Real Solana transactions
* AI integration

---

## ✅ Completion Criteria

* Wallet connect button works
* Campaign listing visible
* Campaign detail page loads
* Dashboard page renders
* No runtime errors
