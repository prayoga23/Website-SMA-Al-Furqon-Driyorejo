"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, Newspaper, X } from "lucide-react";
import { NewsItem } from "@/lib/types";

export default function AdminBeritaPage() {
  const { news, addNews, deleteNews } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<NewsItem["category"]>("Berita");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    addNews({
      title: newTitle,
      slug: slug || "artikel-" + Date.now(),
      excerpt: newExcerpt,
      content: newContent || newExcerpt,
      category: newCategory,
      date: new Date().toISOString().split("T")[0],
      author: "Admin SMA Al-Furqon",
      image: newImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    });
    setModalOpen(false);
    setNewTitle("");
    setNewExcerpt("");
    setNewContent("");
    setNewImage("");
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Manajemen Berita & Artikel
            </h1>
            <p className="text-xs text-slate-500">Kelola artikel dan pengumuman resmi sekolah.</p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-[#047857] shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Artikel Baru</span>
          </button>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading">Tambah Berita Baru</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    placeholder="Judul artikel..."
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Kategori *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  >
                    <option value="Berita">Berita</option>
                    <option value="Agenda">Agenda</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Prestasi">Prestasi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">URL Gambar Header</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Ringkasan (Excerpt) *</label>
                  <textarea
                    rows={2}
                    required
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Isi Artikel Lengkap</label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 text-slate-800 dark:text-slate-200 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#064E3B] text-amber-300 font-bold"
                  >
                    Simpan Artikel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* News Table */}
        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">Judul Berita</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Penulis</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{item.date}</td>
                  <td className="p-3 text-slate-500">{item.author}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteNews(item.id)}
                      className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
                      title="Hapus Artikel"
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
