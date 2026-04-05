"use client";

import Link from "next/link";
import { ArrowRight, Zap, Globe, Lock, Rocket } from "lucide-react";
import DarkVeil from "@/components/DarkVeil";
import CurvedLoop from "@/components/CurvedLoop";

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <DarkVeil
            hueShift={222}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 opacity-0 animate-fade-in-up stagger-1 mt-34 px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dark-border bg-dark-surface/50 text-xs font-mono text-gray-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Welcome to DONOR FI
          </div>

          {/* Main Headline */}
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter text-white mb-6 uppercase leading-tight">
              Fund Impact,
              <br />
              <span className="text-gradient-orange italic inline-block pr-4">Permissionless</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              Discover and support high-impact Web3 initiatives. Direct funding, transparent tracking, and verifiable outcomes on-chain.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in-up stagger-2">
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-brand-600 text-black font-medium transition-colors"
            >
              Explore Campaigns
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-dark-border hover:border-gray-500 text-white font-medium transition-colors"
            >
              My Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="text-white text-center w-full mt-12">
            <CurvedLoop
              marqueeText="DONOR FI ✦ OPEN ✦ CAMPAIGNS ✦ SOLANA ✦"
              speed={1.4}
              curveAmount={100}
              direction="right"
              interactive={false}
              className="custom-text-style"
            />
            {/* <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-500 mb-2">500K+</div>
              <p className="text-sm text-gray-400">SOL Funded</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-500 mb-2">1200+</div>
              <p className="text-sm text-gray-400">Active Campaigns</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-500 mb-2">50K+</div>
              <p className="text-sm text-gray-400">Community Members</p>
            </div>*/}
          </div>
        
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in-up stagger-1">
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter text-white mb-4 uppercase">
            Why DONOR FI?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A new way to support meaningful projects with transparency and security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 animate-fade-in-up stagger-2">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl border border-dark-border bg-dark-surface/50 backdrop-blur-md hover:border-brand-500/50 transition-colors">
            <Globe className="w-8 h-8 text-brand-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase">Permissionless Access</h3>
            <p className="text-gray-400 text-sm">
              Anyone can create or fund campaigns without intermediaries. Pure Web3 enabled.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl border border-dark-border bg-dark-surface/50 backdrop-blur-md hover:border-brand-500/50 transition-colors">
            <Lock className="w-8 h-8 text-brand-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase">On-Chain Verification</h3>
            <p className="text-gray-400 text-sm">
              Every transaction, milestone, and outcome is immutably recorded on Solana.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl border border-dark-border bg-dark-surface/50 backdrop-blur-md hover:border-brand-500/50 transition-colors">
            <Rocket className="w-8 h-8 text-brand-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase">Fast & Efficient</h3>
            <p className="text-gray-400 text-sm">
              Lightning-fast transactions with minimal fees. Maximum impact, minimum overhead.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up stagger-1">
          <div className="p-12 rounded-2xl border border-brand-500/30 bg-brand-500/5 backdrop-blur-md">
            <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter text-white mb-4 uppercase">
              Ready to Make an Impact?
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Connect your wallet and join thousands of supporters funding the future, today.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-black font-medium transition-colors"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
