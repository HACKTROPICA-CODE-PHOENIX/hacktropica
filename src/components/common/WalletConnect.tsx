"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";

export function WalletConnect() {
  const { connected, connecting, formattedAddress, connect, disconnect } =
    useWallet();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(connected);
  }, [connected]);

  const handleClick = async () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className="btn-glow bg-white text-black px-5 py-2.5 md:px-6 md:py-3 rounded-full font-heading font-semibold text-xs md:text-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-70"
    >
      <div className={`w-2 h-2 rounded-full transition-colors ${
        isConnected ? 'bg-green-500' : 'bg-brand-500 animate-pulse'
      }`} />
      <span>
        {connecting ? "Initializing..." : isConnected ? (formattedAddress || "Connected") : "Connect Wallet"}
      </span>
    </button>
  );
}
