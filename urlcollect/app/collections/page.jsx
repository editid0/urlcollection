import { Button } from "@/components/ui/button";
import pool from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import moment from "moment-timezone";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DeleteButton from "./DeleteButton";

export default async function UrlsPage() {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const raw_data = await pool.query(`
        SELECT * FROM collections WHERE user_id = $1
    `, [user.id]);
    if (!raw_data || !raw_data.rows) {
        return null;
    }
    const data = raw_data.rows;
    return (
        <>
            <div className="w-full mt-4 px-2 max-w-[30cm] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4 w-fit">
                    <h1 className="text-4xl font-bold">Your Collections</h1>
                </div>
                <div className="flex flex-row justify-center items-center flex-wrap mt-6 gap-4">
                    {[...data, {
                        id: "new",
                        name: "Create a new collection",
                        description: "Sort and search your saved URLs",
                        isNew: true,
                    }].map((collection) => (
                        <div
                            key={collection.id}
                            className="flex flex-col justify-between mt-4 border-2 rounded-xl border-muted p-4 max-w-sm w-full mx-2 flex-1 min-w-[250px]"
                        >
                            <div>
                                <h2 className="text-2xl font-semibold">{collection.name}</h2>
                                <p className="text-muted-foreground">{collection.description}</p>
                                {!collection.isNew && (
                                    <>
                                        <p className="text-sm text-muted-foreground">
                                            Created: {moment(collection.created_at).fromNow()}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Updated: {moment(collection.updated_at).fromNow()}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="max-w-full flex flex-row items-center mt-2 gap-1">
                                <Button variant={"outline"} asChild className={collection.isNew ? "w-full" : "w-7/8"}>
                                    <Link href={collection.isNew ? `/collections/new` : `/collections/${collection.id}`}>
                                        {collection.isNew ? "Create Collection" : "View Collection"}
                                    </Link>
                                </Button>
                                {!collection.isNew && (
                                    <div className="">
                                        <DeleteButton collectionId={collection.id} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}