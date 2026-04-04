"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletConnect } from "./WalletConnect";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-7xl backdrop-blur-lg rounded-full border border-white/15 shadow-2xl shadow-black/80">
        <div className="px-4 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-brand-500/30 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-black transition-all duration-300">
                <Zap className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="font-heading font-bold text-xl md:text-2xl tracking-tighter uppercase">
                DONOR FI
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden md:flex gap-8 text-sm font-medium mr-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/explore", label: "Explore" },
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/create-ngo", label: "Create NGO" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "transition-colors relative py-1",
                      pathname === href
                        ? "text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-500 after:rounded-full"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Connect Wallet Button */}
              <WalletConnect />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
