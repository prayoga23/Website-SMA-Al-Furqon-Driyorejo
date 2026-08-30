"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { Plus, Trash2, Edit3, X, UserCheck, ShieldCheck, Search, Filter, Lock, User, Mail, CheckCircle2, XCircle } from "lucide-react";
import { UserItem } from "@/lib/types";
import { ImageUploadInput } from "@/components/image-upload-input";

export default function AdminUsersPage() {
  const router = useRouter();
  const { users, currentUser, addUser, updateUser, deleteUser } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserItem["role"]>("Administrator");
  const [status, setStatus] = useState<UserItem["status"]>("Aktif");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("sma_admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const openAddModal = () => {
    setEditingUser(null);
    setName("");
    setUsername("");
    setPassword("");
    setRole("Administrator");
    setStatus("Aktif");
    setEmail("");
    setAvatar("");
    setModalOpen(true);
  };

  const openEditModal = (u: UserItem) => {
    setEditingUser(u);
    setName(u.name);
    setUsername(u.username);
    setPassword(u.password);
    setRole(u.role);
    setStatus(u.status);
    setEmail(u.email);
    setAvatar(u.avatar || "");
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultAvatar =
      avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

    const dataPayload = {
      name,
      username,
      password,
      role,
      status,
      email,
      avatar: defaultAvatar,
    };

    if (editingUser) {
      updateUser(editingUser.id, dataPayload);
    } else {
      addUser(dataPayload);
    }

    setModalOpen(false);
  };

  const toggleUserStatus = (u: UserItem) => {
    const nextStatus = u.status === "Aktif" ? "Nonaktif" : "Aktif";
    updateUser(u.id, { status: nextStatus });
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "Semua" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        {/* Header Title & Add User Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Manajemen Multi-User Admin CMS</span>
            </h1>
            <p className="text-xs text-slate-500">
              Kelola akun pengguna, hak akses peranan (roles), status aktif, dan kata sandi admin ({users.length} akun terdaftar).
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Tambah User Admin Baru</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#0E241E] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40 shadow-sm">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari nama, username, atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">Peranan:</span>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 text-xs font-semibold"
            >
              <option value="Semua">Semua Peranan</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Administrator">Administrator</option>
              <option value="Editor Berita">Editor Berita</option>
              <option value="Petugas PPDB">Petugas PPDB</option>
            </select>
          </div>
        </div>

        {/* Modal Add/Edit User */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#0E241E] max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-emerald-900/60 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/40">
                <h3 className="font-bold text-sm font-heading flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{editingUser ? "Edit Akun Pengguna" : "Tambah Pengguna Admin Baru"}</span>
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Rizky, M.Pd."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Username Login *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="username_admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Password Login *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Password login"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                    Email Kontak *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="admin@smaalfurqon.sch.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Hak Akses (Role) *
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-semibold"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Editor Berita">Editor Berita</option>
                      <option value="Petugas PPDB">Petugas PPDB</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-200">
                      Status Akun *
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/50 font-semibold"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>
                </div>

                {/* Avatar Photo Upload */}
                <ImageUploadInput
                  value={avatar}
                  onChange={(imgData) => setAvatar(imgData)}
                  label="Upload Foto Profil / Avatar (Opsional)"
                />

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-emerald-950 font-bold hover:bg-slate-300 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-bold transition-colors shadow"
                  >
                    {editingUser ? "Simpan Perubahan User" : "Tambah User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 dark:text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3">Pengguna</th>
                <th className="p-3">Username & Password</th>
                <th className="p-3">Peranan (Role)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Login Terakhir</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {filteredUsers.map((u) => {
                const isCurrent = currentUser?.id === u.id || currentUser?.username === u.username;
                return (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                          alt={u.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-emerald-800 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {isCurrent && (
                              <span className="bg-amber-100 text-amber-900 text-[9px] px-1.5 py-0.2 rounded font-extrabold border border-amber-300">
                                Anda
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-slate-800 dark:text-slate-200 font-bold">
                        @{u.username}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        pwd: {u.password}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.role === "Super Admin"
                            ? "bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border border-purple-300/40"
                            : u.role === "Administrator"
                            ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40"
                            : "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-300/40"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleUserStatus(u)}
                        title="Klik untuk mengubah status akun"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition-transform active:scale-95 ${
                          u.status === "Aktif"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 hover:bg-red-200"
                        }`}
                      >
                        {u.status === "Aktif" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        <span>{u.status}</span>
                      </button>
                    </td>
                    <td className="p-3 text-slate-500 text-[11px]">{u.lastLogin || "Belum pernah"}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(u)}
                          className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Edit User"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (users.length <= 1) {
                              alert("Tidak dapat menghapus user terakhir.");
                              return;
                            }
                            if (confirm(`Hapus akun pengguna "${u.name}"?`)) {
                              deleteUser(u.id);
                            }
                          }}
                          className="p-1.5 rounded bg-red-100 dark:bg-red-950 text-red-600 hover:bg-red-200 transition-colors"
                          title="Hapus User"
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

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              Tidak ada pengguna yang cocok dengan kriteria pencarian.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
