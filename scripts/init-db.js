const { neon } = require("@neondatabase/serverless");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_yo2PTxLukc1s@ep-lingering-dew-axy5bekt.c-4.us-east-2.aws.neon.tech/website_alfurqon?sslmode=require";

const sql = neon(DATABASE_URL);

async function initSchema() {
  console.log("Initializing database schema on Neon.tech...");

  await sql`
    CREATE TABLE IF NOT EXISTS school_info (
      id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
      data JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS news (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT,
      category VARCHAR(100),
      date VARCHAR(50),
      author VARCHAR(100),
      image TEXT,
      is_featured BOOLEAN DEFAULT false,
      tags JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS agendas (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date VARCHAR(50),
      time VARCHAR(50),
      location VARCHAR(255),
      description TEXT,
      category VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS achievements (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      student_name VARCHAR(255),
      category VARCHAR(100),
      level VARCHAR(100),
      year VARCHAR(50),
      description TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS teachers (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      nip VARCHAR(100),
      subject VARCHAR(255),
      role VARCHAR(100),
      photo TEXT,
      bio TEXT,
      email VARCHAR(255),
      phone VARCHAR(50),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS extracurriculars (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      mentor VARCHAR(255),
      schedule VARCHAR(255),
      description TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      imageUrl TEXT NOT NULL,
      date VARCHAR(50),
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ppdb_applicants (
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
      status VARCHAR(50) DEFAULT 'Pending',
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id VARCHAR(100) PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(100),
      avatar TEXT,
      content TEXT NOT NULL,
      rating INT DEFAULT 5,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS facilities (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      description TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(100) PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      avatar TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log("✅ All database tables created successfully in Neon.tech!");
}

initSchema().catch((err) => {
  console.error("❌ Schema initialization error:", err);
  process.exit(1);
});
