"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Calendar, GraduationCap, ChevronRight, CheckCircle2 } from "lucide-react";
import { useData } from "@/context/data-context";

export const AkademikSection: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { teachers, agendas } = useData();

  return (
    <section id="akademik-overview" className="py-20 bg-slate-50 dark:bg-[#071310] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300/40 inline-block">
            KURIKULUM & PENDIDIK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Ekosistem Akademik Unggulan
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Perpaduan Kurikulum Nasional Merdeka & Sistem Pengajaran Al-Qur'an UMMI
          </p>
        </div>

        {/* 2-Column Overview: Left Curriculum & Timeline, Right Featured Teachers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left: Kurikulum Highlight & Agenda Timeline */}
          <div className="lg:col-span-7 space-y-8">
            {/* Kurikulum Card */}
            <div className="bg-white dark:bg-[#0E241E] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                    Struktur Kurikulum Merdeka 2026
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fokus pada Penalaran Kritis, Proyek P5, & Tahfidz Al-Qur'an
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                SMA Al-Furqon Driyorejo menyelenggarakan kurikulum berbasis peminatan fleksibel di mana peserta didik dapat memilih kelompok mata pelajaran pilihan (Sains MIPA, IPS Sosial, & Keagamaan) yang didukung Projek Penguatan Profil Pelajar Pancasila (P5) berwawasan lingkungan hijau.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  "Pengajaran Al-Qur'an Metode UMMI",
                  "Projek P5 Berwawasan Adiwiyata",
                  "Bimbingan Intensif UTBK / SNBT PTN",
                  "Laboratorium Komputer & Sains Digital",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agenda Timeline Preview */}
            <div className="bg-white dark:bg-[#0E241E] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                      Agenda Akademik Mendatang
                    </h3>
                    <p className="text-xs text-slate-500">Jadwal kegiatan penting sekolah</p>
                  </div>
                </div>

                <Link
                  href="/agenda"
                  className="text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Semua Agenda</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {agendas.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/30 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-800 text-white text-center px-3 py-1.5 rounded-lg min-w-[60px]">
                        <span className="block text-xs font-extrabold font-heading">
                          {new Date(item.date).getDate()}
                        </span>
                        <span className="block text-[9px] uppercase tracking-wider text-emerald-200">
                          {new Date(item.date).toLocaleString("id-ID", { month: "short" })}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.time} • {item.location}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 self-start sm:self-center">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Featured Teachers Grid */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0E241E] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                    Guru & Tenaga Pendidik
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pengajar profesional & berdedikasi tinggi
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#047857] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {teachers.slice(0, 4).map((teacher) => (
                  <div
                    key={teacher.id}
                    className="bg-slate-50 dark:bg-[#081612] p-3.5 rounded-2xl border border-slate-100 dark:border-emerald-900/30 text-center group hover:border-emerald-400/50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-emerald-500/40 group-hover:scale-105 transition-transform">
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {teacher.name}
                    </h4>
                    <p className="text-[10px] font-semibold text-[#047857] dark:text-emerald-400">
                      {teacher.position}
                    </p>
                    <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                      {teacher.subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {isHomePage && (
              <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/40 text-center">
                <Link
                  href="/profil/guru-staf"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-emerald-950 hover:bg-[#064E3B] hover:text-white text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <span>Lihat Semua Guru & Staf ({teachers.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
