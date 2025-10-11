import React from "react";

interface DietaryPreferences {
    veg: boolean;
    nonVeg: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
}

interface IngredientsInputProps {
    ingredientInput: string;
    setIngredientInput: (value: string) => void;
    ingredients: string[];
    addIngredient: () => void;
    removeIngredient: (index: number) => void;
    dietaryPrefs: DietaryPreferences;
    toggleDietaryPref: (pref: keyof DietaryPreferences) => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
}

const IngredientsInput: React.FC<IngredientsInputProps> = ({
    ingredientInput,
    setIngredientInput,
    ingredients,
    addIngredient,
    removeIngredient,
    dietaryPrefs,
    toggleDietaryPref,
    handleKeyPress,
}) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">
                What ingredients do you have?
            </h3>

            {/* Input with Add Button */}
            <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🍴
                    </span>
                    <input
                        type="text"
                        placeholder="e.g., chicken, broccoli, pasta"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>
                <button
                    onClick={addIngredient}
                    className="bg-cyan-400 text-white p-3 rounded-xl hover:bg-cyan-500 transition-colors"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>

            {/* Upload Photo Button */}
            <button className="w-full py-3 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium flex items-center justify-center gap-2 mb-4 hover:bg-gray-50">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                Upload a photo of your ingredients
            </button>

            {/* Dietary Preferences */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Dietary Preferences:
                </h4>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => toggleDietaryPref("veg")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            dietaryPrefs.veg
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        🥕 Veg
                    </button>
                    <button
                        onClick={() => toggleDietaryPref("nonVeg")}
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-colors ${
                            dietaryPrefs.nonVeg
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                        Non-Veg
                    </button>
                    <button
                        onClick={() => toggleDietaryPref("glutenFree")}
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-colors ${
                            dietaryPrefs.glutenFree
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        ♡ Gluten-Free
                    </button>
                    <button
                        onClick={() => toggleDietaryPref("dairyFree")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            dietaryPrefs.dairyFree
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        or Dairy-Free
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        + More
                    </button>
                </div>
            </div>

            {/* Your Ingredients */}
            <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Your Ingredients:
                </h4>
                {ingredients.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                        No ingredients added yet. Add some above!
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {ingredients.map((ingredient, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-2"
                            >
                                {ingredient}
                                <button
                                    onClick={() => removeIngredient(index)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IngredientsInput;
