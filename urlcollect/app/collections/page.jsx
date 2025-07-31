import { Button } from "@/components/ui/button";
import pool from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import moment from "moment-timezone";

export default async function UrlsPage() {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    // const data = await pool.query(`
    //     SELECT * FROM collections WHERE user_id = $1
    // `, [user.id]);
    const data = [
        {
            id: 1,
            name: "name",
            created_at: moment().subtract(1, 'days'),
            updated_at: moment(),
            urls: ['73ad3345-d148-4657-9f84-7851766016ae', 'bcea45bf-e064-48c9-aba1-62660ac5dc71'],
            user_id: user.id,
            description: "This is a sample collection",
        },
        {
            id: 2,
            name: "name",
            created_at: moment().subtract(1, 'days'),
            updated_at: moment(),
            urls: ['73ad3345-d148-4657-9f84-7851766016ae', 'bcea45bf-e064-48c9-aba1-62660ac5dc71'],
            user_id: user.id,
            description: "This is a sample collection",
        },
        {
            id: 3,
            name: "name",
            created_at: moment().subtract(1, 'days'),
            updated_at: moment(),
            urls: ['73ad3345-d148-4657-9f84-7851766016ae', 'bcea45bf-e064-48c9-aba1-62660ac5dc71'],
            user_id: user.id,
            description: "This is a sample collection",
        },
        {
            id: 4,
            name: "name",
            created_at: moment().subtract(1, 'days'),
            updated_at: moment(),
            urls: ['73ad3345-d148-4657-9f84-7851766016ae', 'bcea45bf-e064-48c9-aba1-62660ac5dc71'],
            user_id: user.id,
            description: "This is a sample collection",
        },
    ]
    return (
        <>
            <div className="w-full mt-4 px-2 max-w-[30cm] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4">
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
                                            Created at: {moment(collection.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Updated at: {moment(collection.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
                                        </p>
                                    </>
                                )}
                            </div>
                            <Button variant={"outline"} asChild className="mt-2">
                                <Link href={collection.isNew ? `/collections/new` : `/collections/${collection.id}`}>
                                    {collection.isNew ? "Create Collection" : "View Collection"}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}