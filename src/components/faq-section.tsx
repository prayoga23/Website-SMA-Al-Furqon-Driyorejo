"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useData } from "@/context/data-context";

export const FAQSection: React.FC = () => {
  const { faqs } = useData();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 bg-slate-50 dark:bg-[#071310] transition-colors relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300/40 inline-block">
            FAQ & JAWABAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Pertanyaan Sering Diajukan
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Temukan jawaban cepat seputar pendaftaran PPDB, program pengajaran, dan fasilitas sekolah.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-[#047857] dark:hover:text-emerald-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#047857] dark:text-emerald-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#047857]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-emerald-900/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
