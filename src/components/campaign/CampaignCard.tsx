import Link from "next/link";
import { Campaign, NGO } from "@/constants/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "./TrustBadge";

interface CampaignCardProps {
  campaign: Campaign;
  ngo: NGO | undefined;
}

export function CampaignCard({ campaign, ngo }: CampaignCardProps) {
  const progress = Math.min(
    (campaign.raisedSol / campaign.targetSol) * 100,
    100
  );

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{campaign.title}</CardTitle>
            <CardDescription className="line-clamp-1 mt-1">
              by {ngo?.profile.name || "Unknown NGO"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {campaign.description}
        </p>

        {ngo && (
          <div className="mb-4">
            <TrustBadge
              score={ngo.verificationStatus.trustScore}
              aiVerified={ngo.verificationStatus.aiVerified}
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{campaign.raisedSol} SOL</span>
            <span className="text-muted-foreground">
              of {campaign.targetSol} SOL
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/campaign/${campaign.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
