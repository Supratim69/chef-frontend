"use client";
import React, { useState } from "react";
import { FavoritesHeader, FavoriteRecipesList } from "./";
import BottomNavigation from "../home/BottomNavigation";

export default function ChefFavorites() {
    const [activeTab, setActiveTab] = useState("favorites");

    const recipes = [
        {
            id: 1,
            title: "Creamy Tomato Pasta",
            description:
                "A rich and indulgent pasta dish made with sun-dried tomatoes and fresh basil, perfect",
            time: "30 min",
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=400&fit=crop",
        },
        {
            id: 2,
            title: "Chickpea & Spinach Curry",
            description:
                "A vibrant and healthy vegan curry packed with flavor, ideal for a quick and nutritious",
            time: "45 min",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=400&fit=crop",
        },
        {
            id: 3,
            title: "Garlic Herb Roast Chicken",
            description:
                "Succulent chicken roasted with aromatic garlic and a medley of fresh herbs, making",
            time: "1 hr 15 min",
            image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=400&fit=crop",
        },
        {
            id: 4,
            title: "Classic Lemon Meringue Pie",
            description:
                "A delightful dessert featuring a tangy lemon filling topped with a fluffy, toasted",
            time: "1 hr",
            image: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=800&h=400&fit=crop",
        },
    ];

    const handleViewRecipe = (title: string) => {
        alert(`Opening recipe: ${title}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <FavoritesHeader />

                <FavoriteRecipesList
                    recipes={recipes}
                    onViewRecipe={handleViewRecipe}
                />

                <BottomNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    );
}
