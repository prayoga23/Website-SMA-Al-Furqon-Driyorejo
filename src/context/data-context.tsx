"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  SchoolInfo,
  NewsItem,
  AgendaItem,
  AchievementItem,
  TeacherItem,
  ExtracurricularItem,
  GalleryItem,
  PPDBApplicant,
  FAQItem,
  TestimonialItem,
  FacilityItem,
  UserItem,
} from "@/lib/types";
import {
  initialSchoolInfo,
  initialNews,
  initialAgenda,
  initialAchievements,
  initialTeachers,
  initialExtracurriculars,
  initialGallery,
  initialApplicants,
  initialFAQs,
  initialTestimonials,
  initialFacilities,
  initialUsers,
} from "@/lib/data-store";
import { KesiswaanActivity, initialKesiswaanActivities } from "@/lib/kesiswaan-data";

interface DataContextType {
  schoolInfo: SchoolInfo;
  news: NewsItem[];
  agendas: AgendaItem[];
  achievements: AchievementItem[];
  teachers: TeacherItem[];
  extracurriculars: ExtracurricularItem[];
  gallery: GalleryItem[];
  applicants: PPDBApplicant[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  facilities: FacilityItem[];
  users: UserItem[];
  kesiswaanActivities: KesiswaanActivity[];
  currentUser: UserItem | null;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  refreshData: () => Promise<void>;
  // State Mutations (Admin CMS Actions)
  updateSchoolInfo: (info: Partial<SchoolInfo>) => void;
  addNews: (item: Omit<NewsItem, "id">) => void;
  updateNews: (id: string, item: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  addAgenda: (item: Omit<AgendaItem, "id">) => void;
  updateAgenda: (id: string, item: Partial<AgendaItem>) => void;
  deleteAgenda: (id: string) => void;
  addAchievement: (item: Omit<AchievementItem, "id">) => void;
  updateAchievement: (id: string, item: Partial<AchievementItem>) => void;
  deleteAchievement: (id: string) => void;
  addTeacher: (item: Omit<TeacherItem, "id">) => void;
  updateTeacher: (id: string, item: Partial<TeacherItem>) => void;
  deleteTeacher: (id: string) => void;
  setTeachersData: (items: TeacherItem[]) => void;
  resetTeachersToDefault: () => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  addFacility: (item: Omit<FacilityItem, "id">) => void;
  updateFacility: (id: string, item: Partial<FacilityItem>) => void;
  deleteFacility: (id: string) => void;
  addExtracurricular: (item: Omit<ExtracurricularItem, "id">) => void;
  updateExtracurricular: (id: string, item: Partial<ExtracurricularItem>) => void;
  deleteExtracurricular: (id: string) => void;
  addKesiswaanActivity: (item: Omit<KesiswaanActivity, "id">) => void;
  updateKesiswaanActivity: (id: string, item: Partial<KesiswaanActivity>) => void;
  deleteKesiswaanActivity: (id: string) => void;
  addTestimonial: (item: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  addFAQ: (item: Omit<FAQItem, "id">) => void;
  updateFAQ: (id: string, item: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  addUser: (item: Omit<UserItem, "id">) => void;
  updateUser: (id: string, item: Partial<UserItem>) => void;
  deleteUser: (id: string) => void;
  loginUser: (username: string, password: string) => { success: boolean; message?: string; user?: UserItem };
  logoutUser: () => void;
  submitPPDB: (applicant: Omit<PPDBApplicant, "id" | "registrationNumber" | "registrationDate" | "status">) => PPDBApplicant;
  submitPSB: (applicant: Omit<PPDBApplicant, "id" | "registrationNumber" | "registrationDate" | "status">) => PPDBApplicant;
  updateApplicantStatus: (id: string, status: PPDBApplicant["status"]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = "sma_alfurqon_";

export const DataProvider: React.FC<{
  children: React.ReactNode;
  initialData?: any;
}> = ({ children, initialData }) => {
  const [darkMode, setDarkModeState] = useState<boolean>(false);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(initialData?.schoolInfo || initialSchoolInfo);
  const [news, setNews] = useState<NewsItem[]>(initialData?.news ?? []);
  const [agendas, setAgendas] = useState<AgendaItem[]>(initialData?.agendas ?? []);
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialData?.achievements ?? []);
  const [teachers, setTeachers] = useState<TeacherItem[]>(initialData?.teachers ?? initialTeachers);
  const [extracurriculars, setExtracurriculars] = useState<ExtracurricularItem[]>(initialData?.extracurriculars ?? initialExtracurriculars);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialData?.gallery ?? []);
  const [applicants, setApplicants] = useState<PPDBApplicant[]>(initialData?.applicants ?? []);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialData?.faqs ?? initialFAQs);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialData?.testimonials ?? []);
  const [facilities, setFacilities] = useState<FacilityItem[]>(initialData?.facilities ?? initialFacilities);
  const [users, setUsers] = useState<UserItem[]>(initialData?.users ?? initialUsers);
  const [kesiswaanActivities, setKesiswaanActivities] = useState<KesiswaanActivity[]>(initialData?.kesiswaanActivities ?? initialKesiswaanActivities);
  const [currentUser, setCurrentUser] = useState<UserItem | null>(null);

  // Synchronize state directly to Neon PostgreSQL DB
  const syncToApi = async (table: string, action: "save" | "delete", item?: any, id?: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, action, item, id }),
      });
      if (!res.ok) {
        console.error(`Failed to sync ${table} (${action}): HTTP ${res.status}`);
        return false;
      }
      return true;
    } catch (e) {
      console.error(`Error syncing ${table} (${action}) to Neon DB:`, e);
      return false;
    }
  };

  // Authoritative refresh from Neon DB API without cache
  const refreshFromApi = useCallback(async () => {
    try {
      const res = await fetch(`/api/data?_t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.schoolInfo) {
        setSchoolInfo({
          ...initialSchoolInfo,
          ...data.schoolInfo,
          headmasterName:
            data.schoolInfo.headmasterName && data.schoolInfo.headmasterName !== "Suryanto, S.Pd., M.Pd."
              ? data.schoolInfo.headmasterName
              : "Dr. Suryanto, S.Pd., M.Pd.",
          headmasterPhoto:
            data.schoolInfo.headmasterPhoto &&
            !data.schoolInfo.headmasterPhoto.includes("unsplash.com") &&
            data.schoolInfo.headmasterPhoto !== "/foto-kepala-sekolah.png"
              ? data.schoolInfo.headmasterPhoto
              : "/Pak Sur.jpeg",
          stats: {
            ...initialSchoolInfo.stats,
            ...(data.schoolInfo.stats || {}),
          },
        });
      }
      if (Array.isArray(data.news)) setNews(data.news);
      if (Array.isArray(data.agendas)) setAgendas(data.agendas);
      if (Array.isArray(data.achievements)) setAchievements(data.achievements);
      if (Array.isArray(data.teachers)) setTeachers(data.teachers);
      if (Array.isArray(data.extracurriculars)) setExtracurriculars(data.extracurriculars);
      if (Array.isArray(data.gallery)) setGallery(data.gallery);
      if (Array.isArray(data.applicants)) setApplicants(data.applicants);
      if (Array.isArray(data.facilities)) setFacilities(data.facilities);
      if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
      if (Array.isArray(data.users)) setUsers(data.users);
      if (Array.isArray(data.kesiswaanActivities)) setKesiswaanActivities(data.kesiswaanActivities);
      if (Array.isArray(data.faqs)) setFaqs(data.faqs);
    } catch (err) {
      console.error("Error refreshing from Neon DB:", err);
    }
  }, []);

  // Set up synchronization and tab listeners
  useEffect(() => {
    try {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem(STORAGE_KEY_PREFIX + "dark_mode");

      // Clear any legacy client cache keys
      const staleKeys = [
        "sma_alfurqon_news",
        "sma_alfurqon_agendas",
        "sma_alfurqon_achievements",
        "sma_alfurqon_extracurriculars",
        "sma_alfurqon_facilities",
        "sma_alfurqon_gallery",
        "sma_alfurqon_testimonials",
        "sma_alfurqon_users",
        "sma_alfurqon_applicants",
        "sma_alfurqon_kesiswaan_activities",
      ];
      staleKeys.forEach((key) => {
        try { localStorage.removeItem(key); } catch {}
      });

      // Always execute background refresh on client mount
      refreshFromApi();

      // Automatically refresh when user returns to this browser tab
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          refreshFromApi();
        }
      };
      window.addEventListener("focus", handleVisibilityChange);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      const savedActiveUser = localStorage.getItem(STORAGE_KEY_PREFIX + "admin_user");
      if (savedActiveUser) {
        try { setCurrentUser(JSON.parse(savedActiveUser)); } catch {}
      }

      return () => {
        window.removeEventListener("focus", handleVisibilityChange);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    } catch (e) {
      console.error("Error in DataProvider setup:", e);
    }
  }, [refreshFromApi]);

  const setDarkMode = (_val: boolean) => {
    setDarkModeState(false);
    document.documentElement.classList.remove("dark");
    localStorage.removeItem(STORAGE_KEY_PREFIX + "dark_mode");
  };

  // --- SCHOOL INFO ---
  const updateSchoolInfo = (info: Partial<SchoolInfo>) => {
    const updated = {
      ...schoolInfo,
      ...info,
      stats: {
        ...initialSchoolInfo.stats,
        ...(schoolInfo?.stats || {}),
        ...(info.stats || {}),
      },
    };
    setSchoolInfo(updated);
    syncToApi("school_info", "save", updated);

    // Also automatically synchronize teacher entry for Kepala Sekolah if name or photo is modified
    if (info.headmasterName || info.headmasterPhoto) {
      const kepsekIdx = teachers.findIndex(
        (t) =>
          t.position?.toLowerCase().includes("kepala sekolah") ||
          t.position?.toLowerCase().includes("kepsek") ||
          t.id === "t-2" ||
          t.name.toLowerCase().includes("suryanto")
      );
      if (kepsekIdx !== -1) {
        const currentT = teachers[kepsekIdx];
        const updatedTeacher: TeacherItem = {
          ...currentT,
          name: info.headmasterName || currentT.name,
          photo: info.headmasterPhoto || currentT.photo,
        };
        const newTeachers = [...teachers];
        newTeachers[kepsekIdx] = updatedTeacher;
        setTeachers(newTeachers);
        syncToApi("teachers", "save", updatedTeacher);
      }
    }
  };

  // --- NEWS ---
  const addNews = (item: Omit<NewsItem, "id">) => {
    const newItem: NewsItem = {
      ...item,
      status: item.status || "published",
      id: "news-" + Date.now(),
    };
    const updated = [newItem, ...news];
    setNews(updated);
    syncToApi("news", "save", newItem);
  };

  const updateNews = (id: string, item: Partial<NewsItem>) => {
    const updated = news.map((n) => (n.id === id ? { ...n, ...item } : n));
    setNews(updated);
    const target = updated.find((n) => n.id === id);
    if (target) syncToApi("news", "save", target);
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    syncToApi("news", "delete", undefined, id);
  };

  // --- AGENDAS ---
  const addAgenda = (item: Omit<AgendaItem, "id">) => {
    const newItem: AgendaItem = {
      ...item,
      id: "agenda-" + Date.now(),
    };
    const updated = [newItem, ...agendas];
    setAgendas(updated);
    syncToApi("agendas", "save", newItem);
  };

  const updateAgenda = (id: string, item: Partial<AgendaItem>) => {
    const updated = agendas.map((a) => (a.id === id ? { ...a, ...item } : a));
    setAgendas(updated);
    const target = updated.find((a) => a.id === id);
    if (target) syncToApi("agendas", "save", target);
  };

  const deleteAgenda = (id: string) => {
    const updated = agendas.filter((a) => a.id !== id);
    setAgendas(updated);
    syncToApi("agendas", "delete", undefined, id);
  };

  // --- ACHIEVEMENTS ---
  const addAchievement = (item: Omit<AchievementItem, "id">) => {
    const newItem: AchievementItem = {
      ...item,
      id: "ach-" + Date.now(),
    };
    const updated = [newItem, ...achievements];
    setAchievements(updated);
    syncToApi("achievements", "save", newItem);
  };

  const updateAchievement = (id: string, item: Partial<AchievementItem>) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, ...item } : a));
    setAchievements(updated);
    const target = updated.find((a) => a.id === id);
    if (target) syncToApi("achievements", "save", target);
  };

  const deleteAchievement = (id: string) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    syncToApi("achievements", "delete", undefined, id);
  };

  // --- TEACHERS ---
  const addTeacher = (item: Omit<TeacherItem, "id">) => {
    const newItem: TeacherItem = {
      ...item,
      id: "t-" + Date.now(),
    };
    const updated = [...teachers, newItem];
    setTeachers(updated);
    syncToApi("teachers", "save", newItem);
  };

  const updateTeacher = (id: string, item: Partial<TeacherItem>) => {
    const updated = teachers.map((t) => (t.id === id ? { ...t, ...item } : t));
    setTeachers(updated);
    const target = updated.find((t) => t.id === id);
    if (target) syncToApi("teachers", "save", target);
  };

  const deleteTeacher = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
    syncToApi("teachers", "delete", undefined, id);
  };

  const setTeachersData = (items: TeacherItem[]) => {
    setTeachers(items);
  };

  const resetTeachersToDefault = () => {
    setTeachers(initialTeachers);
  };

  // --- GALLERY ---
  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: "g-" + Date.now(),
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    syncToApi("gallery", "save", newItem);
  };

  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    const updated = gallery.map((g) => (g.id === id ? { ...g, ...item } : g));
    setGallery(updated);
    const target = updated.find((g) => g.id === id);
    if (target) syncToApi("gallery", "save", target);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    syncToApi("gallery", "delete", undefined, id);
  };

  // --- FACILITIES ---
  const addFacility = (item: Omit<FacilityItem, "id">) => {
    const newItem: FacilityItem = {
      ...item,
      id: "fac-" + Date.now(),
    };
    const updated = [...facilities, newItem];
    setFacilities(updated);
    syncToApi("facilities", "save", newItem);
  };

  const updateFacility = (id: string, item: Partial<FacilityItem>) => {
    const updated = facilities.map((f) => (f.id === id ? { ...f, ...item } : f));
    setFacilities(updated);
    const target = updated.find((f) => f.id === id);
    if (target) syncToApi("facilities", "save", target);
  };

  const deleteFacility = (id: string) => {
    const updated = facilities.filter((f) => f.id !== id);
    setFacilities(updated);
    syncToApi("facilities", "delete", undefined, id);
  };

  // --- EXTRACURRICULARS (Hanya Icon Saja, Tidak Ada Gambar) ---
  const addExtracurricular = (item: Omit<ExtracurricularItem, "id">) => {
    const newItem: ExtracurricularItem = {
      ...item,
      id: "ekskul-" + Date.now(),
      image: "", // Ekstrakurikuler: tidak ada gambar banner
      icon: item.icon || "Sparkles",
      iconImage: item.iconImage,
    };
    const updated = [...extracurriculars, newItem];
    setExtracurriculars(updated);
    syncToApi("extracurriculars", "save", newItem);
  };

  const updateExtracurricular = (id: string, item: Partial<ExtracurricularItem>) => {
    const updated = extracurriculars.map((e) =>
      e.id === id ? { ...e, ...item, image: "" } : e
    );
    setExtracurriculars(updated);
    const target = updated.find((e) => e.id === id);
    if (target) syncToApi("extracurriculars", "save", { ...target, image: "" });
  };

  const deleteExtracurricular = (id: string) => {
    const updated = extracurriculars.filter((e) => e.id !== id);
    setExtracurriculars(updated);
    syncToApi("extracurriculars", "delete", undefined, id);
  };

  // --- KESISWAAN ACTIVITIES ---
  const addKesiswaanActivity = (item: Omit<KesiswaanActivity, "id">) => {
    const newItem: KesiswaanActivity = {
      ...item,
      status: item.status || "published",
      id: "kesiswaan-" + Date.now(),
    };
    const updated = [newItem, ...kesiswaanActivities];
    setKesiswaanActivities(updated);
    syncToApi("kesiswaan_activities", "save", newItem);
  };

  const updateKesiswaanActivity = (id: string, item: Partial<KesiswaanActivity>) => {
    const updated = kesiswaanActivities.map((k) => (k.id === id ? { ...k, ...item } : k));
    setKesiswaanActivities(updated);
    const target = updated.find((k) => k.id === id);
    if (target) syncToApi("kesiswaan_activities", "save", target);
  };

  const deleteKesiswaanActivity = (id: string) => {
    const updated = kesiswaanActivities.filter((k) => k.id !== id);
    setKesiswaanActivities(updated);
    syncToApi("kesiswaan_activities", "delete", undefined, id);
  };

  // --- TESTIMONIALS ---
  const addTestimonial = (item: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = {
      ...item,
      id: "testi-" + Date.now(),
    };
    const updated = [newItem, ...testimonials];
    setTestimonials(updated);
    syncToApi("testimonials", "save", newItem);
  };

  const updateTestimonial = (id: string, item: Partial<TestimonialItem>) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, ...item } : t));
    setTestimonials(updated);
    const target = updated.find((t) => t.id === id);
    if (target) syncToApi("testimonials", "save", target);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    syncToApi("testimonials", "delete", undefined, id);
  };

  // --- FAQS ---
  const addFAQ = (item: Omit<FAQItem, "id">) => {
    const newItem: FAQItem = {
      ...item,
      id: "faq-" + Date.now(),
    };
    const updated = [...faqs, newItem];
    setFaqs(updated);
    syncToApi("faqs", "save", newItem);
  };

  const updateFAQ = (id: string, item: Partial<FAQItem>) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, ...item } : f));
    setFaqs(updated);
    const target = updated.find((f) => f.id === id);
    if (target) syncToApi("faqs", "save", target);
  };

  const deleteFAQ = (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    syncToApi("faqs", "delete", undefined, id);
  };

  // --- USERS ---
  const addUser = (item: Omit<UserItem, "id">) => {
    const newUser: UserItem = {
      ...item,
      id: "user-" + Date.now(),
      status: item.status || "Aktif",
    };
    const updated = [...users, newUser];
    setUsers(updated);
    syncToApi("users", "save", newUser);
  };

  const updateUser = (id: string, item: Partial<UserItem>) => {
    const updated = users.map((u) => (u.id === id ? { ...u, ...item } : u));
    setUsers(updated);
    const target = updated.find((u) => u.id === id);
    if (target) syncToApi("users", "save", target);
    if (currentUser?.id === id) {
      const updatedUser = { ...currentUser, ...item };
      setCurrentUser(updatedUser);
      localStorage.setItem(STORAGE_KEY_PREFIX + "admin_user", JSON.stringify(updatedUser));
    }
  };

  const deleteUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    syncToApi("users", "delete", undefined, id);
  };

  const loginUser = (usernameInput: string, passwordInput: string) => {
    const found = users.find(
      (u) => u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput
    );
    if (!found) {
      return { success: false, message: "Username atau Password salah!" };
    }
    const userStatus = found.status || "Aktif";
    if (userStatus === "Nonaktif") {
      return { success: false, message: "Akun Anda saat ini dinonaktifkan. Hubungi Super Admin." };
    }
    const updatedUser = {
      ...found,
      status: userStatus as "Aktif" | "Nonaktif",
      lastLogin: new Date().toLocaleString("id-ID") + " WIB",
    };
    const updatedUsersList = users.map((u) => (u.id === found.id ? updatedUser : u));
    setUsers(updatedUsersList);
    syncToApi("users", "save", updatedUser);

    setCurrentUser(updatedUser);
    localStorage.setItem(STORAGE_KEY_PREFIX + "admin_user", JSON.stringify(updatedUser));
    localStorage.setItem("sma_admin_token", `token-${updatedUser.id}-${Date.now()}`);
    return { success: true, user: updatedUser };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_PREFIX + "admin_user");
    localStorage.removeItem("sma_admin_token");
  };

  // --- PSB / PPDB APPLICANTS ---
  const submitPPDB = (
    data: Omit<PPDBApplicant, "id" | "registrationNumber" | "registrationDate" | "status">
  ): PPDBApplicant => {
    const count = applicants.length + 1;
    const pad = count < 10 ? "00" + count : count < 100 ? "0" + count : count;
    const newApplicant: PPDBApplicant = {
      ...data,
      id: "psb-" + Date.now(),
      registrationNumber: `PSB-2026-${pad}`,
      registrationDate: new Date().toISOString().split("T")[0],
      status: "Menunggu Verifikasi",
    };
    const updated = [newApplicant, ...applicants];
    setApplicants(updated);
    syncToApi("ppdb_applicants", "save", newApplicant);
    return newApplicant;
  };

  const submitPSB = submitPPDB;

  const updateApplicantStatus = (id: string, status: PPDBApplicant["status"]) => {
    const updated = applicants.map((app) => (app.id === id ? { ...app, status } : app));
    setApplicants(updated);
    const target = updated.find((app) => app.id === id);
    if (target) syncToApi("ppdb_applicants", "save", target);
  };

  return (
    <DataContext.Provider
      value={{
        schoolInfo,
        news,
        agendas,
        achievements,
        teachers,
        extracurriculars,
        gallery,
        applicants,
        faqs,
        testimonials,
        facilities,
        users,
        currentUser,
        darkMode,
        setDarkMode,
        refreshData: refreshFromApi,
        updateSchoolInfo,
        addNews,
        updateNews,
        deleteNews,
        addAgenda,
        updateAgenda,
        deleteAgenda,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        setTeachersData,
        resetTeachersToDefault,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addFacility,
        updateFacility,
        deleteFacility,
        addExtracurricular,
        updateExtracurricular,
        deleteExtracurricular,
        kesiswaanActivities,
        addKesiswaanActivity,
        updateKesiswaanActivity,
        deleteKesiswaanActivity,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        addUser,
        updateUser,
        deleteUser,
        loginUser,
        logoutUser,
        submitPPDB,
        submitPSB,
        updateApplicantStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
};
