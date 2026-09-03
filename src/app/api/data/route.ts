import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
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
} from "@/lib/data-store";

// Helper to auto-migrate database columns and seed initial data if missing in Neon DB
async function ensureDbSchema() {
  try {
    await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS position TEXT;`;
    await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS education TEXT;`;
    await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS bio TEXT;`;
    await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS photo TEXT;`;
    await sql`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS subject TEXT;`;

    // Ensure system_config metadata table exists
    await sql`
      CREATE TABLE IF NOT EXISTS system_config (
        key TEXT PRIMARY KEY,
        value TEXT
      );
    `;

    // Check if initial seeding has been executed
    const seedCheck = await sql`SELECT value FROM system_config WHERE key = 'db_seeded' LIMIT 1`;
    if (!seedCheck || seedCheck.length === 0 || seedCheck[0]?.value !== "true") {
      console.log("Database not seeded yet. Seeding initial data...");

      // Seed gallery if empty
      const gCheck = await sql`SELECT count(*) FROM gallery`;
      if (Number(gCheck[0]?.count) === 0) {
        for (const item of initialGallery) {
          await sql`
            INSERT INTO gallery (id, title, category, imageUrl, date, description)
            VALUES (${item.id}, ${item.title}, ${item.category || ''}, ${item.imageUrl || ''}, ${item.date || ''}, ${item.description || ''})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed teachers if empty
      const tCheck = await sql`SELECT count(*) FROM teachers`;
      if (Number(tCheck[0]?.count) === 0) {
        for (const t of initialTeachers) {
          await sql`
            INSERT INTO teachers (id, name, nip, position, subject, role, education, photo, bio, email, phone, is_active)
            VALUES (${t.id}, ${t.name}, ${t.nip || ''}, ${t.position || 'Guru'}, ${t.subject || ''}, ${t.position || 'Guru'}, ${t.education || ''}, ${t.photo || ''}, ${t.bio || ''}, '', '', true)
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed news if empty
      const nCheck = await sql`SELECT count(*) FROM news`;
      if (Number(nCheck[0]?.count) === 0) {
        for (const item of initialNews) {
          await sql`
            INSERT INTO news (id, title, slug, excerpt, content, category, date, author, image, is_featured, tags)
            VALUES (${item.id}, ${item.title}, ${item.slug || item.id}, ${item.excerpt || ''}, ${item.content || ''}, ${item.category || ''}, ${item.date || ''}, ${item.author || ''}, ${item.image || ''}, ${Boolean(item.isFeatured)}, ${JSON.stringify(item.tags || [])}::jsonb)
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed agendas if empty
      const aCheck = await sql`SELECT count(*) FROM agendas`;
      if (Number(aCheck[0]?.count) === 0) {
        for (const item of initialAgenda) {
          await sql`
            INSERT INTO agendas (id, title, date, time, location, description, category)
            VALUES (${item.id}, ${item.title}, ${item.date || ''}, ${item.time || ''}, ${item.location || ''}, ${item.description || ''}, ${item.category || ''})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed achievements if empty
      const achCheck = await sql`SELECT count(*) FROM achievements`;
      if (Number(achCheck[0]?.count) === 0) {
        for (const item of initialAchievements) {
          await sql`
            INSERT INTO achievements (id, title, event, level, rank, category, student_name, year, image, description)
            VALUES (${item.id}, ${item.title}, ${item.event || ''}, ${item.level || ''}, ${item.rank || ''}, ${item.category || ''}, ${item.studentName || ''}, ${item.year || ''}, ${item.image || ''}, ${item.description || ''})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed extracurriculars if empty
      const exCheck = await sql`SELECT count(*) FROM extracurriculars`;
      if (Number(exCheck[0]?.count) === 0) {
        for (const item of initialExtracurriculars) {
          await sql`
            INSERT INTO extracurriculars (id, name, category, description, schedule, instructor, image)
            VALUES (${item.id}, ${item.name}, ${item.category || ''}, ${item.description || ''}, ${item.schedule || ''}, ${item.instructor || ''}, ${item.image || ''})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed facilities if empty
      const facCheck = await sql`SELECT count(*) FROM facilities`;
      if (Number(facCheck[0]?.count) === 0) {
        for (const item of initialFacilities) {
          await sql`
            INSERT INTO facilities (id, name, category, description, image)
            VALUES (${item.id}, ${item.title}, ${item.tag || ''}, ${item.desc || ''}, ${item.image || ''})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed testimonials if empty
      const testCheck = await sql`SELECT count(*) FROM testimonials`;
      if (Number(testCheck[0]?.count) === 0) {
        for (const item of initialTestimonials) {
          await sql`
            INSERT INTO testimonials (id, name, role, graduation_year, avatar, content, rating)
            VALUES (${item.id}, ${item.name}, ${item.role || ''}, ${item.graduationYear || ''}, ${item.avatar || ''}, ${item.content || ''}, ${item.rating || 5})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Seed users if empty
      const uCheck = await sql`SELECT count(*) FROM users`;
      if (Number(uCheck[0]?.count) === 0) {
        for (const item of initialUsers) {
          await sql`
            INSERT INTO users (id, username, password, name, role, status, email)
            VALUES (${item.id}, ${item.username}, ${item.password}, ${item.name}, ${item.role}, ${item.status || 'Aktif'}, ${item.email || ''})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      // Mark seed as completed
      await sql`
        INSERT INTO system_config (key, value)
        VALUES ('db_seeded', 'true')
        ON CONFLICT (key) DO UPDATE SET value = 'true';
      `;
      console.log("Database initial seeding complete!");
    }
  } catch (e) {
    console.error("Error migrating or seeding database schema:", e);
  }
}

export async function GET() {
  try {
    await ensureDbSchema();

    const [
      schoolInfoRes,
      newsRes,
      agendasRes,
      achievementsRes,
      teachersRes,
      extracurricularsRes,
      galleryRes,
      applicantsRes,
      faqsRes,
      testimonialsRes,
      facilitiesRes,
      usersRes,
    ] = await Promise.all([
      sql`SELECT data FROM school_info WHERE id = 'default' LIMIT 1`,
      sql`SELECT * FROM news ORDER BY created_at DESC`,
      sql`SELECT * FROM agendas ORDER BY date ASC`,
      sql`SELECT * FROM achievements ORDER BY year DESC`,
      sql`SELECT * FROM teachers ORDER BY created_at ASC`,
      sql`SELECT * FROM extracurriculars ORDER BY name ASC`,
      sql`SELECT * FROM gallery ORDER BY created_at DESC`,
      sql`SELECT * FROM ppdb_applicants ORDER BY created_at DESC`,
      sql`SELECT * FROM faqs ORDER BY id ASC`,
      sql`SELECT * FROM testimonials ORDER BY created_at DESC`,
      sql`SELECT * FROM facilities ORDER BY name ASC`,
      sql`SELECT * FROM users ORDER BY created_at ASC`,
    ]);

    const formattedGallery = (galleryRes || []).map((g: any) => ({
      ...g,
      imageUrl: g.imageurl || g.imageUrl || "",
    }));

    return NextResponse.json({
      schoolInfo: schoolInfoRes[0]?.data || initialSchoolInfo,
      news: newsRes,
      agendas: agendasRes,
      achievements: achievementsRes,
      teachers: sortTeachersByPriority(
        (teachersRes || []).map((t: any) => ({
          ...t,
          position: t.position || t.role || "Guru",
          subject: t.subject || "Guru Pengampu",
          education: t.education || "S1 Pendidikan",
        }))
      ),
      extracurriculars: extracurricularsRes,
      gallery: formattedGallery,
      applicants: (applicantsRes || []).map((a: any) => ({
        ...a,
        registrationNumber: a.registration_number || a.registrationNumber,
        fullName: a.full_name || a.fullName,
        birthPlace: a.birth_place || a.birthPlace,
        birthDate: a.birth_date || a.birthDate,
        previousSchool: a.previous_school || a.previousSchool,
        parentName: a.parent_name || a.parentName,
        parentPhone: a.parent_phone || a.parentPhone,
        chosenMajor: a.chosen_major || a.chosenMajor,
        registrationDate: a.registration_date || a.registrationDate,
      })),
      faqs: faqsRes.length > 0 ? faqsRes : initialFAQs,
      testimonials: testimonialsRes,
      facilities: (facilitiesRes || []).map((f: any) => ({
        ...f,
        name: f.name || f.title,
        category: f.category || f.tag,
        description: f.description || f.desc,
      })),
      users: (usersRes || []).map((u: any) => ({ ...u, status: u.status || "Aktif" })),
    });
  } catch (error) {
    console.error("Error fetching data from Neon DB:", error);
    return NextResponse.json({
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
      error: String(error),
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { table, action, id, item } = body;

    if (!table || !action) {
      return NextResponse.json({ error: "Missing table or action" }, { status: 400 });
    }

    await ensureDbSchema();

    if (table === "school_info") {
      await sql`
        INSERT INTO school_info (id, data)
        VALUES ('default', ${JSON.stringify(item)}::jsonb)
        ON CONFLICT (id) DO UPDATE SET data = ${JSON.stringify(item)}::jsonb;
      `;
      return NextResponse.json({ success: true });
    }

    if (action === "save" && item) {
      if (table === "news") {
        await sql`
          INSERT INTO news (id, title, slug, excerpt, content, category, date, author, image, is_featured, tags)
          VALUES (${item.id}, ${item.title}, ${item.slug || item.id}, ${item.excerpt || ''}, ${item.content || ''}, ${item.category || ''}, ${item.date || ''}, ${item.author || ''}, ${item.image || ''}, ${Boolean(item.isFeatured)}, ${JSON.stringify(item.tags || [])}::jsonb)
          ON CONFLICT (id) DO UPDATE SET
            title = ${item.title},
            slug = ${item.slug || item.id},
            excerpt = ${item.excerpt || ''},
            content = ${item.content || ''},
            category = ${item.category || ''},
            date = ${item.date || ''},
            author = ${item.author || ''},
            image = ${item.image || ''},
            is_featured = ${Boolean(item.isFeatured)},
            tags = ${JSON.stringify(item.tags || [])}::jsonb;
        `;
      } else if (table === "agendas") {
        await sql`
          INSERT INTO agendas (id, title, date, time, location, description, category)
          VALUES (${item.id}, ${item.title}, ${item.date || ''}, ${item.time || ''}, ${item.location || ''}, ${item.description || ''}, ${item.category || ''})
          ON CONFLICT (id) DO UPDATE SET
            title = ${item.title},
            date = ${item.date || ''},
            time = ${item.time || ''},
            location = ${item.location || ''},
            description = ${item.description || ''},
            category = ${item.category || ''};
        `;
      } else if (table === "teachers") {
        const teacherPos = item.position || item.role || "Guru";
        const teacherEdu = item.education || "S1 Pendidikan";
        await sql`
          INSERT INTO teachers (id, name, nip, position, subject, role, education, photo, bio, email, phone, is_active)
          VALUES (
            ${item.id},
            ${item.name},
            ${item.nip || ''},
            ${teacherPos},
            ${item.subject || ''},
            ${teacherPos},
            ${teacherEdu},
            ${item.photo || ''},
            ${item.bio || ''},
            ${item.email || ''},
            ${item.phone || ''},
            ${item.isActive !== false}
          )
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name},
            nip = ${item.nip || ''},
            position = ${teacherPos},
            subject = ${item.subject || ''},
            role = ${teacherPos},
            education = ${teacherEdu},
            photo = ${item.photo || ''},
            bio = ${item.bio || ''},
            email = ${item.email || ''},
            phone = ${item.phone || ''},
            is_active = ${item.isActive !== false};
        `;
      } else if (table === "facilities") {
        await sql`
          INSERT INTO facilities (id, name, category, description, image)
          VALUES (${item.id}, ${item.name || item.title}, ${item.category || item.tag || ''}, ${item.description || item.desc || ''}, ${item.image || ''})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name || item.title},
            category = ${item.category || item.tag || ''},
            description = ${item.description || item.desc || ''},
            image = ${item.image || ''};
        `;
      } else if (table === "gallery") {
        await sql`
          INSERT INTO gallery (id, title, category, imageUrl, date, description)
          VALUES (${item.id}, ${item.title}, ${item.category || ''}, ${item.imageUrl || item.image || ''}, ${item.date || ''}, ${item.description || ''})
          ON CONFLICT (id) DO UPDATE SET
            title = ${item.title},
            category = ${item.category || ''},
            imageUrl = ${item.imageUrl || item.image || ''},
            date = ${item.date || ''},
            description = ${item.description || ''};
        `;
      } else if (table === "ppdb_applicants") {
        await sql`
          INSERT INTO ppdb_applicants (id, registration_number, full_name, nisn, gender, birth_place, birth_date, address, previous_school, parent_name, parent_phone, chosen_major, registration_date, status, notes)
          VALUES (${item.id}, ${item.registrationNumber || ''}, ${item.fullName || item.full_name}, ${item.nisn || ''}, ${item.gender || ''}, ${item.birthPlace || ''}, ${item.birthDate || ''}, ${item.address || ''}, ${item.previousSchool || ''}, ${item.parentName || ''}, ${item.parentPhone || ''}, ${item.chosenMajor || ''}, ${item.registrationDate || ''}, ${item.status || 'Pending'}, ${item.notes || ''})
          ON CONFLICT (id) DO UPDATE SET
            status = ${item.status || 'Pending'},
            notes = ${item.notes || ''};
        `;
      } else if (table === "users") {
        await sql`
          INSERT INTO users (id, username, password, name, role, status, email)
          VALUES (${item.id}, ${item.username}, ${item.password}, ${item.name}, ${item.role}, ${item.status || 'Aktif'}, ${item.email || ''})
          ON CONFLICT (id) DO UPDATE SET
            username = ${item.username},
            password = ${item.password},
            name = ${item.name},
            role = ${item.role},
            status = ${item.status || 'Aktif'},
            email = ${item.email || ''};
        `;
      } else if (table === "achievements") {
        await sql`
          INSERT INTO achievements (id, title, event, level, rank, category, student_name, year, image, description)
          VALUES (${item.id}, ${item.title}, ${item.event || ''}, ${item.level || ''}, ${item.rank || ''}, ${item.category || ''}, ${item.studentName || ''}, ${item.year || ''}, ${item.image || ''}, ${item.description || ''})
          ON CONFLICT (id) DO UPDATE SET
            title = ${item.title},
            event = ${item.event || ''},
            level = ${item.level || ''},
            rank = ${item.rank || ''},
            category = ${item.category || ''},
            student_name = ${item.studentName || ''},
            year = ${item.year || ''},
            image = ${item.image || ''},
            description = ${item.description || ''};
        `;
      } else if (table === "extracurriculars") {
        await sql`
          INSERT INTO extracurriculars (id, name, category, description, schedule, instructor, image)
          VALUES (${item.id}, ${item.name}, ${item.category || ''}, ${item.description || ''}, ${item.schedule || ''}, ${item.instructor || ''}, ${item.image || ''})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name},
            category = ${item.category || ''},
            description = ${item.description || ''},
            schedule = ${item.schedule || ''},
            instructor = ${item.instructor || ''},
            image = ${item.image || ''};
        `;
      } else if (table === "testimonials") {
        await sql`
          INSERT INTO testimonials (id, name, role, graduation_year, avatar, content, rating)
          VALUES (${item.id}, ${item.name}, ${item.role || ''}, ${item.graduationYear || ''}, ${item.avatar || ''}, ${item.content || ''}, ${item.rating || 5})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name},
            role = ${item.role || ''},
            graduation_year = ${item.graduationYear || ''},
            avatar = ${item.avatar || ''},
            content = ${item.content || ''},
            rating = ${item.rating || 5};
        `;
      }
      return NextResponse.json({ success: true });
    }

    if (action === "delete" && id) {
      if (table === "news") await sql`DELETE FROM news WHERE id = ${id}`;
      else if (table === "agendas") await sql`DELETE FROM agendas WHERE id = ${id}`;
      else if (table === "teachers") await sql`DELETE FROM teachers WHERE id = ${id}`;
      else if (table === "facilities") await sql`DELETE FROM facilities WHERE id = ${id}`;
      else if (table === "gallery") await sql`DELETE FROM gallery WHERE id = ${id}`;
      else if (table === "ppdb_applicants") await sql`DELETE FROM ppdb_applicants WHERE id = ${id}`;
      else if (table === "achievements") await sql`DELETE FROM achievements WHERE id = ${id}`;
      else if (table === "extracurriculars") await sql`DELETE FROM extracurriculars WHERE id = ${id}`;
      else if (table === "testimonials") await sql`DELETE FROM testimonials WHERE id = ${id}`;
      else if (table === "users") await sql`DELETE FROM users WHERE id = ${id}`;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action or missing parameters" }, { status: 400 });
  } catch (error) {
    console.error("Error updating Neon DB:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

