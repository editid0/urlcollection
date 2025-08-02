import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { isPrivateIp, resolveHostname } from "../validate/route";

async function validateUrl(url) {
    if (!url) {
        return false;
    }
    if (/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/.test(url) === false) {
        return false;
    }
    var hostname;
    try {
        hostname = new URL(url).hostname;
    } catch (error) {
        try {
            hostname = new URL(`http://${url}`).hostname;
        } catch (error) {
            return false;
        }
    }
    const addresses = await resolveHostname(hostname);
    if (!addresses) {
        return false;
    }
    const privateIps = addresses.filter(isPrivateIp);
    if (privateIps.length > 0) {
        return false;
    }
    return true;
}

export async function POST(request) {
    const res = await request.json();
    const { url, title, description, collectionId } = res;
    console.log("Received data:", res);
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!url || !title || !collectionId) {
        return new Response("URL, title, and collection ID are required", { status: 400 });
    }

    const isValid = await validateUrl(url);
    if (!isValid) {
        return new Response("Invalid URL format", { status: 400 });
    }
    var nurl = url;
    if (!/^https?:\/\//i.test(nurl)) {
        nurl = `https://${nurl}`;
    }

    const coll = await pool.query(`SELECT * FROM collections WHERE id = $1 AND user_id = $2`, [collectionId, user.id])
    if (coll.rowCount === 0) {
        return new Response("Collection not found", { status: 404 });
    }

    await pool.query(`
        INSERT INTO urls (collection_id, url, title, description) VALUES ($1, $2, $3, $4)
    `, [collectionId, nurl, title, description]);

    return new Response("URL added successfully", { status: 201 });
}