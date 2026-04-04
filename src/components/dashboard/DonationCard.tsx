import { Donation, Campaign } from "@/constants/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DonationCardProps {
  donation: Donation;
  campaign: Campaign | undefined;
}

export function DonationCard({ donation, campaign }: DonationCardProps) {
  const shortWallet = `${donation.donorWallet.slice(
    0,
    4
  )}...${donation.donorWallet.slice(-4)}`;

  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
        <div>
          <h4 className="font-semibold text-lg">{campaign?.title || "Unknown Campaign"}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="font-mono text-xs">
              {shortWallet}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(donation.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
          <p className="font-bold text-lg text-primary">
            +{donation.amountSol} SOL
          </p>
          <a
            href={`https://explorer.solana.com/tx/${donation.transactionSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline mt-1"
          >
            View Tx
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
