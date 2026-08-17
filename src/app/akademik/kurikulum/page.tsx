"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { BookOpen, CheckCircle2, Award, Sparkles } from "lucide-react";

export default function KurikulumPage() {
  const subjects = [
    {
      group: "Mata Pelajaran Umum (Kelompok Nasional)",
      list: ["Pendidikan Agama Islam", "Pancasila & Kewarganegaraan", "Bahasa Indonesia", "Bahasa Inggris", "Matematika Umum", "Sejarah Indonesia", "Seni Budaya & PJOK"],
    },
    {
      group: "Peminatan Sains MIPA & Kebumian",
      list: ["Matematika Lanjut", "Fisika & IoT", "Kimia Lingkungan", "Biologi & Adiwiyata", "Informatika & Pemrograman"],
    },
    {
      group: "Peminatan IPS & Sosial Humaniora",
      list: ["Sosiologi & Diplomasi", "Ekonomi & Kewirausahaan Digital", "Geografi & Kebencanaan", "Sejarah Tingkat Lanjut"],
    },
    {
      group: "Kekhasan Al-Furqon & Metode UMMI",
      list: ["Tahfidz Al-Qur'an (Target 3+ Juz)", "Munaqosyah Tajwid UMMI", "Kajian Akhlak & Fiqih Harian", "Bahasa Arab Komunikasi"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Struktur Kurikulum Merdeka"
        subtitle="Sistem pembelajaran fleksibel, bernalar kritis, dan berwawasan nilai-nilai Islami."
        breadcrumb={[{ name: "Akademik", href: "/akademik" }, { name: "Struktur Kurikulum" }]}
      />

      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white dark:bg-[#0E241E] p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Kurikulum Merdeka Plus P5 Adiwiyata
              </h2>
              <p className="text-xs text-slate-500">Tahun Ajaran 2026/2027</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Kurikulum Merdeka di SMA Al-Furqon Driyorejo memberikan kebebasan bagi siswa untuk mengembangkan minat akademik sesuai dengan rencana studi lanjut ke perguruan tinggi. Dikombinasikan dengan Projek Penguatan Profil Pelajar Pancasila (P5) dan pengawasan metode UMMI Al-Qur'an.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {subjects.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/30"
              >
                <h3 className="font-bold text-sm text-[#064E3B] dark:text-emerald-400 font-heading mb-4 pb-2 border-b border-slate-200 dark:border-emerald-900/40">
                  {s.group}
                </h3>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                  {s.list.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
