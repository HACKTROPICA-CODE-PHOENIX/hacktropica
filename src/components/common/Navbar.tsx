"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletConnect } from "./WalletConnect";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/create-ngo", label: "Create NGO" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-2 sm:px-4">
      <nav 
        className={cn(
          "pointer-events-auto w-full md:w-auto md:max-w-7xl backdrop-blur-lg border border-white/15 shadow-2xl shadow-black/80 transition-colors duration-300",
          isMobileMenuOpen ? "rounded-3xl bg-dark-surface/80" : "rounded-full"
        )}
      >
        <div className="px-2 sm:px-4 md:px-8 flex justify-between items-center h-14 sm:h-16 md:h-20 min-h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 sm:gap-2 md:gap-3 cursor-pointer group hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-black transition-all duration-300 flex-shrink-0">
              <img src="/images/logo.png" alt="logo" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
            <span className="font-heading font-bold text-base sm:text-lg md:text-2xl tracking-tighter uppercase whitespace-nowrap hidden sm:inline">
              DONOR FI
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-6">
            <div className="hidden md:flex gap-8 text-sm font-medium mr-2">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "transition-colors relative py-1 whitespace-nowrap",
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

            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button
              className="md:hidden p-1 sm:p-2 text-gray-400 hover:text-white transition-colors flex-shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 -mx-2 sm:-mx-4 md:-mx-8 px-2 sm:px-4 md:px-8 py-3 sm:py-4 animate-fade-in-up">
            <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base font-medium">
              {navItems
                .filter((item) => item.label !== "Home")
                .map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "pl-3 transition-colors block py-2 border-b border-white/5 last:border-0",
                      pathname === href
                        ? "text-brand-500 font-semibold"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
