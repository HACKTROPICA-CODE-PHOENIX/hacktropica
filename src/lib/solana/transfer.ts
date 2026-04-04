import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { solanaConnection } from "./connection";

export async function sendSol({
  fromWallet,
  toWallet,
  amount,
}: {
  fromWallet: WalletContextState;
  toWallet: string;
  amount: number;
}) {
  if (!fromWallet.publicKey || !fromWallet.sendTransaction) {
    throw new Error("Wallet not connected or missing signing capability");
  }

  const toPublicKey = new PublicKey(toWallet);
  const lamports = Math.floor(amount * 1e9);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toPublicKey,
      lamports,
    })
  );

  const signature = await fromWallet.sendTransaction(transaction, solanaConnection);
  
  const latestBlockhash = await solanaConnection.getLatestBlockhash();
  
  const confirmation = await solanaConnection.confirmTransaction({
    signature,
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
  }, "confirmed");

  if (confirmation.value.err) {
    throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`);
  }

  return signature;
}
