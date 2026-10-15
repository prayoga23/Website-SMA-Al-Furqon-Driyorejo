import { NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/lib/db";

export async function GET() {
  const dbStatus = await checkDatabaseConnection();
  return NextResponse.json({
    status: dbStatus.success ? "online" : "offline",
    provider: "MySQL Database",
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "website_alfurqon",
    host: process.env.MYSQL_HOST || "localhost",
    timestamp: dbStatus.timestamp || new Date().toISOString(),
    error: dbStatus.error || null,
  });
}
