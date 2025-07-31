import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewCollectionPage() {
    return (
        <>
            <div className="w-full mt-4 px-2 max-w-[30cm] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4">
                    <h1 className="text-4xl font-bold">Create a collection</h1>
                </div>
                <div className="flex flex-col items-center mt-6">
                    <div className="w-full max-w-md">
                        <Label htmlFor="collection-name">Collection Name</Label>
                        <Input id="collection-name" className="border-2 border-muted rounded-md p-2 mt-1 w-full" />
                    </div>
                    <div className="mt-4 w-full max-w-md">
                        <Label htmlFor="collection-description">Description</Label>
                        <Textarea id="collection-description" className="border-2 border-muted rounded-md p-2 mt-1 w-full" />
                    </div>
                </div>
            </div>
        </>
    );
}