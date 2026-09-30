import { sql } from "./db";
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
  applicants: PPDBApplicant[];
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
    const result = await sql`
      SELECT json_build_object(
        'schoolInfo', (SELECT data FROM school_info WHERE id = 'default' LIMIT 1),
        'news', COALESCE((SELECT json_agg(n.*) FROM (SELECT * FROM news ORDER BY created_at DESC) n), '[]'::json),
        'agendas', COALESCE((SELECT json_agg(a.*) FROM (SELECT * FROM agendas ORDER BY date ASC) a), '[]'::json),
        'achievements', COALESCE((SELECT json_agg(ach.*) FROM (SELECT * FROM achievements ORDER BY year DESC) ach), '[]'::json),
        'teachers', COALESCE((SELECT json_agg(t.*) FROM (SELECT * FROM teachers ORDER BY created_at ASC) t), '[]'::json),
        'extracurriculars', COALESCE((SELECT json_agg(e.*) FROM (SELECT * FROM extracurriculars ORDER BY id ASC) e), '[]'::json),
        'gallery', COALESCE((SELECT json_agg(g.*) FROM (SELECT * FROM gallery ORDER BY created_at DESC) g), '[]'::json),
        'applicants', COALESCE((SELECT json_agg(app.*) FROM (SELECT * FROM ppdb_applicants ORDER BY created_at DESC) app), '[]'::json),
        'faqs', COALESCE((SELECT json_agg(f.*) FROM (SELECT * FROM faqs ORDER BY id ASC) f), '[]'::json),
        'testimonials', COALESCE((SELECT json_agg(tm.*) FROM (SELECT * FROM testimonials ORDER BY created_at DESC) tm), '[]'::json),
        'facilities', COALESCE((SELECT json_agg(fac.*) FROM (SELECT * FROM facilities ORDER BY name ASC) fac), '[]'::json),
        'users', COALESCE((SELECT json_agg(u.*) FROM (SELECT * FROM users ORDER BY created_at ASC) u), '[]'::json),
        'kesiswaan', COALESCE((SELECT json_agg(k.*) FROM (SELECT * FROM kesiswaan_activities ORDER BY created_at ASC) k), '[]'::json)
      ) as bundle;
    `;

    const bundle = result[0]?.bundle || {};

    const rawNews = bundle.news && bundle.news.length > 0 ? bundle.news : initialNews;
    const rawAgendas = Array.isArray(bundle.agendas) ? bundle.agendas : initialAgenda;
    const rawAchievements = Array.isArray(bundle.achievements) ? bundle.achievements : initialAchievements;
    const rawTeachers = bundle.teachers && bundle.teachers.length > 0 ? bundle.teachers : initialTeachers;
    const rawExtracurriculars = bundle.extracurriculars && bundle.extracurriculars.length > 0 ? bundle.extracurriculars : initialExtracurriculars;
    const rawGallery = Array.isArray(bundle.gallery) ? bundle.gallery : initialGallery;
    const rawFaqs = bundle.faqs && bundle.faqs.length > 0 ? bundle.faqs : initialFAQs;
    const rawTestimonials = Array.isArray(bundle.testimonials) ? bundle.testimonials : initialTestimonials;
    const rawFacilities = bundle.facilities && bundle.facilities.length > 0 ? bundle.facilities : initialFacilities;

    const formattedGallery: GalleryItem[] = rawGallery.map((g: any) => ({
      id: g.id,
      title: g.title,
      category: g.category || "Kegiatan",
      imageUrl: g.imageurl || g.imageUrl || "",
      date: g.date || "",
      description: g.description || "",
    }));

    const freshBundle: ServerDataBundle = {
      schoolInfo: bundle.schoolInfo || initialSchoolInfo,
      news: rawNews.map((n: any) => ({
        id: n.id,
        title: n.title,
        slug: n.slug || n.id,
        excerpt: n.excerpt || "",
        content: n.content || "",
        category: n.category || "Berita",
        date: n.date || "",
        author: n.author || "Admin SMA Al-Furqon",
        image: n.image || "/bg-al-furqon2.jpg",
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
          isActive: t.is_active !== false,
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
          image: "", // Ekstrakurikuler: Hanya Icon saja, tidak ada gambar banner
          icon: e.icon || "Sparkles",
          iconImage: e.icon_image || e.iconImage || (e.name && e.name.toLowerCase().includes("silat") ? "/pencak-silat2 (1).png" : undefined),
          achievements: achievementsArr,
        };
      }),
      gallery: formattedGallery,
      applicants: (bundle.applicants || []).map((a: any) => ({
        id: a.id,
        registrationNumber: a.registration_number || a.registrationNumber || "",
        fullName: a.full_name || a.fullName || "",
        nisn: a.nisn || "",
        gender: a.gender || "",
        birthPlace: a.birth_place || a.birthPlace || "",
        birthDate: a.birth_date || a.birthDate || "",
        address: a.address || "",
        previousSchool: a.previous_school || a.previousSchool || "",
        parentName: a.parent_name || a.parentName || "",
        parentPhone: a.parent_phone || a.parentPhone || "",
        chosenMajor: a.chosen_major || a.chosenMajor || "",
        registrationDate: a.registration_date || a.registrationDate || "",
        status: a.status || "Menunggu Verifikasi",
        notes: a.notes || "",
      })),
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
      users: (bundle.users || []).map((u: any) => ({
        id: u.id,
        username: u.username,
        password: u.password,
        name: u.name,
        role: u.role,
        status: u.status || "Aktif",
        email: u.email || "",
      })),
      kesiswaanActivities:
        bundle.kesiswaan && bundle.kesiswaan.length > 0
          ? bundle.kesiswaan.map((k: any) => {
              const dataObj = typeof k.data === "object" ? k.data : JSON.parse(k.data || "{}");
              return {
                id: k.id,
                slug: k.slug,
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
    console.error("Error fetching server data bundle from Neon DB:", error);
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
