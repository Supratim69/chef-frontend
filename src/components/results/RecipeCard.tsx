import React from "react";
import Image from "next/image";
import { Heart, Clock, ChefHat } from "lucide-react";

interface Recipe {
    id: number;
    title: string;
    time: string;
    difficulty: string;
    tags: string[];
    image: string;
}

interface RecipeCardProps {
    recipe: Recipe;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    recipe,
    isFavorite,
    onToggleFavorite,
    onClick,
}) => {
    return (
        <div
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer"
            onClick={onClick}
        >
            {/* Recipe Image */}
            <div className="relative h-40">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click
                        onToggleFavorite();
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    <Heart
                        className={`w-5 h-5 ${
                            isFavorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                        }`}
                    />
                </button>
            </div>

            {/* Recipe Info */}
            <div className="p-4">
                <h3 className="font-bold text-base mb-3 text-gray-800">
                    {recipe.title}
                </h3>

                {/* Time and Difficulty */}
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ChefHat className="w-3.5 h-3.5" />
                        <span>{recipe.difficulty}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-1">
                    {recipe.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs text-gray-600">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
