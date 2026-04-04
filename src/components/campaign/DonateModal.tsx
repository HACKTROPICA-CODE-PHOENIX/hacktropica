"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@solana/wallet-adapter-react";
import { sendSol } from "@/lib/solana/transfer";
import { Campaign } from "@/constants/mockData";

interface DonateModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
}

export function DonateModal({ campaign, isOpen, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const wallet = useWallet();

  const [txSignature, setTxSignature] = useState("");

  const handleDonate = async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    if (!wallet.connected) {
      setStatus("error");
      setErrorMessage("Please connect your wallet first.");
      return;
    }

    setIsProcessing(true);
    setStatus("idle");
    setErrorMessage("");
    setTxSignature("");

    try {
      if (!campaign.walletAddress) {
        throw new Error("Campaign has no wallet address set");
      }

      const signature = await sendSol({
        fromWallet: wallet,
        toWallet: campaign.walletAddress,
        amount: numAmount,
      });

      console.log("Donation successful. Signature:", signature);
      setTxSignature(signature);
      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An error occurred during transfer");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-dark-bg border-dark-border text-white">
        <DialogHeader>
          <DialogTitle>Donate to {campaign.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send SOL directly to the campaign's secure wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Amount (SOL)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-dark-surface border-dark-border text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              disabled={isProcessing || status === "success"}
            />
          </div>

          {status === "success" && (
            <div className="p-3 bg-brand-500/10 border border-brand-500 rounded text-brand-500 text-sm font-medium">
              Donation successful! Thank you for your support.
              {txSignature && (
                <div className="mt-2 text-xs">
                  <a 
                    href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors break-all"
                  >
                    View on Solana Explorer
                  </a>
                </div>
              )}
            </div>
          )}

          {status === "error" && (
            <div className="p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm font-medium break-words">
              {errorMessage}
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          {status === "success" ? (
            <Button onClick={onClose} className="bg-brand-500 hover:bg-brand-600 text-black font-semibold">
              Close
            </Button>
          ) : (
            <Button
              onClick={handleDonate}
              disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              className="bg-brand-500 hover:bg-brand-600 text-black font-semibold min-w-[120px]"
            >
              {isProcessing ? "Processing..." : "Send Donation"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
