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
        </div>
    );
}
