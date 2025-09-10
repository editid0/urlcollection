"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Link from "next/link";
import DeleteURL from "./deleteButton";
import { useState } from "react";
import Fuse from 'fuse.js'

export default function ClientSideList({ urls, id }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUrls, setFilteredUrls] = useState(urls);

    const fuse = new Fuse(urls, {
        keys: ["title", "url", "description"],
        includeScore: true,
    });

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            const results = fuse.search(value);
            setFilteredUrls(results.map(result => result.item));
        } else {
            setFilteredUrls(urls);
        }
    };
    return (
        <>
            {urls.length > 0 && (
                <Input placeholder="Search URLs..." className="mt-2 max-w-sm" value={searchTerm} onChange={handleSearch} />
            )}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {urls.length > 0 && (
                    <Link href={`/collections/${id}/add`} className="border border-dashed hover:border-solid p-4 rounded-lg mb-4 flex flex-col items-center justify-center hover:bg-muted transition-colors text-muted-foreground">
                        <Plus size={32} />
                        <span className="mt-2">Add a new URL</span>
                    </Link>
                )}
                {urls.length > 0 && (
                    filteredUrls.map((url) => (
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
                {(filteredUrls.length === 0 || urls.length === 0) && (
                    <div className="h-fit py-3 border-2 border-dashed rounded-lg text-center">
                        <p className="text-muted-foreground">No URLs found in this collection.</p>
                        <Button variant="outline" asChild className="mt-2">
                            <Link href={`/collections/${id}/add`}>
                                Add a new URL
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}