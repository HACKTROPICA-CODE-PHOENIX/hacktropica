# 💸 Solana Donation (Frontend Only with Mock Data)

## ✅ Objective

Implement SOL transfer from connected wallet to a campaign wallet using mock data.

---

## ⚠️ Scope Rules

* Use mock campaign data only
* Do NOT integrate backend yet
* Do NOT store transactions
* Focus only on wallet → wallet transfer

---

## 🧩 Mock Data Update

Update mock campaigns to include:

{
id: string,
title: string,
description: string,
ngoName: string,
walletAddress: string   // RECEIVER WALLET
}

Use valid Solana wallet addresses (dummy/test addresses).

---

## 🧱 UI Changes

### 1. Campaign Card

Add:

* "Donate" button

---

### 2. Donation Modal / Section

On clicking Donate:

Show:

* Input: Amount (in SOL)
* Button: "Send Donation"

---

## 🔌 Solana Integration

### Required Packages

Ensure installed:

* @solana/web3.js
* @solana/wallet-adapter-react

---

## 💻 Transaction Logic

### Create Utility

src/lib/solana/transfer.ts

Function:

sendSol({
fromWallet,
toWallet,
amount
})

---

## ⚙️ Implementation Steps

1. Import:

* Connection
* PublicKey
* SystemProgram
* Transaction

2. Setup connection:

* Use devnet:
  https://api.devnet.solana.com

3. Convert amount:

* SOL → lamports

4. Create transaction:

* Add transfer instruction:
  SystemProgram.transfer

5. Send transaction:

* Use wallet.signTransaction
* Then send via connection

6. Confirm transaction

---

## 🧪 UX Flow

* User clicks Donate
* Inputs amount
* Clicks Send
* Wallet popup opens
* User approves
* Show success / failure

---

## ⚠️ Validation

* Amount must be > 0
* Wallet must be connected
* Disable button during processing

---

## 🧠 Error Handling

Handle:

* Wallet not connected
* Transaction rejected
* Network failure

Show user-friendly messages

---

## 🎨 UI Guidelines

Use shadcn:

* Dialog (for donation modal)
* Input
* Button
* Toast (for feedback)

---

## 🔁 Completion Criteria

* Donation button visible
* Modal opens correctly
* Amount input works
* Wallet popup appears
* Transaction completes successfully
* Success message shown

---

## 🔥 Final Goal

User can send SOL to a campaign wallet using connected wallet (on devnet)
