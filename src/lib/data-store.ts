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

export const initialSchoolInfo: SchoolInfo = {
  name: "SMA AL-FURQON DRIYOREJO",
  tagline: "Dzikir - Fikir - Ikhtiar - Tawakal",
  npsn: "20500660",
  accreditation: "A (Unggul)",
  foundation: "Pondok Pesantren Al-Furqon (Diasuh KH. Mashuri Abdurrohim)",
  address: "Jl. KH. Abdurrohim No.01, Wedoroanom RT.12 RW.04",
  subdistrict: "Driyorejo",
  district: "Kabupaten Gresik",
  postalCode: "61177",
  phone: "+62 856-4928-8085",
  whatsapp: "6281615184579",
  email: "sma.alfurqon.driyorejo1@gmail.com",
  website: "https://smaalfurqondriyorejo.sch.id",
  vision:
    "Terbentuknya insan yang ahli dzikir, fikir, ikhtiar dan tawakal",
  missions: [
    "Menyelenggarakan pendidikan yang berorientasi pada karakter moral yang islami",
    "Menyelenggarakan pendidikan yang berorientasi pada karakter kinerja yang kerja keras, ulet, tangguh, tak mudah menyerah, dan tuntas.",
    "Mengoptimalkan peran serta pemangku kepentingan untuk mendukung transformasi dan reformasi pengelolaan pendidikan dan kebudayaan",
    "Membentuk manusia yang kritis, kreatif, komunikatif, dan kolaboratif.",
    "Membentuk manusia yang mempunyai minat baca tinggi wawasan budaya teknologi dan keuangan.",
    "Membentuk peserta didik yang berbudi luhur, hormat, dan santun kepada orang tua, guru dan cinta tanah air.",
  ],
  goals: [
    "Mencetak lulusan berkarakter Islami unggul yang menghafal minimal 3 Juz Al-Qur'an dan tartil bacaan.",
    "Meningkatkan persentase kelulusan peserta didik masuk Perguruan Tinggi Negeri (PTN) dan kedinasan unggulan.",
    "Meraih prestasi dalam olimpiade sains, olahraga, seni, dan keagamaan tingkat kabupaten, provinsi, hingga nasional.",
    "Mewujudkan ekosistem pendidikan berwawasan teknologi digital yang aman, nyaman, dan peduli lingkungan sosial.",
  ],
  headmasterName: "Dr. Suryanto, S.Pd., M.Pd.",
  headmasterPhoto: "/Pak Sur.jpeg",
  headmasterWelcome:
    "Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur kepada Allah SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerah-Nya. SMA AL-FURQON merupakan salah satu unit pendidikan dengan penyelenggara Pondok Pesantren AL-FURQON. Kami berharap masyarakat bisa mengakses website ini sebagai sarana informasi dan komunikasi terutama yang berhubungan dengan pendidikan, ilmu pengetahuan dan informasi seputar SMA AL-FURQON Driyorejo.",
  stats: {
    students: 480,
    teachers: 21,
    classes: 15,
    achievementsCount: 124,
    alumniCount: 1850,
    establishedYear: 1995,
  },
};

export const initialNews: NewsItem[] = [];

export const initialAgenda: AgendaItem[] = [];

export const initialAchievements: AchievementItem[] = [];

