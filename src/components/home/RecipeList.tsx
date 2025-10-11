import React from "react";
import Image from "next/image";

interface Recipe {
    name: string;
    category: string;
    image: string;
}

interface RecipeListProps {
    recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
                Quick Start Recipe Ideas
            </h2>
            <div className="space-y-3">
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm"
                    >
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div>
                            <h3 className="font-semibold mb-1 text-gray-800">
                                {recipe.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {recipe.category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
