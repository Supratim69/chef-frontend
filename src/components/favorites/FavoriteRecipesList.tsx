import React from "react";
import RecipeCard from "./RecipeCard";

interface Recipe {
    id: number;
    title: string;
    description: string;
    time: string;
    image: string;
}

interface FavoriteRecipesListProps {
    recipes: Recipe[];
    onViewRecipe: (recipeId: number) => void;
}

const FavoriteRecipesList: React.FC<FavoriteRecipesListProps> = ({
    recipes,
    onViewRecipe,
}) => {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-6">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onViewRecipe={onViewRecipe}
                />
            ))}
        </div>
    );
};

export default FavoriteRecipesList;
