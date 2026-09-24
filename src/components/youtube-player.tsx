"use client";

import React, { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { YoutubeIcon } from "@/components/youtube-icon";
import { getYouTubeEmbedUrl, getYouTubeVideoId } from "@/lib/utils";

interface YouTubePlayerProps {
  url?: string;
  title?: string;
  className?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  url,
  title = "Video Dokumentasi YouTube",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(url);
  const videoId = getYouTubeVideoId(url);

  if (!url || !embedUrl || !videoId) {
    return null;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const autoplayEmbedUrl = `${embedUrl}&autoplay=1`;

  return (
    <div className={`space-y-3 my-6 ${className}`}>
      {/* Label Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
          <span className="p-1 rounded-md bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center">
            <YoutubeIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
          </span>
          <span className="uppercase tracking-wider">Video Liputan & Dokumentasi</span>
        </div>

        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-red-600 transition-colors"
        >
          <span>Buka di YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Responsive Video Container */}
      <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-emerald-900/40 bg-slate-950 group">
        {isPlaying ? (
          <iframe
            src={autoplayEmbedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer relative overflow-hidden flex items-center justify-center"
          >
            {/* Thumbnail Poster */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              onError={(e) => {
                // fallback to maxresdefault or hqdefault
                (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />

            {/* Dark overlay with hover effect */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

            {/* Pulsing Play Button */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <button
                type="button"
                aria-label="Putar Video YouTube"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 group-hover:shadow-red-600/50"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
              </button>
              <span className="text-white text-xs sm:text-sm font-bold drop-shadow-md bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                Klik untuk Memutar Video
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
