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
} from "lucide-react";
import { TeacherItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";

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

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [subject, setSubject] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

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

            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-emerald-900 transition-colors border border-slate-200 dark:border-emerald-800/50"
              title="Unduh backup data guru dalam format JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor JSON</span>
            </button>

            <button
              onClick={() => setCodeModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500/20 transition-colors border border-amber-400/40"
              title="Salin Kode TypeScript untuk data-store.ts Netlify"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Salin Kode TS</span>
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
