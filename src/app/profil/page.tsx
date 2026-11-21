"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { AboutSection } from "@/components/about-section";
import { useData } from "@/context/data-context";
import { ShieldCheck, GraduationCap, History, Target, Users, Building2, CheckCircle2, Award } from "lucide-react";

export default function ProfilPage() {
  const { schoolInfo } = useData();

  const ptnList = [
    "ITS (Institut Teknologi Sepuluh Nopember)",
    "UNAIR (Universitas Airlangga)",
    "UNESA (Universitas Negeri Surabaya)",
    "UINSA (UIN Sunan Ampel)",
    "UB (Universitas Brawijaya Malang)",
    "UIN Malang",
    "UPN 'Veteran' Jawa Timur",
    "UM (Universitas Negeri Malang)",
    "Universitas Trunojoyo Madura",
    "IAIN Bangka Belitung",
    "IAIN Kediri",
  ];

  const partnerships = [
    "PT. Petrokimia Gresik (PKP)",
    "PT. PJB (Pembangkitan Jawa Bali)",
    "DIGINESIA",
    "SIG (Semen Indonesia Group)",
    "Politeknik Semen Indonesia",
    "Ummi Foundation",
    "UNUSA (Universitas Nahdlatul Ulama Surabaya)",
    "UINSA Surabaya",
    "Edu Science Club",
    "Pijar Sekolah",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Profil SMA Al-Furqon Driyorejo"
        subtitle="Mengenal lebih dekat identitas, Selayang Pandang, pimpinan, sejarah, serta komitmen pendidikan Islam unggulan."
        breadcrumb={[{ name: "Profil Sekolah" }]}
      />

      <main className="flex-1 space-y-16 py-12">
        {/* Main About Section featuring Selayang Pandang */}
        <AboutSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Lulusan Tersebar di Berbagai PTN Grid */}
          <div className="bg-gradient-to-r from-[#032B21] via-[#064E3B] to-[#047857] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Prestasi Alumni
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Lulusan Tersebar di Berbagai PTN Favorit
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Santri & alumni SMA Al-Furqon Driyorejo secara konsisten diterima di Perguruan Tinggi Negeri ternama di Indonesia melalui jalur SNBP, SNBT, maupun Beasiswa Vokasi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ptnList.map((ptn, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-3 hover:bg-white/20 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">{ptn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* School Partnership Grid */}
          <div className="bg-white dark:bg-[#0E241E] rounded-3xl p-8 border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 dark:border-emerald-900/40 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                  KEMITRAAN & KOLABORASI
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                  School Partnership & Industri Partner
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                10+ Partner Industri & Kampus
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {partnerships.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-100 dark:border-emerald-900/30 text-center font-bold text-xs text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center gap-2 hover:border-emerald-400 transition-colors"
                >
                  <Building2 className="w-5 h-5 text-[#047857] dark:text-emerald-400" />
                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </div>

          {/* School Identity Table */}
          <div className="bg-white dark:bg-[#0E241E] rounded-3xl p-8 border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-emerald-900/40">
              Identitas Resmi Sekolah
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-slate-500">Nama Sekolah:</span>
                <span className="font-bold text-slate-900 dark:text-white">{schoolInfo.name}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-slate-500">NPSN:</span>
                <span className="font-bold text-slate-900 dark:text-white">{schoolInfo.npsn}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-slate-500">Akreditasi:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{schoolInfo.accreditation}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-slate-500">Penyelenggara:</span>
                <span className="font-bold text-slate-900 dark:text-white">{schoolInfo.foundation}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-slate-500">Kepala Sekolah:</span>
                <span className="font-bold text-slate-900 dark:text-white">{schoolInfo.headmasterName}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-slate-500">Alamat Lengkap:</span>
                <span className="font-bold text-slate-900 dark:text-white">{schoolInfo.address}, {schoolInfo.subdistrict}, {schoolInfo.district}</span>
              </div>
            </div>
          </div>

          {/* Subpages Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Fasilitas & Keunggulan",
                desc: "Ruang kelas modern, lab canggih, lab IT digital, area olahraga.",
                href: "/profil/fasilitas",
                icon: Building2,
              },
              {
                title: "Sejarah Sekolah",
                desc: "Perjalanan dedikasi SMA Al-Furqon sejak berdiri tahun 1995.",
                href: "/profil/sejarah",
                icon: History,
              },
              {
                title: "Visi & Misi",
                desc: "Nilai luhur dan 6 poin misi pembentukan karakter siswa.",
                href: "/profil/visi-misi",
                icon: Target,
              },
              {
                title: "Struktur Organisasi",
                desc: "Bagan susunan pimpinan yayasan dan pengelola sekolah.",
                href: "/profil/struktur",
                icon: Users,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="bg-white dark:bg-[#0E241E] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-[#064E3B] group-hover:text-amber-300 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base font-heading text-slate-900 dark:text-white mb-2 group-hover:text-[#047857]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
