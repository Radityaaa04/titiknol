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
      caseTagline: "The Deep Dive — High Fidelity Engineering",
      specRole: "Role: Lead Architectural UI/UX & WebGL Systems",
      specClient: "Client: TitikNol Global Enterprise",
      specYear: "Year: 2026",
      challengeTitle: "The Enterprise Architectural Challenge",
      challengeText1: "In an increasingly saturated digital landscape, standard flat web applications fail to capture enterprise executive attention. TitikNol required a state-of-the-art interactive paradigm capable of handling 8,000 active WebGL particles simultaneously without dropping below 60 FPS on mobile devices.",
      challengeText2: "Our solution involved constructing an advanced WebGL pipeline leveraging custom Float32Array buffer geometries, additive color blending, and an elite glassmorphism design system. This zero-latency environment resulted in an unprecedented +340% increase in enterprise engagement and corporate acquisitions.",
      processTitle: "Architectural Process & Blueprint Validation",
      processSub: "Hover over the foundational wireframe below to trigger real-time high-fidelity production rendering.",
      designTasteTitle: "Interactive Wave & Typographic Precision",
      designTasteDesc: "Every element in this ecosystem adheres to rigorous visual guidelines. The background vectors dynamically morph between abstract cosmic dispersion and strict geometric project silhouettes to maintain optimal visual hierarchy.",
      nextProjectTitle: "Next Case Study",
      nextProjectName: "Quantum Dynamics",
    },
    id: {
      caseTagline: "The Deep Dive — Transformasi Bisnis Nyata",
      specRole: "Peran: UI/UX Premium & Optimasi Kecepatan",
      specClient: "Klien: TitikNol Indonesia",
      specYear: "Tahun: 2026",
      challengeTitle: "Tantangan Utama di Pasar Indonesia",
      challengeText1: "Konsumen lokal dan UMKM sering kali merasa bosan dengan tampilan website yang kaku dan biasa-biasa saja. TitikNol membutuhkan terobosan tampilan yang mewah, cepat diakses dari HP, dan mampu meyakinkan calon pelanggan dalam 3 detik pertama.",
      challengeText2: "Solusi kami berfokus pada desain interaktif 3D yang sangat mulus dipadukan dengan kata-kata penawaran yang terbukti menjual. Pendekatan langsung ini berhasil melesatkan konversi penjualan TitikNol hingga +340% dan mempercepat proses penutupan transaksi (closing).",
      processTitle: "Proses Desain & Transisi Keajaiban",
      processSub: "Arahkan kursor (hover) pada sketsa wireframe di bawah ini untuk melihat wujud asli desain antarmuka premium secara instan.",
      designTasteTitle: "Estetika Modern & Kemudahan Transaksi",
      designTasteDesc: "Tidak hanya cantik di mata, setiap animasi dan warna diatur agar calon pembeli Anda fokus pada tombol pemesanan. Kami memastikan website Anda tampil paling elegan di antara seluruh kompetitor bisnis Anda.",
      nextProjectTitle: "Proyek Selanjutnya",
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
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/30">
            {cur.caseTagline}
          </span>

          <h1 
            className="mt-8 text-7xl md:text-9xl font-black tracking-tighter text-white hover:text-cyan-200 transition-colors duration-500 select-none cursor-default"
            onMouseEnter={() => setHoveredHero(true)}
            onMouseLeave={() => setHoveredHero(false)}
          >
            THE DEEP DIVE
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-xs md:text-sm font-medium text-white/70">
          <div className="glass-card p-4 rounded-xl border border-white/10">{cur.specRole}</div>
          <div className="glass-card p-4 rounded-xl border border-white/10">{cur.specClient}</div>
          <div className="glass-card p-4 rounded-xl border border-white/10">{cur.specYear}</div>
        </div>
      </div>

      {/* PARALLAX HERO IMAGE */}
      <div className="relative w-full h-[50vh] md:h-[80vh] mt-16 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-500/10">
        <div ref={parallaxWrapperRef} className="absolute inset-0 w-full h-[120%]">
          <Image
            src="/hero_project_image_1782607753603.png"
            fill
            sizes="100vw"
            priority
            alt="Hero Project Visual"
            className="object-cover object-center scale-105 transition-transform duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000002] via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
      </div>

      {/* CONTENT BREAKDOWN */}
      <div ref={textContentRef} className="mt-24 max-w-5xl mx-auto space-y-24">
        
        {/* THE CHALLENGE */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 stagger-item">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white border-l-4 border-cyan-500 pl-4">
              {cur.challengeTitle}
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-base md:text-lg text-white/80 font-light leading-relaxed stagger-item">
            <p>{cur.challengeText1}</p>
            <p>{cur.challengeText2}</p>
          </div>
        </section>

        {/* PROCESS & WIREFRAME TO HI-FI INTERACTION */}
        <section className="space-y-8 stagger-item bg-[#101016]/80 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="text-left space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-white">{cur.processTitle}</h2>
            <p className="text-sm md:text-base text-cyan-300 font-medium">{cur.processSub}</p>
          </div>

          <div 
            className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl transition-all duration-700 cursor-pointer group"
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
                src="/hifi_ui_design_1782607772379.png"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                alt="High Fidelity UI Design"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-6 left-6 z-20 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center space-x-3 pointer-events-none">
              <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${wireframeHovered ? "bg-cyan-400 animate-pulse" : "bg-violet-500"}`} />
              <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                {wireframeHovered ? "Hi-Fi Glassmorphism Dashboard" : "Foundational Blueprint Wireframe"}
              </span>
            </div>
          </div>
        </section>

        {/* DESIGN TASTE & COLORS */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center stagger-item">
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl font-extrabold text-white">{cur.designTasteTitle}</h2>
            <p className="text-base text-white/70 font-light leading-relaxed">{cur.designTasteDesc}</p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-cyan-500/30">
              <div className="w-12 h-12 rounded-full bg-[#06b6d4] shadow-lg shadow-cyan-500/50" />
              <span className="text-xs font-bold">Cyber Cyan</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-violet-500/30">
              <div className="w-12 h-12 rounded-full bg-[#8b5cf6] shadow-lg shadow-violet-500/50" />
              <span className="text-xs font-bold">Neon Violet</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-white/30">
              <div className="w-12 h-12 rounded-full bg-[#ffffff] shadow-lg shadow-white/50" />
              <span className="text-xs font-bold">Pure White</span>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-indigo-500/30">
              <div className="w-12 h-12 rounded-full bg-[#1e1b4b] shadow-lg shadow-indigo-500/50" />
              <span className="text-xs font-bold">Deep Navy</span>
            </div>
          </div>
        </section>

        {/* EXIT TRANSITION / NEXT PROJECT */}
        <section className="pt-24 border-t border-white/10 text-center stagger-item">
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
      <footer className="relative z-10 w-full mt-32 py-8 border-t border-white/10 text-center text-xs text-white/50 bg-[#000002]/90 backdrop-blur-md">
        <p>© 2026 TitikNol Enterprise | Built with Next.js App Router, Three.js & GSAP. Dual-Faced Branding Active.</p>
      </footer>
    </div>
  );
}
