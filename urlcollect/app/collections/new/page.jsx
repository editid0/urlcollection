import NewCollectionForm from "./form";

export default function NewCollectionPage() {
    return (
        <>
            <div className="w-full mt-4 px-2 max-w-[30cm] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4 w-fit">
                    <h1 className="text-4xl font-bold">Create a new collection</h1>
                </div>
                <NewCollectionForm />
            </div>
        </>
    );
}