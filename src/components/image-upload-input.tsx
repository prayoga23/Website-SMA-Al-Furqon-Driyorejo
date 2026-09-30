"use client";

import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadInputProps {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
  aspect?: "video" | "portrait" | "square";
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value,
  onChange,
  label = "Upload File Foto / Gambar",
  aspect = "video",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file gambar terlalu besar. Maksimal 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultStr = event.target?.result as string;
      if (!resultStr) return;

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.85);
            onChange(compressed);
            return;
          }
        } catch (e) {
          console.warn("Canvas compression fallback:", e);
        }
        onChange(resultStr);
      };
      img.onerror = () => {
        onChange(resultStr);
      };
      img.src = resultStr;
    };
    reader.readAsDataURL(file);
  };

  const containerClasses =
    aspect === "portrait"
      ? "relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/60 bg-slate-900 w-44 h-56 flex items-center justify-center mx-auto sm:mx-0 shadow-md"
      : aspect === "square"
      ? "relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/60 bg-slate-900 w-36 h-36 flex items-center justify-center mx-auto sm:mx-0 shadow-md"
      : "relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/60 bg-slate-900 aspect-video max-h-36 flex items-center justify-center shadow-md";

  return (
    <div className="space-y-1.5">
      {label && <label className="block font-bold text-xs text-slate-700 dark:text-slate-200">{label}</label>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {value ? (
        <div className={containerClasses}>
          <img
            src={value}
            alt="Preview"
            className={`w-full h-full ${aspect === "portrait" ? "object-cover object-[center_15%]" : "object-cover"}`}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow"
            >
              <Upload className="w-3.5 h-3.5" /> Ganti Gambar
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow"
              title="Hapus Gambar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-emerald-900/60 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-50 dark:bg-[#081612] transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Upload className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Klik untuk Upload Gambar dari Komputer
          </p>
          <p className="text-[10px] text-slate-400">Pilih file JPG, PNG, atau WEBP (Maksimal 10MB)</p>
        </div>
      )}
    </div>
  );
};
