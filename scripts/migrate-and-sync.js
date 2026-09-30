const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_yo2PTxLukc1s@ep-lingering-dew-axy5bekt.c-4.us-east-2.aws.neon.tech/website_alfurqon?sslmode=require";

const sql = neon(DATABASE_URL);

async function migrateAndSeed() {
  console.log("=== STEP 1: Updating Table Schemas in Neon DB ===");

  // 1. news
  await sql`ALTER TABLE news ADD COLUMN IF NOT EXISTS youtube_url TEXT;`;
  await sql`ALTER TABLE news ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'published';`;

  // 2. teachers
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS bio TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS photo TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS subject TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS position TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS education TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;`;

  // 3. achievements
  await sql`ALTER TABLE achievements ADD COLUMN IF NOT EXISTS event TEXT;`;
  await sql`ALTER TABLE achievements ADD COLUMN IF NOT EXISTS rank TEXT;`;

  // 4. testimonials
  await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS graduation_year TEXT;`;

  // 5. extracurriculars - ADD icon, icon_image, achievements
  await sql`ALTER TABLE extracurriculars ADD COLUMN IF NOT EXISTS icon VARCHAR(100) DEFAULT 'Sparkles';`;
  await sql`ALTER TABLE extracurriculars ADD COLUMN IF NOT EXISTS icon_image TEXT;`;
  await sql`ALTER TABLE extracurriculars ADD COLUMN IF NOT EXISTS achievements JSONB DEFAULT '[]'::jsonb;`;
  await sql`ALTER TABLE extracurriculars ADD COLUMN IF NOT EXISTS mentor TEXT;`;
  await sql`ALTER TABLE extracurriculars ADD COLUMN IF NOT EXISTS instructor TEXT;`;

  // 6. faqs table
  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id VARCHAR(100) PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category VARCHAR(100) DEFAULT 'Umum',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 7. kesiswaan_activities table
  await sql`
    CREATE TABLE IF NOT EXISTS kesiswaan_activities (
      id VARCHAR(100) PRIMARY KEY,
      slug VARCHAR(100) UNIQUE,
      data JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 8. facilities table
  await sql`
    CREATE TABLE IF NOT EXISTS facilities (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      description TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log("=== STEP 2: Seeding All Data into Neon DB ===");

  // --- Seed Extracurriculars (7 official clubs, icons only, NO images) ---
  const extracurriculars = [
    {
      id: "ekskul-1",
      name: "Desain Grafis",
      category: "Keterampilan",
      description: "Pelatihan desain grafis modern menggunakan Photoshop, Illustrator, Canva, dan Figma untuk pembuatan media visual, poster dakwah, dan branding digital.",
      schedule: "Jumat (08:30 - 10:30 WIB)",
      instructor: "M. Irfan, S.Kom.",
      icon: "Palette",
      icon_image: null,
      achievements: JSON.stringify(["Juara 2 Desain Poster Tingkat Kabupaten 2025"]),
    },
    {
      id: "ekskul-2",
      name: "Tata Boga",
      category: "Keterampilan",
      description: "Eksplorasi seni kuliner halal nusantara dan internasional, pelatihan pastry, teknik plating modern, serta dasar kewirausahaan boga mandiri.",
      schedule: "Sabtu (09:00 - 11:30 WIB)",
      instructor: "Ibu Nur Hayati",
      icon: "ChefHat",
      icon_image: null,
      achievements: JSON.stringify(["Juara Harapan 1 Kreasi Kuliner Santri Expo"]),
    },
    {
      id: "ekskul-3",
      name: "Handy Craft",
      category: "Keterampilan",
      description: "Pengembangan kreativitas kerajinan tangan bernilai ekonomis tinggi dari bahan ramah lingkungan, rajut, dekorasi Islami, dan souvenir.",
      schedule: "Kamis (14:30 - 16:30 WIB)",
      instructor: "Ibu Siti Aisyah, S.Pd.",
      icon: "Scissors",
      icon_image: null,
      achievements: JSON.stringify(["Pameran Karya Kreatif Pelajar Jawa Timur"]),
    },
    {
      id: "ekskul-4",
      name: "Menjahit",
      category: "Keterampilan",
      description: "Keterampilan teknik pola busana muslim, pengoperasian mesin jahit modern, bordir digital, dan pembuatan seragam atau busana mandiri santri.",
      schedule: "Rabu (14:30 - 16:30 WIB)",
      instructor: "Ibu Hj. Aminah",
      icon: "Shirt",
      icon_image: null,
      achievements: JSON.stringify(["Sertifikasi Keterampilan Vokasi Tekstil"]),
    },
    {
      id: "ekskul-5",
      name: "Futsal",
      category: "Olahraga",
      description: "Pembinaan taktik sepak bola futsal, ketahanan fisik atletik, sportivitas tim, dan persiapan kejuaraan turnamen antar-SMA se-Jawa Timur.",
      schedule: "Selasa & Jumat (15:30 - 17:30 WIB)",
      instructor: "Coach Suherman, M.Pd.I.",
      icon: "Trophy",
      icon_image: null,
      achievements: JSON.stringify(["Juara 1 Turnamen Futsal Pelajar Driyorejo 2025", "Semifinalis Piala Kemenag Gresik"]),
    },
    {
      id: "ekskul-6",
      name: "Al Banjari",
      category: "Keagamaan",
      description: "Seni musik rebana Islami sholawat Al-Banjari, pengembangan nada maqam vokal merdu, ritme terbang serempak, dan pembiasaan cinta Rasulullah SAW.",
      schedule: "Senin & Kamis (19:30 - 21:00 WIB)",
      instructor: "Ustadz M. Mas'ud Yunus, S.Pd.",
      icon: "Music",
      icon_image: null,
      achievements: JSON.stringify(["Juara 2 Festival Banjari Tingkat Pelajar se-Gerbangkertosusila", "Juara Favorit Shalawat Fest"]),
    },
    {
      id: "ekskul-7",
      name: "Pencak Silat",
      category: "Olahraga",
      description: "Seni bela diri warisan leluhur bangsa untuk pembentukan mental ksatria, ketangkasan fisik, jurus seni tunggal/ganda, dan pertahanan diri Islami.",
      schedule: "Minggu (07:00 - 09:30 WIB)",
      instructor: "Pendekar Sugeng Utomo, S.Pd.",
      icon: "ShieldCheck",
      icon_image: "/pencak-silat2 (1).png",
      achievements: JSON.stringify(["Medali Emas Kejurkab Pencak Silat Gresik 2025", "Juara 1 Tanding Kelas C Remaja"]),
    },
  ];

  for (const e of extracurriculars) {
    await sql`
      INSERT INTO extracurriculars (id, name, category, description, schedule, instructor, mentor, icon, icon_image, achievements, image)
      VALUES (${e.id}, ${e.name}, ${e.category}, ${e.description}, ${e.schedule}, ${e.instructor}, ${e.instructor}, ${e.icon}, ${e.icon_image}, ${e.achievements}::jsonb, '')
      ON CONFLICT (id) DO UPDATE SET
        name = ${e.name},
        category = ${e.category},
        description = ${e.description},
        schedule = ${e.schedule},
        instructor = ${e.instructor},
        mentor = ${e.instructor},
        icon = ${e.icon},
        icon_image = ${e.icon_image},
        achievements = ${e.achievements}::jsonb,
        image = '';
    `;
  }
  console.log("Extracurriculars synced (7 clubs, icons only).");

  // --- Seed News (preserving existing ones) ---
  const newsItems = [
    {
      id: "news-1790224407534",
      title: "Matangkan Persiapan Kelulusan, Siswa Kelas XII SMA Al Furqon Driyorejo Ikuti Simulasi TKA",
      slug: "matangkan-persiapan-kelulusan-siswa-kelas-xii-sma-al-furqon-driyorejo-ikuti-simulasi-tka",
      excerpt: "Matangkan Persiapan Kelulusan, Siswa Kelas XII SMA Al Furqon Driyorejo Ikuti Simulasi TKA guna memperkuat kesiapan akademik serta mental menghadapi ujian.",
      content: "SMA Al Furqon Driyorejo menggelar kegiatan Simulasi Tes Kemampuan Akademik (TKA) bagi seluruh siswa kelas XII. Kegiatan ini dirancang secara terstruktur dan terukur guna mematangkan kesiapan akademik, membiasakan ritme manajemen waktu ujian berbasis komputer, serta melatih kesiapan psikologis para santri dan siswa dalam menghadapi ujian kelulusan serta seleksi masuk perguruan tinggi negeri impian.",
      category: "Berita",
      date: "2026-09-24",
      author: "Admin SMA Al-Furqon",
      image: "/bg-al-furqon4.jpg",
      isFeatured: false,
      tags: ["Akademik", "Kelas XII", "Simulasi TKA"],
      youtubeUrl: "",
      status: "published",
    },
    {
      id: "news-1",
      title: "Allah Ku Ajukan Proposal Perubahanku",
      slug: "allah-ku-ajukan-proposal-perubahanku",
      excerpt: "Sukses sendiri itu biasa, Sukses bersama itu luar biasa. Langkah inspiratif santri SMA Al-Furqon dalam menyusun target impian hidup dan ibadah mandiri.",
      content: "Setiap manusia memiliki kesempatan emas untuk memproposalkan perubahan hidupnya di hadapan Allah SWT. Di SMA Al-Furqon Driyorejo, para siswa diajak merumuskan 'Proposal Hidup' yang memuat target spiritual, hafalan Al-Qur'an, dan impian studi lanjut. Pembiasaan shalat dhuha, tahajud, dan dzikir pagi menjadi bahan bakar utama dalam menggapai cita-cita tinggi.",
      category: "Berita",
      date: "2026-01-15",
      author: "Tim Humas SMA Al-Furqon",
      image: "/bg-al-furqon2.jpg",
      isFeatured: true,
      tags: ["Pendidikan Karakter", "Spiritual", "Al-Furqon"],
      youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      status: "published",
    },
    {
      id: "news-2",
      title: "Saatnya Memetik Buah Ilmu: Sertifikasi Al-Qur'an Metode UMMI 2026",
      slug: "saatnya-memetik-buah-ilmu",
      excerpt: "Pelaksanaan Munaqosyah dan Sertifikasi Tajwid & Tartil Al-Qur'an Metode UMMI berjalan khidmat dengan tingkat kelulusan 100%.",
      content: "Setelah menempuh proses panjang pembelajaran Al-Qur'an dengan metode UMMI, puluhan santri SMA Al-Furqon Driyorejo mengikuti ujian Munaqosyah resmi dari Ummi Foundation. Kegiatan ini disaksikan langsung oleh para orang tua wali murid yang terharu menyaksikan kualitas makhraj dan tajwid putra-putrinya.",
      category: "Kegiatan",
      date: "2026-02-10",
      author: "Koordinator Tahfidz UMMI",
      image: "/bg-al-furqon3.jpg",
      isFeatured: true,
      tags: ["UMMI", "Tahfidz", "Munaqosyah"],
      youtubeUrl: "",
      status: "published",
    },
    {
      id: "news-3",
      title: "Kunjungan Edukasi Kampus & Pembekalan Sukses SNBT Masuk PTN",
      slug: "kunjungan-edukasi-kampus-snbt",
      excerpt: "Siswa kelas XI dan XII SMA Al-Furqon berkunjung ke kampus ternama untuk memperluas wawasan akademik dan kiat lolos perguruan tinggi negeri.",
      content: "Guna menumbuhkan semangat belajar dan memperjelas arah cita-cita masa depan, SMA Al-Furqon Driyorejo menyelenggarakan Program Campus Tour ke sejumlah kampus ternama di Jawa Timur seperti ITS dan UNESA. Siswa berdiskusi langsung dengan dosen dan mahasiswa alumni pesantren.",
      category: "Akademik",
      date: "2026-02-18",
      author: "Waka Kurikulum",
      image: "/bg-al-furqon4.jpg",
      isFeatured: false,
      tags: ["SNBT", "Kampus", "PTN"],
      youtubeUrl: "",
      status: "published",
    },
  ];

  for (const n of newsItems) {
    await sql`
      INSERT INTO news (id, title, slug, excerpt, content, category, date, author, image, is_featured, tags, youtube_url, status)
      VALUES (${n.id}, ${n.title}, ${n.slug}, ${n.excerpt}, ${n.content}, ${n.category}, ${n.date}, ${n.author}, ${n.image}, ${n.isFeatured}, ${JSON.stringify(n.tags)}::jsonb, ${n.youtubeUrl}, ${n.status})
      ON CONFLICT (id) DO UPDATE SET
        title = ${n.title},
        slug = ${n.slug},
        excerpt = ${n.excerpt},
        content = ${n.content},
        category = ${n.category},
        date = ${n.date},
        author = ${n.author},
        image = ${n.image},
        is_featured = ${n.isFeatured},
        tags = ${JSON.stringify(n.tags)}::jsonb,
        youtube_url = ${n.youtubeUrl},
        status = ${n.status};
    `;
  }
  console.log("News synced.");

  // --- Seed Agendas ---
  const agendas = [
    {
      id: "agenda-1",
      title: "Simulasi TKA & Ujian Sekolah Kelas XII",
      date: "2026-09-24",
      time: "07:30 - 12:00 WIB",
      location: "Lab Komputer & Ruang Kelas XII",
      description: "Simulasi Tes Kemampuan Akademik berbasis komputer untuk menguji kesiapan materi dan mental santri menghadapi seleksi PTN.",
      category: "Akademik",
    },
    {
      id: "agenda-2",
      title: "Munaqosyah Tahfidz Metode UMMI",
      date: "2026-10-15",
      time: "08:00 - 14:00 WIB",
      location: "Masjid Utama Al-Furqon",
      description: "Ujian terbuka hafalan Al-Qur'an minimal 3 Juz oleh Tim Penguji Resmi Ummi Foundation Surabaya.",
      category: "Keagamaan",
    },
    {
      id: "agenda-3",
      title: "Peringatan Isra' Mi'raj & Furqon Festival",
      date: "2026-10-28",
      time: "08:00 - 15:00 WIB",
      location: "Halaman & Aula Pertemuan Sekolah",
      description: "Rangkaian lomba keislaman antar-santri, pameran inovasi P5, dan tabligh akbar bersama pengasuh pesantren.",
      category: "Kesiswaan",
    },
    {
      id: "agenda-4",
      title: "Bakti Sosial & Safari Ramadan Santri",
      date: "2026-11-10",
      time: "09:00 - 16:00 WIB",
      location: "Desa Binaan Driyorejo Gresik",
      description: "Penyaluran zakat, infaq, dan sembako serta pengabdian masyarakat oleh Organisasi Santri SMA Al-Furqon.",
      category: "Umum",
    },
  ];

  for (const a of agendas) {
    await sql`
      INSERT INTO agendas (id, title, date, time, location, description, category)
      VALUES (${a.id}, ${a.title}, ${a.date}, ${a.time}, ${a.location}, ${a.description}, ${a.category})
      ON CONFLICT (id) DO UPDATE SET
        title = ${a.title},
        date = ${a.date},
        time = ${a.time},
        location = ${a.location},
        description = ${a.description},
        category = ${a.category};
    `;
  }
  console.log("Agendas synced.");

  // --- Seed Achievements ---
  const achievements = [
    {
      id: "ach-1",
      title: "Juara 1 Olimpiade Matematika Terapan Nasional",
      event: "National Science & Math Olympiad 2025",
      level: "Nasional",
      rank: "Juara 1",
      category: "Akademik",
      student_name: "Muhammad Rayhan Pratama",
      year: "2025",
      image: "/bg-al-furqon2.jpg",
      description: "Berhasil meraih Medali Emas pada kategori Matematika Terapan Tingkat SMA se-Indonesia mengungguli 120 sekolah peserta.",
    },
    {
      id: "ach-2",
      title: "Juara 1 MHQ (Musabaqah Hifdzil Qur'an) 5 Juz",
      event: "Pentas PAI Tingkat Provinsi Jawa Timur",
      level: "Provinsi",
      rank: "Juara 1",
      category: "Keagamaan",
      student_name: "Ahmad Zaki Al-Faruq",
      year: "2025",
      image: "/bg-al-furqon3.jpg",
      description: "Meraih predikat terbaik kategori Tahfidz Al-Qur'an 5 Juz dengan tartil dan tajwid sempurna bersertifikat metode UMMI.",
    },
    {
      id: "ach-3",
      title: "Medali Emas Kejuaraan Pencak Silat Remaja",
      event: "Kejurkab Pencak Silat Pelajar Gresik",
      level: "Kabupaten",
      rank: "Medali Emas",
      category: "Olahraga",
      student_name: "Faris Maulana Ibrahim",
      year: "2025",
      image: "/bg-al-furqon4.jpg",
      description: "Meraih podium utama tanding kelas C putra setelah memenangkan 4 laga berturut-turut dengan teknik kuncian bersih.",
    },
    {
      id: "ach-4",
      title: "Juara 2 Karya Tulis Ilmiah Lingkungan Hidup",
      event: "Green Youth Innovation Expo Jawa Timur",
      level: "Provinsi",
      rank: "Juara 2",
      category: "Seni",
      student_name: "Tim Adiwiyata Al-Furqon",
      year: "2024",
      image: "/bg-al-furqon2.jpg",
      description: "Inovasi pupuk cair eco-enzyme berbasis limbah kantin pesantren mendapatkan apresiasi tinggi dari dewan juri akademisi.",
    },
  ];

  for (const ach of achievements) {
    await sql`
      INSERT INTO achievements (id, title, event, level, rank, category, student_name, year, image, description)
      VALUES (${ach.id}, ${ach.title}, ${ach.event}, ${ach.level}, ${ach.rank}, ${ach.category}, ${ach.student_name}, ${ach.year}, ${ach.image}, ${ach.description})
      ON CONFLICT (id) DO UPDATE SET
        title = ${ach.title},
        event = ${ach.event},
        level = ${ach.level},
        rank = ${ach.rank},
        category = ${ach.category},
        student_name = ${ach.student_name},
        year = ${ach.year},
        image = ${ach.image},
        description = ${ach.description};
    `;
  }
  console.log("Achievements synced.");

  // --- Seed Gallery (preserving g-1790225773111) ---
  const galleryItems = [
    {
      id: "g-1",
      title: "Workshop Guru Kreatif & Inovasi Pembelajaran Digital",
      category: "Kegiatan",
      imageurl: "/bg-al-furqon2.jpg",
      date: "2025-08-10",
      description: "Dokumentasi pelatihan dewan guru SMA Al-Furqon dalam pengembangan media digital modern.",
    },
    {
      id: "g-2",
      title: "Sertifikasi & Munaqosyah Al-Qur'an Metode UMMI",
      category: "Keagamaan",
      imageurl: "/bg-al-furqon3.jpg",
      date: "2025-11-20",
      description: "Ujian terbuka hafalan Al-Qur'an santri disaksikan orang tua wali murid.",
    },
    {
      id: "g-3",
      title: "Praktikum Laboratorium Sains Berbasis Projek (P5)",
      category: "Pembelajaran",
      imageurl: "/bg-al-furqon4.jpg",
      date: "2025-09-14",
      description: "Siswa melakukan eksperimen uji kadar air tanah dan pupuk organik daur ulang.",
    },
    {
      id: "g-4",
      title: "Aksi Tanam 1000 Pohon & Green School Adiwiyata",
      category: "Lingkungan Sekolah",
      imageurl: "/bg-al-furqon2.jpg",
      date: "2025-07-05",
      description: "Penanaman bibit pohon di halaman hijau sekolah SMA Al-Furqon Driyorejo.",
    },
    {
      id: "g-5",
      title: "Penyerahan Trofi Juara 1 Olimpiade Sains Jatim",
      category: "Prestasi",
      imageurl: "/bg-al-furqon3.jpg",
      date: "2025-10-02",
      description: "Momen penganugerahan medali emas oleh Dinas Pendidikan Provinsi.",
    },
    {
      id: "g-6",
      title: "Latihan Rutin Ekstrakurikuler Robotik & IoT",
      category: "Ekstrakurikuler",
      imageurl: "/bg-al-furqon4.jpg",
      date: "2025-10-18",
      description: "Siswa merakit sensor suhu otomatis untuk greenhouse sekolah.",
    },
    {
      id: "g-7",
      title: "Kajian Rutin & Sholat Dhuha Berjamaah Santri",
      category: "Keagamaan",
      imageurl: "/bg-al-furqon2.jpg",
      date: "2025-12-01",
      description: "Pembiasaan ibadah harian dan kebersamaan di masjid sekolah.",
    },
    {
      id: "g-8",
      title: "Pentas Seni & Budaya Nusantara Santri Al-Furqon",
      category: "Kegiatan",
      imageurl: "/bg-al-furqon3.jpg",
      date: "2025-12-15",
      description: "Pertunjukan bakat seni tari, al-banjari, dan drama pahlawan Islami.",
    },
    {
      id: "g-9",
      title: "Upacara Bendera & Peringatan Hari Pendidikan",
      category: "Kegiatan",
      imageurl: "/bg-al-furqon4.jpg",
      date: "2025-05-02",
      description: "Khidmat upacara memperingati Hari Pendidikan Nasional di lapangan utama.",
    },
    {
      id: "g-1790225773111",
      title: "Simulasi TKA Kelas XII",
      category: "Kegiatan",
      imageurl: "/bg-al-furqon4.jpg",
      date: "2026-09-24",
      description: "SMA Al Furqon Driyorejo menggelar kegiatan Simulasi Tes Kemampuan Akademik (TKA) bagi seluruh siswa kelas XII.",
    },
  ];

  for (const g of galleryItems) {
    await sql`
      INSERT INTO gallery (id, title, category, imageurl, date, description)
      VALUES (${g.id}, ${g.title}, ${g.category}, ${g.imageurl}, ${g.date}, ${g.description})
      ON CONFLICT (id) DO UPDATE SET
        title = ${g.title},
        category = ${g.category},
        imageurl = ${g.imageurl},
        date = ${g.date},
        description = ${g.description};
    `;
  }
  console.log("Gallery synced.");

  // --- Seed Testimonials ---
  const testimonials = [
    {
      id: "testi-1",
      name: "Elvina Cahyani",
      role: "Alumni",
      graduation_year: "Alumni Diterima di ITS SURABAYA",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      content: "Selama saya belajar di SMA PP. Al Furqon, selain saya mendapat ilmu agama dan Al Qur'an metode UMMI, saya juga mendapat bimbingan LKTI dan bimbingan masuk Perguruan Tinggi Negeri, sehingga saya diterima di ITS. Terima kasih Al Furqon.",
      rating: 5,
    },
    {
      id: "testi-2",
      name: "Afif Hidayatulloh, S.E., S.Pd., M.Ak., C.HT C.NNLP",
      role: "Alumni",
      graduation_year: "Dosen, Praktisi, & Motivator",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      content: "Di SMA PP. Al Furqon tidak hanya diajarkan hard skill tapi soft skill. Itu diasah dengan sangat luar biasa sehingga mampu mencetak santri yang unggul dalam intelektual dan anggun dalam moralitas.",
      rating: 5,
    },
    {
      id: "testi-3",
      name: "Adinda Puspitasari",
      role: "Alumni",
      graduation_year: "Alumni Diterima di UNESA",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      content: "Bersekolah di SMA PP. Al Furqon yang notabene berbasis pesantren, namun tidak diragukan lagi untuk kualitas pendidikan formalnya, apalagi sekarang sudah menjadi sekolah penggerak yang mewujudkan visi pendidikan Indonesia untuk mencetak generasi unggul segala bidang.",
      rating: 5,
    },
    {
      id: "testi-4",
      name: "Nanang Priyatnahari",
      role: "Orang Tua Wali",
      graduation_year: "Pensiunan PT. Petrokimia Gresik / Praktisi Vokasi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      content: "SMA PP. Al Furqon adalah sekolah menengah umum yang berlandaskan keagamaan yang kuat, dengan manajemen yang inovatif dengan dukungan dari perguruan tinggi dan industri. Sangat layak menjadi pilihan utama!",
      rating: 5,
    },
  ];

  for (const tm of testimonials) {
    await sql`
      INSERT INTO testimonials (id, name, role, graduation_year, avatar, content, rating)
      VALUES (${tm.id}, ${tm.name}, ${tm.role}, ${tm.graduation_year}, ${tm.avatar}, ${tm.content}, ${tm.rating})
      ON CONFLICT (id) DO UPDATE SET
        name = ${tm.name},
        role = ${tm.role},
        graduation_year = ${tm.graduation_year},
        avatar = ${tm.avatar},
        content = ${tm.content},
        rating = ${tm.rating};
    `;
  }
  console.log("Testimonials synced.");

  // --- Seed FAQs ---
  const faqs = [
    {
      id: "faq-1",
      question: "Kapan pendaftaran PPDB SMA Al-Furqon Driyorejo T.A. 2026/2027 dibuka?",
      answer: "Pendaftaran Gelombang 1 dibuka mulai 2 Januari 2026 s.d. 30 April 2026. Gelombang 2 dibuka 1 Mei 2026 s.d. 10 Juli 2026 (selama kuota masih tersedia).",
      category: "PPDB",
    },
    {
      id: "faq-2",
      question: "Apa saja syarat utama mendaftar sebagai calon peserta didik baru?",
      answer: "Syarat utama: FC Ijazah/SKL SMP/MTs, FC Akta Kelahiran, FC Kartu Keluarga, Pasfoto 3x4 (3 lembar), dan mengisi Form Pendaftaran Online/Offline.",
      category: "PPDB",
    },
    {
      id: "faq-3",
      question: "Bagaimana sistem pengajaran Al-Qur'an di SMA Al-Furqon?",
      answer: "Setiap pagi sebelum KBM reguler, siswa mengikuti bimbingan metode UMMI dan Tahfidz Al-Qur'an terstruktur dengan target minimal 3 Juz hafalan hingga wisuda.",
      category: "Kehidupan Santri",
    },
    {
      id: "faq-4",
      question: "Apakah SMA Al-Furqon menerapkan Kurikulum Merdeka?",
      answer: "Ya, SMA Al-Furqon Driyorejo menerapkan Kurikulum Merdeka secara penuh (Kategori Berbagi & Mandiri) yang dilengkapi Projek Penguatan Profil Pelajar Pancasila (P5).",
      category: "Kurikulum",
    },
    {
      id: "faq-5",
      question: "Apakah ada beasiswa bagi siswa berprestasi?",
      answer: "Kami menyediakan Beasiswa Tahfidz Al-Qur'an (bebas SPP), Beasiswa Juara Olimpiade Sains/Seni, serta beasiswa khusus alumni MTs Al-Furqon.",
      category: "PPDB",
    },
  ];

  for (const f of faqs) {
    await sql`
      INSERT INTO faqs (id, question, answer, category)
      VALUES (${f.id}, ${f.question}, ${f.answer}, ${f.category})
      ON CONFLICT (id) DO UPDATE SET
        question = ${f.question},
        answer = ${f.answer},
        category = ${f.category};
    `;
  }
  console.log("FAQs synced.");

  console.log("=== ALL NEON POSTGRESQL TABLES ARE NOW 100% IN SYNC AND POPULATED! ===");
}

migrateAndSeed()
  .then(() => {
    console.log("Migration & seeding completed successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
  });
