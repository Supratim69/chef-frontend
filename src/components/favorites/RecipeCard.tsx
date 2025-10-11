import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

interface Recipe {
    id: number;
    title: string;
    description: string;
    time: string;
    image: string;
}

interface RecipeCardProps {
    recipe: Recipe;
    onViewRecipe: (title: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewRecipe }) => {
    return (
        <div className="mb-6">
            {/* Recipe Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                {/* Recipe Image with Title Overlay */}
                <div className="relative h-48">
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={800}
                        height={192}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                        {recipe.title}
                    </h3>
                </div>

                {/* Recipe Info */}
                <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">
                        {recipe.description}
                    </p>

                    {/* Time */}
                    <div className="flex items-center gap-1 text-cyan-400 mb-4">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {recipe.time}
                        </span>
                    </div>

                    {/* View Recipe Button */}
                    <button
                        onClick={() => onViewRecipe(recipe.title)}
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
