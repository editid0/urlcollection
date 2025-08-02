import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import EditForm from "./EditForm";

export default async function EditURLPage({ params }) {
    const { id, url_id } = await params;
    const user = await currentUser();

    if (!user) {
        return <div className="text-center mt-4">You must be logged in to edit URLs.</div>;
    }
    if (!id || !url_id) {
        return <div className="text-center mt-4">Invalid collection or URL ID.</div>;
    }
    const collection = await pool.query(`SELECT * FROM collections WHERE id = $1 AND user_id = $2`, [id, user.id]);
    if (collection.rowCount === 0) {
        return <div className="text-center mt-4">Collection not found or you do not have access.</div>;
    }
    const urlData = await pool.query(`SELECT * FROM urls WHERE id = $1 AND collection_id = $2`, [url_id, id]);
    if (urlData.rowCount === 0) {
        return <div className="text-center mt-4">URL not found or you do not have access.</div>;
    }

    return (
        <div className="w-full mt-4 px-2 max-w-[30cm] mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4 w-fit">
                <h1 className="text-4xl font-bold">Edit URL</h1>
            </div>
            <EditForm collection_id={id} url_id={url_id} data={urlData.rows[0]} />
        </div>
    );
}