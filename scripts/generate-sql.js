const fs = require("fs");
const path = require("path");

// Sample news to make website complete out of the box
const sampleNews = [
  {
    id: "news-1",
    title: "Munaqosyah Tahfidz Al-Qur'an Metode UMMI Angkatan 2026 Berjalan Khidmat",
    slug: "munaqosyah-tahfidz-metode-ummi-2026",
    excerpt: "Sebanyak puluhan santri SMA Al-Furqon Driyorejo mengikuti uji publik dan munaqosyah tahfidz Al-Qur'an metode UMMI dengan predikat membanggakan.",
    content: "Alhamdulillah, SMA Al-Furqon Driyorejo sukses menggelar agenda tahunan Munaqosyah dan Imtihan Terbuka Tahfidz Al-Qur'an Metode UMMI. Kegiatan ini diikuti oleh para santri yang telah menyelesaikan target hafalan minimal 3 juz (Juz 30, 29, dan 1) dengan tartil dan tajwid yang terstandarisasi langsung oleh penguji Ummi Foundation Surabaya.\n\nKepala Sekolah SMA Al-Furqon menyampaikan apresiasi setinggi-tingginya kepada para santri dan pembina atas dedikasi dan ikhtiar yang tiada henti dalam menjaga kalam Ilahi.",
    category: "Kegiatan",
    date: "12 Oktober 2026",
    author: "Humas SMA Al-Furqon",
    image: "/bg-al-furqon3.jpg",
    is_featured: 1,
    tags: JSON.stringify(["Tahfidz", "MetodeUMMI", "AlQuran", "SMAAlFurqon"]),
    youtube_url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    status: "published"
  },
  {
    id: "news-2",
    title: "Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 Resmi Dibuka",
    slug: "penerimaan-santri-baru-psb-2026-2027-resmi-dibuka",
    excerpt: "SMA Al-Furqon Driyorejo membuka pendaftaran santri baru untuk tahun ajaran 2026/2027 dengan berbagai jalur beasiswa unggulan.",
    content: "Kabar gembira bagi calon peserta didik dan santri di seluruh Indonesia. SMA Al-Furqon Driyorejo Gresik secara resmi membuka pendaftaran santri baru (PSB) untuk Tahun Ajaran 2026/2027.\n\nKami menawarkan program unggulan Kurikulum Merdeka yang dipadukan dengan kepesantrenan Ahlussunnah wal Jama'ah, program Tahfidz UMMI, serta pembinaan minat bakat melalui berbagai ekstrakurikuler modern.",
    category: "Berita",
    date: "10 Oktober 2026",
    author: "Panitia PSB Al-Furqon",
    image: "/bg-al-furqon.jpg",
    is_featured: 1,
    tags: JSON.stringify(["PSB2026", "SantriBaru", "Pendaftaran", "Beasiswa"]),
    youtube_url: "",
    status: "published"
  },
  {
    id: "news-3",
    title: "Kader Adiwiyata SMA Al-Furqon Panen Sayur Hidroponik dan Produksi Eco-Enzyme",
    slug: "kader-adiwiyata-panen-hidroponik-eco-enzyme",
    excerpt: "Inovasi peduli lingkungan terus digalakkan para santri melalui kebun hijau hidroponik dan pengolahan limbah organik sekolah.",
    content: "Gerakan Sekolah Hijau dan Zero Waste di SMA Al-Furqon kembali menorehkan prestasi nyata. Kader Adiwiyata sekolah berhasil memanen puluhan kilogram sayuran segar dari instalasi kebun hidroponik serta memproduksi cairan pembersih ramah lingkungan Eco-Enzyme hasil fermentasi limbah kulit buah kantin sekolah.",
    category: "Kegiatan",
    date: "05 Oktober 2026",
    author: "Tim Adiwiyata",
    image: "/bg-al-furqon4.jpg",
    is_featured: 0,
    tags: JSON.stringify(["Adiwiyata", "ZeroWaste", "Hidroponik", "SekolahHijau"]),
    youtube_url: "",
    status: "published"
  }
];

const sampleAchievements = [
  {
    id: "ach-1",
    title: "Juara 1 Musabaqah Hifdzil Qur'an (MHQ) 5 Juz Tingkat Jawa Timur",
    student_name: "Muhammad Fatih Al-Ghifari",
    category: "Keagamaan",
    level: "Provinsi",
    rank: "Juara 1",
    year: "2026",
    description: "Meraih juara pertama dalam ajang Festival Seni Islami dan Tahfidz Al-Qur'an se-Jawa Timur.",
    image: "/prestasi1.jpg"
  },
  {
    id: "ach-2",
    title: "Medali Emas Kejuaraan Pencak Silat Pelajar Tingkat Kabupaten Gresik",
    student_name: "Ahmad Royhan Ma'sum",
    category: "Olahraga",
    level: "Kabupaten",
    rank: "Medali Emas",
    year: "2026",
    description: "Memenangkan kategori tanding kelas C putra pada Kejuaraan Pencak Silat Pelajar Gresik.",
    image: "/pencak-silat2 (1).png"
  },
  {
    id: "ach-3",
    title: "Juara 2 Olimpiade Sains Nasional (OSN) Bidang Geografi",
    student_name: "Aisyah Nur Rahmawati",
    category: "Akademik",
    level: "Kabupaten",
    rank: "Juara 2",
    year: "2025",
    description: "Membawa nama harum sekolah dalam kompetisi sains geografi tingkat kabupaten.",
    image: "/prestasi3.jpg"
  }
];

