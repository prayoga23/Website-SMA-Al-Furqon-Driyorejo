"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Calendar,
  Users,
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Target,
  ChevronLeft,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { useData } from "@/context/data-context";

export const AboutSection: React.FC = () => {
  const { schoolInfo } = useData();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides = [
    {
      id: "pengasuh",
      leaderTitle: "Ketua Yayasan & Pengasuh Pondok Pesantren Al - Furqon",
      name: "KH. Mashuri Abdurrohiem",
      role: "Ketua Yayasan & Pengasuh PP. Al-Furqon",
      image: "/gambar kyai.jpg",
      fitStyle: "object-cover object-[center_15%]",
      photoTag: "KH. Mashuri Abdurrohiem (Pengasuh Pondok Pesantren Al-Furqon bersama Bu Nyai)",
      headingText: "Selayang Pandang SMA PP. Al-Furqon",
      quoteText:
        "SMA PP. Al Furqon merupakan lembaga pendidikan dengan penyelenggara Pondok Pesantren Al Furqon yang didirikan dan diasuh oleh KH. Mashuri Abdurrohiem. Kami hadir dan siap untuk memenuhi kebutuhan masyarakat akan pentingnya pendidikan karakter Islami yang kuat dan memiliki kemampuan berpikir kritis, kolaboratif, kreatif, inovatif serta komunikatif. Program dan lingkungan kondusif yang kami tawarkan insyaAllah akan menempa dan memproses santri meraih asa.",
      badge: "Pondok Pesantren Al-Furqon Driyorejo",
      location: "Wedoroanom, Gresik",
    },
    {
      id: "kepala-sekolah",
      leaderTitle: "Kepala Sekolah",
      name: "Ust. Suryanto, S.Pd., M.Pd.",
      role: "Kepala Sekolah SMA Al-Furqon Driyorejo",
      image: "/foto-kepala-sekolah.png",
      fitStyle: "object-contain bg-[#033aa7] dark:bg-[#022873] p-1.5",
      photoTag: "Ust. Suryanto, S.Pd., M.Pd. (Kepala Sekolah SMA Al-Furqon Driyorejo)",
      headingText: "Kata Pengantar Kepala Sekolah",
      quoteText:
        "Puji syukur kepada Allah SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerah-Nya. Salah satu tujuan dari sarana ini adalah sebagai sarana informasi bagi masyarakat tentang seluruh program dan kegiatan yang ada di SMA Al Furqon Pondok Pesantren Al Furqon Driyorejo Gresik. Semoga dengan adanya sarana ini dapat membantu dan memberi manfaat, terutama informasi yang berhubungan dengan pendidikan, ilmu pengetahuan dan informasi seputar sekolah. Besar harapan kami, sarana ini dapat memberi manfaat bagi semua pihak yang ada di lingkup pendidikan dan pemerhati pendidikan.",
      badge: "SMA Al-Furqon Driyorejo",
      location: "Wedoroanom, Gresik",
    },
  ];

  const currentSlide = slides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const statCards = [
    {
      title: "Akreditasi",
      value: schoolInfo.accreditation,
      icon: Award,
      desc: "Status Unggulan BAN-SM",
    },
    {
      title: "Tahun Berdiri",
      value: schoolInfo.stats.establishedYear.toString(),
      icon: Calendar,
      desc: "20+ Tahun Mengabdi",
    },
    {
      title: "Jumlah Siswa",
      value: `-`,
      icon: Users,
      desc: "Santri & Pelajar",
    },
    {
      title: "Guru & Staf",
      value: `${schoolInfo.stats.teachers}`,
      icon: GraduationCap,
      desc: "Tenaga Pendidik S1/S2/S3",
    },
    {
      title: "Prestasi Terukir",
      value: `-`,
      icon: Sparkles,
      desc: "Tingkat Kabupaten - Nasional",
    },
    {
      title: "Program Unggulan",
      value: "6 Program",
      icon: BookOpen,
      desc: "Kurikulum Terpadu",
    },
  ];

  const targetLulusan = [
    { num: "01", title: "Kuat Aqidah" },
    { num: "02", title: "Kuat Akhlak / Karakter" },
    { num: "03", title: "Kreatif, Inovatif & Inspiratif" },
    { num: "04", title: "Menuju Perguruan Tinggi" },
    { num: "05", title: "Menuju Dunia Usaha & Wirausaha" },
    { num: "06", title: "Memberikan Manfaat" },
  ];

  return (
    <section id="tentang" className="py-20 bg-[#FDFBF7] dark:bg-[#091512] transition-colors relative overflow-hidden">
      {/* Background Decor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/bg-sma-al-furqon.webp')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">

        {/* Upper Split Layout: Selayang Pandang & Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Visual & Leadership Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-5">

              {/* Slide Switcher Buttons */}
              <div className="flex items-center justify-between gap-2 bg-slate-200/80 dark:bg-emerald-950/80 p-1.5 rounded-2xl border border-slate-300 dark:border-emerald-900/50 shadow-inner">
                <button
                  onClick={() => setActiveSlide(0)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeSlide === 0
                    ? "bg-[#064E3B] text-white shadow-md scale-[1.02]"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-emerald-900/50"
                    }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pengasuh PP</span>
                </button>
                <button
                  onClick={() => setActiveSlide(1)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeSlide === 1
                    ? "bg-[#064E3B] text-white shadow-md scale-[1.02]"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-emerald-900/50"
                    }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Kepala Sekolah</span>
                </button>
              </div>

              {/* Main Photo Card with Carousel Controls */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-emerald-950 aspect-[4/3] relative group bg-slate-900">
                <img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.name}
                  className={`w-full h-full ${currentSlide.fitStyle} transition-all duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10 pointer-events-none"></div>

                {/* Arrow Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20 shadow"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20 shadow"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-3.5 left-3 right-3 text-white">
                  <span className="bg-amber-400 text-slate-900 text-[9px] font-extrabold px-2 py-1 rounded-md mb-1 inline-block uppercase shadow-sm">
                    {currentSlide.photoTag}
                  </span>
                  <p className="text-xs font-bold text-amber-200">{currentSlide.name}</p>
                  <p className="text-[11px] text-slate-200">{currentSlide.role}</p>
                </div>
              </div>

              {/* Leadership Box (Interactive Row Selection) */}
              <div className="bg-white dark:bg-[#0E241E] p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/50 shadow-xl space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-emerald-900/40 pb-2">
                  <ShieldCheck className="w-5 h-5 text-[#047857] dark:text-emerald-400" />
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white font-heading">
                    Pimpinan & Pengasuh Lembaga
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div
                    onClick={() => setActiveSlide(0)}
                    className={`flex justify-between items-center p-2.5 rounded-xl cursor-pointer transition-all border ${activeSlide === 0
                      ? "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400/50 shadow-sm"
                      : "bg-slate-50 dark:bg-emerald-950/30 border-transparent hover:bg-slate-100"
                      }`}
                  >
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Pengasuh Pondok Pesantren :</span>
                    <span className="font-bold text-slate-900 dark:text-amber-300">KH. Mashuri Abdurrohiem</span>
                  </div>
                  <div
                    onClick={() => setActiveSlide(1)}
                    className={`flex justify-between items-center p-2.5 rounded-xl cursor-pointer transition-all border ${activeSlide === 1
                      ? "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400/50 shadow-sm"
                      : "bg-slate-50 dark:bg-emerald-950/30 border-transparent hover:bg-slate-100"
                      }`}
                  >
                    <span className="text-slate-600 dark:text-slate-400 font-medium">Kepala Sekolah :</span>
                    <span className="font-bold text-slate-900 dark:text-emerald-400">Suryanto, S.Pd., M.Pd.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Dynamic Selayang Pandang / Kata Pengantar Card */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950/80 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-emerald-300/40">
                SELAYANG PANDANG & SAMBUTAN
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading leading-tight">
                Membina Generasi Unggul Intelektual & Anggun Moralitas
              </h2>
            </div>

            {/* Dynamic Highlight Speech Card */}
            <div className="bg-gradient-to-r from-emerald-50 via-white to-amber-50/50 dark:from-[#0E241E] dark:via-[#0E241E] dark:to-emerald-950/40 p-6 sm:p-8 rounded-3xl border-l-4 border-[#064E3B] dark:border-emerald-400 shadow-md relative space-y-4 transition-all duration-300">
              <Quote className="w-10 h-10 text-emerald-200 dark:text-emerald-800 absolute top-4 right-4 opacity-50" />

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-700 dark:text-amber-300">
                  {currentSlide.leaderTitle}
                </span>
              </div>

              <h3 className="font-extrabold text-lg sm:text-xl text-[#064E3B] dark:text-emerald-400 font-heading">
                {currentSlide.headingText}
              </h3>

              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic relative z-10 font-medium">
                &quot;{currentSlide.quoteText}&quot;
              </p>

              <div className="pt-3 border-t border-slate-200/60 dark:border-emerald-900/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-wrap gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Oleh: <strong className="text-[#064E3B] dark:text-emerald-300">{currentSlide.name}</strong>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentSlide.badge}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs shadow-md transition-all group"
              >
                <span>Selengkapnya Tentang Profil Sekolah</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <span>Penerimaan Santri Baru (PSB)</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Target Lulusan Block (6 Target Lulusan) */}
        <div className="bg-white dark:bg-[#0E241E] rounded-3xl p-8 border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-[#047857] dark:text-emerald-400" />
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                6 Target Utama Lulusan SMA Al-Furqon
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              Profil Kelulusan Santri
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {targetLulusan.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-amber-300 font-extrabold text-sm flex items-center justify-center font-heading shrink-0 shadow group-hover:scale-105 transition-transform">
                  {item.num}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h4>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Lower Statistics Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0E241E] p-5 rounded-2xl border border-slate-100 dark:border-emerald-900/40 shadow-sm hover:shadow-md transition-all text-center group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#047857] dark:text-emerald-400 mx-auto flex items-center justify-center mb-3 group-hover:bg-[#064E3B] group-hover:text-amber-300 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                  {stat.value}
                </h4>
                <p className="text-xs font-bold text-[#064E3B] dark:text-emerald-400 mt-0.5">
                  {stat.title}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
