"use client";

import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-dark-border mt-auto py-12 relative z-10 glass-panel">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-brand-500" />
          <span className="font-heading font-bold text-xl tracking-tighter uppercase">
            NEXUS
          </span>
        </div>

        <div className="flex gap-8 text-sm font-mono text-gray-500">
          <a
            href="#"
            className="hover:text-brand-500 transition-colors uppercase tracking-widest"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-brand-500 transition-colors uppercase tracking-widest"
          >
            Discord
          </a>
          <a
            href="#"
            className="hover:text-brand-500 transition-colors uppercase tracking-widest"
          >
            Github
          </a>
        </div>

        <p className="text-xs text-gray-600 font-mono uppercase tracking-widest">
          &copy; 2026 Nexus Protocol
        </p>
      </div>
    </footer>
  );
}
