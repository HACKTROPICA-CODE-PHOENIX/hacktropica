import { notFound } from "next/navigation";
import {
  DUMMY_CAMPAIGNS,
  DUMMY_NGOS,
  DUMMY_UPDATES,
} from "@/constants/mockData";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { DonationBox } from "@/components/campaign/DonationBox";
import { Timeline } from "@/components/timeline/Timeline";

// Generate static params for mock data so it doesn't fail on build
export function generateStaticParams() {
  return DUMMY_CAMPAIGNS.map((c) => ({
    id: c.id,
  }));
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = DUMMY_CAMPAIGNS.find((c) => c.id === id);

  if (!campaign) {
    notFound();
  }

  const ngo = DUMMY_NGOS.find((n) => n.id === campaign.ngoId);
  const updates = DUMMY_UPDATES.filter((u) => u.campaignId === campaign.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CampaignHeader campaign={campaign} ngo={ngo} />

          <div>
            <h2 className="text-2xl font-bold mb-4">About this Campaign</h2>
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
              {campaign.description}
              
              {ngo && (
                <>
                  <br />
                  <br />
                  <strong className="text-foreground">Mission: </strong>
                  {ngo.profile.mission}
                  <br />
                  <br />
                  <strong className="text-foreground">Description: </strong>
                  {ngo.profile.description}
                  <br />
                  <br />
                  <strong className="text-foreground">Fund Plan: </strong>
                  {ngo.profile.fundPlan}
                </>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Impact Timeline</h2>
            <Timeline updates={updates} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <DonationBox campaign={campaign} />
          </div>
        </div>
      </div>
    </div>
  );
}
