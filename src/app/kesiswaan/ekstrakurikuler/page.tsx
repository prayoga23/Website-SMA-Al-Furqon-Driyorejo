"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { Trophy, Clock, User } from "lucide-react";
import { getExtraIcon } from "@/components/kesiswaan-section";

export default function EkstrakurikulerPage() {
  const { extracurriculars } = useData();
  const [selectedCat, setSelectedCat] = useState("Semua");

  const categories = ["Semua", "Keagamaan", "Olahraga", "Seni & Budaya", "Sains & Teknologi", "Keterampilan"];

  const filtered =
    selectedCat === "Semua"
      ? extracurriculars
      : extracurriculars.filter((e) => e.category === selectedCat);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Ekstrakurikuler"
        subtitle="Tempat mengasah bakat, kepemimpinan, seni, olahraga, dan keterampilan."
        breadcrumb={[{ name: "Kesiswaan", href: "/kesiswaan" }, { name: "Ekstrakurikuler" }]}
      />

      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCat === cat
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
          {filtered.map((item) => {
            const IconComp = getExtraIcon(item.icon, item.name);
            const imgIcon = item.iconImage || (item.name.toLowerCase().includes("silat") ? "/pencak-silat2 (1).png" : undefined);
            return (
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
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-[#047857] dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center shrink-0 overflow-hidden p-1">
                        {imgIcon ? (
                          <img src={imgIcon} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                          <IconComp className="w-5 h-5" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                        {item.name}
                      </h3>
                    </div>
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
            );
          })}
        </div>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
