"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
    RecipeDetailsHeader,
    RecipeHeroImage,
    RecipeTitleSection,
    DietaryInformation,
    IngredientsSection,
    CookingInstructions,
    RecipeInfo,
    StartCookingButton,
} from "./";
import AppLayout from "@/components/layout/AppLayout";

interface RecipeDetailsPageProps {
    recipeId: string;
    recipeData?: string;
}

export default function RecipeDetailsPage({
    recipeData,
}: RecipeDetailsPageProps) {
    const router = useRouter();

    const handleStartCooking = () => {
        alert("Starting cooking mode!");
    };

    const handleBack = () => {
        router.back();
    };

    // Parse recipe data from URL params or use fallback
    let parsedRecipeData = null;
    try {
        if (recipeData) {
            parsedRecipeData = JSON.parse(decodeURIComponent(recipeData));
            console.log(
                "🔍 Recipe Page - Parsed recipe data:",
                parsedRecipeData
            );
            console.log(
                "🔍 Recipe Page - Full recipe data:",
                parsedRecipeData?.fullRecipe
            );
        }
    } catch (error) {
        console.error("Failed to parse recipe data:", error);
    }

    // Recipe data - use parsed data or fallback
    const recipeInfo = parsedRecipeData
        ? {
              title:
                  parsedRecipeData.metadata?.title ||
                  parsedRecipeData.title ||
                  "Recipe",
              description:
                  parsedRecipeData.snippet?.substring(0, 150) + "..." ||
                  "A delicious recipe",
              imageUrl:
                  parsedRecipeData.image ||
                  "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=300&fit=crop",
              prepTime: parsedRecipeData.metadata?.prepTime
                  ? `${parsedRecipeData.metadata.prepTime} mins`
                  : "15 mins",
              cookTime: parsedRecipeData.metadata?.cookTime
                  ? `${parsedRecipeData.metadata.cookTime} mins`
                  : "30 mins",
              servings: parsedRecipeData.metadata?.servings || 4,
              difficulty: "Medium",
              dietaryTags: [
                  ...(parsedRecipeData.fullRecipe?.diet ||
                  parsedRecipeData.metadata?.diet
                      ? [
                            {
                                emoji: "🥗",
                                label:
                                    parsedRecipeData.fullRecipe?.diet ||
                                    parsedRecipeData.metadata.diet,
                            },
                        ]
                      : []),
                  ...(parsedRecipeData.fullRecipe?.cuisine ||
                  parsedRecipeData.metadata?.cuisine
                      ? [
                            {
                                emoji: "🌍",
                                label:
                                    parsedRecipeData.fullRecipe?.cuisine ||
                                    parsedRecipeData.metadata.cuisine,
                            },
                        ]
                      : []),
                  ...(parsedRecipeData.fullRecipe?.course ||
                  parsedRecipeData.metadata?.course
                      ? [
                            {
                                emoji: "🍽️",
                                label:
                                    parsedRecipeData.fullRecipe?.course ||
                                    parsedRecipeData.metadata.course,
                            },
                        ]
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

    // Parse ingredients from metadata (which contains the ingredients array from Pinecone)
    console.log("🔍 Recipe Page - Ingredients check:", {
        hasMetadataIngredients: !!parsedRecipeData?.metadata?.ingredients,
        metadataIngredients: parsedRecipeData?.metadata?.ingredients,
    });

    const ingredients = parsedRecipeData?.metadata?.ingredients
        ? (Array.isArray(parsedRecipeData.metadata.ingredients)
              ? parsedRecipeData.metadata.ingredients
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

    // For instructions, we'll use a generic message since full instructions aren't available in metadata
    // The actual recipe instructions are embedded in the chunks but not easily reconstructable
    console.log("🔍 Recipe Page - Available data:", {
        hasSnippet: !!parsedRecipeData?.snippet,
        snippet: parsedRecipeData?.snippet,
        title: parsedRecipeData?.title,
    });

    const instructions = parsedRecipeData?.title
        ? [
              `This is a recipe for ${parsedRecipeData.title}.`,
              "The detailed cooking instructions are embedded in our search system but not fully available for display.",
              "Please refer to the original recipe source for complete step-by-step instructions.",
              parsedRecipeData.snippet
                  ? `Recipe preview: ${parsedRecipeData.snippet}`
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

                        <DietaryInformation badges={recipeInfo.dietaryTags} />

                        <IngredientsSection ingredients={ingredients} />

                        {/* <MissingIngredients substitutes={substitutes} /> */}

                        <CookingInstructions instructions={instructions} />

                        <RecipeInfo recipeInfo={recipeInfoData} />

                        <StartCookingButton
                            onStartCooking={handleStartCooking}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
