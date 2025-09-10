import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
    const { id, name, description, isPublic } = await request.json();
    const user = await currentUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    if (!id) {
        return new Response(JSON.stringify({ error: "Missing collection ID" }), { status: 400 });
    }

    if (!name) {
        return new Response(JSON.stringify({ error: "Missing collection name" }), { status: 400 });
    }

    if (description.length > 200) {
        return new Response(JSON.stringify({ error: "Description is too long" }), { status: 400 });
    }

    if (name.length > 50) {
        return new Response(JSON.stringify({ error: "Title is too long" }), { status: 400 });
    }

    const collection = await pool.query(`
        UPDATE collections
        SET name = $1, description = $2, public = $3
        WHERE id = $4 AND user_id = $5
    `, [name, description, isPublic, id, user.id]);

    if (collection.rowCount === 0) {
        return new Response(JSON.stringify({ error: "Collection not found or you do not have permission to edit it" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}