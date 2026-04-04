import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

// Extend with more wallets if needed in the future
export const getWalletAdapters = () => {
  return [
    new PhantomWalletAdapter()
  ];
};
