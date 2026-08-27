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
} from "@/lib/data-store";

export async function GET() {
  try {
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

    return NextResponse.json({
      schoolInfo: schoolInfoRes[0]?.data || initialSchoolInfo,
      news: newsRes.length > 0 ? newsRes : initialNews,
      agendas: agendasRes.length > 0 ? agendasRes : initialAgenda,
      achievements: achievementsRes.length > 0 ? achievementsRes : initialAchievements,
      teachers: teachersRes.length > 0 ? teachersRes : initialTeachers,
      extracurriculars: extracurricularsRes.length > 0 ? extracurricularsRes : initialExtracurriculars,
      gallery: galleryRes.length > 0 ? galleryRes : initialGallery,
      applicants: applicantsRes.length > 0 ? applicantsRes : initialApplicants,
      faqs: faqsRes.length > 0 ? faqsRes : initialFAQs,
      testimonials: testimonialsRes.length > 0 ? testimonialsRes : initialTestimonials,
      facilities: facilitiesRes.length > 0 ? facilitiesRes : initialFacilities,
      users: usersRes.length > 0 ? usersRes.map((u: any) => ({ ...u, status: u.status || "Aktif" })) : initialUsers,
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
        await sql`
          INSERT INTO teachers (id, name, nip, subject, role, photo, bio, email, phone, is_active)
          VALUES (${item.id}, ${item.name}, ${item.nip || ''}, ${item.subject || ''}, ${item.role || ''}, ${item.photo || ''}, ${item.bio || ''}, ${item.email || ''}, ${item.phone || ''}, ${item.isActive !== false})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name},
            nip = ${item.nip || ''},
            subject = ${item.subject || ''},
            role = ${item.role || ''},
            photo = ${item.photo || ''},
            bio = ${item.bio || ''},
            email = ${item.email || ''},
            phone = ${item.phone || ''},
            is_active = ${item.isActive !== false};
        `;
      } else if (table === "facilities") {
        await sql`
          INSERT INTO facilities (id, name, category, description, image)
          VALUES (${item.id}, ${item.name}, ${item.category || ''}, ${item.description || ''}, ${item.image || ''})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name},
            category = ${item.category || ''},
            description = ${item.description || ''},
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
      else if (table === "users") await sql`DELETE FROM users WHERE id = ${id}`;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action or missing parameters" }, { status: 400 });
  } catch (error) {
    console.error("Error updating Neon DB:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
