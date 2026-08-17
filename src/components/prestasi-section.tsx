"use client";

import React, { useState } from "react";
import { Trophy, Award, Medal, Sparkles, Filter } from "lucide-react";
import { useData } from "@/context/data-context";

export const PrestasiSection: React.FC = () => {
  const { achievements } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", "Akademik", "Non-Akademik", "Keagamaan", "Olahraga", "Seni"];

  const filteredAchievements =
    selectedCategory === "Semua"
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  return (
    <section id="prestasi" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: "url('/bg-sma-al-furqon.webp')" }}
      ></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20 inline-block">
            REKAP KEJUARAAN & MEDALI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Prestasi yang Membanggakan
          </h2>
          <p className="text-sm text-slate-300">
            Dedikasi dan keunggulan santri SMA Al-Furqon Driyorejo dalam berbagai ajang kompetisi.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item, idx) => {
            const bgImages = ["/bg-al-furqon2.jpg", "/bg-al-furqon3.jpg", "/bg-al-furqon4.jpg"];
            const cardImg = bgImages[idx % bgImages.length];

            return (
              <div
                key={item.id}
                className="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-amber-400/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cardImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {item.rank}
                    </span>
                    <span className="bg-emerald-800 text-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-md shadow border border-emerald-600/50">
                      {item.level}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      {item.category} • {item.year}
                    </span>
                    <h3 className="text-base font-bold text-white font-heading mb-2 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mb-3">
                      Ajang: {item.event}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">Peraih: {item.studentName}</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
