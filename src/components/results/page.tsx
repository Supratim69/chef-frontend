"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchResultsHeader, RecipeGrid } from "./";
import AppLayout from "@/components/layout/AppLayout";
import type { SearchResult, RecipeDisplay } from "@/types/api";
import { analytics } from "@/lib/analytics";
import Illustration from "@/components/ui/Illustration";

export default function SearchResultsPage() {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
    const [dietaryPrefs, setDietaryPrefs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const ingredients = searchParams.get("ingredients");
        const dietary = searchParams.get("dietary");

        if (ingredients) {
            setSearchIngredients(ingredients.split(","));
        }
        if (dietary) {
            setDietaryPrefs(dietary.split(","));
        }

        console.log("🔍 Results Page - Loading results from sessionStorage");
        const storedResults = sessionStorage.getItem("searchResults");
        console.log(
            "📦 Results Page - Stored results from sessionStorage:",
            storedResults
        );

        if (storedResults) {
            try {
                const results: SearchResult[] = JSON.parse(storedResults);
                console.log(
                    "🔍 Results Page - Parsed search results:",
                    results
                );
                console.log(
                    "📊 Results Page - Number of results:",
                    results.length
                );

                // Ensure we never display more than 10 results
                const limitedResults = results.slice(0, 10);
                console.log(
                    "🔢 Results Page - Limited to 10 results:",
                    limitedResults.length
                );

                setSearchResults(limitedResults);
                // sessionStorage.removeItem("searchResults");
                console.log(
                    "✅ Results Page - Results loaded and sessionStorage cleared"
                );
            } catch (error) {
                console.error(
                    "❌ Results Page - Failed to parse search results:",
                    error
                );
            }
        } else {
            console.log(
                "⚠️ Results Page - No stored search results found in sessionStorage"
            );
        }
        setLoading(false);
    }, [searchParams]);

    const handleBack = () => {
        router.back();
    };

    const handleRecipeClick = (recipe: RecipeDisplay) => {
        // Find the position of this recipe in the search results
        const searchPosition = recipes.findIndex((r) => r.id === recipe.id) + 1;

        // Track recipe click
        analytics.trackRecipeClick(recipe.id, recipe.title, searchPosition);

        // Encode recipe data to pass through URL params
        const recipeData = {
            id: recipe.id,
            recipeId: recipe.id, // Include the UUID for favorites
            title: recipe.title,
            image: recipe.image,
            score: recipe.score,
            metadata: recipe.metadata,
            fullRecipe: recipe.fullRecipe,
            instructions: recipe.instructions, // Include instructions
        };

        const encodedData = encodeURIComponent(JSON.stringify(recipeData));
        router.push(`/recipe/${recipe.id}?data=${encodedData}`);
    };

    // Transform search results into recipe format for the grid
    console.log("🔄 Results Page - Starting recipe transformation");
    const recipes: RecipeDisplay[] = searchResults.map((result, index) => {
        const title = result.title || `Recipe ${result.parentId}`;
        const score = result.score || 0;

        console.log(`🍳 Results Page - Processing recipe ${index + 1}:`, {
            id: result.parentId,
            title: title,
            score: score,
            snippet: result.snippet,
            instructions: result.instructions
                ? result.instructions.substring(0, 100) + "..."
                : "No instructions",
        });

        return {
            id: result.recipeId || result.parentId, // Use UUID if available, fallback to parentId
            title: title,
            time: "25 min", // Default time since not provided by search API
            difficulty: "Medium", // Default difficulty
            tags:
                dietaryPrefs.length > 0
                    ? dietaryPrefs
                    : [`Score: ${(score * 100).toFixed(0)}%`], // Show dietary preferences or match score
            image:
                result.fullRecipe?.imageURL ||
                (typeof result.matchedChunks?.[0]?.metadata?.imageURL ===
                "string"
                    ? result.matchedChunks[0].metadata.imageURL
                    : null) ||
                `https://images.unsplash.com/photo-${
                    1621996346565 + index
                }?w=400&h=300&fit=crop`, // Use real image or fallback
            score: score,
            metadata: result.matchedChunks?.[0]?.metadata || {},
            fullRecipe: result.fullRecipe || undefined,
            instructions: result.instructions, // Pass instructions from backend
        };
    });

    console.log("🎯 Results Page - Final transformed recipes:", recipes.length);
    console.log(
        "📋 Results Page - Recipe titles:",
        recipes.map((r) => r.title)
    );

    if (loading) {
        return (
            <AppLayout showBottomNav={false}>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <Illustration
                            name="search"
                            alt="Searching recipes"
                            width={64}
                            height={64}
                            className="mx-auto animate-pulse"
                        />
                    </div>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
                    <p className="text-gray-600">Loading search results...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout showBottomNav={false}>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <SearchResultsHeader
                    onBack={handleBack}
                    searchIngredients={searchIngredients}
                    dietaryPrefs={dietaryPrefs}
                />

                {/* {searchResults.length > 0 ? (
                    <div className="px-4 py-2 bg-green-50 border-b border-green-200">
                        <p className="text-sm text-green-700">
                            Found {searchResults.length} recipes matching your
                            ingredients: {searchIngredients.join(", ")}
                        </p>
                    </div>
                ) : (
                    <div className="px-4 py-2 bg-orange-50 border-b border-orange-200">
                        <p className="text-sm text-orange-700">
                            No recipes found for ingredients:{" "}
                            {searchIngredients.join(", ")}
                        </p>
                    </div>
                )} */}

                {searchResults.length > 0 ? (
                    <RecipeGrid
                        recipes={recipes}
                        onRecipeClick={handleRecipeClick}
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                        <div className="text-center">
                            <div className="mb-6">
                                <Illustration
                                    name="no_results"
                                    alt="No recipes found"
                                    width={96}
                                    height={96}
                                    className="mx-auto"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No recipes found
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-sm">
                                We couldn&apos;t find any recipes matching your
                                ingredients:{" "}
                                <strong>{searchIngredients.join(", ")}</strong>
                            </p>
                            <div className="space-y-3 text-sm text-gray-500">
                                <p>Try:</p>
                                <ul className="space-y-1">
                                    <li>• Adding more common ingredients</li>
                                    <li>• Removing dietary restrictions</li>
                                    <li>• Using different ingredient names</li>
                                </ul>
                            </div>
                            <button
                                onClick={handleBack}
                                className="mt-6 bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition-colors"
                            >
                                Try Different Ingredients
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