export const initialTeachers: TeacherItem[] = [
  {
    id: "t-1",
    name: "Dr. H. Abdul Muid, M.Pd.I.",
    position: "Kadep Pendidikan",
    subject: "Guru Aswaja",
    photo: "/foto-guru/abdul-muid.jpg",
    education: "S3 / Doktor Pendidikan Agama Islam",
    bio: "Kepala Departemen Pendidikan Yayasan PP. Al-Furqon.",
  },
  {
    id: "t-2",
    name: "Dr. Suryanto, S.Pd., M.Pd.",
    position: "Kepala Sekolah",
    subject: "Manajemen Sekolah",
    photo: "/Pak Sur.jpeg",
    education: "S2 Magister Pendidikan",
    bio: "Kepala Sekolah SMA Al-Furqon Driyorejo.",
  },
  {
    id: "t-3",
    name: "Triana Dewitasari, S.Pd.",
    position: "Wk. Kurikulum",
    subject: "Guru Geografi",
    photo: "/foto-guru/triana-dewitasari.jpg",
    education: "S1 Pendidikan Geografi",
    bio: "Wakil Kepala Sekolah Bidang Kurikulum.",
  },
  {
    id: "t-4",
    name: "Suherman, M.Pd. I.",
    position: "Wk. Kesiswaan",
    subject: "Guru PJOK",
    photo: "/foto-guru/suherman.jpg",
    education: "S2 Magister Pendidikan Islam",
    bio: "Wakil Kepala Sekolah Bidang Kesiswaan.",
  },
  {
    id: "t-5",
    name: "Siti Alfiyatus Sa'diyah, S.Pd",
    position: "Tata Usaha (TU)",
    subject: "Administrasi Sekolah",
    photo: "/foto-guru/siti-alfiyatus.jpg",
    education: "S1 Pendidikan",
    bio: "Staf Tata Usaha SMA Al-Furqon Driyorejo.",
  },
  {
    id: "t-6",
    name: "Husnul Wafa, M.Pd.",
    position: "Guru",
    subject: "Guru PAI",
    photo: "",
    education: "S2 Magister Pendidikan",
    bio: "Tenaga Pendidik Pendidikan Agama Islam.",
  },
  {
    id: "t-7",
    name: "M. Refa Mashuri, S.Pd.",
    position: "Guru",
    subject: "Guru PAI",
    photo: "",
    education: "S1 Pendidikan Agama Islam",
    bio: "Tenaga Pendidik Pendidikan Agama Islam.",
  },
  {
    id: "t-8",
    name: "Syaifuddin Yahya, M.Pd.I",
    position: "Guru",
    subject: "Guru Fiqih",
    photo: "",
    education: "S2 Magister Pendidikan Islam",
    bio: "Tenaga Pendidik Fiqih & Keislaman.",
  },
  {
    id: "t-9",
    name: "Sugeng Utomo, S.Pd.",
    position: "Guru",
    subject: "Guru Matematika",
    photo: "",
    education: "S1 Pendidikan Matematika",
    bio: "Tenaga Pendidik Matematika.",
  },
  {
    id: "t-10",
    name: "M. Mas'ud Yunus, S.Pd.",
    position: "Guru",
    subject: "Guru B. Indonesia",
    photo: "",
    education: "S1 Pendidikan Bahasa Indonesia",
    bio: "Tenaga Pendidik Bahasa Indonesia.",
  },
  {
    id: "t-11",
    name: "Masyhudan, S.T",
    position: "Guru",
    subject: "Guru Sejarah",
    photo: "",
    education: "S1 Sarjana Teknik",
    bio: "Tenaga Pendidik Sejarah.",
  },
  {
    id: "t-12",
    name: "Nuril Habibi, M.Hi",
    position: "Guru",
    subject: "Guru Fiqih",
    photo: "",
    education: "S2 Magister Hukum Islam",
    bio: "Tenaga Pendidik Fiqih.",
  },
  {
    id: "t-13",
    name: "Kholil Misbah, Lc.",
    position: "Guru",
    subject: "Guru Bahasa Arab",
    photo: "",
    education: "S1 Lisensiat (Lc.) Bahasa & Sastra Arab",
    bio: "Tenaga Pendidik Bahasa Arab.",
  },
  {
    id: "t-14",
    name: "Nurul Idhomah, S.pd.",
    position: "Guru",
    subject: "Guru Senibudaya Prakarya",
    photo: "",
    education: "S1 Pendidikan",
    bio: "Tenaga Pendidik Seni Budaya & Prakarya.",
  },
  {
    id: "t-15",
    name: "Khoirum Umala, S.pd.",
    position: "Guru",
    subject: "Guru Sosiologi, Ekonomi",
    photo: "",
    education: "S1 Pendidikan",
    bio: "Tenaga Pendidik Sosiologi & Ekonomi.",
  },
  {
    id: "t-16",
    name: "Tifani Ikmahtiar, S.Si.",
    position: "Guru",
    subject: "Guru Fisika, Biologi",
    photo: "",
    education: "S1 Sarjana Sains (S.Si)",
    bio: "Tenaga Pendidik Fisika & Biologi.",
  },
  {
    id: "t-17",
    name: "Fita Islamiah, S.pd.",
    position: "Guru",
    subject: "Guru Kimia, Biologi",
    photo: "",
    education: "S1 Pendidikan",
    bio: "Tenaga Pendidik Kimia & Biologi.",
  },
  {
    id: "t-18",
    name: "Utari Kartika, S.pd.",
    position: "Guru",
    subject: "Guru PKN",
    photo: "",
    education: "S1 Pendidikan Pancasila dan Kewarganegaraan",
    bio: "Tenaga Pendidik PKN.",
  },
  {
    id: "t-19",
    name: "Khoir Ummah",
    position: "Guru UMMI",
    subject: "Guru UMMI",
    photo: "",
    education: "Pengajar Tersertifikasi UMMI Foundation",
    bio: "Tenaga Pendidik Metode UMMI Al-Qur'an.",
  },
  {
    id: "t-20",
    name: "Nur Widia",
    position: "Guru UMMI",
    subject: "Guru UMMI",
    photo: "",
    education: "Pengajar Tersertifikasi UMMI Foundation",
    bio: "Tenaga Pendidik Metode UMMI Al-Qur'an.",
  },
  {
    id: "t-21",
    name: "Sri Wahyuni",
    position: "Guru UMMI",
    subject: "Guru UMMI",
    photo: "",
    education: "Pengajar Tersertifikasi UMMI Foundation",
    bio: "Tenaga Pendidik Metode UMMI Al-Qur'an.",
  },
];

