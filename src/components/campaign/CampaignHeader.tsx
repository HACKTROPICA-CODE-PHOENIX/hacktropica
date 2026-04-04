import { Campaign, NGO } from "@/constants/mockData";
import { TrustBadge } from "./TrustBadge";

interface CampaignHeaderProps {
  campaign: Campaign;
  ngo: NGO | undefined;
}

export function CampaignHeader({ campaign, ngo }: CampaignHeaderProps) {
  const progress = Math.min(
    (campaign.raisedSol / campaign.targetSol) * 100,
    100
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {campaign.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          by {ngo?.profile.name || "Unknown NGO"}
        </p>
      </div>

      {ngo && (
        <div className="flex flex-col gap-2 rounded-lg border p-4 bg-muted/50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Trust & Verification</h3>
            <TrustBadge
              score={ngo.verificationStatus.trustScore}
              aiVerified={ngo.verificationStatus.aiVerified}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            AI Reasoning: {ngo.verificationStatus.reasoning}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-bold">{campaign.raisedSol} SOL</p>
            <p className="text-sm text-muted-foreground">
              raised of {campaign.targetSol} SOL goal
            </p>
          </div>
          <p className="text-sm font-medium">{progress.toFixed(1)}%</p>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
