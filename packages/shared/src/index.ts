import { drizzle } from 'drizzle-orm/libsql';
import { statusTable } from './db/schema';

const db = (url: string, token: string) => {
  return drizzle({ 
    connection: { 
      url: url, 
      authToken: token,
    }
  });
}

export { db, statusTable };
