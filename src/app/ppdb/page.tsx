"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FloatingWidgets } from "@/components/floating-widgets";
import { PPDBSection } from "@/components/ppdb-section";
import { useData } from "@/context/data-context";
import { PPDBApplicant } from "@/lib/types";
import {
  CheckCircle,
  PhoneCall,
  User,
  School,
  Users,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Send,
  AlertCircle,
} from "lucide-react";

export default function PPDBPage() {
  const { submitPPDB } = useData();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Identitas Santri
    fullName: "",
    birthPlace: "",
    birthDate: "",
    gender: "Laki-laki" as "Laki-laki" | "Perempuan",
    siblingsCount: "",
    childNumber: "",
    address: "",
    nik: "",
    nisn: "",

    // Step 2: Data Sekolah Asal
    schoolLevel: "SMP / MTs" as "SMP / MTs" | "Paket B" | "Lainnya",
    customSchoolLevel: "",
    originSchool: "",
    npsnSchool: "",
    originSchoolAddress: "",
    graduationYear: "",

    // Step 3: Identitas Orang Tua
    fatherName: "",
    fatherAddress: "",
    fatherEducation: "SMA / MA / SMK",
    fatherOccupation: "Wiraswasta",
    customFatherOccupation: "",
    fatherPhone: "",

    motherName: "",
    motherAddress: "",
    motherEducation: "SMA / MA / SMK",
    motherOccupation: "IRT",
    customMotherOccupation: "",
    motherPhone: "",

    // Step 4: Identitas Wali
    hasGuardian: "Tidak" as "Tidak" | "Ya",
    guardianName: "",
    guardianAddress: "",
    guardianRelation: "Keluarga",
    customGuardianRelation: "",
    guardianPhone: "",

    // Additional fields
    selectedMajor: "Kurikulum Merdeka Unggulan" as "MIPA / IPA" | "IPS" | "Kurikulum Merdeka Unggulan",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedResult, setSubmittedResult] = useState<PPDBApplicant | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper for numeric inputs
  const handleNumericInput = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, [field]: cleanValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Helper for general inputs
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate Step 1
  const validateStep1 = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Nama lengkap wajib diisi sesuai ijazah.";
    }
    if (!formData.birthPlace.trim()) {
      errs.birthPlace = "Tempat lahir wajib diisi.";
    }
    if (!formData.birthDate) {
      errs.birthDate = "Tanggal lahir wajib diisi.";
    }
    if (!formData.gender) {
      errs.gender = "Pilih jenis kelamin.";
    }
    if (!formData.siblingsCount) {
      errs.siblingsCount = "Jumlah saudara wajib diisi (angka).";
    }
    if (!formData.childNumber) {
      errs.childNumber = "Anak ke wajib diisi (angka).";
    }
    if (!formData.address.trim()) {
      errs.address = "Alamat lengkap tinggal wajib diisi.";
    }

    // NIK validation
    if (!formData.nik.trim()) {
      errs.nik = "NIK Calon Santri wajib diisi.";
    } else if (formData.nik.length !== 16) {
      errs.nik = "NIK harus persis 16 digit angka valid.";
    }

    // NISN validation
    if (!formData.nisn.trim()) {
      errs.nisn = "NISN wajib diisi.";
    } else if (formData.nisn.length !== 10) {
      errs.nisn = "NISN harus persis 10 digit angka valid.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const errs: Record<string, string> = {};

    if (formData.schoolLevel === "Lainnya" && !formData.customSchoolLevel.trim()) {
      errs.customSchoolLevel = "Nama Jenjang Sekolah wajib diisi.";
    }
    if (!formData.originSchool.trim()) {
      errs.originSchool = "Nama sekolah asal wajib diisi.";
    }
    if (!formData.npsnSchool.trim()) {
      errs.npsnSchool = "NPSN Sekolah wajib diisi (angka).";
    }
    if (!formData.originSchoolAddress.trim()) {
      errs.originSchoolAddress = "Alamat sekolah sebelumnya wajib diisi.";
    }
    if (!formData.graduationYear.trim()) {
      errs.graduationYear = "Tahun lulus wajib diisi.";
    } else if (formData.graduationYear.length !== 4) {
      errs.graduationYear = "Tahun lulus harus 4 digit tahun (contoh: 2026).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 3
  const validateStep3 = () => {
    const errs: Record<string, string> = {};

    // Data Bapak
    if (!formData.fatherName.trim()) {
      errs.fatherName = "Nama bapak wajib diisi.";
    }
    if (!formData.fatherAddress.trim()) {
      errs.fatherAddress = "Alamat bapak sesuai KTP wajib diisi.";
    }
    if (!formData.fatherEducation) {
      errs.fatherEducation = "Pendidikan terakhir bapak wajib dipilih.";
    }
    if (!formData.fatherOccupation) {
      errs.fatherOccupation = "Pekerjaan bapak wajib dipilih.";
    }
    if (formData.fatherOccupation === "Lainnya" && !formData.customFatherOccupation.trim()) {
      errs.customFatherOccupation = "Sebutkan pekerjaan bapak.";
    }
    if (!formData.fatherPhone.trim()) {
      errs.fatherPhone = "No. HP bapak wajib diisi.";
    } else if (formData.fatherPhone.length < 10) {
      errs.fatherPhone = "No. HP bapak minimal 10 digit angka.";
    }

    // Data Ibu
    if (!formData.motherName.trim()) {
      errs.motherName = "Nama ibu wajib diisi.";
    }
    if (!formData.motherAddress.trim()) {
      errs.motherAddress = "Alamat ibu sesuai KTP wajib diisi.";
    }
    if (!formData.motherEducation) {
      errs.motherEducation = "Pendidikan terakhir ibu wajib dipilih.";
    }
    if (!formData.motherOccupation) {
      errs.motherOccupation = "Pekerjaan ibu wajib dipilih.";
    }
    if (formData.motherOccupation === "Lainnya" && !formData.customMotherOccupation.trim()) {
      errs.customMotherOccupation = "Sebutkan pekerjaan ibu.";
    }
    if (!formData.motherPhone.trim()) {
      errs.motherPhone = "No. HP ibu wajib diisi.";
    } else if (formData.motherPhone.length < 10) {
      errs.motherPhone = "No. HP ibu minimal 10 digit angka.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 4
  const validateStep4 = () => {
    const errs: Record<string, string> = {};

    if (formData.hasGuardian === "Ya") {
      if (!formData.guardianName.trim()) {
        errs.guardianName = "Nama wali wajib diisi.";
      }
      if (!formData.guardianAddress.trim()) {
        errs.guardianAddress = "Alamat lengkap wali wajib diisi.";
      }
      if (!formData.guardianRelation) {
        errs.guardianRelation = "Hubungan dengan calon santri wajib dipilih.";
      }
      if (formData.guardianRelation === "Lainnya" && !formData.customGuardianRelation.trim()) {
        errs.customGuardianRelation = "Sebutkan hubungan dengan calon santri.";
      }
      if (!formData.guardianPhone.trim()) {
        errs.guardianPhone = "No. HP wali wajib diisi.";
      } else if (formData.guardianPhone.length < 10) {
        errs.guardianPhone = "No. HP wali minimal 10 digit angka.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: document.getElementById("form")?.offsetTop || 300, behavior: "smooth" });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: document.getElementById("form")?.offsetTop || 300, behavior: "smooth" });
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4);
      window.scrollTo({ top: document.getElementById("form")?.offsetTop || 300, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: document.getElementById("form")?.offsetTop || 300, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep4()) return;

    setLoading(true);

    setTimeout(() => {
      // Create payload matching PPDBApplicant
      const finalSchoolLevel =
        formData.schoolLevel === "Lainnya"
          ? formData.customSchoolLevel || "Lainnya"
          : formData.schoolLevel;

      const finalFatherOccupation =
        formData.fatherOccupation === "Lainnya"
          ? formData.customFatherOccupation || "Lainnya"
          : formData.fatherOccupation;

      const finalMotherOccupation =
        formData.motherOccupation === "Lainnya"
          ? formData.customMotherOccupation || "Lainnya"
          : formData.motherOccupation;

      const finalGuardianRelation =
        formData.guardianRelation === "Lainnya"
          ? formData.customGuardianRelation || "Lainnya"
          : formData.guardianRelation;

      const payload = {
        ...formData,
        schoolLevel: formData.schoolLevel,
        customSchoolLevel: formData.customSchoolLevel,
        fatherOccupation: formData.fatherOccupation,
        customFatherOccupation: formData.customFatherOccupation,
        motherOccupation: formData.motherOccupation,
        customMotherOccupation: formData.customMotherOccupation,
        guardianRelation: formData.guardianRelation,
        customGuardianRelation: formData.customGuardianRelation,
        // Computed summaries for compatibility
        parentName: `${formData.fatherName} (Bapak) & ${formData.motherName} (Ibu)`,
        phoneWhatsapp: formData.fatherPhone || formData.motherPhone || formData.guardianPhone || "",
      };

      const result = submitPPDB(payload as any);
      setSubmittedResult(result);
      setLoading(false);

      // Trigger Confetti Effect
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.log(err);
      }
    }, 800);
  };

  const stepsList = [
    { num: 1, label: "Identitas Santri", icon: User },
    { num: 2, label: "Sekolah Asal", icon: School },
    { num: 3, label: "Orang Tua", icon: Users },
    { num: 4, label: "Wali", icon: ShieldCheck },
  ];

  const educationOptions = [
    "Tidak Sekolah",
    "SD / MI",
    "SMP / MTs",
    "SMA / MA / SMK",
    "D.1",
    "D.2",
    "D.3",
    "D.4 / S.1",
    "S.2",
    "S.3",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#091512] text-slate-800 dark:text-slate-100">
      <Navbar />

      <PageHeader
        title="PPDB Online T.A. 2026/2027"
        subtitle="Pendaftaran Peserta Didik Baru SMA Al-Furqon Driyorejo, Gresik."
        breadcrumb={[{ name: "PPDB 2026" }]}
      />

      <main className="flex-1 space-y-16 py-12">
        <PPDBSection />

        {/* Form Container */}
        <section id="form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#0E241E] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-emerald-900/40 shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">
                FORMULIR REGISTRASI ONLINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                Pendaftaran Calon Santri Baru
              </h2>
              <p className="text-xs text-slate-500">
                Silakan lengkapi data pendaftaran di bawah ini secara cermat dan valid.
              </p>
            </div>

            {/* Step Wizard Bar */}
            {!submittedResult && (
              <div className="mb-10">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                  {stepsList.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.num;
                    const isCompleted = currentStep > step.num;

                    return (
                      <div
                        key={step.num}
                        className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                          isActive
                            ? "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold shadow-sm"
                            : isCompleted
                            ? "bg-slate-100 dark:bg-emerald-900/30 border-slate-300 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-50 dark:bg-[#081612] border-slate-200 dark:border-slate-800 text-slate-400"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold mb-1.5 ${
                            isActive
                              ? "bg-emerald-600 text-white"
                              : isCompleted
                              ? "bg-emerald-700 text-amber-300"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold leading-tight">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submission Success */}
            {submittedResult ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/80 p-8 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-amber-300 mx-auto flex items-center justify-center font-bold text-2xl shadow-lg">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h3 className="text-xl font-bold font-heading text-emerald-950 dark:text-emerald-100">
                  Pendaftaran Berhasil Terkirim!
                </h3>

                <p className="text-xs text-emerald-800 dark:text-emerald-200">
                  Nomor Pendaftaran Resmi Anda:
                </p>

                <div className="inline-block bg-[#064E3B] text-amber-300 font-extrabold text-2xl font-heading px-6 py-2 rounded-xl shadow border border-amber-400/40 tracking-wider">
                  {submittedResult.registrationNumber}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto space-y-1 pt-2 bg-white/60 dark:bg-black/20 p-4 rounded-xl text-left border border-emerald-200 dark:border-emerald-900">
                  <p>Nama Lengkap: <strong>{submittedResult.fullName}</strong></p>
                  <p>NIK / NISN: <strong>{submittedResult.nik} / {submittedResult.nisn}</strong></p>
                  <p>Asal Sekolah: <strong>{submittedResult.originSchool}</strong></p>
                  <p>Orang Tua: <strong>{submittedResult.fatherName} (Bapak) & {submittedResult.motherName} (Ibu)</strong></p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/628990703408?text=Halo%20Admin%20PPDB,%20saya%20sudah%20mendaftar%20dengan%20No.%20${submittedResult.registrationNumber}%20atas%20nama%20${submittedResult.fullName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Konfirmasi Via WhatsApp Admin</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedResult(null);
                      setCurrentStep(1);
                      setFormData({
                        fullName: "",
                        birthPlace: "",
                        birthDate: "",
                        gender: "Laki-laki",
                        siblingsCount: "",
                        childNumber: "",
                        address: "",
                        nik: "",
                        nisn: "",
                        schoolLevel: "SMP / MTs",
                        customSchoolLevel: "",
                        originSchool: "",
                        npsnSchool: "",
                        originSchoolAddress: "",
                        graduationYear: "",
                        fatherName: "",
                        fatherAddress: "",
                        fatherEducation: "SMA / MA / SMK",
                        fatherOccupation: "Wiraswasta",
                        customFatherOccupation: "",
                        fatherPhone: "",
                        motherName: "",
                        motherAddress: "",
                        motherEducation: "SMA / MA / SMK",
                        motherOccupation: "IRT",
                        customMotherOccupation: "",
                        motherPhone: "",
                        hasGuardian: "Tidak",
                        guardianName: "",
                        guardianAddress: "",
                        guardianRelation: "Keluarga",
                        customGuardianRelation: "",
                        guardianPhone: "",
                        selectedMajor: "Kurikulum Merdeka Unggulan",
                      });
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-emerald-900 text-slate-800 dark:text-slate-200 font-bold text-xs"
                  >
                    Daftar Santri Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: IDENTITAS CALON SANTRI */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-200 dark:border-emerald-900/50 pb-3 flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-emerald-600" />
                        STEP 1 — IDENTITAS CALON SANTRI
                      </h3>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                        Langkah 1 dari 4
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Nama Lengkap */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Nama Lengkap (Sesuai Ijazah Sebelumnya) *
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Muhammad Hafiz Ar-Rasyid"
                          value={formData.fullName}
                          onChange={(e) => handleChange("fullName", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.fullName ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Tempat Lahir */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Tempat Lahir *
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Gresik"
                          value={formData.birthPlace}
                          onChange={(e) => handleChange("birthPlace", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.birthPlace ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.birthPlace && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.birthPlace}
                          </p>
                        )}
                      </div>

                      {/* Tanggal Lahir */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Tanggal Lahir *
                        </label>
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleChange("birthDate", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.birthDate ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.birthDate && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.birthDate}
                          </p>
                        )}
                      </div>

                      {/* Jenis Kelamin */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Jenis Kelamin *
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleChange("gender", e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>

                      {/* NIK */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          NIK Calon Santri (16 Digit Angka) *
                        </label>
                        <input
                          type="text"
                          maxLength={16}
                          placeholder="Contoh: 3525011405100001"
                          value={formData.nik}
                          onChange={(e) => handleNumericInput("nik", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.nik ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.nik && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.nik}
                          </p>
                        )}
                      </div>

                      {/* NISN */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          NISN (10 Digit Angka) *
                        </label>
                        <input
                          type="text"
                          maxLength={10}
                          placeholder="Contoh: 0089123456"
                          value={formData.nisn}
                          onChange={(e) => handleNumericInput("nisn", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.nisn ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.nisn && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.nisn}
                          </p>
                        )}
                      </div>

                      {/* Jumlah Saudara */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Jumlah Saudara *
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: 2"
                          value={formData.siblingsCount}
                          onChange={(e) => handleNumericInput("siblingsCount", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.siblingsCount ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.siblingsCount && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.siblingsCount}
                          </p>
                        )}
                      </div>

                      {/* Anak Ke */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Anak Ke *
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: 1"
                          value={formData.childNumber}
                          onChange={(e) => handleNumericInput("childNumber", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.childNumber ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.childNumber && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.childNumber}
                          </p>
                        )}
                      </div>

                      {/* Alamat Lengkap Tinggal */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Alamat Lengkap Tinggal *
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Jl. / Dusun / RT / RW, Desa, Kecamatan, Kabupaten/Kota"
                          value={formData.address}
                          onChange={(e) => handleChange("address", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.address ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.address && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: DATA SEKOLAH ASAL */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-200 dark:border-emerald-900/50 pb-3 flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <School className="w-5 h-5 text-emerald-600" />
                        STEP 2 — DATA SEKOLAH ASAL
                      </h3>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                        Langkah 2 dari 4
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Jenjang Sekolah Asal */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Jenjang Sekolah Asal *
                        </label>
                        <select
                          value={formData.schoolLevel}
                          onChange={(e) => handleChange("schoolLevel", e.target.value)}
                          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border border-slate-200 dark:border-emerald-900/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                        >
                          <option value="SMP / MTs">SMP / MTs</option>
                          <option value="Paket B">Paket B</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      {/* Custom Jenjang jika Lainnya */}
                      {formData.schoolLevel === "Lainnya" && (
                        <div>
                          <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                            Nama Jenjang Sekolah *
                          </label>
                          <input
                            type="text"
                            placeholder="Sebutkan jenjang sekolah asal..."
                            value={formData.customSchoolLevel}
                            onChange={(e) => handleChange("customSchoolLevel", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                              errors.customSchoolLevel ? "border-red-500" : "border-amber-300 dark:border-amber-800"
                            }`}
                          />
                          {errors.customSchoolLevel && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.customSchoolLevel}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Nama Sekolah Sebelumnya */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Nama Sekolah Sebelumnya *
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: SMP Negeri 1 Driyorejo / MTs Al-Furqon"
                          value={formData.originSchool}
                          onChange={(e) => handleChange("originSchool", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.originSchool ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.originSchool && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.originSchool}
                          </p>
                        )}
                      </div>

                      {/* NPSN Sekolah */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          NPSN Sekolah *
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: 20501234 (Angka)"
                          value={formData.npsnSchool}
                          onChange={(e) => handleNumericInput("npsnSchool", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.npsnSchool ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.npsnSchool && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.npsnSchool}
                          </p>
                        )}
                      </div>

                      {/* Tahun Lulus */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Tahun Lulus *
                        </label>
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="Contoh: 2026"
                          value={formData.graduationYear}
                          onChange={(e) => handleNumericInput("graduationYear", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.graduationYear ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.graduationYear && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.graduationYear}
                          </p>
                        )}
                      </div>

                      {/* Alamat Sekolah Sebelumnya */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                          Alamat Sekolah Sebelumnya *
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Alamat sekolah asal lengkap..."
                          value={formData.originSchoolAddress}
                          onChange={(e) => handleChange("originSchoolAddress", e.target.value)}
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-[#081612] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                            errors.originSchoolAddress ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                          }`}
                        />
                        {errors.originSchoolAddress && (
                          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.originSchoolAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: IDENTITAS ORANG TUA */}
                {currentStep === 3 && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="border-b border-slate-200 dark:border-emerald-900/50 pb-3 flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        STEP 3 — IDENTITAS ORANG TUA
                      </h3>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                        Langkah 3 dari 4
                      </span>
                    </div>

                    {/* DATA BAPAK */}
                    <div className="space-y-4 bg-slate-50/70 dark:bg-[#081612]/70 p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/40">
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider border-b border-emerald-200 dark:border-emerald-900/40 pb-2">
                        DATA BAPAK
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Nama Bapak */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Nama Bapak *
                          </label>
                          <input
                            type="text"
                            placeholder="Nama lengkap bapak..."
                            value={formData.fatherName}
                            onChange={(e) => handleChange("fatherName", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.fatherName ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.fatherName && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.fatherName}
                            </p>
                          )}
                        </div>

                        {/* No HP Bapak */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            No. HP / WhatsApp Bapak *
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: 081234567890"
                            value={formData.fatherPhone}
                            onChange={(e) => handleNumericInput("fatherPhone", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.fatherPhone ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.fatherPhone && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.fatherPhone}
                            </p>
                          )}
                        </div>

                        {/* Pendidikan Terakhir Bapak */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Pendidikan Terakhir Bapak *
                          </label>
                          <select
                            value={formData.fatherEducation}
                            onChange={(e) => handleChange("fatherEducation", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                          >
                            {educationOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Pekerjaan Bapak */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Pekerjaan Bapak *
                          </label>
                          <select
                            value={formData.fatherOccupation}
                            onChange={(e) => handleChange("fatherOccupation", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                          >
                            <option value="Petani">Petani</option>
                            <option value="Pedagang">Pedagang</option>
                            <option value="Pegawai Swasta">Pegawai Swasta</option>
                            <option value="Wiraswasta">Wiraswasta</option>
                            <option value="PNS">PNS</option>
                            <option value="Guru">Guru</option>
                            <option value="TNI / Polri">TNI / Polri</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>

                        {/* Jika Pekerjaan Bapak === Lainnya */}
                        {formData.fatherOccupation === "Lainnya" && (
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                              Sebutkan Pekerjaan Bapak *
                            </label>
                            <input
                              type="text"
                              placeholder="Tuliskan pekerjaan bapak..."
                              value={formData.customFatherOccupation}
                              onChange={(e) => handleChange("customFatherOccupation", e.target.value)}
                              className={`w-full p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                errors.customFatherOccupation ? "border-red-500" : "border-amber-300 dark:border-amber-800"
                              }`}
                            />
                            {errors.customFatherOccupation && (
                              <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.customFatherOccupation}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Alamat Lengkap Bapak */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Alamat Lengkap Bapak Sesuai KTP *
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Alamat domisili bapak..."
                            value={formData.fatherAddress}
                            onChange={(e) => handleChange("fatherAddress", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.fatherAddress ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.fatherAddress && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.fatherAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* DATA IBU */}
                    <div className="space-y-4 bg-slate-50/70 dark:bg-[#081612]/70 p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/40">
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider border-b border-emerald-200 dark:border-emerald-900/40 pb-2">
                        DATA IBU
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Nama Ibu */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Nama Ibu *
                          </label>
                          <input
                            type="text"
                            placeholder="Nama lengkap ibu..."
                            value={formData.motherName}
                            onChange={(e) => handleChange("motherName", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.motherName ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.motherName && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.motherName}
                            </p>
                          )}
                        </div>

                        {/* No HP Ibu */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            No. HP / WhatsApp Ibu *
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: 081234567891"
                            value={formData.motherPhone}
                            onChange={(e) => handleNumericInput("motherPhone", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.motherPhone ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.motherPhone && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.motherPhone}
                            </p>
                          )}
                        </div>

                        {/* Pendidikan Terakhir Ibu */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Pendidikan Terakhir Ibu *
                          </label>
                          <select
                            value={formData.motherEducation}
                            onChange={(e) => handleChange("motherEducation", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                          >
                            {educationOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Pekerjaan Ibu */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Pekerjaan Ibu *
                          </label>
                          <select
                            value={formData.motherOccupation}
                            onChange={(e) => handleChange("motherOccupation", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                          >
                            <option value="IRT">IRT (Ibu Rumah Tangga)</option>
                            <option value="Pedagang">Pedagang</option>
                            <option value="Swasta">Swasta</option>
                            <option value="Guru">Guru</option>
                            <option value="PNS">PNS</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>

                        {/* Jika Pekerjaan Ibu === Lainnya */}
                        {formData.motherOccupation === "Lainnya" && (
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                              Sebutkan Pekerjaan Ibu *
                            </label>
                            <input
                              type="text"
                              placeholder="Tuliskan pekerjaan ibu..."
                              value={formData.customMotherOccupation}
                              onChange={(e) => handleChange("customMotherOccupation", e.target.value)}
                              className={`w-full p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                errors.customMotherOccupation ? "border-red-500" : "border-amber-300 dark:border-amber-800"
                              }`}
                            />
                            {errors.customMotherOccupation && (
                              <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.customMotherOccupation}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Alamat Lengkap Ibu */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Alamat Lengkap Ibu Sesuai KTP *
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Alamat domisili ibu..."
                            value={formData.motherAddress}
                            onChange={(e) => handleChange("motherAddress", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.motherAddress ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.motherAddress && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.motherAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: IDENTITAS WALI */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-b border-slate-200 dark:border-emerald-900/50 pb-3 flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        STEP 4 — IDENTITAS WALI
                      </h3>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                        Langkah 4 dari 4
                      </span>
                    </div>

                    {/* Pertanyaan Memiliki Wali */}
                    <div className="bg-slate-50 dark:bg-[#081612] p-5 rounded-2xl border border-slate-200 dark:border-emerald-900/50 space-y-3">
                      <label className="block text-xs font-bold text-slate-900 dark:text-white">
                        Apakah Calon Santri Memiliki Wali? *
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-slate-700 dark:text-slate-200">
                          <input
                            type="radio"
                            name="hasGuardian"
                            value="Tidak"
                            checked={formData.hasGuardian === "Tidak"}
                            onChange={() => handleChange("hasGuardian", "Tidak")}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          Tidak
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-slate-700 dark:text-slate-200">
                          <input
                            type="radio"
                            name="hasGuardian"
                            value="Ya"
                            checked={formData.hasGuardian === "Ya"}
                            onChange={() => handleChange("hasGuardian", "Ya")}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          Ya
                        </label>
                      </div>
                    </div>

                    {/* Input data Wali jika Ya */}
                    {formData.hasGuardian === "Ya" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-amber-50/40 dark:bg-amber-950/10 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/30">
                        {/* Nama Wali */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Nama Wali *
                          </label>
                          <input
                            type="text"
                            placeholder="Nama lengkap wali..."
                            value={formData.guardianName}
                            onChange={(e) => handleChange("guardianName", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.guardianName ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.guardianName && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.guardianName}
                            </p>
                          )}
                        </div>

                        {/* No HP Wali */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            No. HP Wali *
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: 081234567899"
                            value={formData.guardianPhone}
                            onChange={(e) => handleNumericInput("guardianPhone", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.guardianPhone ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.guardianPhone && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.guardianPhone}
                            </p>
                          )}
                        </div>

                        {/* Hubungan Wali */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Hubungan dengan Calon Santri *
                          </label>
                          <select
                            value={formData.guardianRelation}
                            onChange={(e) => handleChange("guardianRelation", e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border border-slate-200 dark:border-emerald-900/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857]"
                          >
                            <option value="Keluarga">Keluarga</option>
                            <option value="Saudara">Saudara</option>
                            <option value="Teman">Teman</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>

                        {/* Custom Hubungan jika Lainnya */}
                        {formData.guardianRelation === "Lainnya" && (
                          <div>
                            <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                              Sebutkan Hubungan *
                            </label>
                            <input
                              type="text"
                              placeholder="Contoh: Paman / Kakek"
                              value={formData.customGuardianRelation}
                              onChange={(e) => handleChange("customGuardianRelation", e.target.value)}
                              className={`w-full p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                errors.customGuardianRelation ? "border-red-500" : "border-amber-300 dark:border-amber-800"
                              }`}
                            />
                            {errors.customGuardianRelation && (
                              <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.customGuardianRelation}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Alamat Lengkap Wali */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                            Alamat Lengkap Wali *
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Alamat domisili wali..."
                            value={formData.guardianAddress}
                            onChange={(e) => handleChange("guardianAddress", e.target.value)}
                            className={`w-full p-3 rounded-xl bg-white dark:bg-[#0E241E] border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#047857] ${
                              errors.guardianAddress ? "border-red-500" : "border-slate-200 dark:border-emerald-900/60"
                            }`}
                          />
                          {errors.guardianAddress && (
                            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.guardianAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Form Action Controls */}
                <div className="pt-6 border-t border-slate-200 dark:border-emerald-900/40 flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Kembali</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all"
                    >
                      <span>Lanjut ke Step {currentStep + 1}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0D9488] hover:from-[#047857] hover:to-[#059669] text-white font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? "Mengirim Data..." : "Kirim Formulir Pendaftaran PPDB"}</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
