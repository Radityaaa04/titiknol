"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";

export default function HomePage() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "id";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [lang]);

  const contentData = {
    en: {
      homeTitle: "Next-Gen WebGL Systems & Elite Conversions",
      homeSubtitle: "Architecting immersive digital ecosystems with high-frequency graphics and sub-second interaction models.",
      ctaWork: "Explore Works",
      ctaConsult: "Schedule Enterprise Briefing",
      toastMsg: "Initializing exclusive TitikNol enterprise communication channel...",
      featureSub: "8,000 Particles Additive Blending",
      featureTitle: "Magnetic Repulsion Engine",
      featureDesc: "Move your mouse across the screen to experience real-time calculated WebGL physics. Particles dynamically separate and lerp back into position.",
      featureLink: "View Case Study: The Deep Dive",
    },
    id: {
      homeTitle: "Tingkatkan Omset Bisnis Lewat Website Interaktif Premium",
      homeSubtitle: "Kami menciptakan pengalaman visual memukau yang dirancang khusus untuk mendominasi pasar lokal dan melipatgandakan konversi penjualan Anda.",
      ctaWork: "Lihat Portofolio",
      ctaConsult: "Konsultasi Gratis Sekarang",
      toastMsg: "Menginisialisasi kanal komunikasi eksklusif TitikNol...",
      featureSub: "8,000 Partikel Additive Blending",
      featureTitle: "Mesin Reaksi Magnetik Kursor",
      featureDesc: "Gerakkan kursor Anda ke sekeliling layar untuk merasakan reaksi fisik partikel 3D secara langsung. Sistem magnetik akan memisahkan partikel dan mengembalikannya dengan mulus.",
      featureLink: "Lihat Studi Kasus: The Deep Dive",
    },
  };

  const cur = contentData[lang];

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-28 pb-16 w-full">
      <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Three.js + Next.js Dynamic Routing Immersive Experience</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-glow">
          {cur.homeTitle}
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
          {cur.homeSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6 w-full sm:w-auto">
          <Link
            href={`/${lang}/case-study`}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-black font-extrabold tracking-wide hover:opacity-90 transition-all shadow-xl shadow-cyan-500/20 cursor-pointer text-base inline-block"
          >
            {cur.ctaWork}
          </Link>
          <button
            onClick={() => alert(cur.toastMsg)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel font-bold tracking-wide text-white hover:border-cyan-400 transition-all cursor-pointer text-base"
          >
            {cur.ctaConsult}
          </button>
        </div>

        {/* Micro-interaction Showcase Feature Card */}
        <div className="mt-16 w-full max-w-2xl glass-card rounded-2xl p-6 text-left border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Interactive Feature</span>
            <span className="text-xs text-white/50">{cur.featureSub}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{cur.featureTitle}</h3>
          <p className="text-sm text-white/60 mb-4">{cur.featureDesc}</p>
          <Link 
            href={`/${lang}/case-study`} 
            className="text-xs font-extrabold text-cyan-400 hover:underline inline-flex items-center space-x-2 cursor-pointer"
          >
            <span>{cur.featureLink}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
