"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, PhoneCall } from "lucide-react";
import { useData } from "@/context/data-context";

export const CTABanner: React.FC = () => {
  const { schoolInfo } = useData();

  return (
    <section className="py-20 bg-gradient-to-r from-[#032B21] via-[#064E3B] to-[#047857] text-white relative overflow-hidden border-t border-emerald-800/40">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MASA DEPAN EMAS SANTRI & PELAJAR</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
          Masa Depan Dimulai dari Pendidikan yang Tepat.
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
          Temukan lingkungan belajar yang mendukung perkembangan akademik, karakter Islami, dan potensi kepemimpinan siswa.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/ppdb"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Daftar PPDB 2026/2027</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${schoolInfo.whatsapp}?text=Halo%20Admin%20SMA%20Al-Furqon,%20saya%20ingin%20konsultasi%20pendidikan`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            <span>Hubungi Panitia PPDB</span>
          </a>
        </div>
      </div>
    </section>
  );
};
