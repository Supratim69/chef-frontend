"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function useAuthNavigation() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const navigateWithAuth = (path: string) => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=${encodeURIComponent(path)}`);
        } else {
            router.push(path);
        }
    };

    return { navigateWithAuth, isAuthenticated };
}
