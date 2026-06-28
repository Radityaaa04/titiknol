"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import gsap from "gsap";

export default function CaseStudyPage() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "id";
  
  const [hoveredHero, setHoveredHero] = useState(false);
  const [wireframeHovered, setWireframeHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP Staggered Entrance
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (textContentRef.current) {
      gsap.fromTo(
        textContentRef.current.querySelectorAll(".stagger-item"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [lang]);

  // Parallax Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxWrapperRef.current) return;
      const scrollY = window.scrollY;
      parallaxWrapperRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contentData = {
    en: {
      caseTagline: "Aetheris OS — High-Fidelity Engineering Masterpiece",
      specRole: "Role: Lead Architectural UI/UX & WebGL Systems",
      specClient: "Client: Aetheris Global AI Neural Network",
      specYear: "Year: 2026",
      challengeTitle: "The Enterprise Architectural Challenge",
      challengeText1: "In an increasingly competitive corporate technology landscape, flat standard design templates fail to convey authority. Aetheris required an ultra-high-fidelity interactive ecosystem capable of representing complex AI neural calculations in a visually breathtaking format.",
      challengeText2: "We built an uncompromised WebGL pipeline paired with an elite dark glassmorphism design system. This zero-latency environment achieved perfect Google Lighthouse performance scores and secured global corporate dominance.",
      processTitle: "Deep Architectural Process & Wireframe Verification",
      processSub: "Hover over the foundational blueprint wireframe below to instantly reveal the world-class High-Fidelity Glassmorphism Analytics Dashboard.",
      typoTitle: "Asymmetrical Layout & Typographic Hierarchy",
      typoDesc: "Precision typography separates standard web pages from Awwwards winners. We implemented a rigorous dual-font architecture pairing Geist Sans for extreme headline clarity with Geist Mono for tabular data structures.",
      typoHighlight1: "Heading Hierarchy: Geist Sans, Bold 900, -0.05em Tracking.",
      typoHighlight2: "Microcopy & Metrics: Geist Mono, Medium 500, +0.1em Tracking.",
      designTasteTitle: "Harmonic Color System & Psychology",
      designTasteDesc: "Every element in this ecosystem adheres to rigorous visual guidelines. The background vectors dynamically morph between abstract cosmic dispersion and strict geometric project silhouettes to maintain optimal visual hierarchy.",
      nextProjectTitle: "Next Flagship Project",
      nextProjectName: "Quantum Dynamics",
    },
    id: {
      caseTagline: "Aetheris OS — Bukti Nyata Kedalaman Pemikiran Desain TitikNol",
      specRole: "Peran: UI/UX Premium, Desain Sistem & Arsitektur WebGL",
      specClient: "Klien: Aetheris Korporat (Flagship Project)",
      specYear: "Tahun: 2026",
      challengeTitle: "Tantangan Utama Menaklukkan Juri Awwwards & Korporat",
      challengeText1: "Klien korporat raksasa dan juri Awwwards tidak akan terpukau dengan desain template standar yang dangkal. Mereka membutuhkan bukti nyata kedalaman pemikiran, struktur asimetris yang tidak terduga, dan eksekusi visual tingkat mahakarya.",
      challengeText2: "Melalui pengerjaan portofolio 'Bakar Waktu' ini, kami merancang Aetheris OS—sebuah antarmuka dasbor analitik High-Fidelity yang diperkaya efek glassmorphism berkelas tinggi. Hasil akhir ini tidak hanya memanjakan mata secara estetika, namun juga membuktikan kapasitas TitikNol dalam menangani proyek korporat berskala internasional.",
      processTitle: "Proses Kerja Mendalam: Wireframe Menuju Hi-Fi",
      processSub: "Arahkan kursor (hover) pada sketsa wireframe struktural di bawah ini untuk melihat transisi instan menuju wujud asli desain UI High-Fidelity kelas dunia.",
      typoTitle: "Tata Letak Asimetris & Skala Tipografi Presisi",
      typoDesc: "Tipografi adalah nyawa dari sebuah mahakarya desain. Kami memadukan font Geist Sans dengan kerning super rapat untuk memberikan kesan tegas dan berwibawa pada judul utama, dipadukan dengan Geist Mono untuk angka analitik agar terbaca sempurna dengan keakuratan tinggi.",
      typoHighlight1: "Judul Asimetris: Geist Sans, Bobot 900, Rapat -0.05em.",
      typoHighlight2: "Angka & Indikator: Geist Mono, Bobot 500, Renggang +0.1em.",
      designTasteTitle: "Palet Warna Harmonis & Reaksi WebGL",
      designTasteDesc: "Pemilihan warna dirancang untuk memicu rasa percaya (trust) seketika dari klien korporat. Warna dasar gelap pekat dipadukan dengan pendaran cahaya neon agar elemen grafik analitik Anda tampak menonjol dan hidup di layar apa pun.",
      nextProjectTitle: "Proyek Masterpiece Selanjutnya",
      nextProjectName: "Quantum Dynamics",
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
        {hoveredHero ? "SCROLL" : ""}
      </div>

      {/* HERO SECTION */}
      <div className="relative min-h-[70vh] flex flex-col justify-between pt-12 pb-16 border-b border-white/10">
        <div>
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-5 py-2.5 rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/10 inline-block">
            {cur.caseTagline}
          </span>

          <h1 
            className="mt-8 text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white hover:text-cyan-200 transition-colors duration-500 select-none cursor-default leading-none"
            onMouseEnter={() => setHoveredHero(true)}
            onMouseLeave={() => setHoveredHero(false)}
          >
            AETHERIS OS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-xs md:text-sm font-medium text-white/70">
          <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-xl">{cur.specRole}</div>
          <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-xl">{cur.specClient}</div>
          <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-xl">{cur.specYear}</div>
        </div>
      </div>

      {/* PARALLAX HERO IMAGE */}
      <div className="relative w-full h-[50vh] md:h-[80vh] mt-16 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-500/10">
        <div ref={parallaxWrapperRef} className="absolute inset-0 w-full h-[120%]">
          <Image
            src="/hifi_elite_dashboard.png"
            fill
            sizes="100vw"
            priority
            alt="Aetheris OS Masterpiece Visual"
            className="object-cover object-top scale-105 transition-transform duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000002] via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
      </div>

      {/* CONTENT BREAKDOWN */}
      <div ref={textContentRef} className="mt-28 max-w-6xl mx-auto space-y-36">
        
        {/* THE CHALLENGE */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 stagger-item">
            <h2 className="text-3xl md:text-4xl font-black text-white border-l-4 border-cyan-500 pl-5 leading-tight">
              {cur.challengeTitle}
            </h2>
          </div>
          <div className="md:col-span-7 space-y-8 text-lg md:text-xl text-white/80 font-light leading-relaxed stagger-item">
            <p>{cur.challengeText1}</p>
            <p>{cur.challengeText2}</p>
          </div>
        </section>

        {/* PROCESS & WIREFRAME TO HI-FI INTERACTION */}
        <section className="space-y-10 stagger-item bg-[#101016]/90 p-8 md:p-14 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="text-left space-y-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{cur.processTitle}</h2>
            <p className="text-base md:text-lg text-cyan-300 font-medium leading-relaxed">{cur.processSub}</p>
          </div>

          <div 
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl transition-all duration-700 cursor-pointer group"
            onMouseEnter={() => setWireframeHovered(true)}
            onMouseLeave={() => setWireframeHovered(false)}
          >
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 z-10 ${wireframeHovered ? "opacity-0" : "opacity-100"}`}>
              <Image
                src="/wireframe_sketch_1782607763886.png"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                alt="Wireframe Blueprint"
                className="object-cover"
              />
            </div>
            
            <div className={`absolute inset-0 w-full h-full transition-all duration-700 z-10 ${wireframeHovered ? "opacity-100 scale-102" : "opacity-0 scale-100"}`}>
              <Image
                src="/hifi_spatial_architecture.png"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                alt="High Fidelity Spatial UI Design"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur-xl px-6 py-3.5 rounded-full border border-white/20 flex items-center space-x-3 pointer-events-none shadow-2xl">
              <div className={`w-3.5 h-3.5 rounded-full transition-colors duration-500 ${wireframeHovered ? "bg-cyan-400 animate-pulse" : "bg-violet-500"}`} />
              <span className="text-xs font-black uppercase tracking-wider text-white">
                {wireframeHovered ? "World-Class High-Fidelity UI Masterpiece" : "Foundational Blueprint Wireframe"}
              </span>
            </div>
          </div>
        </section>

        {/* ASYMMETRICAL TYPOGRAPHY & LAYOUT */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center stagger-item bg-gradient-to-r from-[#12121c] to-[#0d0d14] p-10 md:p-14 rounded-3xl border border-white/10 shadow-2xl">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{cur.typoTitle}</h2>
            <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">{cur.typoDesc}</p>
            <div className="space-y-4 pt-4 text-xs md:text-sm font-semibold text-cyan-400">
              <div className="glass-card p-4 rounded-xl border border-cyan-500/30">{cur.typoHighlight1}</div>
              <div className="glass-card p-4 rounded-xl border border-cyan-500/30">{cur.typoHighlight2}</div>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-center items-center p-8 glass-card rounded-2xl border border-white/20 text-center space-y-6">
            <div className="text-7xl font-black text-white tracking-tighter">Aa</div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-white block">Geist Sans & Mono</span>
              <span className="text-xs text-white/50 block">Designed by Vercel for Ultra Clarity</span>
            </div>
          </div>
        </section>

        {/* DESIGN TASTE & COLORS */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center stagger-item">
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{cur.designTasteTitle}</h2>
            <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">{cur.designTasteDesc}</p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-cyan-500/30 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#06b6d4] shadow-lg shadow-cyan-500/50" />
              <span className="text-xs font-bold">Cyber Cyan</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-violet-500/30 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#8b5cf6] shadow-lg shadow-violet-500/50" />
              <span className="text-xs font-bold">Neon Violet</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-white/30 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#ffffff] shadow-lg shadow-white/50" />
              <span className="text-xs font-bold">Pure White</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-indigo-500/30 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-[#1e1b4b] shadow-lg shadow-indigo-500/50" />
              <span className="text-xs font-bold">Deep Navy</span>
            </div>
          </div>
        </section>

        {/* EXIT TRANSITION / NEXT PROJECT */}
        <section className="pt-28 border-t border-white/10 text-center stagger-item">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-4">
            {cur.nextProjectTitle}
          </span>
          <Link
            href={`/${lang}/quantum-dynamics`}
            className="text-5xl md:text-8xl font-black tracking-tight text-white hover:text-cyan-400 transition-colors duration-500 cursor-pointer block mx-auto py-4 focus:outline-none inline-block"
          >
            {cur.nextProjectName}
          </Link>
          <p className="text-xs text-cyan-400/70 mt-3 font-medium">Klik untuk transisi instan tanpa reload (SPA Routing Magic)</p>
        </section>

      </div>
      
      {/* FOOTER */}
      <footer className="relative z-10 w-full mt-40 py-10 border-t border-white/10 text-center text-xs text-white/50 bg-[#000002]/90 backdrop-blur-md">
        <p>© 2026 TitikNol Enterprise | Built with Next.js App Router, Three.js & GSAP. Dual-Faced Branding Active.</p>
      </footer>
    </div>
  );
}
