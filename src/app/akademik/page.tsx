"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { AkademikSection } from "@/components/akademik-section";
import { ProgramUnggulanSection } from "@/components/program-unggulan-section";

export default function AkademikPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Akademik & Pembelajaran"
        subtitle="Struktur kurikulum, metode UMMI Al-Qur'an, dan kalender kegiatan akademik SMA Al-Furqon Driyorejo."
        breadcrumb={[{ name: "Akademik" }]}
      />

      <main className="flex-1">
        <AkademikSection />
        <ProgramUnggulanSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
