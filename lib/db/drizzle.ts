import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config({ path: ['.env.local', '.env'] });

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

const client = postgres(process.env.POSTGRES_URL, {
  prepare: false,
});

type TxQuery = (queryText: string, params?: unknown[]) => Promise<unknown>;

type SqlCompat = TxQuery & {
  transaction: (callback: (tx: TxQuery) => unknown[]) => Promise<unknown[]>;
};

const sqlCompat = ((queryText: string, params: unknown[] = []) => {
  return client.unsafe(queryText, params as any[]);
}) as unknown as SqlCompat;

sqlCompat.transaction = async (callback: (tx: TxQuery) => unknown[]) => {
  return client.begin(async (tx) => {
    const txQuery: TxQuery = (queryText, params = []) =>
      tx.unsafe(queryText, params as any[]);
    const results = callback(txQuery);
    return Promise.all(results as Promise<unknown>[]);
  });
};

export const sql = sqlCompat;
export const db = drizzle(client);
