import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donor Fi | Next-Gen Web3 Funding",
  description: "Explore and fund high-impact, permissionless Web3 initiatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-dark-bg relative selection:bg-brand-500 selection:text-white`}
      >
        {/* Global Noise Overlay */}
        <div className="noise-bg" />

        {/* Background Ambient Glows */}
        <div className="glow-orb w-[600px] h-[600px] bg-brand-500/20 top-[-200px] right-[-100px] animate-blob" />
        <div className="glow-orb w-[500px] h-[500px] bg-indigo-900/20 bottom-[10%] left-[-150px] animate-blob-reverse" />

        <WalletProvider>
           <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
