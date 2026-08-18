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
} from "@/lib/data-store";

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
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  addFacility: (item: Omit<FacilityItem, "id">) => void;
  updateFacility: (id: string, item: Partial<FacilityItem>) => void;
  deleteFacility: (id: string) => void;
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
  const [extracurriculars] = useState<ExtracurricularItem[]>(initialExtracurriculars);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [applicants, setApplicants] = useState<PPDBApplicant[]>(initialApplicants);
  const [faqs] = useState<FAQItem[]>(initialFAQs);
  const [testimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [facilities, setFacilities] = useState<FacilityItem[]>(initialFacilities);

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedDark = localStorage.getItem(STORAGE_KEY_PREFIX + "dark_mode");
      if (savedDark !== null) setDarkModeState(JSON.parse(savedDark));

      const savedInfo = localStorage.getItem(STORAGE_KEY_PREFIX + "school_info");
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        // Refresh vision & missions if legacy or missing
        if (!parsed.vision || parsed.vision.includes("Terwujudnya warga") || !parsed.missions || parsed.missions.length !== 6) {
          parsed.vision = initialSchoolInfo.vision;
          parsed.missions = initialSchoolInfo.missions;
          localStorage.setItem(STORAGE_KEY_PREFIX + "school_info", JSON.stringify(parsed));
        }
        setSchoolInfo(parsed);
      }

      const savedNews = localStorage.getItem(STORAGE_KEY_PREFIX + "news");
      if (savedNews) setNews(JSON.parse(savedNews));

      const savedAgenda = localStorage.getItem(STORAGE_KEY_PREFIX + "agendas");
      if (savedAgenda) setAgendas(JSON.parse(savedAgenda));

      const savedAchieve = localStorage.getItem(STORAGE_KEY_PREFIX + "achievements");
      if (savedAchieve) setAchievements(JSON.parse(savedAchieve));

      const savedTeachers = localStorage.getItem(STORAGE_KEY_PREFIX + "teachers");
      if (savedTeachers) {
        const parsed = JSON.parse(savedTeachers);
        if (parsed.length !== initialTeachers.length || !parsed[0]?.name) {
          localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(initialTeachers));
          setTeachers(initialTeachers);
        } else {
          setTeachers(parsed);
        }
      }

      const savedGallery = localStorage.getItem(STORAGE_KEY_PREFIX + "gallery");
      if (savedGallery) setGallery(JSON.parse(savedGallery));

      const savedApplicants = localStorage.getItem(STORAGE_KEY_PREFIX + "applicants");
      if (savedApplicants) setApplicants(JSON.parse(savedApplicants));

      const savedFacilities = localStorage.getItem(STORAGE_KEY_PREFIX + "facilities");
      if (savedFacilities) setFacilities(JSON.parse(savedFacilities));
    } catch (e) {
      console.error("Error loading local storage:", e);
    }
  }, []);

  const setDarkMode = (val: boolean) => {
    setDarkModeState(val);
    localStorage.setItem(STORAGE_KEY_PREFIX + "dark_mode", JSON.stringify(val));
    if (val) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const updateSchoolInfo = (info: Partial<SchoolInfo>) => {
    const updated = { ...schoolInfo, ...info };
    setSchoolInfo(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "school_info", JSON.stringify(updated));
  };

  const addNews = (item: Omit<NewsItem, "id">) => {
    const newItem: NewsItem = {
      ...item,
      id: "news-" + Date.now(),
    };
    const updated = [newItem, ...news];
    setNews(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "news", JSON.stringify(updated));
  };

  const updateNews = (id: string, item: Partial<NewsItem>) => {
    const updated = news.map((n) => (n.id === id ? { ...n, ...item } : n));
    setNews(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "news", JSON.stringify(updated));
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "news", JSON.stringify(updated));
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
  };

  const updateTeacher = (id: string, item: Partial<TeacherItem>) => {
    const updated = teachers.map((t) => (t.id === id ? { ...t, ...item } : t));
    setTeachers(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(updated));
  };

  const deleteTeacher = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "teachers", JSON.stringify(updated));
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: "g-" + Date.now(),
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "gallery", JSON.stringify(updated));
  };

  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    const updated = gallery.map((g) => (g.id === id ? { ...g, ...item } : g));
    setGallery(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "gallery", JSON.stringify(updated));
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "gallery", JSON.stringify(updated));
  };

  const addFacility = (item: Omit<FacilityItem, "id">) => {
    const newItem: FacilityItem = {
      ...item,
      id: "fac-" + Date.now(),
    };
    const updated = [...facilities, newItem];
    setFacilities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "facilities", JSON.stringify(updated));
  };

  const updateFacility = (id: string, item: Partial<FacilityItem>) => {
    const updated = facilities.map((f) => (f.id === id ? { ...f, ...item } : f));
    setFacilities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "facilities", JSON.stringify(updated));
  };

  const deleteFacility = (id: string) => {
    const updated = facilities.filter((f) => f.id !== id);
    setFacilities(updated);
    localStorage.setItem(STORAGE_KEY_PREFIX + "facilities", JSON.stringify(updated));
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
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addFacility,
        updateFacility,
        deleteFacility,
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
