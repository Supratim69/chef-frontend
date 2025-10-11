import React from "react";
import { Heart, Home, User } from "lucide-react";

interface BottomNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    activeTab,
    setActiveTab,
}) => {
    return (
        <div className="border-t border-gray-200 bg-white mt-auto">
            <div className="flex justify-around py-2">
                <button
                    onClick={() => setActiveTab("home")}
                    className="flex flex-col items-center gap-1 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                    <Home
                        className={`w-6 h-6 ${
                            activeTab === "home"
                                ? "text-cyan-400"
                                : "text-gray-400"
                        }`}
                    />
                    <span
                        className={`text-xs font-medium ${
                            activeTab === "home"
                                ? "text-cyan-400"
                                : "text-gray-600"
                        }`}
                    >
                        Home
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab("favorites")}
                    className="flex flex-col items-center gap-1 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                    <Heart
                        className={`w-6 h-6 ${
                            activeTab === "favorites"
                                ? "text-cyan-400"
                                : "text-gray-400"
                        }`}
                    />
                    <span
                        className={`text-xs ${
                            activeTab === "favorites"
                                ? "text-cyan-400 font-medium"
                                : "text-gray-600"
                        }`}
                    >
                        Favorites
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab("profile")}
                    className="flex flex-col items-center gap-1 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                    <User
                        className={`w-6 h-6 ${
                            activeTab === "profile"
                                ? "text-cyan-400"
                                : "text-gray-400"
                        }`}
                    />
                    <span
                        className={`text-xs ${
                            activeTab === "profile"
                                ? "text-cyan-400 font-medium"
                                : "text-gray-600"
                        }`}
                    >
                        Profile
                    </span>
                </button>
            </div>
        </div>
    );
};

export default BottomNavigation;
