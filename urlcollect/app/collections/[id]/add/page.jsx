import { currentUser } from "@clerk/nextjs/server";

export default async function AddURLToCollection({ params }) {
    const { id } = await params;
    const user = await currentUser();

    return (
        <div>
            <h1>Add a new URL to Collection {id}</h1>
        </div>
    );
}
