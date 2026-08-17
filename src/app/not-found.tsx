"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Home, Compass, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center font-bold text-3xl font-heading mb-6 shadow-inner">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mb-3">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
          Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda SMA Al-Furqon.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center gap-2 shadow-md hover:bg-[#047857] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/ppdb"
            className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Informasi PPDB</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
