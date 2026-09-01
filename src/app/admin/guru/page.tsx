"use client";

import React, { useState, useRef, useEffect } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import {
  Plus,
  Trash2,
  Edit3,
  X,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  Layers,
  FileSpreadsheet,
  FileDown,
  FileUp,
} from "lucide-react";
import { TeacherItem } from "@/lib/types";
import { sortTeachersByPriority } from "@/lib/data-store";
import { ImageUploadInput } from "@/components/image-upload-input";
import { Pagination } from "@/components/pagination";
import * as XLSX from "xlsx";

function mapExcelRowToTeacher(row: Record<string, any>, index: number): TeacherItem | null {
  const getValue = (candidateKeys: string[]): string => {
    for (const key of Object.keys(row)) {
      const cleanKey = key.trim().toLowerCase();
      if (candidateKeys.some((ck) => cleanKey.includes(ck.toLowerCase()))) {
        const val = row[key];
        if (val !== undefined && val !== null && String(val).trim() !== "") {
          return String(val).trim();
        }
      }
    }
    return "";
  };

  const name = getValue(["nama lengkap", "nama guru", "nama", "name"]);
  if (!name) return null;

  const nip = getValue(["nip guru", "no nip", "nip"]);
  const position = getValue(["jabatan", "position", "role"]) || "Guru";
  const subject = getValue(["mata pelajaran", "mapel", "subject", "pengampuan"]) || "Guru Pengampu";
  const education = getValue(["pendidikan terakhir", "pendidikan", "education", "gelar"]) || "S1 Pendidikan";
  const photo =
    getValue(["foto url", "url foto", "foto", "photo", "image"]) ||
    "";
  const bio = getValue(["biografi", "bio", "keterangan", "deskripsi"]);

  return {
    id: `excel-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
    name,
    nip: nip || undefined,
    position,
    subject,
    education,
    photo,
    bio: bio || undefined,
  };
}

export default function AdminGuruPage() {
  const {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    setTeachersData,
    resetTeachersToDefault,
  } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeacherItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Excel Import states
  const [excelModalOpen, setExcelModalOpen] = useState(false);
  const [parsedExcelTeachers, setParsedExcelTeachers] = useState<TeacherItem[]>([]);
  const [excelImportMode, setExcelImportMode] = useState<"append" | "replace">("append");
  const [excelFileName, setExcelFileName] = useState("");
  const [excelRawRowCount, setExcelRawRowCount] = useState(0);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [subject, setSubject] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");

  const excelFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setPosition("");
    setSubject("");
    setEducation("");
    setPhoto("");
    setBio("");
    setModalOpen(true);
  };

  const openEditModal = (item: TeacherItem) => {
    setEditingItem(item);
    setName(item.name);
    setPosition(item.position);
    setSubject(item.subject);
    setEducation(item.education);
    setPhoto(item.photo || "");
    setBio(item.bio || "");
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) return;

    if (editingItem) {
      updateTeacher(editingItem.id, {
        ...editingItem,
        name,
        position,
        subject,
        education,
        photo,
        bio,
      });
    } else {
      addTeacher({
        name,
        position,
        subject,
        education,
        photo,
        bio,
      });
    }
    setModalOpen(false);
  };

  // Download Excel Template
  const handleDownloadExcelTemplate = () => {
    const templateData = [
      {
        "Nama Lengkap": "Dr. H. Abdul Muid, M.Pd.I.",
        "NIP": "197501012000011001",
        "Jabatan": "Kadep Pendidikan",
        "Mata Pelajaran": "Guru Aswaja",
        "Pendidikan Terakhir": "S3 / Doktor Pendidikan Agama Islam",
        "URL Foto": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
        "Biografi": "Kepala Departemen Pendidikan Yayasan PP. Al-Furqon.",
      },
      {
        "Nama Lengkap": "Dr. Suryanto, S.Pd., M.Pd.",
        "NIP": "198002022005011002",
        "Jabatan": "Kepala Sekolah",
        "Mata Pelajaran": "Manajemen Sekolah",
        "Pendidikan Terakhir": "S2 Magister Pendidikan",
        "URL Foto": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        "Biografi": "Kepala Sekolah SMA Al-Furqon Driyorejo.",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template Data Guru");
    XLSX.writeFile(workbook, "Template_Impor_Guru_SMA_Al_Furqon.xlsx");
  };

  // Export Excel
  const handleExportExcel = () => {
    const exportRows = teachers.map((t, idx) => ({
      No: idx + 1,
      "ID Guru": t.id,
      "Nama Lengkap": t.name,
      NIP: t.nip || "-",
      Jabatan: t.position,
      "Mata Pelajaran": t.subject,
      "Pendidikan Terakhir": t.education,
      "URL Foto": t.photo || "-",
      Biografi: t.bio || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Guru & Staf");
    XLSX.writeFile(workbook, `Data_Guru_SMA_Al_Furqon_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // Handle Select Excel File
  const handleExcelFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        setExcelRawRowCount(rawRows.length);

        const parsedList: TeacherItem[] = [];
        rawRows.forEach((row, idx) => {
          const item = mapExcelRowToTeacher(row, idx);
          if (item) parsedList.push(item);
        });

        if (parsedList.length === 0) {
          alert("Tidak ditemukan baris data guru yang valid di file Excel tersebut.");
          return;
        }

        setParsedExcelTeachers(parsedList);
        setExcelModalOpen(true);
      } catch (error) {
        alert("Gagal membaca file Excel. Pastikan format file ber-ekstensi .xlsx atau .xls");
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = "";
  };

  // Confirm Excel Import
  const handleConfirmExcelImport = () => {
    if (parsedExcelTeachers.length === 0) return;

    if (excelImportMode === "replace") {
      setTeachersData(parsedExcelTeachers);
    } else {
      const merged = [...teachers];
      parsedExcelTeachers.forEach((newItem) => {
        const existingIdx = merged.findIndex(
          (m) =>
            m.name.trim().toLowerCase() === newItem.name.trim().toLowerCase() ||
            (m.nip && newItem.nip && m.nip.trim() === newItem.nip.trim())
        );

        if (existingIdx !== -1) {
          merged[existingIdx] = {
            ...merged[existingIdx],
            ...newItem,
            id: merged[existingIdx].id,
          };
        } else {
          merged.push(newItem);
        }
      });
      setTeachersData(merged);
    }

    setExcelModalOpen(false);
    alert(`Berhasil mengimpor ${parsedExcelTeachers.length} data guru dari Excel!`);
  };

  const filteredTeachers = sortTeachersByPriority(
    teachers.filter(
      (t) =>
        (t.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.position || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.subject || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-7xl w-full min-w-0">
        {/* Header Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold font-heading flex items-center gap-2 text-slate-900 dark:text-white">
              <span>Manajemen Guru & Staf</span>
            </h1>
            <p className="text-xs text-slate-500">
              Kelola direktori dewan guru ({teachers.length} guru terdaftar). Foto & data disinkronisasi ke front-end.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="file"
              ref={excelFileInputRef}
              onChange={handleExcelFileSelect}
              accept=".xlsx, .xls"
              className="hidden"
            />

            <button
              onClick={() => excelFileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500 transition-colors shadow-sm"
              title="Unggah file Excel data guru (.xlsx)"
            >
              <FileUp className="w-4 h-4" />
              <span>Impor Excel</span>
            </button>

            <button
              onClick={handleDownloadExcelTemplate}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors border border-emerald-500/30"
              title="Unduh format template file Excel untuk impor data guru"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Template Excel</span>
            </button>

            <button
              onClick={handleExportExcel}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors border border-slate-200 dark:border-emerald-800/50"
              title="Unduh data guru dalam format Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ekspor Excel</span>
            </button>

            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-600 shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Guru Baru</span>
            </button>
          </div>
        </div>

        {/* Search & Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari nama guru, jabatan, atau mata pelajaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">
              Total: <strong className="text-slate-800 dark:text-slate-100">{filteredTeachers.length}</strong> guru
            </span>
            <button
              onClick={() => {
                if (confirm("Kembalikan data guru ke data bawaan awal (initialTeachers)?")) {
                  resetTeachersToDefault();
                }
              }}
              className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* Add / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-emerald-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading">
                  {editingItem ? "Edit Data Guru & Staf" : "Tambah Guru Baru"}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Nama Lengkap Guru & Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Dr. Suryanto, S.Pd., M.Pd."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Jabatan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kepala Sekolah / Guru Biologi / Wk. Kurikulum"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Mata Pelajaran Ampuan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Biologi / PAI / Manajemen Sekolah"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Pendidikan Terakhir
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: S1 Pendidikan Biologi Unesa"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Biografi / Keterangan Singkat
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Tenaga Pendidik Matematika SMA Al-Furqon."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <ImageUploadInput
                  value={photo}
                  onChange={(imgData) => setPhoto(imgData)}
                  label="Upload Pasfoto / Foto Guru"
                />

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 font-bold text-slate-700 dark:text-slate-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-600 transition-colors"
                  >
                    {editingItem ? "Simpan Perubahan" : "Simpan Guru"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Excel Import Preview Modal */}
        {excelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-3xl w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-emerald-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm font-heading text-slate-900 dark:text-white">
                      Pratinjau Impor Data Excel
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono line-clamp-1">{excelFileName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setExcelModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      {parsedExcelTeachers.length} Baris Valid Terdeteksi
                    </div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      Dari total {excelRawRowCount} baris di dalam file Excel.
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-200">Pencocokan Kolom Otomatis</div>
                    <div className="text-[11px] text-amber-400">
                      Nama, NIP, Jabatan, Mapel, Pendidikan, Foto & Bio.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Pilih Metode Impor Data:</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#0E241E] flex-1 hover:border-emerald-500 transition-colors">
                    <input
                      type="radio"
                      name="excelImportMode"
                      value="append"
                      checked={excelImportMode === "append"}
                      onChange={() => setExcelImportMode("append")}
                      className="accent-emerald-600"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Gabungkan Data (Append)</div>
                      <div className="text-[10px] text-slate-500">Perbarui data guru yang ada, tambah guru baru.</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#0E241E] flex-1 hover:border-emerald-500 transition-colors">
                    <input
                      type="radio"
                      name="excelImportMode"
                      value="replace"
                      checked={excelImportMode === "replace"}
                      onChange={() => setExcelImportMode("replace")}
                      className="accent-emerald-600"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Ganti Semua Data (Replace)</div>
                      <div className="text-[10px] text-slate-500">Hapus data guru lama, ganti murni dari Excel.</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-emerald-900/40">
                <button
                  type="button"
                  onClick={() => setExcelModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 font-bold text-slate-700 dark:text-slate-200 text-xs hover:bg-slate-300 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmExcelImport}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow transition-colors flex items-center gap-1.5"
                >
                  <FileUp className="w-4 h-4" />
                  <span>Proses Impor ({parsedExcelTeachers.length} Guru)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Teacher Cards Grid */}
        {paginatedTeachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedTeachers.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full group"
              >
                <div className="space-y-3">
                  {/* Card Header: Avatar & Main info */}
                  <div className="flex items-center gap-3">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40 shadow-sm shrink-0 group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=064E3B&color=fff`;
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-base flex items-center justify-center border border-emerald-400/40 shrink-0">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                        {item.position}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-1.5 text-xs border-t border-slate-100 dark:border-emerald-900/30 pt-3">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-slate-400 font-medium">Mapel:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{item.subject}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-slate-400 font-medium">Pendidikan:</span>
                      <span className="font-semibold text-slate-500 dark:text-slate-400 truncate">{item.education}</span>
                    </div>
                    {item.bio && (
                      <p className="text-[10px] text-slate-400 dark:text-slate-400 italic line-clamp-2 pt-1 border-t border-slate-50 dark:border-emerald-950">
                        "{item.bio}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-bold text-[11px] flex items-center gap-1 transition-colors border border-blue-200 dark:border-blue-900/40"
                    title="Edit Data Guru"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus data guru ${item.name}?`)) {
                        deleteTeacher(item.id);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-100 font-bold text-[11px] flex items-center gap-1 transition-colors border border-red-200 dark:border-red-900/40"
                    title="Hapus Data Guru"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 p-8 text-center text-xs text-slate-400 shadow-sm">
            Tidak ada data guru yang ditemukan.
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTeachers.length / itemsPerPage)}
          totalItems={filteredTeachers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
