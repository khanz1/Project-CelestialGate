import { Client } from 'pg';
import dotenv from 'dotenv';
import * as path from 'path';

const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const envPath = path.resolve(__dirname, `../../.env.${NODE_ENV}`);

dotenv.config({ path: envPath });

export const HOST = process.env.DB_HOST || 'localhost';
export const PORT = +(process.env.DB_PORT || 5432);
export const USERNAME = process.env.DB_USERNAME || 'postgres';
export const PASSWORD = process.env.DB_PASSWORD || 'postgres';
export const DATABASE = process.env.DB_DATABASE || 'test_db';

export const client = new Client({
  host: HOST,
  port: PORT,
  database: DATABASE,
  user: USERNAME,
  password: PASSWORD,
});
