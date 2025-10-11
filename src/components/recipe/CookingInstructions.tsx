import React from "react";

interface CookingInstructionsProps {
    instructions: string[];
}

const CookingInstructions: React.FC<CookingInstructionsProps> = ({
    instructions,
}) => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-cyan-400">📖</span>
                <h3 className="font-semibold text-gray-800">
                    Cooking Instructions
                </h3>
            </div>
            <div className="space-y-4">
                {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                        </span>
                        <p className="text-gray-700 text-sm flex-1">
                            {instruction}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CookingInstructions;
