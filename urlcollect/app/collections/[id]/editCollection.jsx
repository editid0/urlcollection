"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


export default function EditCollection({ id, name, description, isPublic }) {
    const [_name, setName] = useState(name || "");
    const [_description, setDescription] = useState(description || "");
    const [_isPublic, setIsPublic] = useState(isPublic || false);
    const [isOpen, setIsOpen] = useState(false);

    async function saveChanges(id, name, description, isPublic) {
        const response = await fetch("/api/collection/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name, description, isPublic }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Error saving changes:", error);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <Button variant="outline" className="mt-4" asChild>
                    <DialogTrigger>
                        Edit Collection
                    </DialogTrigger>
                </Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Collection</DialogTitle>
                    </DialogHeader>
                    <>
                        <Input value={_name} onChange={(e) => setName(e.target.value)} />
                        <Input value={_description} onChange={(e) => setDescription(e.target.value)} />
                        <div className="flex flex-row items-center space-x-2 justify-start">
                            <Checkbox checked={_isPublic} onCheckedChange={(checked) => setIsPublic(checked)} id="isPublic" />
                            <Label htmlFor="isPublic" className={"ml-0"}>Publicly accessible?</Label>
                        </div>
                        <Button type="submit" onClick={() => saveChanges(id, _name, _description, _isPublic)}>Save Changes</Button>
                    </>
                </DialogContent>
            </Dialog>
        </>
    )
}