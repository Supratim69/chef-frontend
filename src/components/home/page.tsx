"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";

import IngredientsInput from "./IngredientsInput";
import ActionButtons from "./ActionButtons";

import AppLayout from "@/components/layout/AppLayout";
import { apiClient } from "@/lib/api-client";
import { analytics } from "@/lib/analytics";
import Dialog from "@/components/ui/Dialog";

export default function HomePage() {
    const [ingredientInput, setIngredientInput] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [dietaryPrefs, setDietaryPrefs] = useState({
        vegan: false,
        veg: false,
        nonVeg: false,
        glutenFree: false,
    });
    const [isSearching, setIsSearching] = useState(false);
    const [dialog, setDialog] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        type: "error" | "success" | "warning" | "info";
        showTips: boolean;
        tips: string[];
    }>({
        isOpen: false,
        title: "",
        message: "",
        type: "info",
        showTips: false,
        tips: [],
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

    // Helper function to show dialog
    const showDialog = (
        title: string,
        message: string,
        type: "error" | "success" | "warning" | "info" = "info",
        showTips: boolean = false,
        tips: string[] = []
    ) => {
        setDialog({
            isOpen: true,
            title,
            message,
            type,
            showTips,
            tips,
        });
    };

    const closeDialog = () => {
        setDialog((prev) => ({ ...prev, isOpen: false }));
    };

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
                const updatedIngredients = [...ingredients, ...newIngredients];
                setIngredients(updatedIngredients);

                // Track ingredient additions
                newIngredients.forEach((ingredient) => {
                    analytics.trackIngredientAdd(
                        ingredient,
                        updatedIngredients.length
                    );
                });
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
                showDialog(
                    "Duplicate Ingredients",
                    `All ingredients are already in the list:\n\n${duplicates.join(
                        ", "
                    )}`,
                    "warning"
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
            const updatedIngredients = [...ingredients, ...newIngredients];
            setIngredients(updatedIngredients);

            // Track image upload and ingredient extraction
            analytics.trackImageUpload(newIngredients);
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
            showDialog(
                "Duplicate Ingredients",
                `All ingredients are already in the list:\n\n${duplicates.join(
                    ", "
                )}`,
                "warning"
            );
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const toggleDietaryPref = (pref: keyof typeof dietaryPrefs) => {
        const newValue = !dietaryPrefs[pref];
        setDietaryPrefs({ ...dietaryPrefs, [pref]: newValue });

        // Track dietary preference changes
        analytics.trackDietaryPrefChange(pref, newValue);
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

    const handleSearch = async () => {
        if (ingredients.length === 0) {
            showDialog(
                "No Ingredients Added",
                "Please add at least one ingredient to search for recipes!\n\nYou can type ingredients manually or upload a photo.",
                "warning"
            );
            return;
        }

        setIsSearching(true);
        try {
            // Get selected dietary preferences
            const selectedDietaryPrefs = Object.entries(dietaryPrefs)
                .filter(([, value]) => value)
                .map(([key]) => key);

            // Search recipes using the API (direct Pinecone search)
            const searchResults = await apiClient.searchRecipesByIngredients(
                ingredients,
                selectedDietaryPrefs
            );

            // // Log each result for debugging
            // searchResults.forEach((result, index) => {
            //     console.log(`🍳 Home Page - Result ${index + 1}:`, {
            //         parentId: result.parentId,
            //         score: result.score,
            //         title: result.title,
            //         snippet: result.snippet,
            //     });
            // });

            // Navigate to search results page with the results
            const searchParams = new URLSearchParams({
                ingredients: ingredients.join(","),
                dietary: selectedDietaryPrefs.join(","),
            });

            sessionStorage.setItem(
                "searchResults",
                JSON.stringify(searchResults)
            );
            sessionStorage.setItem("searchQuery", ingredients.join(", "));

            // Track recipe search
            analytics.trackRecipeSearch(
                ingredients,
                selectedDietaryPrefs,
                searchResults.length
            );

            router.push(`/search?${searchParams.toString()}`);
        } catch (error) {
            console.error("Search failed:", error);
            showDialog(
                "Search Failed",
                "We couldn't search for recipes right now.\n\nPlease check your internet connection and try again.",
                "error"
            );
        } finally {
            setIsSearching(false);
        }
    };

    const handleIngredientKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addIngredient();
        }
    };

    return (
        <AppLayout>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <Header />
                {/* <SearchInput
                    value={recipeSearchInput}
                    onChange={setRecipeSearchInput}
                    onKeyPress={handleRecipeSearchKeyPress}
                /> */}

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-2">
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
                        isSearching={isSearching}
                    />

                    {/* <CategoryGrid categories={categories} /> */}

                    {/* <RecipeList recipes={recipes} /> */}
                </div>
            </div>

            {/* Dialog */}
            <Dialog
                isOpen={dialog.isOpen}
                onClose={closeDialog}
                title={dialog.title}
                message={dialog.message}
                type={dialog.type}
                showTips={dialog.showTips}
                tips={dialog.tips}
            />
        </AppLayout>
    );
}
