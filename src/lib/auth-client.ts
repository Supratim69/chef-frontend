import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    fetchOptions: {
        credentials: "include", // Important for cookies
    },
});

export type Session = typeof authClient.$Infer.Session;
