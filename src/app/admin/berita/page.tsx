"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, Newspaper, X } from "lucide-react";
import { NewsItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";
import { Pagination } from "@/components/pagination";

export default function AdminBeritaPage() {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<NewsItem["category"]>("Berita");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("Berita");
    setExcerpt("");
    setContent("");
    setImage("");
    setModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setExcerpt(item.excerpt);
    setContent(item.content);
    setImage(item.image || "");
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const imageValue =
      image ||
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";

    if (editingItem) {
      updateNews(editingItem.id, {
        title,
        slug: slug || editingItem.slug,
        excerpt,
        content: content || excerpt,
        category,
        image: imageValue,
      });
    } else {
      addNews({
        title,
        slug: slug || "artikel-" + Date.now(),
        excerpt,
        content: content || excerpt,
        category,
        date: new Date().toISOString().split("T")[0],
        author: "Admin SMA Al-Furqon",
        image: imageValue,
      });
    }

    setModalOpen(false);
  };

  const paginatedNews = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Manajemen Berita & Artikel
            </h1>
            <p className="text-xs text-slate-500">Kelola artikel dan pengumuman resmi sekolah ({news.length} total).</p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-[#047857] shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Artikel Baru</span>
          </button>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading">
                  {editingItem ? "Edit Berita / Artikel" : "Tambah Berita Baru"}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    placeholder="Judul artikel..."
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  >
                    <option value="Berita">Berita</option>
                    <option value="Agenda">Agenda</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Sambutan">Sambutan</option>
                  </select>
                </div>

                {/* Local Image Upload Input */}
                <ImageUploadInput
                  value={image}
                  onChange={(imgData) => setImage(imgData)}
                  label="Upload Gambar Header Artikel *"
                />

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Ringkasan (Excerpt) *</label>
                  <textarea
                    rows={2}
                    required
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Isi Artikel Lengkap</label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                    className="px-4 py-2 rounded-xl bg-[#064E3B] text-amber-300 font-bold hover:bg-[#047857] transition-colors"
                  >
                    {editingItem ? "Simpan Perubahan" : "Simpan Artikel"}
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
              {paginatedNews.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate flex items-center gap-2">
                    {item.image && (
                      <img src={item.image} alt="" className="w-7 h-7 rounded object-cover shrink-0" />
                    )}
                    <span className="truncate">{item.title}</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{item.date}</td>
                  <td className="p-3 text-slate-500">{item.author}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 hover:bg-blue-200 transition-colors"
                        title="Edit Artikel"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {news.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              Belum ada berita atau artikel yang ditambahkan.
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(news.length / itemsPerPage)}
          totalItems={news.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
