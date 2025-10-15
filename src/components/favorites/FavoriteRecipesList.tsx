import React from "react";
import RecipeCard from "./RecipeCard";
import type { Favorite } from "@/types/api";

interface FavoriteRecipesListProps {
    favorites: Favorite[];
    onViewRecipe: (recipeId: string) => void;
    onRemoveFavorite: (recipeId: string) => void;
}

const FavoriteRecipesList: React.FC<FavoriteRecipesListProps> = ({
    favorites,
    onViewRecipe,
    onRemoveFavorite,
}) => {
    return (
        <div className="flex-1 overflow-y-auto px-6 py-6">
            {favorites.map((favorite) => (
                <RecipeCard
                    key={favorite.id}
                    favorite={favorite}
                    onViewRecipe={onViewRecipe}
                    onRemoveFavorite={onRemoveFavorite}
                />
            ))}
        </div>
    );
};

export default FavoriteRecipesList;
