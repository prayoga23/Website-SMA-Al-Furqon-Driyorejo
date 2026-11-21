const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_yo2PTxLukc1s@ep-lingering-dew-axy5bekt.c-4.us-east-2.aws.neon.tech/website_alfurqon?sslmode=require";

const sql = neon(DATABASE_URL);

async function migrateAndSync() {
  console.log("==================================================");
  console.log("🔄 Starting Migration & Schema Sync for Neon PostgreSQL");
  console.log("==================================================");

  // 1. Rename ppdb_applicants to psb_applicants if ppdb_applicants exists
  console.log("\n[1/5] Checking psb_applicants table...");
  await sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ppdb_applicants' AND table_type = 'BASE TABLE')
         AND NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'psb_applicants') THEN
        ALTER TABLE ppdb_applicants RENAME TO psb_applicants;
        RAISE NOTICE 'Renamed table ppdb_applicants -> psb_applicants';
      END IF;
    END $$;
  `;

  // 2. Ensure psb_applicants table exists with all standard columns and data JSONB
  await sql`
    CREATE TABLE IF NOT EXISTS psb_applicants (
      id VARCHAR(100) PRIMARY KEY,
      registration_number VARCHAR(100) UNIQUE,
      full_name VARCHAR(255) NOT NULL,
      nisn VARCHAR(50),
      gender VARCHAR(20),
      birth_place VARCHAR(100),
      birth_date VARCHAR(50),
      address TEXT,
      previous_school VARCHAR(255),
      parent_name VARCHAR(255),
      parent_phone VARCHAR(50),
      chosen_major VARCHAR(100),
      registration_date VARCHAR(50),
      status VARCHAR(50) DEFAULT 'Menunggu Verifikasi',
      notes TEXT,
      data JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // 3. Ensure data column exists on psb_applicants
  await sql`ALTER TABLE psb_applicants ADD COLUMN IF NOT EXISTS data JSONB;`;

  // 4. Ensure backward-compatibility view for ppdb_applicants
  await sql`CREATE OR REPLACE VIEW ppdb_applicants AS SELECT * FROM psb_applicants;`;
  console.log("✅ psb_applicants schema verified & compatibility view active!");

  // 5. Ensure missing columns on other tables
  console.log("\n[2/5] Ensuring columns on news, teachers, achievements, etc...");
  await sql`ALTER TABLE news ADD COLUMN IF NOT EXISTS youtube_url TEXT;`;
  await sql`ALTER TABLE news ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'published';`;
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
  console.log("✅ Supporting columns verified!");

  // 6. Ensure kesiswaan_activities table exists
  console.log("\n[3/5] Verifying kesiswaan_activities...");
  await sql`
    CREATE TABLE IF NOT EXISTS kesiswaan_activities (
      id VARCHAR(100) PRIMARY KEY,
      slug VARCHAR(100) UNIQUE,
      data JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✅ kesiswaan_activities table verified!");

  // 7. Verify main bundle query
  console.log("\n[4/5] Testing aggregate bundle query...");
  const result = await sql`
    SELECT json_build_object(
      'schoolInfo', (SELECT data FROM school_info WHERE id = 'default' LIMIT 1),
      'news', COALESCE((SELECT json_agg(n.*) FROM (SELECT * FROM news ORDER BY created_at DESC) n), '[]'::json),
      'agendas', COALESCE((SELECT json_agg(a.*) FROM (SELECT * FROM agendas ORDER BY date ASC) a), '[]'::json),
      'achievements', COALESCE((SELECT json_agg(ach.*) FROM (SELECT * FROM achievements ORDER BY year DESC) ach), '[]'::json),
      'teachers', COALESCE((SELECT json_agg(t.*) FROM (SELECT * FROM teachers ORDER BY created_at ASC) t), '[]'::json),
      'extracurriculars', COALESCE((SELECT json_agg(e.*) FROM (SELECT * FROM extracurriculars ORDER BY id ASC) e), '[]'::json),
      'gallery', COALESCE((SELECT json_agg(g.*) FROM (SELECT * FROM gallery ORDER BY created_at DESC) g), '[]'::json),
      'applicants', COALESCE((SELECT json_agg(app.*) FROM (SELECT * FROM psb_applicants ORDER BY created_at DESC) app), '[]'::json),
      'faqs', COALESCE((SELECT json_agg(f.*) FROM (SELECT * FROM faqs ORDER BY id ASC) f), '[]'::json),
      'testimonials', COALESCE((SELECT json_agg(tm.*) FROM (SELECT * FROM testimonials ORDER BY created_at DESC) tm), '[]'::json),
      'facilities', COALESCE((SELECT json_agg(fac.*) FROM (SELECT * FROM facilities ORDER BY name ASC) fac), '[]'::json),
      'users', COALESCE((SELECT json_agg(u.*) FROM (SELECT * FROM users ORDER BY created_at ASC) u), '[]'::json),
      'kesiswaan', COALESCE((SELECT json_agg(k.*) FROM (SELECT * FROM kesiswaan_activities ORDER BY created_at ASC) k), '[]'::json)
    ) as bundle;
  `;

  const bundle = result[0]?.bundle || {};
  console.log("✅ Bundle query executed successfully!");
  console.log(`   - School Info: ${bundle.schoolInfo ? 'OK' : 'Empty'}`);
  console.log(`   - News: ${Array.isArray(bundle.news) ? bundle.news.length : 0} items`);
  console.log(`   - Agendas: ${Array.isArray(bundle.agendas) ? bundle.agendas.length : 0} items`);
  console.log(`   - Achievements: ${Array.isArray(bundle.achievements) ? bundle.achievements.length : 0} items`);
  console.log(`   - Teachers: ${Array.isArray(bundle.teachers) ? bundle.teachers.length : 0} items`);
  console.log(`   - Extracurriculars: ${Array.isArray(bundle.extracurriculars) ? bundle.extracurriculars.length : 0} items`);
  console.log(`   - Gallery: ${Array.isArray(bundle.gallery) ? bundle.gallery.length : 0} items`);
  console.log(`   - PSB Applicants: ${Array.isArray(bundle.applicants) ? bundle.applicants.length : 0} items`);
  console.log(`   - FAQs: ${Array.isArray(bundle.faqs) ? bundle.faqs.length : 0} items`);
  console.log(`   - Facilities: ${Array.isArray(bundle.facilities) ? bundle.facilities.length : 0} items`);
  console.log(`   - Users: ${Array.isArray(bundle.users) ? bundle.users.length : 0} items`);

  console.log("\n[5/5] Migration completed with ZERO errors! 🎉\n");
}

migrateAndSync().catch((err) => {
  console.error("❌ Migration failed with error:", err);
  process.exit(1);
});
