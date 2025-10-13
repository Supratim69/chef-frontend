"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import SearchInput from "./SearchInput";
import IngredientsInput from "./IngredientsInput";
import ActionButtons from "./ActionButtons";
import CategoryGrid from "./CategoryGrid";
import RecipeList from "./RecipeList";
import AppLayout from "@/components/layout/AppLayout";

export default function HomePage() {
    const [recipeSearchInput, setRecipeSearchInput] = useState("");
    const [ingredientInput, setIngredientInput] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [dietaryPrefs, setDietaryPrefs] = useState({
        vegan: false,
        veg: false,
        nonVeg: false,
        glutenFree: false,
    });
    const router = useRouter();

    // Load ingredients and dietary preferences from localStorage on component mount
    useEffect(() => {
        try {
            const savedIngredients = localStorage.getItem("recipe-ingredients");
            const savedDietaryPrefs = localStorage.getItem(
                "recipe-dietary-prefs"
            );

            if (savedIngredients) {
                const parsedIngredients = JSON.parse(savedIngredients);
                if (Array.isArray(parsedIngredients)) {
                    setIngredients(parsedIngredients);
                }
            }

            if (savedDietaryPrefs) {
                const parsedPrefs = JSON.parse(savedDietaryPrefs);
                if (typeof parsedPrefs === "object" && parsedPrefs !== null) {
                    setDietaryPrefs((prevPrefs) => ({
                        ...prevPrefs,
                        ...parsedPrefs,
                    }));
                }
            }
        } catch (error) {
            console.error(
                "Failed to load saved data from localStorage:",
                error
            );
        }
    }, []);

    // Save ingredients to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(
                "recipe-ingredients",
                JSON.stringify(ingredients)
            );
        } catch (error) {
            console.error("Failed to save ingredients to localStorage:", error);
        }
    }, [ingredients]);

    // Save dietary preferences to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(
                "recipe-dietary-prefs",
                JSON.stringify(dietaryPrefs)
            );
        } catch (error) {
            console.error(
                "Failed to save dietary preferences to localStorage:",
                error
            );
        }
    }, [dietaryPrefs]);

    const addIngredient = () => {
        const trimmedInput = ingredientInput.trim();
        if (trimmedInput) {
            // Parse comma-separated ingredients using regex
            const ingredientList = trimmedInput
                .split(/,\s*/) // Split by comma with optional whitespace
                .map((ingredient) => ingredient.trim()) // Trim each ingredient
                .filter((ingredient) => ingredient.length > 0); // Remove empty strings

            const newIngredients: string[] = [];
            const duplicates: string[] = [];

            // Check each ingredient for duplicates
            ingredientList.forEach((ingredient) => {
                const isDuplicate = ingredients.some(
                    (existing) =>
                        existing.toLowerCase() === ingredient.toLowerCase()
                );

                if (isDuplicate) {
                    duplicates.push(ingredient);
                } else {
                    // Also check against other new ingredients to avoid duplicates within the same input
                    const isDuplicateInNew = newIngredients.some(
                        (newIngredient) =>
                            newIngredient.toLowerCase() ===
                            ingredient.toLowerCase()
                    );

                    if (!isDuplicateInNew) {
                        newIngredients.push(ingredient);
                    }
                }
            });

            // Add new ingredients to the list
            if (newIngredients.length > 0) {
                setIngredients([...ingredients, ...newIngredients]);
            }

            // Show feedback to user
            if (newIngredients.length > 0 && duplicates.length > 0) {
                console.log(
                    `Added ${newIngredients.length} ingredient(s). ${
                        duplicates.length
                    } ingredient(s) were already in the list: ${duplicates.join(
                        ", "
                    )}`
                );
            } else if (newIngredients.length > 0) {
                if (newIngredients.length === 1) {
                    // Single ingredient added - no special message needed
                } else {
                    console.log(
                        `Added ${
                            newIngredients.length
                        } ingredients: ${newIngredients.join(", ")}`
                    );
                }
            } else if (duplicates.length > 0) {
                alert(
                    `All ingredients are already in the list: ${duplicates.join(
                        ", "
                    )}`
                );
            }

            setIngredientInput("");
        }
    };

    const addMultipleIngredients = (ingredientList: string[]) => {
        const newIngredients: string[] = [];
        const duplicates: string[] = [];

        // Check each ingredient for duplicates
        ingredientList.forEach((ingredient) => {
            const isDuplicate = ingredients.some(
                (existing) =>
                    existing.toLowerCase() === ingredient.toLowerCase()
            );

            if (isDuplicate) {
                duplicates.push(ingredient);
            } else {
                // Also check against other new ingredients to avoid duplicates within the same input
                const isDuplicateInNew = newIngredients.some(
                    (newIngredient) =>
                        newIngredient.toLowerCase() === ingredient.toLowerCase()
                );

                if (!isDuplicateInNew) {
                    newIngredients.push(ingredient);
                }
            }
        });

        // Add new ingredients to the list
        if (newIngredients.length > 0) {
            setIngredients([...ingredients, ...newIngredients]);
        }

        // Show feedback to user (always show for batch operations like image upload)
        if (newIngredients.length > 0 && duplicates.length > 0) {
            console.log(
                `Added ${newIngredients.length} ingredient(s). ${
                    duplicates.length
                } ingredient(s) were already in the list: ${duplicates.join(
                    ", "
                )}`
            );
        } else if (newIngredients.length > 0) {
            console.log(
                `Successfully added ${
                    newIngredients.length
                } ingredient(s): ${newIngredients.join(", ")}`
            );
        } else if (duplicates.length > 0) {
            alert(
                `All ingredients are already in the list: ${duplicates.join(
                    ", "
                )}`
            );
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const toggleDietaryPref = (pref: keyof typeof dietaryPrefs) => {
        setDietaryPrefs({ ...dietaryPrefs, [pref]: !dietaryPrefs[pref] });
    };

    const clearAll = () => {
        setIngredients([]);
        setIngredientInput("");
        setDietaryPrefs({
            vegan: false,
            veg: false,
            nonVeg: false,
            glutenFree: false,
        });

        // Clear from localStorage as well
        try {
            localStorage.removeItem("recipe-ingredients");
            localStorage.removeItem("recipe-dietary-prefs");
        } catch (error) {
            console.error("Failed to clear localStorage:", error);
        }
    };

    const handleSearch = () => {
        if (ingredients.length === 0) {
            alert("Please add at least one ingredient!");
            return;
        }
        // Navigate to search results page with ingredients as query params
        const searchParams = new URLSearchParams({
            ingredients: ingredients.join(","),
            dietary: Object.entries(dietaryPrefs)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(","),
        });
        router.push(`/search?${searchParams.toString()}`);
    };

    const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addIngredient();
        }
    };

    const handleRecipeSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleRecipeSearch();
        }
    };

    const handleRecipeSearch = () => {
        if (recipeSearchInput.trim()) {
            // Navigate to recipe search results
            const searchParams = new URLSearchParams({
                q: recipeSearchInput.trim(),
                type: "recipe",
            });
            router.push(`/search?${searchParams.toString()}`);
        }
    };

    const categories = [
        {
            name: "Vegetables",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
        },
        {
            name: "Meat & Poultry",
            image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&h=200&fit=crop",
        },
        {
            name: "Dairy & Cheese",
            image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=200&fit=crop",
        },
    ];

    const recipes = [
        {
            name: "Creamy Tomato Pasta",
            category: "Italian",
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop",
        },
        {
            name: "Spicy Chicken Stir-fry",
            category: "Asian",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop",
        },
        {
            name: "Hearty Lentil Soup",
            category: "Vegetarian",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop",
        },
    ];

    return (
        <AppLayout>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <Header />
                <SearchInput
                    value={recipeSearchInput}
                    onChange={setRecipeSearchInput}
                    onKeyPress={handleRecipeSearchKeyPress}
                />

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6">
                    <IngredientsInput
                        ingredientInput={ingredientInput}
                        setIngredientInput={setIngredientInput}
                        ingredients={ingredients}
                        addIngredient={addIngredient}
                        addMultipleIngredients={addMultipleIngredients}
                        removeIngredient={removeIngredient}
                        dietaryPrefs={dietaryPrefs}
                        toggleDietaryPref={toggleDietaryPref}
                        handleKeyPress={handleIngredientKeyPress}
                    />

                    <ActionButtons
                        handleSearch={handleSearch}
                        clearAll={clearAll}
                    />

                    <CategoryGrid categories={categories} />

                    <RecipeList recipes={recipes} />
                </div>
            </div>
        </AppLayout>
    );
}
