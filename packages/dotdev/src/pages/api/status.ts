import { eq } from "drizzle-orm";
import { db as initDB, statusTable } from "../../db";

export const prerender = false;

export async function GET() {
  const db = initDB(import.meta.env.TURSO_DATABASE_URL, import.meta.env.TURSO_AUTH_TOKEN);
  const data = await db.select().from(statusTable).where(eq(statusTable.id, 'status'));

  return new Response(JSON.stringify({
    ...data[0],
    id: undefined,
  }), {
    headers: {
      'content-type': 'application/json',
    },
  });
}