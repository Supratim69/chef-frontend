"use client";
import React, { useState } from "react";
import {
    ProfileHeader,
    UserProfileSection,
    ProfileMenuItems,
    LogoutButton,
} from "./";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
        }
    };

    return (
        <AppLayout>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <ProfileHeader />

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6">
                    <UserProfileSection
                        name={user?.name || "User"}
                        email={user?.email || "user@example.com"}
                        avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop"
                    />

                    <ProfileMenuItems />
                    <LogoutButton onLogout={handleLogout} />
                </div>
            </div>
        </AppLayout>
    );
}
