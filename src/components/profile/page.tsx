"use client";
import React, { useState } from "react";
import {
    ProfileHeader,
    UserProfileSection,
    ProfileMenuItems,
    LogoutButton,
} from "./";
import BottomNavigation from "../home/BottomNavigation";

export default function ChefProfile() {
    const [activeTab, setActiveTab] = useState("profile");

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            alert("Logged out successfully!");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <ProfileHeader />

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 pb-20">
                    <UserProfileSection
                        name="Anya Petrova"
                        email="anya.petrova@recipesavvy.com"
                        avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop"
                    />

                    <ProfileMenuItems />
                    <LogoutButton onLogout={handleLogout} />
                </div>

                <BottomNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    );
}
