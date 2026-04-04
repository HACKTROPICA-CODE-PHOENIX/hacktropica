import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/db";
import { Campaign, NGO, ImpactUpdate } from "@/constants/mockData";
import { CampaignHeader } from "@/components/campaign/CampaignHeader";
import { DonationBox } from "@/components/campaign/DonationBox";
import { Timeline } from "@/components/timeline/Timeline";
import DarkVeil from "@/components/DarkVeil";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { log } from "console";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate the id is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const client = await clientPromise;
  const db = client.db("hacktropica");

  const rawCampaign = await db.collection("campaigns").findOne({ _id: new ObjectId(id) });

  if (!rawCampaign) {
    notFound();
  }

  const campaign: Campaign = {
    id: rawCampaign._id.toString(),
    ngoId: rawCampaign.ngoWalletAddress ?? "",
    walletAddress: rawCampaign.ngoWalletAddress ?? "",
    title: rawCampaign.title,
    description: rawCampaign.description,
    targetSol: rawCampaign.targetSol,
    raisedSol: rawCampaign.raisedSol ?? 0,
    createdAt: rawCampaign.createdAt instanceof Date ? rawCampaign.createdAt.toISOString() : String(rawCampaign.createdAt ?? ""),
  };

  // Find the NGO by wallet address
  const rawNgo = await db.collection("ngos").findOne({ walletAddress: campaign.walletAddress });
  const ngo: NGO | undefined = rawNgo
    ? {
        id: rawNgo._id.toString(),
        walletAddress: rawNgo.walletAddress,
        profile: rawNgo.profile ?? {
          name: rawNgo.name ?? "Unknown",
          mission: rawNgo.mission ?? "",
          description: rawNgo.description ?? "",
          fundPlan: rawNgo.fundPlan ?? "",
        },
        verificationStatus: rawNgo.verificationStatus ?? {
          aiVerified: false,
          trustScore: 0,
          reasoning: "",
        },
        createdAt: rawNgo.createdAt instanceof Date ? rawNgo.createdAt.toISOString() : String(rawNgo.createdAt ?? ""),
      }
    : undefined;

  // Fetch impact updates for this campaign
  const rawUpdates = await db.collection("updates").find({ campaignId: campaign.id }).sort({ postedAt: -1 }).toArray();
  const updates: ImpactUpdate[] = rawUpdates.map((u) => ({
    id: u._id.toString(),
    campaignId: u.campaignId,
    type: u.type,
    title: u.title,
    description: u.description,
    imageUrl: u.imageUrl ?? "",
    postedAt: u.postedAt instanceof Date ? u.postedAt.toISOString() : String(u.postedAt ?? ""),
  }));

  //console.log(campaign.walletAddress);

  return (
    <>
      <div className="fixed inset-0 w-full h-screen -z-10 opacity-50">
        <DarkVeil
          hueShift={280}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Back Button */}
        <Link 
          href="/explore"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-dark-border bg-dark-surface/50 text-xs font-mono text-gray-400 mb-8 backdrop-blur-md hover:text-white transition-colors opacity-0 animate-fade-in-up stagger-1"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Campaigns
        </Link>

        {/* Header Section */}
        <div className="relative flex flex-col justify-center min-h-[140px] mb-12 pb-8 border-b border-dark-border opacity-0 animate-fade-in-up stagger-2">
          {/* Massive Blurred Background Stat */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 flex flex-col items-end opacity-[0.05] pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <div className="flex items-baseline gap-2">
              <span className="text-[100px] md:text-[150px] font-heading font-bold text-white tracking-tighter leading-none">
                {campaign.raisedSol}
              </span>
              <span className="text-brand-500 font-mono text-4xl md:text-6xl font-bold">
                SOL
              </span>
            </div>
          </div>

          {/* Foreground Content */}
          <div className="max-w-2xl relative z-10">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter text-white mb-3 uppercase drop-shadow-lg">
              {campaign.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient-orange italic pr-2">
                {campaign.title.split(" ").slice(-1)}
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
              {ngo?.profile.mission || campaign.description}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-0 animate-fade-in-up stagger-3">
          <div className="lg:col-span-2 space-y-8">
            <CampaignHeader campaign={campaign} ngo={ngo} />

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-4 text-white">About this Campaign</h2>
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-400 whitespace-pre-wrap font-light leading-relaxed">
                {campaign.description}
                
                {ngo && (
                  <>
                    <br />
                    <br />
                    <strong className="text-white">Mission: </strong>
                    {ngo.profile.mission}
                    <br />
                    <br />
                    <strong className="text-white">Description: </strong>
                    {ngo.profile.description}
                    <br />
                    <br />
                    <strong className="text-white">Fund Plan: </strong>
                    {ngo.profile.fundPlan}
                  </>
                )}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-6 text-white">Impact Timeline</h2>
              <Timeline updates={updates} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DonationBox campaign={campaign} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
