"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import {
  Plus,
  Trash2,
  Edit3,
  Heart,
  X,
  Search,
  Sparkles,
  Check,
  CheckCircle,
  FileText,
  Send,
  Eye,
  Clock,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { KesiswaanActivity } from "@/lib/kesiswaan-data";
import { ImageUploadInput } from "@/components/image-upload-input";
import { YouTubeInput } from "@/components/youtube-input";
import { YoutubeIcon } from "@/components/youtube-icon";
import { Pagination } from "@/components/pagination";
import Link from "next/link";

const STORAGE_DRAFT_KEY = "sma_alfurqon_draft_kesiswaan_temp";

export default function AdminKesiswaanPage() {
  const { kesiswaanActivities, addKesiswaanActivity, updateKesiswaanActivity, deleteKesiswaanActivity } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KesiswaanActivity | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasSavedDraftPrompt, setHasSavedDraftPrompt] = useState(false);
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
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openAddModal = () => {
    setEditingItem(null);
    const savedDraft = typeof window !== "undefined" ? localStorage.getItem(STORAGE_DRAFT_KEY) : null;

    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setSlug(parsed.slug || "");
        setTitle(parsed.title || "");
        setCategory(parsed.category || "Kepemimpinan");
        setCategoryBadgeBg(parsed.categoryBadgeBg || "bg-amber-400 text-slate-950");
        setButtonText(parsed.buttonText || "Lihat Kegiatan");
        setImage(parsed.image || "");
        setTagline(parsed.tagline || "");
        setAuthor(parsed.author || "Tim Pembina Kesiswaan");
        setShortDesc(parsed.shortDesc || "");
        setFullDesc(parsed.fullDesc || "");
        setContent(parsed.content || "");
        setHighlightsInput(parsed.highlightsInput || "");
        setSchedule(parsed.schedule || "Kegiatan Rutin Pekanan");
        setTarget(parsed.target || "Seluruh Santri & Siswa");
        setTagsInput(parsed.tagsInput || "Kesiswaan, Santri, SMAAlFurqon");
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
    setYoutubeUrl("");
    setStatus("published");
    setHasSavedDraftPrompt(false);
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
    setYoutubeUrl(item.youtubeUrl || "");
    setStatus(item.status || "published");
    setHasSavedDraftPrompt(false);
    setModalOpen(true);
  };

  // Auto-save form inputs to localStorage when writing new kesiswaan activity
  useEffect(() => {
    if (!modalOpen || editingItem) return;

    if (title || shortDesc || content) {
      const draftData = {
        slug,
        title,
        category,
        categoryBadgeBg,
        buttonText,
        image,
        tagline,
        author,
        shortDesc,
        fullDesc,
        content,
        highlightsInput,
        schedule,
        target,
        tagsInput,
        youtubeUrl,
        status,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draftData));
    }
  }, [
    slug,
    title,
    category,
    categoryBadgeBg,
    buttonText,
    image,
    tagline,
    author,
    shortDesc,
    fullDesc,
    content,
    highlightsInput,
    schedule,
    target,
    tagsInput,
    youtubeUrl,
    status,
    modalOpen,
    editingItem,
  ]);

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

  const saveActivity = (forcedStatus?: "published" | "draft") => {
    const finalStatus = forcedStatus || status;
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
      youtubeUrl: youtubeUrl.trim(),
      status: finalStatus,
    };

    if (editingItem) {
      updateKesiswaanActivity(editingItem.id, payload);
      showToast(
        finalStatus === "draft"
          ? "Perubahan berhasil disimpan sebagai Draf"
          : "Program santri berhasil diperbarui & diterbitkan!"
      );
    } else {
      addKesiswaanActivity(payload);
      clearAutoSavedDraft();
      showToast(
        finalStatus === "draft"
          ? "Program santri berhasil disimpan sebagai Draf (Draft)"
          : "Program santri berhasil dipublikasikan untuk publik!"
      );
    }

    setModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveActivity();
  };

  const toggleItemStatus = (item: KesiswaanActivity) => {
    const nextStatus = item.status === "draft" ? "published" : "draft";
    updateKesiswaanActivity(item.id, { status: nextStatus });
    showToast(
      nextStatus === "published"
        ? `Program "${item.title.substring(0, 25)}..." sekarang berstatus TERBIT!`
        : `Program "${item.title.substring(0, 25)}..." dialihkan ke DRAF.`
    );
  };

  // Filter & Search
  const publishedCount = (kesiswaanActivities || []).filter(
    (k) => (k.status || "published") === "published"
  ).length;
  const draftCount = (kesiswaanActivities || []).filter((k) => k.status === "draft").length;

  const filteredActivities = (kesiswaanActivities || []).filter((item) => {
    const itemStatus = item.status || "published";
    const matchesFilter =
      statusFilter === "all" ? true : statusFilter === itemStatus;

    const matchesSearch =
      searchTerm.trim() === "" ||
      (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.shortDesc || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.author || "").toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const paginatedActivities = filteredActivities.slice(
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

        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Kelola Kehidupan Santri & Siswa</span>
            </h1>
            <p className="text-xs text-slate-500">
              Kelola kartu program, artikel rincian kegiatan, dan simpan konsep sebagai draf ({kesiswaanActivities.length} total).
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

        {/* Status Filter Tabs & Search */}
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
                {kesiswaanActivities.length}
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

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Cari program, kategori, atau deskripsi..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Grid List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedActivities.map((item) => {
            const isItemDraft = item.status === "draft";
            return (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>

                    {/* Category Tag */}
                    <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase ${item.categoryBadgeBg}`}>
                      {item.category}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md ${
                        isItemDraft
                          ? "bg-amber-500 text-slate-950 border border-amber-300"
                          : "bg-emerald-600 text-white border border-emerald-400/40"
                      }`}
                    >
                      {isItemDraft ? (
                        <>
                          <FileText className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Terbit</span>
                        </>
                      )}
                    </span>

                    {item.youtubeUrl && (
                      <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white flex items-center gap-1 shadow-md">
                        <YoutubeIcon className="w-3 h-3 text-white" />
                        <span>Video</span>
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Slug: /{item.slug}
                      </span>
                      {isItemDraft && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                          Belum Tayang
                        </span>
                      )}
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
                  <span className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                    {item.schedule}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Quick 1-click status toggle */}
                    <button
                      onClick={() => toggleItemStatus(item)}
                      className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isItemDraft
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                      title={isItemDraft ? "Publikasikan Kegiatan Sekarang" : "Tarik Kembali ke Draft"}
                    >
                      {isItemDraft ? (
                        <Send className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Preview link */}
                    <Link
                      href={`/kesiswaan/${item.slug}`}
                      target="_blank"
                      className="p-1.5 rounded bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                      title="Pratinjau Halaman Detail"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    {/* Edit button */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                      title="Edit Program"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        if (confirm(`Yakin ingin menghapus program "${item.title}"?`)) {
                          deleteKesiswaanActivity(item.id);
                          showToast("Program kegiatan berhasil dihapus");
                        }
                      }}
                      className="p-1.5 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="Hapus Program"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="bg-white dark:bg-[#0E241E] p-12 rounded-2xl border border-slate-200 dark:border-emerald-900/40 text-center space-y-3">
            <Heart className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm">Tidak ada program ditemukan</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Coba ganti kata kunci pencarian atau klik &quot;Tambah Program Baru&quot; untuk menambahkan kegiatan kesiswaan.
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
            <div className="bg-white dark:bg-[#0E241E] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <div>
                  <h3 className="font-bold text-base font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    {editingItem ? (
                      <>
                        <Edit3 className="w-5 h-5 text-emerald-500" />
                        <span>Edit Data Kehidupan Santri & Siswa</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 text-emerald-500" />
                        <span>Tambah Program Santri Baru</span>
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kelola tampilan kartu, isi artikel detail kegiatan, dan pilih status draf atau publikasi.
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-emerald-950 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Saved Draft Notice Banner */}
              {hasSavedDraftPrompt && !editingItem && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>Ditemukan draf program yang tersimpan otomatis dari sesi sebelumnya.</span>
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

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Status Selector Choice Cards */}
                <div>
                  <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-200">
                    Status Publikasi Program *
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
                          Tampil di portal santri & halaman publik website.
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
                          Hanya tersimpan di admin, disembunyikan dari publik.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Judul Kegiatan / Program *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Organisasi OSIS & Pramuka Ambalan"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Slug URL (Opsional / Otomatis)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: osis-pramuka"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-mono text-[11px] text-slate-900 dark:text-slate-100"
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
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
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
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Gaya Badge Kategori</label>
                    <select
                      value={categoryBadgeBg}
                      onChange={(e) => setCategoryBadgeBg(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
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

                {/* YouTube Video URL Input */}
                <YouTubeInput
                  value={youtubeUrl}
                  onChange={setYoutubeUrl}
                  label="Link Video YouTube Kegiatan (Opsional)"
                />

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Tagline Sub-Judul *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Melatih Kemandirian, Jiwa Kepemimpinan, & Manajerial Islami"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-mono text-[11px] text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Program & Kegiatan Unggulan (1 Baris 1 Poin)</label>
                  <textarea
                    rows={3}
                    placeholder={`Latihan Dasar Kepemimpinan Siswa (LDKS)\nPenyelenggaraan Event Tahunan FURQON FEST\nBakti Sosial & Safari Ramadan`}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
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
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">Sasaran Peserta</label>
                    <input
                      type="text"
                      placeholder="Seluruh Santri & Siswa SMA Al-Furqon"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-emerald-900/40">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition-colors"
                  >
                    Batal
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Secondary button: Save as Draft */}
                    <button
                      type="button"
                      onClick={() => saveActivity("draft")}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-200 transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Simpan sebagai Draft</span>
                    </button>

                    {/* Primary button: Publish */}
                    <button
                      type="button"
                      onClick={() => saveActivity("published")}
                      className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{editingItem ? "Publikasikan Sekarang" : "Publikasikan Program"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
