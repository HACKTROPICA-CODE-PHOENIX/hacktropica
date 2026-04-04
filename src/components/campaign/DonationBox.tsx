"use client";

import { useState } from "react";
import { Campaign } from "@/constants/mockData";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useWallet } from "@/hooks/useWallet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuccessModal } from "@/components/feedback/SuccessModal";
import { sendSol } from "@/lib/solana/transfer";

interface DonationBoxProps {
  campaign: Campaign;
}

export function DonationBox({ campaign }: DonationBoxProps) {
  const { connected, connect } = useWallet();
  const solanaWallet = useSolanaWallet();
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [txSignature, setTxSignature] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDonate = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    if (!solanaWallet.connected || !solanaWallet.publicKey) {
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    if (!campaign.walletAddress) {
      setErrorMessage("This campaign has no recipient wallet configured.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");
    setTxSignature("");

    try {
      const signature = await sendSol({
        fromWallet: solanaWallet,
        toWallet: campaign.walletAddress,
        amount: Number(amount),
      });

      const response = await fetch("/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignId: campaign.id,
          amount: Number(amount),
        }),
      });

      if (!response.ok) {
        console.error("Failed to record donation in database");
      }

      setTxSignature(signature);
      setShowSuccess(true);
      setAmount("");
    } catch (error: any) {
      console.error("Donation failed:", error);
      setErrorMessage(error.message || "Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>Support this campaign with SOL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!connected ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please connect your wallet to donate.
              </p>
              <Button className="w-full" onClick={connect}>
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium leading-none"
                >
                  Amount (SOL)
                </label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isProcessing}
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <Button
                className="w-full"
                onClick={handleDonate}
                disabled={
                  isProcessing ||
                  !amount ||
                  isNaN(Number(amount)) ||
                  Number(amount) <= 0
                }
              >
                {isProcessing ? "Processing..." : "Donate Now"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        campaignName={campaign.title}
        amount={amount}
        txSignature={txSignature}
      />
    </>
  );
}
