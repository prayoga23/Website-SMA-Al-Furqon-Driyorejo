"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { VisiMisiSection } from "@/components/visi-misi-section";
import { ProgramUnggulanSection } from "@/components/program-unggulan-section";
import { FasilitasSection } from "@/components/fasilitas-section";
import { AkademikSection } from "@/components/akademik-section";
import { KesiswaanSection } from "@/components/kesiswaan-section";
import { PrestasiSection } from "@/components/prestasi-section";
import { BeritaSection } from "@/components/berita-section";
import { PPDBSection } from "@/components/ppdb-section";
import { GaleriSection } from "@/components/galeri-section";
import { VideoSection } from "@/components/video-section";
import { TestimoniSection } from "@/components/testimoni-section";
import { FAQSection } from "@/components/faq-section";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";
import { FloatingWidgets } from "@/components/floating-widgets";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <VisiMisiSection />
        <ProgramUnggulanSection />
        <FasilitasSection />
        <AkademikSection />
        <KesiswaanSection />
        <PrestasiSection />
        <BeritaSection />
        <PPDBSection />
        <GaleriSection />
        <VideoSection />
        <TestimoniSection />
        <FAQSection />
        <CTABanner />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
