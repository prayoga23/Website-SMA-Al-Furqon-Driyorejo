"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  Newspaper,
  Calendar,
  Trophy,
  GraduationCap,
  Image as ImageIcon,
  Users,
  Settings,
  LogOut,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useData } from "@/context/data-context";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { schoolInfo } = useData();

  const menu = [
    { name: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Kelola Profil & Visi Misi", href: "/admin/settings", icon: Settings },
    { name: "Kelola Ekstrakurikuler", href: "/admin/ekstrakurikuler", icon: Sparkles },
    { name: "Kelola Fasilitas Sekolah", href: "/admin/fasilitas", icon: Building2 },
    { name: "Kelola Berita & Informasi", href: "/admin/berita", icon: Newspaper },
    { name: "Kelola Agenda & Kalender", href: "/admin/agenda", icon: Calendar },
    { name: "Kelola Prestasi Siswa", href: "/admin/prestasi", icon: Trophy },
    { name: "Kelola Guru & Staf", href: "/admin/guru", icon: GraduationCap },
    { name: "Kelola Galeri Dokumentasi", href: "/admin/galeri", icon: ImageIcon },
    { name: "Kelola Pendaftar PPDB", href: "/admin/ppdb", icon: Users },
  ];

  const handleLogout = () => {
    localStorage.removeItem("sma_admin_token");
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#032B21] text-slate-200 min-h-screen p-6 flex flex-col justify-between border-r border-emerald-900/60 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="pb-6 mb-6 border-b border-emerald-800/60">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
            <div>
              <h3 className="font-bold text-sm text-white font-heading">
                CMS ADMIN
              </h3>
              <p className="text-[10px] text-amber-400 font-semibold">
                SMA AL-FURQON
              </p>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[#064E3B] text-amber-300 shadow-md border border-amber-400/30"
                    : "text-slate-300 hover:bg-emerald-950/60 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="pt-6 border-t border-emerald-800/60 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-emerald-300 hover:text-white font-medium transition-colors px-2 py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Lihat Website Utama</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:bg-red-950/60 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Keluar Admin</span>
        </button>
      </div>
    </aside>
  );
};
