"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from "lucide-react"
import { useState } from "react";

export default function DeleteButton({ collectionId }) {
    const [deleted, setDeleted] = useState(false);

    function handleDelete() {
        fetch(`/api/collection/${collectionId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setDeleted(true);
                } else {
                    console.error("Failed to delete collection");
                }
            })
            .catch(error => {
                console.error("An error occurred while deleting the collection:", error);
            });
    }

    function handleOpenChange(open) {
        if (!open && deleted) {
            window.location.reload();
        }
    }

    return (
        <>
            <div className="w-full">
                <Dialog onOpenChange={handleOpenChange}>
                    <Button variant={"destructive"} size={"icon"} asChild className={"cursor-pointer"}>
                        <DialogTrigger><Trash /></DialogTrigger>
                    </Button>
                    <DialogContent>
                        {!deleted ? (

                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete this collection, and all URLs within it.
                                </DialogDescription>
                                <Button variant={"destructive"} onClick={handleDelete} className={"cursor-pointer"}>
                                    Yes, delete this collection
                                </Button>
                            </DialogHeader>
                        ) : (
                            <DialogHeader>
                                <DialogTitle>Collection deleted</DialogTitle>
                                <DialogDescription>
                                    Your collection has been successfully deleted.
                                </DialogDescription>
                            </DialogHeader>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}