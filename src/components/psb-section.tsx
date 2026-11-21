"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  BookOpen,
  MapPin,
  Eye,
  Download,
  X,
  ExternalLink,
  Laptop,
  Building,
  GraduationCap,
  ShieldCheck,
  Award,
  ChevronRight,
  Layers,
  HeartHandshake,
  QrCode,
  FileCheck,
  UserCheck,
  FileText,
} from "lucide-react";
import { useData } from "@/context/data-context";

interface PosterItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  src: string;
  downloadName: string;
}

export const PSBSection: React.FC = () => {
  const { schoolInfo } = useData();

  // Active brochure image preview modal state
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);
  const [activePosterTab, setActivePosterTab] = useState<number>(0);

  // Target date for PSB Inden countdown: 31 Desember 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-12-31T23:59:59").getTime();
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3 Official Posters from provided brochures
  const posters: PosterItem[] = [
    {
      id: "portrait",
      title: "Flyer Resmi PSB T.A. 2027/2028 (Jalur Inden)",
      badge: "Inden November 2026",
      description: "Flyer resmi pendaftaran inden, keunggulan sekolah, fasilitas, dan kontak PSB.",
      src: "/poster-psb-portrait.png",
      downloadName: "Brosur-PSB-SMA-Al-Furqon-2027-2028-Inden.png",
    },
    {
      id: "landscape-front",
      title: "Brosur Landscape Depan (Alur & Timeline Gelombang)",
      badge: "Alur & Timeline",
      description: "Alur pendaftaran online/offline, diskon gelombang, dan 8 alasan memilih SMA Al Furqon.",
      src: "/poster-psb-depan.jpg",
      downloadName: "Brosur-Depan-Alur-Timeline-PSB-SMA-Al-Furqon.jpg",
    },
    {
      id: "landscape-back",
      title: "Brosur Landscape Belakang (Program Unggulan & Prestasi)",
      badge: "Program & Prestasi PTN",
      description: "Selayang pandang, program unggulan, sebaran kampus PTN, daftar prestasi & testimoni.",
      src: "/poster-psb-belakang.jpg",
      downloadName: "Brosur-Belakang-Prestasi-PTN-SMA-Al-Furqon.jpg",
    },
  ];

  // 8 Alasan Mengapa Harus Pilih SMA Al Furqon (Image 1 & 3)
  const reasons = [
    {
      title: "Sekolah Berkinerja Baik Nasional",
      desc: "Diakui secara resmi dengan standar mutu pendidikan nasional dan akreditasi A unggul.",
      icon: Award,
    },
    {
      title: "Eksplorasi Minat & Bakat",
      desc: "Pengembangan potensi unik siswa melalui ekstrakurikuler terarah dan pendampingan personal.",
      icon: Sparkles,
    },
    {
      title: "School Partnership",
      desc: "Kemitraan strategis dengan perguruan tinggi terkemuka dan dunia industri (DUDI).",
      icon: HeartHandshake,
    },
    {
      title: "Kelas Industri & Coding",
      desc: "Kurikulum aplikatif melek teknologi informasi, coding programming, dan vokasi digital.",
      icon: Laptop,
    },
    {
      title: "Sertifikasi Al-Qur'an Metode Ummi",
      desc: "Standarisasi makhraj dan tartil tajwid dengan sertifikat resmi kelulusan Metode Ummi.",
      icon: ShieldCheck,
    },
    {
      title: "Kelas Tahfidz",
      desc: "Program bimbingan intensif hafalan Al-Qur'an didampingi para asatidz berpengalaman.",
      icon: BookOpen,
    },
    {
      title: "Pendampingan Masuk Perguruan Tinggi Negeri (PTN)",
      desc: "Bimbingan intensif SNBP, UTBK SNBT, dan seleksi mandiri PTN hingga tembus kampus impian.",
      icon: GraduationCap,
    },
    {
      title: "Bina Prestasi",
      desc: "Pembinaan terpadu olimpiade sains (OSN), riset ilmiah remaja (LKTI), seni, dan olahraga.",
      icon: Award,
    },
  ];

  // Timeline Pendaftaran & Diskon (Image 1)
  const waves = [
    {
      name: "JALUR INDEN",
      badge: "PROMO TERBESAR",
      period: "01 Nov s/d 31 Des 2026",
      discount: "Diskon Up to 4,5 Juta",
      detail: "Discount Rp 4.500.000,- khusus periode pendaftaran inden (Bulan November - Desember 2026).",
      isHighlight: true,
      color: "from-amber-400 to-amber-500",
    },
    {
      name: "GELOMBANG 1",
      badge: "AWAL TAHUN",
      period: "01 Jan s/d 28 Feb 2027",
      discount: "Diskon Up to 3,5 Juta",
      detail: "Potongan biaya pendaftaran spesial gelombang pertama awal tahun 2027.",
      isHighlight: false,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "GELOMBANG 2",
      badge: "REGULER 2",
      period: "01 Mar s/d 30 Apr 2027",
      discount: "Diskon Up to 2,5 Juta",
      detail: "Potongan biaya pendaftaran tahap kedua bagi calon santri baru.",
      isHighlight: false,
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "GELOMBANG 3",
      badge: "PENUTUPAN",
      period: "01 Mei s/d 30 Jun 2027",
      discount: "Diskon Up to 1,5 Juta",
      detail: "Pendaftaran gelombang reguler terakhir menjelang tahun ajaran baru.",
      isHighlight: false,
      color: "from-cyan-600 to-emerald-700",
    },
  ];

  // Keunggulan Kami (Image 3)
  const highlights = [
    "Kurikulum Berbasis Pesantren dan Nasional",
    "Tenaga Pendidik Profesional dan Berpengalaman",
    "Lingkungan Alami, Islami & Kondusif",
    "Pembinaan Akhlak dan Karakter Santri",
    "Fasilitas Lengkap dan Modern",
    "Lulusan Terbanyak Masuk Perguruan Tinggi Negeri (PTN)",
  ];

  // Fasilitas (Image 3)
  const facilities = [
    "Ruang Kelas Nyaman (AC & Multimedia)",
    "Asrama Santri Pondok Pesantren",
    "Masjid Jami' Pesantren",
    "Laboratorium IPA & Komputer Canggih",
    "Perpustakaan Lengkap & Nyaman",
    "Sarana Olahraga Representatif",
  ];

  // 10 Program Unggulan (Image 2)
  const topPrograms = [
    "Pendampingan & Pembinaan Masuk PTN",
    "Bimbingan IT & Kelas Coding",
    "Tahfidzul Qur'an & Metode Ummi",
    "Bimbingan Olimpiade & Pembinaan OSN",
    "Santri Preneurship (Wirausaha)",
    "Festival & Pameran Karya",
    "Munaqosah Al-Qur'an Terstandar",
    "Khidmatul Amali (PPL Pengabdian)",
    "Ekstra Bakat & Minat Siswa",
    "Pendidikan Karakter & Aqidah Islami",
  ];

  // Lulusan PTN (Image 2)
  const ptnList = [
    "ITS Surabaya",
    "UNAIR",
    "UNESA",
    "UINSA",
    "Univ. Trunojoyo Madura",
    "UB (Univ. Brawijaya)",
    "UIN Malang",
    "UPN Veteran Jatim",
    "IAIN Bangka Belitung",
    "IAIN Kediri",
    "Univ. Negeri Malang",
    "UIN Yogyakarta",
  ];

  return (
    <section
      id="psb-section"
      className="py-20 bg-gradient-to-b from-[#032B21] via-[#064E3B] to-[#047857] text-white relative overflow-hidden"
    >
      <div id="PSB-section" className="absolute top-0"></div>

      {/* Decorative Glow Ornaments */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* ========================================================
            HEADER BLOCK (Updated to 2027/2028 & Inden November 2026)
            ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Badge Section (L72-L76 Target Match) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg shadow-amber-500/10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="tracking-wide">
              PSB T.A. 2027/2028 | PERIODE INDEN: NOVEMBER 2026
            </span>
            <span className="hidden sm:inline bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              Diskon s/d 4,5 Juta
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Penerimaan Santri Baru (PSB)
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 mt-1">
              Tahun Pelajaran 2027/2028
            </span>
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl mx-auto leading-relaxed">
            &quot;Mari Bergabung Bersama Kami Menjadi Generasi Qur&apos;ani, Berilmu, dan Berprestasi&quot;.
            Sekolah Berkinerja Baik Nasional terakreditasi A unggul, memadukan Kurikulum Pesantren dan Nasional,
            Kelas Industri &amp; Coding, Metode Ummi &amp; Tahfidz, serta Pendampingan Masuk Perguruan Tinggi Negeri (PTN).
          </p>

          {/* Quick Badges Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Sekolah Berkinerja Baik Nasional
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Terakreditasi A (Unggul)
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              Jenjang: SMA Putra - Putri
            </span>
          </div>

          {/* Countdown Box */}
          <div className="inline-flex items-center gap-3 bg-emerald-950/70 border border-amber-400/30 px-5 py-2.5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Sisa Waktu Promo Inden:</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-white">
              <span className="bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-500/40">
                {timeLeft.days} <span className="text-[10px] text-amber-300 font-normal">Hari</span>
              </span>
              <span>:</span>
              <span className="bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-500/40">
                {timeLeft.hours} <span className="text-[10px] text-amber-300 font-normal">Jam</span>
              </span>
              <span>:</span>
              <span className="bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-500/40">
                {timeLeft.minutes} <span className="text-[10px] text-amber-300 font-normal">Mnt</span>
              </span>
              <span>:</span>
              <span className="bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-500/40">
                {timeLeft.seconds} <span className="text-[10px] text-amber-300 font-normal">Dtk</span>
              </span>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/psb#form"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 active:scale-95 transition-all group flex items-center justify-center gap-2"
            >
              <span>Daftar Inden Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => setSelectedPoster(posters[0])}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>Lihat Brosur Resmi (Lengkap)</span>
            </button>

            <a
              href="https://bit.ly/4epP62D"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-emerald-100 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Unduh E-Book SMA</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>
        </div>

        {/* ========================================================
            BANNER PROMO INDEN BULAN NOVEMBER 2026 (Flyer Image 3)
            ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 p-6 sm:p-8 shadow-2xl border-2 border-amber-300">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 bg-slate-950 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PENDAFTARAN INDEN DIBUKA!</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black font-heading tracking-tight text-slate-950">
                Discount Rp 4.500.000,- Periode Inden November 2026
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-900 max-w-2xl leading-relaxed">
                Dapatkan potongan biaya pendaftaran santri baru terbesar dengan mendaftar pada Jalur Inden
                Tahun Pelajaran 2027/2028. Kuota santri terbatas untuk putra dan putri!
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold text-slate-900">
                <span className="bg-white/60 px-3 py-1 rounded-lg">🏷️ Jenjang: SMA Putra - Putri</span>
                <span className="bg-white/60 px-3 py-1 rounded-lg">📅 Periode Inden: 01 Nov - 31 Des 2026</span>
                <span className="bg-white/60 px-3 py-1 rounded-lg">✨ Santri Berilmu, Berakhlak, Berprestasi</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/psb#form"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-extrabold text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Klaim Diskon Inden 4,5 Jt</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/6281615184579?text=${encodeURIComponent(
                  "Halo Panitia PSB SMA Al-Furqon, saya ingin bertanya tentang Pendaftaran Inden 2027/2028 dengan Diskon 4,5 Juta."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-3 px-6 rounded-xl bg-white/70 hover:bg-white text-slate-950 font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>Konsultasi WA: 0816 1518 4579</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            INTERACTIVE POSTER BROWSER & BROCHURE VIEWER
            ======================================================== */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
                BROSUR &amp; POSTER RESMI
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                Dokumentasi Brosur PSB SMA Al-Furqon 2027/2028
              </h3>
              <p className="text-xs text-emerald-100/80">
                Pilih salah satu tab poster di bawah untuk melihat pratinjau dokumen brosur asli sekolah.
              </p>
            </div>

            {/* Poster Tabs */}
            <div className="flex flex-wrap gap-2">
              {posters.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePosterTab(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activePosterTab === idx
                      ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {p.badge}
                </button>
              ))}
            </div>
          </div>

          {/* Active Poster Preview Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Thumbnail */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => setSelectedPoster(posters[activePosterTab])}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 cursor-pointer group max-w-sm w-full bg-slate-900/70"
              >
                <img
                  src={posters[activePosterTab].src}
                  alt={posters[activePosterTab].title}
                  className="w-full h-auto max-h-[380px] object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <div className="bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5 transform group-hover:scale-110 transition-transform">
                    <Eye className="w-4 h-4" />
                    <span>Klik Perbesar Brosur</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details & Direct Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-md uppercase">
                {posters[activePosterTab].badge}
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white font-heading">
                {posters[activePosterTab].title}
              </h4>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {posters[activePosterTab].description}
              </p>

              {/* Poster specific highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-500/30 text-xs space-y-1">
                  <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Poin Utama Brosur
                  </span>
                  <p className="text-[11px] text-emerald-100/80">
                    Sekolah Berkinerja Baik Nasional, Akreditasi A, Kelas Coding &amp; Industri, Metode Ummi &amp; PTN.
                  </p>
                </div>

                <div className="bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-500/30 text-xs space-y-1">
                  <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Narahubung &amp; Kontak Resmi
                  </span>
                  <p className="text-[11px] text-emerald-100/80">
                    0856 4928 8085 / 0816 1518 4579 (Sekretariat PP. Al Furqon Driyorejo - Gresik).
                  </p>
                </div>
              </div>

              {/* Actions for this poster */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPoster(posters[activePosterTab])}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Buka Layar Penuh</span>
                </button>

                <a
                  href={posters[activePosterTab].src}
                  download={posters[activePosterTab].downloadName}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File Gambar</span>
                </a>

                <a
                  href="https://bit.ly/4epP62D"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/30 font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-emerald-300" />
                  <span>E-Book SMA (bit.ly/4epP62D)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            TIMELINE PENDAFTARAN & DISKON (From Poster 1)
            ======================================================== */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
              PROMO POTONGAN BIAYA PENDAFTARAN
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Timeline Gelombang &amp; Diskon PSB 2027/2028
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl mx-auto">
              Manfaatkan diskon terbesar pada periode awal pendaftaran santri baru untuk tahun ajaran 2027/2028.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {waves.map((w, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 space-y-3 transition-all duration-300 transform hover:-translate-y-1 relative ${
                  w.isHighlight
                    ? "bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 shadow-2xl border-2 border-amber-300 ring-4 ring-amber-400/20"
                    : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase ${
                      w.isHighlight
                        ? "bg-slate-950 text-amber-300"
                        : "bg-emerald-400/90 text-slate-950"
                    }`}
                  >
                    {w.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      w.isHighlight ? "bg-amber-300/60 text-slate-900" : "bg-white/10 text-emerald-200"
                    }`}
                  >
                    {w.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <p
                    className={`text-xs font-bold ${
                      w.isHighlight ? "text-slate-900" : "text-emerald-200"
                    }`}
                  >
                    📅 {w.period}
                  </p>
                  <h4
                    className={`text-xl font-black font-heading ${
                      w.isHighlight ? "text-slate-950" : "text-amber-300"
                    }`}
                  >
                    {w.discount}
                  </h4>
                </div>

                <p
                  className={`text-[11px] leading-relaxed ${
                    w.isHighlight ? "text-slate-900 font-medium" : "text-emerald-100/80"
                  }`}
                >
                  {w.detail}
                </p>

                <div className="pt-2">
                  <Link
                    href="/psb#form"
                    className={`w-full block text-center py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      w.isHighlight
                        ? "bg-slate-950 text-amber-300 hover:bg-slate-900 shadow"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    Daftar {w.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            ALUR PENDAFTARAN ONLINE & OFFLINE (From Poster 1)
            ======================================================== */}
        <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
              PILIHAN JALUR &amp; PROSEDUR
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Alur Pendaftaran Calon Santri Baru
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl mx-auto">
              Pendaftaran dapat dilakukan secara langsung di kantor kesekretariatan (Offline) maupun dari rumah secara Online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jalur Offline */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/15 space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Jalur Langsung
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">
                    Alur Pendaftaran Offline
                  </h4>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-emerald-100/90">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-white block">Menghubungi Nomor WA Tertera</strong>
                    <span>Konfirmasi kedatangan atau jadwal konsultasi ke panitia PSB (0856 4928 8085 / 0816 1518 4579).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-white block">Datang ke Kantor Kesekretariatan PP. Al Furqon</strong>
                    <span>Kunjungi kampus di Jl. Kyai Abdurrohim No. 1 Wedoroanom, Driyorejo - Gresik.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-white block">Mengisi Formulir &amp; Verifikasi</strong>
                    <span>Petugas membantu pengisian formulir biodata fisik, verifikasi berkas, dan observasi santri.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/6285649288085?text=${encodeURIComponent(
                    "Halo Panitia PSB SMA Al-Furqon, saya ingin menjadwalkan kedatangan ke sekretariat untuk pendaftaran offline santri baru."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi Sekretariat (0856 4928 8085)</span>
                </a>
              </div>
            </div>

            {/* Jalur Online */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/15 space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Jalur Digital
                  </span>
                  <h4 className="text-lg font-bold text-white font-heading">
                    Alur Pendaftaran Online
                  </h4>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-emerald-100/90">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-white block">Mengisi Formulir Online (Kode QR / Web)</strong>
                    <span>Lengkapi form pendaftaran online langsung di website ini atau scan kode QR pada poster.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-white block">Konfirmasi ke WhatsApp Panitia</strong>
                    <span>Kirim bukti pengisian data ke nomor WhatsApp panitia untuk validasi nomor peserta.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-white block">Tes Pemetaan &amp; Hasil Kelulusan</strong>
                    <span>Observasi baca Al-Qur&apos;an dan pengumuman hasil penerimaan secara transparan.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/psb#form"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Isi Formulir Online Sekarang</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            MENGAPA HARUS PILIH SMA AL FURQON? (8 Poin Poster 1 & 3)
            ======================================================== */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
              ALASAN MEMILIH
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Mengapa Harus Pilih SMA Al Furqon?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl mx-auto">
              Delapan keunggulan terpadu yang dirancang untuk menempa santri berilmu tinggi, berakhlak mulia, dan berprestasi unggul.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((r, idx) => {
              const Icon = r.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:bg-white/20 hover:border-amber-400/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-amber-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors font-heading">
                      {r.title}
                    </h4>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between text-[11px] text-emerald-300">
                    <span>Keunggulan #{idx + 1}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            KEUNGGULAN KAMI & FASILITAS (Flyer Portrait Image 3)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Keunggulan Kami */}
          <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="text-xl font-bold font-heading text-white">
                Keunggulan Kami
              </h4>
            </div>
            <p className="text-xs text-emerald-100/80">
              Pondasi pendidikan terpadu yang memadukan kedalaman nilai pesantren dengan keunggulan akademik modern.
            </p>
            <div className="space-y-2.5 pt-2">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fasilitas */}
          <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              <h4 className="text-xl font-bold font-heading text-white">
                Fasilitas Lengkap &amp; Modern
              </h4>
            </div>
            <p className="text-xs text-emerald-100/80">
              Sarana dan prasarana komprehensif penunjang kenyamanan belajar, ibadah, dan pembinaan santri.
            </p>
            <div className="space-y-2.5 pt-2">
              {facilities.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            PROGRAM UNGGULAN & SEBARAN KAMPUS PTN (Brosur Belakang Image 2)
            ======================================================== */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 10 Program Unggulan */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-block bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-md uppercase">
                Program Unggulan Sekolah
              </div>
              <h4 className="text-xl font-black text-white font-heading">
                10 Program Pembinaan Unggulan
              </h4>
              <p className="text-xs text-emerald-100/80">
                Dirancang sistematis untuk melahirkan santri berkemampuan akademik kompetitif dan berkarakter islami kokoh.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {topPrograms.map((prog, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs flex items-center gap-2 text-emerald-100"
                  >
                    <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-[11px]">{prog}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lulusan Tersebar di Berbagai PTN */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-block bg-emerald-400 text-slate-950 text-xs font-black px-3 py-1 rounded-md uppercase">
                Rekam Jejak Alumni
              </div>
              <h4 className="text-xl font-black text-white font-heading">
                Lulusan Tersebar di Berbagai PTN
              </h4>
              <p className="text-xs text-emerald-100/80">
                Alumni SMA Al-Furqon terbukti sukses menembus perguruan tinggi negeri terkemuka di berbagai daerah.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {ptnList.map((ptn, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-semibold flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                    <span>{ptn}</span>
                  </span>
                ))}
              </div>

              {/* 6 Target Lulusan Box */}
              <div className="mt-4 p-4 rounded-2xl bg-emerald-950/70 border border-amber-400/30 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase block">
                  6 Target Utama Lulusan:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-emerald-100">
                  <span>1. Kuat Aqidah</span>
                  <span>2. Kuat Akhlak</span>
                  <span>3. Kreatif &amp; Inovatif</span>
                  <span>4. Masuk PTN</span>
                  <span>5. Dunia Usaha</span>
                  <span>6. Beri Manfaat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            NARAHUBUNG & INFORMASI RESMI SEKRETARIAT
            ======================================================== */}
        <div className="rounded-3xl bg-emerald-950/90 border border-emerald-500/40 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-300 uppercase block">
              KONTAK &amp; SEKRETARIAT
            </span>
            <h4 className="text-xl font-black text-white font-heading">
              Butuh Informasi Lebih Lanjut?
            </h4>
            <p className="text-xs text-emerald-100/80">
              Tim panitia PSB siap mendampingi proses konsultasi dan pendaftaran putra/putri Anda.
            </p>
          </div>

          <div className="space-y-2 text-xs text-emerald-100">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>WA Panitia 1:</strong> 0856 4928 8085
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>WA Panitia 2:</strong> 0816 1518 4579
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Jl. Kyai Abdurrohim No. 1 Wedoroanom, Driyorejo - Gresik</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 justify-center">
            <a
              href="https://wa.me/6285649288085?text=Halo%20Admin%20PSB%20SMA%20Al-Furqon,%20saya%20ingin%20konsultasi%20pendaftaran%20santri%20baru%202027/2028"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Chat WhatsApp Panitia</span>
            </a>
            <Link
              href="/psb#form"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Isi Form Online</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN BROCHURE LIGHTBOX MODAL
          ======================================================== */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative max-w-5xl w-full max-h-[92vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#064E3B] text-white flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-3">
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded">
                  {selectedPoster.badge}
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base font-heading text-white">
                    {selectedPoster.title}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    Brosur Resmi PSB SMA Al-Furqon Driyorejo T.A. 2027/2028
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Image View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/90 flex justify-center items-center">
              <img
                src={selectedPoster.src}
                alt={selectedPoster.title}
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-300 text-center sm:text-left">
                <p className="font-bold text-amber-300">SMA AL-FURQON PONDOK PESANTREN AL FURQON</p>
                <p className="text-slate-400 text-[11px]">
                  Wedoroanom, Driyorejo - Gresik | WA: 0856 4928 8085 / 0816 1518 4579
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={selectedPoster.src}
                  download={selectedPoster.downloadName}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Brosur</span>
                </a>

                <Link
                  href="/psb#form"
                  onClick={() => setSelectedPoster(null)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Daftar Inden</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
