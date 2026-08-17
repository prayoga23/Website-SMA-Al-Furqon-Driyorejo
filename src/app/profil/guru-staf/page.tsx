"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { GraduationCap, Mail, BookOpen, Search } from "lucide-react";

export default function GuruStafPage() {
  const { teachers } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Guru & Tenaga Pendidik"
        subtitle="Direktori dewan guru profesional dan berpengalaman SMA Al-Furqon Driyorejo."
        breadcrumb={[{ name: "Profil", href: "/profil" }, { name: "Guru & Staf" }]}
      />

      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Cari nama guru atau mata pelajaran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#047857] shadow-sm dark:text-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-[#0E241E] rounded-3xl p-6 border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-center"
            >
              <div>
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#064E3B] shadow group-hover:scale-105 transition-transform duration-300">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-heading mb-1">
                  {t.name}
                </h3>
                <p className="text-xs font-semibold text-[#047857] dark:text-emerald-400 mb-2">
                  {t.position}
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-emerald-950/80 text-slate-700 dark:text-slate-200 text-[11px] font-medium mb-3">
                  {t.subject}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {t.education}
                </p>
              </div>

              {t.bio && (
                <p className="text-[11px] text-slate-400 italic pt-3 border-t border-slate-100 dark:border-emerald-900/30">
                  &quot;{t.bio}&quot;
                </p>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
