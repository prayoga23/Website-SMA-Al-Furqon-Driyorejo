"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { KesiswaanSection } from "@/components/kesiswaan-section";

export default function KesiswaanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Kesiswaan & Kehidupan Santri"
        subtitle="Mewadahi tumbuh kembang siswa melalui organisasi OSIS, kegiatan keagamaan, dan beragam klub ekstrakurikuler."
        breadcrumb={[{ name: "Kesiswaan" }]}
      />

      <main className="flex-1">
        <KesiswaanSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
