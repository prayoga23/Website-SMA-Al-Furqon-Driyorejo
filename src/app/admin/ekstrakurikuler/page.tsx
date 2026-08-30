"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, Sparkles, X, Clock, User, Award, Image as ImageIcon } from "lucide-react";
import { ExtracurricularItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";
import { Pagination } from "@/components/pagination";
import { getExtraIcon } from "@/components/kesiswaan-section";

export default function AdminEkstrakurikulerPage() {
  const { extracurriculars, addExtracurricular, updateExtracurricular, deleteExtracurricular } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExtracurricularItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [name, setName] = useState("");
  const [category, setCategory] = useState<ExtracurricularItem["category"]>("Olahraga");
  const [schedule, setSchedule] = useState("Jumat (09:00 - 11:00 WIB)");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Sparkles");
  const [iconImage, setIconImage] = useState("");
  const [image, setImage] = useState("");
  const [achievementsInput, setAchievementsInput] = useState("");

  const iconOptions = [
    { label: "Sparkles (Bintang)", value: "Sparkles" },
    { label: "Palette (Desain Grafis)", value: "Palette" },
    { label: "ChefHat (Tata Boga)", value: "ChefHat" },
    { label: "Scissors (Handy Craft)", value: "Scissors" },
    { label: "Shirt (Menjahit)", value: "Shirt" },
    { label: "Trophy (Futsal / Olahraga)", value: "Trophy" },
    { label: "Music (Al Banjari / Seni)", value: "Music" },
    { label: "ShieldCheck (Pencak Silat)", value: "ShieldCheck" },
  ];

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setCategory("Olahraga");
    setSchedule("Jumat (09:00 - 11:00 WIB)");
    setInstructor("");
    setDescription("");
    setIcon("Sparkles");
    setIconImage("");
    setImage("");
    setAchievementsInput("");
    setModalOpen(true);
  };

  const openEditModal = (item: ExtracurricularItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setSchedule(item.schedule);
    setInstructor(item.instructor || "");
    setDescription(item.description);
    setIcon(item.icon || "Sparkles");
    setIconImage(item.iconImage || "");
    setImage(item.image || "");
    setAchievementsInput(item.achievements ? item.achievements.join(", ") : "");
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const achievementsList = achievementsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const imageValue =
      image ||
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80";

    const dataPayload = {
      name,
      category,
      schedule,
      instructor,
      description,
      icon,
      iconImage: iconImage || undefined,
      image: imageValue,
      achievements: achievementsList,
    };

    if (editingItem) {
      updateExtracurricular(editingItem.id, dataPayload);
    } else {
      addExtracurricular(dataPayload);
    }

    setModalOpen(false);
  };

  const paginatedItems = extracurriculars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        {/* Page Title & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Manajemen Ekstrakurikuler
            </h1>
            <p className="text-xs text-slate-500">
              Kelola daftar klub ekstrakurikuler, jadwal, ikon, dan pembina ({extracurriculars.length} klub terdaftar).
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 shadow transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Ekstrakurikuler Baru</span>
          </button>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading">
                  {editingItem ? "Edit Data Ekstrakurikuler" : "Tambah Ekstrakurikuler Baru"}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Nama Ekstrakurikuler *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Desain Grafis, Futsal, etc."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Kategori *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-medium"
                    >
                      <option value="Keagamaan">Keagamaan</option>
                      <option value="Olahraga">Olahraga</option>
                      <option value="Seni & Budaya">Seni & Budaya</option>
                      <option value="Sains & Teknologi">Sains & Teknologi</option>
                      <option value="Keterampilan">Keterampilan</option>
                      <option value="Kepemimpinan">Kepemimpinan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Pilihan Ikon Vektor *
                    </label>
                    <select
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-medium"
                    >
                      {iconOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Jadwal Kegiatan *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jumat (09:00 - 11:00 WIB)"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Pembina / Pelatih
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Pembina"
                      value={instructor}
                      onChange={(e) => setInstructor(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>
                </div>

                {/* Custom Image Icon Upload */}
                <ImageUploadInput
                  value={iconImage}
                  onChange={(imgData) => setIconImage(imgData)}
                  label="Upload Custom Ikon Gambar (Opsional PNG)"
                />

                {/* Banner Photo Upload */}
                <ImageUploadInput
                  value={image}
                  onChange={(imgData) => setImage(imgData)}
                  label="Upload Foto Banner Kegiatan (Opsional)"
                />

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Deskripsi Ringkas *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Jelaskan mengenai fokus dan kegiatan ekstrakurikuler ini..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Capaian Prestasi (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="Juara 1 Lomba, Medali Emas Expo, etc."
                    value={achievementsInput}
                    onChange={(e) => setAchievementsInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 font-bold hover:bg-slate-300 dark:hover:bg-emerald-900 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors shadow"
                  >
                    {editingItem ? "Simpan Perubahan" : "Simpan Ekstrakurikuler"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">Klub Ekstrakurikuler</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Jadwal</th>
                <th className="p-3">Pembina</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {paginatedItems.map((item) => {
                const IconComp = getExtraIcon(item.icon, item.name);
                const imgIcon = item.iconImage;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                    <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-500 dark:text-amber-300 flex items-center justify-center shrink-0 overflow-hidden p-1">
                        {imgIcon ? (
                          <img src={imgIcon} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                          <IconComp className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{item.description}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-500" />
                        {item.schedule}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{item.instructor || "-"}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Edit Ekstrakurikuler"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteExtracurricular(item.id)}
                          className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
                          title="Hapus Ekstrakurikuler"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {extracurriculars.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              Belum ada data ekstrakurikuler yang ditambahkan.
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(extracurriculars.length / itemsPerPage)}
          totalItems={extracurriculars.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
