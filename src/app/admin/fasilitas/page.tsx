"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import {
  Plus,
  Trash2,
  Edit3,
  X,
  Building2,
  FlaskConical,
  Laptop,
  Trophy,
  BookOpen,
  Shield,
  Wifi,
  Sparkles,
  GraduationCap,
  Award,
  Search,
  CheckCircle2,
  Eye,
  Filter,
} from "lucide-react";
import { FacilityItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";

// Map available Lucide icons for facility selection
export const AVAILABLE_ICONS: { [key: string]: React.ElementType } = {
  Building2,
  FlaskConical,
  Laptop,
  Trophy,
  BookOpen,
  Shield,
  Wifi,
  Sparkles,
  GraduationCap,
  Award,
};

export const ICON_OPTIONS = [
  { name: "Building2", label: "Gedung & Kelas (Building2)" },
  { name: "FlaskConical", label: "Laboratorium (FlaskConical)" },
  { name: "Laptop", label: "Komputer / IT (Laptop)" },
  { name: "Trophy", label: "Olahraga & Seni (Trophy)" },
  { name: "BookOpen", label: "Perpustakaan (BookOpen)" },
  { name: "Shield", label: "Keamanan (Shield)" },
  { name: "Wifi", label: "Jaringan & Internet (Wifi)" },
  { name: "Sparkles", label: "Keunggulan (Sparkles)" },
  { name: "GraduationCap", label: "Pendidikan (GraduationCap)" },
  { name: "Award", label: "Penghargaan (Award)" },
];

export default function AdminFasilitasPage() {
  const router = useRouter();
  const { facilities, addFacility, updateFacility, deleteFacility } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FacilityItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");

  // Form Fields
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [iconName, setIconName] = useState("Building2");
  const [tag, setTag] = useState("Fasilitas Belajar");
  const [image, setImage] = useState("");
  const [standard, setStandard] = useState("Terbaik & Modern");

  useEffect(() => {
    const token = localStorage.getItem("sma_admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setDesc("");
    setIconName("Building2");
    setTag("Fasilitas Belajar");
    setImage("");
    setStandard("Terbaik & Modern");
    setModalOpen(true);
  };

  const openEditModal = (item: FacilityItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDesc(item.desc);
    setIconName(item.iconName || "Building2");
    setTag(item.tag || "Fasilitas Belajar");
    setImage(item.image || "");
    setStandard(item.standard || "Terbaik & Modern");
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imageValue =
      image ||
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80";

    if (editingItem) {
      updateFacility(editingItem.id, {
        title,
        desc,
        iconName,
        tag,
        image: imageValue,
        standard,
      });
    } else {
      addFacility({
        title,
        desc,
        iconName,
        tag,
        image: imageValue,
        standard,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, titleName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data fasilitas "${titleName}"?`)) {
      deleteFacility(id);
    }
  };

  // Filter facilities
  const filteredFacilities = facilities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || item.tag === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["Semua", ...Array.from(new Set(facilities.map((f) => f.tag)))];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>CMS MANAJEMEN SARANA PRASARANA</span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Kelola Data "Fasilitas Sarana Prasarana Modern"
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Tambah, perbarui, dan atur daftar fasilitas unggulan yang ditampilkan pada halaman publik website sekolah.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#047857] hover:to-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Fasilitas Baru</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Fasilitas</p>
              <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                {facilities.length} Sarana
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Kategori Terdaftar</p>
              <h3 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                {categories.length - 1} Kategori
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow">
              <Filter className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Status Integrasi</p>
              <h3 className="text-base font-extrabold font-heading text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Terhubung Publik</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau deskripsi fasilitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 shrink-0">Filter Tag:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 dark:bg-[#081612] px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-emerald-950 p-1 rounded-xl border border-slate-200 dark:border-emerald-900/50">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white shadow"
                    : "text-slate-500"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "table"
                    ? "bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white shadow"
                    : "text-slate-500"
                }`}
              >
                Tabel
              </button>
            </div>
          </div>
        </div>

        {/* Modal Add / Edit Facility */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-xl w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-emerald-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base font-heading text-slate-900 dark:text-white">
                    {editingItem ? "Edit Data Fasilitas" : "Tambah Fasilitas Baru"}
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-emerald-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Nama / Judul Fasilitas *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Lab Komputer IoT & AI Modern"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Kategori / Tag Badge *
                    </label>
                    <input
                      type="text"
                      required
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="Contoh: Fasilitas Belajar / Riset & Eksperimen"
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Pilihan Ikon Simbol *
                    </label>
                    <select
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.name} value={opt.name}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Standar Kualitas / Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                    placeholder="Contoh: Terbaik & Modern"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Deskripsi Lengkap Fasilitas *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Jelaskan keunggulan dan spesifikasi sarana prasarana..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Local File Upload Component */}
                <ImageUploadInput
                  value={image}
                  onChange={(imgData) => setImage(imgData)}
                  label="Upload Gambar Fasilitas (atau gunakan URL default) *"
                />

                <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/40 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-emerald-950 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold transition-colors shadow"
                  >
                    {editingItem ? "Simpan Perubahan" : "Simpan Fasilitas Baru"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Facilities Content Display (Grid or Table) */}
        {filteredFacilities.length === 0 ? (
          <div className="bg-white dark:bg-[#0E241E] p-12 rounded-3xl text-center border border-slate-200 dark:border-emerald-900/40 space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 dark:text-emerald-900 mx-auto" />
            <h4 className="font-bold text-slate-700 dark:text-slate-200">Tidak ada fasilitas ditemukan</h4>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau tambah fasilitas baru.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFacilities.map((item) => {
              const IconComponent = AVAILABLE_ICONS[item.iconName || "Building2"] || Building2;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#0E241E] rounded-3xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                      <span className="absolute top-3 left-3 bg-[#064E3B]/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-400/30 flex items-center gap-1">
                        <IconComponent className="w-3.5 h-3.5" />
                        {item.tag}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-5 pt-0 space-y-3">
                    <div className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-emerald-950/40 text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center justify-between border border-slate-100 dark:border-emerald-900/40">
                      <span>Standar:</span>
                      <span className="font-bold text-[#047857] dark:text-emerald-400">{item.standard || "Terbaik & Modern"}</span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-emerald-900/30">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center gap-1 hover:bg-blue-100 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/80 text-red-600 dark:text-red-400 font-bold text-xs flex items-center gap-1 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase">
                  <tr>
                    <th className="p-3">Fasilitas</th>
                    <th className="p-3">Kategori Tag</th>
                    <th className="p-3">Ikon</th>
                    <th className="p-3">Deskripsi</th>
                    <th className="p-3">Standar</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
                  {filteredFacilities.map((item) => {
                    const IconComponent = AVAILABLE_ICONS[item.iconName || "Building2"] || Building2;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                        <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-10 rounded-lg object-cover border border-emerald-500/30 shrink-0"
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="p-3">
                          <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-md text-[10px]">
                            {item.tag}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                            <IconComponent className="w-4 h-4 text-emerald-600" />
                            <span>{item.iconName || "Building2"}</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                          {item.desc}
                        </td>
                        <td className="p-3 font-medium text-emerald-700 dark:text-emerald-400">
                          {item.standard || "Terbaik & Modern"}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(item)}
                              className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 hover:bg-blue-200 transition-colors"
                              title="Edit Data Fasilitas"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, item.title)}
                              className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
                              title="Hapus Data Fasilitas"
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
