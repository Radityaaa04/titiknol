import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WebGLBackground from "@/components/WebGLBackground";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TitikNol | SOTY Single Page Application",
  description: "Eksplorasi antarmuka digital premium dengan WebGL 3D ekosistem, mikro-interaksi canggih, dan strategi Dual-Faced Branding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#000002] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
        {/* Pengguliran selicin sutra dengan Lenis */}
        <SmoothScroll />
        {/* Rahasia Performa SOTY: WebGLBackground dan Navigation diletakkan di layout.tsx agar tidak pernah di-unmount */}
        <WebGLBackground />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
