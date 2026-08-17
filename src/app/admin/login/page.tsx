"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, User, ArrowLeft, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if ((username === "admin" || username === "smalfurqon") && (password === "admin123" || password.length > 0)) {
        localStorage.setItem("sma_admin_token", "authenticated-admin-token-2026");
        router.push("/admin/dashboard");
      } else {
        setError("Username atau Password salah! Gunakan: admin / admin123");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#032B21] via-[#064E3B] to-[#047857] text-white p-4 relative">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Website</span>
      </Link>

      <div className="max-w-md w-full bg-white dark:bg-[#0E241E] text-slate-800 dark:text-white rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-emerald-900/60 space-y-6">
        <div className="text-center space-y-2">
            <img src="/logo.png" alt="Logo SMA Al-Furqon Driyorejo" className="w-20 h-20 mx-auto" />
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            Portal CMS Admin Website
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            SMA Al-Furqon Driyorejo, Gresik
          </p>
        </div>
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Username Admin
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs focus:outline-none focus:ring-2 focus:ring-[#047857] dark:text-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white font-extrabold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
