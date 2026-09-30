"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { Trophy, Clock, User, Sparkles } from "lucide-react";
import { getExtraIcon } from "@/components/kesiswaan-section";

export default function EkstrakurikulerPage() {
  const { extracurriculars } = useData();
  const [selectedCat, setSelectedCat] = useState("Semua");

  const categories = [
    "Semua",
    "Keagamaan",
    "Olahraga",
    "Seni & Budaya",
    "Sains & Teknologi",
    "Keterampilan",
  ];

  const filtered =
    selectedCat === "Semua"
      ? extracurriculars
      : extracurriculars.filter((e) => e.category === selectedCat);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Ekstrakurikuler"
        subtitle="Wadah pembinaan minat, bakat, kepemimpinan, seni, olahraga, dan keterampilan vokasi santri."
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

        {/* Clubs Grid - Pure Icon Architecture (Tanpa Gambar Banner) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => {
            const IconComp = getExtraIcon(item.icon, item.name);
            const imgIcon =
              item.iconImage ||
              (item.name.toLowerCase().includes("silat")
                ? "/pencak-silat2 (1).png"
                : undefined);

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0E241E] rounded-3xl p-7 border border-slate-200/80 dark:border-emerald-900/40 shadow-sm hover:shadow-xl hover:border-emerald-600/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative Subtle Background Icon Watermark */}
                <div className="absolute -right-4 -top-4 opacity-[0.04] dark:opacity-[0.06] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.08] transition-all duration-500">
                  <IconComp className="w-40 h-40 text-[#064E3B] dark:text-emerald-400" />
                </div>

                <div className="space-y-5 relative z-10">
                  {/* Top Bar: Icon Badge & Category Pill */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100/70 dark:from-emerald-950 dark:to-emerald-900/60 text-[#047857] dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40 flex items-center justify-center shrink-0 overflow-hidden p-2.5 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                      {imgIcon ? (
                        <img
                          src={imgIcon}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        />
                      ) : (
                        <IconComp className="w-7 h-7 text-[#047857] dark:text-emerald-300" />
                      )}
                    </div>

                    <span className="bg-[#064E3B]/10 dark:bg-emerald-950/80 text-[#064E3B] dark:text-emerald-300 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-600/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Club Info */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                      Klub Ekstrakurikuler SMA Al-Furqon
                    </p>
                  </div>

                  {item.description && item.description.trim() !== "" && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {/* Meta: Schedule & Instructor */}
                  {(Boolean(item.schedule && item.schedule.trim()) ||
                    Boolean(item.instructor && item.instructor.trim())) && (
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-emerald-900/30">
                      {item.schedule && item.schedule.trim() !== "" && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="font-medium">{item.schedule}</span>
                        </div>
                      )}
                      {item.instructor && item.instructor.trim() !== "" && (
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="font-medium">Pembina: {item.instructor}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Achievements Footer Pill */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-emerald-900/30 relative z-10">
                    <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/30 text-[11px] text-amber-900 dark:text-amber-200">
                      <span className="font-bold flex items-center gap-1.5 mb-1 text-amber-700 dark:text-amber-300">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        Prestasi & Pencapaian:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
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
