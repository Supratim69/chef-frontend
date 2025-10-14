import React from "react";

interface RecipeInfoData {
    calories: number;
    cookingTime: string;
    servings: number;
}

interface RecipeInfoProps {
    recipeInfo: RecipeInfoData;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipeInfo }) => {
    return (
        <div className="mb-6">
            <h3 className="font-semibold mb-4 text-gray-800">
                Recipe Information
            </h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                        {recipeInfo.calories}
                    </p>
                    <p className="text-gray-600 text-sm">Calories</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                        {recipeInfo.cookingTime}
                    </p>
                    <p className="text-gray-600 text-sm">Cooking Time</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                        {recipeInfo.servings}
                    </p>
                    <p className="text-gray-600 text-sm">Servings</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeInfo;
