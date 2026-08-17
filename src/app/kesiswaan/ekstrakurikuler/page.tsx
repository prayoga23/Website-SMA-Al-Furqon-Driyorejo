"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { Trophy, Clock, User, Sparkles, CheckCircle2 } from "lucide-react";

export default function EkstrakurikulerPage() {
  const { extracurriculars } = useData();
  const [selectedCat, setSelectedCat] = useState("Semua");

  const categories = ["Semua", "Keagamaan", "Olahraga", "Seni & Budaya", "Sains & Teknologi", "Kepemimpinan"];

  const filtered =
    selectedCat === "Semua"
      ? extracurriculars
      : extracurriculars.filter((e) => e.category === selectedCat);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Klub Ekstrakurikuler"
        subtitle="Tempat mengasah bakat, kepemimpinan, seni, olahraga, dan riset teknologi."
        breadcrumb={[{ name: "Kesiswaan", href: "/kesiswaan" }, { name: "Ekstrakurikuler" }]}
      />

      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCat === cat
                  ? "bg-[#064E3B] text-amber-300 shadow-md scale-105"
                  : "bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-emerald-900/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0E241E] rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-[#064E3B] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase border border-amber-400/30">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 mb-4 pt-3 border-t border-slate-100 dark:border-emerald-900/30">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{item.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Pembina: {item.instructor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {item.achievements && item.achievements.length > 0 && (
                <div className="px-6 pb-6 pt-0">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300">
                    <span className="font-bold flex items-center gap-1 mb-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      Capaian Prestasi:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {item.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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
