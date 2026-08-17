"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Maximize2, X, ArrowRight, Calendar, Tag, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useData } from "@/context/data-context";
import { GalleryItem } from "@/lib/types";

export const GaleriSection: React.FC = () => {
  const { gallery } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const categories = [
    "Semua",
    "Kegiatan",
    "Pembelajaran",
    "Prestasi",
    "Ekstrakurikuler",
    "Lingkungan Sekolah",
    "Keagamaan",
  ];

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(3);
  };

  const filteredGallery =
    selectedCategory === "Semua"
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  const displayedGallery = filteredGallery.slice(0, visibleCount);

  return (
    <section id="galeri-section" className="py-20 bg-[#FDFBF7] dark:bg-[#081612] transition-colors relative overflow-hidden">
      {/* Background Decor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/bg-sma-al-furqon.webp')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300/40 inline-block">
            DOKUMENTASI VISUAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Galeri Kegiatan Sekolah
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Rekaman momen berkesan santri dan warga SMA Al-Furqon Driyorejo
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#064E3B] text-amber-300 shadow-md scale-105"
                  : "bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-emerald-900/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid Layout (3 items per row on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGallery.map((item, idx) => {
            const bgImages = ["/bg-al-furqon2.jpg", "/bg-al-furqon3.jpg", "/bg-al-furqon4.jpg"];
            const cardImg = bgImages[idx % bgImages.length];

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="bg-white dark:bg-[#0E241E] rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative animate-fade-in"
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={cardImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-[#064E3B] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase border border-amber-400/30">
                    {item.category}
                  </span>

                  {/* Zoom Icon Button */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Title & Description Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-sm font-bold font-heading line-clamp-1 mb-1 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons: Show 3 More Items / Show Less / Link */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          {visibleCount < filteredGallery.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#064E3B] hover:bg-[#043E2F] text-amber-300 hover:text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Lihat Semua Galeri ({filteredGallery.length - visibleCount} tersisa)</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          ) : filteredGallery.length > 3 ? (
            <button
              onClick={() => setVisibleCount(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-emerald-950/80 hover:bg-slate-300 dark:hover:bg-emerald-900 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <span>Tampilkan Lebih Sedikit (Kembali ke 3 Foto)</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          ) : null}

        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-white dark:bg-[#0E241E] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-amber-400 hover:text-slate-950 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#064E3B] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {activeModalItem.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeModalItem.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                {activeModalItem.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeModalItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
