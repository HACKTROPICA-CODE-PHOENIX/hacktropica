"use client";

import React from "react";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";

export function WalletConnect() {
  const { connected, connecting, formattedAddress, connect, disconnect } =
    useWallet();

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-mono">
          {formattedAddress}
        </span>
        <Button variant="outline" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={connect}
      disabled={connecting}
    >
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
