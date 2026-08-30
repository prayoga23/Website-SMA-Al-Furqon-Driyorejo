"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useData } from "@/context/data-context";
import { PPDBApplicant } from "@/lib/types";
import { Users, PhoneCall, CheckCircle, Eye, X, User, School, ShieldCheck } from "lucide-react";
import { Pagination } from "@/components/pagination";

export default function AdminPPDBPage() {
  const { applicants, updateApplicantStatus } = useData();
  const [selectedApplicant, setSelectedApplicant] = useState<PPDBApplicant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const paginatedApplicants = applicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FDFBF7] dark:bg-[#081612] text-slate-800 dark:text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-emerald-900/40">
          <div>
            <h1 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              Data Pendaftar PPDB 2026/2027
            </h1>
            <p className="text-xs text-slate-500">
              Kelola, lihat detail 4-step, dan verifikasi status penerimaan calon santri baru.
            </p>
          </div>

          <div className="bg-[#064E3B] text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-400/40">
            Total Pendaftar: {applicants.length} Santri
          </div>
        </div>

        <div className="bg-white dark:bg-[#0E241E] rounded-2xl border border-slate-200 dark:border-emerald-900/40 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-emerald-950/60 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-3">No. Reg</th>
                <th className="p-3">Nama Santri</th>
                <th className="p-3">Gender / NIK</th>
                <th className="p-3">NISN</th>
                <th className="p-3">Asal Sekolah</th>
                <th className="p-3">Ortu / WA</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/30">
              {paginatedApplicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-emerald-950/30">
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                    {app.registrationNumber}
                  </td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">
                    {app.fullName}
                  </td>
                  <td className="p-3 text-slate-500">
                    <div>{app.gender}</div>
                    <div className="text-[10px] font-mono text-slate-400">NIK: {app.nik || "-"}</div>
                  </td>
                  <td className="p-3 font-mono text-slate-500">{app.nisn || "-"}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    <div>{app.originSchool}</div>
                    <div className="text-[10px] text-slate-400">{app.schoolLevel}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {app.fatherName ? `${app.fatherName} (Bpk)` : app.parentName || "-"}
                    </div>
                    {app.fatherPhone || app.phoneWhatsapp ? (
                      <a
                        href={`https://wa.me/${(app.fatherPhone || app.phoneWhatsapp || "").replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-emerald-600 font-mono hover:underline flex items-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3" /> {app.fatherPhone || app.phoneWhatsapp}
                      </a>
                    ) : null}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === "Diterima"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                          : app.status === "Terverifikasi"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : app.status === "Ditolak"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detail</span>
                      </button>

                      <select
                        value={app.status}
                        onChange={(e) => updateApplicantStatus(app.id, e.target.value as any)}
                        className="bg-slate-100 dark:bg-emerald-950 p-1.5 rounded text-[11px] font-medium border border-slate-200 dark:border-emerald-900/50 text-slate-800 dark:text-slate-200"
                      >
                        <option value="Menunggu Verifikasi">Menunggu</option>
                        <option value="Terverifikasi">Terverifikasi</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applicants.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              Belum ada data pendaftar PPDB yang masuk.
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(applicants.length / itemsPerPage)}
          totalItems={applicants.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>

      {/* DETAIL MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0E241E] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-emerald-900/40 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-emerald-900/40 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">
                  DETAIL LENGKAP PENDAFTAR
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  {selectedApplicant.fullName}
                  <span className="text-xs font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                    {selectedApplicant.registrationNumber}
                  </span>
                </h3>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-emerald-950 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1 DETAIL */}
            <div className="space-y-3 bg-slate-50 dark:bg-[#081612] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40">
              <h4 className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> STEP 1 — IDENTITAS CALON SANTRI
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Nama Lengkap:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedApplicant.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tempat, Tanggal Lahir:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.birthPlace || "-"}, {selectedApplicant.birthDate || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Jenis Kelamin:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedApplicant.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">NIK Calon Santri:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.nik || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">NISN:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.nisn || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Jumlah Saudara / Anak Ke:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.siblingsCount || "-"} Saudara / Anak ke-{selectedApplicant.childNumber || "-"}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block">Alamat Lengkap Tinggal:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedApplicant.address}</span>
                </div>
              </div>
            </div>

            {/* STEP 2 DETAIL */}
            <div className="space-y-3 bg-slate-50 dark:bg-[#081612] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40">
              <h4 className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <School className="w-4 h-4" /> STEP 2 — DATA SEKOLAH ASAL
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Jenjang Sekolah Asal:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.schoolLevel === "Lainnya"
                      ? selectedApplicant.customSchoolLevel || "Lainnya"
                      : selectedApplicant.schoolLevel || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Nama Sekolah Sebelumnya:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedApplicant.originSchool}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">NPSN Sekolah:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.npsnSchool || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tahun Lulus:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.graduationYear || "-"}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block">Alamat Sekolah Sebelumnya:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {selectedApplicant.originSchoolAddress || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 3 DETAIL */}
            <div className="space-y-3 bg-slate-50 dark:bg-[#081612] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40">
              <h4 className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" /> STEP 3 — IDENTITAS ORANG TUA
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Bapak */}
                <div className="bg-white dark:bg-[#0E241E] p-3 rounded-xl border border-slate-200 dark:border-emerald-900/40 space-y-1.5">
                  <div className="font-bold text-amber-600 dark:text-amber-400">DATA BAPAK</div>
                  <div><span className="text-slate-400">Nama:</span> <strong>{selectedApplicant.fatherName || selectedApplicant.parentName || "-"}</strong></div>
                  <div><span className="text-slate-400">No. HP:</span> <strong className="font-mono">{selectedApplicant.fatherPhone || selectedApplicant.phoneWhatsapp || "-"}</strong></div>
                  <div><span className="text-slate-400">Pendidikan:</span> <strong>{selectedApplicant.fatherEducation || "-"}</strong></div>
                  <div>
                    <span className="text-slate-400">Pekerjaan:</span>{" "}
                    <strong>
                      {selectedApplicant.fatherOccupation === "Lainnya"
                        ? selectedApplicant.customFatherOccupation || "Lainnya"
                        : selectedApplicant.fatherOccupation || "-"}
                    </strong>
                  </div>
                  <div><span className="text-slate-400">Alamat:</span> <strong>{selectedApplicant.fatherAddress || selectedApplicant.address || "-"}</strong></div>
                </div>

                {/* Ibu */}
                <div className="bg-white dark:bg-[#0E241E] p-3 rounded-xl border border-slate-200 dark:border-emerald-900/40 space-y-1.5">
                  <div className="font-bold text-amber-600 dark:text-amber-400">DATA IBU</div>
                  <div><span className="text-slate-400">Nama:</span> <strong>{selectedApplicant.motherName || "-"}</strong></div>
                  <div><span className="text-slate-400">No. HP:</span> <strong className="font-mono">{selectedApplicant.motherPhone || "-"}</strong></div>
                  <div><span className="text-slate-400">Pendidikan:</span> <strong>{selectedApplicant.motherEducation || "-"}</strong></div>
                  <div>
                    <span className="text-slate-400">Pekerjaan:</span>{" "}
                    <strong>
                      {selectedApplicant.motherOccupation === "Lainnya"
                        ? selectedApplicant.customMotherOccupation || "Lainnya"
                        : selectedApplicant.motherOccupation || "-"}
                    </strong>
                  </div>
                  <div><span className="text-slate-400">Alamat:</span> <strong>{selectedApplicant.motherAddress || "-"}</strong></div>
                </div>
              </div>
            </div>

            {/* STEP 4 DETAIL */}
            <div className="space-y-3 bg-slate-50 dark:bg-[#081612] p-4 rounded-2xl border border-slate-200 dark:border-emerald-900/40">
              <h4 className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> STEP 4 — IDENTITAS WALI
              </h4>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-slate-400">Memiliki Wali:</span>{" "}
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedApplicant.hasGuardian || "Tidak"}
                  </span>
                </div>

                {selectedApplicant.hasGuardian === "Ya" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white dark:bg-[#0E241E] p-3 rounded-xl border border-slate-200 dark:border-emerald-900/40">
                    <div>
                      <span className="text-slate-400 block">Nama Wali:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {selectedApplicant.guardianName || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">No. HP Wali:</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">
                        {selectedApplicant.guardianPhone || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Hubungan:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {selectedApplicant.guardianRelation === "Lainnya"
                          ? selectedApplicant.customGuardianRelation || "Lainnya"
                          : selectedApplicant.guardianRelation || "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Alamat Wali:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {selectedApplicant.guardianAddress || "-"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer / Actions */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-emerald-900/40 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold">Status Pendaftaran:</span>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as PPDBApplicant["status"];
                    updateApplicantStatus(selectedApplicant.id, newStatus);
                    setSelectedApplicant({ ...selectedApplicant, status: newStatus });
                  }}
                  className="bg-slate-100 dark:bg-emerald-950 p-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-emerald-900/60 text-slate-900 dark:text-white"
                >
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Terverifikasi">Terverifikasi</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-emerald-900 text-slate-800 dark:text-slate-200 text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
