"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  FlaskConical,
  Laptop,
  Trophy,
  Award,
  BookCheck,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Eye,
  Download,
  X,
  ArrowRight,
  Calendar,
} from "lucide-react";

export const FasilitasSection: React.FC = () => {
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  const keunggulanList = [
    {
      title: "Terakreditasi A",
      desc: "Status akreditasi Unggulan (A) dari BAN-SM dengan penjaminan mutu pendidikan nasional terpercaya.",
      icon: Award,
      badge: "Akreditasi A",
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Kurikulum Inovatif",
      desc: "Implementasi Kurikulum Merdeka yang memadukan penalaran kritis, riset sains, dan pembelajaran digital modern.",
      icon: BookCheck,
      badge: "Inovasi Pembelajaran",
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: "Lulusan Terbanyak Masuk PTN",
      desc: "Rekam jejak alumni berprestasi tinggi yang secara konsisten diterima di Perguruan Tinggi Negeri (PTN) & kedinasan favorit.",
      icon: GraduationCap,
      badge: "Sukses PTN",
      color: "from-teal-600 to-emerald-700",
    },
    {
      title: "Berbasis Karakter",
      desc: "Pembentukan akhlakul karimah, keteladanan ibadah harian, serta hafalan Al-Qur'an terstruktur metode UMMI.",
      icon: Sparkles,
      badge: "Akhlak & Tahfidz",
      color: "from-[#064E3B] to-[#047857]",
    },
  ];

  const fasilitasList = [
    {
      title: "Ruang Kelas Modern",
      desc: "Ruang belajar ber-AC yang bersih, berteknologi multimedia interaktif, pencahayaan ergonomis, dan suasana belajar yang kondusif.",
      icon: Building2,
      tag: "Fasilitas Belajar",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Laboratorium Canggih",
      desc: "Laboratorium Sains MIPA (Fisika, Kimia, Biologi) dengan peralatan eksperimen modern berstandar praktikum dan penelitian siswa.",
      icon: FlaskConical,
      tag: "Riset & Eksperimen",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Lab Informatika Digital",
      desc: "Laboratorium komputer multimedia spesifikasi tinggi, jaringan internet ultra-cepat, serta laboratorium IoT & literasi Artificial Intelligence.",
      icon: Laptop,
      tag: "Teknologi & Digital",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Area Olahraga Terbaik",
      desc: "Fasilitas olahraga outdoor & indoor lengkap mencakup lapangan serbaguna futsal, basket, voli, serta gelanggang seni pencak silat.",
      icon: Trophy,
      tag: "Kebugaran & Seni",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="fasilitas" className="py-20 bg-[#FDFBF7] dark:bg-[#081612] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Keunggulan & Fasilitas */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-300/40 inline-block">
            BROSUR PSB 2026/2027 & FASILITAS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Keunggulan & Fasilitas Utama Sekolah
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            SMA Al-Furqon Driyorejo menghadirkan sarana prasarana modern serta ekosistem pembelajaran Islami berkualitas tinggi untuk mendukung potensi setiap santri.
          </p>
        </div>

        {/* 1. Keunggulan Grid (4 Cards) */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2.5 h-8 bg-amber-400 rounded-full"></div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Keunggulan SMA Al-Furqon Driyorejo
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keunggulanList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0E241E] rounded-3xl p-6 border border-slate-100 dark:border-emerald-900/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center gap-1 text-[11px] font-semibold text-[#047857] dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Terjamin & Terverifikasi</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Fasilitas Grid (4 Cards) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-8 bg-[#064E3B] rounded-full"></div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                Fasilitas Sarana Prasarana Modern
              </h3>
            </div>
            <Link
              href="/profil/fasilitas"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline"
            >
              <span>Lihat Detail Semua Fasilitas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fasilitasList.map((fas, idx) => {
              const Icon = fas.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0E241E] rounded-3xl overflow-hidden border border-slate-100 dark:border-emerald-900/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Facility Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={fas.image}
                        alt={fas.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                      
                      <span className="absolute top-3 left-3 bg-[#064E3B]/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-400/30 flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {fas.tag}
                      </span>
                    </div>

                    {/* Facility Details */}
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                        {fas.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {fas.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <div className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40 text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center justify-between border border-slate-100 dark:border-emerald-900/40">
                      <span>Standar Kualitas</span>
                      <span className="font-bold text-[#047857] dark:text-emerald-400">Terbaik & Modern</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Brochure Flyer Card Section */}
        <div className="bg-gradient-to-r from-[#032B21] via-[#064E3B] to-[#047857] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Brochure Information */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>Jadwal Pendaftaran: OKTOBER - NOVEMBER (Daftar Inden!!)</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white leading-tight">
                Brosur Resmi Penerimaan Santri Baru (PSB) T.A. 2026/2027
              </h3>

              <p className="text-sm text-emerald-100/90 leading-relaxed">
                Unduh atau lihat brosur pendaftaran SMA Al-Furqon Driyorejo. Dapatkan informasi lengkap mengenai syarat pendaftaran, fasilitas ruang kelas modern, laboratorium canggih, lab IT digital, area olahraga, serta program beasiswa unggulan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Ruang Kelas Modern & Ber-AC</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Laboratorium Canggih & Lab IT Digital</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Area Olahraga Terbaik & Lengkap</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Kurikulum Inovatif & Lulusan PTN</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => setShowBrochureModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs text-slate-900 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Pratinjau Brosur Lengkap</span>
                </button>

                <a
                  href="/IMG-20251027-WA0009.jpg"
                  download="Brosur-PSB-SMA-Al-Furqon-2026-2027.jpg"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Gambar Brosur</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Brochure Thumbnail Card */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setShowBrochureModal(true)}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src="/IMG-20251027-WA0009.jpg"
                  alt="Brosur PSB SMA Al-Furqon Driyorejo"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[11px] p-2.5 rounded-xl border border-white/10 text-center font-semibold">
                  Klik untuk Memperbesar Brosur PSB 2026-2027
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Brochure Modal Lightbox */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-[#0E241E] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-emerald-800 flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-[#064E3B] text-white flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-3">
                <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded">
                  PSB 2026-2027
                </span>
                <h3 className="font-bold text-sm sm:text-base font-heading text-white">
                  Brosur Resmi SMA Al-Furqon Driyorejo
                </h3>
              </div>
              <button
                onClick={() => setShowBrochureModal(false)}
                className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Image Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-900 flex justify-center items-center">
              <img
                src="/IMG-20251027-WA0009.jpg"
                alt="Brosur PSB SMA Al-Furqon Driyorejo"
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-white dark:bg-[#0E241E] border-t border-slate-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 dark:text-slate-300 text-center sm:text-left">
                <p className="font-bold text-[#064E3B] dark:text-emerald-400">SMA AL-FURQON DRIYOREJO</p>
                <p>Wedoroanom - Driyorejo - Gresik | Telp: +62 856-4928-8085</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="/IMG-20251027-WA0009.jpg"
                  download="Brosur-PSB-SMA-Al-Furqon-2026-2027.jpg"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-emerald-900/60 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh</span>
                </a>

                <Link
                  href="/ppdb"
                  onClick={() => setShowBrochureModal(false)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Daftar PPDB</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
