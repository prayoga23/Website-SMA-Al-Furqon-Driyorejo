"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Calendar, X } from "lucide-react";
import { AgendaItem } from "@/lib/types";

export default function AdminAgendaPage() {
  const { agendas, addAgenda, deleteAgenda } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<AgendaItem["category"]>("Akademik");
  const [description, setDescription] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addAgenda({
      title,
      date: date || new Date().toISOString().split("T")[0],
      time: time || "08:00 - 12:00 WIB",
      location: location || "SMA Al-Furqon Driyorejo",
      category,
      description,
    });
    setModalOpen(false);
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Manajemen Agenda Sekolah
            </h1>
            <p className="text-xs text-slate-500">Kelola jadwal ujian, rapat, dan acara sekolah.</p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Agenda Baru</span>
          </button>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading">Tambah Agenda Baru</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Judul Agenda *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Tanggal *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Kategori *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    >
                      <option value="Akademik">Akademik</option>
                      <option value="Kesiswaan">Kesiswaan</option>
                      <option value="Keagamaan">Keagamaan</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Waktu Wajib *</label>
                    <input
                      type="text"
                      placeholder="07:30 - 12:00 WIB"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Lokasi *</label>
                    <input
                      type="text"
                      placeholder="Gedung Utama"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Keterangan Singkat *</label>
                  <textarea
                    rows={2}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                  >
                    Simpan Agenda
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">Judul Agenda</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Waktu</th>
                <th className="p-3">Lokasi</th>
                <th className="p-3">Kategori</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {agendas.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="p-3 text-slate-500">{item.date}</td>
                  <td className="p-3 text-slate-500">{item.time}</td>
                  <td className="p-3 text-slate-500">{item.location}</td>
                  <td className="p-3">
                    <span className="bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteAgenda(item.id)}
                      className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
