"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { FasilitasSection } from "@/components/fasilitas-section";

export default function ProfilFasilitasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Fasilitas & Keunggulan Sekolah"
        subtitle="Sarana prasarana modern, laboratorium canggih, lab IT digital, area olahraga, dan keunggulan SMA Al-Furqon Driyorejo."
        breadcrumb={[
          { name: "Profil", href: "/profil" },
          { name: "Fasilitas & Keunggulan" },
        ]}
      />

      <main className="flex-1">
        <FasilitasSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
