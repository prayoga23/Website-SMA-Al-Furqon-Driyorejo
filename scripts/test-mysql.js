const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env" });

async function testConnection() {
  console.log("=========================================");
  console.log("🔍 Testing MySQL Database Connection");
  console.log("=========================================");

  const config = {
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "website_alfurqon",
  };

  console.log(`Connecting to MySQL with:`);
  console.log(`- Host: ${config.host}`);
  console.log(`- Port: ${config.port}`);
  console.log(`- User: ${config.user}`);
  console.log(`- Database: ${config.database}\n`);

  try {
    const connection = await mysql.createConnection(config);
    console.log("✅ Successfully connected to MySQL server!");

    const [rows] = await connection.query("SHOW TABLES;");
    console.log(`\n📋 Found ${rows.length} tables in database '${config.database}':`);
    rows.forEach((r) => {
      const tableName = Object.values(r)[0];
      console.log(`   - ${tableName}`);
    });

    await connection.end();
    console.log("\n🎉 Database test passed!");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.log("\n💡 Petunjuk:");
    console.log("1. Pastikan server MySQL (XAMPP / Laragon / MySQL Service) sudah berjalan.");
    console.log("2. Upload / Import file 'database_sma_alfurqon.sql' ke phpMyAdmin.");
    console.log("3. Sesuaikan user dan password pada file .env atau .env.local jika diperlukan.");
  }
}

testConnection();
