import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
    const res = await request.json();
    const { name, description } = res;
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    await pool.query(`
        INSERT INTO collections (name, created_at, updated_at, urls, user_id, description) VALUES ($1, NOW(), NOW(), '{}', $2, $3)
    `, [name, user.id, description]);

    if (!name || !description) {
        return new Response("Name and description are required", { status: 400 });
    }

    return new Response("Collection created successfully", { status: 201 });
}