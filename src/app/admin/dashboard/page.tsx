"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import {
  Building2,
  Newspaper,
  Trophy,
  GraduationCap,
  Image as ImageIcon,
  Users,
  CheckCircle,
  Clock,
  ExternalLink,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { news, achievements, teachers, gallery, applicants, facilities, extracurriculars, updateApplicantStatus } = useData();

  useEffect(() => {
    const token = localStorage.getItem("sma_admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const stats = [
    { title: "Ekstrakurikuler", count: extracurriculars.length, icon: Sparkles, color: "bg-emerald-600" },
    { title: "Fasilitas Modern", count: facilities.length, icon: Building2, color: "bg-indigo-600" },
    { title: "Berita & Pengumuman", count: news.length, icon: Newspaper, color: "bg-blue-500" },
    { title: "Prestasi Terdaftar", count: achievements.length, icon: Trophy, color: "bg-amber-500" },
    { title: "Guru & Staf", count: teachers.length, icon: GraduationCap, color: "bg-emerald-700" },
    { title: "Dokumentasi Galeri", count: gallery.length, icon: ImageIcon, color: "bg-teal-600" },
    { title: "Pendaftar PPDB", count: applicants.length, icon: Users, color: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Overview CMS Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Kelola konten informasi, berita, prestasi, dan pendaftaran santri SMA Al-Furqon Driyorejo.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
          >
            <span>Buka Website Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#0E241E] p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>
                  <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                    {item.count}
                  </h3>
                </div>
                <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center shadow`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* PPDB Submissions Recent Table */}
        <div className="bg-white dark:bg-[#0E241E] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              Data Pendaftar PPDB 2026 Terbaru
            </h3>
            <Link href="/admin/ppdb" className="text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline">
              Lihat Semua ({applicants.length})
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-3">No. Reg</th>
                  <th className="p-3">Nama Santri</th>
                  <th className="p-3">Asal Sekolah</th>
                  <th className="p-3">Peminatan</th>
                  <th className="p-3">No. WhatsApp</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
                {applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                      {app.registrationNumber}
                    </td>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      {app.fullName}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {app.originSchool}
                    </td>
                    <td className="p-3 font-medium text-emerald-700 dark:text-emerald-400">
                      {app.selectedMajor}
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-300">
                      {app.phoneWhatsapp}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          app.status === "Diterima"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                            : app.status === "Terverifikasi"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplicantStatus(app.id, e.target.value as any)
                        }
                        className="bg-slate-100 dark:bg-emerald-950 p-1.5 rounded text-[11px] font-medium border border-slate-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200"
                      >
                        <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                        <option value="Terverifikasi">Terverifikasi</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
