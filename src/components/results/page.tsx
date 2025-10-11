"use client";
import React, { useState } from "react";
import { SearchResultsHeader, RecipeGrid } from "./";
import BottomNavigation from "../home/BottomNavigation";

export default function SearchResults() {
    const [activeTab, setActiveTab] = useState("home");
    const [favorites, setFavorites] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    const toggleFavorite = (index: number) => {
        const newFavorites = [...favorites];
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
    };

    const handleBack = () => {
        console.log("Navigating back from search results");
        window.history.back();
    };

    const handleRecipeClick = (recipe: {
        id: number;
        title: string;
        time: string;
        difficulty: string;
        tags: string[];
        image: string;
    }) => {
        console.log("Recipe clicked:", recipe);
        // Navigation to recipe details can be implemented later
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
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <SearchResultsHeader onBack={handleBack} />

                <RecipeGrid
                    recipes={recipes}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onRecipeClick={handleRecipeClick}
                />

                <BottomNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    );
}
