"use client";

import { useWallet } from "@/hooks/useWallet";
import { DUMMY_DONATIONS, DUMMY_CAMPAIGNS } from "@/constants/mockData";
import { DonationCard } from "@/components/dashboard/DonationCard";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const { connected } = useWallet();

  // Sort mock donations by newest
  const recentDonations = [...DUMMY_DONATIONS].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your impact and view recent platform donations.
        </p>
      </div>

      {!connected && (
        <Card className="mb-8 border-dashed bg-muted/30">
          <CardContent className="py-8 text-center text-muted-foreground">
            Connect your wallet to see your specific donations.
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Global Donations (Mock)</h2>
        <div className="space-y-4">
          {recentDonations.length > 0 ? (
            recentDonations.map((donation) => {
              const campaign = DUMMY_CAMPAIGNS.find(
                (c) => c.id === donation.campaignId
              );
              return (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                  campaign={campaign}
                />
              );
            })
          ) : (
            <p className="text-muted-foreground">No recent donations found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
