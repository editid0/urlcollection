"use server";
import { unstable_noStore } from "next/cache";

const accounts = [
    {
        username: "demo1",
        password: "demo1",
    },
    {
        username: "demo2",
        password: "ensure",
    },
    {
        username: "demo3",
        password: "refund",
    },
    {
        username: "demo4",
        password: "anger",
    },
    {
        username: "demo5",
        password: "lobby",
    },
    {
        username: "demo6",
        password: "wire",
    },
    {
        username: "demo7",
        password: "moment",
    },
    {
        username: "demo8",
        password: "record",
    },
] // these are fine to leave in the repo cuz I will occasionally purge these accounts and create new ones, and delete all data associated with them.

function getDemoAccount() {
    return accounts[Math.floor(Math.random() * accounts.length)];
}

export default async function DemoAccount() {
    unstable_noStore();

    const { username, password } = getDemoAccount();
    return (
        <div className="demo-card">
            <p><strong>Username:</strong> <span className="font-mono text-muted-foreground">{username}</span></p>
            <p><strong>Password:</strong> <span className="font-mono text-muted-foreground">{password}</span></p>
            <div className="text-muted-foreground mt-2 text-left border-2 p-4 rounded-lg">
                <p className="text-lg text-foreground font-semibold">Notices:</p>
                <p>Please note that these accounts are shared, so other users may be logged in with the same credentials.</p>
                <p>When you sign in, anyone signed into the same account can see your IP, so please make your own account if you need privacy.</p>
                <p>Do not use these accounts for any sensitive activities.</p>
                <p>These accounts may occasionally be reset or deleted, so please use them responsibly.</p>
                <p>Please sign out when you are done.</p>
                <p>Please do not change the username or password.</p>
            </div>
        </div>
    );
}
