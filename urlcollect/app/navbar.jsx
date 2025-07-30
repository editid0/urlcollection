import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavBar() {
    return (
        <>
            <div className="w-full bg-accent p-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center justify-start gap-4">
                        <p className="text-lg font-semibold">URL Store</p>
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