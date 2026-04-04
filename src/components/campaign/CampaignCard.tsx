"use client";

import Link from "next/link";
import { Campaign, NGO } from "@/constants/mockData";
import { ArrowUpRight, ShieldCheck, Hexagon } from "lucide-react";
import { TrustBadge } from "./TrustBadge";
import { Progress } from "@/components/ui/progress";

interface CampaignCardProps {
  campaign: Campaign;
  ngo: NGO | undefined;
  imgPattern?: string;
}

export function CampaignCard({ campaign, ngo, imgPattern }: CampaignCardProps) {
  const progress = Math.min(
    (campaign.raisedSol / campaign.targetSol) * 100,
    100
  );

  const patterns = [
    "radial-gradient(circle at 0% 0%, #331500 0%, #030303 100%)",
    "radial-gradient(circle at 100% 100%, #1a0a2e 0%, #030303 100%)",
    "linear-gradient(45deg, #0a192f 0%, #030303 100%)",
    "radial-gradient(circle at 50% 50%, #290a0a 0%, #030303 100%)",
    "linear-gradient(180deg, #1f1c08 0%, #030303 100%)",
    "radial-gradient(circle at 0% 100%, #051c14 0%, #030303 100%)",
  ];

  const categoryMap: Record<string, string> = {
    "Infrastructure": "Infrastructure",
    "DeFi": "DeFi",
    "Public Goods": "Public Goods",
    "DePIN": "DePIN",
    "UX/UI": "UX/UI",
    "Security": "Security",
  };

  const category = categoryMap[campaign.title?.includes("Zero") ? "Infrastructure" : 
                            campaign.title?.includes("AI") ? "DePIN" :
                            campaign.title?.includes("Wallet") ? "UX/UI" :
                            campaign.title?.includes("Orderbook") ? "DeFi" :
                            campaign.title?.includes("Storage") ? "Infrastructure" : "Security"];

  // Deterministic pattern selection based on campaign ID (fixes hydration error)
  const getPatternIndex = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % patterns.length;
  };

  const backgroundPattern = imgPattern || patterns[getPatternIndex(campaign.id)];

  return (
    <Link href={`/campaign/${campaign.id}`}>
      <div className="campaign-card glass-panel rounded-2xl relative overflow-hidden group cursor-pointer flex flex-col ">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 -z-10 opacity-40"
          style={{ background: backgroundPattern }}
        />
        <div className="card-glow" />
        <div className="p-6 flex-grow flex flex-col relative z-10">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-gray-500 uppercase tracking-wider">
            <span>{ngo?.profile.name || "Unknown Creator"}</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="text-brand-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified
            </span>
          </div>

          <h3 className="text-xl font-heading font-bold mb-3 text-white leading-tight group-hover:text-brand-500 transition-colors line-clamp-2">
            {campaign.title}
          </h3>

          <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-light">
            {campaign.description}
          </p>

          {/* Bottom Metrics & Progress */}
          <div className="mt-auto">
            <div className="mb-3">
              <Progress value={progress} className="bg-dark-bg border border-white/5 [&>*]:bg-brand-500" />
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="font-mono text-lg text-white font-medium">
                  {campaign.raisedSol.toLocaleString()}{" "}
                  <span className="text-gray-500 text-xs">SOL</span>
                </div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">
                  Goal: {campaign.targetSol.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-white font-mono text-sm">Created at</div>
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                    {campaign.createdAt.split("T")[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
