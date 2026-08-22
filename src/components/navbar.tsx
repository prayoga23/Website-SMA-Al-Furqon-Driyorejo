"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  UserRoundPlus,
} from "lucide-react";
import { useData } from "@/context/data-context";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { schoolInfo } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navLinks = [
    { name: "Beranda", href: "/" },
    {
      name: "Profil",
      href: "/profil",
      dropdown: [
        { name: "Tentang Sekolah", href: "/profil" },
        { name: "Fasilitas & Keunggulan", href: "/profil/fasilitas" },
        { name: "Sejarah", href: "/profil/sejarah" },
        { name: "Visi & Misi", href: "/profil/visi-misi" },
        { name: "Struktur Organisasi", href: "/profil/struktur" },
        { name: "Guru & Staf", href: "/profil/guru-staf" },
      ],
    },
    {
      name: "Akademik",
      href: "/akademik",
      dropdown: [
        { name: "Struktur Kurikulum", href: "/akademik/kurikulum" },
        { name: "Program Pembelajaran", href: "/akademik" },
        { name: "Kalender Akademik", href: "/akademik/kalender" },
      ],
    },
    {
      name: "Kesiswaan",
      href: "/kesiswaan",
      dropdown: [
        { name: "Kehidupan Santri", href: "/kesiswaan" },
        { name: "Ekstrakurikuler", href: "/kesiswaan/ekstrakurikuler" },
        { name: "Prestasi Siswa", href: "/prestasi" },
      ],
    },
    { name: "Prestasi", href: "/prestasi" },
    { name: "Berita", href: "/berita" },
    { name: "Agenda", href: "/agenda" },
    { name: "PPDB", href: "/ppdb" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <>
      {/* Top Banner Contact Strip (Clean White) */}
      <div className="bg-white text-slate-700 text-xs py-2 border-b border-slate-200">
        <div className="max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Desktop & Tablet Layout (sm and up) */}
          <div className="hidden sm:flex justify-between items-center gap-4">
            <div className="flex items-center gap-3.5 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium shrink-0 text-slate-700">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                NPSN: {schoolInfo.npsn} | Akreditasi: {schoolInfo.accreditation}
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="hidden md:inline truncate max-w-md text-slate-500">{schoolInfo.address}</span>
            </div>

            <div className="flex items-center gap-4 shrink-2">
              <a
                href={`https://wa.me/${schoolInfo.whatsapp}?text=Halo%20Admin%20SMA%20Al-Furqon,%20saya%20ingin%20bertanya%20informasi%20PPDB`}
                target="_blank"
                rel="noreferrer"
                className="text-[#064E3B] hover:text-emerald-700 transition-colors flex items-center gap-1.5 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>WA Admin: +{schoolInfo.whatsapp}</span>
              </a>
            </div>
          </div>

          {/* Mobile Phone Layout (< sm) */}
          <div className="flex sm:hidden justify-between items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 truncate">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="truncate">NPSN: {schoolInfo.npsn} | Akreditasi: {schoolInfo.accreditation}</span>
            </span>
            <a
              href={`https://wa.me/${schoolInfo.whatsapp}?text=Halo%20Admin%20SMA%20Al-Furqon,%20saya%20ingin%20bertanya%20informasi%20PPDB`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-bold shrink-0 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-[#064E3B] hover:bg-emerald-100 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-600" />
              <span>WA Admin</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar (Clean White) */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 border-b border-slate-200 ${
          isScrolled ? "shadow-md py-2.5" : "py-3.5"
        }`}
      >
        <div className="max-w-[92rem] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0 mr-4 lg:mr-6 xl:mr-10">
            <img
              src="/logo.png"
              alt="SMA Al-Furqon Driyorejo"
              className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#064E3B] font-heading">
                  SMA AL-FURQON
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300">
                  DRIYOREJO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Pondok Pesantren Al - Furqon Driyorejo Gresik
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative group">
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        isActive
                          ? "text-[#047857] bg-emerald-50"
                          : "text-slate-700 hover:text-[#047857] hover:bg-slate-100"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#047857] rounded-lg transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? "text-[#047857] bg-emerald-50 font-bold"
                      : "text-slate-700 hover:text-[#047857] hover:bg-slate-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-1 shrink-0">
            {/* PPDB Button */}
            <Link
              href="/ppdb"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0D9488] hover:from-[#047857] hover:to-[#059669] shadow-md active:scale-95 transition-all duration-200 group overflow-hidden border border-emerald-400/20"
            >
              <UserRoundPlus className="w-4 h-4 text-amber-300" />
              <span>PPDB 2026/2027</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Pure White) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer Box (Pure White) */}
          <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 overflow-y-auto p-6 flex flex-col justify-between border-l border-slate-200">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
                  <div>
                    <h3 className="font-bold text-sm text-[#064E3B]">
                      SMA AL-FURQON
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">Driyorejo, Gresik</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  if (link.dropdown) {
                    const isOpen = activeDropdown === link.name;
                    return (
                      <div key={link.name} className="py-1">
                        <button
                          onClick={() => toggleDropdown(link.name)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100 hover:text-[#047857]"
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isOpen ? "rotate-180 text-[#047857]" : "text-slate-400"
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-emerald-500 my-1 ml-3 bg-slate-50 rounded-r-lg">
                            {link.dropdown.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#047857] hover:bg-emerald-50 rounded-md"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100 hover:text-[#047857]"
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/ppdb"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl text-center font-bold text-sm text-white bg-[#064E3B] hover:bg-[#047857] shadow-md block"
              >
                Daftar PPDB 2026/2027
              </Link>
              <div className="text-center text-xs text-slate-400">
                SMA Al-Furqon Driyorejo &copy; 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

