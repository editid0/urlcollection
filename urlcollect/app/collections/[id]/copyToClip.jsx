"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";

export default function CopyToClipboardButton({ text }) {
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const hasCopiedText = Boolean(copiedText);

    return (
        <Button onClick={() => copyToClipboard(text)}>
            {hasCopiedText ? "Copied!" : "Copy to Clipboard"}
        </Button>
    );
}
