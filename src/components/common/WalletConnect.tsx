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
      className="btn-glow bg-white text-black px-3 sm:px-5 py-2 sm:py-2.5 md:px-6 md:py-3 rounded-full font-heading font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-70 flex-shrink-0 whitespace-nowrap"
    >
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
        isConnected ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
      }`} />
      <span className="h-5 flex items-center flex-shrink-0">
        {connecting ? "Init..." : isConnected ? (formattedAddress || "Connected") : "Connect"}
      </span>
    </button>
  );
}
