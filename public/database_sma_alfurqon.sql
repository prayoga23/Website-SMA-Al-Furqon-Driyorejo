-- ========================================================
-- phpMyAdmin SQL Dump
-- Database: `website_alfurqon`
-- Sekolah: SMA AL-FURQON DRIYOREJO
-- Dibuat otomatis untuk impor langsung ke phpMyAdmin / MySQL
-- ========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 1. Database Creation
--
CREATE DATABASE IF NOT EXISTS `website_alfurqon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `website_alfurqon`;

-- --------------------------------------------------------
-- Table structure for table `school_info`
--
DROP TABLE IF EXISTS `school_info`;
CREATE TABLE `school_info` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY DEFAULT 'default',
  `data` JSON NOT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `school_info` (`id`, `data`, `updated_at`) VALUES
('default', '{\"name\":\"SMA AL-FURQON DRIYOREJO\",\"tagline\":\"Dzikir - Fikir - Ikhtiar - Tawakal\",\"npsn\":\"20500660\",\"accreditation\":\"A (Unggul)\",\"foundation\":\"Pondok Pesantren Al-Furqon (Diasuh KH. Mashuri Abdurrohim)\",\"address\":\"Jl. KH. Abdurrohim No.01, Wedoroanom RT.12 RW.04\",\"subdistrict\":\"Driyorejo\",\"district\":\"Kabupaten Gresik\",\"postalCode\":\"61177\",\"phone\":\"+62 856-4928-8085\",\"whatsapp\":\"6281615184579\",\"email\":\"sma.alfurqon.driyorejo1@gmail.com\",\"website\":\"https://smaalfurqondriyorejo.sch.id\",\"vision\":\"Terbentuknya insan yang ahli dzikir, fikir, ikhtiar dan tawakal\",\"missions\":[\"Menyelenggarakan pendidikan yang berorientasi pada karakter moral yang islami\",\"Menyelenggarakan pendidikan yang berorientasi pada karakter kinerja yang kerja keras, ulet, tangguh, tak mudah menyerah, dan tuntas.\",\"Mengoptimalkan peran serta pemangku kepentingan untuk mendukung transformasi dan reformasi pengelolaan pendidikan dan kebudayaan\",\"Membentuk manusia yang kritis, kreatif, komunikatif, dan kolaboratif.\",\"Membentuk manusia yang mempunyai minat baca tinggi wawasan budaya teknologi dan keuangan.\",\"Membentuk peserta didik yang berbudi luhur, hormat, dan santun kepada orang tua, guru dan cinta tanah air.\"],\"goals\":[\"Mencetak lulusan berkarakter Islami unggul yang menghafal minimal 3 Juz Al-Qur\'an dan tartil bacaan.\",\"Meningkatkan persentase kelulusan peserta didik masuk Perguruan Tinggi Negeri (PTN) dan kedinasan unggulan.\",\"Meraih prestasi dalam olimpiade sains, olahraga, seni, dan keagamaan tingkat kabupaten, provinsi, hingga nasional.\",\"Mewujudkan ekosistem pendidikan berwawasan teknologi digital yang aman, nyaman, dan peduli lingkungan sosial.\"],\"headmasterName\":\"Dr. Suryanto, S.Pd., M.Pd.\",\"headmasterPhoto\":\"/Pak Sur.jpeg\",\"headmasterWelcome\":\"Assalamu\'alaikum Warahmatullahi Wabarakatuh. Puji syukur kepada Allah SWT, Tuhan Yang Maha Esa yang telah memberikan rahmat dan anugerah-Nya. SMA AL-FURQON merupakan salah satu unit pendidikan dengan penyelenggara Pondok Pesantren AL-FURQON. Kami berharap masyarakat bisa mengakses website ini sebagai sarana informasi dan komunikasi terutama yang berhubungan dengan pendidikan, ilmu pengetahuan dan informasi seputar SMA AL-FURQON Driyorejo.\",\"stats\":{\"students\":480,\"teachers\":21,\"classes\":15,\"achievementsCount\":124,\"alumniCount\":1850,\"establishedYear\":1995}}', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Aktif',
  `email` VARCHAR(255) DEFAULT NULL,
  `avatar` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `username`, `password`, `name`, `role`, `status`, `email`, `created_at`) VALUES
('user-admin', 'admin', 'admin123', 'Administrator Sekolah', 'Admin', 'Aktif', 'admin@smaalfurqondriyorejo.sch.id', CURRENT_TIMESTAMP),
('user-1790261921861', 'dian', 'dian123', 'Dian purwanti', 'Editor Berita', 'Aktif', 'dianpurwanti@gmail.com', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `news`
--
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `excerpt` TEXT DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `date` VARCHAR(50) DEFAULT NULL,
  `author` VARCHAR(100) DEFAULT NULL,
  `image` LONGTEXT DEFAULT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `tags` JSON DEFAULT NULL,
  `youtube_url` TEXT DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'published',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `news` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `date`, `author`, `image`, `is_featured`, `tags`, `youtube_url`, `status`, `created_at`) VALUES
('news-1', 'Munaqosyah Tahfidz Al-Qur\'an Metode UMMI Angkatan 2026 Berjalan Khidmat', 'munaqosyah-tahfidz-metode-ummi-2026', 'Sebanyak puluhan santri SMA Al-Furqon Driyorejo mengikuti uji publik dan munaqosyah tahfidz Al-Qur\'an metode UMMI dengan predikat membanggakan.', 'Alhamdulillah, SMA Al-Furqon Driyorejo sukses menggelar agenda tahunan Munaqosyah dan Imtihan Terbuka Tahfidz Al-Qur\'an Metode UMMI. Kegiatan ini diikuti oleh para santri yang telah menyelesaikan target hafalan minimal 3 juz (Juz 30, 29, dan 1) dengan tartil dan tajwid yang terstandarisasi langsung oleh penguji Ummi Foundation Surabaya.\n\nKepala Sekolah SMA Al-Furqon menyampaikan apresiasi setinggi-tingginya kepada para santri dan pembina atas dedikasi dan ikhtiar yang tiada henti dalam menjaga kalam Ilahi.', 'Kegiatan', '12 Oktober 2026', 'Humas SMA Al-Furqon', '/bg-al-furqon3.jpg', 1, '[\"Tahfidz\",\"MetodeUMMI\",\"AlQuran\",\"SMAAlFurqon\"]', 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', 'published', CURRENT_TIMESTAMP),
('news-2', 'Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 Resmi Dibuka', 'penerimaan-santri-baru-psb-2026-2027-resmi-dibuka', 'SMA Al-Furqon Driyorejo membuka pendaftaran santri baru untuk tahun ajaran 2026/2027 dengan berbagai jalur beasiswa unggulan.', 'Kabar gembira bagi calon peserta didik dan santri di seluruh Indonesia. SMA Al-Furqon Driyorejo Gresik secara resmi membuka pendaftaran santri baru (PSB) untuk Tahun Ajaran 2026/2027.\n\nKami menawarkan program unggulan Kurikulum Merdeka yang dipadukan dengan kepesantrenan Ahlussunnah wal Jama\'ah, program Tahfidz UMMI, serta pembinaan minat bakat melalui berbagai ekstrakurikuler modern.', 'Berita', '10 Oktober 2026', 'Panitia PSB Al-Furqon', '/bg-al-furqon.jpg', 1, '[\"PSB2026\",\"SantriBaru\",\"Pendaftaran\",\"Beasiswa\"]', '', 'published', CURRENT_TIMESTAMP),
('news-3', 'Kader Adiwiyata SMA Al-Furqon Panen Sayur Hidroponik dan Produksi Eco-Enzyme', 'kader-adiwiyata-panen-hidroponik-eco-enzyme', 'Inovasi peduli lingkungan terus digalakkan para santri melalui kebun hijau hidroponik dan pengolahan limbah organik sekolah.', 'Gerakan Sekolah Hijau dan Zero Waste di SMA Al-Furqon kembali menorehkan prestasi nyata. Kader Adiwiyata sekolah berhasil memanen puluhan kilogram sayuran segar dari instalasi kebun hidroponik serta memproduksi cairan pembersih ramah lingkungan Eco-Enzyme hasil fermentasi limbah kulit buah kantin sekolah.', 'Kegiatan', '05 Oktober 2026', 'Tim Adiwiyata', '/bg-al-furqon4.jpg', 0, '[\"Adiwiyata\",\"ZeroWaste\",\"Hidroponik\",\"SekolahHijau\"]', '', 'published', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `kesiswaan_activities`
--
DROP TABLE IF EXISTS `kesiswaan_activities`;
CREATE TABLE `kesiswaan_activities` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(100) UNIQUE DEFAULT NULL,
  `data` JSON NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `kesiswaan_activities` (`id`, `slug`, `data`, `created_at`) VALUES
('osis-pramuka', 'osis-pramuka', '{\"id\":\"osis-pramuka\",\"slug\":\"osis-pramuka\",\"category\":\"Kepemimpinan\",\"categoryBadgeBg\":\"bg-amber-400 text-slate-950\",\"title\":\"Organisasi OSIS & Pramuka Ambalan\",\"buttonText\":\"Lihat Kegiatan OSIS\",\"image\":\"/bg-al-furqon2.jpg\",\"tagline\":\"Melatih Kemandirian, Jiwa Kepemimpinan, & Manajerial Islami\",\"author\":\"Tim Pembina Kesiswaan & OSIS\",\"shortDesc\":\"Melatih kemandirian, manajerial kegiatan, kepekaan sosial, serta kepemimpinan kepramukaan berbasis karakter Islami.\",\"fullDesc\":\"Organisasi Siswa Intra Sekolah (OSIS) dan Pramuka Ambalan SMA Al-Furqon Driyorejo merupakan wadah utama pembentukan karakter kepemimpinan, kedisiplinan, dan manajerial siswa berbasis akhlakul karimah.\",\"content\":\"Organisasi Siswa Intra Sekolah (OSIS) dan Ambalan Penegak Pramuka SMA Al-Furqon Driyorejo merupakan pilar utama pembentukan karakter kepemimpinan dan manajerial santri di lingkungan sekolah. Melalui wadah ini, siswa dilatih secara langsung untuk menjadi pribadi yang mandiri, disiplin, berwawasan luas, dan memiliki rasa kepedulian sosial yang tinggi berbasis akhlakul karimah.\\n\\n### 1. Pembentukan Jiwa Kepemimpinan Islami (Leadership Skill)\\nSetiap pengurus OSIS dan Ambalan Pramuka diajarkan dasar-dasar kepemimpinan (Leadership Training) yang berlandaskan teladan Rasulullah SAW.\\n\\n### 2. Manajemen Event & Program Kerja Mandiri\\nPengurus OSIS diberikan amanah untuk menyusun, mengelola, dan merealisasikan program kerja tahunan sekolah, di antaranya Furqon Festival, PHBI, dan PHBN.\",\"highlights\":[\"Latihan Dasar Kepemimpinan Siswa (LDKS) & Musyawarah Ambalan Tahunan\",\"Penyelenggaraan Event Tahunan FURQON FEST & Pentas Seni Keislaman\",\"Bakti Sosial, Aksi Peduli Bencana, & Safari Ramadan ke Masyarakat\",\"Perkemahan Ukhuwah Pramuka Penegak & Outbound Character Building\"],\"schedule\":\"Kegiatan Mingguan & Event Tahunan\",\"target\":\"Seluruh Santri & Siswa SMA Al-Furqon\",\"tags\":[\"Kepemimpinan\",\"OSIS\",\"Pramuka\",\"LDKS\",\"KarakterSantri\",\"SMAAlFurqon\"],\"youtubeUrl\":\"https://www.youtube.com/watch?v=aqz-KE-bpKQ\"}', CURRENT_TIMESTAMP),
('keagamaan-tahfidz', 'keagamaan-tahfidz', '{\"id\":\"keagamaan-tahfidz\",\"slug\":\"keagamaan-tahfidz\",\"category\":\"Spiritual\",\"categoryBadgeBg\":\"bg-[#064E3B] text-amber-300 border border-amber-400/30\",\"title\":\"Pembiasaan Keagamaan & Tahfidz UMMI\",\"buttonText\":\"Program Tahfidz Santri\",\"image\":\"/bg-al-furqon3.jpg\",\"tagline\":\"Membangun Generasi Qur\'ani Berakhlak Mulia & Berwawasan Luas\",\"author\":\"Koordinator Keagamaan & Tahfidz UMMI\",\"shortDesc\":\"Shalat dhuha berjamaah, tahajud, munaqosyah Al-Qur\'an harian, hingga kajian rutin penanaman akhlak mulia.\",\"fullDesc\":\"Program keagamaan terpadu SMA Al-Furqon mengombinasikan pembiasaan ibadah harian dengan metode pengajaran Al-Qur\'an UMMI yang teruji dan tersertifikasi.\",\"content\":\"Pendidikan di SMA Al-Furqon Driyorejo menitikberatkan pada keunggulan intelektual akademik dan fondasi spiritual yang kokoh melalui Metode UMMI.\",\"highlights\":[\"Shalat Dhuha Berjamaah & Kajian Kitab Akhlak Rutin Setiap Pagi\",\"Target Hafalan Minimal 3 Juz Al-Qur\'an (Juz 30, 29, 1) dengan Sertifikasi UMMI\",\"Munaqosyah & Imtihan Tahfidz Terbuka Bersama Orang Tua & Penguji UMMI Pusat\",\"Qiyamul Lail (Shalat Tahajud & Witir) Berjamaah di Asrama Pondok\"],\"schedule\":\"Setiap Hari (Rutin Pagi & Malam)\",\"target\":\"Santri Asrama & Siswa Reguler SMA Al-Furqon\",\"tags\":[\"TahfidzUMMI\",\"Spiritual\",\"AlQuran\",\"ShalatDhuha\",\"KarakterRabbani\",\"PesantrenAlFurqon\"]}', CURRENT_TIMESTAMP),
('adiwiyata-zerowaste', 'adiwiyata-zerowaste', '{\"id\":\"adiwiyata-zerowaste\",\"slug\":\"adiwiyata-zerowaste\",\"category\":\"Adiwiyata\",\"categoryBadgeBg\":\"bg-teal-600 text-white\",\"title\":\"Gerakan Sekolah Hijau & Zero Waste\",\"buttonText\":\"Aksi Adiwiyata\",\"image\":\"/bg-al-furqon4.jpg\",\"tagline\":\"Pendidikan Pelestarian Lingkungan & Gaya Hidup Berkelanjutan\",\"author\":\"Tim Adiwiyata & Lingkungan Hidup\",\"shortDesc\":\"Keterlibatan aktif siswa dalam pengelolaan komposting, hidroponik, eco-brick, dan pelestarian lingkungan hidup.\",\"fullDesc\":\"SMA Al-Furqon berkomitmen menjadi Sekolah Adiwiyata yang mengedukasi siswa dalam menjaga kelestarian alam dan lingkungan hidup.\",\"content\":\"SMA Al-Furqon Driyorejo berkomitmen penuh menciptakan ekosistem sekolah yang asri, bersih, dan berwawasan lingkungan melalui Program Sekolah Adiwiyata & Gerakan Zero Waste.\",\"highlights\":[\"Pengolahan Sampah Organik Menjadi Pupuk Kompos & Eco-Enzyme\",\"Kebun Edukasi Hidroponik & Pembibitan Tanaman Obat Keluarga (TOGA)\",\"Kampanye Pengurangan Plastik Sekali Pakai di Kantin & Lingkungan Sekolah\",\"Aksi Tanam Pohon Bersama & Pembuatan Resapan Air Biopori\"],\"schedule\":\"Program Mingguan & Aksi Lingkungan\",\"target\":\"Kader Adiwiyata & Seluruh Civitas Akademika\",\"tags\":[\"Adiwiyata\",\"ZeroWaste\",\"SekolahHijau\",\"Hidroponik\",\"PeduliLingkungan\",\"SMAAlFurqon\"]}', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `agendas`
--
DROP TABLE IF EXISTS `agendas`;
CREATE TABLE `agendas` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `date` VARCHAR(50) DEFAULT NULL,
  `time` VARCHAR(50) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `agendas` (`id`, `title`, `date`, `time`, `location`, `description`, `category`, `created_at`) VALUES
('agenda-1', 'Simulasi TKA & Ujian Sekolah Kelas XII', '2026-10-20', '07:30 - 12:00 WIB', 'Lab Komputer & Ruang Kelas XII', 'Simulasi Tes Kemampuan Akademik berbasis komputer untuk menguji kesiapan materi dan mental santri menghadapi seleksi PTN.', 'Akademik', CURRENT_TIMESTAMP),
('agenda-2', 'Munaqosyah Tahfidz Metode UMMI', '2026-11-05', '08:00 - 14:00 WIB', 'Masjid Utama Al-Furqon', 'Ujian terbuka hafalan Al-Qur\'an minimal 3 Juz oleh Tim Penguji Resmi Ummi Foundation Surabaya.', 'Keagamaan', CURRENT_TIMESTAMP),
('agenda-3', 'Peringatan Hari Santri Nasional & Furqon Festival', '2026-10-22', '08:00 - 15:00 WIB', 'Halaman & Aula Pertemuan Sekolah', 'Rangkaian lomba keislaman antar-santri, pameran inovasi P5, dan tabligh akbar bersama pengasuh pesantren.', 'Kesiswaan', CURRENT_TIMESTAMP),
('agenda-4', 'Bakti Sosial & Safari Ramadan Santri', '2026-11-15', '09:00 - 16:00 WIB', 'Desa Binaan Driyorejo Gresik', 'Penyaluran zakat, infaq, dan sembako serta pengabdian masyarakat oleh Organisasi Santri SMA Al-Furqon.', 'Umum', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `achievements`
--
DROP TABLE IF EXISTS `achievements`;
CREATE TABLE `achievements` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `student_name` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `level` VARCHAR(100) DEFAULT NULL,
  `rank` VARCHAR(100) DEFAULT NULL,
  `year` VARCHAR(50) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `event` VARCHAR(255) DEFAULT NULL,
  `image` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `achievements` (`id`, `title`, `student_name`, `category`, `level`, `rank`, `year`, `description`, `image`, `created_at`) VALUES
('ach-1', 'Juara 1 Musabaqah Hifdzil Qur\'an (MHQ) 5 Juz Tingkat Jawa Timur', 'Muhammad Fatih Al-Ghifari', 'Keagamaan', 'Provinsi', 'Juara 1', '2026', 'Meraih juara pertama dalam ajang Festival Seni Islami dan Tahfidz Al-Qur\'an se-Jawa Timur.', '/prestasi1.jpg', CURRENT_TIMESTAMP),
('ach-2', 'Medali Emas Kejuaraan Pencak Silat Pelajar Tingkat Kabupaten Gresik', 'Ahmad Royhan Ma\'sum', 'Olahraga', 'Kabupaten', 'Medali Emas', '2026', 'Memenangkan kategori tanding kelas C putra pada Kejuaraan Pencak Silat Pelajar Gresik.', '/pencak-silat2 (1).png', CURRENT_TIMESTAMP),
('ach-3', 'Juara 2 Olimpiade Sains Nasional (OSN) Bidang Geografi', 'Aisyah Nur Rahmawati', 'Akademik', 'Kabupaten', 'Juara 2', '2025', 'Membawa nama harum sekolah dalam kompetisi sains geografi tingkat kabupaten.', '/prestasi3.jpg', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `teachers`
--
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `nip` VARCHAR(100) DEFAULT NULL,
  `position` VARCHAR(100) DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `role` VARCHAR(100) DEFAULT NULL,
  `education` VARCHAR(255) DEFAULT NULL,
  `photo` LONGTEXT DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `teachers` (`id`, `name`, `nip`, `position`, `subject`, `role`, `education`, `photo`, `bio`, `email`, `phone`, `is_active`, `created_at`) VALUES
('t-1', 'Dr. H. Abdul Muid, M.Pd.I.', '', 'Kadep Pendidikan', 'Guru Aswaja', 'Kadep Pendidikan', 'S3 / Doktor Pendidikan Agama Islam', '/foto-guru/abdul-muid.jpg', 'Kepala Departemen Pendidikan Yayasan PP. Al-Furqon.', '', '', 1, CURRENT_TIMESTAMP),
('t-2', 'Dr. Suryanto, S.Pd., M.Pd.', '', 'Kepala Sekolah', 'Manajemen Sekolah', 'Kepala Sekolah', 'S2 Magister Pendidikan', '/Pak Sur.jpeg', 'Kepala Sekolah SMA Al-Furqon Driyorejo.', '', '', 1, CURRENT_TIMESTAMP),
('t-3', 'Triana Dewitasari, S.Pd.', '', 'Wk. Kurikulum', 'Guru Geografi', 'Wk. Kurikulum', 'S1 Pendidikan Geografi', '/foto-guru/triana-dewitasari.jpg', 'Wakil Kepala Sekolah Bidang Kurikulum.', '', '', 1, CURRENT_TIMESTAMP),
('t-4', 'Suherman, M.Pd. I.', '', 'Wk. Kesiswaan', 'Guru PJOK', 'Wk. Kesiswaan', 'S2 Magister Pendidikan Islam', '/foto-guru/suherman.jpg', 'Wakil Kepala Sekolah Bidang Kesiswaan.', '', '', 1, CURRENT_TIMESTAMP),
('t-5', 'Siti Alfiyatus Sa\'diyah, S.Pd', '', 'Tata Usaha (TU)', 'Administrasi Sekolah', 'Tata Usaha (TU)', 'S1 Pendidikan', '/foto-guru/siti-alfiyatus.jpg', 'Staf Tata Usaha SMA Al-Furqon Driyorejo.', '', '', 1, CURRENT_TIMESTAMP),
('t-6', 'Husnul Wafa, M.Pd.', '', 'Guru', 'Guru PAI', 'Guru', 'S2 Magister Pendidikan', '', 'Tenaga Pendidik Pendidikan Agama Islam.', '', '', 1, CURRENT_TIMESTAMP),
('t-7', 'M. Refa Mashuri, S.Pd.', '', 'Guru', 'Guru PAI', 'Guru', 'S1 Pendidikan Agama Islam', '', 'Tenaga Pendidik Pendidikan Agama Islam.', '', '', 1, CURRENT_TIMESTAMP),
('t-8', 'Syaifuddin Yahya, M.Pd.I', '', 'Guru', 'Guru Fiqih', 'Guru', 'S2 Magister Pendidikan Islam', '', 'Tenaga Pendidik Fiqih & Keislaman.', '', '', 1, CURRENT_TIMESTAMP),
('t-9', 'Sugeng Utomo, S.Pd.', '', 'Guru', 'Guru Matematika', 'Guru', 'S1 Pendidikan Matematika', '', 'Tenaga Pendidik Matematika.', '', '', 1, CURRENT_TIMESTAMP),
('t-10', 'M. Mas\'ud Yunus, S.Pd.', '', 'Guru', 'Guru B. Indonesia', 'Guru', 'S1 Pendidikan Bahasa Indonesia', '', 'Tenaga Pendidik Bahasa Indonesia.', '', '', 1, CURRENT_TIMESTAMP),
('t-11', 'Masyhudan, S.T', '', 'Guru', 'Guru Sejarah', 'Guru', 'S1 Sarjana Teknik', '', 'Tenaga Pendidik Sejarah.', '', '', 1, CURRENT_TIMESTAMP),
('t-12', 'Nuril Habibi, M.Hi', '', 'Guru', 'Guru Fiqih', 'Guru', 'S2 Magister Hukum Islam', '', 'Tenaga Pendidik Fiqih.', '', '', 1, CURRENT_TIMESTAMP),
('t-13', 'Kholil Misbah, Lc.', '', 'Guru', 'Guru Bahasa Arab', 'Guru', 'S1 Lisensiat (Lc.) Bahasa & Sastra Arab', '', 'Tenaga Pendidik Bahasa Arab.', '', '', 1, CURRENT_TIMESTAMP),
('t-14', 'Nurul Idhomah, S.pd.', '', 'Guru', 'Guru Senibudaya Prakarya', 'Guru', 'S1 Pendidikan', '', 'Tenaga Pendidik Seni Budaya & Prakarya.', '', '', 1, CURRENT_TIMESTAMP),
('t-15', 'Khoirum Umala, S.pd.', '', 'Guru', 'Guru Sosiologi, Ekonomi', 'Guru', 'S1 Pendidikan', '', 'Tenaga Pendidik Sosiologi & Ekonomi.', '', '', 1, CURRENT_TIMESTAMP),
('t-16', 'Tifani Ikmahtiar, S.Si.', '', 'Guru', 'Guru Fisika, Biologi', 'Guru', 'S1 Sarjana Sains (S.Si)', '', 'Tenaga Pendidik Fisika & Biologi.', '', '', 1, CURRENT_TIMESTAMP),
('t-17', 'Fita Islamiah, S.pd.', '', 'Guru', 'Guru Kimia, Biologi', 'Guru', 'S1 Pendidikan', '', 'Tenaga Pendidik Kimia & Biologi.', '', '', 1, CURRENT_TIMESTAMP),
('t-18', 'Utari Kartika, S.pd.', '', 'Guru', 'Guru PKN', 'Guru', 'S1 Pendidikan Pancasila dan Kewarganegaraan', '', 'Tenaga Pendidik PKN.', '', '', 1, CURRENT_TIMESTAMP),
('t-19', 'Khoir Ummah', '', 'Guru UMMI', 'Guru UMMI', 'Guru UMMI', 'Pengajar Tersertifikasi UMMI Foundation', '', 'Tenaga Pendidik Metode UMMI Al-Qur\'an.', '', '', 1, CURRENT_TIMESTAMP),
('t-20', 'Nur Widia', '', 'Guru UMMI', 'Guru UMMI', 'Guru UMMI', 'Pengajar Tersertifikasi UMMI Foundation', '', 'Tenaga Pendidik Metode UMMI Al-Qur\'an.', '', '', 1, CURRENT_TIMESTAMP),
('t-21', 'Sri Wahyuni', '', 'Guru UMMI', 'Guru UMMI', 'Guru UMMI', 'Pengajar Tersertifikasi UMMI Foundation', '', 'Tenaga Pendidik Metode UMMI Al-Qur\'an.', '', '', 1, CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `extracurriculars`
--
DROP TABLE IF EXISTS `extracurriculars`;
CREATE TABLE `extracurriculars` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `schedule` VARCHAR(255) DEFAULT NULL,
  `instructor` VARCHAR(255) DEFAULT NULL,
  `mentor` VARCHAR(255) DEFAULT NULL,
  `icon` VARCHAR(100) DEFAULT 'Sparkles',
  `icon_image` LONGTEXT DEFAULT NULL,
  `achievements` JSON DEFAULT NULL,
  `image` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `extracurriculars` (`id`, `name`, `category`, `description`, `schedule`, `instructor`, `mentor`, `icon`, `icon_image`, `achievements`, `image`, `created_at`) VALUES
('ekskul-1', 'Desain Grafis', 'Keterampilan', 'Ekstrakurikuler desain multimedia dan visual grafis modern.', '', '', '', 'Palette', NULL, '[]', '', CURRENT_TIMESTAMP),
('ekskul-2', 'Tata Boga', 'Keterampilan', 'Keterampilan memasak dan wirausaha kuliner halal.', '', '', '', 'ChefHat', NULL, '[]', '', CURRENT_TIMESTAMP),
('ekskul-3', 'Handy Craft', 'Keterampilan', 'Kreasi seni tangan dan kerajinan bahan daur ulang.', '', '', '', 'Scissors', NULL, '[]', '', CURRENT_TIMESTAMP),
('ekskul-4', 'Menjahit', 'Keterampilan', 'Keterampilan menjahit busana muslim dan tata busana.', '', '', '', 'Shirt', NULL, '[]', '', CURRENT_TIMESTAMP),
('ekskul-5', 'Futsal', 'Olahraga', 'Pengembangan bakat olahraga futsal dan sportivitas tim.', '', '', '', 'Trophy', NULL, '[]', '', CURRENT_TIMESTAMP),
('ekskul-6', 'Al Banjari', 'Keagamaan', 'Seni musik hadrah sholawat Al-Banjari khas pesantren.', '', '', '', 'Music', NULL, '[]', '', CURRENT_TIMESTAMP),
('ekskul-7', 'Pencak Silat', 'Olahraga', 'Seni bela diri pencak silat warisan budaya Nusantara.', '', '', '', 'ShieldCheck', '/pencak-silat2 (1).png', '[]', '', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `gallery`
--
DROP TABLE IF EXISTS `gallery`;
CREATE TABLE `gallery` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `imageurl` LONGTEXT NOT NULL,
  `date` VARCHAR(50) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `gallery` (`id`, `title`, `category`, `imageurl`, `date`, `description`, `created_at`) VALUES
('gal-1', 'Kegiatan Belajar Mengajar di Lab Komputer Modern', 'Pembelajaran', '/labkomputer.jpeg', '2026-10-01', 'Praktikum literasi digital dan pemrograman santri SMA Al-Furqon.', CURRENT_TIMESTAMP),
('gal-2', 'Gedung Utama dan Halaman Asri Pesantren Al-Furqon', 'Lingkungan Sekolah', '/bg-al-furqon2.jpg', '2026-09-28', 'Suasana pagi yang sejuk dan asri di lingkungan SMA & Pondok Pesantren Al-Furqon Driyorejo.', CURRENT_TIMESTAMP),
('gal-3', 'Latihan Rutin Ekstrakurikuler Pencak Silat', 'Ekstrakurikuler', '/pencak-silat2 (1).png', '2026-09-25', 'Latihan bela diri pencak silat untuk mengasah ketahanan fisik, mental, dan sportivitas santri.', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `psb_applicants`
--
DROP TABLE IF EXISTS `psb_applicants`;
CREATE TABLE `psb_applicants` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `registration_number` VARCHAR(100) UNIQUE DEFAULT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `nisn` VARCHAR(50) DEFAULT NULL,
  `gender` VARCHAR(20) DEFAULT NULL,
  `birth_place` VARCHAR(100) DEFAULT NULL,
  `birth_date` VARCHAR(50) DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `previous_school` VARCHAR(255) DEFAULT NULL,
  `parent_name` VARCHAR(255) DEFAULT NULL,
  `parent_phone` VARCHAR(50) DEFAULT NULL,
  `chosen_major` VARCHAR(100) DEFAULT NULL,
  `registration_date` VARCHAR(50) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Menunggu Verifikasi',
  `notes` TEXT DEFAULT NULL,
  `data` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- View for backwards compatibility: `ppdb_applicants`
--
CREATE OR REPLACE VIEW `ppdb_applicants` AS SELECT * FROM `psb_applicants`;

-- --------------------------------------------------------
-- Table structure for table `faqs`
--
DROP TABLE IF EXISTS `faqs`;
CREATE TABLE `faqs` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `question` TEXT NOT NULL,
  `answer` TEXT NOT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `created_at`) VALUES
('faq-1', 'Kapan pendaftaran PSB SMA Al-Furqon Driyorejo T.A. 2026/2027 dibuka?', 'Pendaftaran Gelombang 1 dibuka mulai 2 Januari 2026 s.d. 30 April 2026. Gelombang 2 dibuka 1 Mei 2026 s.d. 10 Juli 2026 (selama kuota masih tersedia).', 'PSB', CURRENT_TIMESTAMP),
('faq-2', 'Apa saja syarat utama mendaftar sebagai calon santri baru?', 'Syarat utama: FC Ijazah/SKL SMP/MTs, FC Akta Kelahiran, FC Kartu Keluarga, Pasfoto 3x4 (3 lembar), dan mengisi Form Pendaftaran Online/Offline.', 'PSB', CURRENT_TIMESTAMP),
('faq-3', 'Bagaimana sistem pengajaran Al-Qur\'an di SMA Al-Furqon?', 'Setiap pagi sebelum KBM reguler, siswa mengikuti bimbingan metode UMMI dan Tahfidz Al-Qur\'an terstruktur dengan target minimal 3 Juz hafalan hingga wisuda.', 'Kehidupan Santri', CURRENT_TIMESTAMP),
('faq-4', 'Apakah SMA Al-Furqon menerapkan Kurikulum Merdeka?', 'Ya, SMA Al-Furqon Driyorejo menerapkan Kurikulum Merdeka secara penuh (Kategori Berbagi & Mandiri) yang dilengkapi Projek Penguatan Profil Pelajar Pancasila (P5).', 'Kurikulum', CURRENT_TIMESTAMP),
('faq-5', 'Apakah ada beasiswa bagi siswa berprestasi?', 'Kami menyediakan Beasiswa Tahfidz Al-Qur\'an (bebas SPP), Beasiswa Juara Olimpiade Sains/Seni, serta beasiswa khusus alumni MTs Al-Furqon.', 'PSB', CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `testimonials`
--
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(100) DEFAULT NULL,
  `graduation_year` VARCHAR(50) DEFAULT NULL,
  `avatar` LONGTEXT DEFAULT NULL,
  `content` TEXT NOT NULL,
  `rating` INT DEFAULT 5,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`id`, `name`, `role`, `graduation_year`, `avatar`, `content`, `rating`, `created_at`) VALUES
('testi-1', 'Ahmad Faiz Syihab, S.Kom.', 'Alumni 2022', '2022', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80', 'Belajar di SMA Al-Furqon memberikan keseimbangan antara bekal ilmu agama yang kuat dan keterampilan teknologi masa depan. Kini saya kuliah di PTN jurusan Teknik Informatika dengan bekal pondasi yang kokoh.', 5, CURRENT_TIMESTAMP),
('testi-2', 'Hj. Siti Rohmah, S.Pd.', 'Orang Tua Wali Santri', '', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 'Alhamdulillah, karakter anak saya jauh lebih mandiri, santun, dan hafal Al-Qur\'an dengan tartil metode Ummi. Sekolah yang sangat tepat untuk pendidikan generasi Rabbani.', 5, CURRENT_TIMESTAMP);

-- --------------------------------------------------------
-- Table structure for table `facilities`
--
DROP TABLE IF EXISTS `facilities`;
CREATE TABLE `facilities` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `image` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `facilities` (`id`, `name`, `category`, `description`, `image`, `created_at`) VALUES
('fac-1', 'Ruang Kelas Modern', 'Fasilitas Belajar', 'Ruang belajar ber-AC yang bersih, berteknologi multimedia interaktif, pencahayaan ergonomis, dan suasana belajar yang kondusif.', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80', CURRENT_TIMESTAMP),
('fac-2', 'Laboratorium Canggih', 'Riset & Eksperimen', 'Laboratorium Sains MIPA (Fisika, Kimia, Biologi) dengan peralatan eksperimen modern berstandar praktikum dan penelitian siswa.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80', CURRENT_TIMESTAMP),
('fac-3', 'Lab Informatika Digital', 'Teknologi & Digital', 'Laboratorium komputer multimedia spesifikasi tinggi, jaringan internet ultra-cepat, serta laboratorium IoT & literasi Artificial Intelligence.', '/labkomputer.jpeg', CURRENT_TIMESTAMP),
('fac-4', 'Area Olahraga Terbaik', 'Kebugaran & Seni', 'Fasilitas olahraga outdoor & indoor lengkap mencakup lapangan serbaguna futsal, basket, voli, serta gelanggang seni pencak silat.', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80', CURRENT_TIMESTAMP);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
