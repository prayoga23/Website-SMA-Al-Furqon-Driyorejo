export interface SchoolInfo {
  name: string;
  tagline: string;
  npsn: string;
  accreditation: string;
  foundation: string;
  address: string;
  subdistrict: string;
  district: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  vision: string;
  missions: string[];
  goals: string[];
  headmasterName: string;
  headmasterPhoto: string;
  headmasterWelcome: string;
  stats: {
    students: number;
    teachers: number;
    classes: number;
    achievementsCount: number;
    alumniCount: number;
    establishedYear: number;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "Berita" | "Agenda" | "Kegiatan" | "Prestasi" | "Sambutan";
  date: string;
  author: string;
  image: string;
  isFeatured?: boolean;
  tags?: string[];
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "Akademik" | "Kesiswaan" | "Keagamaan" | "Umum";
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  level: "Kabupaten" | "Provinsi" | "Nasional" | "Internasional";
  rank: "Juara 1" | "Juara 2" | "Juara 3" | "Harapan 1" | "Medali Emas" | "Medali Perak";
  category: "Akademik" | "Non-Akademik" | "Keagamaan" | "Olahraga" | "Seni";
  studentName: string;
  year: string;
  image: string;
  description: string;
}

export interface TeacherItem {
  id: string;
  name: string;
  nip?: string;
  position: string;
  subject: string;
  photo: string;
  education: string;
  bio?: string;
}

export interface ExtracurricularItem {
  id: string;
  name: string;
  category: "Keagamaan" | "Olahraga" | "Seni & Budaya" | "Sains & Teknologi" | "Kepemimpinan";
  description: string;
  schedule: string;
  instructor: string;
  image: string;
  achievements?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Kegiatan" | "Pembelajaran" | "Prestasi" | "Ekstrakurikuler" | "Lingkungan Sekolah" | "Keagamaan";
  imageUrl: string;
  date: string;
  description: string;
}

export interface PPDBApplicant {
  id: string;
  registrationNumber: string;
  registrationDate: string;
  status: "Menunggu Verifikasi" | "Terverifikasi" | "Diterima" | "Ditolak";

  // Step 1 — Identitas Calon Santri
  fullName: string;
  birthPlace: string;
  birthDate: string;
  gender: "Laki-laki" | "Perempuan";
  siblingsCount: string;
  childNumber: string;
  address: string;
  nik: string;
  nisn: string;

  // Step 2 — Data Sekolah Asal
  schoolLevel: "SMP / MTs" | "Paket B" | "Lainnya";
  customSchoolLevel?: string;
  originSchool: string;
  npsnSchool: string;
  originSchoolAddress: string;
  graduationYear: string;

  // Step 3 — Identitas Orang Tua
  // Data Bapak
  fatherName: string;
  fatherAddress: string;
  fatherEducation: string;
  fatherOccupation: string;
  customFatherOccupation?: string;
  fatherPhone: string;

  // Data Ibu
  motherName: string;
  motherAddress: string;
  motherEducation: string;
  motherOccupation: string;
  customMotherOccupation?: string;
  motherPhone: string;

  // Step 4 — Identitas Wali
  hasGuardian: "Tidak" | "Ya";
  guardianName?: string;
  guardianAddress?: string;
  guardianRelation?: string;
  customGuardianRelation?: string;
  guardianPhone?: string;

  // Compatibility / Summary fields
  parentName?: string;
  phoneWhatsapp?: string;
  selectedMajor?: "MIPA / IPA" | "IPS" | "Kurikulum Merdeka Unggulan";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "PPDB" | "Kurikulum" | "Kehidupan Santri" | "Fasilitas" | "Umum";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: "Siswa" | "Alumni" | "Orang Tua Wali";
  graduationYear?: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FacilityItem {
  id: string;
  title: string;
  desc: string;
  iconName?: string;
  tag: string;
  image: string;
  standard?: string;
}

