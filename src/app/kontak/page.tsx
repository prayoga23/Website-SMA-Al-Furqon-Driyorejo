"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { useData } from "@/context/data-context";
import { MapPin, Phone, Mail, Send, CheckCircle, Clock } from "lucide-react";

export default function KontakPage() {
  const { schoolInfo } = useData();
  const [sent, setSent] = useState(false);
  const [msgData, setMsgData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setMsgData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="Hubungi Kami"
        subtitle="Sekretariat SMA Al-Furqon Driyorejo, Gresik."
        breadcrumb={[{ name: "Kontak" }]}
      />

      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0E241E] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Sekretariat & Alamat
            </h2>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Alamat Sekolah:</h4>
                  <p>{schoolInfo.address}, {schoolInfo.subdistrict}, {schoolInfo.district}, Jawa Timur {schoolInfo.postalCode}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Email Resmi:</h4>
                  <p>{schoolInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Telepon / WhatsApp:</h4>
                  <p>{schoolInfo.phone} / +{schoolInfo.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#064E3B] dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Jam Layanan Kantor:</h4>
                  <p>Senin - Sabtu: 07.00 - 15.30 WIB</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 h-48">
              <iframe
                title="Map Lokasi SMA Al-Furqon Driyorejo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.240639472069!2d112.60599097556158!3d-7.3268466926814435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78071e6b4eae0d%3A0x12b05265ba55d179!2sSMA%20AL-FURQON%20DRIYOREJO!5e0!3m2!1sid!2ssg!4v1786554697604!5m2!1sid!2ssg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>

          {/* Online Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0E241E] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
              Kirim Pesan Pertanyaan
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Tim sekretariat kami akan merespons pesan Anda sesegera mungkin.
            </p>

            {sent ? (
              <div className="bg-emerald-50 dark:bg-emerald-950 p-6 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-100">
                  Pesan Terkirim!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Terima kasih telah menghubungi SMA Al-Furqon Driyorejo.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={msgData.name}
                      onChange={(e) => setMsgData({ ...msgData, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Alamat email"
                      value={msgData.email}
                      onChange={(e) => setMsgData({ ...msgData, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Subjek / Topik *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pertanyaan Syarat PPDB"
                    value={msgData.subject}
                    onChange={(e) => setMsgData({ ...msgData, subject: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Isi Pesan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan Anda secara detail..."
                    value={msgData.message}
                    onChange={(e) => setMsgData({ ...msgData, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
