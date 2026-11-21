"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { Calendar, MapPin, Clock, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function KalenderPage() {
  const { agendas } = useData();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Kalender & Agenda Akademik 2026"
        subtitle="Jadwal lengkap ujian, munaqosyah Al-Qur'an, MPLS, dan kegiatan sekolah."
        breadcrumb={[{ name: "Akademik", href: "/akademik" }, { name: "Kalender Akademik" }]}
      />

      <main className="flex-1 py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white dark:bg-[#0E241E] p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-emerald-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Timeline Agenda T.A. 2026/2027
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {agendas.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-emerald-950/40 p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-400 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#064E3B] text-amber-300 text-center px-4 py-2 rounded-xl min-w-[70px] shadow">
                    <span className="block text-base font-extrabold font-heading">
                      {new Date(item.date).getDate()}
                    </span>
                    <span className="block text-[10px] uppercase font-semibold">
                      {new Date(item.date).toLocaleString("id-ID", { month: "short" })}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 self-start sm:self-center">
                  {item.category}
                </span>
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
