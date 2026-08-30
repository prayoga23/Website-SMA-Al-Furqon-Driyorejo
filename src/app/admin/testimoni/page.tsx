"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, MessageSquareQuote, X, Search, Star, User } from "lucide-react";
import { TestimonialItem } from "@/lib/types";
import { Pagination } from "@/components/pagination";

export default function AdminTestimoniPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState<TestimonialItem["role"]>("Alumni");
  const [graduationYear, setGraduationYear] = useState("");
  const [avatar, setAvatar] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(5);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setRole("Alumni");
    setGraduationYear("Alumni Diterima Perguruan Tinggi");
    setAvatar("");
    setContent("");
    setRating(5);
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setGraduationYear(item.graduationYear || "");
    setAvatar(item.avatar || "");
    setContent(item.content);
    setRating(item.rating || 5);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const avatarValue =
      avatar ||
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";

    const payload = {
      name,
      role,
      graduationYear,
      avatar: avatarValue,
      content,
      rating: Number(rating) || 5,
    };

    if (editingItem) {
      updateTestimonial(editingItem.id, payload);
    } else {
      addTestimonial(payload);
    }

    setModalOpen(false);
  };

  const filteredTestimonials = (testimonials || []).filter((item) => {
    const matchesSearch =
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.content || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.graduationYear || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "Semua" || item.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-amber-500" />
              <span>Kelola Testimonial & Kesan</span>
            </h1>
            <p className="text-xs text-slate-500">
              Kelola cerita alumni, pengakuan santri, serta ulasan dari orang tua wali murid ({testimonials.length} testimonial).
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs flex items-center gap-1.5 shadow transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Testimonial Baru</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama atau isi testimoni..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-semibold"
            >
              <option value="Semua">Semua Peran</option>
              <option value="Alumni">Alumni</option>
              <option value="Siswa">Siswa Active</option>
              <option value="Orang Tua Wali">Orang Tua Wali</option>
            </select>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-slate-900 dark:text-white">{filteredTestimonials.length}</span> ulasan
          </div>
        </div>

        {/* Testimonials Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0E241E] p-6 rounded-3xl border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#047857] dark:text-emerald-400">
                    {item.role}
                  </span>
                </div>

                {/* Content Quote */}
                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed line-clamp-4">
                  "{item.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#064E3B] to-[#0D9488] text-amber-300 font-extrabold text-xs flex items-center justify-center shadow shrink-0 font-heading border border-amber-400/40">
                    {(item.name || "")
                      .trim()
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate">
                      {item.graduationYear || item.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus testimonial dari "${item.name}"?`)) {
                        deleteTestimonial(item.id);
                      }
                    }}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    title="Hapus Testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTestimonials.length === 0 && (
          <div className="bg-white dark:bg-[#0E241E] p-12 rounded-3xl border border-slate-200 dark:border-emerald-900/40 text-center space-y-3">
            <MessageSquareQuote className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm">Tidak ada testimonial ditemukan</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Coba ganti kata kunci pencarian atau klik "Tambah Testimonial Baru" untuk menambahkan ulasan alumni/santri.
            </p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTestimonials.length / itemsPerPage) || 1}
          totalItems={filteredTestimonials.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Modal Form Add/Edit */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="bg-white dark:bg-[#0E241E] max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <h3 className="font-bold text-base font-heading text-slate-900 dark:text-white">
                    {editingItem ? "Edit Testimonial & Kesan" : "Tambah Testimonial Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">Kelola cerita alumni, santri, atau wali murid.</p>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Elvina Cahyani"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Peran / Kategori *</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as TestimonialItem["role"])}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-bold"
                    >
                      <option value="Alumni">Alumni</option>
                      <option value="Siswa">Siswa Active</option>
                      <option value="Orang Tua Wali">Orang Tua Wali</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Keterangan Tambahan / Prestasi Alumni</label>
                    <input
                      type="text"
                      placeholder="Contoh: Alumni Diterima di ITS SURABAYA"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Rating Bintang (1 - 5)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-bold"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                      <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Isi Testimonial & Kesan *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan cerita atau ulasan pengalaman selama bersekolah di SMA PP Al-Furqon..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-emerald-900/40">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 text-slate-700 dark:text-slate-300 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow transition-colors"
                  >
                    Simpan Testimonial
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
