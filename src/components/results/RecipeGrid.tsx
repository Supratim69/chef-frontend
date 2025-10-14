import React from "react";
import RecipeCard from "./RecipeCard";

interface Recipe {
    id: string;
    title: string;
    time: string;
    difficulty: string;
    tags: string[];
    image: string;
}

interface RecipeGridProps {
    recipes: Recipe[];
    onRecipeClick?: (recipe: Recipe) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onRecipeClick }) => {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
            <div className="grid grid-cols-2 gap-4">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={
                            onRecipeClick
                                ? () => onRecipeClick(recipe)
                                : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipeGrid;
