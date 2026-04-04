import { DUMMY_CAMPAIGNS, DUMMY_NGOS } from "@/constants/mockData";
import { CampaignCard } from "@/components/campaign/CampaignCard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Empowering Web3 Philanthropy
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover verified campaigns. Track your impact on the blockchain. 
          Support trustworthy organizations with full transparency.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          Featured Campaigns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_CAMPAIGNS.map((campaign) => {
            const ngo = DUMMY_NGOS.find((n) => n.id === campaign.ngoId);
            return (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                ngo={ngo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
