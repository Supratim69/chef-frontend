"use client";

import BottomNavigation from "@/components/home/BottomNavigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface AppLayoutProps {
    children: React.ReactNode;
    showBottomNav?: boolean;
}

export default function AppLayout({
    children,
    showBottomNav = true,
}: AppLayoutProps) {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("home");

    // Update active tab based on current pathname
    useEffect(() => {
        if (pathname === "/") setActiveTab("home");
        else if (pathname === "/favorites") setActiveTab("favorites");
        else if (pathname === "/profile") setActiveTab("profile");
    }, [pathname]);

    // Show bottom navigation on specific pages
    const shouldShowBottomNav =
        showBottomNav && ["/", "/favorites", "/profile"].includes(pathname);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 pb-20">{children}</main>
            {shouldShowBottomNav && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <BottomNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
            )}
        </div>
    );
}
