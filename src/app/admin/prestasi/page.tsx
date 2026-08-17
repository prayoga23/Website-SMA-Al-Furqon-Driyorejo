"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Trophy, X } from "lucide-react";
import { AchievementItem } from "@/lib/types";

export default function AdminPrestasiPage() {
  const { achievements, addAchievement, deleteAchievement } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [studentName, setStudentName] = useState("");
  const [level, setLevel] = useState<AchievementItem["level"]>("Kabupaten");
  const [rank, setRank] = useState<AchievementItem["rank"]>("Juara 1");
  const [category, setCategory] = useState<AchievementItem["category"]>("Akademik");
  const [year, setYear] = useState("2026");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addAchievement({
      title,
      event,
      studentName,
      level,
      rank,
      category,
      year,
      description: desc,
      image: image || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    });
    setModalOpen(false);
    setTitle("");
    setEvent("");
    setStudentName("");
    setDesc("");
    setImage("");
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Manajemen Prestasi Santri
            </h1>
            <p className="text-xs text-slate-500">Kelola kejuaraan dan capaian trofi santri.</p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Prestasi Baru</span>
          </button>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading">Tambah Kejuaraan Prestasi</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Judul Kejuaraan *</label>
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
                    <label className="block font-bold mb-1">Ajang / Nama Event *</label>
                    <input
                      type="text"
                      required
                      value={event}
                      onChange={(e) => setEvent(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Nama Siswa Peraih *</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Tingkat *</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    >
                      <option value="Kabupaten">Kabupaten</option>
                      <option value="Provinsi">Provinsi</option>
                      <option value="Nasional">Nasional</option>
                      <option value="Internasional">Internasional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Capaian Juara *</label>
                    <select
                      value={rank}
                      onChange={(e) => setRank(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    >
                      <option value="Juara 1">Juara 1</option>
                      <option value="Juara 2">Juara 2</option>
                      <option value="Juara 3">Juara 3</option>
                      <option value="Medali Emas">Medali Emas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Kategori *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    >
                      <option value="Akademik">Akademik</option>
                      <option value="Non-Akademik">Non-Akademik</option>
                      <option value="Keagamaan">Keagamaan</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Seni">Seni</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Deskripsi *</label>
                  <textarea
                    rows={2}
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
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
                    Simpan Prestasi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Prestasi Table */}
        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">Kejuaraan</th>
                <th className="p-3">Peraih</th>
                <th className="p-3">Capaian</th>
                <th className="p-3">Tingkat</th>
                <th className="p-3">Kategori</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {achievements.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-200">{item.studentName}</td>
                  <td className="p-3">
                    <span className="bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {item.rank}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{item.level}</td>
                  <td className="p-3 text-slate-500">{item.category}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteAchievement(item.id)}
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
