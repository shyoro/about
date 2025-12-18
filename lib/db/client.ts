import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

/**
 * Get database client instance
 * Lazy initialization to avoid build-time errors when env vars are not set
 * Call this function at runtime in API routes, not at module load time
 */
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (dbInstance) {
    return dbInstance;
  }
  
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  const sql = neon(process.env.DATABASE_URL);
  dbInstance = drizzle(sql, { schema });
  return dbInstance;
}

