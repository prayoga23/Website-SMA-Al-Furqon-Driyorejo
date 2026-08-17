"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { GaleriSection } from "@/components/galeri-section";

export default function GaleriPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Galeri Dokumentasi Foto & Video"
        subtitle="Kumpulan dokumentasi momen pembelajaran, prestasi, dan kegiatan ekstrakurikuler."
        breadcrumb={[{ name: "Galeri" }]}
      />

      <main className="flex-1">
        <GaleriSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
