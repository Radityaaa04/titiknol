"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname() || "";
  
  // Deteksi bahasa saat ini (default ke 'id')
  const isEn = pathname.startsWith("/en");
  const currentLang = isEn ? "en" : "id";

  // Penentuan sub-jalur saat ini untuk pengalihan mata uang/bahasa yang akurat
  const subPath = pathname.replace(/^\/(id|en)/, "") || "";

  const navSubtitle = isEn 
    ? "Global Enterprise Edition" 
    : "Edisi Khusus Pebisnis & UMKM Indonesia";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 px-6 py-4 md:px-12 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center space-x-6">
        <Link
          href={`/${currentLang}`}
          className="text-xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-violet-400 cursor-pointer focus:outline-none"
        >
          TITIKNOL
        </Link>
        <span className="hidden md:inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-cyan-500/30">
          {navSubtitle}
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href={`/${currentLang}`}
            className={`cursor-pointer transition-colors hover:text-cyan-400 ${
              pathname === `/${currentLang}` ? "text-cyan-400 font-semibold" : "text-white/70"
            }`}
          >
            Home
          </Link>
          <Link
            href={`/${currentLang}/case-study`}
            className={`cursor-pointer transition-colors hover:text-cyan-400 ${
              pathname.includes("/case-study") ? "text-cyan-400 font-semibold" : "text-white/70"
            }`}
          >
            Works
          </Link>
        </nav>

        {/* Dual-Faced Branding Toggle (USD / IDR) */}
        <div className="flex items-center bg-black/50 p-1 rounded-full border border-white/10">
          <Link
            href={`/en${subPath}`}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
              isEn ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/50" : "text-white/60 hover:text-white"
            }`}
          >
            USD
          </Link>
          <Link
            href={`/id${subPath}`}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
              !isEn ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/50" : "text-white/60 hover:text-white"
            }`}
          >
            IDR
          </Link>
        </div>
      </div>
    </header>
  );
}
