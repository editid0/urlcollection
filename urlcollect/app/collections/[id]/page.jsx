import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import ClientSideList from "./clientList";
import EditCollection from "./editCollection";
import CopyToClipboardButton from "./copyToClip";

export default async function ViewCollectionPage({ params }) {
    const { id } = await params;
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const data = await pool.query(`
        SELECT * FROM collections WHERE id = $1 AND user_id = $2
    `, [id, user.id]);
    if (!data || !data.rows || data.rows.length === 0) {
        return null;
    }
    const collection = data.rows[0];
    if (!collection) {
        return null;
    }
    var urls = [];
    const urlsData = await pool.query(`
        SELECT * FROM urls WHERE collection_id = $1
    `, [id]);
    if (urlsData && urlsData.rows) {
        urls = urlsData.rows;
    }
    return (
        <>
            <div className="w-full mt-4 px-2 max-w-[30cm] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4 w-fit">
                    <h1 className="text-4xl font-bold">{collection?.name}</h1>
                    <p className="text-md text-muted-foreground">{collection?.description}</p>
                    <EditCollection id={id} name={collection?.name} description={collection?.description} isPublic={collection?.public} />
                </div>
                {collection?.public && (
                    <div className="bg-green-500/15 border border-green-500/30 rounded-lg p-3 mt-3 text-muted-foreground flex flex-col items-start justify-center gap-2">
                        <p>This collection is public, you can disable this by editing the collection above, or copy the shareable link using the button below.</p>
                        <CopyToClipboardButton text={"https://store.editid.uk/collections/public/" + collection?.uid} />
                    </div>
                )}
                <div>
                    <h2 className="text-2xl font-semibold mt-4">URLs in this collection</h2>
                    <ClientSideList urls={urls} id={id} />
                </div>
            </div>
        </>
    )
}