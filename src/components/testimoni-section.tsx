"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useData } from "@/context/data-context";

export const TestimoniSection: React.FC = () => {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimoni" className="py-20 bg-[#FDFBF7] dark:bg-[#081612] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#047857] dark:text-emerald-400 uppercase bg-emerald-100/70 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-300/40 inline-block">
            TESTIMONIAL & KESAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Cerita alumni dari Siswa SMA Al-Furqon Driyorejo
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Pengalaman nyata dari santri, alumni, dan orang tua wali murid
          </p>
        </div>

        {/* Testimonial Slider Box */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#0E241E] rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-emerald-900/40 shadow-xl relative">
          <Quote className="w-12 h-12 text-emerald-200 dark:text-emerald-900/60 absolute top-6 left-6 -z-0 pointer-events-none" />

          <div className="relative z-10 space-y-6 text-center">
            {/* Rating Stars */}
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-base sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic max-w-2xl mx-auto">
              &quot;{current.content}&quot;
            </blockquote>

            {/* Author Profile */}
            <div className="flex flex-col items-center">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#047857] mb-3 shadow"
              />
              <h4 className="font-bold text-base text-slate-900 dark:text-white font-heading">
                {current.name}
              </h4>
              <p className="text-xs font-semibold text-[#047857] dark:text-emerald-400">
                {current.role} {current.graduationYear ? `(${current.graduationYear})` : ""}
              </p>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-emerald-900/40">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:bg-[#064E3B] hover:text-white transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === idx ? "bg-[#064E3B] w-6" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:bg-[#064E3B] hover:text-white transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
