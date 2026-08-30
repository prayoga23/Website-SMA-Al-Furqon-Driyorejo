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
import { kesiswaanActivities } from "@/lib/kesiswaan-data";

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
  const { extracurriculars, kesiswaanActivities: dynamicActivities } = useData();
  const activitiesList = dynamicActivities && dynamicActivities.length > 0 ? dynamicActivities : kesiswaanActivities;

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
          {activitiesList.map((feature) => (
            <Link
              key={feature.id}
              href={`/kesiswaan/${feature.slug}`}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${feature.categoryBadgeBg}`}>
                  {feature.category}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-2 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {feature.shortDesc}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 group-hover:underline">
                  <span>{feature.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
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
                <Link
                  key={extra.id}
                  href="/kesiswaan/ekstrakurikuler"
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
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
