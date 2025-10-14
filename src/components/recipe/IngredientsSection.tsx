import React from "react";

interface Ingredient {
    text: string;
    available: boolean;
}

interface IngredientsSectionProps {
    ingredients: Ingredient[];
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({
    ingredients,
}) => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-cyan-400">🥬</span>
                <h3 className="font-semibold text-gray-800">Ingredients</h3>
            </div>
            <ul className="space-y-2 pl-4">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span className="text-gray-700 flex-1">
                            {ingredient.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientsSection;
