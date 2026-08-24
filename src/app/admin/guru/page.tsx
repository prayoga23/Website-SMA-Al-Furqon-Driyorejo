"use client";

import React, { useState, useRef } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import {
  Plus,
  Trash2,
  Edit3,
  X,
  Download,
  Upload,
  Code,
  RotateCcw,
  Search,
  Copy,
  Check,
  FileJson,
  UserCheck,
  FileSpreadsheet,
  FileDown,
  FileUp,
  CheckCircle2,
  AlertCircle,
  Layers,
} from "lucide-react";
import { TeacherItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";
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
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";
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
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeacherItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const excelFileInputRef = useRef<HTMLInputElement>(null);

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
    const photoValue =
      photo ||
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";

    if (editingItem) {
      updateTeacher(editingItem.id, {
        name,
        position,
        subject,
        education,
        photo: photoValue,
        bio: bio || undefined,
      });
    } else {
      addTeacher({
        name,
        position,
        subject,
        education,
        photo: photoValue,
        bio: bio || undefined,
      });
    }

    setModalOpen(false);
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(teachers, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `data-guru-al-furqon-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTeachersData(parsed);
          alert(`Berhasil mengimpor ${parsed.length} data guru!`);
        } else {
          alert("Format file JSON tidak valid. Harus berupa array data guru.");
        }
      } catch (err) {
        alert("Gagal membaca file JSON.");
      }
    };
    reader.readAsText(file);
  };

  // Download Excel Template
  const handleDownloadExcelTemplate = () => {
    const templateData = [
      {
        "Nama Lengkap": "Dr. H. Abdul Muid, M.Pd.I.",
        "NIP": "197501012000121001",
        "Jabatan": "Guru Aswaja",
        "Mata Pelajaran": "Guru Aswaja",
        "Pendidikan": "S3 Pendidikan Islam",
        "Foto URL": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
        "Biografi": "Tenaga Pendidik Aswaja SMA Al-Furqon.",
      },
      {
        "Nama Lengkap": "Triana Dewitasari, S.Pd.",
        "NIP": "",
        "Jabatan": "Guru",
        "Mata Pelajaran": "Guru Geografi",
        "Pendidikan": "S1 Pendidikan Geografi",
        "Foto URL": "",
        "Biografi": "Guru Pengampu Geografi.",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);

    // Set column widths for readability
    worksheet["!cols"] = [
      { wch: 30 }, // Nama Lengkap
      { wch: 20 }, // NIP
      { wch: 20 }, // Jabatan
      { wch: 25 }, // Mata Pelajaran
      { wch: 25 }, // Pendidikan
      { wch: 45 }, // Foto URL
      { wch: 35 }, // Biografi
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template Data Guru");
    XLSX.writeFile(workbook, "Template_Import_Guru_Al_Furqon.xlsx");
  };

  // Export Excel
  const handleExportExcel = () => {
    if (teachers.length === 0) {
      alert("Tidak ada data guru untuk diekspor.");
      return;
    }

    const exportRows = teachers.map((item, index) => ({
      No: index + 1,
      "Nama Lengkap": item.name,
      NIP: item.nip || "-",
      Jabatan: item.position,
      "Mata Pelajaran": item.subject,
      Pendidikan: item.education,
      "Foto URL": item.photo || "-",
      Biografi: item.bio || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);

    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 32 },
      { wch: 22 },
      { wch: 22 },
      { wch: 25 },
      { wch: 25 },
      { wch: 45 },
      { wch: 35 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Guru");
    XLSX.writeFile(
      workbook,
      `Data_Guru_SMA_Al_Furqon_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  // Import Excel Handler
  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        const parsedItems: TeacherItem[] = [];
        rawRows.forEach((row, index) => {
          const item = mapExcelRowToTeacher(row, index);
          if (item) {
            parsedItems.push(item);
          }
        });

        if (parsedItems.length === 0) {
          alert(
            "Tidak ada data guru valid yang terdeteksi dari file Excel. Pastikan file memiliki kolom 'Nama' atau 'Nama Lengkap'."
          );
          return;
        }

        setParsedExcelTeachers(parsedItems);
        setExcelModalOpen(true);
      } catch (err) {
        alert("Gagal membaca file Excel. Pastikan file dalam format .xlsx, .xls, atau .csv.");
      } finally {
        if (excelFileInputRef.current) {
          excelFileInputRef.current.value = "";
        }
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirmExcelImport = () => {
    if (parsedExcelTeachers.length === 0) return;

    if (excelImportMode === "replace") {
      setTeachersData(parsedExcelTeachers);
    } else {
      setTeachersData([...teachers, ...parsedExcelTeachers]);
    }

    setExcelModalOpen(false);
    alert(`Berhasil mengimpor ${parsedExcelTeachers.length} data guru dari Excel!`);
  };

  // Generate TS Code string for initialTeachers in data-store.ts
  const generateTSCode = () => {
    return `export const initialTeachers: TeacherItem[] = ${JSON.stringify(teachers, null, 2)};`;
  };

  const handleCopyTSCode = () => {
    navigator.clipboard.writeText(generateTSCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40 gap-4">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Manajemen Guru & Staf</span>
            </h1>
            <p className="text-xs text-slate-500">
              Kelola direktori dewan guru ({teachers.length} guru terdaftar). Foto & data disinkronisasi ke front-end.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Import Excel */}
            <button
              onClick={() => excelFileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-500 shadow transition-colors"
              title="Impor file Excel (.xlsx, .xls, .csv) data guru"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Impor Excel</span>
            </button>
            <input
              type="file"
              ref={excelFileInputRef}
              onChange={handleImportExcel}
              accept=".xlsx, .xls, .csv"
              className="hidden"
            />

            {/* Download Template Excel */}
            <button
              onClick={handleDownloadExcelTemplate}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors border border-emerald-500/30"
              title="Unduh format template file Excel untuk impor data guru"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Template Excel</span>
            </button>

            {/* Ekspor Excel */}
            <button
              onClick={handleExportExcel}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors border border-slate-200 dark:border-emerald-800/50"
              title="Unduh data guru dalam format Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Ekspor Excel</span>
            </button>

            {/* Impor JSON */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors border border-slate-200 dark:border-emerald-800/50"
              title="Impor file JSON data guru"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Impor JSON</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />

            {/* Ekspor JSON */}
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors border border-slate-200 dark:border-emerald-800/50"
              title="Unduh backup data guru dalam format JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor JSON</span>
            </button>

            {/* Salin Kode TS */}
            <button
              onClick={() => setCodeModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/20 transition-colors border border-amber-400/40"
              title="Salin Kode TypeScript untuk data-store.ts Netlify"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Salin Kode TS</span>
            </button>

            {/* Tambah Guru Baru */}
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
                    placeholder="Contoh: Suryanto, S.Pd., M.Pd."
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
                    Mata Pelajaran / Pengampuan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Guru Matematika / Guru UMMI"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Riwayat Pendidikan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: S2 Magister Pendidikan"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Kutipan / Biografi Singkat (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Tenaga Pendidik Matematika SMA Al-Furqon."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                {/* Local File Upload Component */}
                <ImageUploadInput
                  value={photo}
                  onChange={(imgData) => setPhoto(imgData)}
                  label="Upload Pasfoto / Foto Guru *"
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
              {/* Header Modal */}
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

              {/* Status summary */}
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
                    <div className="text-[11px] text-amber-700 dark:text-amber-400">
                      Nama, NIP, Jabatan, Mapel, Pendidikan, Foto & Bio.
                    </div>
                  </div>
                </div>
              </div>

              {/* Import Options */}
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
                      <span className="font-bold block text-slate-800 dark:text-white">
                        Tambahkan ke Data Saat Ini (Append)
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Menambahkan {parsedExcelTeachers.length} guru baru tanpa menghapus data yang ada.
                      </span>
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
                      <span className="font-bold block text-red-600 dark:text-red-400">
                        Ganti Semua Data (Overwrite)
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Menghapus data guru lama dan menggantinya dengan isi file Excel ini.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Data Table Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Pratinjau Baris Data ({parsedExcelTeachers.length} guru)
                  </span>
                  <span className="text-[10px] text-slate-400">Menampilkan maksimal 10 baris pertama</span>
                </div>
                <div className="border border-slate-200 dark:border-emerald-900/50 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 dark:bg-emerald-950/80 text-slate-600 dark:text-slate-300 font-bold">
                      <tr>
                        <th className="p-2.5">No</th>
                        <th className="p-2.5">Nama Guru</th>
                        <th className="p-2.5">Jabatan</th>
                        <th className="p-2.5">Mata Pelajaran</th>
                        <th className="p-2.5">Pendidikan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30 text-slate-700 dark:text-slate-300">
                      {parsedExcelTeachers.slice(0, 10).map((t, idx) => (
                        <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-emerald-950/30">
                          <td className="p-2.5 font-mono text-[11px] text-slate-400">{idx + 1}</td>
                          <td className="p-2.5 font-bold text-slate-900 dark:text-white">
                            <div>{t.name}</div>
                            {t.nip && <div className="text-[10px] text-slate-400 font-normal">NIP: {t.nip}</div>}
                          </td>
                          <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-medium">{t.position}</td>
                          <td className="p-2.5">{t.subject}</td>
                          <td className="p-2.5 text-slate-500">{t.education}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {parsedExcelTeachers.length > 10 && (
                    <div className="p-2.5 bg-slate-50 dark:bg-emerald-950/40 text-center text-[11px] text-slate-500 font-medium border-t border-slate-100 dark:border-emerald-900/30">
                      ...dan {parsedExcelTeachers.length - 10} data guru lainnya.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Modal Footer */}
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

        {/* Code TS Export Modal */}
        {codeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-2xl w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-emerald-900/60">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-sm font-heading">
                    Kode TypeScript untuk data-store.ts (Sync Build Netlify)
                  </h3>
                </div>
                <button onClick={() => setCodeModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Salin kode array ini dan ganti nilai <code>initialTeachers</code> di file{" "}
                <code className="text-emerald-600 font-bold">src/lib/data-store.ts</code>. Ketika di-push ke GitHub,
                build Netlify akan langsung menampilkan data guru dan foto terbaru Anda untuk semua pengunjung!
              </p>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-72 border border-slate-800 select-all">
                  {generateTSCode()}
                </pre>
                <button
                  onClick={handleCopyTSCode}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-500 transition-colors shadow"
                >
                  {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Tersalin!" : "Salin Kode"}</span>
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setCodeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-600"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teachers Table */}
        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3.5">Nama Guru</th>
                <th className="p-3.5">Jabatan</th>
                <th className="p-3.5">Mata Pelajaran</th>
                <th className="p-3.5">Pendidikan</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {filteredTeachers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/40 shadow-sm shrink-0"
                        onError={(e) => {
                          // Image load fallback
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-400/40 shrink-0">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="block font-bold">{item.name}</span>
                      {item.bio && <span className="text-[10px] text-slate-400 font-normal line-clamp-1">{item.bio}</span>}
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-700 dark:text-emerald-400">{item.position}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{item.subject}</td>
                  <td className="p-3.5 text-slate-500">{item.education}</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-200 transition-colors"
                        title="Edit Data Guru"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus data guru ${item.name}?`)) {
                            deleteTeacher(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-200 transition-colors"
                        title="Hapus Data Guru"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTeachers.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              Tidak ada data guru yang ditemukan.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