export const initialExtracurriculars: ExtracurricularItem[] = [
  {
    id: "ekskul-1",
    name: "Desain Grafis",
    category: "Keterampilan",
    description: "",
    schedule: "",
    instructor: "",
    icon: "Palette",
    image: "",
  },
  {
    id: "ekskul-2",
    name: "Tata Boga",
    category: "Keterampilan",
    description: "",
    schedule: "",
    instructor: "",
    icon: "ChefHat",
    image: "",
  },
  {
    id: "ekskul-3",
    name: "Handy Craft",
    category: "Keterampilan",
    description: "",
    schedule: "",
    instructor: "",
    icon: "Scissors",
    image: "",
  },
  {
    id: "ekskul-4",
    name: "Menjahit",
    category: "Keterampilan",
    description: "",
    schedule: "",
    instructor: "",
    icon: "Shirt",
    image: "",
  },
  {
    id: "ekskul-5",
    name: "Futsal",
    category: "Olahraga",
    description: "",
    schedule: "",
    instructor: "",
    icon: "Trophy",
    image: "",
  },
  {
    id: "ekskul-6",
    name: "Al Banjari",
    category: "Keagamaan",
    description: "",
    schedule: "",
    instructor: "",
    icon: "Music",
    image: "",
  },
  {
    id: "ekskul-7",
    name: "Pencak Silat",
    category: "Olahraga",
    description: "",
    schedule: "",
    instructor: "",
    icon: "ShieldCheck",
    iconImage: "/pencak-silat2 (1).png",
    image: "",
  },
];

export const initialGallery: GalleryItem[] = [];

export const initialApplicants: PSBApplicant[] = [];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Kapan pendaftaran PSB SMA Al-Furqon Driyorejo T.A. 2026/2027 dibuka?",
    answer:
      "Pendaftaran Gelombang 1 dibuka mulai 2 Januari 2026 s.d. 30 April 2026. Gelombang 2 dibuka 1 Mei 2026 s.d. 10 Juli 2026 (selama kuota masih tersedia).",
    category: "PSB",
  },
  {
    id: "faq-2",
    question: "Apa saja syarat utama mendaftar sebagai calon santri baru?",
    answer:
      "Syarat utama: FC Ijazah/SKL SMP/MTs, FC Akta Kelahiran, FC Kartu Keluarga, Pasfoto 3x4 (3 lembar), dan mengisi Form Pendaftaran Online/Offline.",
    category: "PSB",
  },
  {
    id: "faq-3",
    question: "Bagaimana sistem pengajaran Al-Qur'an di SMA Al-Furqon?",
    answer:
      "Setiap pagi sebelum KBM reguler, siswa mengikuti bimbingan metode UMMI dan Tahfidz Al-Qur'an terstruktur dengan target minimal 3 Juz hafalan hingga wisuda.",
    category: "Kehidupan Santri",
  },
  {
    id: "faq-4",
    question: "Apakah SMA Al-Furqon menerapkan Kurikulum Merdeka?",
    answer:
      "Ya, SMA Al-Furqon Driyorejo menerapkan Kurikulum Merdeka secara penuh (Kategori Berbagi & Mandiri) yang dilengkapi Projek Penguatan Profil Pelajar Pancasila (P5).",
    category: "Kurikulum",
  },
  {
    id: "faq-5",
    question: "Apakah ada beasiswa bagi siswa berprestasi?",
    answer:
      "Kami menyediakan Beasiswa Tahfidz Al-Qur'an (bebas SPP), Beasiswa Juara Olimpiade Sains/Seni, serta beasiswa khusus alumni MTs Al-Furqon.",
    category: "PSB",
  },
];

