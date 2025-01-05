import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const statusTable = sqliteTable('status', {
  id: text().primaryKey().default('status'),
  song: text(),
  online: int({ mode: 'boolean' }).default(false).notNull(),
  artists: text(),
  image: text(),
  timestamp: int({ mode: 'timestamp' }).default(new Date()).notNull(),
  listening: int({ mode: 'boolean' }).default(false).notNull()
});