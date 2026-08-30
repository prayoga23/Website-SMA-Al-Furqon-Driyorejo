const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_yo2PTxLukc1s@ep-lingering-dew-axy5bekt.c-4.us-east-2.aws.neon.tech/website_alfurqon?sslmode=require";

const sql = neon(DATABASE_URL);

async function seedData() {
  console.log("Seeding data into Neon.tech PostgreSQL database...");

  // Seed Admin User
  await sql`
    INSERT INTO users (id, username, password, name, role, status, email)
    VALUES ('user-admin', 'admin', 'admin123', 'Administrator Sekolah', 'Admin', 'Aktif', 'admin@smaalfurqondriyorejo.sch.id')
    ON CONFLICT (id) DO NOTHING;
  `;

  // Seed School Info
  const schoolData = {
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
    headmasterName: "Dr. Suryanto, S.Pd., M.Pd.",
    headmasterPhoto: "/foto-kepala-sekolah.png",
  };

  await sql`
    INSERT INTO school_info (id, data)
    VALUES ('default', ${JSON.stringify(schoolData)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(schoolData)}::jsonb;
  `;

  // Seed Teachers (21 Official Teachers & Staff)
  const teacherList = [
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
      photo: "/foto-guru/suryanto.png",
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
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      education: "S2 Magister Pendidikan",
      bio: "Tenaga Pendidik Pendidikan Agama Islam."
    },
    {
      id: "t-7",
      name: "M. Refa Mashuri, S.Pd.",
      position: "Guru",
      subject: "Guru PAI",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      education: "S1 Pendidikan Agama Islam",
      bio: "Tenaga Pendidik Pendidikan Agama Islam."
    },
    {
      id: "t-8",
      name: "Syaifuddin Yahya, M.Pd.I",
      position: "Guru",
      subject: "Guru Fiqih",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      education: "S2 Magister Pendidikan Islam",
      bio: "Tenaga Pendidik Fiqih & Keislaman."
    },
    {
      id: "t-9",
      name: "Sugeng Utomo, S.Pd.",
      position: "Guru",
      subject: "Guru Matematika",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      education: "S1 Pendidikan Matematika",
      bio: "Tenaga Pendidik Matematika."
    },
    {
      id: "t-10",
      name: "M. Mas'ud Yunus, S.Pd.",
      position: "Guru",
      subject: "Guru B. Indonesia",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      education: "S1 Pendidikan Bahasa Indonesia",
      bio: "Tenaga Pendidik Bahasa Indonesia."
    },
    {
      id: "t-11",
      name: "Masyhudan, S.T",
      position: "Guru",
      subject: "Guru Sejarah",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
      education: "S1 Sarjana Teknik",
      bio: "Tenaga Pendidik Sejarah."
    },
    {
      id: "t-12",
      name: "Nuril Habibi, M.Hi",
      position: "Guru",
      subject: "Guru Fiqih",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      education: "S2 Magister Hukum Islam",
      bio: "Tenaga Pendidik Fiqih."
    },
    {
      id: "t-13",
      name: "Kholil Misbah, Lc.",
      position: "Guru",
      subject: "Guru Bahasa Arab",
      photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
      education: "S1 Lisensiat (Lc.) Bahasa & Sastra Arab",
      bio: "Tenaga Pendidik Bahasa Arab."
    },
    {
      id: "t-14",
      name: "Nurul Idhomah, S.pd.",
      position: "Guru",
      subject: "Guru Senibudaya Prakarya",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      education: "S1 Pendidikan",
      bio: "Tenaga Pendidik Seni Budaya & Prakarya."
    },
    {
      id: "t-15",
      name: "Khoirum Umala, S.pd.",
      position: "Guru",
      subject: "Guru Sosiologi, Ekonomi",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      education: "S1 Pendidikan",
      bio: "Tenaga Pendidik Sosiologi & Ekonomi."
    },
    {
      id: "t-16",
      name: "Tifani Ikmahtiar, S.Si.",
      position: "Guru",
      subject: "Guru Fisika, Biologi",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      education: "S1 Sarjana Sains (S.Si)",
      bio: "Tenaga Pendidik Fisika & Biologi."
    },
    {
      id: "t-17",
      name: "Fita Islamiah, S.pd.",
      position: "Guru",
      subject: "Guru Kimia, Biologi",
      photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
      education: "S1 Pendidikan",
      bio: "Tenaga Pendidik Kimia & Biologi."
    },
    {
      id: "t-18",
      name: "Utari Kartika, S.pd.",
      position: "Guru",
      subject: "Guru PKN",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
      education: "S1 Pendidikan Pancasila dan Kewarganegaraan",
      bio: "Tenaga Pendidik PKN."
    },
    {
      id: "t-19",
      name: "Khoir Ummah",
      position: "Guru UMMI",
      subject: "Guru UMMI",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      education: "Pengajar Tersertifikasi UMMI Foundation",
      bio: "Tenaga Pendidik Metode UMMI Al-Qur'an."
    },
    {
      id: "t-20",
      name: "Nur Widia",
      position: "Guru UMMI",
      subject: "Guru UMMI",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      education: "Pengajar Tersertifikasi UMMI Foundation",
      bio: "Tenaga Pendidik Metode UMMI Al-Qur'an."
    },
    {
      id: "t-21",
      name: "Sri Wahyuni",
      position: "Guru UMMI",
      subject: "Guru UMMI",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      education: "Pengajar Tersertifikasi UMMI Foundation",
      bio: "Tenaga Pendidik Metode UMMI Al-Qur'an."
    }
  ];

  for (const t of teacherList) {
    await sql`
      INSERT INTO teachers (id, name, role, subject, photo, bio)
      VALUES (${t.id}, ${t.name}, ${t.position}, ${t.subject}, ${t.photo}, ${t.bio})
      ON CONFLICT (id) DO UPDATE SET
        name = ${t.name},
        role = ${t.position},
        subject = ${t.subject},
        photo = ${t.photo},
        bio = ${t.bio};
    `;
  }

  console.log("✅ Seed data inserted successfully into Neon PostgreSQL!");
}

seedData().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
