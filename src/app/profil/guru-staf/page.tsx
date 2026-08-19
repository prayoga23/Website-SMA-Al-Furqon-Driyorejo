"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import {
  GraduationCap,
  BookOpen,
  Search,
  UserCheck,
  Award,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { TeacherItem } from "@/lib/types";

export default function GuruStafPage() {
  const { teachers } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const categories = [
    { id: "all", label: "Semua Dewan Guru" },
    { id: "pimpinan", label: "Pimpinan & Staf TU" },
    { id: "matpel", label: "Guru Mata Pelajaran" },
    { id: "ummi", label: "Guru Keagamaan & UMMI" },
  ];

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.position.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === "pimpinan") {
      return (
        t.position.toLowerCase().includes("kepala") ||
        t.position.toLowerCase().includes("kadep") ||
        t.position.toLowerCase().includes("wk.") ||
        t.position.toLowerCase().includes("tata usaha") ||
        t.position.toLowerCase().includes("tu")
      );
    }
    if (activeCategory === "ummi") {
      return (
        t.position.toLowerCase().includes("ummi") ||
        t.subject.toLowerCase().includes("ummi") ||
        t.subject.toLowerCase().includes("aswaja") ||
        t.subject.toLowerCase().includes("fiqih") ||
        t.subject.toLowerCase().includes("pai") ||
        t.subject.toLowerCase().includes("arab")
      );
    }
    if (activeCategory === "matpel") {
      return (
        !t.position.toLowerCase().includes("kepala") &&
        !t.position.toLowerCase().includes("kadep") &&
        !t.position.toLowerCase().includes("tata usaha") &&
        !t.subject.toLowerCase().includes("ummi")
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Guru & Tenaga Pendidik"
        subtitle="Direktori dewan guru profesional dan berpengalaman SMA Al-Furqon Driyorejo."
        breadcrumb={[{ name: "Profil", href: "/profil" }, { name: "Guru & Staf" }]}
      />

      <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#0E241E] p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#047857] dark:text-emerald-400 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                {teachers.length} Guru & Staf
              </p>
              <p className="text-xs text-slate-500">Tenaga Pendidik Berkualifikasi S1/S2/S3</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E241E] p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                Metode UMMI & Kumer
              </p>
              <p className="text-xs text-slate-500">Pengajar Tersertifikasi Ummi Foundation</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E241E] p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                Pembimbing Berprestasi
              </p>
              <p className="text-xs text-slate-500">Mendampingi Siswa Lolos PTN & Juara Sains</p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#064E3B] text-white shadow-md scale-105"
                    : "bg-white dark:bg-[#0E241E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950 border border-slate-200 dark:border-emerald-900/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Cari nama guru atau mata pelajaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#047857] shadow-sm dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t) => {
            const hasError = imgErrors[t.id];
            const showFallback = !t.photo || hasError;

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTeacher(t)}
                className="bg-white dark:bg-[#0E241E] rounded-3xl p-6 border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-center cursor-pointer relative"
              >
                <div>
                  {/* Photo Container with Fallback Badge */}
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#064E3B] dark:border-emerald-500 shadow-md group-hover:scale-105 transition-transform duration-300 relative bg-emerald-900 flex items-center justify-center">
                    {!showFallback ? (
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImgError(t.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-emerald-950 text-white font-extrabold text-2xl flex items-center justify-center font-heading">
                        {t.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white font-heading mb-1 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#047857] dark:text-emerald-400 mb-2">
                    {t.position}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#064E3B] dark:text-emerald-300 text-[11px] font-bold mb-3 border border-emerald-200/50 dark:border-emerald-800/40">
                    {t.subject}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {t.education}
                  </p>
                </div>

                {t.bio ? (
                  <p className="text-[11px] text-slate-400 italic pt-3 border-t border-slate-100 dark:border-emerald-900/30 line-clamp-2">
                    &quot;{t.bio}&quot;
                  </p>
                ) : (
                  <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/30 text-[11px] text-slate-400">
                    SMA Al-Furqon Driyorejo
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white dark:bg-[#0E241E] p-12 rounded-3xl text-center space-y-3 border border-slate-200 dark:border-emerald-900/40">
            <User className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="font-bold text-slate-700 dark:text-slate-200">
              Tidak Ada Guru yang Sesuai Filter
            </h4>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau kategori filter.</p>
          </div>
        )}
      </main>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0E241E] max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-emerald-900/60 relative">
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-full bg-slate-100 dark:bg-emerald-950"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3 pt-2">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-[#064E3B] shadow-lg bg-emerald-900 flex items-center justify-center">
                {selectedTeacher.photo && !imgErrors[selectedTeacher.id] ? (
                  <img
                    src={selectedTeacher.photo}
                    alt={selectedTeacher.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImgError(selectedTeacher.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-emerald-950 text-white font-extrabold text-3xl flex items-center justify-center font-heading">
                    {selectedTeacher.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white font-heading">
                  {selectedTeacher.name}
                </h3>
                <p className="text-xs font-semibold text-[#047857] dark:text-emerald-400">
                  {selectedTeacher.position}
                </p>
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
                {selectedTeacher.subject}
              </div>

              <div className="bg-slate-50 dark:bg-[#081612] p-4 rounded-2xl space-y-2 text-xs text-left border border-slate-100 dark:border-emerald-900/40">
                <div>
                  <span className="text-slate-400 font-semibold block">Pendidikan:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">
                    {selectedTeacher.education}
                  </span>
                </div>
                {selectedTeacher.bio && (
                  <div>
                    <span className="text-slate-400 font-semibold block">Profil & Catatan:</span>
                    <p className="text-slate-700 dark:text-slate-300 italic">
                      &quot;{selectedTeacher.bio}&quot;
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="w-full py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs shadow transition-colors"
                >
                  Tutup Profil
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
