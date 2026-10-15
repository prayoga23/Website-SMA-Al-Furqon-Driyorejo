import mysql, { Pool, PoolOptions } from "mysql2/promise";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const host = process.env.MYSQL_HOST || process.env.DB_HOST || "mysql-server";
    const port = Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306);
    const user = process.env.MYSQL_USER || process.env.DB_USER || "prayoga";
    const password = process.env.MYSQL_PASSWORD ?? process.env.DB_PASSWORD ?? "Pr4y0g@@";
    const database = process.env.MYSQL_DATABASE || process.env.DB_NAME || "website_alfurqon";
    const databaseUrl = process.env.DATABASE_URL;

    let poolConfig: PoolOptions;

    if (databaseUrl && (databaseUrl.startsWith("mysql://") || databaseUrl.startsWith("mysqls://"))) {
      poolConfig = {
        uri: databaseUrl,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      };
    } else {
      poolConfig = {
        host,
        port,
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      };
    }

    pool = mysql.createPool(poolConfig);
  }
  return pool;
}

export async function query<T = any>(sqlQuery: string, params: any[] = []): Promise<T[]> {
  const p = getPool();
  const [rows] = await p.query(sqlQuery, params);
  return rows as T[];
}

export async function execute(sqlQuery: string, params: any[] = []) {
  const p = getPool();
  return await p.execute(sqlQuery, params);
}

// Tagged template literal helper for backward-compatibility: sql`SELECT * FROM table WHERE id = ${id}`
export const sql = async (strings: TemplateStringsArray, ...values: any[]): Promise<any[]> => {
  let queryString = strings[0];
  for (let i = 0; i < values.length; i++) {
    queryString += "?" + strings[i + 1];
  }
  return await query(queryString, values);
};

export async function checkDatabaseConnection() {
  try {
    const rows = await query<any>("SELECT NOW() as current_time");
    return { success: true, timestamp: rows[0]?.current_time };
  } catch (error) {
    console.error("MySQL connection error:", error);
    return { success: false, error: String(error) };
  }
}
