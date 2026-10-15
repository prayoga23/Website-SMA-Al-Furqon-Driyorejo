const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env" });

async function initMysql() {
  console.log("=========================================");
  console.log("🚀 Mengimpor Database ke MySQL Server");
  console.log("=========================================");

  const sqlFile = path.join(__dirname, "../database_sma_alfurqon.sql");
  if (!fs.existsSync(sqlFile)) {
    console.error("❌ File database_sma_alfurqon.sql tidak ditemukan!");
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlFile, "utf-8");

  const config = {
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    multipleStatements: true,
  };

  try {
    console.log(`Menghubungkan ke MySQL host '${config.host}'...`);
    const connection = await mysql.createConnection(config);
    console.log("✅ Terhubung ke MySQL! Menjalankan skrip database_sma_alfurqon.sql...");

    await connection.query(sqlContent);
    console.log("✅ Berhasil membuat database 'website_alfurqon' dan mengimpor seluruh tabel & data!");

    await connection.end();
    console.log("\n🎉 Selesai! Aplikasi siap digunakan dengan MySQL.");
  } catch (error) {
    console.error("❌ Gagal mengimpor ke MySQL:", error.message);
    console.log("\n💡 Catatan: Anda juga bisa mengimpor file 'database_sma_alfurqon.sql' secara manual lewat phpMyAdmin (Menu Import).");
  }
}

initMysql();
