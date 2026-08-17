"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Clock, UserCheck, FileCheck, Award, FileText } from "lucide-react";
import { useData } from "@/context/data-context";

export const PPDBSection: React.FC = () => {
  const { schoolInfo } = useData();

  // Target date for PPDB countdown: April 30, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, minutes: 30, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-04-30T23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Pendaftaran Online / Offline",
      desc: "Mengisi formulir biodata calon santri secara online di website ini atau langsung ke sekretariat sekolah.",
      icon: FileText,
    },
    {
      num: "02",
      title: "Verifikasi Berkas",
      desc: "Tim panitia memverifikasi kelengkapan nilai rapot, NISN, serta syarat administrasi.",
      icon: FileCheck,
    },
    {
      num: "03",
      title: "Seleksi & Tes Al-Qur'an",
      desc: "Pelaksanaan tes pemetaan potensi akademik & observasi makhraj tajwid bacaan Al-Qur'an.",
      icon: UserCheck,
    },
    {
      num: "04",
      title: "Pengumuman Hasil",
      desc: "Pengumuman kelulusan resmi dapat diakses melalui nomor pendaftaran online.",
      icon: Award,
    },
    {
      num: "05",
      title: "Daftar Ulang & Seragam",
      desc: "Registrasi ulang santri baru, pengamatan ukuran seragam, dan persiapan masuk sekolah SMA Al-Furqon Driyorejo.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="ppdb-section" className="py-20 bg-gradient-to-b from-[#032B21] via-[#064E3B] to-[#047857] text-white relative overflow-hidden">
      {/* Glow Ornaments */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>PSB 2026-2027 | JADWAL PENDAFTARAN: OKTOBER - NOVEMBER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Penerimaan Santri Baru SMA Al-Furqon Driyorejo
          </h2>

          <p className="text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah bersama sekolah berprestasi terakreditasi A dengan Kurikulum Inovatif, Lulusan Terbanyak Masuk PTN, serta fasilitas Ruang Kelas Modern, Lab Canggih, Lab Digital, & Area Olahraga Terbaik.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/ppdb#form"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 active:scale-95 transition-all group flex items-center justify-center gap-2"
            >
              <span>Daftar Inden / Online Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="/IMG-20251027-WA0009.jpg"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Lihat Poster Brosur Resmi</span>
            </a>
          </div>
        </div>

        {/* Brochure Highlights Box (Keunggulan & Fasilitas) */}
        <div className="mb-12 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <a href="/IMG-20251027-WA0009.jpg" target="_blank" rel="noreferrer" className="block group">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 relative max-w-xs">
                <img
                  src="/IMG-20251027-WA0009.jpg"
                  alt="Poster PSB 2026-2027"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow">
                    Klik Buka Brosur
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-block bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-md uppercase">
              Informasi Resmi Brosur PSB
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-500/30 space-y-1.5">
                <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2 font-heading">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Keunggulan Sekolah
                </h4>
                <ul className="text-xs text-emerald-100/90 space-y-1">
                  <li>• Terakreditasi A (BAN-SM)</li>
                  <li>• Kurikulum Inovatif</li>
                  <li>• Lulusan Terbanyak Masuk PTN</li>
                  <li>• Berbasis Karakter & Tahfidz</li>
                </ul>
              </div>

              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-500/30 space-y-1.5">
                <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2 font-heading">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Fasilitas Utama
                </h4>
                <ul className="text-xs text-emerald-100/90 space-y-1">
                  <li>• Ruang Kelas Modern (AC & Multimedia)</li>
                  <li>• Laboratorium Canggih</li>
                  <li>• Lab Informatika Digital</li>
                  <li>• Area Olahraga Terbaik</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-2">
              <span>📅 <strong>Jadwal Pendaftaran:</strong> OKTOBER - NOVEMBER (Daftar Inden!!)</span>
              <span>📞 <strong>Info PSB WA:</strong> +62 816-1518-4579</span>
            </div>
          </div>
        </div>

        {/* Timeline Gelombang & Diskon Pendaftaran */}
        <div className="mb-12 space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              PROMO POTONGAN BIAYA PENDAFTARAN
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
              Timeline Gelombang & Diskon PPDB 2026/2027
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 p-5 rounded-2xl shadow-xl space-y-2 border border-amber-300 transform hover:-translate-y-1 transition-all">
              <span className="bg-slate-950 text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                JALUR INDEN
              </span>
              <p className="text-xs font-semibold text-slate-900">01 Nov s/d 31 Des 2025</p>
              <h4 className="text-xl font-extrabold font-heading">Diskon Up to 4 Juta</h4>
              <p className="text-[11px] text-slate-800 font-medium">Potongan biaya pendaftaran terbesar untuk santri inden.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white space-y-2 hover:bg-white/20 transition-all">
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                GELOMBANG 1
              </span>
              <p className="text-xs font-semibold text-emerald-200">01 Jan s/d 28 Feb 2026</p>
              <h4 className="text-xl font-extrabold font-heading text-amber-300">Diskon Up to 3 Juta</h4>
              <p className="text-[11px] text-emerald-100/80">Potongan spesial gelombang pertama.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white space-y-2 hover:bg-white/20 transition-all">
              <span className="bg-teal-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                GELOMBANG 2
              </span>
              <p className="text-xs font-semibold text-teal-200">01 Mar s/d 31 Apr 2026</p>
              <h4 className="text-xl font-extrabold font-heading text-amber-300">Diskon Up to 2 Juta</h4>
              <p className="text-[11px] text-emerald-100/80">Potongan khusus gelombang kedua.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white space-y-2 hover:bg-white/20 transition-all">
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                GELOMBANG 3
              </span>
              <p className="text-xs font-semibold text-emerald-200">01 Mei s/d 31 Jun 2026</p>
              <h4 className="text-xl font-extrabold font-heading text-amber-300">Diskon Up to 1 Juta</h4>
              <p className="text-[11px] text-emerald-100/80">Pendaftaran gelombang reguler terakhir.</p>
            </div>
          </div>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="space-y-4">
          <h3 className="text-center font-bold text-xs uppercase tracking-widest text-emerald-200 mb-6">
            ALUR DAN TAHAPAN SELEKSI SANTRI BARU
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 hover:bg-white/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black font-heading text-amber-300">
                        {step.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-emerald-900/80 text-emerald-300 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
