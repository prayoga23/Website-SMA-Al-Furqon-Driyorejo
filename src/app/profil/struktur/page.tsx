"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { Network, Users, Award, ShieldCheck } from "lucide-react";
import { useData } from "@/context/data-context";

export default function StrukturPage() {
  const { schoolInfo } = useData();

  const hierarchy = [
    { role: "Ketua Pembina Yayasan", name: "", level: 1 },
    { role: "Ketua Yayasan Pondok Pesantren", name: "", level: 2 },
    { role: "Kepala SMA Al-Furqon", name: "", level: 3 },
    { role: "Waka Kurikulum", name: "", level: 4 },
    { role: "Waka Kesiswaan & IT", name: "", level: 4 },
    { role: "Koordinator Keagamaan & Tahfidz", name: "", level: 4 },
    { role: "Ketua Tim Adiwiyata", name: "", level: 4 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Struktur Organisasi"
        subtitle="Bagan kepemimpinan dan pengelola SMA Al-Furqon Driyorejo."
        breadcrumb={[{ name: "Profil", href: "/profil" }, { name: "Struktur Organisasi" }]}
      />

      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white dark:bg-[#0E241E] p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 mx-auto flex items-center justify-center font-bold mb-4">
            <Network className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2">
            Bagan Manajemen SMA Al-Furqon
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto mb-8">
            Struktur kepemimpinan yang profesional, amanah, dan berorientasi pada kemajuan peserta didik.
          </p>

          <div className="space-y-4 max-w-2xl mx-auto">
            {hierarchy.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  item.level === 3
                    ? "bg-[#064E3B] text-white border-amber-400/40 shadow-lg scale-105"
                    : "bg-slate-50 dark:bg-emerald-950/50 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-emerald-900/40"
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
                  item.level === 3 ? "text-amber-300" : "text-[#047857] dark:text-emerald-400"
                }`}>
                  {item.role}
                </span>
                <h4 className="text-sm font-extrabold font-heading">{item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
