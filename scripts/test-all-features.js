const http = require('http');

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port || 80,
        path: u.pathname + u.search,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runAllTests() {
  console.log("=========================================");
  console.log("🚀 STARTING COMPREHENSIVE FEATURE TESTS");
  console.log("=========================================\n");

  let totalTests = 0;
  let passedTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`✅ PASS: ${testName}`);
    } else {
      console.error(`❌ FAIL: ${testName}`);
    }
  }

  // TEST 1: GET /api/data & Cache-Control headers
  console.log("\n--- TEST SUITE 1: API Data & Freshness ---");
  const apiRes = await fetchUrl("http://localhost:3000/api/data");
  assert(apiRes.status === 200, "GET /api/data returns HTTP 200");
  const cacheControl = apiRes.headers["cache-control"] || "";
  assert(cacheControl.includes("no-store"), `GET /api/data header has no-store: ${cacheControl}`);

  const bundle = JSON.parse(apiRes.body);
  assert(bundle.schoolInfo && bundle.schoolInfo.name.includes("AL-FURQON"), "School info loaded from Neon DB");
  assert(bundle.news.length >= 4, `News loaded from Neon DB: ${bundle.news.length} items`);
  assert(bundle.agendas.length >= 4, `Agendas loaded from Neon DB: ${bundle.agendas.length} items`);
  assert(bundle.achievements.length >= 4, `Achievements loaded from Neon DB: ${bundle.achievements.length} items`);
  assert(bundle.teachers.length >= 21, `Teachers loaded from Neon DB: ${bundle.teachers.length} items`);
  assert(bundle.gallery.length >= 10, `Gallery photos loaded from Neon DB: ${bundle.gallery.length} items`);
  assert(bundle.faqs.length >= 5, `FAQs loaded from Neon DB: ${bundle.faqs.length} items`);
  assert(bundle.testimonials.length >= 4, `Testimonials loaded from Neon DB: ${bundle.testimonials.length} items`);
  assert(bundle.facilities.length >= 4, `Facilities loaded from Neon DB: ${bundle.facilities.length} items`);

  // TEST 2: Ekstrakurikuler - No images, Icons only
  console.log("\n--- TEST SUITE 2: Ekstrakurikuler (Icon Only) ---");
  assert(bundle.extracurriculars.length === 7, `Extracurriculars loaded: ${bundle.extracurriculars.length} clubs`);
  
  let allHaveNoImage = true;
  let allHaveIcon = true;
  for (const e of bundle.extracurriculars) {
    if (e.image && e.image.trim() !== "") {
      allHaveNoImage = false;
      console.error(`Club ${e.name} has image: ${e.image}`);
    }
    if (!e.icon && !e.iconImage) {
      allHaveIcon = false;
    }
  }
  assert(allHaveNoImage, "All extracurriculars have NO image (image is empty string)");
  assert(allHaveIcon, "All extracurriculars have an icon or custom icon image specified");

  // TEST 3: Mutations in Neon DB
  console.log("\n--- TEST SUITE 3: Neon DB Mutations (CRUD) ---");
  
  // 3a. News Save & Delete
  const testNewsId = "news-test-" + Date.now();
  const saveNewsRes = await fetchUrl("http://localhost:3000/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "news",
      action: "save",
      item: {
        id: testNewsId,
        title: "Test Judul Berita Antigravity",
        slug: "test-judul-berita-antigravity",
        excerpt: "Kutipan uji coba",
        content: "Konten lengkap uji coba sistem Neon DB",
        category: "Berita",
        date: "2026-10-01",
        author: "Tester",
        image: "/bg-al-furqon2.jpg",
        isFeatured: false,
        tags: ["Test", "Neon"],
        youtubeUrl: "",
        status: "published",
      },
    }),
  });
  assert(saveNewsRes.status === 200, "POST /api/data save news returns 200");

  // Verify it exists in Neon DB
  const verifyNewsRes = await fetchUrl("http://localhost:3000/api/data?_t=" + Date.now());
  const verifyNewsData = JSON.parse(verifyNewsRes.body);
  const foundNews = verifyNewsData.news.find((n) => n.id === testNewsId);
  assert(Boolean(foundNews), "New article was saved & immediately returned from Neon DB");

  // Delete it
  const delNewsRes = await fetchUrl("http://localhost:3000/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "news", action: "delete", id: testNewsId }),
  });
  assert(delNewsRes.status === 200, "POST /api/data delete news returns 200");

  // 3b. Extracurricular Update
  const testEkskulId = "ekskul-1";
  const updateEkskulRes = await fetchUrl("http://localhost:3000/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "extracurriculars",
      action: "save",
      item: {
        id: testEkskulId,
        name: "Desain Grafis",
        category: "Keterampilan",
        description: "Pelatihan desain grafis modern menggunakan Photoshop, Illustrator, Canva, dan Figma untuk pembuatan media visual, poster dakwah, dan branding digital.",
        schedule: "Jumat (08:30 - 10:30 WIB)",
        instructor: "M. Irfan, S.Kom.",
        icon: "Palette",
        achievements: ["Juara 2 Desain Poster Tingkat Kabupaten 2025"],
      },
    }),
  });
  assert(updateEkskulRes.status === 200, "POST /api/data update extracurricular returns 200");

  // 3c. FAQ Save & Delete
  const testFaqId = "faq-test-" + Date.now();
  const saveFaqRes = await fetchUrl("http://localhost:3000/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "faqs",
      action: "save",
      item: {
        id: testFaqId,
        question: "Apakah Neon DB terhubung secara live?",
        answer: "Ya, Neon DB terhubung langsung dan real-time tanpa cache lama!",
        category: "Teknologi",
      },
    }),
  });
  assert(saveFaqRes.status === 200, "POST /api/data save FAQ returns 200");

  const delFaqRes = await fetchUrl("http://localhost:3000/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "faqs", action: "delete", id: testFaqId }),
  });
  assert(delFaqRes.status === 200, "POST /api/data delete FAQ returns 200");

  // TEST 4: Frontend HTML Page Rendering
  console.log("\n--- TEST SUITE 4: Page Route Verification ---");
  const pages = [
    { url: "http://localhost:3000/", name: "Home Page (/)" },
    { url: "http://localhost:3000/kesiswaan/ekstrakurikuler", name: "Ekstrakurikuler Page" },
    { url: "http://localhost:3000/berita", name: "Portal Berita" },
    { url: "http://localhost:3000/agenda", name: "Agenda Kegiatan" },
    { url: "http://localhost:3000/prestasi", name: "Prestasi Siswa" },
    { url: "http://localhost:3000/galeri", name: "Galeri Dokumentasi" },
    { url: "http://localhost:3000/psb", name: "PSB Online" },
    { url: "http://localhost:3000/profil/guru-staf", name: "Profil Guru & Staf" },
    { url: "http://localhost:3000/admin/ekstrakurikuler", name: "Admin Ekstrakurikuler CMS" },
    { url: "http://localhost:3000/admin/dashboard", name: "Admin Dashboard CMS" },
    { url: "http://localhost:3000/admin/psb", name: "Admin PSB CMS" },
  ];

  for (const p of pages) {
    const res = await fetchUrl(p.url);
    assert(res.status === 200, `${p.name} responds with HTTP 200`);
  }

  // Verify Ekstrakurikuler page content does NOT have banner images
  const ekstraPageRes = await fetchUrl("http://localhost:3000/kesiswaan/ekstrakurikuler");
  assert(ekstraPageRes.body.includes("Desain Grafis"), "Ekstrakurikuler page renders 'Desain Grafis'");
  assert(ekstraPageRes.body.includes("Pencak Silat"), "Ekstrakurikuler page renders 'Pencak Silat'");
  assert(!ekstraPageRes.body.includes("h-44 relative overflow-hidden"), "Ekstrakurikuler page does NOT have photo banner container");

  console.log("\n=========================================");
  console.log(`📊 FINAL TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED!`);
  console.log("=========================================\n");

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
