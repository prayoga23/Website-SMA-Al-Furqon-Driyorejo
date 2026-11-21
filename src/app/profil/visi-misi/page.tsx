"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { VisiMisiSection } from "@/components/visi-misi-section";

export default function VisiMisiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Visi, Misi & Tujuan Sekolah"
        subtitle="Komitmen SMA Al-Furqon Driyorejo dalam mencetak lulusan berkarakter, berprestasi, dan berwawasan lingkungan."
        breadcrumb={[{ name: "Profil", href: "/profil" }, { name: "Visi & Misi" }]}
      />

      <main className="flex-1">
        <VisiMisiSection />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
