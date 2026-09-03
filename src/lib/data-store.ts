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

export const initialSchoolInfo: SchoolInfo = {
  name: "SMA AL-FURQON DRIYOREJO",
  tagline: "Dzikir - Fikir - Ikhtiar - Tawakal",
  npsn: "20500660",
  accreditation: "A (Unggulan)",
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
  headmasterPhoto: "/foto-kepala-sekolah.png",
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

export const initialNews: NewsItem[] = [
  {
    id: "news-1",
    title: "Allah Ku Ajukan Proposal Perubahanku",
    slug: "allah-ku-ajukan-proposal-perubahanku",
    excerpt:
      "Sukses sendiri itu biasa, Sukses bersama itu luar biasa. Langkah inspiratif santri SMA Al-Furqon dalam menyusun target impian hidup dan ibadah mandiri.",
    content:
      "Setiap manusia memiliki kesempatan emas untuk memproposalkan perubahan hidupnya di hadapan Allah SWT. Di SMA Al-Furqon Driyorejo, para siswa diajak merumuskan 'Proposal Hidup' yang memuat target spiritual, hafalan Al-Qur'an, dan impian studi lanjut. Pembiasaan shalat dhuha, tahajud, dan dzikir pagi menjadi bahan bakar utama dalam menggapai cita-cita tinggi.",
    category: "Berita",
    date: "2026-01-15",
    author: "Tim Humas SMA Al-Furqon",
    image: "/bg-al-furqon2.jpg",
    isFeatured: true,
    tags: ["Pendidikan Karakter", "Spiritual", "Al-Furqon"],
  },
  {
    id: "news-2",
    title: "Saatnya Memetik Buah Ilmu: Sertifikasi Al-Qur'an Metode UMMI 2026",
    slug: "saatnya-memetik-buah-ilmu",
    excerpt:
      "Pelaksanaan Munaqosyah dan Sertifikasi Tajwid & Tartil Al-Qur'an Metode UMMI berjalan khidmat dengan tingkat kelulusan 100%.",
    content:
      "Setelah menempuh proses panjang pembelajaran Al-Qur'an dengan metode UMMI, puluhan santri SMA Al-Furqon Driyorejo mengikuti ujian Munaqosyah resmi dari Ummi Foundation. Kegiatan ini disaksikan langsung oleh para orang tua wali murid yang terharu menyaksikan kualitas makhraj dan tajwid putra-putrinya.",
    category: "Prestasi",
    date: "2025-11-20",
    author: "Koordinator Keagamaan",
    image: "/bg-al-furqon3.jpg",
    isFeatured: true,
    tags: ["UMMI", "Al-Qur'an", "Sertifikasi"],
  },
  {
    id: "news-3",
    title: "In House Training (IHT) Implementasi Kurikulum Merdeka",
    slug: "in-house-training-iht-implementasi-kurikulum-merdeka",
    excerpt:
      "Peningkatan kapasitas dewan guru SMA Al-Furqon Driyorejo dalam menyusun modul ajar interaktif dan Pembelajaran Berbasis Proyek (P5).",
    content:
      "Dalam rangka memperkuat mutu pembelajaran berstandar tinggi, SMA Al-Furqon menyelenggarakan In House Training (IHT) Kurikulum Merdeka. Seluruh guru dilatih merancang Projek Penguatan Profil Pelajar Pancasila (P5) berwawasan lingkungan dan penguasaan teknologi pembelajaran modern.",
    category: "Agenda",
    date: "2025-08-10",
    author: "Waka Kurikulum",
    image: "/bg-al-furqon4.jpg",
    isFeatured: true,
    tags: ["Kurikulum Merdeka", "Guru", "Workshop"],
  },
  {
    id: "news-4",
    title: "Guruku Berubah Demi Dunia Pendidikan: Workshop Guru Kreatif Digital",
    slug: "guruku-berubah-demi-dunia-pendidikan",
    excerpt:
      "Transformasi metode mengajar berbasis media digital modern dan kecerdasan buatan demi menyambut siswa era Z & Alpha.",
    content:
      "Dunia pendidikan bergerak sangat cepat. Dewan guru SMA Al-Furqon berkomitmen untuk tidak ketinggalan dengan rutin mengikuti workshop pengembangan media pembelajaran digital, game-based learning, serta pemanfaatan visualisasi interaktif di kelas.",
    category: "Kegiatan",
    date: "2025-05-18",
    author: "Tim IT & Media",
    image: "/bg-al-furqon2.jpg",
    isFeatured: false,
    tags: ["Inovasi Guru", "Teknologi"],
  },
  {
    id: "news-5",
    title: "Fingerprint Santri Baru SMA Al-Furqon Driyorejo",
    slug: "fingerprint-santri-baru-sma-al-furqon-driyorejo",
    excerpt:
      "Penerapan sistem kehadiran berbasis Biometrik Fingerprint & Presensi Digital Otomatis yang terhubung langsung ke WhatsApp Orang Tua.",
    content:
      "Sebagai sekolah modern yang transparan, SMA Al-Furqon mengimplementasikan presensi santri berbasis fingerprint otomatis. Setiap kali siswa masuk dan pulang sekolah, notifikasi real-time terkirim ke ponsel orang tua wali murid.",
    category: "Berita",
    date: "2025-02-12",
    author: "Tim Kesiswaan",
    image: "/bg-al-furqon3.jpg",
    isFeatured: false,
    tags: ["Digitalisasi", "Sistem Sekolah"],
  },
  {
    id: "news-6",
    title: "Lomba Edu Science, Festival Budaya & Pameran Karya Adiwiyata Santri",
    slug: "lomba-edu-science-festival-dan-pameran",
    excerpt:
      "Pameran karya daur ulang sampah dan eksperimen sains siswa SMA Al-Furqon memukau para pengunjung festival kabupaten.",
    content:
      "Sebagai bagian dari komitmen peduli lingkungan, santri SMA Al-Furqon menampilkan produk inovasi eco-brick, sistem pengolahan kompos mandiri, serta robotik hidroponik pada Ajang Edu Science Festival Gresik.",
    category: "Kegiatan",
    date: "2025-01-25",
    author: "Tim Adiwiyata",
    image: "/bg-al-furqon4.jpg",
    isFeatured: false,
    tags: ["EduScience", "Adiwiyata"],
  },
];

export const initialAgenda: AgendaItem[] = [
  {
    id: "agenda-1",
    title: "Pelaksanaan Penilaian Sumatif Akhir Semester (PSAS) 2026",
    date: "2026-06-02",
    time: "07:00 - 12:30 WIB",
    location: "Gedung Utama SMA Al-Furqon",
    description: "Evaluasi hasil belajar siswa berbasis CBT Tablet & Komputer.",
    category: "Akademik",
  },
  {
    id: "agenda-2",
    title: "Munaqosyah Al-Qur'an & Wisuda Tahfidz Gelombang II",
    date: "2026-06-20",
    time: "08:00 - 15:00 WIB",
    location: "Aula Masjid Al-Furqon Driyorejo",
    description: "Ujian terbuka hafalan Al-Qur'an Juz 30, 1, 2, dan 3.",
    category: "Keagamaan",
  },
  {
    id: "agenda-3",
    title: "Peringatan Hari Lingkungan Hidup & Aksi Tanam 1000 Pohon",
    date: "2026-07-05",
    time: "06:30 - 11:00 WIB",
    location: "Kawasan Wedoroanom Driyorejo",
    description: "Aksi nyata peduli lingkungan hijau oleh santri & dewan guru.",
    category: "Kesiswaan",
  },
  {
    id: "agenda-4",
    title: "Sosialisasi & Masuk Sekolah Santri Baru (MPLS Islami) 2026/2027",
    date: "2026-07-14",
    time: "07:00 - 14:00 WIB",
    location: "Sekolah SMA Al-Furqon",
    description: "Masa Pengenalan Lingkungan Sekolah berkarakter Islami & ramah santri.",
    category: "Umum",
  },
];

export const initialAchievements: AchievementItem[] = [
  {
    id: "achieve-1",
    title: "Juara 1 Olimpiade Matematika Sains SMA Se-Jawa Timur",
    event: "Jatim Islamic Science Competition 2025",
    level: "Provinsi",
    rank: "Juara 1",
    category: "Akademik",
    studentName: "Ahmad Rizky Pratama",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    description: "Meraih medali emas kategori matematika penalaran tingkat SMA se-Jawa Timur.",
  },
  {
    id: "achieve-2",
    title: "Medali Emas Musabaqah Tilawatil Qur'an (MTQ) Kategori 5 Juz",
    event: "MTQ Pelajar Kabupaten Gresik 2025",
    level: "Kabupaten",
    rank: "Juara 1",
    category: "Keagamaan",
    studentName: "Nur Fatimah Azzahra",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80",
    description: "Menampilkan bacaan tartil dan tajwid sempurna dengan nilai 98.5.",
  },
  {
    id: "achieve-3",
    title: "Juara 2 Inovasi Teknologi Hijau & Robotik Hidroponik",
    event: "National Green Tech Innovation Expo 2025",
    level: "Nasional",
    rank: "Juara 2",
    category: "Akademik",
    studentName: "Tim Robotik Al-Furqon (Dimas & Rayhan)",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Menciptakan alat penyiram dan pemupuk hidroponik otomatis berbasis solar panel.",
  },
  {
    id: "achieve-4",
    title: "Juara 1 Pencak Silat Seni Tunggal Putra Suci Gresik",
    event: "Kejuaraan Silat Pelajar Jawa Timur 2025",
    level: "Provinsi",
    rank: "Juara 1",
    category: "Olahraga",
    studentName: "Muhammad Farhan Siddiq",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    description: "Memperoleh nilai tertinggi pada ketepatan jurus seni bela diri tradisional.",
  },
  {
    id: "achieve-5",
    title: "Juara 1 Kaligrafi Islam Kontemporer Festival Seni",
    event: "Festival Seni Islami Pelajar 2024",
    level: "Kabupaten",
    rank: "Juara 1",
    category: "Seni",
    studentName: "Siti Maryam Choirunnisa",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    description: "Karya seni kaligrafi kontemporer dengan perpaduan ornamen batik nusantara.",
  },
  {
    id: "achieve-6",
    title: "Juara 3 Debat Bahasa Inggris & Pidato Bahasa Arab",
    event: "Language Olympiad East Java 2024",
    level: "Provinsi",
    rank: "Juara 3",
    category: "Non-Akademik",
    studentName: "Bagus Setiawan & Aisyah Putri",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    description: "Unjuk kebolehan berbahasa asing dengan topik diplomasi pemuda Muslim dunia.",
  },
];

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
    photo: "/foto-guru/suryanto.png",
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
    id: "extra-1",
    name: "Desain Grafis",
    category: "Sains & Teknologi",
    description: "Pelatihan kreativitas visual, penguasaan aplikasi desain grafis, ilustrasi digital, editing media, dan pembuatan konten kreatif.",
    schedule: "Jumat (09:00 - 11:00 WIB)",
    instructor: "Tim IT & Media Al-Furqon",
    icon: "Palette",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    achievements: ["Juara Desain Poster Pelajar Jatim", "Pameran Desain Grafis Santri"],
  },
  {
    id: "extra-2",
    name: "Tata Boga",
    category: "Keterampilan",
    description: "Seni olah kuliner Islami, pembuatan kue & pastry, tata hidang modern, serta wirausaha makanan.",
    schedule: "Jumat (09:00 - 11:00 WIB)",
    instructor: "Instruktur Tata Boga",
    icon: "ChefHat",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    achievements: ["Juara Kreasi Olahan Pangan Lokal", "Pameran Culinary Student Expo"],
  },
  {
    id: "extra-3",
    name: "Handy Craft",
    category: "Seni & Budaya",
    description: "Kreasi kerajinan tangan berbahan daur ulang, aksesoris unik, dan pembuatan produk souvenir kreatif.",
    schedule: "Jumat (09:00 - 11:00 WIB)",
    instructor: "Tim Seni Kreatif",
    icon: "Scissors",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    achievements: ["Penghargaan Produk Adiwiyata Kreatif", "Juara Crafting Pelajar"],
  },
  {
    id: "extra-4",
    name: "Menjahit",
    category: "Keterampilan",
    description: "Keterampilan tata busana dasar hingga mahir, merancang pola, menjahit pakaian, dan kreasi pashmina.",
    schedule: "Jumat (09:00 - 11:00 WIB)",
    instructor: "Instruktur Busana",
    icon: "Shirt",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80",
    achievements: ["Karya Busana Santri Al-Furqon", "Sertifikasi Menjahit Busana"],
  },
  {
    id: "extra-5",
    name: "Futsal",
    category: "Olahraga",
    description: "Pengembangan bakat olahraga futsal, ketahanan fisik, strategi permainan, dan turnamen antar-pelajar.",
    schedule: "Jumat (09:00 - 11:00 WIB)",
    instructor: "Coach Futsal Al-Furqon",
    icon: "Trophy",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    achievements: ["Juara 1 Turnamen Futsal Pelajar Gresik", "Best Player Turnamen Futsal"],
  },
  {
    id: "extra-6",
    name: "Al Banjari",
    category: "Keagamaan",
    description: "Seni musik tradisional rebana Al-Banjari, pembacaan sholawat, dan pertunjukan seni Islami.",
    schedule: "Jumat (09:00 - 11:00 WIB)",
    instructor: "Pembina Seni Hadrah",
    icon: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    achievements: ["Juara 1 Festival Hadrah Banjari Jatim", "Pentas Seni Keagamaan"],
  },
  {
    id: "extra-7",
    name: "Pencak Silat",
    category: "Olahraga",
    description: "Seni olahraga bela diri pencak silat nusantara untuk pembentukan mental, ketangkasan fisik, dan pertahanan diri.",
    schedule: "Jumat (09:00 - 11:00 WIB)",
    instructor: "Pelatih Pencak Silat",
    iconImage: "/pencak-silat2 (1).png",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    achievements: ["Juara 1 Seni Tunggal Pelajar Jatim", "Medali Emas Kejurkab Silat"],
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: "g-1",
    title: "Workshop Guru Kreatif & Inovasi Pembelajaran Digital",
    category: "Kegiatan",
    imageUrl:
      "/bg-al-furqon2.jpg",
    date: "2025-08-10",
    description: "Dokumentasi pelatihan dewan guru SMA Al-Furqon dalam pengembangan media digital modern.",
  },
  {
    id: "g-2",
    title: "Sertifikasi & Munaqosyah Al-Qur'an Metode UMMI",
    category: "Keagamaan",
    imageUrl:
      "/bg-al-furqon3.jpg",
    date: "2025-11-20",
    description: "Ujian terbuka hafalan Al-Qur'an santri disaksikan orang tua wali murid.",
  },
  {
    id: "g-3",
    title: "Praktikum Laboratorium Sains Berbasis Projek (P5)",
    category: "Pembelajaran",
    imageUrl:
      "/bg-al-furqon4.jpg",
    date: "2025-09-14",
    description: "Siswa melakukan eksperimen uji kadar air tanah dan pupuk organik daur ulang.",
  },
  {
    id: "g-4",
    title: "Aksi Tanam 1000 Pohon & Green School Adiwiyata",
    category: "Lingkungan Sekolah",
    imageUrl:
      "/bg-al-furqon2.jpg",
    date: "2025-07-05",
    description: "Penanaman bibit pohon di halaman hijau sekolah SMA Al-Furqon Driyorejo.",
  },
  {
    id: "g-5",
    title: "Penyerahan Trofi Juara 1 Olimpiade Sains Jatim",
    category: "Prestasi",
    imageUrl:
      "/bg-al-furqon3.jpg",
    date: "2025-10-02",
    description: "Momen penganugerahan medali emas oleh Dinas Pendidikan Provinsi.",
  },
  {
    id: "g-6",
    title: "Latihan Rutin Ekstrakurikuler Robotik & IoT",
    category: "Ekstrakurikuler",
    imageUrl:
      "/bg-al-furqon4.jpg",
    date: "2025-10-18",
    description: "Siswa merakit sensor suhu otomatis untuk greenhouse sekolah.",
  },
  {
    id: "g-7",
    title: "Kajian Rutin & Sholat Dhuha Berjamaah Santri",
    category: "Keagamaan",
    imageUrl:
      "/bg-al-furqon2.jpg",
    date: "2025-12-01",
    description: "Pembiasaan ibadah harian dan kebersamaan di masjid sekolah.",
  },
  {
    id: "g-8",
    title: "Pentas Seni & Budaya Nusantara Santri Al-Furqon",
    category: "Kegiatan",
    imageUrl:
      "/bg-al-furqon3.jpg",
    date: "2025-12-15",
    description: "Pertunjukan bakat seni tari, al-banjari, dan drama pahlawan Islami.",
  },
  {
    id: "g-9",
    title: "Upacara Bendera & Peringatan Hari Pendidikan",
    category: "Kegiatan",
    imageUrl:
      "/bg-al-furqon4.jpg",
    date: "2025-05-02",
    description: "Khidmat upacara memperingati Hari Pendidikan Nasional di lapangan utama.",
  },
];

