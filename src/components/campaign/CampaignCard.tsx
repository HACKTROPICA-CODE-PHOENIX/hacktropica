"use client";

import { useState } from "react";
import Link from "next/link";
import { Campaign, NGO } from "@/constants/mockData";
import { ShieldCheck, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DonateModal } from "./DonateModal";

interface CampaignCardProps {
  campaign: Campaign;
  ngo: NGO | undefined;
  imgPattern?: string;
}

export function CampaignCard({ campaign, ngo, imgPattern }: CampaignCardProps) {
  const progress = Math.min((campaign.raisedSol / campaign.targetSol) * 100, 100);

  const patterns = [
    "radial-gradient(circle at 0% 0%, #331500 0%, #030303 100%)",
    "radial-gradient(circle at 100% 100%, #1a0a2e 0%, #030303 100%)",
    "linear-gradient(45deg, #0a192f 0%, #030303 100%)",
    "radial-gradient(circle at 50% 50%, #290a0a 0%, #030303 100%)",
    "linear-gradient(180deg, #1f1c08 0%, #030303 100%)",
    "radial-gradient(circle at 0% 100%, #051c14 0%, #030303 100%)",
  ];

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
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDonateOpen(true);
  };

  return (
    <>
      <Link href={`/campaign/${campaign.id}`} className="block group">
        <div className="relative flex flex-col h-[240px] rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-brand-500/50 hover:-translate-y-1">

          {/* Background Pattern Layer */}
          <div
            className="absolute inset-0 -z-10 opacity-30 group-hover:opacity-50 transition-opacity"
            style={{ background: backgroundPattern }}
          />

          <div className="p-4 flex flex-col h-full">
            {/* Header: NGO & Date */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="text-md font-bold text-gray-400 uppercase tracking-tight truncate max-w-[100px]">
                  {ngo?.profile.name || "Unknown"}
                </span>
                <ShieldCheck className="w-3 h-3 text-brand-500 shrink-0" />
              </div>
              <div className="flex items-center gap-1 text-gray-500 shrink-0">
                <Calendar className="w-3 h-3" />
                <span className="text-md font-mono">
                  {campaign.createdAt.split("T")[0]}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1 mb-2">
              <h3 className="text-base font-bold text-white leading-tight line-clamp-1 group-hover:text-brand-400 transition-colors">
                {campaign.title}
              </h3>
              <p className="text-gray-400 text-md leading-snug line-clamp-2">
                {campaign.description}
              </p>
            </div>

            {/* Bottom Section: Stats & Action */}
            <div className="mt-auto">
              <div className="flex justify-between items-end mb-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-white font-mono text-sm font-semibold leading-none">
                    {campaign.raisedSol.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-gray-500 font-mono uppercase">
                    / {campaign.targetSol.toLocaleString()} SOL
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-brand-500 font-mono text-md font-bold">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>

              {/* Shadcn Progress Component */}
              <Progress
                value={progress}
                className="h-1 mb-3 bg-white/5 [&>div]:bg-brand-500"
              />

              <button
                onClick={handleDonateClick}
                className="w-full py-2 bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-wider rounded-md transition-colors duration-300 hover:bg-white/50 hover:border-white hover:text-black relative z-20"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </Link>

      <DonateModal
        campaign={campaign}
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />
    </>
  );
} 