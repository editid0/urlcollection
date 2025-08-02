"use client";

import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
    return (
        <>
            <div className="w-full bg-accent p-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center justify-start gap-4">
                        <Link className="text-lg font-semibold hover:underline" href={"/"}>URL Store</Link>
                        <Link className="text-md text-muted-foreground hover:underline" href={"/collections"}>Your collections</Link>
                        <Link className="text-md text-muted-foreground hover:underline" href={"https://editid.fillout.com/urlstore"} target="_blank">Feedback</Link>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-4">
                        <ClerkLoaded>
                            <SignedOut>
                                <Button variant={"outline"} asChild>
                                    <SignInButton />
                                </Button>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Button variant={"outline"} disabled>
                                Loading...
                            </Button>
                        </ClerkLoading>
                    </div>
                </div>
            </div>
        </>
    )
}