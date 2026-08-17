"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, User, ArrowRight, Tag, Search, Sparkles } from "lucide-react";
import { useData } from "@/context/data-context";
import { formatDate } from "@/lib/utils";

export const BeritaSection: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { news } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Berita", "Agenda", "Kegiatan", "Prestasi"];

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="berita-section" className="py-20 bg-[#FDFBF7] dark:bg-[#081612] transition-colors relative overflow-hidden">
      {/* Background Decor Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/bg-sma-al-furqon.webp')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300/40 inline-block mb-2">
              PUSAT INFORMASI & ARTIKEL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Berita & Agenda Terbaru
            </h2>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#064E3B] text-amber-300 shadow-md"
                  : "bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-900/40 border border-slate-200 dark:border-emerald-900/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.slice(0, 6).map((item, idx) => {
            const bgImages = ["/bg-al-furqon2.jpg", "/bg-al-furqon3.jpg", "/bg-al-furqon4.jpg"];
            const cardImg = bgImages[idx % bgImages.length];

            return (
              <article
                key={item.id}
                className="bg-white dark:bg-[#0E241E] rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Category Tag */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cardImg}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-[#064E3B] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase border border-amber-400/30 shadow">
                      {item.category}
                    </span>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {formatDate(item.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {item.author}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-2 group-hover:text-[#047857] dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/berita/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:text-[#064E3B] group/link"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ); 
          })}
        </div>

        {/* View All Button - Only on Homepage */}
        {isHomePage && (
          <div className="mt-12 text-center">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-emerald-950 hover:bg-[#064E3B] hover:text-white text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
            >
              <span>Lihat Semua Berita & Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
