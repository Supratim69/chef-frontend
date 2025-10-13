"use client";
import React from "react";
import {
    ProfileHeader,
    UserProfileSection,
    ProfileMenuItems,
    LogoutButton,
} from "./";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
    const { user, logout, isLoading } = useAuth();

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            await logout();
        }
    };

    if (isLoading) {
        return (
            <AppLayout>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                    <ProfileHeader />
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (!user) {
        return (
            <AppLayout>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                    <ProfileHeader />
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Not Authenticated
                            </h2>
                            <p className="text-gray-600">
                                Please log in to view your profile.
                            </p>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <ProfileHeader />

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6">
                    <UserProfileSection
                        name={user.name}
                        email={user.email}
                        avatarUrl={user.image}
                    />

                    <ProfileMenuItems />
                    <LogoutButton onLogout={handleLogout} />
                </div>
            </div>
        </AppLayout>
    );
}
