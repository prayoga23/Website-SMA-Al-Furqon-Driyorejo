import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { query } from "@/lib/db";
import { getServerDataBundle, invalidateServerDataCache } from "@/lib/server-data";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
  "Pragma": "no-cache",
  "Expires": "0",
  "CDN-Cache-Control": "no-store",
  "Surrogate-Control": "no-store",
};

export async function GET() {
  try {
    const bundle = await getServerDataBundle();
    return NextResponse.json(bundle, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    console.error("Error in GET /api/data:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { table, action, id, item } = body;

    if (!table || !action) {
      return NextResponse.json(
        { error: "Missing table or action" },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    if (table === "school_info") {
      await query(
        `INSERT INTO school_info (id, data, updated_at)
         VALUES ('default', ?, NOW())
         ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = NOW()`,
        [JSON.stringify(item)]
      );
      invalidateServerDataCache();
      try { revalidatePath("/", "layout"); } catch { }
      return NextResponse.json({ success: true }, { headers: NO_CACHE_HEADERS });
    }

    if (action === "save" && item) {
      if (table === "news") {
        await query(
          `INSERT INTO news (id, title, slug, excerpt, content, category, date, author, image, is_featured, tags, youtube_url, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             slug = VALUES(slug),
             excerpt = VALUES(excerpt),
             content = VALUES(content),
             category = VALUES(category),
             date = VALUES(date),
             author = VALUES(author),
             image = VALUES(image),
             is_featured = VALUES(is_featured),
             tags = VALUES(tags),
             youtube_url = VALUES(youtube_url),
             status = VALUES(status)`,
          [
            item.id,
            item.title,
            item.slug || item.id,
            item.excerpt || "",
            item.content || "",
            item.category || "",
            item.date || "",
            item.author || "",
            item.image || "",
            item.isFeatured ? 1 : 0,
            JSON.stringify(item.tags || []),
            item.youtubeUrl || "",
            item.status || "published",
          ]
        );
      } else if (table === "kesiswaan_activities") {
        await query(
          `INSERT INTO kesiswaan_activities (id, slug, data)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE
             slug = VALUES(slug),
             data = VALUES(data)`,
          [item.id, item.slug || item.id, JSON.stringify(item)]
        );
      } else if (table === "agendas") {
        await query(
          `INSERT INTO agendas (id, title, date, time, location, description, category)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             date = VALUES(date),
             time = VALUES(time),
             location = VALUES(location),
             description = VALUES(description),
             category = VALUES(category)`,
          [
            item.id,
            item.title,
            item.date || "",
            item.time || "",
            item.location || "",
            item.description || "",
            item.category || "",
          ]
        );
      } else if (table === "teachers") {
        const teacherPos = item.position || item.role || "Guru";
        const teacherEdu = item.education || "S1 Pendidikan";
        await query(
          `INSERT INTO teachers (id, name, nip, position, subject, role, education, photo, bio, email, phone, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             name = VALUES(name),
             nip = VALUES(nip),
             position = VALUES(position),
             subject = VALUES(subject),
             role = VALUES(role),
             education = VALUES(education),
             photo = VALUES(photo),
             bio = VALUES(bio),
             email = VALUES(email),
             phone = VALUES(phone),
             is_active = VALUES(is_active)`,
          [
            item.id,
            item.name,
            item.nip || "",
            teacherPos,
            item.subject || "",
            teacherPos,
            teacherEdu,
            item.photo || "",
            item.bio || "",
            item.email || "",
            item.phone || "",
            item.isActive !== false ? 1 : 0,
          ]
        );
      } else if (table === "facilities") {
        await query(
          `INSERT INTO facilities (id, name, category, description, image)
           VALUES (?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             name = VALUES(name),
             category = VALUES(category),
             description = VALUES(description),
             image = VALUES(image)`,
          [
            item.id,
            item.name || item.title || "",
            item.category || item.tag || "",
            item.description || item.desc || "",
            item.image || "",
          ]
        );
      } else if (table === "gallery") {
        await query(
          `INSERT INTO gallery (id, title, category, imageurl, date, description)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             category = VALUES(category),
             imageurl = VALUES(imageurl),
             date = VALUES(date),
             description = VALUES(description)`,
          [
            item.id,
            item.title,
            item.category || "",
            item.imageUrl || item.image || "",
            item.date || "",
            item.description || "",
          ]
        );
      } else if (table === "PSB_applicants" || table === "psb_applicants" || table === "ppdb_applicants") {
        await query(
          `INSERT INTO psb_applicants (
             id, registration_number, full_name, nisn, gender, birth_place, birth_date,
             address, previous_school, parent_name, parent_phone, chosen_major,
             registration_date, status, notes, data
           )
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             registration_number = VALUES(registration_number),
             full_name = VALUES(full_name),
             nisn = VALUES(nisn),
             gender = VALUES(gender),
             birth_place = VALUES(birth_place),
             birth_date = VALUES(birth_date),
             address = VALUES(address),
             previous_school = VALUES(previous_school),
             parent_name = VALUES(parent_name),
             parent_phone = VALUES(parent_phone),
             chosen_major = VALUES(chosen_major),
             registration_date = VALUES(registration_date),
             status = VALUES(status),
             notes = VALUES(notes),
             data = VALUES(data)`,
          [
            item.id,
            item.registrationNumber || "",
            item.fullName || item.full_name || "",
            item.nisn || "",
            item.gender || "",
            item.birthPlace || item.birth_place || "",
            item.birthDate || item.birth_date || "",
            item.address || "",
            item.originSchool || item.previousSchool || item.previous_school || "",
            item.parentName || item.fatherName || item.parent_name || "",
            item.parentPhone || item.fatherPhone || item.phoneWhatsapp || item.parent_phone || "",
            item.chosenMajor || item.selectedMajor || item.chosen_major || "",
            item.registrationDate || item.registration_date || "",
            item.status || "Menunggu Verifikasi",
            item.notes || "",
            JSON.stringify(item),
          ]
        );
      } else if (table === "users") {
        await query(
          `INSERT INTO users (id, username, password, name, role, status, email)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             username = VALUES(username),
             password = VALUES(password),
             name = VALUES(name),
             role = VALUES(role),
             status = VALUES(status),
             email = VALUES(email)`,
          [
            item.id,
            item.username,
            item.password,
            item.name,
            item.role,
            item.status || "Aktif",
            item.email || "",
          ]
        );
      } else if (table === "achievements") {
        await query(
          `INSERT INTO achievements (id, title, event, level, rank, category, student_name, year, image, description)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             event = VALUES(event),
             level = VALUES(level),
             rank = VALUES(rank),
             category = VALUES(category),
             student_name = VALUES(student_name),
             year = VALUES(year),
             image = VALUES(image),
             description = VALUES(description)`,
          [
            item.id,
            item.title,
            item.event || "",
            item.level || "",
            item.rank || "",
            item.category || "",
            item.studentName || item.student_name || "",
            item.year || "",
            item.image || "",
            item.description || "",
          ]
        );
      } else if (table === "extracurriculars") {
        const mentorVal = item.instructor || item.mentor || "";
        const iconVal = item.icon || "Sparkles";
        const iconImageVal = item.iconImage || item.icon_image || null;
        const achievementsVal = JSON.stringify(item.achievements || []);

        await query(
          `INSERT INTO extracurriculars (id, name, category, description, schedule, instructor, mentor, icon, icon_image, achievements, image)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             name = VALUES(name),
             category = VALUES(category),
             description = VALUES(description),
             schedule = VALUES(schedule),
             instructor = VALUES(instructor),
             mentor = VALUES(mentor),
             icon = VALUES(icon),
             icon_image = VALUES(icon_image),
             achievements = VALUES(achievements),
             image = VALUES(image)`,
          [
            item.id,
            item.name,
            item.category || "",
            item.description || "",
            item.schedule || "",
            mentorVal,
            mentorVal,
            iconVal,
            iconImageVal,
            achievementsVal,
            "",
          ]
        );
      } else if (table === "testimonials") {
        await query(
          `INSERT INTO testimonials (id, name, role, graduation_year, avatar, content, rating)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             name = VALUES(name),
             role = VALUES(role),
             graduation_year = VALUES(graduation_year),
             avatar = VALUES(avatar),
             content = VALUES(content),
             rating = VALUES(rating)`,
          [
            item.id,
            item.name,
            item.role || "",
            item.graduationYear || item.graduation_year || "",
            item.avatar || "",
            item.content || "",
            item.rating || 5,
          ]
        );
      } else if (table === "faqs") {
        await query(
          `INSERT INTO faqs (id, question, answer, category)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             question = VALUES(question),
             answer = VALUES(answer),
             category = VALUES(category)`,
          [item.id, item.question, item.answer, item.category || "Umum"]
        );
      }

      invalidateServerDataCache();
      try { revalidatePath("/", "layout"); } catch { }
      return NextResponse.json({ success: true }, { headers: NO_CACHE_HEADERS });
    }

    if (action === "delete" && id) {
      const tableMap: Record<string, string> = {
        news: "news",
        agendas: "agendas",
        teachers: "teachers",
        facilities: "facilities",
        gallery: "gallery",
        PSB_applicants: "psb_applicants",
        psb_applicants: "psb_applicants",
        ppdb_applicants: "psb_applicants",
        achievements: "achievements",
        extracurriculars: "extracurriculars",
        testimonials: "testimonials",
        users: "users",
        kesiswaan_activities: "kesiswaan_activities",
        faqs: "faqs",
      };

      const targetTable = tableMap[table];
      if (targetTable) {
        await query(`DELETE FROM ${targetTable} WHERE id = ?`, [id]);
      }

      invalidateServerDataCache();
      try { revalidatePath("/", "layout"); } catch { }
      return NextResponse.json({ success: true }, { headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json(
      { error: "Invalid action or missing parameters" },
      { status: 400, headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("Error updating MySQL DB:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
