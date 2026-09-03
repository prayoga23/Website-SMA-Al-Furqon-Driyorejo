"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  addUser: (item: Omit<UserItem, "id">) => void;
  updateUser: (id: string, item: Partial<UserItem>) => void;
  deleteUser: (id: string) => void;
  loginUser: (username: string, password: string) => { success: boolean; message?: string; user?: UserItem };
  logoutUser: () => void;
  submitPPDB: (applicant: Omit<PPDBApplicant, "id" | "registrationNumber" | "registrationDate" | "status">) => PPDBApplicant;
  updateApplicantStatus: (id: string, status: PPDBApplicant["status"]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = "sma_alfurqon_";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkModeState] = useState<boolean>(false);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(initialSchoolInfo);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [agendas, setAgendas] = useState<AgendaItem[]>(initialAgenda);
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements);
  const [teachers, setTeachers] = useState<TeacherItem[]>(initialTeachers);
  const [extracurriculars, setExtracurriculars] = useState<ExtracurricularItem[]>(initialExtracurriculars);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [applicants, setApplicants] = useState<PPDBApplicant[]>(initialApplicants);
  const [faqs] = useState<FAQItem[]>(initialFAQs);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [facilities, setFacilities] = useState<FacilityItem[]>(initialFacilities);
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [kesiswaanActivities, setKesiswaanActivities] = useState<KesiswaanActivity[]>(initialKesiswaanActivities);
  const [currentUser, setCurrentUser] = useState<UserItem | null>(null);

  // Helper to sync mutations with Neon PostgreSQL DB
  const syncToApi = async (table: string, action: "save" | "delete", item?: any, id?: string) => {
    try {
      await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, action, item, id }),
      });
    } catch (e) {
      console.error(`Error syncing ${table} to Neon DB:`, e);
    }
  };

  // Load saved state from Neon DB API on mount
  useEffect(() => {
    try {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem(STORAGE_KEY_PREFIX + "dark_mode");

      fetch("/api/data", { cache: "no-store", headers: { "Cache-Control": "no-cache" } })
        .then((res) => res.json())
        .then((data) => {
          if (data.schoolInfo) {
            setSchoolInfo({
              ...initialSchoolInfo,
              ...data.schoolInfo,
              headmasterName:
                data.schoolInfo.headmasterName && data.schoolInfo.headmasterName !== "Suryanto, S.Pd., M.Pd."
                  ? data.schoolInfo.headmasterName
                  : "Dr. Suryanto, S.Pd., M.Pd.",
              headmasterPhoto:
                data.schoolInfo.headmasterPhoto && !data.schoolInfo.headmasterPhoto.includes("unsplash.com")
                  ? data.schoolInfo.headmasterPhoto
                  : "/foto-kepala-sekolah.png",
              stats: {
                ...initialSchoolInfo.stats,
                ...(data.schoolInfo.stats || {}),
              },
            });
          }
          if (data.news && Array.isArray(data.news)) setNews(data.news);
          if (data.agendas && Array.isArray(data.agendas)) setAgendas(data.agendas);
          if (data.achievements && Array.isArray(data.achievements)) setAchievements(data.achievements);
          if (data.teachers && Array.isArray(data.teachers)) setTeachers(data.teachers);
          if (data.extracurriculars && Array.isArray(data.extracurriculars)) setExtracurriculars(data.extracurriculars);
          if (data.gallery && Array.isArray(data.gallery)) setGallery(data.gallery);
          if (data.applicants && Array.isArray(data.applicants)) setApplicants(data.applicants);
          if (data.facilities && Array.isArray(data.facilities)) setFacilities(data.facilities);
          if (data.testimonials && Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
          if (data.users && Array.isArray(data.users)) setUsers(data.users);
          if (data.kesiswaanActivities && Array.isArray(data.kesiswaanActivities)) setKesiswaanActivities(data.kesiswaanActivities);
        })
        .catch((err) => console.error("Error loading Neon DB data:", err));

      const savedActiveUser = localStorage.getItem(STORAGE_KEY_PREFIX + "admin_user");
      if (savedActiveUser) setCurrentUser(JSON.parse(savedActiveUser));
    } catch (e) {
      console.error("Error loading initial data:", e);
    }
  }, []);

  const setDarkMode = (_val: boolean) => {
    setDarkModeState(false);
    document.documentElement.classList.remove("dark");
    localStorage.removeItem(STORAGE_KEY_PREFIX + "dark_mode");
  };

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
    localStorage.setItem(STORAGE_KEY_PREFIX + "school_info", JSON.stringify(updated));
    syncToApi("school_info", "save", updated);
  };

  const addNews = (item: Omit<NewsItem, "id">) => {
    const newItem: NewsItem = {
      ...item,
      id: "news-" + Date.now(),
    };
    const updated = [newItem, ...news];
    setNews(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "news", JSON.stringify(updated));
    syncToApi("news", "save", newItem);
  };

  const updateNews = (id: string, item: Partial<NewsItem>) => {
    const updated = news.map((n) => (n.id === id ? { ...n, ...item } : n));
    setNews(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "news", JSON.stringify(updated));
    const target = updated.find((n) => n.id === id);
    if (target) syncToApi("news", "save", target);
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "news", JSON.stringify(updated));
    syncToApi("news", "delete", undefined, id);
  };

  const addAgenda = (item: Omit<AgendaItem, "id">) => {
    const newItem: AgendaItem = {
      ...item,
      id: "agenda-" + Date.now(),
    };
    const updated = [newItem, ...agendas];
    setAgendas(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "agendas", JSON.stringify(updated));
  };

  const updateAgenda = (id: string, item: Partial<AgendaItem>) => {
    const updated = agendas.map((a) => (a.id === id ? { ...a, ...item } : a));
    setAgendas(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "agendas", JSON.stringify(updated));
  };

  const deleteAgenda = (id: string) => {
    const updated = agendas.filter((a) => a.id !== id);
    setAgendas(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "agendas", JSON.stringify(updated));
  };

  const addAchievement = (item: Omit<AchievementItem, "id">) => {
    const newItem: AchievementItem = {
      ...item,
      id: "achieve-" + Date.now(),
    };
    const updated = [newItem, ...achievements];
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "achievements", JSON.stringify(updated));
  };

  const updateAchievement = (id: string, item: Partial<AchievementItem>) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, ...item } : a));
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "achievements", JSON.stringify(updated));
  };

  const deleteAchievement = (id: string) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "achievements", JSON.stringify(updated));
  };

  const addTeacher = (item: Omit<TeacherItem, "id">) => {
    const newItem: TeacherItem = {
      ...item,
      id: "t-" + Date.now(),
    };
    const updated = [...teachers, newItem];
    setTeachers(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(updated));
    syncToApi("teachers", "save", newItem);
  };

  const updateTeacher = (id: string, item: Partial<TeacherItem>) => {
    const updated = teachers.map((t) => (t.id === id ? { ...t, ...item } : t));
    setTeachers(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(updated));
    const target = updated.find((t) => t.id === id);
    if (target) syncToApi("teachers", "save", target);
  };

  const deleteTeacher = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(updated));
    syncToApi("teachers", "delete", undefined, id);
  };

  const setTeachersData = (items: TeacherItem[]) => {
    setTeachers(items);
    localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(items));
    items.forEach((t) => syncToApi("teachers", "save", t));
  };

  const resetTeachersToDefault = () => {
    setTeachers(initialTeachers);
    localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(initialTeachers));
    initialTeachers.forEach((t) => syncToApi("teachers", "save", t));
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: "g-" + Date.now(),
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "gallery", JSON.stringify(updated));
    syncToApi("gallery", "save", newItem);
  };

  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    const updated = gallery.map((g) => (g.id === id ? { ...g, ...item } : g));
    setGallery(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "gallery", JSON.stringify(updated));
    const target = updated.find((g) => g.id === id);
    if (target) syncToApi("gallery", "save", target);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "gallery", JSON.stringify(updated));
    syncToApi("gallery", "delete", undefined, id);
  };

  const addFacility = (item: Omit<FacilityItem, "id">) => {
    const newItem: FacilityItem = {
      ...item,
      id: "fac-" + Date.now(),
    };
    const updated = [...facilities, newItem];
    setFacilities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "facilities", JSON.stringify(updated));
    syncToApi("facilities", "save", newItem);
  };

  const updateFacility = (id: string, item: Partial<FacilityItem>) => {
    const updated = facilities.map((f) => (f.id === id ? { ...f, ...item } : f));
    setFacilities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "facilities", JSON.stringify(updated));
    const target = updated.find((f) => f.id === id);
    if (target) syncToApi("facilities", "save", target);
  };

  const deleteFacility = (id: string) => {
    const updated = facilities.filter((f) => f.id !== id);
    setFacilities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "facilities", JSON.stringify(updated));
    syncToApi("facilities", "delete", undefined, id);
  };

  const addExtracurricular = (item: Omit<ExtracurricularItem, "id">) => {
    const newItem: ExtracurricularItem = {
      ...item,
      id: "extra-" + Date.now(),
    };
    const updated = [...extracurriculars, newItem];
    setExtracurriculars(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "extracurriculars", JSON.stringify(updated));
  };

  const updateExtracurricular = (id: string, item: Partial<ExtracurricularItem>) => {
    const updated = extracurriculars.map((e) => (e.id === id ? { ...e, ...item } : e));
    setExtracurriculars(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "extracurriculars", JSON.stringify(updated));
  };

  const deleteExtracurricular = (id: string) => {
    const updated = extracurriculars.filter((e) => e.id !== id);
    setExtracurriculars(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "extracurriculars", JSON.stringify(updated));
  };

  const addKesiswaanActivity = (item: Omit<KesiswaanActivity, "id">) => {
    const newItem: KesiswaanActivity = {
      ...item,
      id: "kesiswaan-" + Date.now(),
    };
    const updated = [newItem, ...kesiswaanActivities];
    setKesiswaanActivities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "kesiswaan_activities", JSON.stringify(updated));
    syncToApi("kesiswaan_activities", "save", newItem);
  };

  const updateKesiswaanActivity = (id: string, item: Partial<KesiswaanActivity>) => {
    const updated = kesiswaanActivities.map((k) => (k.id === id ? { ...k, ...item } : k));
    setKesiswaanActivities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "kesiswaan_activities", JSON.stringify(updated));
    const target = updated.find((k) => k.id === id);
    if (target) syncToApi("kesiswaan_activities", "save", target);
  };

  const deleteKesiswaanActivity = (id: string) => {
    const updated = kesiswaanActivities.filter((k) => k.id !== id);
    setKesiswaanActivities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "kesiswaan_activities", JSON.stringify(updated));
    syncToApi("kesiswaan_activities", "delete", undefined, id);
  };

  const addTestimonial = (item: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = {
      ...item,
      id: "testi-" + Date.now(),
    };
    const updated = [newItem, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "testimonials", JSON.stringify(updated));
    syncToApi("testimonials", "save", newItem);
  };

  const updateTestimonial = (id: string, item: Partial<TestimonialItem>) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, ...item } : t));
    setTestimonials(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "testimonials", JSON.stringify(updated));
    const target = updated.find((t) => t.id === id);
    if (target) syncToApi("testimonials", "save", target);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "testimonials", JSON.stringify(updated));
    syncToApi("testimonials", "delete", undefined, id);
  };

  const addUser = (item: Omit<UserItem, "id">) => {
    const newUser: UserItem = {
      ...item,
      id: "user-" + Date.now(),
      status: item.status || "Aktif",
    };
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "users", JSON.stringify(updated));
    syncToApi("users", "save", newUser);
  };

  const updateUser = (id: string, item: Partial<UserItem>) => {
    const updated = users.map((u) => (u.id === id ? { ...u, ...item } : u));
    setUsers(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "users", JSON.stringify(updated));
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
    localStorage.setItem(STORAGE_KEY_PREFIX + "users", JSON.stringify(updated));
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
    localStorage.setItem(STORAGE_KEY_PREFIX + "users", JSON.stringify(updatedUsersList));
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

  const submitPPDB = (
    data: Omit<PPDBApplicant, "id" | "registrationNumber" | "registrationDate" | "status">
  ): PPDBApplicant => {
    const count = applicants.length + 1;
    const pad = count < 10 ? "00" + count : count < 100 ? "0" + count : count;
    const newApplicant: PPDBApplicant = {
      ...data,
      id: "ppdb-" + Date.now(),
      registrationNumber: `PPDB-2026-${pad}`,
      registrationDate: new Date().toISOString().split("T")[0],
      status: "Menunggu Verifikasi",
    };
    const updated = [newApplicant, ...applicants];
    setApplicants(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "applicants", JSON.stringify(updated));
    return newApplicant;
  };

  const updateApplicantStatus = (id: string, status: PPDBApplicant["status"]) => {
    const updated = applicants.map((app) => (app.id === id ? { ...app, status } : app));
    setApplicants(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "applicants", JSON.stringify(updated));
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
        addUser,
        updateUser,
        deleteUser,
        loginUser,
        logoutUser,
        submitPPDB,
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
