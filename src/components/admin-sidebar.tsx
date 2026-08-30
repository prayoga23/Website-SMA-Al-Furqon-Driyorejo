"use client";

import React, { useState } from "react";
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
  UserCheck,
  Heart,
  MessageSquareQuote,
  Menu,
  X,
} from "lucide-react";
import { useData } from "@/context/data-context";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { schoolInfo, currentUser, logoutUser } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menu = [
    { name: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Kelola Pengguna (Users)", href: "/admin/users", icon: UserCheck },
    { name: "Kelola Profil & Visi Misi", href: "/admin/settings", icon: Settings },
    { name: "Kelola Kehidupan Santri", href: "/admin/kesiswaan", icon: Heart },
    { name: "Kelola Kejuaraan & Medali", href: "/admin/prestasi", icon: Trophy },
    { name: "Kelola Testimonial & Kesan", href: "/admin/testimoni", icon: MessageSquareQuote },
    { name: "Kelola Ekstrakurikuler", href: "/admin/ekstrakurikuler", icon: Sparkles },
    { name: "Kelola Fasilitas Sekolah", href: "/admin/fasilitas", icon: Building2 },
    { name: "Kelola Berita & Informasi", href: "/admin/berita", icon: Newspaper },
    { name: "Kelola Agenda & Kalender", href: "/admin/agenda", icon: Calendar },
    { name: "Kelola Guru & Staf", href: "/admin/guru", icon: GraduationCap },
    { name: "Kelola Galeri Dokumentasi", href: "/admin/galeri", icon: ImageIcon },
    { name: "Kelola Pendaftar PPDB", href: "/admin/ppdb", icon: Users },
  ];

  const handleLogout = () => {
    logoutUser();
    router.push("/admin/login");
  };

  const SidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Brand Header */}
        <div className="pb-4 mb-4 border-b border-emerald-800/60 flex items-center justify-between">
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

          {/* Close button inside mobile menu */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Logged-in Profile Tag */}
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs overflow-hidden shrink-0">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              (currentUser?.name || "A").substring(0, 1)
            )}
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-xs text-white truncate">{currentUser?.name || "Super Admin"}</div>
            <div className="text-[10px] text-amber-300 font-semibold truncate">{currentUser?.role || "Administrator"}</div>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[#064E3B] text-amber-300 shadow-md border border-amber-400/30"
                    : "text-slate-300 hover:bg-emerald-950/60 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-emerald-800/60 space-y-2 mt-4">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 text-xs text-emerald-300 hover:text-white font-medium transition-colors px-2 py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Lihat Website Utama</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-300 hover:bg-red-950/60 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Sticky Mobile Topbar Header (visible on < lg) */}
      <div className="lg:hidden w-full bg-[#032B21] text-slate-200 px-4 py-3 border-b border-emerald-900/60 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div>
            <h3 className="font-bold text-xs text-white font-heading">
              CMS ADMIN
            </h3>
            <p className="text-[9px] text-amber-400 font-semibold">
              SMA AL-FURQON
            </p>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-emerald-950 text-amber-400 border border-emerald-800/60 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-[#032B21] text-slate-200 p-6 flex flex-col justify-between shadow-2xl border-r border-emerald-900/60 z-10 overflow-y-auto">
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar (visible on >= lg) */}
      <aside className="hidden lg:flex w-64 bg-[#032B21] text-slate-200 min-h-screen p-6 flex-col justify-between border-r border-emerald-900/60 shrink-0 sticky top-0 h-screen">
        {SidebarContent}
      </aside>
    </>
  );
};