const sampleAgendas = [
  {
    id: "agenda-1",
    title: "Simulasi TKA & Ujian Sekolah Kelas XII",
    date: "2026-10-20",
    time: "07:30 - 12:00 WIB",
    location: "Lab Komputer & Ruang Kelas XII",
    description: "Simulasi Tes Kemampuan Akademik berbasis komputer untuk menguji kesiapan materi dan mental santri menghadapi seleksi PTN.",
    category: "Akademik"
  },
  {
    id: "agenda-2",
    title: "Munaqosyah Tahfidz Metode UMMI",
    date: "2026-11-05",
    time: "08:00 - 14:00 WIB",
    location: "Masjid Utama Al-Furqon",
    description: "Ujian terbuka hafalan Al-Qur'an minimal 3 Juz oleh Tim Penguji Resmi Ummi Foundation Surabaya.",
    category: "Keagamaan"
  },
  {
    id: "agenda-3",
    title: "Peringatan Hari Santri Nasional & Furqon Festival",
    date: "2026-10-22",
    time: "08:00 - 15:00 WIB",
    location: "Halaman & Aula Pertemuan Sekolah",
    description: "Rangkaian lomba keislaman antar-santri, pameran inovasi P5, dan tabligh akbar bersama pengasuh pesantren.",
    category: "Kesiswaan"
  },
  {
    id: "agenda-4",
    title: "Bakti Sosial & Safari Ramadan Santri",
    date: "2026-11-15",
    time: "09:00 - 16:00 WIB",
    location: "Desa Binaan Driyorejo Gresik",
    description: "Penyaluran zakat, infaq, dan sembako serta pengabdian masyarakat oleh Organisasi Santri SMA Al-Furqon.",
    category: "Umum"
  }
];

const sampleGallery = [
  {
    id: "gal-1",
    title: "Kegiatan Belajar Mengajar di Lab Komputer Modern",
    category: "Pembelajaran",
    imageurl: "/labkomputer.jpeg",
    date: "2026-10-01",
    description: "Praktikum literasi digital dan pemrograman santri SMA Al-Furqon."
  },
  {
    id: "gal-2",
    title: "Gedung Utama dan Halaman Asri Pesantren Al-Furqon",
    category: "Lingkungan Sekolah",
    imageurl: "/bg-al-furqon2.jpg",
    date: "2026-09-28",
    description: "Suasana pagi yang sejuk dan asri di lingkungan SMA & Pondok Pesantren Al-Furqon Driyorejo."
  },
  {
    id: "gal-3",
    title: "Latihan Rutin Ekstrakurikuler Pencak Silat",
    category: "Ekstrakurikuler",
    imageurl: "/pencak-silat2 (1).png",
    date: "2026-09-25",
    description: "Latihan bela diri pencak silat untuk mengasah ketahanan fisik, mental, dan sportivitas santri."
  }
];

const sampleTestimonials = [
  {
    id: "testi-1",
    name: "Ahmad Faiz Syihab, S.Kom.",
    role: "Alumni 2022",
    graduation_year: "2022",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    content: "Belajar di SMA Al-Furqon memberikan keseimbangan antara bekal ilmu agama yang kuat dan keterampilan teknologi masa depan. Kini saya kuliah di PTN jurusan Teknik Informatika dengan bekal pondasi yang kokoh.",
    rating: 5
  },
  {
    id: "testi-2",
    name: "Hj. Siti Rohmah, S.Pd.",
    role: "Orang Tua Wali Santri",
    graduation_year: "",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    content: "Alhamdulillah, karakter anak saya jauh lebih mandiri, santun, dan hafal Al-Qur'an dengan tartil metode Ummi. Sekolah yang sangat tepat untuk pendidikan generasi Rabbani.",
    rating: 5
  }
];

const schoolData = {
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
  vision: "Terbentuknya insan yang ahli dzikir, fikir, ikhtiar dan tawakal",
  missions: [
    "Menyelenggarakan pendidikan yang berorientasi pada karakter moral yang islami",
    "Menyelenggarakan pendidikan yang berorientasi pada karakter kinerja yang kerja keras, ulet, tangguh, tak mudah menyerah, dan tuntas.",
    "Mengoptimalkan peran serta pemangku kepentingan untuk mendukung transformasi dan reformasi pengelolaan pendidikan dan kebudayaan",
    "Membentuk manusia yang kritis, kreatif, komunikatif, dan kolaboratif.",
    "Membentuk manusia yang mempunyai minat baca tinggi wawasan budaya teknologi dan keuangan.",
    "Membentuk peserta didik yang berbudi luhur, hormat, dan santun kepada orang tua, guru dan cinta tanah air."
  ],
  goals: [
    "Mencetak lulusan berkarakter Islami unggul yang menghafal minimal 3 Juz Al-Qur'an dan tartil bacaan.",
    "Meningkatkan persentase kelulusan peserta didik masuk Perguruan Tinggi Negeri (PTN) dan kedinasan unggulan.",
    "Meraih prestasi dalam olimpiade sains, olahraga, seni, dan keagamaan tingkat kabupaten, provinsi, hingga nasional.",
    "Mewujudkan ekosistem pendidikan berwawasan teknologi digital yang aman, nyaman, dan peduli lingkungan sosial."
  ],
  headmasterName: "Dr. Suryanto, S.Pd., M.Pd.",
  headmasterPhoto: "/Pak Sur.jpeg",
  headmasterWelcome: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur kepada Allah SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerah-Nya. SMA AL-FURQON merupakan salah satu unit pendidikan dengan penyelenggara Pondok Pesantren AL-FURQON. Kami berharap masyarakat bisa mengakses website ini sebagai sarana informasi dan komunikasi terutama yang berhubungan dengan pendidikan, ilmu pengetahuan dan informasi seputar SMA AL-FURQON Driyorejo.",
  stats: {
    students: 480,
    teachers: 21,
    classes: 15,
    achievementsCount: 124,
    alumniCount: 1850,
    establishedYear: 1995
  }
};

