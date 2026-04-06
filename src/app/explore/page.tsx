"use client";

import { useEffect, useState } from "react";
import { Campaign, NGO } from "@/constants/mockData";
import { CampaignCard } from "@/components/campaign/CampaignCard";
import DarkVeil from "@/components/DarkVeil";

export default function Explore() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [campRes, ngoRes] = await Promise.all([
          fetch("/api/campaigns").then((r) => r.json()),
          fetch("/api/ngos").then((r) => r.json()),
        ]);

        const mappedCampaigns: Campaign[] = (campRes.allCampaigns || []).map((c: any) => ({
          id: c._id,
          ngoId: c.ngoWalletAddress ?? "",
          walletAddress: c.ngoWalletAddress ?? "",
          title: c.title,
          description: c.description,
          targetSol: c.targetSol,
          raisedSol: c.raisedSol ?? 0,
          createdAt: c.createdAt ?? "",
        }));

        const mappedNgos: NGO[] = (ngoRes.ngos || []).map((n: any) => ({
          id: n._id,
          walletAddress: n.walletAddress,
          profile: n.profile ?? {
            name: n.name ?? "Unknown",
            mission: n.mission ?? "",
            description: n.description ?? "",
            fundPlan: n.fundPlan ?? "",
          },
          verificationStatus: n.verificationStatus ?? {
            aiVerified: false,
            trustScore: 0,
            reasoning: "",
          },
          createdAt: n.createdAt ?? "",
        }));

        let total = 0;
        mappedCampaigns.forEach((c) => {
          total += c.raisedSol;
        });

        setCampaigns(mappedCampaigns);
        setNgos(mappedNgos);
        setSum(total);
      } catch (err) {
        console.error("Failed to fetch explore data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const formatSum = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toFixed(1);
  };

  return (
    <>
      <div className="fixed inset-0 w-full h-screen -z-10 opacity-50">
        <DarkVeil
          hueShift={222}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <main className="flex-grow pt-36 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Titlebar Section */}
        <div className="relative flex flex-col justify-center min-h-[180px] mb-10 pb-8 border-b border-dark-border opacity-0 animate-fade-in-up stagger-1">
          {/* Massive Blurred Background Stat */}
          <div className="absolute right-0 bottom-0 translate-y-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 -z-10 flex flex-col items-end opacity-20 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="flex items-baseline gap-2">
              <span className="text-[40px] md:text-[200px] font-heading font-bold text-white tracking-tighter leading-none">
                {formatSum(sum)}
              </span>
              <span className="text-brand-500 font-mono text-4xl md:text-7xl font-bold">
                SOL
              </span>
            </div>
          </div>

          {/* Foreground Content */}
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dark-border bg-dark-surface/50 text-xs font-mono text-gray-400 mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Live Network
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter text-white mb-3 uppercase drop-shadow-lg">
              Open{" "}
              <span className="text-gradient-orange italic pr-2">
                Campaigns
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Explore and fund high-impact, permissionless Web3 initiatives.
              Immutable support, verifiable on-chain.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-gray-400 animate-pulse text-center py-12">Loading campaigns...</div>
        )}

        {/* Grid Container for Campaigns */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in-up stagger-3">
            {campaigns.map((campaign) => {
              const ngo = ngos.find((n) => n.walletAddress === campaign.walletAddress);
              return (
                <CampaignCard key={campaign.id} campaign={campaign} ngo={ngo} />
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
