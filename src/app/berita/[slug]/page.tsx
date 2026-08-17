"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { news } = useData();

  const article = news.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <h2 className="text-2xl font-bold font-heading mb-2">Artikel Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 mb-6">Artikel yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
          <Link href="/berita" className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs">
            Kembali ke Portal Berita
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title={article.title}
        subtitle={`Kategori: ${article.category} | Penulis: ${article.author}`}
        breadcrumb={[{ name: "Berita", href: "/berita" }, { name: article.title }]}
      />

      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Berita</span>
        </Link>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-emerald-900/40 aspect-[16/9]">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Content Container */}
        <div className="bg-white dark:bg-[#0E241E] p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-emerald-900/40 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                {article.author}
              </span>
            </div>

            <span className="bg-[#064E3B] text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
              {article.category}
            </span>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-200 space-y-4">
            <p className="font-semibold text-base text-slate-900 dark:text-white leading-relaxed">
              {article.excerpt}
            </p>
            <div className="whitespace-pre-line">{article.content}</div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-emerald-900/40 flex items-center gap-2 flex-wrap text-xs">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-bold text-slate-500">Tag Artikel:</span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 dark:bg-emerald-950 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
