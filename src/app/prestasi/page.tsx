"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { PrestasiSection } from "@/components/prestasi-section";

export default function PrestasiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Prestasi & Kejuaraan Siswa"
        subtitle="Galeri kebanggaan hasil kompetisi akademik, keagamaan, seni, dan olahraga santri SMA Al-Furqon Driyorejo."
        breadcrumb={[{ name: "Prestasi" }]}
      />

      <main className="flex-1">
        <PrestasiSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
