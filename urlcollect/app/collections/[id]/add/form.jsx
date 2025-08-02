"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useState } from "react";

export default function AddURLForm() {
    const [url_, setUrl] = useState("");
    const url = useDebounce(url_, 500);
    const [url_valid, setUrlValid] = useState(null);
    const [autofillMeta, setAutofillMeta] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function checkURL() {
        if (!url) {
            setUrlValid(null);
            return;
        };
        fetch(`/api/validate?url=${encodeURIComponent(url)}&meta=${autofillMeta}`)
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    console.log("URL validation response:", data);
                    setUrlValid(true);
                    if (autofillMeta) {
                        setTitle(data.title || "");
                        setDescription(data.description || "");
                    }
                } else {
                    setUrlValid(false);
                    const text = await response.text();
                    throw new Error(text);
                }
            })
            .catch(error => {
                setUrlValid(false);
                console.error("Error validating URL:", error);
            });
    }

    useEffect(() => {
        if (url) {
            checkURL();
        } else {
            setUrlValid(null);
        }
    }, [url]);

    useEffect(() => {
        if (autofillMeta && (title === "" || description === "")) {
            setTitle("");
            setDescription("");
            checkURL();
        }
    }, [autofillMeta]);

    return (
        <>
            <div className="max-w-sm mx-auto mt-6">
                <Label className="text-lg font-semibold mb-2">
                    URL to add
                </Label>
                <Input type="url" placeholder="https://example.com" value={url_} onChange={(e) => { setUrl(e.target.value || "") }} className={url_valid === false ? "dark:bg-red-500/10 bg-red-500/20" : url_valid === true ? "bg-green-500/20 dark:bg-green-500/10" : url_valid === null ? "dark:bg-input/30 bg-transparent" : ""} />
                <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                    <Switch checked={autofillMeta} onCheckedChange={setAutofillMeta} />
                    <Label className="">Autofill metadata</Label>
                </div>
                <Label className="text-lg font-semibold mt-4 mb-2">
                    Title
                </Label>
                <Input type="text" placeholder="Title of the URL" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-muted rounded-md p-2 mt-1 w-full" disabled={autofillMeta} />
                <Label className="text-lg font-semibold mt-4 mb-2">
                    Description
                </Label>
                <Textarea placeholder="Description of the URL" value={description} onChange={(e) => setDescription(e.target.value)} className="border-2 border-muted rounded-md p-2 mt-1 w-full" disabled={autofillMeta} />
                <Button className="mt-4 cursor-pointer" variant={"outline"} onClick={() => {
                    if (!url || !title) {
                        alert("Please fill in url and title.");
                        return;
                    }
                }}>
                    Add URL
                </Button>
            </div>
        </>
    )
}