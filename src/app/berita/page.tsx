"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { BeritaSection } from "@/components/berita-section";

export default function BeritaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Portal Berita & Artikel"
        subtitle="Kabar terbaru, berita kegiatan, dan pengumuman resmi SMA Al-Furqon Driyorejo."
        breadcrumb={[{ name: "Berita" }]}
      />

      <main className="flex-1">
        <BeritaSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
