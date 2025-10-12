import React from "react";
import { ChevronLeft } from "lucide-react";

interface SearchResultsHeaderProps {
    onBack?: () => void;
    searchIngredients?: string[];
    dietaryPrefs?: string[];
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
    onBack,
    searchIngredients = [],
    dietaryPrefs = [],
}) => {
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    };

    return (
        <div className="border-b border-gray-200">
            <div className="flex items-center justify-center py-6 relative">
                <button
                    onClick={handleBack}
                    className="absolute left-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Go back"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Search Results</h1>
            </div>

            {searchIngredients.length > 0 && (
                <div className="px-6 pb-4">
                    <div className="text-sm text-gray-600 mb-2">
                        Searching with ingredients:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {searchIngredients.map((ingredient, index) => (
                            <span
                                key={index}
                                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>

                    {dietaryPrefs.length > 0 && (
                        <div className="mt-3">
                            <div className="text-sm text-gray-600 mb-2">
                                Dietary preferences:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {dietaryPrefs.map((pref, index) => (
                                    <span
                                        key={index}
                                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {pref}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResultsHeader;
