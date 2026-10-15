"use client";

import React, { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("Ukuran file gambar terlalu besar. Maksimal 15MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultStr = event.target?.result as string;
      if (!resultStr) {
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Responsive max dimension based on aspect ratio
          const maxDim = aspect === "portrait" || aspect === "square" ? 600 : 800;

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

            // Progressive compression to ensure payload is always under ~250KB for reliable network sync
            let quality = 0.82;
            let compressed = canvas.toDataURL("image/jpeg", quality);

            while (compressed.length > 250 * 1024 && quality > 0.45) {
              quality -= 0.1;
              compressed = canvas.toDataURL("image/jpeg", quality);
            }

            onChange(compressed);
            setIsProcessing(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
          }
        } catch (err) {
          console.warn("Canvas compression failed:", err);
        }

        // Fallback if canvas is unavailable: only allow if raw data is reasonably small (<300KB)
        if (resultStr.length <= 300 * 1024) {
          onChange(resultStr);
        } else {
          alert("Gambar terlalu besar untuk diproses browser. Silakan gunakan format file JPG atau PNG lain.");
        }
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };

      img.onerror = () => {
        alert("Gagal memuat file gambar. Format mungkin tidak didukung.");
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };

      img.src = resultStr;
    };

    reader.onerror = () => {
      alert("Gagal membaca file gambar.");
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

      {isProcessing ? (
        <div className="border-2 border-dashed border-emerald-500 rounded-2xl p-6 text-center bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600 dark:text-emerald-400" />
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            Mengompresi & Memproses Foto...
          </p>
          <p className="text-[10px] text-slate-400">Menyesuaikan ukuran gambar untuk performa optimal</p>
        </div>
      ) : value ? (
        <div className="space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`${containerClasses} cursor-pointer`}
            title="Ketuk untuk ganti foto"
          >
            <img
              src={value}
              alt="Preview"
              className={`w-full h-full ${aspect === "portrait" ? "object-cover object-[center_15%]" : "object-cover"}`}
            />
            {/* Desktop hover overlay */}
            <div className="hidden sm:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow"
              >
                <Upload className="w-3.5 h-3.5" /> Ganti Gambar
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow"
                title="Hapus Gambar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile direct touch controls (visible on touch screens) */}
          <div className="flex sm:hidden items-center gap-2 w-full">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 active:bg-emerald-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Ganti Foto / Kamera</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="py-2 px-3 rounded-xl bg-red-100 dark:bg-red-950/70 border border-red-300 dark:border-red-900/60 text-red-600 dark:text-red-300 font-bold text-xs flex items-center justify-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-emerald-900/60 hover:border-emerald-500 active:bg-slate-100 dark:active:bg-[#07130f] rounded-2xl p-4 text-center cursor-pointer bg-slate-50 dark:bg-[#081612] transition-all group active:scale-[0.99]"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform shadow-xs">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Ketuk untuk Upload Foto / Gambar
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Pilih dari Galeri atau Kamera HP (JPG, PNG, WEBP maks 15MB)
          </p>
        </div>
      )}
    </div>
  );
};
