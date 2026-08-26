"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  Share2,
} from "lucide-react";
import { useData } from "@/context/data-context";

// Custom Social Media SVG Icons to ensure compatibility
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const Footer: React.FC = () => {
  const { schoolInfo } = useData();

  return (
    <footer className="bg-[#032B21] text-slate-200 pt-16 pb-8 border-t border-emerald-900/60 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-800/50">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/logo.png"
                alt="SMA Al-Furqon Driyorejo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-extrabold text-lg text-white font-heading tracking-wide">
                  SMA AL-FURQON
                </h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wider">
                  DRIYOREJO - GRESIK
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;{schoolInfo.tagline}&quot;
            </p>

            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-emerald-900/80 text-emerald-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-emerald-700/50">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Akreditasi {schoolInfo.accreditation}
              </span>
              <span className="inline-flex items-center gap-1 bg-emerald-900/80 text-emerald-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-emerald-700/50">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                NPSN: {schoolInfo.npsn}
              </span>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-xs text-slate-400 font-semibold mb-2">Ikuti Media Sosial Kami:</p>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/smaalfurqondriyorejo"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-emerald-900/70 hover:bg-emerald-700 text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-700/40"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@smaalfurqondriyorejo"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-emerald-900/70 hover:bg-emerald-700 text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-700/40"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/people/AL-Furqon-Driyorejo/100009720307213/?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-emerald-900/70 hover:bg-emerald-700 text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-700/40"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-bold text-sm text-white font-heading uppercase tracking-wider mb-4 pb-2 border-b border-emerald-800/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: "Beranda Utama", href: "/" },
                { name: "Profil Sekolah & Sejarah", href: "/profil" },
                { name: "Fasilitas & Keunggulan Brosur", href: "/profil/fasilitas" },
                { name: "Visi & Misi Unggulan", href: "/profil/visi-misi" },
                { name: "Kurikulum & Akademik", href: "/akademik/kurikulum" },
                { name: "Kesiswaan & Ekstrakurikuler", href: "/kesiswaan/ekstrakurikuler" },
                { name: "Direktori Guru & Staf", href: "/profil/guru-staf" },
                { name: "Galeri & Dokumentasi", href: "/galeri" },
                { name: "Prestasi Santri", href: "/prestasi" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information & PPDB */}
          <div>
            <h4 className="font-bold text-sm text-white font-heading uppercase tracking-wider mb-4 pb-2 border-b border-emerald-800/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Informasi PPDB & Layanan
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: "Penerimaan Siswa Baru (PPDB 2026)", href: "/ppdb" },
                { name: "Formulir Pendaftaran Online", href: "/ppdb#form" },
                { name: "Jadwal & Gelombang Seleksi", href: "/ppdb#jadwal" },
                { name: "Kalender Akademik 2026/2027", href: "/akademik/kalender" },
                { name: "Berita & Pengumuman Terbaru", href: "/berita" },
                { name: "Agenda Kegiatan Sekolah", href: "/agenda" },
                { name: "Hubungi Sekretariat PPDB", href: "/kontak" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Google Maps */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white font-heading uppercase tracking-wider pb-2 border-b border-emerald-800/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Kontak & Lokasi
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {schoolInfo.address}, {schoolInfo.subdistrict}, {schoolInfo.district}, Jawa Timur {schoolInfo.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="hover:text-amber-300">
                  {schoolInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {schoolInfo.whatsapp}
                </span>
              </div>
            </div>

            {/* Google Maps Embed Preview */}
            <div className="mt-3 rounded-xl overflow-hidden border border-emerald-700/50 shadow-md h-32 relative group">
              <iframe
                title="Peta Lokasi SMA Al-Furqon Driyorejo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.240639472069!2d112.60599097556158!3d-7.3268466926814435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78071e6b4eae0d%3A0x12b05265ba55d179!2sSMA%20AL-FURQON%20DRIYOREJO!5e0!3m2!1sid!2ssg!4v1786554697604!5m2!1sid!2ssg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full opacity-100 transition-all duration-300"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/smaalfurqondriyorejo"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-2 right-2 bg-emerald-950/90 text-amber-300 text-[10px] px-2 py-1 rounded flex items-center gap-1 border border-emerald-700/60 hover:bg-emerald-900"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 {schoolInfo.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/profil" className="hover:text-slate-200 transition-colors">
              Profil Sekolah
            </Link>
            <Link href="/ppdb" className="hover:text-slate-200 transition-colors">
              PPDB Online
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