const users = [
  {
    id: "user-admin",
    name: "Administrator Sekolah",
    username: "admin",
    password: "admin123",
    role: "Admin",
    status: "Aktif",
    email: "admin@smaalfurqondriyorejo.sch.id"
  },
  {
    id: "user-1790261921861",
    name: "Dian purwanti",
    username: "dian",
    password: "dian123",
    role: "Editor Berita",
    status: "Aktif",
    email: "dianpurwanti@gmail.com"
  }
];

const teachers = [
  {
    id: "t-1",
    name: "Dr. H. Abdul Muid, M.Pd.I.",
    position: "Kadep Pendidikan",
    subject: "Guru Aswaja",
    photo: "/foto-guru/abdul-muid.jpg",
    education: "S3 / Doktor Pendidikan Agama Islam",
    bio: "Kepala Departemen Pendidikan Yayasan PP. Al-Furqon."
  },
  {
    id: "t-2",
    name: "Dr. Suryanto, S.Pd., M.Pd.",
    position: "Kepala Sekolah",
    subject: "Manajemen Sekolah",
    photo: "/Pak Sur.jpeg",
    education: "S2 Magister Pendidikan",
    bio: "Kepala Sekolah SMA Al-Furqon Driyorejo."
  },
  {
    id: "t-3",
    name: "Triana Dewitasari, S.Pd.",
    position: "Wk. Kurikulum",
    subject: "Guru Geografi",
    photo: "/foto-guru/triana-dewitasari.jpg",
    education: "S1 Pendidikan Geografi",
    bio: "Wakil Kepala Sekolah Bidang Kurikulum."
  },
  {
    id: "t-4",
    name: "Suherman, M.Pd. I.",
    position: "Wk. Kesiswaan",
    subject: "Guru PJOK",
    photo: "/foto-guru/suherman.jpg",
    education: "S2 Magister Pendidikan Islam",
    bio: "Wakil Kepala Sekolah Bidang Kesiswaan."
  },
  {
    id: "t-5",
    name: "Siti Alfiyatus Sa'diyah, S.Pd",
    position: "Tata Usaha (TU)",
    subject: "Administrasi Sekolah",
    photo: "/foto-guru/siti-alfiyatus.jpg",
    education: "S1 Pendidikan",
    bio: "Staf Tata Usaha SMA Al-Furqon Driyorejo."
  },
  {
    id: "t-6",
    name: "Husnul Wafa, M.Pd.",
    position: "Guru",
    subject: "Guru PAI",
    photo: "",
    education: "S2 Magister Pendidikan",
    bio: "Tenaga Pendidik Pendidikan Agama Islam."
  },
  {
    id: "t-7",
    name: "M. Refa Mashuri, S.Pd.",
    position: "Guru",
    subject: "Guru PAI",
    photo: "",
    education: "S1 Pendidikan Agama Islam",
    bio: "Tenaga Pendidik Pendidikan Agama Islam."
  },
  {
    id: "t-8",
    name: "Syaifuddin Yahya, M.Pd.I",
    position: "Guru",
    subject: "Guru Fiqih",
    photo: "",
    education: "S2 Magister Pendidikan Islam",
    bio: "Tenaga Pendidik Fiqih & Keislaman."
  },
  {
    id: "t-9",
    name: "Sugeng Utomo, S.Pd.",
    position: "Guru",
    subject: "Guru Matematika",
    photo: "",
    education: "S1 Pendidikan Matematika",
    bio: "Tenaga Pendidik Matematika."
  },
  {
    id: "t-10",
    name: "M. Mas'ud Yunus, S.Pd.",
    position: "Guru",
    subject: "Guru B. Indonesia",
    photo: "",
    education: "S1 Pendidikan Bahasa Indonesia",
    bio: "Tenaga Pendidik Bahasa Indonesia."
  },
  {
    id: "t-11",
    name: "Masyhudan, S.T",
    position: "Guru",
    subject: "Guru Sejarah",
    photo: "",
    education: "S1 Sarjana Teknik",
    bio: "Tenaga Pendidik Sejarah."
  },
  {
    id: "t-12",
    name: "Nuril Habibi, M.Hi",
    position: "Guru",
    subject: "Guru Fiqih",
    photo: "",
    education: "S2 Magister Hukum Islam",
    bio: "Tenaga Pendidik Fiqih."
  },
  {
    id: "t-13",
    name: "Kholil Misbah, Lc.",
    position: "Guru",
    subject: "Guru Bahasa Arab",
    photo: "",
    education: "S1 Lisensiat (Lc.) Bahasa & Sastra Arab",
    bio: "Tenaga Pendidik Bahasa Arab."
  },
  {
    id: "t-14",
    name: "Nurul Idhomah, S.pd.",
    position: "Guru",
    subject: "Guru Senibudaya Prakarya",
    photo: "",
    education: "S1 Pendidikan",
    bio: "Tenaga Pendidik Seni Budaya & Prakarya."
  },
  {
    id: "t-15",
    name: "Khoirum Umala, S.pd.",
    position: "Guru",
    subject: "Guru Sosiologi, Ekonomi",
    photo: "",
    education: "S1 Pendidikan",
    bio: "Tenaga Pendidik Sosiologi & Ekonomi."
  },
  {
    id: "t-16",
    name: "Tifani Ikmahtiar, S.Si.",
    position: "Guru",
    subject: "Guru Fisika, Biologi",
    photo: "",
    education: "S1 Sarjana Sains (S.Si)",
    bio: "Tenaga Pendidik Fisika & Biologi."
  },
  {
    id: "t-17",
    name: "Fita Islamiah, S.pd.",
    position: "Guru",
    subject: "Guru Kimia, Biologi",
    photo: "",
    education: "S1 Pendidikan",
    bio: "Tenaga Pendidik Kimia & Biologi."
  },
  {
    id: "t-18",
    name: "Utari Kartika, S.pd.",
    position: "Guru",
    subject: "Guru PKN",
    photo: "",
    education: "S1 Pendidikan Pancasila dan Kewarganegaraan",
    bio: "Tenaga Pendidik PKN."
  },
  {
    id: "t-19",
    name: "Khoir Ummah",
    position: "Guru UMMI",
    subject: "Guru UMMI",
    photo: "",
    education: "Pengajar Tersertifikasi UMMI Foundation",
    bio: "Tenaga Pendidik Metode UMMI Al-Qur'an."
  },
  {
    id: "t-20",
    name: "Nur Widia",
    position: "Guru UMMI",
    subject: "Guru UMMI",
    photo: "",
    education: "Pengajar Tersertifikasi UMMI Foundation",
    bio: "Tenaga Pendidik Metode UMMI Al-Qur'an."
  },
  {
    id: "t-21",
    name: "Sri Wahyuni",
    position: "Guru UMMI",
    subject: "Guru UMMI",
    photo: "",
    education: "Pengajar Tersertifikasi UMMI Foundation",
    bio: "Tenaga Pendidik Metode UMMI Al-Qur'an."
  }
];

