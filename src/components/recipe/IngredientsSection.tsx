import React from "react";
import { Check, X } from "lucide-react";

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
            <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            {ingredient.available ? (
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-green-600" />
                                </div>
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                    <X className="w-3 h-3 text-red-500" />
                                </div>
                            )}
                        </div>
                        <span
                            className={
                                ingredient.available
                                    ? "text-gray-700"
                                    : "text-red-400"
                            }
                        >
                            {ingredient.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientsSection;
