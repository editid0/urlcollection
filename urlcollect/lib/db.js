import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// create table collections(id SERIAL PRIMARY KEY, name TEXT, created_at TIMESTAMP, updated_at TIMESTAMP, user_id TEXT, description TEXT, public BOOL DEFAULT FALSE);
// CREATE TABLE urls (id SERIAL PRIMARY KEY, collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE, url TEXT NOT NULL, title TEXT, description TEXT, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now());

export default pool;