const extracurriculars = [
  { id: "ekskul-1", name: "Desain Grafis", category: "Keterampilan", icon: "Palette", image: "", description: "Ekstrakurikuler desain multimedia dan visual grafis modern." },
  { id: "ekskul-2", name: "Tata Boga", category: "Keterampilan", icon: "ChefHat", image: "", description: "Keterampilan memasak dan wirausaha kuliner halal." },
  { id: "ekskul-3", name: "Handy Craft", category: "Keterampilan", icon: "Scissors", image: "", description: "Kreasi seni tangan dan kerajinan bahan daur ulang." },
  { id: "ekskul-4", name: "Menjahit", category: "Keterampilan", icon: "Shirt", image: "", description: "Keterampilan menjahit busana muslim dan tata busana." },
  { id: "ekskul-5", name: "Futsal", category: "Olahraga", icon: "Trophy", image: "", description: "Pengembangan bakat olahraga futsal dan sportivitas tim." },
  { id: "ekskul-6", name: "Al Banjari", category: "Keagamaan", icon: "Music", image: "", description: "Seni musik hadrah sholawat Al-Banjari khas pesantren." },
  { id: "ekskul-7", name: "Pencak Silat", category: "Olahraga", icon: "ShieldCheck", icon_image: "/pencak-silat2 (1).png", image: "", description: "Seni bela diri pencak silat warisan budaya Nusantara." }
];

const faqs = [
  {
    id: "faq-1",
    question: "Kapan pendaftaran PSB SMA Al-Furqon Driyorejo T.A. 2026/2027 dibuka?",
    answer: "Pendaftaran Gelombang 1 dibuka mulai 2 Januari 2026 s.d. 30 April 2026. Gelombang 2 dibuka 1 Mei 2026 s.d. 10 Juli 2026 (selama kuota masih tersedia).",
    category: "PSB"
  },
  {
    id: "faq-2",
    question: "Apa saja syarat utama mendaftar sebagai calon santri baru?",
    answer: "Syarat utama: FC Ijazah/SKL SMP/MTs, FC Akta Kelahiran, FC Kartu Keluarga, Pasfoto 3x4 (3 lembar), dan mengisi Form Pendaftaran Online/Offline.",
    category: "PSB"
  },
  {
    id: "faq-3",
    question: "Bagaimana sistem pengajaran Al-Qur'an di SMA Al-Furqon?",
    answer: "Setiap pagi sebelum KBM reguler, siswa mengikuti bimbingan metode UMMI dan Tahfidz Al-Qur'an terstruktur dengan target minimal 3 Juz hafalan hingga wisuda.",
    category: "Kehidupan Santri"
  },
  {
    id: "faq-4",
    question: "Apakah SMA Al-Furqon menerapkan Kurikulum Merdeka?",
    answer: "Ya, SMA Al-Furqon Driyorejo menerapkan Kurikulum Merdeka secara penuh (Kategori Berbagi & Mandiri) yang dilengkapi Projek Penguatan Profil Pelajar Pancasila (P5).",
    category: "Kurikulum"
  },
  {
    id: "faq-5",
    question: "Apakah ada beasiswa bagi siswa berprestasi?",
    answer: "Kami menyediakan Beasiswa Tahfidz Al-Qur'an (bebas SPP), Beasiswa Juara Olimpiade Sains/Seni, serta beasiswa khusus alumni MTs Al-Furqon.",
    category: "PSB"
  }
];

