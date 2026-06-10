import { Client } from 'pg';
import { config } from './config';

export const connectDB = async () => {
  const client = new Client({
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
  });

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS clicks (
      id SERIAL PRIMARY KEY,
      clicked_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  return client;
};