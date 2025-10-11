import React from "react";
import { Bell, User, Settings, ChevronRight } from "lucide-react";

interface MenuItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
}

const ProfileMenuItems = () => {
    const menuItems: MenuItem[] = [
        {
            id: "notifications",
            icon: <Bell className="w-5 h-5 text-cyan-400" />,
            title: "Notification Settings",
            description: "Manage your app alerts and sounds",
            onClick: () => console.log("Navigate to notification settings"),
        },
        {
            id: "account",
            icon: <User className="w-5 h-5 text-cyan-400" />,
            title: "Account Information",
            description: "Update your personal details and preferences",
            onClick: () => console.log("Navigate to account information"),
        },
        {
            id: "preferences",
            icon: <Settings className="w-5 h-5 text-cyan-400" />,
            title: "App Preferences",
            description: "Customize your experience and settings",
            onClick: () => console.log("Navigate to app preferences"),
        },
    ];

    return (
        <div className="space-y-4 mb-8">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={item.onClick}
                    className="w-full bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center flex-shrink-0">
                        {item.icon}
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-semibold text-lg mb-1 text-gray-800">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {item.description}
                        </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
                </button>
            ))}
        </div>
    );
};

export default ProfileMenuItems;
