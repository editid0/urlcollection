import { Button } from "@/components/ui/button";
import pool from "@/lib/db";
import { url } from "inspector";
import { Info } from "lucide-react";
import Link from "next/link";
import moment from "moment-timezone";

export default async function PublicCollectionPage({ params }) {
    const { uid } = await params;
    var luid = uid.toLowerCase();
    if (!uid) {
        return null;
    }
    if (/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/.test(luid) === false) {
        return null;
    }
    const collection = await pool.query(`
        SELECT * FROM collections WHERE uid = $1 AND public = true
    `, [luid]);
    if (!collection || !collection.rows) {
        return null;
    }
    const collectionData = collection.rows[0];
    if (!collectionData || !collectionData.public) {
        return null;
    }
    const urlsData = await pool.query(`
        SELECT * FROM urls WHERE collection_id = $1
    `, [collectionData.id]);
    return (
        <>
            <div className="mx-auto w-md p-4 border-2 rounded-xl border-muted my-4 max-w-7xl">
                <h1 className="text-2xl font-semibold text-center">{collectionData.name}</h1>
                <h2 className="text-sm text-muted-foreground text-center">{collectionData.description}</h2>
                <div className="flex flex-row items-center justify-start bg-green-400/15 border border-green-400/30 rounded-lg p-3 mt-3 text-muted-foreground">
                    <Info />
                    <span className="ml-2">This is a public collection</span>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-2xl font-medium mb-4">URLs</h2>

                {urlsData && urlsData.rows && urlsData.rows.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {urlsData.rows.map((url) => (
                            <div
                                key={url.id}
                                className="flex flex-col bg-white dark:bg-black/80 border border-muted rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <h3 className="text-lg font-semibold truncate">{url.title || url.url}</h3>
                                        {url.description && (
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                {url.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <p className="text-xs text-muted-foreground">Created {moment(url.created_at).fromNow()}</p>
                                    <Button asChild size="sm">
                                        <Link href={url.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                                            Open
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No URLs found.</p>
                )}
            </div>
        </>
    );
}