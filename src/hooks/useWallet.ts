import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export function useWallet() {
  const {
    publicKey,
    connected,
    connecting,
    disconnecting,
    connect,
    disconnect,
    wallet,
  } = useSolanaWallet();
  
  const { setVisible } = useWalletModal();

  const connectWallet = async () => {
    try {
      if (!wallet) {
        setVisible(true);
        return;
      }
      await connect();
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet", error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return {
    publicKey,
    address: publicKey?.toBase58() ?? null,
    formattedAddress: publicKey ? formatAddress(publicKey.toBase58()) : null,
    connected,
    connecting,
    disconnecting,
    connect: connectWallet,
    disconnect: disconnectWallet,
  };
}
