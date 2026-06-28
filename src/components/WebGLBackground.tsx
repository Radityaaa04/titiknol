"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "";
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const targetPositionsRef = useRef<Float32Array | null>(null);
  const initialPositionsRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // 1. Inisialisasi Mesin Three.js (SOTY Performance - Never Unmounted + Dynamic Scaling & Pause Optimization)
  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Dynamic Scaling: Menyesuaikan jumlah partikel secara cerdas berdasarkan kapabilitas hardware & layar
    const isLowEnd = typeof navigator !== "undefined" && ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || window.innerWidth < 768);
    const count = isLowEnd ? 3500 : 8000;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color(0x06b6d4), // Cyber Cyan
      new THREE.Color(0x8b5cf6), // Neon Violet
      new THREE.Color(0xffffff), // Pure White
      new THREE.Color(0x1e1b4b), // Deep Navy
    ];

    for (let i = 0; i < count; i++) {
      // Bentuk default: Galaksi kosmik melingkar (Home)
      const radius = THREE.MathUtils.randFloat(5, 35);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = Math.acos(THREE.MathUtils.randFloat(-1, 1));

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      targetPositions[i * 3] = x;
      targetPositions[i * 3 + 1] = y;
      targetPositions[i * 3 + 2] = z;

      // Alokasi warna
      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Material dengan Additive Blending
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particlesMeshRef.current = points;
    targetPositionsRef.current = targetPositions;
    initialPositionsRef.current = initialPositions;

    // Mouse Tracking untuk Reaksi Magnetik
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Optimasi Pause saat Tab disembunyikan (VisibilityChange) & Scroll jauh ke bawah
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop (60 FPS Mulus - Menggunakan performance.now() pengganti THREE.Clock yang deprecated)
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Main Thread Saver: Lewati komputasi berat jika tab tidak aktif
      if (!isVisible) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;
      
      // Rotasi dasar ekosistem
      points.rotation.y = elapsedTime * 0.05;
      points.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;

      const posAttribute = geometry.attributes.position;
      const posArray = posAttribute.array as Float32Array;
      const targetArray = targetPositionsRef.current;

      if (!targetArray) return;

      const mouseX = mouseRef.current.x * 25;
      const mouseY = mouseRef.current.y * 15;
      const repulsionRadius = 6.0;
      const repulsionStrength = 3.0;

      // Interpolasi lerp + reaksi magnetik
      for (let i = 0; i < count; i++) {
        let tx = targetArray[i * 3];
        let ty = targetArray[i * 3 + 1];
        let tz = targetArray[i * 3 + 2];

        if (mouseRef.current.active) {
          const dx = posArray[i * 3] - mouseX;
          const dy = posArray[i * 3 + 1] - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius && dist > 0.1) {
            const force = (repulsionRadius - dist) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            tx += Math.cos(angle) * force * repulsionStrength;
            ty += Math.sin(angle) * force * repulsionStrength;
            tz += force * repulsionStrength * 0.5;
          }
        }

        posArray[i * 3] += (tx - posArray[i * 3]) * 0.08;
        posArray[i * 3 + 1] += (ty - posArray[i * 3 + 1]) * 0.08;
        posArray[i * 3 + 2] += (tz - posArray[i * 3 + 2]) * 0.08;
      }

      posAttribute.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Pencegahan Memory Leak (Clean Code)
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, []);

  // 2. Reaksi Morfing Berdasarkan Rute Aktif (usePathname)
  useEffect(() => {
    const targetArray = targetPositionsRef.current;
    const initialArray = initialPositionsRef.current;
    const pointsMesh = particlesMeshRef.current;
    if (!targetArray || !initialArray || !pointsMesh) return;

    const count = targetArray.length / 3;

    if (pathname.endsWith("/case-study")) {
      // Halaman Studi Kasus: Morfing ke siluet 3D Diamond / Octahedron (Opasitas 15%)
      gsap.to(pointsMesh.material, { opacity: 0.15, duration: 2, ease: "power2.inOut" });

      for (let i = 0; i < count; i++) {
        const s = Math.random() * Math.PI * 2;
        const t = Math.random() * Math.PI;
        const r = THREE.MathUtils.randFloat(8, 22);
        
        const x = Math.sin(t) * Math.cos(s) * r;
        const y = Math.sin(t) * Math.sin(s) * r;
        const z = Math.cos(t) * r;
        
        const norm = Math.abs(x) + Math.abs(y) + Math.abs(z);
        const factor = 18 / (norm || 1);

        targetArray[i * 3] = x * factor;
        targetArray[i * 3 + 1] = y * factor;
        targetArray[i * 3 + 2] = z * factor;
      }
    } else if (pathname.endsWith("/quantum-dynamics")) {
      // Halaman Quantum Dynamics: Morfing ke siluet Torus (Opasitas 15%)
      gsap.to(pointsMesh.material, { opacity: 0.15, duration: 2, ease: "power2.inOut" });

      for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const R = 15;
        const r = THREE.MathUtils.randFloat(2, 6);

        targetArray[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        targetArray[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
        targetArray[i * 3 + 2] = r * Math.sin(v);
      }
    } else {
      // Halaman Beranda (Home): Galaksi Kosmik Melingkar (Opasitas 80%)
      gsap.to(pointsMesh.material, { opacity: 0.8, duration: 1.5, ease: "power2.inOut" });
      for (let i = 0; i < count; i++) {
        targetArray[i * 3] = initialArray[i * 3];
        targetArray[i * 3 + 1] = initialArray[i * 3 + 1];
        targetArray[i * 3 + 2] = initialArray[i * 3 + 2];
      }
    }
  }, [pathname]);

  return <div id="webgl-container" suppressHydrationWarning ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />;
}
