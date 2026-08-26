"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Edit3 } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { name: string; href?: string }[];
  adminHref?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumb = [], adminHref }) => {
  const pathname = usePathname();

  const getAdminLink = () => {
    if (adminHref) return adminHref;
    if (pathname.startsWith("/profil/fasilitas")) return "/admin/fasilitas";
    if (pathname.startsWith("/profil/guru-staf") || pathname.startsWith("/profil/struktur")) return "/admin/guru";
    if (pathname.startsWith("/profil")) return "/admin/settings";
    if (pathname.startsWith("/akademik/kalender") || pathname.startsWith("/agenda")) return "/admin/agenda";
    if (pathname.startsWith("/akademik")) return "/admin/settings";
    if (pathname.startsWith("/kesiswaan/ekstrakurikuler")) return "/admin/ekstrakurikuler";
    if (pathname.startsWith("/kesiswaan") || pathname.startsWith("/prestasi")) return "/admin/prestasi";
    if (pathname.startsWith("/berita")) return "/admin/berita";
    if (pathname.startsWith("/galeri")) return "/admin/galeri";
    if (pathname.startsWith("/ppdb")) return "/admin/ppdb";
    if (pathname.startsWith("/kontak")) return "/admin/settings";
    return null;
  };

  const targetAdminHref = getAdminLink();

  return (
    <div className="bg-gradient-to-r from-[#032B21] via-[#064E3B] to-[#047857] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow Ornaments */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-emerald-200 flex-wrap">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Beranda
            </Link>
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-amber-300 transition-colors">
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-amber-300 font-medium">{item.name}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Quick Admin Management Link */}
          {targetAdminHref && (
            <Link
              href={targetAdminHref}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow transition-all border border-amber-300/50 shrink-0 self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Kelola Data Halaman Ini</span>
            </Link>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