export const initialTestimonials: TestimonialItem[] = [];

export const initialFacilities: FacilityItem[] = [
  {
    id: "fac-1",
    title: "Ruang Kelas Modern",
    desc: "Ruang belajar ber-AC yang bersih, berteknologi multimedia interaktif, pencahayaan ergonomis, dan suasana belajar yang kondusif.",
    iconName: "Building2",
    tag: "Fasilitas Belajar",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    standard: "Terbaik & Modern",
  },
  {
    id: "fac-2",
    title: "Laboratorium Canggih",
    desc: "Laboratorium Sains MIPA (Fisika, Kimia, Biologi) dengan peralatan eksperimen modern berstandar praktikum dan penelitian siswa.",
    iconName: "FlaskConical",
    tag: "Riset & Eksperimen",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    standard: "Terbaik & Modern",
  },
  {
    id: "fac-3",
    title: "Lab Informatika Digital",
    desc: "Laboratorium komputer multimedia spesifikasi tinggi, jaringan internet ultra-cepat, serta laboratorium IoT & literasi Artificial Intelligence.",
    iconName: "Laptop",
    tag: "Teknologi & Digital",
    image: "/labkomputer.jpeg",
    standard: "Terbaik & Modern",
  },
  {
    id: "fac-4",
    title: "Area Olahraga Terbaik",
    desc: "Fasilitas olahraga outdoor & indoor lengkap mencakup lapangan serbaguna futsal, basket, voli, serta gelanggang seni pencak silat.",
    iconName: "Trophy",
    tag: "Kebugaran & Seni",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    standard: "Terbaik & Modern",
  },
];

export const initialUsers: UserItem[] = [
  {
    id: "user-admin",
    name: "Administrator Sekolah",
    username: "admin",
    password: "admin123",
    role: "Admin",
    status: "Aktif",
    email: "admin@smaalfurqondriyorejo.sch.id",
    lastLogin: "2026-09-24 10:00 WIB",
  },
  {
    id: "user-1790261921861",
    name: "Dian purwanti",
    username: "dian",
    password: "dian123",
    role: "Editor Berita",
    status: "Aktif",
    email: "dianpurwanti@gmail.com",
    lastLogin: "2026-09-24 15:00 WIB",
  },
];

export function getTeacherPriority(t: TeacherItem): number {
  const name = (t.name || "").toLowerCase();
  const position = (t.position || (t as any).role || "").toLowerCase();

  if (t.id === "t-1" || name.includes("abdul muid") || position.includes("kadep") || position.includes("departemen")) return 1;
  if (t.id === "t-2" || name.includes("suryanto") || position.includes("kepala sekolah") || position.includes("kepsek")) return 2;
  if (t.id === "t-3" || name.includes("triana") || position.includes("kurikulum")) return 3;
  if (t.id === "t-4" || name.includes("suherman") || position.includes("kesiswaan")) return 4;
  if (position.includes("humas")) return 5;
  if (position.includes("sarpras")) return 6;
  if (position.includes("wakil") || position.includes("waka") || position.includes("wk.")) return 7;
  if (t.id === "t-5" || name.includes("alfiyatus") || position.includes("tata usaha") || position.includes("tu")) return 8;
  return 20;
}

export function sortTeachersByPriority(teachers: TeacherItem[]): TeacherItem[] {
  return [...teachers].sort((a, b) => getTeacherPriority(a) - getTeacherPriority(b));
}


