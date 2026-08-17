"use client";

import React from "react";
import {
  Heart,
  BookOpen,
  Brain,
  Compass,
  Trophy,
  Cpu,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const ProgramUnggulanSection: React.FC = () => {
  const programs = [
    {
      title: "Pendidikan Karakter & Akhlak",
      desc: "Pembentukan karakter Islami, pembiasaan shalat dhuha, dzikir pagi, serta penanaman adab dan akhlakul karimah dalam kehidupan harian santri.",
      icon: Heart,
      color: "from-emerald-500 to-teal-600",
      badge: "Berbasis Karakter",
    },
    {
      title: "Pembelajaran Al-Qur'an UMMI",
      desc: "Metode UMMI terstruktur dengan bimbingan munaqosyah resmi, tajwid tartil, dan target hafalan minimal 3 Juz Al-Qur'an.",
      icon: BookOpen,
      color: "from-amber-500 to-amber-600",
      badge: "Tahfidz & Tartil",
    },
    {
      title: "Kurikulum Inovatif & Lulusan PTN",
      desc: "Penerapan Kurikulum Merdeka yang berfokus pada penalaran kritis dan riset sains, menghasilkan persentase lulusan terbanyak masuk Perguruan Tinggi Negeri.",
      icon: Brain,
      color: "from-[#064E3B] to-[#047857]",
      badge: "Kurikulum Inovatif",
    },
    {
      title: "Ruang Kelas & Lab Modern",
      desc: "Fasilitas Ruang Kelas Modern ber-AC & multimedia, Laboratorium Canggih MIPA, serta Lab Informatika Digital berkecepatan tinggi.",
      icon: Cpu,
      color: "from-emerald-600 to-emerald-800",
      badge: "Fasilitas Canggih",
    },
    {
      title: "Area Olahraga & Ekstrakurikuler",
      desc: "Fasilitas area olahraga terbaik mencakup lapangan serbaguna, futsal, basket, voli, serta 10+ klub bakat & keahlian santri.",
      icon: Trophy,
      color: "from-amber-600 to-amber-700",
      badge: "Olahraga Terbaik",
    },
    {
      title: "Bakat & Kepemimpinan Santri",
      desc: "Melatih public speaking bilingual, OSIS, kepramukaan Ambalan Al-Furqon, serta kepekaan sosial kepemimpinan muda masa depan.",
      icon: Compass,
      color: "from-teal-600 to-emerald-700",
      badge: "Leadership",
    },
  ];

  return (
    <section id="program-unggulan" className="py-20 bg-[#FDFBF7] dark:bg-[#081612] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300/40 inline-block">
            PROGRAM UNGGULAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Mengembangkan Potensi Setiap Siswa
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            6 Pilar Utama Pembinaan Santri & Pelajar SMA Al-Furqon Driyorejo
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0E241E] rounded-3xl p-7 border border-slate-100 dark:border-emerald-900/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${prog.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800">
                      {prog.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-3 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/40">
                  <Link
                    href="/akademik"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:text-[#064E3B] transition-colors group/link"
                  >
                    <span>Pelajari Program</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
