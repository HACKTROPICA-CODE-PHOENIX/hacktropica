"use client";

import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";
import DarkVeil from "@/components/DarkVeil";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CampaignForm } from "@/components/forms/campaign-form";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  const { connected, address } = useWallet();
  const [ngo, setNgo] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (!connected || !address) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const [ngoRes, campRes] = await Promise.all([
          fetch("/api/ngos").then(r => r.json()),
          fetch("/api/campaigns").then(r => r.json())
        ]);
        
        const myNgo = ngoRes.ngos?.find((n: any) => n.walletAddress === address);
        setNgo(myNgo || null);
        
        if (myNgo) {
          const myCampaigns = campRes.allCampaigns?.filter((c: any) => c.ngoWalletAddress === address) || [];
          setCampaigns(myCampaigns);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [connected, address, refreshTrigger]);

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
        <div className="relative flex flex-col justify-center min-h-[140px] mb-12 pb-8 border-b border-dark-border animate-fade-in-up stagger-1">
          <div className="max-w-2xl relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter text-white mb-3 uppercase drop-shadow-lg">
              NGO <span className="text-gradient-orange italic pr-2">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Manage your NGO profile and campaigns.
            </p>
          </div>
        </div>

        {!connected && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-md mb-12 animate-fade-in-up stagger-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Wallet Not Connected</p>
                <p className="text-gray-400 text-sm">
                  Connect your wallet to manage your NGO dashboard.
                </p>
              </div>
            </div>
          </div>
        )}

        {connected && loading && (
          <div className="text-gray-400 animate-pulse">Loading dashboard...</div>
        )}

        {connected && !loading && !ngo && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 backdrop-blur-md mb-12 animate-fade-in-up stagger-2 text-center">
             <h2 className="text-xl font-bold text-white mb-4">Create NGO first</h2>
             <p className="text-gray-400 mb-6">You need to register an NGO profile to access the dashboard and campaigns.</p>
             <Link href="/create-ngo">
               <Button className="bg-brand-500 text-black hover:bg-brand-600 font-bold">
                 Register NGO
               </Button>
             </Link>
          </div>
        )}

        {connected && !loading && ngo && (
          <div className="space-y-8 animate-fade-in-up stagger-3">
            {/* NGO Details */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{ngo.profile?.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {ngo.profile?.mission}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h3 className="font-semibold text-brand-500 mb-1">Description</h3>
                  <p className="text-sm border-l-2 border-dark-border pl-3">{ngo.profile?.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-500 mb-1">Fund Plan</h3>
                  <p className="text-sm border-l-2 border-dark-border pl-3">{ngo.profile?.fundPlan}</p>
                </div>
                {ngo.verificationStatus && (
                  <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-dark-surface/50 border border-brand-500/30 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                    <span className="text-xs font-mono text-brand-400">Trust Score: {ngo.verificationStatus.trustScore}/100</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Campaign Section */}
            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-md">
               <h2 className="text-xl font-bold text-white">Your Campaigns</h2>
               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                 <DialogTrigger asChild>
                   <Button className="bg-brand-500 text-black hover:bg-brand-600 font-bold" variant="default">Add Campaign</Button>
                 </DialogTrigger>
                 <DialogContent className="bg-dark-bg border-white/10 text-white max-w-lg">
                   <DialogHeader>
                     <DialogTitle>Create New Campaign</DialogTitle>
                   </DialogHeader>
                   <CampaignForm onSuccess={() => {
                     setIsDialogOpen(false);
                     setRefreshTrigger(prev => prev + 1);
                   }} />
                 </DialogContent>
               </Dialog>
            </div>

            {/* Campaign List */}
            {campaigns.length === 0 ? (
               <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center backdrop-blur-md">
                 <p className="text-gray-400">No campaigns found. Start by adding one!</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {campaigns.map(camp => (
                   <Card key={camp._id} className="bg-white/5 border-white/10 backdrop-blur-md hover:border-brand-500/50 transition-colors">
                     <CardHeader>
                       <CardTitle className="text-white">{camp.title}</CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-gray-400 text-sm mb-4 line-clamp-3">{camp.description}</p>
                       <div className="flex justify-between text-xs font-mono text-brand-500/80 mb-2">
                         <span>Raised: {camp.raisedSol || 0} SOL</span>
                         <span>Target: {camp.targetSol} SOL</span>
                       </div>
                       <div className="w-full bg-dark-bg h-2 rounded-full overflow-hidden">
                         <div 
                           className="bg-brand-500 h-full rounded-full" 
                           style={{ width: `${Math.min(((camp.raisedSol || 0) / camp.targetSol) * 100, 100)}%` }}
                         />
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
