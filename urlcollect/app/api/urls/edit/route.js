import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { validateUrl } from "../route";

export async function POST(request) {
    const res = await request.json();
    const user = await currentUser();
    const { collection_id, url_id, title, description, url } = res;

    if (!collection_id || !url_id || !title || !url) {
        return new Response("Collection ID, URL ID, title, and URL are required", { status: 400 });
    }

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const collection = await pool.query(`SELECT * FROM collections WHERE id = $1 AND user_id = $2`, [collection_id, user.id]);
    if (collection.rowCount === 0) {
        return new Response("Collection not found", { status: 404 });
    }
    const urlData = await pool.query(`SELECT * FROM urls WHERE id = $1 AND collection_id = $2`, [url_id, collection_id]);
    if (urlData.rowCount === 0) {
        return new Response("URL not found", { status: 404 });
    }
    const isValid = await validateUrl(url);
    if (!isValid) {
        return new Response("Invalid URL format", { status: 400 });
    }
    var nurl = url;
    if (!/^https?:\/\//i.test(nurl)) {
        nurl = `https://${nurl}`;
    }

    try {
        await pool.query(`
            UPDATE urls
            SET title = $1, description = $2, url = $3, updated_at = NOW()
            WHERE id = $4 AND collection_id = $5 AND collection_id IN (SELECT id FROM collections WHERE user_id = $6)
        `, [title, description, nurl, url_id, collection_id, user.id]);

        return new Response("URL updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating URL:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}