import React from "react";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    return (
        <button
            onClick={onLogout}
            className="w-full bg-cyan-400 text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-cyan-500 transition-colors shadow-sm"
        >
            <LogOut className="w-5 h-5" />
            Log Out
        </button>
    );
};

export default LogoutButton;
