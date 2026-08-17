"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { History, Calendar, Award, CheckCircle2 } from "lucide-react";

export default function SejarahPage() {
  const milestones = [
    {
      year: "1995",
      title: "Pendirian SMA Al-Furqon Driyorejo",
      desc: "Yayasan Pondok Pesantren Al-Furqon meresmikan pendirian SMA Al-Furqon sebagai wujud kepedulian menyediakan pendidikan menengah berkualitas bernuansa Islam di Driyorejo, Gresik.",
    },
    {
      year: "2010",
      title: "Penerapan Metode UMMI Al-Qur'an",
      desc: "Menjalin kerjasama resmi dengan Ummi Foundation untuk membakukan standar bacaan Al-Qur'an tartil dan tajwid bagi seluruh santri.",
    },
    {
      year: "2016",
      title: "Raihan Akreditasi A (Unggulan)",
      desc: "Mendapatkan predikat Akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-SM) dengan nilai sangat memuaskan.",
    },
    {
      year: "2020",
      title: "Implementasi Green School & Adiwiyata",
      desc: "Mencanangkan ekosistem sekolah hijau bebas sampah plastik dan penerapan teknologi hidroponik serta robotik lingkungan.",
    },
    {
      year: "2024 - 2026",
      title: "Kurikulum Merdeka & Modern Digitalization",
      desc: "Penerapan penuh Kurikulum Merdeka, CBT Tablet, presensi biometrik fingerprint, dan fasilitas laboratorium komputer modern.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Sejarah SMA Al-Furqon Driyorejo"
        subtitle="Perjalanan panjang mengabdi pada dunia pendidikan dan pembentukan karakter generasi Islami."
        breadcrumb={[{ name: "Profil", href: "/profil" }, { name: "Sejarah" }]}
      />

      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white dark:bg-[#0E241E] p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center font-bold">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Jejak Langkah Perjuangan
              </h2>
              <p className="text-xs text-slate-500">Gresik, Jawa Timur</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Berdiri sejak tahun 1995 di Jalan KH. Abdurrohim No.01 Wedoroanom Driyorejo, <strong>SMA Al-Furqon</strong> hadir dari cita-cita luhur para ulama dan tokoh masyarakat dalam mewujudkan lembaga pendidikan menengah yang seimbang antara kemajuan ilmu pengetahuan duniawi dan kedalaman spiritual keislaman.
          </p>

          {/* Timeline */}
          <div className="pt-6 space-y-8 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-emerald-300 dark:before:bg-emerald-800">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-[#064E3B] text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0 border-4 border-white dark:border-[#0E241E] z-10 shadow">
                  {item.year.slice(-2)}
                </div>
                <div className="bg-slate-50 dark:bg-emerald-950/40 p-5 rounded-2xl border border-slate-100 dark:border-emerald-900/30 flex-1 hover:border-emerald-400 transition-colors">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
                    TAHUN {item.year}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
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
