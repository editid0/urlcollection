"use client";

import { Button } from "@/components/ui/button";

export default function DeleteURL({ urlId }) {
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this URL? This action cannot be undone.")) {
            try {
                const response = await fetch(`/api/urls`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: urlId })
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    const errorText = await response.text();
                    alert(`Error deleting URL: ${errorText}`);
                }
            } catch (error) {
                console.error("Error deleting URL:", error);
                alert("An error occurred while deleting the URL.");
            }
        }
    };

    return (
        <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">
            Delete URL
        </Button>
    );
}