const facilities = [
  {
    id: "fac-1",
    name: "Ruang Kelas Modern",
    category: "Fasilitas Belajar",
    description: "Ruang belajar ber-AC yang bersih, berteknologi multimedia interaktif, pencahayaan ergonomis, dan suasana belajar yang kondusif.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fac-2",
    name: "Laboratorium Canggih",
    category: "Riset & Eksperimen",
    description: "Laboratorium Sains MIPA (Fisika, Kimia, Biologi) dengan peralatan eksperimen modern berstandar praktikum dan penelitian siswa.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fac-3",
    name: "Lab Informatika Digital",
    category: "Teknologi & Digital",
    description: "Laboratorium komputer multimedia spesifikasi tinggi, jaringan internet ultra-cepat, serta laboratorium IoT & literasi Artificial Intelligence.",
    image: "/labkomputer.jpeg"
  },
  {
    id: "fac-4",
    name: "Area Olahraga Terbaik",
    category: "Kebugaran & Seni",
    description: "Fasilitas olahraga outdoor & indoor lengkap mencakup lapangan serbaguna futsal, basket, voli, serta gelanggang seni pencak silat.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
  }
];

const kesiswaanActivities = [
  {
    id: "osis-pramuka",
    slug: "osis-pramuka",
    data: {
      id: "osis-pramuka",
      slug: "osis-pramuka",
      category: "Kepemimpinan",
      categoryBadgeBg: "bg-amber-400 text-slate-950",
      title: "Organisasi OSIS & Pramuka Ambalan",
      buttonText: "Lihat Kegiatan OSIS",
      image: "/bg-al-furqon2.jpg",
      tagline: "Melatih Kemandirian, Jiwa Kepemimpinan, & Manajerial Islami",
      author: "Tim Pembina Kesiswaan & OSIS",
      shortDesc: "Melatih kemandirian, manajerial kegiatan, kepekaan sosial, serta kepemimpinan kepramukaan berbasis karakter Islami.",
      fullDesc: "Organisasi Siswa Intra Sekolah (OSIS) dan Pramuka Ambalan SMA Al-Furqon Driyorejo merupakan wadah utama pembentukan karakter kepemimpinan, kedisiplinan, dan manajerial siswa berbasis akhlakul karimah.",
      content: "Organisasi Siswa Intra Sekolah (OSIS) dan Ambalan Penegak Pramuka SMA Al-Furqon Driyorejo merupakan pilar utama pembentukan karakter kepemimpinan dan manajerial santri di lingkungan sekolah. Melalui wadah ini, siswa dilatih secara langsung untuk menjadi pribadi yang mandiri, disiplin, berwawasan luas, dan memiliki rasa kepedulian sosial yang tinggi berbasis akhlakul karimah.\n\n### 1. Pembentukan Jiwa Kepemimpinan Islami (Leadership Skill)\nSetiap pengurus OSIS dan Ambalan Pramuka diajarkan dasar-dasar kepemimpinan (Leadership Training) yang berlandaskan teladan Rasulullah SAW.\n\n### 2. Manajemen Event & Program Kerja Mandiri\nPengurus OSIS diberikan amanah untuk menyusun, mengelola, dan merealisasikan program kerja tahunan sekolah, di antaranya Furqon Festival, PHBI, dan PHBN.",
      highlights: [
        "Latihan Dasar Kepemimpinan Siswa (LDKS) & Musyawarah Ambalan Tahunan",
        "Penyelenggaraan Event Tahunan FURQON FEST & Pentas Seni Keislaman",
        "Bakti Sosial, Aksi Peduli Bencana, & Safari Ramadan ke Masyarakat",
        "Perkemahan Ukhuwah Pramuka Penegak & Outbound Character Building"
      ],
      schedule: "Kegiatan Mingguan & Event Tahunan",
      target: "Seluruh Santri & Siswa SMA Al-Furqon",
      tags: ["Kepemimpinan", "OSIS", "Pramuka", "LDKS", "KarakterSantri", "SMAAlFurqon"],
      youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
    }
  },
  {
    id: "keagamaan-tahfidz",
    slug: "keagamaan-tahfidz",
    data: {
      id: "keagamaan-tahfidz",
      slug: "keagamaan-tahfidz",
      category: "Spiritual",
      categoryBadgeBg: "bg-[#064E3B] text-amber-300 border border-amber-400/30",
      title: "Pembiasaan Keagamaan & Tahfidz UMMI",
      buttonText: "Program Tahfidz Santri",
      image: "/bg-al-furqon3.jpg",
      tagline: "Membangun Generasi Qur'ani Berakhlak Mulia & Berwawasan Luas",
      author: "Koordinator Keagamaan & Tahfidz UMMI",
      shortDesc: "Shalat dhuha berjamaah, tahajud, munaqosyah Al-Qur'an harian, hingga kajian rutin penanaman akhlak mulia.",
      fullDesc: "Program keagamaan terpadu SMA Al-Furqon mengombinasikan pembiasaan ibadah harian dengan metode pengajaran Al-Qur'an UMMI yang teruji dan tersertifikasi.",
      content: "Pendidikan di SMA Al-Furqon Driyorejo menitikberatkan pada keunggulan intelektual akademik dan fondasi spiritual yang kokoh melalui Metode UMMI.",
      highlights: [
        "Shalat Dhuha Berjamaah & Kajian Kitab Akhlak Rutin Setiap Pagi",
        "Target Hafalan Minimal 3 Juz Al-Qur'an (Juz 30, 29, 1) dengan Sertifikasi UMMI",
        "Munaqosyah & Imtihan Tahfidz Terbuka Bersama Orang Tua & Penguji UMMI Pusat",
        "Qiyamul Lail (Shalat Tahajud & Witir) Berjamaah di Asrama Pondok"
      ],
      schedule: "Setiap Hari (Rutin Pagi & Malam)",
      target: "Santri Asrama & Siswa Reguler SMA Al-Furqon",
      tags: ["TahfidzUMMI", "Spiritual", "AlQuran", "ShalatDhuha", "KarakterRabbani", "PesantrenAlFurqon"]
    }
  },
  {
    id: "adiwiyata-zerowaste",
    slug: "adiwiyata-zerowaste",
    data: {
      id: "adiwiyata-zerowaste",
      slug: "adiwiyata-zerowaste",
      category: "Adiwiyata",
      categoryBadgeBg: "bg-teal-600 text-white",
      title: "Gerakan Sekolah Hijau & Zero Waste",
      buttonText: "Aksi Adiwiyata",
      image: "/bg-al-furqon4.jpg",
      tagline: "Pendidikan Pelestarian Lingkungan & Gaya Hidup Berkelanjutan",
      author: "Tim Adiwiyata & Lingkungan Hidup",
      shortDesc: "Keterlibatan aktif siswa dalam pengelolaan komposting, hidroponik, eco-brick, dan pelestarian lingkungan hidup.",
      fullDesc: "SMA Al-Furqon berkomitmen menjadi Sekolah Adiwiyata yang mengedukasi siswa dalam menjaga kelestarian alam dan lingkungan hidup.",
      content: "SMA Al-Furqon Driyorejo berkomitmen penuh menciptakan ekosistem sekolah yang asri, bersih, dan berwawasan lingkungan melalui Program Sekolah Adiwiyata & Gerakan Zero Waste.",
      highlights: [
        "Pengolahan Sampah Organik Menjadi Pupuk Kompos & Eco-Enzyme",
        "Kebun Edukasi Hidroponik & Pembibitan Tanaman Obat Keluarga (TOGA)",
        "Kampanye Pengurangan Plastik Sekali Pakai di Kantin & Lingkungan Sekolah",
        "Aksi Tanam Pohon Bersama & Pembuatan Resapan Air Biopori"
      ],
      schedule: "Program Mingguan & Aksi Lingkungan",
      target: "Kader Adiwiyata & Seluruh Civitas Akademika",
      tags: ["Adiwiyata", "ZeroWaste", "SekolahHijau", "Hidroponik", "PeduliLingkungan", "SMAAlFurqon"]
    }
  }
];

