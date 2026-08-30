"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, Heart, X, Search, Sparkles, Check, ArrowRight } from "lucide-react";
import { KesiswaanActivity } from "@/lib/kesiswaan-data";
import { ImageUploadInput } from "@/components/image-upload-input";
import { Pagination } from "@/components/pagination";

export default function AdminKesiswaanPage() {
  const { kesiswaanActivities, addKesiswaanActivity, updateKesiswaanActivity, deleteKesiswaanActivity } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KesiswaanActivity | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form State
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kepemimpinan");
  const [categoryBadgeBg, setCategoryBadgeBg] = useState("bg-amber-400 text-slate-950");
  const [buttonText, setButtonText] = useState("");
  const [image, setImage] = useState("");
  const [tagline, setTagline] = useState("");
  const [author, setAuthor] = useState("Tim Pembina Kesiswaan");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [content, setContent] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");
  const [schedule, setSchedule] = useState("");
  const [target, setTarget] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const openAddModal = () => {
    setEditingItem(null);
    setSlug("");
    setTitle("");
    setCategory("Kepemimpinan");
    setCategoryBadgeBg("bg-amber-400 text-slate-950");
    setButtonText("Lihat Kegiatan");
    setImage("");
    setTagline("");
    setAuthor("Tim Pembina Kesiswaan");
    setShortDesc("");
    setFullDesc("");
    setContent("");
    setHighlightsInput("");
    setSchedule("Kegiatan Rutin Pekanan");
    setTarget("Seluruh Santri & Siswa");
    setTagsInput("Kesiswaan, Santri, SMAAlFurqon");
    setModalOpen(true);
  };

  const openEditModal = (item: KesiswaanActivity) => {
    setEditingItem(item);
    setSlug(item.slug);
    setTitle(item.title);
    setCategory(item.category);
    setCategoryBadgeBg(item.categoryBadgeBg || "bg-amber-400 text-slate-950");
    setButtonText(item.buttonText || "Lihat Kegiatan");
    setImage(item.image || "");
    setTagline(item.tagline || "");
    setAuthor(item.author || "Tim Pembina Kesiswaan");
    setShortDesc(item.shortDesc || "");
    setFullDesc(item.fullDesc || "");
    setContent(item.content || "");
    setHighlightsInput((item.highlights || []).join("\n"));
    setSchedule(item.schedule || "");
    setTarget(item.target || "");
    setTagsInput((item.tags || []).join(", "));
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const imageValue = image || "/bg-al-furqon2.jpg";
    const highlights = highlightsInput
      .split("\n")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter((t) => t.length > 0);

    const payload = {
      slug: finalSlug,
      title,
      category,
      categoryBadgeBg,
      buttonText: buttonText || "Lihat Kegiatan",
      image: imageValue,
      tagline,
      author,
      shortDesc,
      fullDesc,
      content,
      highlights,
      schedule,
      target,
      tags,
    };

    if (editingItem) {
      updateKesiswaanActivity(editingItem.id, payload);
    } else {
      addKesiswaanActivity(payload);
    }

    setModalOpen(false);
  };

  const filteredActivities = (kesiswaanActivities || []).filter(
    (item) =>
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.shortDesc || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Kelola Kehidupan Santri & Siswa</span>
            </h1>
            <p className="text-xs text-slate-500">
              Kelola kartu program, rincian kegiatan, dan halaman detail section Kehidupan Santri ({kesiswaanActivities.length} program).
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 font-bold text-xs flex items-center gap-1.5 shadow transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Program Baru</span>
          </button>
        </div>

        {/* Search Bar & Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari program atau kategori..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-slate-900 dark:text-white">{filteredActivities.length}</span> kegiatan santri
          </div>
        </div>

        {/* Grid List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedActivities.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0E241E] rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-900/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase ${item.categoryBadgeBg}`}>
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Slug: /{item.slug}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-emerald-900/40 mt-4">
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[140px]">
                  {item.schedule}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                    title="Edit Program"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus program "${item.title}"?`)) {
                        deleteKesiswaanActivity(item.id);
                      }
                    }}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    title="Hapus Program"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="bg-white dark:bg-[#0E241E] p-12 rounded-2xl border border-slate-200 dark:border-emerald-900/40 text-center space-y-3">
            <Heart className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm">Tidak ada program ditemukan</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Coba ganti kata kunci pencarian atau klik "Tambah Program Baru" untuk menambahkan kegiatan kesiswaan.
            </p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredActivities.length / itemsPerPage) || 1}
          totalItems={filteredActivities.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Modal Form Add/Edit */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="bg-white dark:bg-[#0E241E] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <h3 className="font-bold text-base font-heading text-slate-900 dark:text-white">
                    {editingItem ? "Edit Data Kehidupan Santri & Siswa" : "Tambah Program Santri Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">Kelola tampilan kartu dan isi detail lengkap kegiatan.</p>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Judul Kegiatan / Program *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Organisasi OSIS & Pramuka Ambalan"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Slug URL (Opsional / Otomatis)</label>
                    <input
                      type="text"
                      placeholder="Contoh: osis-pramuka"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Kategori *</label>
                    <input
                      type="text"
                      required
                      placeholder="Kepemimpinan / Spiritual / Adiwiyata"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Teks Tombol Kartu</label>
                    <input
                      type="text"
                      required
                      placeholder="Lihat Kegiatan OSIS"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Gaya Badge Kategori</label>
                    <select
                      value={categoryBadgeBg}
                      onChange={(e) => setCategoryBadgeBg(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    >
                      <option value="bg-amber-400 text-slate-950">Amber (Kuning Mas)</option>
                      <option value="bg-[#064E3B] text-amber-300 border border-amber-400/30">Emerald Dark & Amber</option>
                      <option value="bg-teal-600 text-white">Teal Hijau Laut</option>
                      <option value="bg-blue-600 text-white">Blue Biru</option>
                      <option value="bg-purple-600 text-white">Purple Ungu</option>
                    </select>
                  </div>
                </div>

                <ImageUploadInput
                  value={image}
                  onChange={setImage}
                  label="Foto Utama Program / Kegiatan *"
                />

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Tagline Sub-Judul *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Melatih Kemandirian, Jiwa Kepemimpinan, & Manajerial Islami"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Ringkasan Kartu (Short Description) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Deskripsi singkat yang tampil pada kartu section beranda..."
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Isi Artikel / Penjelasan Detail Lengkap *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tuliskan isi artikel detail program kegiatan santri lengkap..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Program & Kegiatan Unggulan (1 Baris 1 Poin)</label>
                  <textarea
                    rows={3}
                    placeholder={`Latihan Dasar Kepemimpinan Siswa (LDKS)\nPenyelenggaraan Event Tahunan FURQON FEST\nBakti Sosial & Safari Ramadan`}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Waktu & Pelaksanaan</label>
                    <input
                      type="text"
                      placeholder="Setiap Hari Sabtu / Rutin Pekanan"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Sasaran Peserta</label>
                    <input
                      type="text"
                      placeholder="Seluruh Santri & Siswa SMA Al-Furqon"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Tagar / Tags (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    placeholder="Kepemimpinan, OSIS, Pramuka, SMAAlFurqon"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
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
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow transition-colors"
                  >
                    Simpan Program
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
