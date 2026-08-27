import { NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/lib/db";

export async function GET() {
  const dbStatus = await checkDatabaseConnection();
  return NextResponse.json({
    status: dbStatus.success ? "online" : "error",
    provider: "Neon.tech (PostgreSQL)",
    database: "website_alfurqon",
    timestamp: dbStatus.timestamp || new Date().toISOString(),
    error: dbStatus.error || null,
  });
}
