"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { name: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumb = [] }) => {
  return (
    <div className="bg-gradient-to-r from-[#032B21] via-[#064E3B] to-[#047857] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow Ornaments */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-3">
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
