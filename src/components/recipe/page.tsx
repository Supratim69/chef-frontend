"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

// Unified type for recipe data (flexible to handle both API and URL param formats)
interface RecipeData {
    // Core fields
    id?: string;
    recipeId?: string;
    title?: string;
    description?: string;
    snippet?: string;

    // Images
    image?: string;
    imageUrl?: string;

    // Content
    ingredients?: string[] | string;
    instructions?: string;

    // Timing
    prepTimeMins?: number;
    cookTimeMins?: number;
    servings?: number;

    // Categories
    cuisine?: string;
    course?: string;
    diet?: string;
    tags?: string[];

    // URLs
    recipeUrl?: string;

    // Timestamps
    createdAt?: string;
    updatedAt?: string;

    // Legacy/nested data structures
    metadata?: {
        title?: string;
        ingredients?: string[];
        instructions?: string;
        prepTime?: number;
        cookTime?: number;
        servings?: number;
        cuisine?: string;
        diet?: string;
        course?: string;
    };
    fullRecipe?: {
        ingredients?: string;
        instructions?: string;
        cuisine?: string;
        course?: string;
        diet?: string;
        imageURL?: string;
        prepTime?: number;
        cookTime?: number;
        servings?: number;
    };
}
import {
    RecipeDetailsHeader,
    RecipeHeroImage,
    RecipeTitleSection,
    DietaryInformation,
    IngredientsSection,
    CookingInstructions,
    RecipeInfo,
} from "./";
import FavoriteButton from "./FavoriteButton";
import AppLayout from "@/components/layout/AppLayout";

interface RecipeDetailsPageProps {
    recipeId: string;
    recipeData?: string;
}

