import { query } from "./db";
import {
  SchoolInfo,
  NewsItem,
  AgendaItem,
  AchievementItem,
  TeacherItem,
  ExtracurricularItem,
  GalleryItem,
  PSBApplicant,
  FAQItem,
  TestimonialItem,
  FacilityItem,
  UserItem,
} from "./types";
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
  sortTeachersByPriority,
} from "./data-store";
import { KesiswaanActivity, initialKesiswaanActivities } from "./kesiswaan-data";

export interface ServerDataBundle {
  schoolInfo: SchoolInfo;
  news: NewsItem[];
  agendas: AgendaItem[];
  achievements: AchievementItem[];
  teachers: TeacherItem[];
  extracurriculars: ExtracurricularItem[];
  gallery: GalleryItem[];
  applicants: PSBApplicant[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  facilities: FacilityItem[];
  users: UserItem[];
  kesiswaanActivities: KesiswaanActivity[];
}

let cachedBundle: ServerDataBundle | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15000; // 15 seconds fast cache

export function invalidateServerDataCache() {
  cachedBundle = null;
  lastFetchTime = 0;
}

export async function getServerDataBundle(): Promise<ServerDataBundle> {
  const now = Date.now();
  if (cachedBundle && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedBundle;
  }

  try {
    const [
      schoolInfoRows,
      newsRows,
      agendasRows,
      achievementsRows,
      teachersRows,
      extracurricularsRows,
      galleryRows,
      applicantsRows,
      faqsRows,
      testimonialsRows,
      facilitiesRows,
      usersRows,
      kesiswaanRows,
    ] = await Promise.all([
      query<any>("SELECT data FROM school_info WHERE id = 'default' LIMIT 1").catch(() => []),
      query<any>("SELECT * FROM news ORDER BY created_at DESC").catch(() => []),
      query<any>("SELECT * FROM agendas ORDER BY date ASC").catch(() => []),
      query<any>("SELECT * FROM achievements ORDER BY year DESC").catch(() => []),
      query<any>("SELECT * FROM teachers ORDER BY created_at ASC").catch(() => []),
      query<any>("SELECT * FROM extracurriculars ORDER BY id ASC").catch(() => []),
      query<any>("SELECT * FROM gallery ORDER BY created_at DESC").catch(() => []),
      query<any>("SELECT * FROM psb_applicants ORDER BY created_at DESC").catch(() => []),
      query<any>("SELECT * FROM faqs ORDER BY id ASC").catch(() => []),
      query<any>("SELECT * FROM testimonials ORDER BY created_at DESC").catch(() => []),
      query<any>("SELECT * FROM facilities ORDER BY name ASC").catch(() => []),
      query<any>("SELECT * FROM users ORDER BY created_at ASC").catch(() => []),
      query<any>("SELECT * FROM kesiswaan_activities ORDER BY created_at ASC").catch(() => []),
    ]);

    const rawSchoolInfo = schoolInfoRows[0]?.data;
    let parsedSchoolInfo = initialSchoolInfo;
    if (rawSchoolInfo) {
      if (typeof rawSchoolInfo === "object") {
        parsedSchoolInfo = rawSchoolInfo;
      } else if (typeof rawSchoolInfo === "string") {
        try {
          parsedSchoolInfo = JSON.parse(rawSchoolInfo);
        } catch {
          parsedSchoolInfo = initialSchoolInfo;
        }
      }
    }

    const rawNews = Array.isArray(newsRows) ? newsRows : [];
    const rawAgendas = agendasRows && agendasRows.length > 0 ? agendasRows : initialAgenda;
    const rawAchievements = achievementsRows && achievementsRows.length > 0 ? achievementsRows : initialAchievements;
    const rawTeachers = teachersRows && teachersRows.length > 0 ? teachersRows : initialTeachers;
    const rawExtracurriculars = extracurricularsRows && extracurricularsRows.length > 0 ? extracurricularsRows : initialExtracurriculars;
    const rawGallery = Array.isArray(galleryRows) ? galleryRows : initialGallery;
    const rawFaqs = faqsRows && faqsRows.length > 0 ? faqsRows : initialFAQs;
    const rawTestimonials = Array.isArray(testimonialsRows) ? testimonialsRows : initialTestimonials;
    const rawFacilities = facilitiesRows && facilitiesRows.length > 0 ? facilitiesRows : initialFacilities;
    const rawUsers = usersRows && usersRows.length > 0 ? usersRows : initialUsers;

    const formattedGallery: GalleryItem[] = rawGallery.map((g: any) => ({
      id: g.id,
      title: g.title,
      category: g.category || "Kegiatan",
      imageUrl: g.imageurl || g.imageUrl || "",
      date: g.date || "",
      description: g.description || "",
    }));

    const freshBundle: ServerDataBundle = {
      schoolInfo: parsedSchoolInfo,
      news: rawNews.map((n: any) => ({
        id: n.id,
        title: n.title,
        slug: n.slug || n.id,
        excerpt: n.excerpt || "",
        content: n.content || "",
        category: n.category || "Berita",
        date: n.date || "",
        author: n.author || "Admin SMA Al-Furqon",
        image: n.image || "",
        isFeatured: Boolean(n.is_featured ?? n.isFeatured),
        tags: Array.isArray(n.tags) ? n.tags : typeof n.tags === "string" ? JSON.parse(n.tags || "[]") : [],
        youtubeUrl: n.youtube_url || n.youtubeUrl || "",
        status: n.status || "published",
      })),
      agendas: rawAgendas.map((a: any) => ({
        id: a.id,
        title: a.title,
        date: a.date,
        time: a.time,
        location: a.location,
        description: a.description,
        category: a.category,
      })),
      achievements: rawAchievements.map((ach: any) => ({
        id: ach.id,
        title: ach.title,
        event: ach.event || "",
        level: ach.level || "Nasional",
        rank: ach.rank || "Juara 1",
        category: ach.category || "Akademik",
        studentName: ach.student_name || ach.studentName || "",
        year: ach.year || "2026",
        image: ach.image || "",
        description: ach.description || "",
      })),
      teachers: sortTeachersByPriority(
        rawTeachers.map((t: any) => ({
          id: t.id,
          name: t.name,
          nip: t.nip || "",
          position: t.position || t.role || "Guru",
          subject: t.subject || "Guru Pengampu",
          role: t.position || t.role || "Guru",
          education: t.education || "S1 Pendidikan",
          photo: t.photo || "",
          bio: t.bio || "",
          email: t.email || "",
          phone: t.phone || "",
          isActive: t.is_active !== 0 && t.is_active !== false,
        }))
      ),
      extracurriculars: rawExtracurriculars.map((e: any) => {
        let achievementsArr: string[] = [];
        if (Array.isArray(e.achievements)) {
          achievementsArr = e.achievements;
        } else if (typeof e.achievements === "string") {
          try {
            achievementsArr = JSON.parse(e.achievements);
          } catch {
            achievementsArr = [];
          }
        }
        return {
          id: e.id,
          name: e.name,
          category: e.category || "Keterampilan",
          description: e.description || "",
          schedule: e.schedule || "",
          instructor: e.instructor || e.mentor || "",
          image: "", // Ekstrakurikuler: Hanya Icon saja
          icon: e.icon || "Sparkles",
          iconImage: e.icon_image || e.iconImage || (e.name && e.name.toLowerCase().includes("silat") ? "/pencak-silat2 (1).png" : undefined),
          achievements: achievementsArr,
        };
      }),
      gallery: formattedGallery,
      applicants: (applicantsRows || []).map((a: any) => {
        const dataObj =
          typeof a.data === "object" && a.data !== null
            ? a.data
            : typeof a.data === "string"
            ? JSON.parse(a.data || "{}")
            : {};
        return {
          ...dataObj,
          id: a.id,
          registrationNumber: a.registration_number || a.registrationNumber || dataObj.registrationNumber || "",
          fullName: a.full_name || a.fullName || dataObj.fullName || "",
          nisn: a.nisn || dataObj.nisn || "",
          gender: a.gender || dataObj.gender || "Laki-laki",
          birthPlace: a.birth_place || a.birthPlace || dataObj.birthPlace || "",
          birthDate: a.birth_date || a.birthDate || dataObj.birthDate || "",
          address: a.address || dataObj.address || "",
          previousSchool: a.previous_school || a.previousSchool || dataObj.previousSchool || dataObj.originSchool || "",
          originSchool: a.origin_school || a.originSchool || dataObj.originSchool || a.previous_school || "",
          parentName: a.parent_name || a.parentName || dataObj.parentName || dataObj.fatherName || "",
          parentPhone: a.parent_phone || a.parentPhone || dataObj.parentPhone || dataObj.fatherPhone || "",
          chosenMajor: a.chosen_major || a.chosenMajor || dataObj.chosenMajor || dataObj.selectedMajor || "",
          registrationDate: a.registration_date || a.registrationDate || dataObj.registrationDate || "",
          status: a.status || dataObj.status || "Menunggu Verifikasi",
          notes: a.notes || dataObj.notes || "",
        };
      }),
      faqs: rawFaqs,
      testimonials: rawTestimonials.map((tm: any) => ({
        id: tm.id,
        name: tm.name,
        role: tm.role || "",
        graduationYear: tm.graduation_year || tm.graduationYear || "",
        avatar: tm.avatar || "",
        content: tm.content || "",
        rating: tm.rating || 5,
      })),
      facilities: rawFacilities.map((f: any) => ({
        id: f.id,
        name: f.name || f.title,
        title: f.name || f.title,
        category: f.category || f.tag,
        tag: f.category || f.tag,
        description: f.description || f.desc,
        desc: f.description || f.desc,
        image: f.image || "",
      })),
      users: rawUsers.map((u: any) => ({
        id: u.id,
        username: u.username,
        password: u.password,
        name: u.name,
        role: u.role,
        status: u.status || "Aktif",
        email: u.email || "",
      })),
      kesiswaanActivities:
        kesiswaanRows && kesiswaanRows.length > 0
          ? kesiswaanRows.map((k: any) => {
              const dataObj =
                typeof k.data === "object" && k.data !== null
                  ? k.data
                  : typeof k.data === "string"
                  ? JSON.parse(k.data || "{}")
                  : {};
              return {
                id: k.id,
                slug: k.slug || k.id,
                status: dataObj.status || "published",
                ...dataObj,
              };
            })
          : initialKesiswaanActivities,
    };

    cachedBundle = freshBundle;
    lastFetchTime = Date.now();
    return freshBundle;
  } catch (error) {
    console.error("Error fetching server data bundle from MySQL DB:", error);
    if (cachedBundle) return cachedBundle;
    return {
      schoolInfo: initialSchoolInfo,
      news: initialNews,
      agendas: initialAgenda,
      achievements: initialAchievements,
      teachers: initialTeachers,
      extracurriculars: initialExtracurriculars,
      gallery: initialGallery,
      applicants: initialApplicants,
      faqs: initialFAQs,
      testimonials: initialTestimonials,
      facilities: initialFacilities,
      users: initialUsers,
      kesiswaanActivities: initialKesiswaanActivities,
    };
  }
}
