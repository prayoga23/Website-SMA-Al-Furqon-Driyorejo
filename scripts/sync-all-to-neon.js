const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_yo2PTxLukc1s@ep-lingering-dew-axy5bekt.c-4.us-east-2.aws.neon.tech/website_alfurqon?sslmode=require";

const sql = neon(DATABASE_URL);

async function runSync() {
  console.log("Checking Neon database connection and table status...");

  // 1. Ensure columns
  await sql`ALTER TABLE news ADD COLUMN IF NOT EXISTS youtube_url TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS bio TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS photo TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS subject TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS position TEXT;`;
  await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS education TEXT;`;
  await sql`ALTER TABLE achievements ADD COLUMN IF NOT EXISTS event TEXT;`;
  await sql`ALTER TABLE achievements ADD COLUMN IF NOT EXISTS rank TEXT;`;
  await sql`ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS graduation_year TEXT;`;
  await sql`ALTER TABLE extracurriculars ADD COLUMN IF NOT EXISTS mentor TEXT;`;
  await sql`ALTER TABLE extracurriculars ADD COLUMN IF NOT EXISTS instructor TEXT;`;

  await sql`
    CREATE TABLE IF NOT EXISTS kesiswaan_activities (
      id VARCHAR(100) PRIMARY KEY,
      slug VARCHAR(100) UNIQUE,
      data JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 2. Seed kesiswaan_activities if empty
  const kCheck = await sql`SELECT count(*) FROM kesiswaan_activities`;
  if (Number(kCheck[0]?.count) === 0) {
    console.log("Seeding kesiswaan_activities...");
    const kesiswaanData = [
      {
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
        content: `Organisasi Siswa Intra Sekolah (OSIS) dan Ambalan Penegak Pramuka SMA Al-Furqon Driyorejo merupakan pilar utama pembentukan karakter kepemimpinan dan manajerial santri di lingkungan sekolah. Melalui wadah ini, siswa dilatih secara langsung untuk menjadi pribadi yang mandiri, disiplin, berwawasan luas, dan memiliki rasa kepedulian sosial yang tinggi berbasis akhlakul karimah.

### 1. Pembentukan Jiwa Kepemimpinan Islami (Leadership Skill)
Setiap pengurus OSIS dan Ambalan Pramuka diajarkan dasar-dasar kepemimpinan (Leadership Training) yang berlandaskan teladan Rasulullah SAW.

### 2. Manajemen Event & Program Kerja Mandiri
Pengurus OSIS diberikan amanah untuk menyusun, mengelola, dan merealisasikan program kerja tahunan sekolah, di antaranya Furqon Festival, PHBI, dan PHBN.`,
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
      },
      {
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
        content: `Pendidikan di SMA Al-Furqon Driyorejo menitikberatkan pada keunggulan intelektual akademik dan fondasi spiritual yang kokoh melalui Metode UMMI.`,
        highlights: [
          "Shalat Dhuha Berjamaah & Kajian Kitab Akhlak Rutin Setiap Pagi",
          "Target Hafalan Minimal 3 Juz Al-Qur'an (Juz 30, 29, 1) dengan Sertifikasi UMMI",
          "Munaqosyah & Imtihan Tahfidz Terbuka Bersama Orang Tua & Penguji UMMI Pusat",
          "Qiyamul Lail (Shalat Tahajud & Witir) Berjamaah di Asrama Pondok"
        ],
        schedule: "Setiap Hari (Rutin Pagi & Malam)",
        target: "Santri Asrama & Siswa Reguler SMA Al-Furqon",
        tags: ["TahfidzUMMI", "Spiritual", "AlQuran", "ShalatDhuha", "KarakterRabbani", "PesantrenAlFurqon"]
      },
      {
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
        content: `SMA Al-Furqon Driyorejo berkomitmen penuh menciptakan ekosistem sekolah yang asri, bersih, dan berwawasan lingkungan melalui Program Sekolah Adiwiyata & Gerakan Zero Waste.`,
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
    ];

    for (const item of kesiswaanData) {
      await sql`
        INSERT INTO kesiswaan_activities (id, slug, data)
        VALUES (${item.id}, ${item.slug}, ${JSON.stringify(item)}::jsonb)
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  // 3. Seed facilities if empty
  const fCheck = await sql`SELECT count(*) FROM facilities`;
  if (Number(fCheck[0]?.count) === 0) {
    console.log("Seeding facilities...");
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
        name: "Laboratorium Sains MIPA",
        category: "Riset & Eksperimen",
        description: "Laboratorium Sains MIPA (Fisika, Kimia, Biologi) dengan peralatan eksperimen modern berstandar praktikum dan penelitian siswa.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fac-3",
        name: "Lab Komputer & Informatika",
        category: "Teknologi & Digital",
        description: "Laboratorium komputer multimedia spesifikasi tinggi, jaringan internet cepat, serta literasi Artificial Intelligence.",
        image: "/labkomputer.jpeg"
      },
      {
        id: "fac-4",
        name: "Area Olahraga & Seni",
        category: "Kebugaran & Seni",
        description: "Fasilitas olahraga outdoor & indoor lengkap mencakup lapangan serbaguna futsal, basket, voli, serta gelanggang seni pencak silat.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
      }
    ];

    for (const f of facilities) {
      await sql`
        INSERT INTO facilities (id, name, category, description, image)
        VALUES (${f.id}, ${f.name}, ${f.category}, ${f.description}, ${f.image})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  // 4. Seed extracurriculars if empty
  const exCheck = await sql`SELECT count(*) FROM extracurriculars`;
  if (Number(exCheck[0]?.count) === 0) {
    console.log("Seeding extracurriculars...");
    const extras = [
      {
        id: "ekskul-1",
        name: "Pramuka Penegak Ambalan",
        category: "Kepemimpinan",
        mentor: "Kak Bambang Irawan",
        schedule: "Jumat, 14.30 - 16.30 WIB",
        description: "Membina kecakapan hidup, kedisiplinan, survival skill, dan ketahanan mental santri berwawasan kebangsaan.",
        image: "/bg-al-furqon2.jpg"
      },
      {
        id: "ekskul-2",
        name: "Seni Baca Al-Qur'an (Tilawah)",
        category: "Keagamaan",
        mentor: "Ustadz H. Ahmad Rifa'i",
        schedule: "Selasa, 15.30 - 17.00 WIB",
        description: "Pengembangan bakat seni membaca Al-Qur'an dengan berbagai lagu maqamat indah dan tajwid presisi.",
        image: "/bg-al-furqon3.jpg"
      },
      {
        id: "ekskul-3",
        name: "Futsal Club Al-Furqon",
        category: "Olahraga",
        mentor: "Coach Dimas Prasetyo",
        schedule: "Rabu, 15.30 - 17.30 WIB",
        description: "Latihan taktik sepak bola futsal, pembinaan fisik atletis, dan persiapan turnamen antar-pelajar se-Jawa Timur.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "ekskul-4",
        name: "Klub Robotik & Coding AI",
        category: "Sains & Teknologi",
        mentor: "Masyhudan, S.T.",
        schedule: "Kamis, 15.00 - 17.00 WIB",
        description: "Pengenalan pemrograman mikrokontroler Arduino, IoT, sensorika robotik, dan dasar-dasar kecerdasan buatan.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
      }
    ];

    for (const ex of extras) {
      await sql`
        INSERT INTO extracurriculars (id, name, category, mentor, schedule, description, image)
        VALUES (${ex.id}, ${ex.name}, ${ex.category}, ${ex.mentor}, ${ex.schedule}, ${ex.description}, ${ex.image})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  // 5. Seed achievements if empty
  const achCheck = await sql`SELECT count(*) FROM achievements`;
  if (Number(achCheck[0]?.count) === 0) {
    console.log("Seeding achievements...");
    const achievements = [
      {
        id: "ach-1",
        title: "Juara 1 Olimpiade Matematika Terapan Nasional",
        event: "National Science & Math Olympiad 2025",
        level: "Nasional",
        studentName: "Muhammad Rayhan Pratama",
        year: "2025",
        image: "/bg-al-furqon2.jpg",
        description: "Berhasil meraih Medali Emas pada kategori Matematika Terapan Tingkat SMA se-Indonesia."
      },
      {
        id: "ach-2",
        title: "Juara 1 MHQ (Musabaqah Hifdzil Qur'an) 5 Juz",
        event: "Pentas PAI Tingkat Provinsi Jawa Timur",
        level: "Provinsi",
        studentName: "Ahmad Zaki Al-Faruq",
        year: "2025",
        image: "/bg-al-furqon3.jpg",
        description: "Meraih predikat terbaik kategori Tahfidz Al-Qur'an 5 Juz dengan tartil dan tajwid sempurna."
      }
    ];

    for (const a of achievements) {
      await sql`
        INSERT INTO achievements (id, title, event, level, student_name, year, image, description)
        VALUES (${a.id}, ${a.title}, ${a.event}, ${a.level}, ${a.studentName}, ${a.year}, ${a.image}, ${a.description})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  // 6. Ensure db_seeded flag is set
  await sql`
    INSERT INTO system_config (key, value)
    VALUES ('db_seeded', 'true')
    ON CONFLICT (key) DO UPDATE SET value = 'true';
  `;

  console.log("All tables in Neon are now fully populated and confirmed!");
}

runSync().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
