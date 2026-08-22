"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, X, Send } from "lucide-react";
import { useData } from "@/context/data-context";

export const FloatingWidgets: React.FC = () => {
  const { schoolInfo } = useData();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      customMsg || "Halo Panitia PPDB SMA Al-Furqon Driyorejo, saya ingin menanyakan informasi pendaftaran."
    );
    window.open(`https://wa.me/${schoolInfo.whatsapp}?text=${text}`, "_blank");
    setWaOpen(false);
    setCustomMsg("");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* WhatsApp Quick Chat Popover */}
      {waOpen && (
        <div className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden animate-fade-in text-slate-800">
          <div className="bg-gradient-to-r from-[#064E3B] to-[#047857] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-amber-300 border border-amber-400/40">
                AF
              </div>
              <div>
                <h4 className="font-bold text-xs font-heading">Panitia PPDB Al-Furqon</h4>
                <p className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • Siap Membantu
                </p>
              </div>
            </div>
            <button
              onClick={() => setWaOpen(false)}
              className="text-emerald-100 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSendWA} className="p-4 space-y-3 bg-slate-50 dark:bg-[#081612]">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Assalamu'alaikum. Ada yang bisa kami bantu seputar pendaftaran santri baru atau informasi sekolah?
            </p>

            <textarea
              rows={3}
              placeholder="Tulis pesan pertanyaan Anda..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white"
            />

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pesan WhatsApp</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white dark:bg-[#0E241E] text-[#064E3B] dark:text-emerald-400 shadow-xl border border-slate-200 dark:border-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all hover:scale-105 active:scale-95"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Button */}
        <button
          onClick={() => setWaOpen(!waOpen)}
          className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 border border-emerald-400/40"
          title="Chat WhatsApp Admin"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="text-xs font-bold hidden sm:inline">Chat PPDB</span>
        </button>
      </div>
    </div>
  );
};
