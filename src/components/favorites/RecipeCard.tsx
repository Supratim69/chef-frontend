import React from "react";
import Image from "next/image";
import { Clock, Heart } from "lucide-react";
import type { Favorite } from "@/types/api";

interface RecipeCardProps {
    favorite: Favorite;
    onViewRecipe: (recipeId: string) => void;
    onRemoveFavorite: (recipeId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    favorite,
    onViewRecipe,
    onRemoveFavorite,
}) => {
    // Get recipe details from the favorite object
    const recipe = favorite.recipe;
    const recipeTitle =
        recipe?.title || favorite.recipeName || "Unknown Recipe";
    const recipeImage =
        recipe?.imageUrl ||
        favorite.recipeImage ||
        `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop`;

    // Calculate time display
    const getTimeDisplay = () => {
        if (recipe?.prepTimeMins && recipe?.cookTimeMins) {
            const total = recipe.prepTimeMins + recipe.cookTimeMins;
            return `${total} min`;
        } else if (recipe?.prepTimeMins) {
            return `${recipe.prepTimeMins} min prep`;
        } else if (recipe?.cookTimeMins) {
            return `${recipe.cookTimeMins} min cook`;
        }
        return "Time varies";
    };

    // Get recipe description
    const getDescription = () => {
        if (recipe?.instructions) {
            // Show first 100 characters of instructions
            return recipe.instructions.length > 100
                ? recipe.instructions.substring(0, 100) + "..."
                : recipe.instructions;
        }
        return `A delicious ${
            recipe?.cuisine || favorite.cuisine || ""
        } recipe that you've saved to your favorites.`.trim();
    };

    return (
        <div className="mb-6">
            {/* Recipe Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                {/* Recipe Image with Title Overlay */}
                <div className="relative h-48">
                    <Image
                        src={recipeImage}
                        alt={recipeTitle}
                        width={800}
                        height={192}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback image if the original fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl pr-4">
                        {recipeTitle}
                    </h3>

                    {/* Remove from favorites button */}
                    <button
                        onClick={() => onRemoveFavorite(favorite.recipeId)}
                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        title="Remove from favorites"
                    >
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                    </button>
                </div>

                {/* Recipe Info */}
                <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">
                        {getDescription()}
                    </p>

                    {/* Recipe Details */}
                    <div className="flex items-center gap-4 mb-4">
                        {/* Time */}
                        <div className="flex items-center gap-1 text-cyan-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {getTimeDisplay()}
                            </span>
                        </div>

                        {/* Cuisine/Diet tags */}
                        {(recipe?.cuisine || recipe?.diet) && (
                            <div className="flex gap-2">
                                {recipe?.cuisine && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        {recipe.cuisine}
                                    </span>
                                )}
                                {recipe?.diet && (
                                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                                        {recipe.diet}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Saved date */}
                    <p className="text-xs text-gray-400 mb-3">
                        Saved on{" "}
                        {new Date(favorite.dateSaved).toLocaleDateString()}
                    </p>

                    {/* View Recipe Button */}
                    <button
                        onClick={() => onViewRecipe(favorite.recipeId)}
                        className="w-full bg-cyan-400 text-white py-3 rounded-xl font-semibold hover:bg-cyan-500 transition-colors"
                    >
                        View Recipe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
