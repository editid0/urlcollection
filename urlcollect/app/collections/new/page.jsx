import { Button } from "@/components/ui/button";

export default function NewCollectionPage() {
    return (
        <div className="w-full mt-4 px-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4">
                <h1 className="text-4xl font-bold">Create New Collection</h1>
            </div>
            <div className="mt-6">
                <form>
                    <input type="text" placeholder="Collection Name" className="input input-bordered w-full mb-4" />
                    <textarea placeholder="Description" className="textarea textarea-bordered w-full mb-4"></textarea>
                    <Button type="submit" variant={"primary"}>Create Collection</Button>
                </form>
            </div>
        </div>
    );
}