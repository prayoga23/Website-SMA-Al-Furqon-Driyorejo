"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { kesiswaanActivities as initialKesiswaanActivities } from "@/lib/kesiswaan-data";
import { Calendar, User, Tag, ArrowLeft, Check, Sparkles, MessageCircle } from "lucide-react";

export default function KesiswaanActivityDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { kesiswaanActivities } = useData();

  const activityList = kesiswaanActivities && kesiswaanActivities.length > 0 ? kesiswaanActivities : initialKesiswaanActivities;
  const activity = activityList.find((item) => item.slug === slug);

  if (!activity) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <h2 className="text-2xl font-bold font-heading mb-2 text-slate-900 dark:text-white">
            Program Kesiswaan Tidak Ditemukan
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Halaman kegiatan kesiswaan yang Anda cari tidak ditemukan.
          </p>
          <Link
            href="/kesiswaan"
            className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs shadow-md hover:bg-[#047857] transition-colors"
          >
            Kembali ke Kesiswaan
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
        title={activity.title}
        subtitle={`Kategori: ${activity.category} | Penulis: ${activity.author}`}
        breadcrumb={[{ name: "Kesiswaan", href: "/kesiswaan" }, { name: activity.title }]}
      />

      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/#kesiswaan-overview"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#047857] dark:text-emerald-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Kesiswaan</span>
        </Link>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-emerald-900/40 aspect-[16/9] relative bg-slate-900">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content Container */}
        <div className="bg-white dark:bg-[#0E241E] p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-emerald-900/40 text-xs text-slate-400">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                {activity.schedule}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                {activity.author}
              </span>
            </div>

            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${activity.categoryBadgeBg}`}>
              {activity.category}
            </span>
          </div>

          {/* Lead Paragraph */}
          <p className="font-semibold text-base sm:text-lg text-slate-900 dark:text-white leading-relaxed">
            {activity.tagline} — {activity.shortDesc}
          </p>

          {/* Main Article Body */}
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-line space-y-4">
            {activity.content}
          </div>

          {/* Program Highlights Checklist */}
          <div className="pt-6 border-t border-slate-100 dark:border-emerald-900/40">
            <h3 className="text-sm font-bold text-[#047857] dark:text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Program & Kegiatan Unggulan
            </h3>
            <div className="space-y-3">
              {activity.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-slate-50 dark:bg-emerald-950/50 p-4 rounded-2xl border border-slate-100 dark:border-emerald-900/30"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-[#047857] dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule & Target Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-50/70 dark:bg-emerald-950/60 p-4 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/40">
              <span className="text-[10px] font-bold text-[#047857] dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Waktu & Pelaksanaan
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {activity.schedule}
              </span>
            </div>
            <div className="bg-amber-50/70 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200/50 dark:border-amber-900/40">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Sasaran Peserta
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {activity.target}
              </span>
            </div>
          </div>

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-emerald-900/40 flex items-center gap-2 flex-wrap text-xs">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-bold text-slate-500">Tag Kegiatan:</span>
              {activity.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 dark:bg-emerald-950 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Contact / Information Banner */}
          <div className="mt-8 bg-gradient-to-r from-[#064E3B] to-[#0D9488] p-6 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base font-heading text-white">Ingin Mengetahui Lebih Lanjut?</h4>
              <p className="text-xs text-emerald-100 mt-1">Konsultasikan pendaftaran santri baru & informasi kegiatan kesiswaan SMA Al-Furqon.</p>
            </div>
            <a
              href="https://wa.me/6281615184579?text=Halo%20Admin%20SMA%20Al-Furqon,%20saya%20ingin%20tanya%20informasi%20kegiatan%20kesiswaan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Admin WA</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
