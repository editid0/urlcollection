import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// create table collections(id SERIAL PRIMARY KEY, name TEXT, created_at TIMESTAMP, updated_at TIMESTAMP, urls TEXT[], user_id TEXT, description TEXT, colour TEXT);

export default pool;
