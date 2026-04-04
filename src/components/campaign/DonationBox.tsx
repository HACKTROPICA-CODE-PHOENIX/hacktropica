"use client";

import { useState } from "react";
import { Campaign } from "@/constants/mockData";
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

interface DonationBoxProps {
  campaign: Campaign;
}

export function DonationBox({ campaign }: DonationBoxProps) {
  const { connected, connect } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDonate = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;

    setIsProcessing(true);
    // Mock transaction delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setAmount("");
    }, 1500);
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
      />
    </>
  );
}
