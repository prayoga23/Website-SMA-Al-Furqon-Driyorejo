"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, X, UserCheck } from "lucide-react";
import { TeacherItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";

export default function AdminGuruPage() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeacherItem | null>(null);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [subject, setSubject] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setPosition("");
    setSubject("");
    setEducation("");
    setPhoto("");
    setModalOpen(true);
  };

  const openEditModal = (item: TeacherItem) => {
    setEditingItem(item);
    setName(item.name);
    setPosition(item.position);
    setSubject(item.subject);
    setEducation(item.education);
    setPhoto(item.photo || "");
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
      });
    } else {
      addTeacher({
        name,
        position,
        subject,
        education,
        photo: photoValue,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Manajemen Guru & Staf
            </h1>
            <p className="text-xs text-slate-500">Kelola direktori dewan guru dan tenaga pendidik.</p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-600 shadow transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Guru Baru</span>
          </button>
        </div>

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
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 font-bold"
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

        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">Nama Guru</th>
                <th className="p-3">Jabatan</th>
                <th className="p-3">Mata Pelajaran</th>
                <th className="p-3">Pendidikan</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {teachers.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <img src={item.photo} alt={item.name} className="w-9 h-9 rounded-full object-cover border border-emerald-500/30" />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-3 font-medium text-emerald-700 dark:text-emerald-400">{item.position}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{item.subject}</td>
                  <td className="p-3 text-slate-500">{item.education}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 hover:bg-blue-200 transition-colors"
                        title="Edit Data Guru"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTeacher(item.id)}
                        className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
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
        </div>
      </main>
    </div>
  );
}
