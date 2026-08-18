"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, Image as ImageIcon, X } from "lucide-react";
import { GalleryItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";

export default function AdminGaleriPage() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GalleryItem["category"]>("Kegiatan");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("Kegiatan");
    setImageUrl("");
    setDescription("");
    setModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl || "");
    setDescription(item.description);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage =
      imageUrl ||
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80";

    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title,
        category,
        imageUrl: finalImage,
        description,
      });
    } else {
      addGalleryItem({
        title,
        category,
        imageUrl: finalImage,
        date: new Date().toISOString().split("T")[0],
        description,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Manajemen Dokumentasi Galeri
            </h1>
            <p className="text-xs text-slate-500">Kelola foto kegiatan dan lingkungan sekolah.</p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-[#047857] shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Foto Baru</span>
          </button>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-emerald-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading">
                  {editingItem ? "Edit Foto Galeri" : "Tambah Foto Galeri"}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Judul Foto / Kegiatan *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pembelajaran">Pembelajaran</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                    <option value="Lingkungan Sekolah">Lingkungan Sekolah</option>
                    <option value="Keagamaan">Keagamaan</option>
                  </select>
                </div>

                {/* Local Image Upload Input */}
                <ImageUploadInput
                  value={imageUrl}
                  onChange={(imgData) => setImageUrl(imgData)}
                  label="Upload File Foto Dokumentasi *"
                />

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Deskripsi Singkat *</label>
                  <textarea
                    rows={3}
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
                    className="px-4 py-2 rounded-xl bg-[#064E3B] text-amber-300 font-bold hover:bg-[#047857] transition-colors"
                  >
                    {editingItem ? "Simpan Perubahan" : "Simpan Foto"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0E241E] rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 shadow-sm p-4 flex items-center gap-4 group"
            >
              <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-amber-500 uppercase">{item.category}</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{item.description}</p>
                
                <div className="mt-2.5 flex items-center gap-3">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="text-[11px] font-bold text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
