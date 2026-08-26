"use client";

import React from "react";
import { Sparkles, HeartHandshake, Zap, Users, Brain, BookOpen, ShieldCheck, CheckCircle2, GraduationCap } from "lucide-react";
import { useData } from "@/context/data-context";

export const VisiMisiSection: React.FC = () => {
  const { schoolInfo } = useData();

  const missionIcons = [
    HeartHandshake,
    Zap,
    Users,
    Brain,
    BookOpen,
    ShieldCheck,
  ];

  return (
    <section id="visi-misi" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20 inline-block">
            PANDUAN & HALUAN SEKOLAH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Visi & Misi Kami
          </h2>
          <p className="text-sm text-slate-300">
            Landasan filosofis SMA Al-Furqon Driyorejo dalam membimbing generasi penerus bangsa.
          </p>
        </div>

        {/* Grid: Left Vision Card, Right Mission List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Large Highlighted Vision Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#0D9488] p-8 sm:p-10 rounded-3xl border border-emerald-400/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-6 shadow-inner">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-2 block">
                VISI UTAMA SEKOLAH
              </span>
              <blockquote className="text-xl sm:text-2xl font-bold font-heading text-white leading-relaxed italic">
                &quot;{schoolInfo.vision}&quot;
              </blockquote>
            </div>

            <div className="pt-8 border-t border-emerald-400/20 mt-8">
              <div className="flex items-center gap-3 text-xs text-emerald-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Terakreditasi BAN-SM & Tersertifikasi Metode UMMI</span>
              </div>
            </div>
          </div>

          {/* Right: Numbered Mission Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {schoolInfo.missions.map((mission, idx) => {
              const Icon = missionIcons[idx % missionIcons.length];
              const numStr = (idx + 1).toString().padStart(2, "0");
              return (
                <div
                  key={idx}
                  className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/60 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-amber-300 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-extrabold font-heading text-slate-600 group-hover:text-amber-400 transition-colors">
                        {numStr}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {mission}
                    </p>
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
