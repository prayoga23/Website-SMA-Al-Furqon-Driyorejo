import { neon } from "@neondatabase/serverless";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_yo2PTxLukc1s@ep-lingering-dew-axy5bekt.c-4.us-east-2.aws.neon.tech/website_alfurqon?sslmode=require";

export const sql = neon(databaseUrl);

export async function checkDatabaseConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    return { success: true, timestamp: result[0]?.current_time };
  } catch (error) {
    console.error("Database connection error:", error);
    return { success: false, error: String(error) };
  }
}
