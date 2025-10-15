import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <div className="text-center py-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
                <span className="relative inline-block">
                    C
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-black"></span>
                </span>
                <span className="relative inline-block">
                    h
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-black"></span>
                </span>
                <span>ef</span>
            </h1>

            {/* Welcome Message */}
            <div className="text-sm">
                {isAuthenticated && user ? (
                    <p className="text-cyan-600 font-medium text-lg">
                        Ready to cook, {user.name}? 👨‍🍳
                    </p>
                ) : (
                    <p className="text-gray-600">
                        Transform your ingredients into masterpieces 🍽️
                    </p>
                )}
            </div>
        </div>
    );
};

export default Header;
