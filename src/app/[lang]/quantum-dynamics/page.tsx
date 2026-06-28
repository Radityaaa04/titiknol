"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import gsap from "gsap";

export default function QuantumDynamicsPage() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "id";
  
  const [hoveredHero, setHoveredHero] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);

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
      caseTagline: "Quantum Dynamics — Sub-atomic UI Systems",
      specRole: "Role: Lead Core Engineering & WebGL Architecture",
      specClient: "Client: Quantum Dynamics Global",
      specYear: "Year: 2026",
      challengeTitle: "The Quantum Computing UI Benchmark",
      challengeText1: "Quantum Dynamics required an interface that physically represents the multi-state nature of quantum qubits. Standard design tokens were insufficient for their high-frequency trading and algorithmic simulation platforms.",
      challengeText2: "We engineered a dynamic Torus geometry background that calculates toroidal harmonic coordinates in real-time. This immersive UI elevated their brand identity and secured top-tier enterprise partnerships globally.",
      nextProjectTitle: "Next Case Study",
      nextProjectName: "The Deep Dive",
    },
    id: {
      caseTagline: "Quantum Dynamics — Ekosistem Finansial & Teknologi Masa Depan",
      specRole: "Peran: Desain Sistem & WebGL Berkinerja Tinggi",
      specClient: "Klien: Quantum Dynamics Indonesia",
      specYear: "Tahun: 2026",
      challengeTitle: "Dominasi Teknologi di Pasar Indonesia",
      challengeText1: "Perusahaan teknologi lokal dan fintech membutuhkan tampilan antarmuka yang memancarkan kecanggihan tingkat tinggi agar kredibel di mata investor dan nasabah premium.",
      challengeText2: "Melalui integrasi bentuk Torus 3D interaktif dan tata letak asimetris yang canggih, website ini berhasil meningkatkan rasa percaya (trust) nasabah secara instan dan memperbanyak konversi prospek bisnis berharga.",
      nextProjectTitle: "Proyek Selanjutnya",
      nextProjectName: "The Deep Dive",
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
          backgroundColor: hoveredHero ? "#ffffff" : "rgba(139, 92, 246, 0.4)",
          color: "#000002",
          borderRadius: "50%",
          border: hoveredHero ? "none" : "2px solid #8b5cf6",
          display: cursorPos.x === -100 ? "none" : "flex",
        }}
      >
        {hoveredHero ? "EXPLORE" : ""}
      </div>

      {/* HERO SECTION */}
      <div className="relative min-h-[70vh] flex flex-col justify-between pt-12 pb-16 border-b border-white/10">
        <div>
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/30">
            {cur.caseTagline}
          </span>

          <h1 
            className="mt-8 text-7xl md:text-9xl font-black tracking-tighter text-white hover:text-violet-200 transition-colors duration-500 select-none cursor-default"
            onMouseEnter={() => setHoveredHero(true)}
            onMouseLeave={() => setHoveredHero(false)}
          >
            QUANTUM DYNAMICS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-xs md:text-sm font-medium text-white/70">
          <div className="glass-card p-4 rounded-xl border border-white/10">{cur.specRole}</div>
          <div className="glass-card p-4 rounded-xl border border-white/10">{cur.specClient}</div>
          <div className="glass-card p-4 rounded-xl border border-white/10">{cur.specYear}</div>
        </div>
      </div>

      {/* PARALLAX HERO IMAGE */}
      <div className="relative w-full h-[50vh] md:h-[80vh] mt-16 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-violet-500/10">
        <div ref={parallaxWrapperRef} className="absolute inset-0 w-full h-[120%]">
          <Image
            src="/hifi_ui_design_1782607772379.png"
            fill
            sizes="100vw"
            priority
            alt="Quantum Dynamics Visual"
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-white border-l-4 border-violet-500 pl-4">
              {cur.challengeTitle}
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-base md:text-lg text-white/80 font-light leading-relaxed stagger-item">
            <p>{cur.challengeText1}</p>
            <p>{cur.challengeText2}</p>
          </div>
        </section>

        {/* EXIT TRANSITION / NEXT PROJECT */}
        <section className="pt-24 border-t border-white/10 text-center stagger-item">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-4">
            {cur.nextProjectTitle}
          </span>
          <Link
            href={`/${lang}/case-study`}
            className="text-5xl md:text-8xl font-black tracking-tight text-white hover:text-violet-400 transition-colors duration-500 cursor-pointer block mx-auto py-4 focus:outline-none inline-block"
          >
            {cur.nextProjectName}
          </Link>
          <p className="text-xs text-violet-400/70 mt-3 font-medium">Klik untuk transisi instan tanpa reload (SPA Routing Magic)</p>
        </section>

      </div>
      
      {/* FOOTER */}
      <footer className="relative z-10 w-full mt-32 py-8 border-t border-white/10 text-center text-xs text-white/50 bg-[#000002]/90 backdrop-blur-md">
        <p>© 2026 TitikNol Enterprise | Built with Next.js App Router, Three.js & GSAP. Dual-Faced Branding Active.</p>
      </footer>
    </div>
  );
}
