"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpenCheck,
  Award,
  Users,
  Compass,
} from "lucide-react";
import { useData } from "@/context/data-context";

export const HeroSection: React.FC = () => {
  const { schoolInfo } = useData();

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-8 pb-16">
      {/* Background Image with Cinematic Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{
          backgroundImage: "url('/bg-sma-al-furqon.webp')",
        }}
      >
        {/* Dark & Emerald Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032B21]/95 via-[#064E3B]/85 to-[#047857]/70 dark:from-[#021813]/98 dark:via-[#064E3B]/90 dark:to-[#082C23]/80"></div>

        {/* Pattern & Mesh Gradients */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight sm:leading-none">
              Membangun Generasi Unggul dengan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                Iman, Ilmu
              </span>{" "}
              & Akhlak
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-emerald-100/90 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Menjadi ruang tumbuh bagi generasi muda yang berkarakter, berprestasi, berwawasan luas, serta siap menghadapi tantangan masa depan dengan nilai-nilai Islam modern.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/ppdb"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-slate-900 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-200 group"
              >
                <span>Daftar PPDB Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
              </Link>


            </div>
          </div>

          {/* Floating Information Cards Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 sm:p-5 rounded-2xl text-white shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-base font-heading mb-0.5 sm:mb-1 text-white">
                Akreditasi {schoolInfo.accreditation}
              </h3>
              <p className="text-[10px] sm:text-xs text-emerald-100/80 leading-relaxed">
                Jaminan mutu pendidikan tinggi & terpercaya.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 sm:p-5 rounded-2xl text-white shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                <BookOpenCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-base font-heading mb-0.5 sm:mb-1 text-white">
                Pendidikan Islami
              </h3>
              <p className="text-[10px] sm:text-xs text-emerald-100/80 leading-relaxed">
                Metode UMMI Al-Qur'an & pembiasaan santri.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 sm:p-5 rounded-2xl text-white shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center text-teal-300 mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-base font-heading mb-0.5 sm:mb-1 text-white">
                Pengembangan Minat
              </h3>
              <p className="text-[10px] sm:text-xs text-emerald-100/80 leading-relaxed">
                10+ Ekstrakurikuler terpadu & kepemimpinan.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 sm:p-5 rounded-2xl text-white shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-2.5 sm:mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-base font-heading mb-0.5 sm:mb-1 text-white">
                Berorientasi Prestasi
              </h3>
              <p className="text-[10px] sm:text-xs text-emerald-100/80 leading-relaxed">
                100+ Trofi olimpiade & akses PTN unggulan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave / Curved Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#FDFBF7] dark:from-[#091512] to-transparent"></div>
    </section>
  );
};
