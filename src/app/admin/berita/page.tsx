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
  AlertCircle,
  ArrowLeft,
  Bold,
  Italic,
  Heading,
  List,
  Quote,
  CornerDownLeft,
  Check,
  Calendar,
  User,
} from "lucide-react";
import { NewsItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";
import { YouTubeInput } from "@/components/youtube-input";
import { YouTubePlayer } from "@/components/youtube-player";
import { YoutubeIcon } from "@/components/youtube-icon";
import { Pagination } from "@/components/pagination";
import Link from "next/link";

const STORAGE_DRAFT_KEY = "sma_alfurqon_draft_berita_temp";
const CATEGORIES: NewsItem["category"][] = ["Berita", "Agenda", "Kegiatan", "Prestasi", "Sambutan"];

export default function AdminBeritaPage() {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasSavedDraftPrompt, setHasSavedDraftPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
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
    setActiveTab("write");
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
    setActiveTab("write");
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setActiveTab("write");
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
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      showToast("Judul artikel tidak boleh kosong!");
      return;
    }

    const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const imageValue = image ? image.trim() : "";

    if (editingItem) {
      updateNews(editingItem.id, {
        title: cleanTitle,
        slug: slug || editingItem.slug,
        excerpt: excerpt.trim() || cleanTitle,
        content: content.trim() || excerpt.trim() || cleanTitle,
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
        title: cleanTitle,
        slug: slug || "artikel-" + Date.now(),
        excerpt: excerpt.trim() || cleanTitle,
        content: content.trim() || excerpt.trim() || cleanTitle,
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
        ? `Artikel "${item.title.substring(0, 26)}..." sekarang TERBIT!`
        : `Artikel "${item.title.substring(0, 26)}..." dialihkan ke DRAF.`
    );
  };

  // Helper to insert markdown formatting in textarea
  const insertFormatting = (prefix: string, suffix: string = "", sample: string = "") => {
    const textarea = document.getElementById("mobile-article-content") as HTMLTextAreaElement | null;
    if (!textarea) {
      setContent((prev) => (prev ? `${prev}\n${prefix}${sample}${suffix}` : `${prefix}${sample}${suffix}`));
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || sample;
    const replacement = `${prefix}${selected}${suffix}`;
    const nextContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(nextContent);

    setTimeout(() => {
      textarea.focus();
      const cursorTarget = start + prefix.length + selected.length;
      textarea.setSelectionRange(cursorTarget, cursorTarget);
    }, 50);
  };

  // Calculations
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

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

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage) || 1;
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto w-full min-w-0 pb-20 md:pb-8">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-900 text-amber-300 rounded-2xl shadow-2xl border border-amber-400/30 text-xs font-bold animate-in fade-in slide-in-from-top-4 max-w-[90vw]">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Kelola Berita & Informasi</span>
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              Publikasikan berita sekolah atau simpan sebagai konsep (draft) dengan mudah dari HP.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#047857] active:scale-[0.98] shadow transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Artikel Baru</span>
          </button>
        </div>

        {/* Status Filters and Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#0E241E] p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-xs">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => {
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                statusFilter === "all"
                  ? "bg-[#064E3B] text-amber-300 shadow-sm"
                  : "bg-slate-100 dark:bg-emerald-950/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              <span>Semua</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20">
                {news.length}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter("published");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                statusFilter === "published"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terbit</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-800/30">
                {publishedCount}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter("draft");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                statusFilter === "draft"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Draft</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-800/20 font-extrabold">
                {draftCount}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul, kategori, naskah..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-sm sm:text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-2.5 p-0.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* FULL RESPONSIVE MODAL / MOBILE FULL-SCREEN EDITOR */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-hidden">
            <div className="bg-[#FDFBF7] dark:bg-[#0E241E] w-full h-full md:h-auto md:max-h-[92vh] md:max-w-2xl lg:max-w-3xl md:rounded-3xl shadow-2xl border-0 md:border border-slate-200 dark:border-emerald-900/60 flex flex-col overflow-hidden">
              
              {/* Sticky Top Header on Mobile & Desktop */}
              <div className="shrink-0 px-4 py-3 sm:px-6 sm:py-3.5 bg-white dark:bg-[#081612] border-b border-slate-200 dark:border-emerald-900/50 flex items-center justify-between gap-2.5 sticky top-0 z-20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-emerald-950/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors shrink-0"
                    title="Tutup / Batal"
                  >
                    <ArrowLeft className="w-4 h-4 sm:hidden" />
                    <X className="w-4 h-4 hidden sm:block" />
                  </button>

                  <div className="min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm font-heading text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                      {editingItem ? (
                        <>
                          <Edit3 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>Edit Artikel</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>Tulis Artikel Baru</span>
                        </>
                      )}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span className="hidden sm:inline">Status:</span>
                      <span
                        className={`font-bold px-1.5 py-0.2 rounded-md ${
                          status === "draft"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}
                      >
                        {status === "draft" ? "Draft" : "Terbit"}
                      </span>
                      <span className="text-slate-400">• Draf otomatis aktif</span>
                    </div>
                  </div>
                </div>

                {/* Right controls: Tab switch & Quick save */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Mode Tab Switcher: Tulis vs Pratinjau */}
                  <div className="flex items-center p-0.5 bg-slate-100 dark:bg-emerald-950/80 rounded-xl border border-slate-200 dark:border-emerald-900/60">
                    <button
                      type="button"
                      onClick={() => setActiveTab("write")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                        activeTab === "write"
                          ? "bg-white dark:bg-[#0E241E] text-emerald-800 dark:text-emerald-300 shadow-xs"
                          : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                      }`}
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Tulis</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                        activeTab === "preview"
                          ? "bg-white dark:bg-[#0E241E] text-emerald-800 dark:text-emerald-300 shadow-xs"
                          : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Pratinjau</span>
                    </button>
                  </div>

                  {/* Quick Save Top Button */}
                  <button
                    type="button"
                    onClick={() => saveArticle()}
                    disabled={!title.trim()}
                    className="px-3 py-1.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center gap-1 hover:bg-[#047857] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span className="hidden sm:inline">Simpan</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Saved Draft Notice Banner */}
                {hasSavedDraftPrompt && !editingItem && (
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                      <span>Ditemukan konsep draf tersimpan dari sesi penulisan di HP ini.</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={handleDiscardDraft}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[10px] font-bold hover:bg-amber-100 transition-colors"
                      >
                        Buang Draf
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasSavedDraftPrompt(false)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-bold hover:bg-amber-600 transition-colors"
                      >
                        Lanjutkan Draf
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "write" ? (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {/* Status Selector Choice Cards */}
                    <div>
                      <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-200">
                        Status Publikasi Artikel *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setStatus("published")}
                          className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                            status === "published"
                              ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20"
                              : "bg-white dark:bg-[#081612] border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
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
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                              Langsung tayang di portal berita website untuk pengunjung umum.
                            </p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setStatus("draft")}
                          className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                            status === "draft"
                              ? "bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500/20"
                              : "bg-white dark:bg-[#081612] border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
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
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                              Tersimpan rapi di CMS Admin untuk disempurnakan sebelum tayang.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Judul Artikel */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold text-slate-700 dark:text-slate-200">
                          Judul Artikel *
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {title.length}/120 karakter
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100 text-sm sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Contoh: Santri SMA Al-Furqon Raih Juara Olimpiade Sains Nasional..."
                      />
                    </div>

                    {/* Kategori Quick Pills */}
                    <div>
                      <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-200">
                        Kategori Artikel *
                      </label>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 active:scale-95 ${
                              category === cat
                                ? "bg-[#064E3B] text-amber-300 shadow-sm border border-amber-400/40"
                                : "bg-white dark:bg-[#081612] text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-emerald-900/40"
                            }`}
                          >
                            {category === cat && <Check className="w-3 h-3 text-amber-300" />}
                            <span>{cat}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Media Upload Section */}
                    <div className="bg-white dark:bg-[#081612] p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 space-y-3.5">
                      <div className="font-bold text-xs text-slate-800 dark:text-slate-200 pb-1 border-b border-slate-100 dark:border-emerald-900/30">
                        Media & Dokumentasi
                      </div>

                      {/* Header Image */}
                      <ImageUploadInput
                        value={image}
                        onChange={(imgData) => setImage(imgData)}
                        label="Foto Utama / Header Artikel (Opsional)"
                      />

                      {/* YouTube Video URL */}
                      <YouTubeInput
                        value={youtubeUrl}
                        onChange={setYoutubeUrl}
                        label="Link Video YouTube (Opsional)"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                        Ringkasan Singkat (Excerpt) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Tulis 1-2 kalimat rangkuman untuk tampilan kartu berita di beranda..."
                        className="w-full p-3 rounded-xl bg-white dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100 text-sm sm:text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Isi Artikel Lengkap with Mobile Formatting Toolbar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-700 dark:text-slate-200">
                          Isi Naskah Artikel Lengkap
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {wordCount} kata • {charCount} karakter
                        </span>
                      </div>

                      {/* Formatting helper chips bar */}
                      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-emerald-950/80 rounded-xl overflow-x-auto pb-1 text-[11px] font-semibold border border-slate-200 dark:border-emerald-900/50 scrollbar-none">
                        <button
                          type="button"
                          onClick={() => insertFormatting("**", "**", "Teks Tebal")}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-xs shrink-0 flex items-center gap-1 font-bold"
                          title="Teks Tebal"
                        >
                          <Bold className="w-3 h-3" />
                          <span>Tebal</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting("*", "*", "Teks Miring")}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-xs shrink-0 flex items-center gap-1 italic"
                          title="Teks Miring"
                        >
                          <Italic className="w-3 h-3" />
                          <span>Miring</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting("\n\n### ", "\n", "Subjudul Artikel")}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-xs shrink-0 flex items-center gap-1 font-bold"
                          title="Subjudul / Heading"
                        >
                          <Heading className="w-3 h-3" />
                          <span>Subjudul</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting("\n- ", "", "Poin informasi")}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-xs shrink-0 flex items-center gap-1"
                          title="Daftar Poin"
                        >
                          <List className="w-3 h-3" />
                          <span>Poin</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting("\n> ", "\n", "Kutipan pernyataan narasumber...")}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-xs shrink-0 flex items-center gap-1"
                          title="Kutipan"
                        >
                          <Quote className="w-3 h-3" />
                          <span>Kutipan</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting("\n\n", "", "")}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#0E241E] text-slate-700 dark:text-slate-200 hover:text-emerald-600 shadow-xs shrink-0 flex items-center gap-1"
                          title="Paragraf Baru"
                        >
                          <CornerDownLeft className="w-3 h-3" />
                          <span>Paragraf Baru</span>
                        </button>
                      </div>

                      <textarea
                        id="mobile-article-content"
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Ketik isi artikel secara lengkap. Tekan tombol pemformatan di atas untuk mempermudah menambahkan subjudul atau poin..."
                        className="w-full p-3 rounded-2xl bg-white dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-slate-900 dark:text-slate-100 text-sm sm:text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[220px]"
                      />
                      <p className="text-[10px] text-slate-400">
                        💡 Tips: Gunakan tombol di atas untuk menyisipkan subjudul atau poin dengan mudah di HP tanpa repot mengetik simbol.
                      </p>
                    </div>
                  </form>
                ) : (
                  /* LIVE PREVIEW TAB (Shows exact mobile reading experience) */
                  <div className="bg-white dark:bg-[#081612] rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-emerald-900/40 shadow-xs space-y-4">
                    <div className="flex items-center justify-between text-[11px] pb-3 border-b border-slate-100 dark:border-emerald-900/30">
                      <span className="font-bold text-slate-500">Pratinjau Tampilan Artikel</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full ${
                          status === "draft"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}
                      >
                        {status === "draft" ? "Mode Draf" : "Mode Terbit"}
                      </span>
                    </div>

                    {/* Featured Image Preview */}
                    {image && (
                      <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-emerald-900/40 bg-slate-950">
                        <img src={image} alt="Header Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Title & Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#064E3B] text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                          {category}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Hari ini</span>
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white leading-snug">
                        {title || "Judul artikel akan tampil di sini..."}
                      </h2>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-emerald-500" />
                        <span>Penulis: Admin SMA Al-Furqon</span>
                      </div>
                    </div>

                    {/* Excerpt Callout */}
                    {excerpt && (
                      <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-emerald-600 text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                        {excerpt}
                      </div>
                    )}

                    {/* Full Content */}
                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-3 pt-2">
                      {content || excerpt || (
                        <p className="text-slate-400 italic">Belum ada naskah isi artikel yang ditulis.</p>
                      )}
                    </div>

                    {/* YouTube Player Preview */}
                    {youtubeUrl && (
                      <div className="pt-3 border-t border-slate-100 dark:border-emerald-900/30">
                        <YouTubePlayer url={youtubeUrl} title={title} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sticky Bottom Action Bar on Mobile & Desktop */}
              <div className="shrink-0 p-3 sm:p-4 bg-white/95 dark:bg-[#081612]/95 backdrop-blur-md border-t border-slate-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-20">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-emerald-950/80 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Batal & Tutup
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Secondary: Save as Draft */}
                  <button
                    type="button"
                    onClick={() => saveArticle("draft")}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-amber-200 active:scale-95 transition-all shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Simpan Draf</span>
                  </button>

                  {/* Primary: Publish */}
                  <button
                    type="button"
                    onClick={() => saveArticle("published")}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#064E3B] text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#047857] active:scale-95 shadow transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{editingItem ? "Perbarui & Terbitkan" : "Publikasikan Artikel"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MOBILE CARD VIEW (Visible on screens < md) */}
        <div className="md:hidden space-y-3">
          {paginatedNews.map((item) => {
            const isItemDraft = item.status === "draft";
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0E241E] p-3.5 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-xs space-y-2.5"
              >
                {/* Card Top: Category, Video badge, and Status */}
                <div className="flex items-center justify-between gap-2 text-[10px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-slate-100 dark:bg-emerald-950 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md font-bold border border-slate-200 dark:border-emerald-900/50">
                      {item.category}
                    </span>
                    {item.youtubeUrl && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 font-bold">
                        <YoutubeIcon className="w-3 h-3" />
                        <span>Video</span>
                      </span>
                    )}
                  </div>

                  <div>
                    {isItemDraft ? (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 px-2 py-0.5 rounded-full font-extrabold border border-amber-300 dark:border-amber-800/60">
                        <FileText className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>Draft</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-300 dark:border-emerald-800/60">
                        <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>Terbit</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Middle: Image and Title */}
                <div className="flex items-start gap-3">
                  {item.image && item.image.trim() !== "" ? (
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-emerald-900/40 bg-slate-100 dark:bg-slate-900"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Newspaper className="w-7 h-7" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Meta: Date & Author */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-emerald-900/30">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                  <span className="truncate max-w-[130px]">Oleh: {item.author}</span>
                </div>

                {/* Card Actions: 4 Touch-Friendly Buttons */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <button
                    onClick={() => toggleItemStatus(item)}
                    className={`py-2 px-1 rounded-xl text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-colors ${
                      isItemDraft
                        ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 active:bg-emerald-200"
                        : "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 active:bg-amber-200"
                    }`}
                    title={isItemDraft ? "Publikasikan Sekarang" : "Tarik Kembali ke Draft"}
                  >
                    {isItemDraft ? <Send className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{isItemDraft ? "Terbitkan" : "Draft"}</span>
                  </button>

                  <Link
                    href={`/berita/${item.slug}`}
                    target="_blank"
                    className="py-2 px-1 rounded-xl bg-slate-100 dark:bg-emerald-950/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-emerald-900/50 text-[10px] font-bold flex flex-col items-center justify-center gap-1 active:bg-slate-200"
                    title="Pratinjau Halaman Artikel"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat</span>
                  </Link>

                  <button
                    onClick={() => openEditModal(item)}
                    className="py-2 px-1 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 text-[10px] font-bold flex flex-col items-center justify-center gap-1 active:bg-blue-200"
                    title="Edit Artikel"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus artikel "${item.title}"?`)) {
                        deleteNews(item.id);
                        showToast("Artikel berhasil dihapus");
                      }
                    }}
                    className="py-2 px-1 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50 text-[10px] font-bold flex flex-col items-center justify-center gap-1 active:bg-red-200"
                    title="Hapus Artikel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP TABLE VIEW (Visible on screens >= md) */}
        <div className="hidden md:block bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-xs">
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
                        {item.image && item.image.trim() !== "" && (
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

                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          className="p-1.5 rounded bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                          title="Pratinjau Halaman Artikel"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

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
        </div>

        {/* Empty State */}
        {paginatedNews.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400 space-y-2 bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40">
            <Newspaper className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p>Tidak ada berita atau artikel yang sesuai dengan filter.</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredNews.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* Floating Action Button (FAB) on Mobile for Quick Article Creation */}
        <button
          onClick={openAddModal}
          className="md:hidden fixed bottom-5 right-4 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-800 to-[#064E3B] text-amber-300 font-bold text-xs flex items-center gap-2 shadow-2xl border border-amber-400/50 active:scale-95 transition-transform"
          aria-label="Tulis Artikel Baru"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tulis Artikel</span>
        </button>
      </main>
    </div>
  );
}
