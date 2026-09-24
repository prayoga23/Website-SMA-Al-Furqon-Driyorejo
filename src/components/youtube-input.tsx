"use client";

import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { YoutubeIcon } from "@/components/youtube-icon";
import { getYouTubeVideoId } from "@/lib/utils";

interface YouTubeInputProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
}

export const YouTubeInput: React.FC<YouTubeInputProps> = ({
  value,
  onChange,
  label = "Link Video YouTube (Opsional)",
  placeholder = "Contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/...",
}) => {
  const videoId = getYouTubeVideoId(value);
  const isValid = Boolean(videoId);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
          <YoutubeIcon className="w-4 h-4 text-red-500" />
          <span>{label}</span>
        </label>
        {value.trim() && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] text-slate-400 hover:text-red-500 flex items-center gap-0.5"
          >
            <X className="w-3 h-3" />
            <span>Hapus Link</span>
          </button>
        )}
      </div>

      <div className="relative">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-2.5 pl-9 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs transition-colors ${
            value.trim()
              ? isValid
                ? "border-emerald-500 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
                : "border-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-400"
              : "border-slate-200 dark:border-emerald-900/50"
          }`}
        />
        <YoutubeIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
      </div>

      {/* Validation status & thumbnail preview */}
      {value.trim() && (
        <div>
          {isValid ? (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/40">
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="YouTube Preview"
                className="w-16 h-10 object-cover rounded-lg shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Video YouTube Terdeteksi</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  ID: <span className="font-mono">{videoId}</span> • Siap ditampilkan & diputar di artikel
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Format link belum sesuai. Masukkan link YouTube (youtube.com atau youtu.be).</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
