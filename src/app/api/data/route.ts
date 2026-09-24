import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
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
import { initialKesiswaanActivities } from "@/lib/kesiswaan-data";

export async function GET() {
  try {
    // Ultra-fast single-query bundle execution directly inside Neon PostgreSQL
    const result = await sql`
      SELECT json_build_object(
        'schoolInfo', (SELECT data FROM school_info WHERE id = 'default' LIMIT 1),
        'news', COALESCE((SELECT json_agg(n.*) FROM (SELECT * FROM news ORDER BY created_at DESC) n), '[]'::json),
        'agendas', COALESCE((SELECT json_agg(a.*) FROM (SELECT * FROM agendas ORDER BY date ASC) a), '[]'::json),
        'achievements', COALESCE((SELECT json_agg(ach.*) FROM (SELECT * FROM achievements ORDER BY year DESC) ach), '[]'::json),
        'teachers', COALESCE((SELECT json_agg(t.*) FROM (SELECT * FROM teachers ORDER BY created_at ASC) t), '[]'::json),
        'extracurriculars', COALESCE((SELECT json_agg(e.*) FROM (SELECT * FROM extracurriculars ORDER BY name ASC) e), '[]'::json),
        'gallery', COALESCE((SELECT json_agg(g.*) FROM (SELECT * FROM gallery ORDER BY created_at DESC) g), '[]'::json),
        'applicants', COALESCE((SELECT json_agg(app.*) FROM (SELECT * FROM ppdb_applicants ORDER BY created_at DESC) app), '[]'::json),
        'faqs', COALESCE((SELECT json_agg(f.*) FROM (SELECT * FROM faqs ORDER BY id ASC) f), '[]'::json),
        'testimonials', COALESCE((SELECT json_agg(tm.*) FROM (SELECT * FROM testimonials ORDER BY created_at DESC) tm), '[]'::json),
        'facilities', COALESCE((SELECT json_agg(fac.*) FROM (SELECT * FROM facilities ORDER BY name ASC) fac), '[]'::json),
        'users', COALESCE((SELECT json_agg(u.*) FROM (SELECT * FROM users ORDER BY created_at ASC) u), '[]'::json),
        'kesiswaan', COALESCE((SELECT json_agg(k.*) FROM (SELECT * FROM kesiswaan_activities ORDER BY created_at ASC) k), '[]'::json)
      ) as bundle;
    `;

    const bundle = result[0]?.bundle || {};

    const formattedGallery = (bundle.gallery || []).map((g: any) => ({
      id: g.id,
      title: g.title,
      category: g.category || "Kegiatan",
      imageUrl: g.imageurl || g.imageUrl || "",
      date: g.date || "",
      description: g.description || "",
    }));

    return NextResponse.json({
      schoolInfo: bundle.schoolInfo || initialSchoolInfo,
      news: (bundle.news || []).map((n: any) => ({
        id: n.id,
        title: n.title,
        slug: n.slug || n.id,
        excerpt: n.excerpt || "",
        content: n.content || "",
        category: n.category || "Berita",
        date: n.date || "",
        author: n.author || "Admin SMA Al-Furqon",
        image: n.image || "/bg-al-furqon2.jpg",
        isFeatured: Boolean(n.is_featured ?? n.isFeatured),
        tags: Array.isArray(n.tags) ? n.tags : typeof n.tags === "string" ? JSON.parse(n.tags || "[]") : [],
        youtubeUrl: n.youtube_url || n.youtubeUrl || "",
      })),
      agendas: (bundle.agendas || []).map((a: any) => ({
        id: a.id,
        title: a.title,
        date: a.date,
        time: a.time,
        location: a.location,
        description: a.description,
        category: a.category,
      })),
      achievements: (bundle.achievements || []).map((ach: any) => ({
        id: ach.id,
        title: ach.title,
        event: ach.event || "",
        level: ach.level || "Nasional",
        rank: ach.rank || "Juara 1",
        category: ach.category || "Akademik",
        studentName: ach.student_name || ach.studentName || "",
        year: ach.year || "2026",
        image: ach.image || "",
        description: ach.description || "",
      })),
      teachers: sortTeachersByPriority(
        (bundle.teachers || []).map((t: any) => ({
          id: t.id,
          name: t.name,
          nip: t.nip || "",
          position: t.position || t.role || "Guru",
          subject: t.subject || "Guru Pengampu",
          role: t.position || t.role || "Guru",
          education: t.education || "S1 Pendidikan",
          photo: t.photo || "",
          bio: t.bio || "",
          email: t.email || "",
          phone: t.phone || "",
          isActive: t.is_active !== false,
        }))
      ),
      extracurriculars: (bundle.extracurriculars || []).map((e: any) => ({
        id: e.id,
        name: e.name,
        category: e.category || "Olahraga",
        description: e.description || "",
        schedule: e.schedule || "",
        instructor: e.instructor || e.mentor || "",
        image: e.image || "",
        icon: e.icon || "Sparkles",
        achievements: Array.isArray(e.achievements) ? e.achievements : [],
      })),
      gallery: formattedGallery,
      applicants: (bundle.applicants || []).map((a: any) => ({
        id: a.id,
        registrationNumber: a.registration_number || a.registrationNumber || "",
        fullName: a.full_name || a.fullName || "",
        nisn: a.nisn || "",
        gender: a.gender || "",
        birthPlace: a.birth_place || a.birthPlace || "",
        birthDate: a.birth_date || a.birthDate || "",
        address: a.address || "",
        previousSchool: a.previous_school || a.previousSchool || "",
        parentName: a.parent_name || a.parentName || "",
        parentPhone: a.parent_phone || a.parentPhone || "",
        chosenMajor: a.chosen_major || a.chosenMajor || "",
        registrationDate: a.registration_date || a.registrationDate || "",
        status: a.status || "Menunggu Verifikasi",
        notes: a.notes || "",
      })),
      faqs: bundle.faqs && bundle.faqs.length > 0 ? bundle.faqs : initialFAQs,
      testimonials: (bundle.testimonials || []).map((tm: any) => ({
        id: tm.id,
        name: tm.name,
        role: tm.role || "",
        graduationYear: tm.graduation_year || tm.graduationYear || "",
        avatar: tm.avatar || "",
        content: tm.content || "",
        rating: tm.rating || 5,
      })),
      facilities: (bundle.facilities || []).map((f: any) => ({
        id: f.id,
        name: f.name || f.title,
        title: f.name || f.title,
        category: f.category || f.tag,
        tag: f.category || f.tag,
        description: f.description || f.desc,
        desc: f.description || f.desc,
        image: f.image || "",
      })),
      users: (bundle.users || []).map((u: any) => ({
        id: u.id,
        username: u.username,
        password: u.password,
        name: u.name,
        role: u.role,
        status: u.status || "Aktif",
        email: u.email || "",
      })),
      kesiswaanActivities:
        bundle.kesiswaan && bundle.kesiswaan.length > 0
          ? bundle.kesiswaan.map((k: any) => ({
              id: k.id,
              slug: k.slug,
              ...(typeof k.data === "object" ? k.data : JSON.parse(k.data || "{}")),
            }))
          : initialKesiswaanActivities,
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
          INSERT INTO news (id, title, slug, excerpt, content, category, date, author, image, is_featured, tags, youtube_url)
          VALUES (${item.id}, ${item.title}, ${item.slug || item.id}, ${item.excerpt || ''}, ${item.content || ''}, ${item.category || ''}, ${item.date || ''}, ${item.author || ''}, ${item.image || ''}, ${Boolean(item.isFeatured)}, ${JSON.stringify(item.tags || [])}::jsonb, ${item.youtubeUrl || ''})
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
            tags = ${JSON.stringify(item.tags || [])}::jsonb,
            youtube_url = ${item.youtubeUrl || ''};
        `;
      } else if (table === "kesiswaan_activities") {
        await sql`
          INSERT INTO kesiswaan_activities (id, slug, data)
          VALUES (${item.id}, ${item.slug || item.id}, ${JSON.stringify(item)}::jsonb)
          ON CONFLICT (id) DO UPDATE SET
            slug = ${item.slug || item.id},
            data = ${JSON.stringify(item)}::jsonb;
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
          VALUES (${item.id}, ${item.name || item.title || ''}, ${item.category || item.tag || ''}, ${item.description || item.desc || ''}, ${item.image || ''})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name || item.title || ''},
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
          VALUES (
            ${item.id},
            ${item.registrationNumber || ''},
            ${item.fullName || item.full_name || ''},
            ${item.nisn || ''},
            ${item.gender || ''},
            ${item.birthPlace || item.birth_place || ''},
            ${item.birthDate || item.birth_date || ''},
            ${item.address || ''},
            ${item.previousSchool || item.previous_school || ''},
            ${item.parentName || item.parent_name || ''},
            ${item.parentPhone || item.parent_phone || ''},
            ${item.chosenMajor || item.chosen_major || ''},
            ${item.registrationDate || item.registration_date || ''},
            ${item.status || 'Menunggu Verifikasi'},
            ${item.notes || ''}
          )
          ON CONFLICT (id) DO UPDATE SET
            status = ${item.status || 'Menunggu Verifikasi'},
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
          VALUES (${item.id}, ${item.title}, ${item.event || ''}, ${item.level || ''}, ${item.rank || ''}, ${item.category || ''}, ${item.studentName || item.student_name || ''}, ${item.year || ''}, ${item.image || ''}, ${item.description || ''})
          ON CONFLICT (id) DO UPDATE SET
            title = ${item.title},
            event = ${item.event || ''},
            level = ${item.level || ''},
            rank = ${item.rank || ''},
            category = ${item.category || ''},
            student_name = ${item.studentName || item.student_name || ''},
            year = ${item.year || ''},
            image = ${item.image || ''},
            description = ${item.description || ''};
        `;
      } else if (table === "extracurriculars") {
        const mentorVal = item.instructor || item.mentor || "";
        await sql`
          INSERT INTO extracurriculars (id, name, category, description, schedule, instructor, mentor, image)
          VALUES (${item.id}, ${item.name}, ${item.category || ''}, ${item.description || ''}, ${item.schedule || ''}, ${mentorVal}, ${mentorVal}, ${item.image || ''})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name},
            category = ${item.category || ''},
            description = ${item.description || ''},
            schedule = ${item.schedule || ''},
            instructor = ${mentorVal},
            mentor = ${mentorVal},
            image = ${item.image || ''};
        `;
      } else if (table === "testimonials") {
        await sql`
          INSERT INTO testimonials (id, name, role, graduation_year, avatar, content, rating)
          VALUES (${item.id}, ${item.name}, ${item.role || ''}, ${item.graduationYear || item.graduation_year || ''}, ${item.avatar || ''}, ${item.content || ''}, ${item.rating || 5})
          ON CONFLICT (id) DO UPDATE SET
            name = ${item.name},
            role = ${item.role || ''},
            graduation_year = ${item.graduationYear || item.graduation_year || ''},
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
      else if (table === "kesiswaan_activities") await sql`DELETE FROM kesiswaan_activities WHERE id = ${id}`;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action or missing parameters" }, { status: 400 });
  } catch (error) {
    console.error("Error updating Neon DB:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
