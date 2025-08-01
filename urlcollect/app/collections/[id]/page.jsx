import { Button } from "@/components/ui/button";
import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

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
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mt-4">URLs in this collection</h2>
                    <div className="mt-4 flex flex-row flex-wrap gap-4">
                        {urls.length > 0 ? (
                            urls.map((url) => (
                                <div key={url.id} className="border p-4 rounded-lg mb-4">
                                    <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {url.title || url.url}
                                    </a>
                                    <p className="text-sm text-muted-foreground">{url.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p className="text-muted-foreground">No URLs found in this collection.</p>
                                <Button variant="outline" asChild className="mt-2">
                                    <Link href={`/collections/${id}/add`}>
                                        Add a new URL
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}