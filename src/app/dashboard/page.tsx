"use client";

import { useWallet } from "@/hooks/useWallet";
import { DUMMY_DONATIONS, DUMMY_CAMPAIGNS } from "@/constants/mockData";
import { DonationCard } from "@/components/dashboard/DonationCard";
import DarkVeil from "@/components/DarkVeil";
import { TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { connected } = useWallet();

  // Sort mock donations by newest
  const recentDonations = [...DUMMY_DONATIONS].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <>
      <div className="fixed inset-0 w-full h-screen -z-10 opacity-50">
        <DarkVeil
          hueShift={180}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <div className="relative flex flex-col justify-center min-h-[140px] mb-12 pb-8 border-b border-dark-border opacity-0 animate-fade-in-up stagger-1">
          {/* Massive Blurred Background Stat */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 flex flex-col items-end opacity-[0.05] pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="flex items-baseline gap-2">
              <span className="text-[100px] md:text-[150px] font-heading font-bold text-white tracking-tighter leading-none">
                {recentDonations.length}
              </span>
              <span className="text-brand-500 font-mono text-4xl md:text-6xl font-bold">
                TXN
              </span>
            </div>
          </div>

          {/* Foreground Content */}
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dark-border bg-dark-surface/50 text-xs font-mono text-gray-400 mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Your Activity
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter text-white mb-3 uppercase drop-shadow-lg">
              Your{" "}
              <span className="text-gradient-orange italic pr-2">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Track your impact and view recent platform donations.
            </p>
          </div>
        </div>

        {!connected && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-md mb-12 opacity-0 animate-fade-in-up stagger-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Wallet Not Connected</p>
                <p className="text-gray-400 text-sm">
                  Connect your wallet to see your specific donations and transaction history.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Donations Section */}
        <div className="opacity-0 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-brand-500" />
            <h2 className="text-2xl font-bold text-white">Recent Global Donations</h2>
          </div>
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
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center backdrop-blur-md">
                <p className="text-gray-400">No recent donations found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
