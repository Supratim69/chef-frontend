import React from "react";

interface NutritionalData {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}

interface NutritionalInfoProps {
    nutrition: NutritionalData;
}

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ nutrition }) => {
    return (
        <div className="mb-6">
            <h3 className="font-semibold mb-4 text-gray-800">
                Nutritional Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                        {nutrition.calories} kcal
                    </p>
                    <p className="text-gray-600 text-sm">Calories</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                        {nutrition.protein} g
                    </p>
                    <p className="text-gray-600 text-sm">Protein</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                        {nutrition.fat} g
                    </p>
                    <p className="text-gray-600 text-sm">Fat</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-cyan-400">
                        {nutrition.carbs} g
                    </p>
                    <p className="text-gray-600 text-sm">Carbs</p>
                </div>
            </div>
        </div>
    );
};

export default NutritionalInfo;
