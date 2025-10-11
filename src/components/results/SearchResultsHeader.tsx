import React from "react";
import { ChevronLeft } from "lucide-react";

interface SearchResultsHeaderProps {
    onBack?: () => void;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
    onBack,
}) => {
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            // Default back behavior - can be customized later
            window.history.back();
        }
    };

    return (
        <div className="flex items-center justify-center py-6 border-b border-gray-200 relative">
            <button
                onClick={handleBack}
                className="absolute left-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Search Results</h1>
        </div>
    );
};

export default SearchResultsHeader;
