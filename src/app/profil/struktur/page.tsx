"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import {
  Network,
  Users,
  Award,
  Crown,
  GraduationCap,
  Briefcase,
  BookOpen,
  UserCheck,
  Download,
  Eye,
  ZoomIn,
  X,
  FileImage,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { useData } from "@/context/data-context";

export default function StrukturPage() {
  const { teachers } = useData();
  const [activeView, setActiveView] = useState<"interactive" | "original">("interactive");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);

  const officialImagePath = "/struktur%20sma%20al%20furqon.jpeg";

  // Data Grounded Exactly in public/struktur sma al furqon.jpeg (T.A. 2025/2026)
  const topLeadership = [
    {
      role: "Pendiri - Pengasuh PP. Al-Furqon",
      name: "KH. MASHURI ABDURROHIM",
      category: "Yayasan & Pengasuh",
      level: 1,
      desc: "Pendiri dan Pengasuh Utama Pondok Pesantren Al-Furqon Driyorejo.",
      badgeColor: "bg-amber-500 text-white dark:bg-amber-600",
      photo: "/foto-guru/abdul-muid.jpg",
    },
    {
      role: "Wakil Pengasuh PP. Al-Furqon",
      name: "NY. HJ. DIAN P. MASHURI",
      category: "Yayasan & Pengasuh",
      level: 2,
      desc: "Wakil Pengasuh Pondok Pesantren Al-Furqon Driyorejo.",
      badgeColor: "bg-amber-600 text-white dark:bg-amber-700",
    },
    {
      role: "Ketua Yayasan PP. Al-Furqon",
      name: "Gus Muhammad Reva mashuri, M.Pd.",
      category: "Yayasan & Pengasuh",
      level: 3,
      desc: "Ketua Yayasan Pondok Pesantren Al-Furqon Driyorejo.",
      badgeColor: "bg-amber-700 text-white dark:bg-amber-800",
    },
  ];

  const schoolPrincipals = [
    {
      role: "Kepala Sekolah SMA Al-Furqon",
      name: "Dr. Suryanto, S.Pd., M.Pd.",
      category: "Pimpinan Sekolah",
      level: 4,
      isMain: true,
      desc: "Penanggung Jawab Utama Manajemen & Pembelajaran SMA Al-Furqon Driyorejo.",
      badgeColor: "bg-emerald-700 text-white dark:bg-emerald-600",
      photo: "/foto-guru/suryanto.png",
    },
    {
      role: "Kepala TU / Bendahara SMA Al-Furqon",
      name: "Siti Alfiyatus Sa'diyah, S.Pd.",
      category: "Staf Pimpinan / Admin",
      level: 4,
      isStaff: true,
      desc: "Penanggung Jawab Tata Usaha, Administrasi Keuangan, & Layanan Sekolah.",
      badgeColor: "bg-teal-700 text-white dark:bg-teal-600",
      photo: "/foto-guru/siti-alfiyatus.jpg",
    },
  ];

  const vicePrincipals = [
    {
      role: "Waka Kesiswaan SMA Al-Furqon",
      name: "Suherman, S.Pd., M.Pd.",
      category: "Wakil Kepala Sekolah",
      level: 5,
      desc: "Penanggung Jawab Karakter Santri, Kedisiplinan, OSIS, & Kedinasan Kesiswaan.",
      badgeColor: "bg-blue-600 text-white dark:bg-blue-700",
      photo: "/foto-guru/suherman.jpg",
    },
    {
      role: "Waka Kurikulum SMA Al-Furqon",
      name: "Triana Dewitasari, S.Pd.",
      category: "Wakil Kepala Sekolah",
      level: 5,
      desc: "Penanggung Jawab Implementasi Kurikulum Merdeka, Jadwal KBM, & Asesmen Pembelajaran.",
      badgeColor: "bg-indigo-600 text-white dark:bg-indigo-700",
      photo: "/foto-guru/triana-dewitasari.jpg",
    },
    {
      role: "Waka Bina Prestasi SMA Al-Furqon",
      name: "Fita Islamiah, S.Pd.",
      category: "Wakil Kepala Sekolah",
      level: 5,
      desc: "Penanggung Jawab Pembinaan Kompetisi Akademik, Olimpiade Sains, & Ekstrakurikuler.",
      badgeColor: "bg-purple-600 text-white dark:bg-purple-700",
    },
  ];

  const counselingStaff = [
    {
      role: "BK. SMA Al-Furqon",
      name: "Masyhudan, S.T.",
      category: "Bimbingan & Konseling",
      level: 6,
      desc: "Guru Bimbingan & Konseling Pembinaan Karakter Putra.",
      badgeColor: "bg-cyan-600 text-white dark:bg-cyan-700",
    },
    {
      role: "BK. SMA Al-Furqon",
      name: "Nurul Idhomah, S.Pd.",
      category: "Bimbingan & Konseling",
      level: 6,
      desc: "Guru Bimbingan & Konseling Pembinaan Karakter Putri.",
      badgeColor: "bg-cyan-600 text-white dark:bg-cyan-700",
    },
  ];

  const homeroomTeachers = [
    {
      role: "Wali Kelas X-1",
      name: "Khoirum Umala, S.Pd.",
      category: "Wali Kelas X",
      level: 7,
    },
    {
      role: "Wali Kelas X-2",
      name: "Sugeng Utomo, S.Pd.",
      category: "Wali Kelas X",
      level: 7,
    },
    {
      role: "Wali Kelas XI-1",
      name: "DIAN PURWANTI, S.PD.",
      category: "Wali Kelas XI",
      level: 7,
    },
    {
      role: "Wali Kelas XI-2",
      name: "NURUL IDHOMAH, S.PD.",
      category: "Wali Kelas XI",
      level: 7,
    },
    {
      role: "Wali Kelas XII-1",
      name: "Fita Islamiah, S.Pd.",
      category: "Wali Kelas XII",
      level: 7,
    },
    {
      role: "Wali Kelas XII-2",
      name: "M. Mas'ud Yunus, S.Pd.",
      category: "Wali Kelas XII",
      level: 7,
    },
    {
      role: "Wali Kelas XII-3",
      name: "Triana Dewitasari, S.Pd.",
      category: "Wali Kelas XII",
      level: 7,
    },
  ];

  // Helper to match photos from useData teachers if available
  const getTeacherPhoto = (name: string, defaultPhoto?: string) => {
    if (defaultPhoto) return defaultPhoto;
    const match = teachers.find(
      (t) => t.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    return match?.photo || null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Struktur Organisasi"
        subtitle="Bagan Kepemimpinan & Pengelola SMA Al-Furqon Driyorejo Tahun Ajaran 2025/2026"
        breadcrumb={[{ name: "Profil", href: "/profil" }, { name: "Struktur Organisasi" }]}
      />

      <main className="flex-1 py-8 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header Title Banner & View Toggle */}
        <div className="bg-white dark:bg-[#0E241E] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
              <Network className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-[11px] sm:text-xs font-bold mb-1">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Tahun Ajaran 2025/2026
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white leading-snug">
                Struktur Organisasi SMA Al-Furqon
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                Bagan kepemimpinan amanah, profesional, dan berorientasi pada kemajuan pendidikan santri.
              </p>
            </div>
          </div>

          {/* View Toggles & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <div className="bg-slate-100 dark:bg-emerald-950/80 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl flex items-center gap-1 border border-slate-200 dark:border-emerald-900/40">
              <button
                onClick={() => setActiveView("interactive")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all ${
                  activeView === "interactive"
                    ? "bg-[#064E3B] text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Bagan Interaktif
              </button>
              <button
                onClick={() => setActiveView("original")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all ${
                  activeView === "original"
                    ? "bg-[#064E3B] text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FileImage className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Gambar Resmi
              </button>
            </div>

            <a
              href={officialImagePath}
              download="Struktur Organisasi SMA Al Furqon Driyorejo.jpeg"
              className="px-4 py-2.5 rounded-xl sm:rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-105"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Unduh Gambar
            </a>
          </div>
        </div>

        {/* View Mode 1: Interactive Hierarchy Tree Flowchart */}
        {activeView === "interactive" && (
          <div className="space-y-10 sm:space-y-12">
            {/* Horizontal Scroll Hint for Mobile Users */}
            <div className="md:hidden flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
              <span className="font-semibold">💡 Tips Tampilan Mobile:</span>
              <span className="text-slate-500 dark:text-slate-400">Geser kesamping / Tap kartu untuk detail</span>
            </div>

            {/* Tree Flowchart Container with Responsive Horizontal Panning on Mobile */}
            <div className="bg-white dark:bg-[#0E241E] p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm relative overflow-hidden">
              {/* Background Subtle Grid Pattern */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#064E3B_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 max-w-5xl mx-auto space-y-10 sm:space-y-12 text-center overflow-x-auto pb-4 scrollbar-thin">
                {/* Level 1: Yayasan & Pengasuh PP. Al-Furqon */}
                <div className="min-w-[300px]">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 border border-amber-300/50 dark:border-amber-800/40 shadow-sm">
                    <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" /> Pengasuh & Yayasan PP. Al-Furqon
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
                    {topLeadership.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedRole(item)}
                        className="bg-gradient-to-b from-[#1E1B4B] to-[#312E81] text-white p-4 sm:p-5 rounded-2xl border border-amber-400/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block mb-1">
                            {item.role}
                          </span>
                          <h3 className="text-xs sm:text-sm font-black font-heading leading-tight group-hover:text-amber-200 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300">
                          <span>Pondok Pesantren</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting Line Down */}
                <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-amber-500 to-emerald-600 mx-auto" />

                {/* Level 2: Kepala Sekolah & Side Staff (Kepala TU/Bendahara) */}
                <div className="min-w-[300px]">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 border border-emerald-300/50 dark:border-emerald-800/40 shadow-sm">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" /> Pimpinan Sekolah & Manajemen
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 max-w-3xl mx-auto relative">
                    {/* Kepala Sekolah Main Node */}
                    <div
                      onClick={() => setSelectedRole(schoolPrincipals[0])}
                      className="w-full md:w-80 bg-[#064E3B] text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-amber-400/60 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer text-center group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded-bl-xl shadow">
                        Kepala Sekolah
                      </div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto mb-3 border-4 border-amber-300 shadow-md bg-emerald-950 flex items-center justify-center">
                        {schoolPrincipals[0].photo ? (
                          <img
                            src={schoolPrincipals[0].photo}
                            alt={schoolPrincipals[0].name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300" />
                        )}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 block mb-0.5 sm:mb-1 uppercase tracking-wider">
                        {schoolPrincipals[0].role}
                      </span>
                      <h3 className="text-sm sm:text-base font-black font-heading group-hover:text-amber-200 transition-colors">
                        {schoolPrincipals[0].name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-emerald-100/80 mt-1.5 sm:mt-2 line-clamp-2">
                        {schoolPrincipals[0].desc}
                      </p>
                    </div>

                    {/* Mobile Vertical Connector between Kepala Sekolah & TU */}
                    <div className="md:hidden w-0.5 h-4 bg-emerald-600 mx-auto" />

                    {/* Horizontal Connection on Desktop */}
                    <div className="hidden md:block w-12 h-0.5 bg-slate-300 dark:bg-emerald-800" />

                    {/* Kepala TU Node */}
                    <div
                      onClick={() => setSelectedRole(schoolPrincipals[1])}
                      className="w-full md:w-72 bg-slate-800 text-white p-4 sm:p-5 rounded-2xl border border-slate-600 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mx-auto mb-2 border-2 border-emerald-400 shadow bg-slate-900 flex items-center justify-center">
                        {schoolPrincipals[1].photo ? (
                          <img
                            src={schoolPrincipals[1].photo}
                            alt={schoolPrincipals[1].name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block mb-0.5">
                        {schoolPrincipals[1].role}
                      </span>
                      <h4 className="text-xs font-extrabold font-heading group-hover:text-emerald-300 transition-colors">
                        {schoolPrincipals[1].name}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Connecting Line Down */}
                <div className="w-0.5 h-6 sm:h-8 bg-emerald-600 mx-auto" />

                {/* Level 3: Wakil Kepala Sekolah (Waka) */}
                <div className="min-w-[300px]">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 border border-blue-300/50 dark:border-blue-800/40 shadow-sm">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" /> Wakil Kepala Sekolah (Waka)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
                    {vicePrincipals.map((item, idx) => {
                      const photo = getTeacherPhoto(item.name, item.photo);
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedRole(item)}
                          className="bg-white dark:bg-[#122E26] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-emerald-800/60 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300 cursor-pointer text-center group"
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto mb-2.5 sm:mb-3 border-2 border-blue-500 shadow bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                            {photo ? (
                              <img
                                src={photo}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                            )}
                          </div>
                          <span className="text-[9px] sm:text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                            {item.role}
                          </span>
                          <h4 className="text-xs font-black font-heading text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Connecting Line Down */}
                <div className="w-0.5 h-6 sm:h-8 bg-slate-300 dark:bg-emerald-800 mx-auto" />

                {/* Level 4: Bimbingan & Konseling (BK) */}
                <div className="min-w-[300px]">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 border border-cyan-300/50 dark:border-cyan-800/40 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600" /> Bimbingan Konseling (BK)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-2xl mx-auto">
                    {counselingStaff.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedRole(item)}
                        className="bg-cyan-50/60 dark:bg-cyan-950/30 p-3.5 sm:p-4 rounded-2xl border border-cyan-200/80 dark:border-cyan-900/50 hover:shadow-md transition-all text-center cursor-pointer group"
                      >
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-cyan-700 dark:text-cyan-400 block mb-0.5">
                          {item.role}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                          {item.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting Line Down */}
                <div className="w-0.5 h-6 sm:h-8 bg-slate-300 dark:bg-emerald-800 mx-auto" />

                {/* Level 5: Wali Kelas T.A. 2025/2026 */}
                <div className="min-w-[300px]">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 border border-teal-300/50 dark:border-teal-800/40 shadow-sm">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" /> Wali Kelas T.A. 2025/2026
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
                    {homeroomTeachers.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedRole(item)}
                        className="bg-slate-50 dark:bg-emerald-950/50 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/50 text-center hover:border-emerald-500 dark:hover:border-emerald-400 transition-all cursor-pointer group hover:bg-white dark:hover:bg-[#122E26] shadow-sm"
                      >
                        <span className="text-[9px] sm:text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5 sm:mb-1">
                          {item.role}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-[#047857] dark:group-hover:text-emerald-300">
                          {item.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Level Detail Cards */}
            <div className="space-y-5 sm:space-y-6 pt-2 sm:pt-4">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#047857]" /> Rincian Tugas & Peran Pengelola
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...topLeadership, ...schoolPrincipals, ...vicePrincipals].map((item, idx) => {
                  const photo = getTeacherPhoto(item.name, (item as any).photo);
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#0E241E] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 dark:bg-emerald-950 overflow-hidden border border-emerald-200 dark:border-emerald-800 shrink-0 flex items-center justify-center">
                            {photo ? (
                              <img
                                src={photo}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#047857] dark:text-emerald-400" />
                            )}
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                            {item.category}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-[#047857] dark:text-emerald-400 block mb-0.5">
                            {item.role}
                          </span>
                          <h4 className="text-sm font-extrabold font-heading text-slate-900 dark:text-white leading-snug">
                            {item.name}
                          </h4>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.desc || "Pengelola dan tenaga pendidik profesional SMA Al-Furqon Driyorejo."}
                        </p>
                      </div>

                      <div className="pt-3.5 sm:pt-4 border-t border-slate-100 dark:border-emerald-900/30 mt-4 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                        <span>SMA Al-Furqon</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          T.A. 2025/2026
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Official Original Uploaded Diagram Image */}
        {activeView === "original" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0E241E] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-emerald-900/40 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                    Gambar Resmi Bagan Struktur Organisasi (2025/2026)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bagan resmi dari administrasi SMA Al-Furqon Driyorejo.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-emerald-200 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" /> Perbesar
                  </button>
                  <a
                    href={officialImagePath}
                    download="Struktur Organisasi SMA Al Furqon Driyorejo.jpeg"
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow transition-colors"
                  >
                    <Download className="w-4 h-4" /> Unduh
                  </a>
                </div>
              </div>

              {/* High Quality Image Preview Box */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/60 shadow-lg cursor-pointer bg-slate-900 flex justify-center max-w-4xl mx-auto"
              >
                <img
                  src={officialImagePath}
                  alt="Struktur Organisasi Sekolah SMA Al Furqon Driyorejo"
                  className="w-full h-auto object-contain max-h-[75vh] sm:max-h-[85vh] group-hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs flex items-center gap-2 shadow-xl">
                    <ZoomIn className="w-4 h-4 text-[#064E3B]" /> Klik untuk Memperbesar
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Lightbox Image Preview Modal (Mobile Optimized) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-5xl w-full max-h-[96vh] bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
            <div className="p-3 sm:p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileImage className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold truncate">
                  Bagan Struktur Organisasi 2025/2026
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={officialImagePath}
                  download="Struktur Organisasi SMA Al Furqon Driyorejo.jpeg"
                  className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 hover:bg-emerald-500 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-slate-950 scrollbar-thin">
              <img
                src={officialImagePath}
                alt="Struktur Organisasi High Res"
                className="max-w-full max-h-[82vh] object-contain rounded-lg sm:rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Role Detail Modal (Mobile Optimized) */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0E241E] max-w-md w-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-emerald-900/60 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-full bg-slate-100 dark:bg-emerald-950"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="text-center space-y-3 pt-1 sm:pt-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mx-auto border-4 border-[#064E3B] shadow-md bg-emerald-950 flex items-center justify-center">
                {getTeacherPhoto(selectedRole.name, selectedRole.photo) ? (
                  <img
                    src={getTeacherPhoto(selectedRole.name, selectedRole.photo)!}
                    alt={selectedRole.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
                )}
              </div>

              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#047857] dark:text-emerald-400 uppercase tracking-wider block">
                  {selectedRole.role}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white font-heading">
                  {selectedRole.name}
                </h3>
              </div>

              <div className="bg-slate-50 dark:bg-[#081612] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-xs text-left border border-slate-100 dark:border-emerald-900/40 space-y-2">
                <div>
                  <span className="text-slate-400 font-semibold block">Jabatan / Peran:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">
                    {selectedRole.role}
                  </span>
                </div>
                {selectedRole.desc && (
                  <div>
                    <span className="text-slate-400 font-semibold block">Tugas & Fungsi:</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedRole.desc}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-1 sm:pt-2">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="w-full py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs shadow transition-colors"
                >
                  Tutup Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingWidgets />
    </div>
  );
}

