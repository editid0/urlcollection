import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(request, { params }) {
    const { id } = await params;
    console.log("Deleting collection with ID:", id);
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const result = await pool.query(`
        DELETE FROM collections WHERE id = $1 AND user_id = $2
    `, [id, user.id]);

    if (result.rowCount === 0) {
        return new Response("Collection not found or you do not have permission to delete it", { status: 404 });
    }

    return new Response("Collection deleted successfully", { status: 200 });

}