"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Sparkles,
  Heart,
  Shield,
  ArrowRight,
  Check,
  Palette,
  ChefHat,
  Scissors,
  Shirt,
  Trophy,
  Music,
  ShieldCheck,
} from "lucide-react";
import { useData } from "@/context/data-context";

export const getExtraIcon = (iconName?: string, name?: string) => {
  const key = (iconName || name || "").toLowerCase();
  if (key.includes("palette") || key.includes("desain")) return Palette;
  if (key.includes("chef") || key.includes("boga")) return ChefHat;
  if (key.includes("scissors") || key.includes("craft")) return Scissors;
  if (key.includes("shirt") || key.includes("menjahit") || key.includes("jahit")) return Shirt;
  if (key.includes("trophy") || key.includes("futsal") || key.includes("bola")) return Trophy;
  if (key.includes("music") || key.includes("banjari") || key.includes("hadrah")) return Music;
  if (key.includes("shield") || key.includes("silat") || key.includes("pencak")) return ShieldCheck;
  return Sparkles;
};

export const KesiswaanSection: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { extracurriculars } = useData();

  return (
    <section id="kesiswaan-overview" className="py-20 bg-[#FDFBF7] dark:bg-[#081612] transition-colors relative overflow-hidden">
      {/* Background Decor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/bg-sma-al-furqon.webp')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300/40 inline-block">
            KEHIDUPAN SANTRI & SISWA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Tumbuh Berkarakter & Berdaya Saing
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Pengalaman Belajar Editorial Modern dengan Keseimbangan Spiritual & Kepemimpinan Pemuda
          </p>
        </div>

        {/* Editorial Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Editorial Card 1 */}
          <div className="group rounded-3xl overflow-hidden bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="h-56 relative overflow-hidden">
              <img
                src="/bg-al-furqon2.jpg"
                alt="Organisasi Siswa OSIS & Pramuka"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                Kepemimpinan
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">
                Organisasi OSIS & Pramuka Ambalan
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Melatih kemandirian, manajerial kegiatan, kepekaan sosial, serta kepemimpinan kepramukaan berbasis karakter Islami.
              </p>
              <Link
                href="/kesiswaan"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline"
              >
                <span>Lihat Kegiatan OSIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Editorial Card 2 */}
          <div className="group rounded-3xl overflow-hidden bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="h-56 relative overflow-hidden">
              <img
                src="/bg-al-furqon3.jpg"
                alt="Kegiatan Keagamaan & Tahfidz"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 bg-[#064E3B] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase border border-amber-400/30">
                Spiritual
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">
                Pembiasaan Keagamaan & Tahfidz UMMI
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Shalat dhuha berjamaah, tahajud, munaqosyah Al-Qur'an harian, hingga kajian rutin penanaman akhlak mulia.
              </p>
              <Link
                href="/kesiswaan"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline"
              >
                <span>Program Tahfidz Santri</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Editorial Card 3 */}
          <div className="group rounded-3xl overflow-hidden bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="h-56 relative overflow-hidden">
              <img
                src="/bg-al-furqon4.jpg"
                alt="Gerakan Adiwiyata Peduli Lingkungan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 bg-teal-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                Adiwiyata
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2">
                Gerakan Sekolah Hijau & Zero Waste
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Keterlibatan aktif siswa dalam pengelolaan komposting, hidroponik, eco-brick, dan pelestarian lingkungan hidup.
              </p>
              <Link
                href="/kesiswaan"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline"
              >
                <span>Aksi Adiwiyata</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Extracurricular Clubs Strip */}
        <div className="bg-gradient-to-r from-[#064E3B] to-[#0D9488] rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
                EKSPLORASI BAKAT & MINAT
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                Pilihan Ekstrakurikuler Terpadu
              </h3>
            </div>
            {isHomePage && (
              <Link
                href="/kesiswaan/ekstrakurikuler"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0"
              >
                Lihat Seluruh Ekstrakurikuler
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {extracurriculars.map((extra) => {
              const IconComp = getExtraIcon(extra.icon, extra.name);
              const imgIcon = extra.iconImage || (extra.name.toLowerCase().includes("silat") ? "/pencak-silat2 (1).png" : undefined);
              return (
                <div
                  key={extra.id}
                  className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-center flex flex-col items-center justify-between group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 mb-2 flex items-center justify-center font-bold text-xs shadow-inner group-hover:scale-110 transition-transform overflow-hidden p-1.5">
                    {imgIcon ? (
                      <img src={imgIcon} alt={extra.name} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <IconComp className="w-5 h-5 text-amber-300" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{extra.name}</h4>
                    <span className="text-[9px] text-emerald-200 mt-1 block">{extra.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
