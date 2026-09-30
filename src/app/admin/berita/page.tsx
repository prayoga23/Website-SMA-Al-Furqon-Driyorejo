"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import {
  Plus,
  Trash2,
  Edit3,
  Newspaper,
  X,
  FileText,
  Send,
  Eye,
  Clock,
  CheckCircle,
  Search,
  Sparkles,
  AlertCircle,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { NewsItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";
import { YouTubeInput } from "@/components/youtube-input";
import { YoutubeIcon } from "@/components/youtube-icon";
import { Pagination } from "@/components/pagination";
import Link from "next/link";

const STORAGE_DRAFT_KEY = "sma_alfurqon_draft_berita_temp";

export default function AdminBeritaPage() {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasSavedDraftPrompt, setHasSavedDraftPrompt] = useState(false);
  const itemsPerPage = 8;

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<NewsItem["category"]>("Berita");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Check for auto-saved draft when opening Add Modal
  const openAddModal = () => {
    setEditingItem(null);
    const savedDraft = typeof window !== "undefined" ? localStorage.getItem(STORAGE_DRAFT_KEY) : null;

    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setTitle(parsed.title || "");
        setCategory(parsed.category || "Berita");
        setExcerpt(parsed.excerpt || "");
        setContent(parsed.content || "");
        setImage(parsed.image || "");
        setYoutubeUrl(parsed.youtubeUrl || "");
        setStatus(parsed.status || "draft");
        setHasSavedDraftPrompt(true);
      } catch {
        resetForm();
      }
    } else {
      resetForm();
      setHasSavedDraftPrompt(false);
    }

    setModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Berita");
    setExcerpt("");
    setContent("");
    setImage("");
    setYoutubeUrl("");
    setStatus("published");
    setHasSavedDraftPrompt(false);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setExcerpt(item.excerpt);
    setContent(item.content);
    setImage(item.image || "");
    setYoutubeUrl(item.youtubeUrl || "");
    setStatus(item.status || "published");
    setHasSavedDraftPrompt(false);
    setModalOpen(true);
  };

  // Auto-save form inputs to localStorage when writing new article
  useEffect(() => {
    if (!modalOpen || editingItem) return;

    if (title || excerpt || content) {
      const draftData = {
        title,
        category,
        excerpt,
        content,
        image,
        youtubeUrl,
        status,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draftData));
    }
  }, [title, category, excerpt, content, image, youtubeUrl, status, modalOpen, editingItem]);

  const clearAutoSavedDraft = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_DRAFT_KEY);
    }
    setHasSavedDraftPrompt(false);
  };

  const handleDiscardDraft = () => {
    clearAutoSavedDraft();
    resetForm();
    showToast("Draf lokal berhasil dibersihkan");
  };

  const saveArticle = (forcedStatus?: "published" | "draft") => {
    const finalStatus = forcedStatus || status;
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
        youtubeUrl: youtubeUrl.trim(),
        status: finalStatus,
      });
      showToast(
        finalStatus === "draft"
          ? "Perubahan berhasil disimpan sebagai Draf"
          : "Artikel berhasil diperbarui & diterbitkan!"
      );
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
        youtubeUrl: youtubeUrl.trim(),
        status: finalStatus,
      });
      clearAutoSavedDraft();
      showToast(
        finalStatus === "draft"
          ? "Artikel baru berhasil disimpan sebagai Draf (Draft)"
          : "Artikel berhasil dipublikasikan untuk publik!"
      );
    }

    setModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveArticle();
  };

  const toggleItemStatus = (item: NewsItem) => {
    const nextStatus = item.status === "draft" ? "published" : "draft";
    updateNews(item.id, { status: nextStatus });
    showToast(
      nextStatus === "published"
        ? `Artikel "${item.title.substring(0, 28)}..." sekarang berstatus TERBIT!`
        : `Artikel "${item.title.substring(0, 28)}..." dialihkan ke DRAF.`
    );
  };

  // Filter & Search
  const publishedCount = news.filter((n) => (n.status || "published") === "published").length;
  const draftCount = news.filter((n) => n.status === "draft").length;

  const filteredNews = news.filter((item) => {
    const itemStatus = item.status || "published";
    const matchesFilter =
      statusFilter === "all" ? true : statusFilter === itemStatus;

    const matchesSearch =
      searchTerm.trim() === "" ||
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.author || "").toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-900 text-amber-300 rounded-2xl shadow-2xl border border-amber-400/30 text-xs font-bold animate-in fade-in slide-in-from-top-4">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Kelola Berita & Informasi</span>
            </h1>
            <p className="text-xs text-slate-500">
              Kelola artikel, pengumuman, dan simpan konsep sebagai draf sebelum dipublikasikan.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-[#047857] shadow transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Artikel Baru</span>
          </button>
        </div>

        {/* Status Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => {
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === "all"
                  ? "bg-[#064E3B] text-amber-300 shadow-sm"
                  : "bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              <span>Semua</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
                {news.length}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter("published");
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === "published"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terbit</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-800/30">
                {publishedCount}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter("draft");
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === "draft"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Draft</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-800/20 font-extrabold">
                {draftCount}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul, konten, atau penulis..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
            <div className="bg-white dark:bg-[#0E241E] max-w-xl w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-4 max-h-[92vh] overflow-y-auto my-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <h3 className="font-bold text-sm font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    {editingItem ? (
                      <>
                        <Edit3 className="w-4 h-4 text-emerald-500" />
                        <span>Edit Berita / Artikel</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-emerald-500" />
                        <span>Tambah Berita Baru</span>
                      </>
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Isi detail artikel dan pilih apakah langsung dipublikasikan atau disimpan sebagai konsep (draft).
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-emerald-950 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Saved Draft Notice Banner */}
              {hasSavedDraftPrompt && !editingItem && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>Ditemukan draf tersimpan dari penulisan sebelumnya.</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleDiscardDraft}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[10px] font-bold hover:bg-amber-100 transition-colors"
                    >
                      Buang
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasSavedDraftPrompt(false)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-bold hover:bg-amber-600 transition-colors"
                    >
                      Gunakan Draf
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {/* Status Selector Choice Cards */}
                <div>
                  <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-200">
                    Status Publikasi Artikel *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus("published")}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                        status === "published"
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20"
                          : "bg-slate-50 dark:bg-[#081612] border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                          status === "published"
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          <span>Terbitkan Langsung</span>
                          {status === "published" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                              Aktif
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                          Artikel langsung tampil di portal web untuk publik.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatus("draft")}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                        status === "draft"
                          ? "bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500/20"
                          : "bg-slate-50 dark:bg-[#081612] border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                          status === "draft"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          <span>Simpan sebagai Draft</span>
                          {status === "draft" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                              Konsep
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                          Hanya disimpan di CMS Admin, belum dapat diakses pengunjung umum.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    placeholder="Contoh: Pembukaan Semester Baru Santri SMA Al-Furqon..."
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Kategori *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
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
                  label="Upload Gambar Header Artikel (Opsional)"
                />

                {/* YouTube Video URL Input */}
                <YouTubeInput
                  value={youtubeUrl}
                  onChange={setYoutubeUrl}
                  label="Link Video YouTube (Opsional)"
                />

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Ringkasan Singkat (Excerpt) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Ringkasan 1-2 kalimat pengantar artikel..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Isi Artikel Lengkap
                  </label>
                  <textarea
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan naskah berita atau pengumuman secara rinci..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950/80 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition-colors"
                  >
                    Batal
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Secondary button: Save as Draft */}
                    <button
                      type="button"
                      onClick={() => saveArticle("draft")}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-200 transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Simpan sebagai Draft</span>
                    </button>

                    {/* Primary button: Publish */}
                    <button
                      type="button"
                      onClick={() => saveArticle("published")}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#047857] shadow transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{editingItem ? "Publikasikan Sekarang" : "Publikasikan Artikel"}</span>
                    </button>
                  </div>
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
                <th className="p-3">Status</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Penulis</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {paginatedNews.map((item) => {
                const isItemDraft = item.status === "draft";
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30 transition-colors">
                    <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs">
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        )}
                        <span className="truncate" title={item.title}>
                          {item.title}
                        </span>
                        {item.youtubeUrl && (
                          <span
                            className="shrink-0 p-1 rounded bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400"
                            title="Ada Video YouTube"
                          >
                            <YoutubeIcon className="w-3 h-3 text-red-600 dark:text-red-400" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 dark:bg-emerald-950 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200 dark:border-emerald-900/50">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3">
                      {isItemDraft ? (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border border-amber-300 dark:border-amber-800/60">
                          <FileText className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>Draft</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-300 dark:border-emerald-800/60">
                          <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Terbit</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500 whitespace-nowrap">{item.date}</td>
                    <td className="p-3 text-slate-500 truncate max-w-[120px]">{item.author}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick 1-click status toggle */}
                        <button
                          onClick={() => toggleItemStatus(item)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                            isItemDraft
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300"
                          }`}
                          title={isItemDraft ? "Publikasikan Artikel Sekarang" : "Tarik Kembali ke Draft"}
                        >
                          {isItemDraft ? (
                            <Send className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Preview button */}
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          className="p-1.5 rounded bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                          title="Pratinjau Halaman Artikel"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit button */}
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus artikel "${item.title}"?`)) {
                              deleteNews(item.id);
                              showToast("Artikel berhasil dihapus");
                            }
                          }}
                          className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {paginatedNews.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <Newspaper className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
              <p>Tidak ada berita atau artikel yang sesuai dengan filter.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredNews.length / itemsPerPage) || 1}
          totalItems={filteredNews.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