function escapeSql(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "1" : "0";
  if (typeof val === "number") return String(val);
  if (typeof val === "object") val = JSON.stringify(val);
  const escaped = String(val)
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"": case "'": case "\\": case "%":
          return "\\" + char;
        default:
          return char;
      }
    });
  return `'${escaped}'`;
}

function generateSqlDump() {
  let out = "";

  out += `-- ========================================================\n`;
  out += `-- phpMyAdmin SQL Dump\n`;
  out += `-- Database: \`website_alfurqon\`\n`;
  out += `-- Sekolah: SMA AL-FURQON DRIYOREJO\n`;
  out += `-- Dibuat otomatis untuk impor langsung ke phpMyAdmin / MySQL\n`;
  out += `-- ========================================================\n\n`;

  out += `SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\n`;
  out += `START TRANSACTION;\n`;
  out += `SET time_zone = "+00:00";\n\n`;
  out += `/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\n`;
  out += `/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\n`;
  out += `/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\n`;
  out += `/*!40101 SET NAMES utf8mb4 */;\n\n`;

  out += `--\n-- 1. Database Creation\n--\n`;
  out += `CREATE DATABASE IF NOT EXISTS \`website_alfurqon\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`;
  out += `USE \`website_alfurqon\`;\n\n`;

  // 1. school_info
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`school_info\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`school_info\`;\n`;
  out += `CREATE TABLE \`school_info\` (\n`;
  out += `  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY DEFAULT 'default',\n`;
  out += `  \`data\` JSON NOT NULL,\n`;
  out += `  \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`school_info\` (\`id\`, \`data\`, \`updated_at\`) VALUES\n`;
  out += `('default', ${escapeSql(schoolData)}, CURRENT_TIMESTAMP);\n\n`;

  // 2. users
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`users\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`users\`;\n`;
  out += `CREATE TABLE \`users\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`username\` VARCHAR(100) NOT NULL UNIQUE,\n`;
  out += `  \`password\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`name\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`role\` VARCHAR(50) NOT NULL,\n`;
  out += `  \`status\` VARCHAR(50) DEFAULT 'Aktif',\n`;
  out += `  \`email\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`avatar\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`users\` (\`id\`, \`username\`, \`password\`, \`name\`, \`role\`, \`status\`, \`email\`, \`created_at\`) VALUES\n`;
  out += users.map(u => `(${escapeSql(u.id)}, ${escapeSql(u.username)}, ${escapeSql(u.password)}, ${escapeSql(u.name)}, ${escapeSql(u.role)}, ${escapeSql(u.status)}, ${escapeSql(u.email)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 3. news
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`news\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`news\`;\n`;
  out += `CREATE TABLE \`news\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`title\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`slug\` VARCHAR(255) NOT NULL UNIQUE,\n`;
  out += `  \`excerpt\` TEXT DEFAULT NULL,\n`;
  out += `  \`content\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`category\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`date\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`author\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`image\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`is_featured\` TINYINT(1) DEFAULT 0,\n`;
  out += `  \`tags\` JSON DEFAULT NULL,\n`;
  out += `  \`youtube_url\` TEXT DEFAULT NULL,\n`;
  out += `  \`status\` VARCHAR(50) DEFAULT 'published',\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`news\` (\`id\`, \`title\`, \`slug\`, \`excerpt\`, \`content\`, \`category\`, \`date\`, \`author\`, \`image\`, \`is_featured\`, \`tags\`, \`youtube_url\`, \`status\`, \`created_at\`) VALUES\n`;
  out += sampleNews.map(n => `(${escapeSql(n.id)}, ${escapeSql(n.title)}, ${escapeSql(n.slug)}, ${escapeSql(n.excerpt)}, ${escapeSql(n.content)}, ${escapeSql(n.category)}, ${escapeSql(n.date)}, ${escapeSql(n.author)}, ${escapeSql(n.image)}, ${n.is_featured}, ${escapeSql(n.tags)}, ${escapeSql(n.youtube_url)}, ${escapeSql(n.status)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 4. kesiswaan_activities
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`kesiswaan_activities\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`kesiswaan_activities\`;\n`;
  out += `CREATE TABLE \`kesiswaan_activities\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`slug\` VARCHAR(100) UNIQUE DEFAULT NULL,\n`;
  out += `  \`data\` JSON NOT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`kesiswaan_activities\` (\`id\`, \`slug\`, \`data\`, \`created_at\`) VALUES\n`;
  out += kesiswaanActivities.map(k => `(${escapeSql(k.id)}, ${escapeSql(k.slug)}, ${escapeSql(k.data)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 5. agendas
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`agendas\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`agendas\`;\n`;
  out += `CREATE TABLE \`agendas\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`title\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`date\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`time\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`location\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`description\` TEXT DEFAULT NULL,\n`;
  out += `  \`category\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`agendas\` (\`id\`, \`title\`, \`date\`, \`time\`, \`location\`, \`description\`, \`category\`, \`created_at\`) VALUES\n`;
  out += sampleAgendas.map(a => `(${escapeSql(a.id)}, ${escapeSql(a.title)}, ${escapeSql(a.date)}, ${escapeSql(a.time)}, ${escapeSql(a.location)}, ${escapeSql(a.description)}, ${escapeSql(a.category)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 6. achievements
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`achievements\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`achievements\`;\n`;
  out += `CREATE TABLE \`achievements\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`title\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`student_name\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`category\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`level\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`rank\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`year\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`description\` TEXT DEFAULT NULL,\n`;
  out += `  \`event\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`image\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`achievements\` (\`id\`, \`title\`, \`student_name\`, \`category\`, \`level\`, \`rank\`, \`year\`, \`description\`, \`image\`, \`created_at\`) VALUES\n`;
  out += sampleAchievements.map(ach => `(${escapeSql(ach.id)}, ${escapeSql(ach.title)}, ${escapeSql(ach.student_name)}, ${escapeSql(ach.category)}, ${escapeSql(ach.level)}, ${escapeSql(ach.rank)}, ${escapeSql(ach.year)}, ${escapeSql(ach.description)}, ${escapeSql(ach.image)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 7. teachers
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`teachers\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`teachers\`;\n`;
  out += `CREATE TABLE \`teachers\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`name\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`nip\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`position\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`subject\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`role\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`education\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`photo\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`bio\` TEXT DEFAULT NULL,\n`;
  out += `  \`email\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`phone\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`is_active\` TINYINT(1) DEFAULT 1,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`teachers\` (\`id\`, \`name\`, \`nip\`, \`position\`, \`subject\`, \`role\`, \`education\`, \`photo\`, \`bio\`, \`email\`, \`phone\`, \`is_active\`, \`created_at\`) VALUES\n`;
  out += teachers.map(t => `(${escapeSql(t.id)}, ${escapeSql(t.name)}, ${escapeSql(t.nip || '')}, ${escapeSql(t.position)}, ${escapeSql(t.subject)}, ${escapeSql(t.position)}, ${escapeSql(t.education)}, ${escapeSql(t.photo)}, ${escapeSql(t.bio)}, '', '', 1, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 8. extracurriculars
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`extracurriculars\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`extracurriculars\`;\n`;
  out += `CREATE TABLE \`extracurriculars\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`name\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`category\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`description\` TEXT DEFAULT NULL,\n`;
  out += `  \`schedule\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`instructor\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`mentor\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`icon\` VARCHAR(100) DEFAULT 'Sparkles',\n`;
  out += `  \`icon_image\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`achievements\` JSON DEFAULT NULL,\n`;
  out += `  \`image\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`extracurriculars\` (\`id\`, \`name\`, \`category\`, \`description\`, \`schedule\`, \`instructor\`, \`mentor\`, \`icon\`, \`icon_image\`, \`achievements\`, \`image\`, \`created_at\`) VALUES\n`;
  out += extracurriculars.map(e => `(${escapeSql(e.id)}, ${escapeSql(e.name)}, ${escapeSql(e.category)}, ${escapeSql(e.description)}, '', '', '', ${escapeSql(e.icon)}, ${escapeSql(e.icon_image || null)}, '[]', '', CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 9. gallery
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`gallery\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`gallery\`;\n`;
  out += `CREATE TABLE \`gallery\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`title\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`category\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`imageurl\` LONGTEXT NOT NULL,\n`;
  out += `  \`date\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`description\` TEXT DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`gallery\` (\`id\`, \`title\`, \`category\`, \`imageurl\`, \`date\`, \`description\`, \`created_at\`) VALUES\n`;
  out += sampleGallery.map(g => `(${escapeSql(g.id)}, ${escapeSql(g.title)}, ${escapeSql(g.category)}, ${escapeSql(g.imageurl)}, ${escapeSql(g.date)}, ${escapeSql(g.description)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 10. psb_applicants
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`psb_applicants\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`psb_applicants\`;\n`;
  out += `CREATE TABLE \`psb_applicants\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`registration_number\` VARCHAR(100) UNIQUE DEFAULT NULL,\n`;
  out += `  \`full_name\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`nisn\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`gender\` VARCHAR(20) DEFAULT NULL,\n`;
  out += `  \`birth_place\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`birth_date\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`address\` TEXT DEFAULT NULL,\n`;
  out += `  \`previous_school\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`parent_name\` VARCHAR(255) DEFAULT NULL,\n`;
  out += `  \`parent_phone\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`chosen_major\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`registration_date\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`status\` VARCHAR(50) DEFAULT 'Menunggu Verifikasi',\n`;
  out += `  \`notes\` TEXT DEFAULT NULL,\n`;
  out += `  \`data\` JSON DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  // Backward compatibility VIEW for ppdb_applicants
  out += `--\n-- View for backwards compatibility: \`ppdb_applicants\`\n--\n`;
  out += `CREATE OR REPLACE VIEW \`ppdb_applicants\` AS SELECT * FROM \`psb_applicants\`;\n\n`;

  // 11. faqs
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`faqs\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`faqs\`;\n`;
  out += `CREATE TABLE \`faqs\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`question\` TEXT NOT NULL,\n`;
  out += `  \`answer\` TEXT NOT NULL,\n`;
  out += `  \`category\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`faqs\` (\`id\`, \`question\`, \`answer\`, \`category\`, \`created_at\`) VALUES\n`;
  out += faqs.map(f => `(${escapeSql(f.id)}, ${escapeSql(f.question)}, ${escapeSql(f.answer)}, ${escapeSql(f.category)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 12. testimonials
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`testimonials\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`testimonials\`;\n`;
  out += `CREATE TABLE \`testimonials\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`name\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`role\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`graduation_year\` VARCHAR(50) DEFAULT NULL,\n`;
  out += `  \`avatar\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`content\` TEXT NOT NULL,\n`;
  out += `  \`rating\` INT DEFAULT 5,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`testimonials\` (\`id\`, \`name\`, \`role\`, \`graduation_year\`, \`avatar\`, \`content\`, \`rating\`, \`created_at\`) VALUES\n`;
  out += sampleTestimonials.map(t => `(${escapeSql(t.id)}, ${escapeSql(t.name)}, ${escapeSql(t.role)}, ${escapeSql(t.graduation_year)}, ${escapeSql(t.avatar)}, ${escapeSql(t.content)}, ${t.rating}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  // 13. facilities
  out += `-- --------------------------------------------------------\n`;
  out += `-- Table structure for table \`facilities\`\n--\n`;
  out += `DROP TABLE IF EXISTS \`facilities\`;\n`;
  out += `CREATE TABLE \`facilities\` (\n`;
  out += `  \`id\` VARCHAR(100) NOT NULL PRIMARY KEY,\n`;
  out += `  \`name\` VARCHAR(255) NOT NULL,\n`;
  out += `  \`category\` VARCHAR(100) DEFAULT NULL,\n`;
  out += `  \`description\` TEXT DEFAULT NULL,\n`;
  out += `  \`image\` LONGTEXT DEFAULT NULL,\n`;
  out += `  \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP\n`;
  out += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  out += `INSERT INTO \`facilities\` (\`id\`, \`name\`, \`category\`, \`description\`, \`image\`, \`created_at\`) VALUES\n`;
  out += facilities.map(fac => `(${escapeSql(fac.id)}, ${escapeSql(fac.name)}, ${escapeSql(fac.category)}, ${escapeSql(fac.description)}, ${escapeSql(fac.image)}, CURRENT_TIMESTAMP)`).join(",\n") + ";\n\n";

  out += `COMMIT;\n\n`;
  out += `/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;\n`;
  out += `/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;\n`;
  out += `/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;\n`;

  return out;
}

const sqlContent = generateSqlDump();

// Write to root
const rootDest = path.join(__dirname, "../database_sma_alfurqon.sql");
fs.writeFileSync(rootDest, sqlContent, "utf-8");
console.log("✅ Generated:", rootDest);

// Write to public for direct download
const publicDest = path.join(__dirname, "../public/database_sma_alfurqon.sql");
fs.writeFileSync(publicDest, sqlContent, "utf-8");
console.log("✅ Generated:", publicDest);
