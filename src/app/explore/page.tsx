import { DUMMY_CAMPAIGNS, DUMMY_NGOS } from "@/constants/mockData";
import { CampaignCard } from "@/components/campaign/CampaignCard";
import { Activity } from "lucide-react";
import DarkVeil from "@/components/DarkVeil";

export default function Explore() {

  
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
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 flex flex-col items-end opacity-[0.05] pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="flex items-baseline gap-2">
              <span className="text-[120px] md:text-[200px] font-heading font-bold text-white tracking-tighter leading-none">
                24.5k
              </span>
              <span className="text-brand-500 font-mono text-5xl md:text-7xl font-bold">
                SOL
              </span>
            </div>
          </div>

          {/* Foreground Content */}
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dark-border bg-dark-surface/50 text-xs font-mono text-gray-400 mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
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

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 opacity-0 animate-fade-in-up stagger-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button className="px-5 py-2.5 rounded-full border border-brand-500 bg-brand-500/10 text-brand-500 text-sm font-medium whitespace-nowrap transition-colors">
              Trending Now
            </button>
            <button className="px-5 py-2.5 rounded-full border border-dark-border hover:border-gray-500 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
              Infrastructure
            </button>
            <button className="px-5 py-2.5 rounded-full border border-dark-border hover:border-gray-500 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
              DeFi
            </button>
            <button className="px-5 py-2.5 rounded-full border border-dark-border hover:border-gray-500 text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
              Public Goods
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
            <span>0{DUMMY_CAMPAIGNS.length} ACTIVECAMPAIGNS</span>
            <Activity className="w-4 h-4 text-brand-500" />
          </div>
        </div>

        {/* Grid Container for Campaigns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in-up stagger-3">
          {DUMMY_CAMPAIGNS.map((campaign) => {
            const ngo = DUMMY_NGOS.find((n) => n.id === campaign.ngoId);
            return (
              <CampaignCard key={campaign.id} campaign={campaign} ngo={ngo} />
            );
          })}
        </div>
      </main>
    </>
  );
}
