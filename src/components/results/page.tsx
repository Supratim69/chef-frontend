"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchResultsHeader, RecipeGrid } from "./";
import AppLayout from "@/components/layout/AppLayout";

export default function SearchResultsPage() {
    const [favorites, setFavorites] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
    const [dietaryPrefs, setDietaryPrefs] = useState<string[]>([]);

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
    }, [searchParams]);

    const toggleFavorite = (index: number) => {
        const newFavorites = [...favorites];
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
    };

    const handleBack = () => {
        router.back();
    };

    const handleRecipeClick = (recipe: {
        id: number;
        title: string;
        time: string;
        difficulty: string;
        tags: string[];
        image: string;
    }) => {
        router.push(`/recipe/${recipe.id}`);
    };

    const recipes = [
        {
            id: 1,
            title: "Creamy Tomato Pasta",
            time: "25 min",
            difficulty: "Easy",
            tags: ["Vegetarian", "Quick"],
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
        },
        {
            id: 2,
            title: "Spicy Chicken Stir-fry",
            time: "30 min",
            difficulty: "Medium",
            tags: ["High-Protein", "Dairy-Free"],
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
        },
        {
            id: 3,
            title: "Lentil Soup with Kale",
            time: "45 min",
            difficulty: "Easy",
            tags: ["Vegan", "Gluten-Free", "High-Fiber"],
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
        },
        {
            id: 4,
            title: "Beef & Broccoli",
            time: "35 min",
            difficulty: "Medium",
            tags: ["High-Protein"],
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
        },
        {
            id: 5,
            title: "Lemon Herb Roasted",
            time: "20 min",
            difficulty: "Easy",
            tags: ["Pescatarian", "Low-Carb"],
            image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400&h=300&fit=crop",
        },
        {
            id: 6,
            title: "Mushroom Risotto",
            time: "50 min",
            difficulty: "Hard",
            tags: ["Vegetarian"],
            image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop",
        },
    ];

    return (
        <AppLayout showBottomNav={false}>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <SearchResultsHeader
                    onBack={handleBack}
                    searchIngredients={searchIngredients}
                    dietaryPrefs={dietaryPrefs}
                />

                <RecipeGrid
                    recipes={recipes}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onRecipeClick={handleRecipeClick}
                />
            </div>
        </AppLayout>
    );
}
