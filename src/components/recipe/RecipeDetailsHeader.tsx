import React from "react";
import { ArrowLeft } from "lucide-react";

interface RecipeDetailsHeaderProps {
    onBack?: () => void;
}

const RecipeDetailsHeader: React.FC<RecipeDetailsHeaderProps> = ({
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
        <div className="flex items-center py-6 border-b border-gray-200 px-6 relative">
            <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
            >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <h1 className="text-xl font-bold text-gray-900">
                    Recipe Details
                </h1>
            </div>
        </div>
    );
};

export default RecipeDetailsHeader;
