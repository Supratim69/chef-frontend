import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/lib/api-client";

interface DietaryPreferences {
    vegan: boolean;
    veg: boolean;
    nonVeg: boolean;
    glutenFree: boolean;
}

interface IngredientsInputProps {
    ingredientInput: string;
    setIngredientInput: (value: string) => void;
    ingredients: string[];
    addIngredient: () => void;
    addMultipleIngredients: (ingredientsList: string[]) => void;
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
    addMultipleIngredients,
    removeIngredient,
    dietaryPrefs,
    toggleDietaryPref,
    handleKeyPress,
}) => {
    const { user } = useAuth();

    const [userDietPreference, setUserDietPreference] = useState<string | null>(
        null
    );
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load user's diet preference from backend
    useEffect(() => {
        const loadUserDietPreference = async () => {
            if (user) {
                try {
                    const response = await apiClient.getDietPreference(user.id);
                    setUserDietPreference(response.dietPreference);

                    // Auto-select user's diet preference if it matches our options
                    if (response.dietPreference) {
                        const prefMap: Record<
                            string,
                            keyof DietaryPreferences
                        > = {
                            vegetarian: "veg",
                            vegan: "vegan",
                            "non-veg": "nonVeg",
                            "gluten-free": "glutenFree",
                        };

                        const prefKey = prefMap[response.dietPreference];
                        if (prefKey && !dietaryPrefs[prefKey]) {
                            toggleDietaryPref(prefKey);
                        }
                    }
                } catch (error) {
                    console.error("Failed to load diet preference:", error);
                }
            }
        };

        loadUserDietPreference();
    }, [user, dietaryPrefs, toggleDietaryPref]);

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
        ];
        if (!allowedTypes.includes(file.type)) {
            alert("Please select a valid image file (JPEG, PNG, WebP, or GIF)");
            return;
        }

        // Validate file size (max 10MB to match backend)
        if (file.size > 10 * 1024 * 1024) {
            alert("Image size should be less than 10MB");
            return;
        }

        setUploadingImage(true);

        try {
            // Upload to backend using API client
            const result = await apiClient.uploadImage(file);

            if (result.ingredients && Array.isArray(result.ingredients)) {
                // Process extracted ingredients using batch logic
                const extractedIngredients = result.ingredients
                    .map((ingredient: string) => ingredient.trim())
                    .filter((ingredient: string) => ingredient.length > 0);

                if (extractedIngredients.length > 0) {
                    // Use the batch add function which handles duplicates and feedback
                    addMultipleIngredients(extractedIngredients);
                } else {
                    alert(
                        "No valid ingredients were detected in the image. Please try a clearer photo."
                    );
                }
            } else {
                alert(
                    "No ingredients were detected in the image. Please try a clearer photo."
                );
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to process image";
            alert(`Upload failed: ${errorMessage}. Please try again.`);
        } finally {
            setUploadingImage(false);
            // Clear the input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const allDietaryOptions = [
        {
            key: "vegan" as keyof DietaryPreferences,
            label: "🌱 Vegan",
            color: "green",
        },
        {
            key: "veg" as keyof DietaryPreferences,
            label: "🥕 Vegetarian",
            color: "orange",
        },
        {
            key: "nonVeg" as keyof DietaryPreferences,
            label: "🍗  Non-Veg",
            color: "red",
        },
        {
            key: "glutenFree" as keyof DietaryPreferences,
            label: "🌾 Gluten-Free",
            color: "blue",
        },
    ];

    const visibleOptions = allDietaryOptions;

    const getButtonColor = (color: string, isActive: boolean) => {
        const colors = {
            orange: isActive
                ? "bg-orange-100 text-orange-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            red: isActive
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            green: isActive
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            blue: isActive
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            purple: isActive
                ? "bg-purple-100 text-purple-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            indigo: isActive
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            yellow: isActive
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            pink: isActive
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        };
        return colors[color as keyof typeof colors] || colors.orange;
    };
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
                        placeholder="e.g., chicken, broccoli, pasta (separate multiple with commas)"
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
            <div className="mb-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-full py-3 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {uploadingImage ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-500"></div>
                            Processing image...
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </button>
            </div>

            {/* Dietary Preferences */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                        Dietary Preferences:
                    </h4>
                    {userDietPreference && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Profile: {userDietPreference}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {visibleOptions.map((option) => (
                        <button
                            key={option.key}
                            onClick={() => toggleDietaryPref(option.key)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${getButtonColor(
                                option.color,
                                dietaryPrefs[option.key]
                            )}`}
                        >
                            {option.label}
                        </button>
                    ))}
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
