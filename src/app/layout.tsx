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
  metadataBase: new URL("https://titiknol.vercel.app"),
  title: "TitikNol | SOTY Single Page Application",
  description: "Eksplorasi antarmuka digital premium dengan WebGL 3D ekosistem, mikro-interaksi canggih, dan strategi Dual-Faced Branding.",
  alternates: {
    canonical: "https://titiknol.vercel.app",
  },
  openGraph: {
    title: "TitikNol | SOTY Single Page Application",
    description: "Eksplorasi antarmuka digital premium dengan WebGL 3D ekosistem, mikro-interaksi canggih, dan strategi Dual-Faced Branding.",
    url: "https://titiknol.vercel.app",
    siteName: "TitikNol Enterprise",
    images: [
      {
        url: "/hifi_elite_dashboard.png",
        width: 1200,
        height: 630,
        alt: "TitikNol SOTY Elite Dashboard Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TitikNol | SOTY Single Page Application",
    description: "Eksplorasi antarmuka digital premium dengan WebGL 3D ekosistem, mikro-interaksi canggih, dan strategi Dual-Faced Branding.",
    images: ["/hifi_elite_dashboard.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#000002] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden"
      >
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
