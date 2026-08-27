const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_yo2PTxLukc1s@ep-lingering-dew-axy5bekt.c-4.us-east-2.aws.neon.tech/website_alfurqon?sslmode=require";

const sql = neon(DATABASE_URL);

async function seedData() {
  console.log("Seeding data into Neon.tech PostgreSQL database...");

  // Seed Admin User
  await sql`
    INSERT INTO users (id, username, password, name, role, email)
    VALUES ('user-admin', 'admin', 'admin123', 'Administrator Sekolah', 'Admin', 'admin@smaalfurqondriyorejo.sch.id')
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
    headmasterName: "Suryanto, S.Pd., M.Pd.",
  };

  await sql`
    INSERT INTO school_info (id, data)
    VALUES ('default', ${JSON.stringify(schoolData)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(schoolData)}::jsonb;
  `;

  // Seed News
  const newsList = [
    {
      id: "news-1",
      title: "Allah Ku Ajukan Proposal Perubahanku",
      slug: "allah-ku-ajukan-proposal-perubahanku",
      excerpt: "Sukses sendiri itu biasa, Sukses bersama itu luar biasa.",
      content: "Setiap manusia memiliki kesempatan emas untuk memproposalkan perubahan hidupnya di hadapan Allah SWT.",
      category: "Berita",
      date: "2026-01-15",
      author: "Tim Humas SMA Al-Furqon",
      image: "/bg-al-furqon2.jpg",
      is_featured: true,
      tags: ["Pendidikan Karakter", "Spiritual", "Al-Furqon"]
    },
    {
      id: "news-2",
      title: "Saatnya Memetik Buah Ilmu: Sertifikasi Al-Qur'an Metode UMMI 2026",
      slug: "saatnya-memetik-buah-ilmu",
      excerpt: "Pelaksanaan Munaqosyah dan Sertifikasi Tajwid & Tartil Al-Qur'an Metode UMMI.",
      content: "Setelah menempuh proses panjang pembelajaran Al-Qur'an dengan metode UMMI, puluhan santri SMA Al-Furqon Driyorejo mengikuti ujian Munaqosyah resmi.",
      category: "Prestasi",
      date: "2025-11-20",
      author: "Koordinator Keagamaan",
      image: "/bg-al-furqon3.jpg",
      is_featured: true,
      tags: ["UMMI", "Al-Qur'an", "Sertifikasi"]
    }
  ];

  for (const n of newsList) {
    await sql`
      INSERT INTO news (id, title, slug, excerpt, content, category, date, author, image, is_featured, tags)
      VALUES (${n.id}, ${n.title}, ${n.slug}, ${n.excerpt}, ${n.content}, ${n.category}, ${n.date}, ${n.author}, ${n.image}, ${n.is_featured}, ${JSON.stringify(n.tags)}::jsonb)
      ON CONFLICT (id) DO UPDATE SET
        title = ${n.title},
        content = ${n.content},
        is_featured = ${n.is_featured};
    `;
  }

  // Seed Agendas
  const agendas = [
    {
      id: "agenda-1",
      title: "Pelaksanaan Penilaian Sumatif Akhir Semester (PSAS) 2026",
      date: "2026-06-02",
      time: "07:00 - 12:30 WIB",
      location: "Gedung Utama SMA Al-Furqon",
      description: "Evaluasi hasil belajar siswa berbasis CBT Tablet & Komputer.",
      category: "Akademik"
    },
    {
      id: "agenda-2",
      title: "Munaqosyah Al-Qur'an & Wisuda Tahfidz Gelombang II",
      date: "2026-06-20",
      time: "08:00 - 15:00 WIB",
      location: "Aula Masjid Al-Furqon Driyorejo",
      description: "Ujian terbuka hafalan Al-Qur'an Juz 30, 1, 2, dan 3.",
      category: "Keagamaan"
    }
  ];

  for (const a of agendas) {
    await sql`
      INSERT INTO agendas (id, title, date, time, location, description, category)
      VALUES (${a.id}, ${a.title}, ${a.date}, ${a.time}, ${a.location}, ${a.description}, ${a.category})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  console.log("✅ Seed data inserted successfully into Neon PostgreSQL!");
}

seedData().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
