"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    RecipeDetailsHeader,
    RecipeHeroImage,
    RecipeTitleSection,
    DietaryInformation,
    IngredientsSection,
    MissingIngredients,
    CookingInstructions,
    NutritionalInfo,
    StartCookingButton,
} from "./";
import AppLayout from "@/components/layout/AppLayout";

interface RecipeDetailsPageProps {
    recipeId: string;
}

export default function RecipeDetailsPage({
    recipeId,
}: RecipeDetailsPageProps) {
    const router = useRouter();

    const handleToggleFavorite = () => {
        alert("Recipe added to favorites!");
    };

    const handleStartCooking = () => {
        alert("Starting cooking mode!");
    };

    const handleBack = () => {
        router.back();
    };

    // Recipe data
    const recipeData = {
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

    const ingredients = [
        { text: "1 tbsp olive oil", available: true },
        { text: "1 large onion, chopped", available: true },
        { text: "2 carrots, diced", available: true },
        { text: "2 celery stalks, diced", available: false },
        { text: "3 cloves garlic, minced", available: true },
        { text: "1 cup brown or green lentils", available: true },
        { text: "1 (14.5 oz) can diced tomatoes, undrained", available: true },
        { text: "6 cups vegetable broth", available: true },
        { text: "1 bay leaf", available: true },
        { text: "1/2 tsp dried thyme", available: false },
        { text: "Salt and black pepper to taste", available: true },
        { text: "Fresh parsley, chopped, for garnish", available: true },
    ];

    const substitutes = [
        {
            ingredient: "celery",
            substitute: "Use 1/2 cup chopped bell pepper or zucchini.",
        },
        {
            ingredient: "dried thyme",
            substitute: "Use 1 tsp fresh thyme or a pinch of dried oregano.",
        },
    ];

    const instructions = [
        "Rinse lentils under cold water. Set aside.",
        "Heat olive oil in a large pot or Dutch oven over medium heat. Add chopped onions, carrots, and celery. Sauté until softened, about 5-7 minutes.",
        "Stir in minced garlic and cook for another minute until fragrant. Add the rinsed lentils, diced tomatoes, vegetable broth, bay leaf, and thyme.",
        "Bring the soup to a boil, then reduce heat to low, cover, and simmer for 30-40 minutes, or until lentils are tender.",
        "Remove bay leaf. Season with salt and pepper to taste. Serve hot with a sprinkle of fresh parsley.",
    ];

    const nutrition = {
        calories: 350,
        protein: 20,
        fat: 10,
        carbs: 45,
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <RecipeDetailsHeader onBack={handleBack} />

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto pb-24">
                    <RecipeHeroImage
                        imageUrl={recipeData.imageUrl}
                        altText={recipeData.title}
                        onToggleFavorite={handleToggleFavorite}
                    />

                    <div className="px-6">
                        <RecipeTitleSection
                            title={recipeData.title}
                            description={recipeData.description}
                        />

                        <DietaryInformation badges={recipeData.dietaryTags} />

                        <IngredientsSection ingredients={ingredients} />

                        <MissingIngredients substitutes={substitutes} />

                        <CookingInstructions instructions={instructions} />

                        <NutritionalInfo nutrition={nutrition} />

                        <StartCookingButton
                            onStartCooking={handleStartCooking}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
