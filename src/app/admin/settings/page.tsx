"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Settings, Save, CheckCircle } from "lucide-react";
import { ImageUploadInput } from "@/components/image-upload-input";

export default function AdminSettingsPage() {
  const { schoolInfo, updateSchoolInfo } = useData();

  const [form, setForm] = useState({
    name: schoolInfo.name,
    tagline: schoolInfo.tagline,
    accreditation: schoolInfo.accreditation,
    npsn: schoolInfo.npsn,
    foundation: schoolInfo.foundation,
    address: schoolInfo.address,
    email: schoolInfo.email,
    whatsapp: schoolInfo.whatsapp,
    vision: schoolInfo.vision,
    headmasterName: schoolInfo.headmasterName,
    headmasterPhoto: schoolInfo.headmasterPhoto || "",
    headmasterWelcome: schoolInfo.headmasterWelcome,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto max-w-4xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Pengaturan Identitas & Profil Sekolah
            </h1>
            <p className="text-xs text-slate-500">Edit informasi kontak, visi, dan sambutan di website utama.</p>
          </div>
        </div>

        {saved && (
          <div className="bg-emerald-100 dark:bg-emerald-950 p-4 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 border border-emerald-300">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Perubahan berhasil disimpan! Tampilan di website publik telah diperbarui.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white dark:bg-[#0E241E] p-8 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Nama Sekolah *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Akreditasi *</label>
              <input
                type="text"
                required
                value={form.accreditation}
                onChange={(e) => setForm({ ...form, accreditation: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 font-bold text-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">NPSN *</label>
              <input
                type="text"
                required
                value={form.npsn}
                onChange={(e) => setForm({ ...form, npsn: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Nama Yayasan *</label>
              <input
                type="text"
                required
                value={form.foundation}
                onChange={(e) => setForm({ ...form, foundation: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Email Resmi *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">No. WhatsApp Admin *</label>
              <input
                type="text"
                required
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Nama Kepala Sekolah *</label>
            <input
              type="text"
              required
              value={form.headmasterName}
              onChange={(e) => setForm({ ...form, headmasterName: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 font-semibold"
            />
          </div>

          {/* Local Image Upload for Headmaster Photo */}
          <ImageUploadInput
            value={form.headmasterPhoto}
            onChange={(imgData) => setForm({ ...form, headmasterPhoto: imgData })}
            label="Upload Foto Profil Kepala Sekolah *"
          />

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Tagline Sekolah *</label>
            <input
              type="text"
              required
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Alamat Lengkap *</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Visi Utama Sekolah *</label>
            <textarea
              rows={2}
              required
              value={form.vision}
              onChange={(e) => setForm({ ...form, vision: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Sambutan Kepala Sekolah *</label>
            <textarea
              rows={3}
              required
              value={form.headmasterWelcome}
              onChange={(e) => setForm({ ...form, headmasterWelcome: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil Sekolah</span>
          </button>
        </form>
      </main>
    </div>
  );
}
