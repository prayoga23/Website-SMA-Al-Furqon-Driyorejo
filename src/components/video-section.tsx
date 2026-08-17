"use client";

import React, { useState } from "react";
import { Play, Film, Sparkles, X } from "lucide-react";

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Lihat Aktivitas Kami
          </h2>
          <p className="text-sm text-slate-300">
            Intip suasana belajar, laboratorium, fasilitas hijau, dan kebersamaan santri SMA Al-Furqon Driyorejo.
          </p>
        </div>

        {/* Large Video Card */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950 relative group">
          {!isPlaying ? (
            <div
              onClick={() => setIsPlaying(true)}
              className="relative aspect-video w-full overflow-hidden cursor-pointer"
            >
              <img
                src="https://img.youtube.com/vi/op6dxGdhYlM/maxresdefault.jpg"
                alt="Video Profil SMA Al-Furqon Driyorejo"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/op6dxGdhYlM/hqdefault.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Play Button Overlay Dead-Centered */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(true);
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white/40 cursor-pointer"
                aria-label="Play Video"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 text-slate-950" />
              </button>

              {/* Bottom Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-xs text-slate-200 pointer-events-none">
                <span className="font-bold flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  Video Profil SMA Al-Furqon Driyorejo
                </span>
                <span className="bg-black/60 px-3 py-1 rounded-full border border-white/20">
                  Klik Untuk Memutar Video
                </span>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video bg-black">
              <iframe
                title="Video Profil SMA Al-Furqon Driyorejo"
                src="https://www.youtube.com/embed/op6dxGdhYlM?autoplay=1"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 text-white hover:bg-amber-400 hover:text-black transition-colors"
                aria-label="Tutup Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