export const initialApplicants: PPDBApplicant[] = [
  {
    id: "ppdb-001",
    registrationNumber: "PPDB-2026-001",
    registrationDate: "2026-02-01",
    status: "Diterima",

    // Step 1
    fullName: "Muhammad Hafiz Ar-Rasyid",
    birthPlace: "Gresik",
    birthDate: "2010-05-14",
    gender: "Laki-laki",
    siblingsCount: "2",
    childNumber: "1",
    address: "Jl. Raya Driyorejo No. 45, Gresik",
    nik: "3525011405100001",
    nisn: "0089123456",

    // Step 2
    schoolLevel: "SMP / MTs",
    originSchool: "SMP Negeri 1 Driyorejo",
    npsnSchool: "20501234",
    originSchoolAddress: "Jl. Raya Driyorejo No. 12, Gresik",
    graduationYear: "2026",

    // Step 3
    fatherName: "Drs. H. Bambang Hidayat",
    fatherAddress: "Jl. Raya Driyorejo No. 45, Gresik",
    fatherEducation: "D.4 / S.1",
    fatherOccupation: "PNS",
    fatherPhone: "081234567890",

    motherName: "Hj. Siti Aminah",
    motherAddress: "Jl. Raya Driyorejo No. 45, Gresik",
    motherEducation: "SMA / MA / SMK",
    motherOccupation: "IRT",
    motherPhone: "081234567891",

    // Step 4
    hasGuardian: "Tidak",

    // Compatibility fields
    parentName: "Drs. H. Bambang Hidayat",
    phoneWhatsapp: "081234567890",
    selectedMajor: "Kurikulum Merdeka Unggulan",
  },
  {
    id: "ppdb-002",
    registrationNumber: "PPDB-2026-002",
    registrationDate: "2026-02-03",
    status: "Terverifikasi",

    // Step 1
    fullName: "Naila Syahda Az-Zahra",
    birthPlace: "Gresik",
    birthDate: "2010-08-20",
    gender: "Perempuan",
    siblingsCount: "3",
    childNumber: "2",
    address: "Wedoroanom RT 04 RW 02 Driyorejo, Gresik",
    nik: "3525012008100002",
    nisn: "0087654321",

    // Step 2
    schoolLevel: "SMP / MTs",
    originSchool: "MTs Al-Furqon Driyorejo",
    npsnSchool: "20505678",
    originSchoolAddress: "Jl. KH. Abdurrohim No.01, Wedoroanom",
    graduationYear: "2026",

    // Step 3
    fatherName: "H. Ahmad Fauzi",
    fatherAddress: "Wedoroanom RT 04 RW 02 Driyorejo",
    fatherEducation: "D.4 / S.1",
    fatherOccupation: "Wiraswasta",
    fatherPhone: "085712349988",

    motherName: "Hajah Rahmawati",
    motherAddress: "Wedoroanom RT 04 RW 02 Driyorejo",
    motherEducation: "SMA / MA / SMK",
    motherOccupation: "Pedagang",
    motherPhone: "085712349988",

    // Step 4
    hasGuardian: "Tidak",

    // Compatibility fields
    parentName: "Hajah Rahmawati",
    phoneWhatsapp: "085712349988",
    selectedMajor: "MIPA / IPA",
  },
  {
    id: "ppdb-003",
    registrationNumber: "PPDB-2026-003",
    registrationDate: "2026-02-05",
    status: "Menunggu Verifikasi",

    // Step 1
    fullName: "Fathan Al-Ghazali",
    birthPlace: "Surabaya",
    birthDate: "2010-11-03",
    gender: "Laki-laki",
    siblingsCount: "1",
    childNumber: "1",
    address: "Kebraon Permai Blok E-12, Surabaya",
    nik: "3578010311100003",
    nisn: "0089988776",

    // Step 2
    schoolLevel: "SMP / MTs",
    originSchool: "SMP Negeri 2 Karangpilang",
    npsnSchool: "20509988",
    originSchoolAddress: "Kebraon, Karangpilang, Surabaya",
    graduationYear: "2026",

    // Step 3
    fatherName: "Suryanto, S.E.",
    fatherAddress: "Kebraon Permai Blok E-12, Surabaya",
    fatherEducation: "D.4 / S.1",
    fatherOccupation: "Pegawai Swasta",
    fatherPhone: "082198765432",

    motherName: "Dwi Astuti, S.Pd.",
    motherAddress: "Kebraon Permai Blok E-12, Surabaya",
    motherEducation: "D.4 / S.1",
    motherOccupation: "Guru",
    motherPhone: "082198765433",

    // Step 4
    hasGuardian: "Ya",
    guardianName: "Budi Santoso",
    guardianAddress: "Kebraon Permai Blok E-14, Surabaya",
    guardianRelation: "Keluarga",
    guardianPhone: "081398765434",

    // Compatibility fields
    parentName: "Suryanto, S.E.",
    phoneWhatsapp: "082198765432",
    selectedMajor: "IPS",
  },
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Kapan pendaftaran PPDB SMA Al-Furqon Driyorejo T.A. 2026/2027 dibuka?",
    answer:
      "Pendaftaran Gelombang 1 dibuka mulai 2 Januari 2026 s.d. 30 April 2026. Gelombang 2 dibuka 1 Mei 2026 s.d. 10 Juli 2026 (selama kuota masih tersedia).",
    category: "PPDB",
  },
  {
    id: "faq-2",
    question: "Apa saja syarat utama mendaftar sebagai calon peserta didik baru?",
    answer:
      "Syarat utama: FC Ijazah/SKL SMP/MTs, FC Akta Kelahiran, FC Kartu Keluarga, Pasfoto 3x4 (3 lembar), dan mengisi Form Pendaftaran Online/Offline.",
    category: "PPDB",
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
    category: "PPDB",
  },
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Elvina Cahyani",
    role: "Alumni",
    graduationYear: "Alumni Diterima di ITS SURABAYA",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    content:
      "Selama saya belajar di SMA PP. Al Furqon, selain saya mendapat ilmu agama dan Al Qur'an metode UMMI, saya juga mendapat bimbingan LKTI dan bimbingan masuk Perguruan Tinggi Negeri, sehingga saya diterima di ITS. Terima kasih Al Furqon.",
    rating: 5,
  },
  {
    id: "testi-2",
    name: "Afif Hidayatulloh, S.E., S.Pd., M.Ak., C.HT C.NNLP",
    role: "Alumni",
    graduationYear: "Dosen, Praktisi, & Motivator",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    content:
      "Di SMA PP. Al Furqon tidak hanya diajarkan hard skill tapi soft skill. Itu diasah dengan sangat luar biasa sehingga mampu mencetak santri yang unggul dalam intelektual dan anggun dalam moralitas.",
    rating: 5,
  },
  {
    id: "testi-3",
    name: "Adinda Puspitasari",
    role: "Alumni",
    graduationYear: "Alumni Diterima di UNESA",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    content:
      "Bersekolah di SMA PP. Al Furqon yang notabene berbasis pesantren, namun tidak diragukan lagi untuk kualitas pendidikan formalnya, apalagi sekarang sudah menjadi sekolah penggerak yang mewujudkan visi pendidikan Indonesia untuk mencetak generasi unggul segala bidang.",
    rating: 5,
  },
  {
    id: "testi-4",
    name: "Nanang Priyatnahari",
    role: "Orang Tua Wali",
    graduationYear: "Pensiunan PT. Petrokimia Gresik / Praktisi Vokasi",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    content:
      "SMA PP. Al Furqon adalah sekolah menengah umum yang berlandaskan keagamaan yang kuat, dengan manajemen yang inovatif dengan dukungan dari perguruan tinggi dan industri. Sangat layak menjadi pilihan utama!",
    rating: 5,
  },
];

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
    id: "user-1",
    name: "Administrator Utama",
    username: "admin",
    password: "admin123",
    role: "Super Admin",
    status: "Aktif",
    email: "admin@smaalfurqon.sch.id",
    lastLogin: "2026-08-26 11:30 WIB",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "user-2",
    name: "Humas & Publikasi",
    username: "smalfurqon",
    password: "admin123",
    role: "Administrator",
    status: "Aktif",
    email: "humas@smaalfurqon.sch.id",
    lastLogin: "2026-08-25 15:45 WIB",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "user-3",
    name: "Panitia PPDB 2026",
    username: "ppdb2026",
    password: "ppdb123",
    role: "Petugas PPDB",
    status: "Aktif",
    email: "ppdb@smaalfurqon.sch.id",
    lastLogin: "2026-08-24 09:15 WIB",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
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