export default function RecipeDetailsPage({
    recipeId,
    recipeData,
}: RecipeDetailsPageProps) {
    const router = useRouter();
    const [fetchedRecipeData, setFetchedRecipeData] =
        useState<RecipeData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBack = () => {
        router.back();
    };

    // Parse recipe data from URL params or use fallback
    let parsedRecipeData: RecipeData | null = null;
    try {
        if (recipeData) {
            parsedRecipeData = JSON.parse(decodeURIComponent(recipeData));
        }
    } catch (error) {
        console.error("Failed to parse recipe data:", error);
    }

    // Fetch recipe data from API if not provided in URL params
    useEffect(() => {
        const fetchRecipeData = async () => {
            // Only fetch if we don't have recipe data and we have a valid UUID
            if (!parsedRecipeData && recipeId) {
                const uuidRegex =
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                if (uuidRegex.test(recipeId)) {
                    setLoading(true);
                    setError(null);
                    try {
                        console.log(
                            "🔍 Fetching recipe data for UUID:",
                            recipeId
                        );
                        const recipe = await apiClient.getRecipeByUuid(
                            recipeId
                        );
                        setFetchedRecipeData(recipe as RecipeData);
                    } catch (err) {
                        console.error("Failed to fetch recipe:", err);
                        setError("Failed to load recipe details");
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        fetchRecipeData();
    }, [recipeId, parsedRecipeData]);

    // Show loading state
    if (loading) {
        return (
            <AppLayout showBottomNav={false}>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
                    <p className="text-gray-600">Loading recipe...</p>
                </div>
            </AppLayout>
        );
    }

    // Show error state
    if (error) {
        return (
            <AppLayout showBottomNav={false}>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Recipe Not Found
                        </h3>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={handleBack}
                            className="bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </AppLayout>
        );
    }

    // Use fetched data if available, otherwise use parsed data
    const activeRecipeData: RecipeData | null =
        fetchedRecipeData || parsedRecipeData;

    // Recipe data - use active data or fallback
    const recipeInfo = activeRecipeData
        ? {
              title:
                  activeRecipeData.metadata?.title ||
                  activeRecipeData.title ||
                  "Recipe",
              description:
                  activeRecipeData.description ||
                  activeRecipeData.snippet?.substring(0, 150) + "..." ||
                  "A delicious recipe",
              imageUrl:
                  activeRecipeData.imageUrl ||
                  activeRecipeData.image ||
                  "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=300&fit=crop",
              prepTime: activeRecipeData?.prepTimeMins
                  ? `${activeRecipeData.prepTimeMins} mins`
                  : activeRecipeData?.metadata?.prepTime
                  ? `${activeRecipeData.metadata.prepTime} mins`
                  : "15 mins",
              cookTime: activeRecipeData?.cookTimeMins
                  ? `${activeRecipeData.cookTimeMins} mins`
                  : activeRecipeData?.metadata?.cookTime
                  ? `${activeRecipeData.metadata.cookTime} mins`
                  : "30 mins",
              servings:
                  activeRecipeData?.servings ||
                  activeRecipeData?.metadata?.servings ||
                  4,
              difficulty: "Medium",
              dietaryTags: [
                  ...(activeRecipeData?.diet ||
                  activeRecipeData?.fullRecipe?.diet ||
                  activeRecipeData?.metadata?.diet
                      ? [
                            {
                                emoji: "🥗",
                                label:
                                    activeRecipeData?.diet ||
                                    activeRecipeData?.fullRecipe?.diet ||
                                    activeRecipeData?.metadata?.diet ||
                                    "",
                            },
                        ].filter((tag) => tag.label)
                      : []),
                  ...(activeRecipeData?.cuisine ||
                  activeRecipeData?.fullRecipe?.cuisine ||
                  activeRecipeData?.metadata?.cuisine
                      ? [
                            {
                                emoji: "🌍",
                                label:
                                    activeRecipeData?.cuisine ||
                                    activeRecipeData?.fullRecipe?.cuisine ||
                                    activeRecipeData?.metadata?.cuisine ||
                                    "",
                            },
                        ].filter((tag) => tag.label)
                      : []),
                  ...(activeRecipeData?.course ||
                  activeRecipeData?.fullRecipe?.course ||
                  activeRecipeData?.metadata?.course
                      ? [
                            {
                                emoji: "🍽️",
                                label:
                                    activeRecipeData?.course ||
                                    activeRecipeData?.fullRecipe?.course ||
                                    activeRecipeData?.metadata?.course ||
                                    "",
                            },
                        ].filter((tag) => tag.label)
                      : []),
              ],
          }
        : {
              title: "Classic Hearty Lentil Soup",
              description:
                  "A comforting and nutritious lentil soup, perfect for any season. Rich in flavor and easy to make.",
              imageUrl:
                  "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=300&fit=crop",
              prepTime: "15 mins",
              cookTime: "30 mins",
              servings: 4,
              difficulty: "Easy",
              dietaryTags: [
                  { emoji: "🥕", label: "Vegetarian" },
                  { emoji: "🌱", label: "Vegan" },
                  { emoji: "🧈", label: "Dairy-Free" },
                  { emoji: "💪", label: "High Protein" },
              ],
          };

    const ingredients = activeRecipeData?.ingredients
        ? (Array.isArray(activeRecipeData.ingredients)
              ? activeRecipeData.ingredients
              : activeRecipeData.ingredients
                    .split("\n")
                    .filter((ing: string) => ing.trim())
          ).map((ingredient: string) => ({
              text: ingredient.charAt(0).toUpperCase() + ingredient.slice(1), // Capitalize first letter
              available: Math.random() > 0.2, // Randomly mark some as unavailable for demo
          }))
        : activeRecipeData?.metadata?.ingredients
        ? (Array.isArray(activeRecipeData.metadata.ingredients)
              ? activeRecipeData.metadata.ingredients
              : []
          ).map((ingredient: string) => ({
              text: ingredient.charAt(0).toUpperCase() + ingredient.slice(1), // Capitalize first letter
              available: Math.random() > 0.2, // Randomly mark some as unavailable for demo
          }))
        : [
              { text: "1 tbsp olive oil", available: true },
              { text: "1 large onion, chopped", available: true },
              { text: "2 carrots, diced", available: true },
              { text: "2 celery stalks, diced", available: false },
              { text: "3 cloves garlic, minced", available: true },
              { text: "1 cup brown or green lentils", available: true },
              {
                  text: "1 (14.5 oz) can diced tomatoes, undrained",
                  available: true,
              },
              { text: "6 cups vegetable broth", available: true },
              { text: "1 bay leaf", available: true },
              { text: "1/2 tsp dried thyme", available: false },
              { text: "Salt and black pepper to taste", available: true },
              { text: "Fresh parsley, chopped, for garnish", available: true },
          ];

    // Function to parse instructions into steps
    const parseInstructions = (instructionsText: string): string[] => {
        if (!instructionsText) return [];

        // Clean up the text and split into sentences
        const cleanText = instructionsText
            .replace(/\s+/g, " ") // Replace multiple spaces with single space
            .trim();

        // Split by common sentence endings and filter out empty strings
        const sentences = cleanText
            .split(/[.!?]+/)
            .map((s) => s.trim())
            .filter((s) => s.length > 10) // Only keep substantial sentences
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1)); // Capitalize first letter

        return sentences.length > 0 ? sentences : [cleanText];
    };

    const instructions =
        activeRecipeData?.instructions ||
        activeRecipeData?.metadata?.instructions
            ? parseInstructions(
                  activeRecipeData?.instructions ||
                      activeRecipeData?.metadata?.instructions ||
                      ""
              )
            : activeRecipeData?.title
            ? [
                  `This is a recipe for ${activeRecipeData.title}.`,
                  "The detailed cooking instructions are embedded in our search system but not fully available for display.",
                  "Please refer to the original recipe source for complete step-by-step instructions.",
                  activeRecipeData?.snippet
                      ? `Recipe preview: ${activeRecipeData.snippet}`
                      : "",
              ].filter(Boolean)
            : [
                  "Rinse lentils under cold water. Set aside.",
                  "Heat olive oil in a large pot or Dutch oven over medium heat. Add chopped onions, carrots, and celery. Sauté until softened, about 5-7 minutes.",
                  "Stir in minced garlic and cook for another minute until fragrant. Add the rinsed lentils, diced tomatoes, vegetable broth, bay leaf, and thyme.",
                  "Bring the soup to a boil, then reduce heat to low, cover, and simmer for 30-40 minutes, or until lentils are tender.",
                  "Remove bay leaf. Season with salt and pepper to taste. Serve hot with a sprinkle of fresh parsley.",
              ];

    const recipeInfoData = {
        calories: 350,
        cookingTime: recipeInfo.cookTime,
        servings: recipeInfo.servings,
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <RecipeDetailsHeader onBack={handleBack} />

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto pb-24">
                    <RecipeHeroImage
                        imageUrl={recipeInfo.imageUrl}
                        altText={recipeInfo.title}
                    />

                    <div className="px-6">
                        <RecipeTitleSection
                            title={recipeInfo.title}
                            description={recipeInfo.description}
                        />

                        {/* Favorite Button */}
                        <div className="mb-6">
                            <FavoriteButton
                                recipeId={
                                    activeRecipeData?.recipeId ||
                                    activeRecipeData?.id ||
                                    recipeId
                                }
                                recipeName={recipeInfo.title}
                                recipeImage={recipeInfo.imageUrl}
                                cuisine={
                                    activeRecipeData?.cuisine ||
                                    activeRecipeData?.fullRecipe?.cuisine ||
                                    activeRecipeData?.metadata?.cuisine
                                }
                                className="w-full"
                            />
                        </div>

                        <DietaryInformation badges={recipeInfo.dietaryTags} />

                        <IngredientsSection ingredients={ingredients} />

                        {/* <MissingIngredients substitutes={substitutes} /> */}

                        <CookingInstructions instructions={instructions} />

                        <RecipeInfo recipeInfo={recipeInfoData} />

                        {/* <StartCookingButton
                            onStartCooking={handleStartCooking}
                        /> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
