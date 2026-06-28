"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import gsap from "gsap";

export default function HomePage() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "id";

  const [hoveredHero, setHoveredHero] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll(".stagger-section"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [lang]);

  const contentData = {
    en: {
      heroTag: "Awwwards SOTY Level Single Page Application",
      heroHeadline: "ELITE ARCHITECTURAL EXECUTION",
      heroSub: "Combining 8,000 active WebGL buffer particles with ultra-high-fidelity glassmorphism design systems. Engineered for global corporate superiority.",
      primaryCta: "Explore Deep Dive Case Study",
      whiteLabelBadge: "Global Agency Partnership Route",
      whiteLabelTitle: "Elite White-Label Execution for US, EU & AUS Creative Agencies",
      whiteLabelDesc: "Expand your agency's margins without overhead. You pitch and close premium enterprise contracts in your regional market; TitikNol executes world-class, Awwwards-winning frontend, WebGL, and Next.js engineering in absolute silence. Fully white-labeled under your brand.",
      whiteLabelHighlight1: "Seamless Slack & GitHub integration as your in-house senior engineers.",
      whiteLabelHighlight2: "Guaranteed 60 FPS WebGL rendering and perfect Google Lighthouse scores.",
      tierTitle: "Global Corporate Acquisition Tiers",
      tierSub: "Deterministic engineering packages designed to secure market dominance.",
      tiers: [
        {
          name: "Starter Layer",
          target: "For Agile Seed Ventures",
          price: "$2,400",
          desc: "Lightning-fast high-fidelity landing architecture optimized for immediate conversion and lead generation.",
          features: ["Next.js App Router Single Page App", "Premium Glassmorphism Design Token", "Standard Parallax & GSAP Entrances", "1-Week Accelerated Delivery"],
          cta: "Initialize Starter",
        },
        {
          name: "Professional Grid",
          target: "For Scaling Mid-Market Innovators",
          price: "$5,800",
          desc: "Complete asymmetrical multi-page narrative structure with advanced micro-interactions and elite branding immersion.",
          features: ["Dynamic Dual-Faced Localization", "Advanced Lenis Smooth Scroll Setup", "Custom 3D Hover & Image Morphing", "High-Fidelity Wireframing & UI Polish", "3-Week Production Cycle"],
          cta: "Deploy Professional",
          popular: true,
        },
        {
          name: "Enterprise Ecosystem",
          target: "For Fortune 500 & Global Institutions",
          price: "$14,500+",
          desc: "Bespoke engineering masterpiece built from absolute scratch. Zero-latency 8,000 WebGL particle systems with magnetic cursor physics.",
          features: ["Awwwards SOTY Target Architecture", "Dedicated Unmounted RootLayout WebGL", "Custom Three.js Shaders & BufferGeom", "Comprehensive High-Fidelity Design System", "24/7 Priority SLA & White-Label Route"],
          cta: "Secure Enterprise",
        },
      ],
      caseStudyTitle: "Breathtaking Corporate Portfolio",
      caseStudyDesc: "Witness the depth of TitikNol's design thinking through our flagship high-fidelity engineering blueprints.",
      caseName: "Aetheris OS — Autonomous AI Neural Grid",
      caseCategory: "Spatial Computing & Financial Network",
    },
    id: {
      heroTag: "Arsitektur Premium SOTY 60 FPS",
      heroHeadline: "MAHAKARYA ANTARMUKA KELAS DUNIA",
      heroSub: "Kami melebur 8.000 partikel WebGL dengan desain UI High-Fidelity mewah bergaya glassmorphism. Dirancang khusus untuk mendongkrak konversi dan kredibilitas bisnis Anda seketika.",
      primaryCta: "Lihat Bedah Kasus & Portofolio",
      whiteLabelBadge: "Jalur Kemitraan White-Label Internasional",
      whiteLabelTitle: "Eksekusi Elite di Balik Layar untuk Creative Agency Global",
      whiteLabelDesc: "Bagi Anda pemilik agensi atau perantara proyek di pasar global (AS, Eropa, Australia), raih keuntungan maksimal dalam kurs USD tanpa pusing memikirkan teknis. Anda yang mencari klien, tim senior TitikNol yang mengerjakan coding, WebGL, dan desain antarmukanya secara profesional di balik layar.",
      whiteLabelHighlight1: "Dukungan penuh sebagai tim internal agensi Anda (Slack & GitHub).",
      whiteLabelHighlight2: "Garansi performa 60 FPS dan skor sempurna di Google Lighthouse.",
      tierTitle: "Etalase Layanan Bisnis TitikNol",
      tierSub: "Penawaran terstruktur dengan jelas dan tegas untuk setiap skala bisnis.",
      tiers: [
        {
          name: "Paket Starter",
          target: "Khusus UMKM & Bisnis Berkembang",
          price: "Rp 8.500.000",
          desc: "Tampilan website mewah, ringkas, dan langsung tuntas. Dirancang khusus dengan rumus copywriting jitu untuk meningkatkan omset secara cepat.",
          features: ["Next.js SPA Berkecepatan Tinggi", "Desain Glassmorphism Mewah", "Animasi Transisi GSAP & Paralaks", "Selesai Cepat dalam 7 Hari Kerja"],
          cta: "Pilih Paket Starter",
        },
        {
          name: "Paket Pro",
          target: "Untuk Bisnis Menengah yang Ingin Naik Kelas",
          price: "Rp 21.000.000",
          desc: "Struktur penceritaan halaman lengkap dengan tata letak asimetris memukau, memikat calon investor dan pelanggan korporat besar.",
          features: ["Fitur Bahasa Dual-Faced Branding", "Pengguliran Sutra Lenis Smooth Scroll", "Efek Hover 3D & Morfing Dinamis", "Penyempurnaan UI High-Fidelity", "Selesai dalam 3 Minggu"],
          cta: "Pilih Paket Pro",
          popular: true,
        },
        {
          name: "Paket Enterprise",
          target: "Solusi Kustom Total untuk Korporat & Agensi",
          price: "Rp 55.000.000+",
          desc: "Pembangunan mahakarya digital dari nol (from scratch). Dilengkapi mesin 8.000 partikel 3D WebGL dengan tolakan magnetik kursor interaktif.",
          features: ["Target Kualitas Juara Awwwards SOTY", "Animasi Background Persisten Non-Unmount", "Shader Three.js Kustom & BufferGeom", "Desain Sistem Eksklusif Sepenuhnya", "Prioritas Dukungan 24/7 & White-Label"],
          cta: "Pilih Paket Enterprise",
        },
      ],
      caseStudyTitle: "Portofolio 'Bakar Waktu' & Bukti Kualitas",
      caseStudyDesc: "Bukti kedalaman pemikiran desain TitikNol melalui pengerjaan proyek antarmuka High-Fidelity dengan standar estetika tertinggi di dunia.",
      caseName: "Aetheris OS — Sistem Jaringan Saraf AI Otomatis",
      caseCategory: "Komputasi Spasial & Platform Finansial Quantum",
    },
  };

  const cur = contentData[lang];

  return (
    <div ref={containerRef} className="relative z-10 w-full pt-28 pb-32 px-6 md:px-16 lg:px-24">
      {/* Custom Cursor */}
      <div
        className={`custom-cursor flex items-center justify-center font-bold tracking-widest text-xs shadow-xl backdrop-blur-md`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: hoveredHero ? "96px" : "24px",
          height: hoveredHero ? "96px" : "24px",
          backgroundColor: hoveredHero ? "#ffffff" : "rgba(6, 182, 212, 0.4)",
          color: "#000002",
          borderRadius: "50%",
          border: hoveredHero ? "none" : "2px solid #06b6d4",
          display: cursorPos.x === -100 ? "none" : "flex",
        }}
      >
        {hoveredHero ? "SOTY" : ""}
      </div>

      {/* HERO SECTION */}
      <div className="relative min-h-[75vh] flex flex-col justify-center items-start border-b border-white/10 pb-20">
        <div className="space-y-8 max-w-5xl">
          <span className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-5 py-2.5 rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/10 inline-block">
            {cur.heroTag}
          </span>

          <h1 
            className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white hover:text-cyan-200 transition-colors duration-500 select-none cursor-default leading-none"
            onMouseEnter={() => setHoveredHero(true)}
            onMouseLeave={() => setHoveredHero(false)}
          >
            {cur.heroHeadline}
          </h1>

          <p className="text-lg md:text-2xl text-white/80 font-light max-w-3xl leading-relaxed">
            {cur.heroSub}
          </p>

          <div className="pt-6">
            <Link
              href={`/${lang}/case-study`}
              aria-label={cur.primaryCta}
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm md:text-base tracking-wider uppercase px-9 py-5 rounded-full shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:scale-105 transform"
            >
              <span>{cur.primaryCta}</span>
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* BODY SECTIONS */}
      <div ref={contentRef} className="mt-28 space-y-36 max-w-7xl mx-auto">

        {/* FLAGSHIP PORTFOLIO HERO / CASE STUDY */}
        <section className="stagger-section space-y-12">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">{cur.caseStudyTitle}</h2>
            <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">{cur.caseStudyDesc}</p>
          </div>

          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-500/10 group">
            <Image
              src="/hifi_elite_dashboard.png"
              fill
              sizes="100vw"
              priority
              alt="Elite Dashboard UI"
              className="object-cover object-top transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
            
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/20 px-4 py-1.5 rounded-full border border-cyan-500/30">
                  {cur.caseCategory}
                </span>
                {/* Hierarki yang benar: h2 -> h3 */}
                <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{cur.caseName}</h3>
              </div>

              <Link
                href={`/${lang}/case-study`}
                aria-label={lang === "en" ? "Explore Full Breakdown" : "Lihat Eksplorasi Penuh"}
                className="glass-card bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl font-bold uppercase text-xs md:text-sm tracking-widest px-8 py-4 rounded-full transition-all duration-300 text-center shrink-0 shadow-xl hover:border-cyan-400"
              >
                {lang === "en" ? "Explore Full Breakdown" : "Lihat Eksplorasi Penuh"}
              </Link>
            </div>
          </div>
        </section>

        {/* WHITE-LABEL INTERNATIONAL PATHWAY */}
        <section className="stagger-section relative bg-gradient-to-r from-[#101018] to-[#161622] p-10 md:p-16 rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-violet-400 bg-violet-500/20 px-4 py-1.5 rounded-full border border-violet-500/30">
                {cur.whiteLabelBadge}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">{cur.whiteLabelTitle}</h2>
              <p className="text-base md:text-lg text-white/80 font-light leading-relaxed">{cur.whiteLabelDesc}</p>
              
              <div className="space-y-4 pt-4 text-sm text-white/90 font-medium">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />
                  <span>{cur.whiteLabelHighlight1}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-lg shadow-violet-500/50" />
                  <span>{cur.whiteLabelHighlight2}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src="/hifi_spatial_architecture.png"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                alt="White Label Agency Architecture"
                className="object-cover object-center scale-102 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* BUSINESS STRATEGY TIERS */}
        <section className="stagger-section space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">{cur.tierTitle}</h2>
            <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">{cur.tierSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {cur.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`glass-card flex flex-col justify-between p-8 md:p-10 rounded-3xl border transition-all duration-500 hover:scale-[1.02] transform ${
                  tier.popular
                    ? "border-cyan-500/60 bg-[#14141e]/90 shadow-2xl shadow-cyan-500/20"
                    : "border-white/10 bg-[#0c0c12]/70"
                }`}
              >
                <div className="space-y-6">
                  {tier.popular && (
                    <span className="text-xs font-extrabold uppercase tracking-widest text-black bg-cyan-400 px-4 py-1.5 rounded-full shadow-lg shadow-cyan-500/50 block w-max">
                      {lang === "en" ? "Most Selected Tactic" : "Pilihan Terfavorit"}
                    </span>
                  )}

                  <div>
                    <h3 className="text-2xl font-black text-white">{tier.name}</h3>
                    <span className="text-xs font-semibold text-cyan-400/80 uppercase tracking-widest block mt-1">
                      {tier.target}
                    </span>
                  </div>

                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight pt-2 border-t border-white/10">
                    {tier.price}
                  </div>

                  <p className="text-sm text-white/70 font-light leading-relaxed pt-2">
                    {tier.desc}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-3 text-xs md:text-sm text-white/90 font-medium">
                        <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10">
                  <button 
                    aria-label={`${tier.cta} - ${tier.name}`}
                    className={`w-full py-4 rounded-full font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 shadow-xl ${
                      tier.popular
                        ? "bg-cyan-400 hover:bg-cyan-300 text-black shadow-cyan-500/30"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full mt-40 py-10 border-t border-white/10 text-center text-xs text-white/50 bg-[#000002]/90 backdrop-blur-md">
        <p>© 2026 TitikNol Enterprise | Built with Next.js App Router, Three.js & GSAP. Dual-Faced Branding Active.</p>
      </footer>
    </div>
  );
}
