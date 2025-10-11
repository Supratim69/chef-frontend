import React from "react";

interface Substitute {
    ingredient: string;
    substitute: string;
}

interface MissingIngredientsProps {
    substitutes: Substitute[];
}

const MissingIngredients: React.FC<MissingIngredientsProps> = ({
    substitutes,
}) => {
    return (
        <div className="mb-6 bg-orange-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-500">🍃</span>
                <h3 className="font-semibold text-orange-700">
                    Missing Ingredient Substitutes
                </h3>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
                {substitutes.map((item, index) => (
                    <p key={index}>
                        <strong>For {item.ingredient}:</strong>{" "}
                        {item.substitute}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default MissingIngredients;
