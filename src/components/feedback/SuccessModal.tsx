import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
  amount: string;
  txSignature?: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  campaignName,
  amount,
  txSignature,
}: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Donation Successful!
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-2">
            You have successfully donated{" "}
            <span className="font-bold text-foreground">{amount} SOL</span> to{" "}
            <span className="font-semibold">{campaignName}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            Thank you for your contribution. Your donation is now recorded on
            the blockchain.
          </p>
          {txSignature && (
            <a
              href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline text-muted-foreground hover:text-foreground transition-colors break-all"
            >
              View transaction on Solana Explorer ↗
            </a>
          )}
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={onClose} className="w-full sm:w-auto">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
