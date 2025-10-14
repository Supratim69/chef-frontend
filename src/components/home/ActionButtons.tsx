import React from "react";
import { Search } from "lucide-react";

interface ActionButtonsProps {
    handleSearch: () => void;
    clearAll: () => void;
    isSearching?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    handleSearch,
    clearAll,
    isSearching = false,
}) => {
    return (
        <div className="flex gap-3 mb-8">
            <button
                onClick={handleSearch}
                disabled={isSearching}
                className="flex-1 bg-cyan-400 text-white py-3 px-4 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSearching ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Searching...
                    </>
                ) : (
                    <>
                        <Search className="w-5 h-5" />
                        Search Recipes
                    </>
                )}
            </button>
            <button
                onClick={clearAll}
                className="px-6 py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                Clear
            </button>
        </div>
    );
};

export default ActionButtons;
