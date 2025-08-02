import { Button } from "@/components/ui/button";
import pool from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DeleteURL from "./deleteButton";

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
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {urls.length > 0 && (
                            <Link href={`/collections/${id}/add`} className="border border-dashed hover:border-solid p-2 rounded-lg mb-4 flex flex-col items-center justify-center hover:bg-muted transition-colors text-muted-foreground">
                                <Plus size={32} />
                                <span className="mt-2">Add a new URL</span>
                            </Link>
                        )}
                        {urls.length > 0 && (
                            urls.map((url) => (
                                <div key={url.id} className="border p-4 rounded-lg mb-4 flex flex-col">
                                    <Link href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate">
                                        {url.title || url.url}
                                    </Link>
                                    <p className="text-sm text-muted-foreground truncate">{url.description}</p>
                                    <div className="flex flex-row justify-between items-center mt-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="secondary" className="cursor-pointer">
                                                    View URL
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>{url.title || url.url}</DialogTitle>
                                                    <DialogDescription>
                                                        {url.description || "No description available."}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Button variant="outline" className="mt-4 w-full" asChild>
                                                    <Link href={url.url} target="_blank" rel="noopener noreferrer">
                                                        Open URL
                                                    </Link>
                                                </Button>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="outline" className="" asChild>
                                            <Link href={`/collections/${id}/edit/${url.id}`}>
                                                Edit URL
                                            </Link>
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" className="cursor-pointer" asChild>
                                                    <p>Delete URL</p>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure?</DialogTitle>
                                                    <DialogDescription>
                                                        By deleting this URL, it will be permanently removed from the collection. You will need to add it again manually if you want to restore it.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DeleteURL urlId={url.id} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))
                        )}
                        {urls.length === 0 && (
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