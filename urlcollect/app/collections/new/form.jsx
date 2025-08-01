"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import moment from "moment-timezone";

export default function NewCollectionForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = {
            name,
            description,
        };
        fetch('/api/collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    setSuccess(true);
                    setError("");
                    setName("");
                    setDescription("");
                    window.location.href = "/collections";
                } else {
                    return response.text().then(text => {
                        setError(text);
                        setSuccess(false);
                    });
                }
            })
            .catch(error => {
                setError("An error occurred while creating the collection.");
                setSuccess(false);
            });
    }

    return (
        <>
            <div className="flex flex-col items-center mt-6">
                <div className="w-full max-w-md">
                    <Label htmlFor="collection-name">Collection Name</Label>
                    <Input id="collection-name" className="border-2 border-muted rounded-md p-2 mt-1 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-4 w-full max-w-md">
                    <Label htmlFor="collection-description">Description</Label>
                    <Textarea id="collection-description" className="border-2 border-muted rounded-md p-2 mt-1 w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <Button className="mt-4 cursor-pointer" variant={"outline"} onClick={handleSubmit}>
                        Create new Collection
                    </Button>
                </div>
            </div>
        </>
    )
}