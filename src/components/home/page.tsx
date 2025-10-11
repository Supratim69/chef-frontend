"use client";
import React, { useState } from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import IngredientsInput from "./IngredientsInput";
import ActionButtons from "./ActionButtons";
import CategoryGrid from "./CategoryGrid";
import RecipeList from "./RecipeList";
import BottomNavigation from "./BottomNavigation";

export default function ChefAIApp() {
    const [ingredientInput, setIngredientInput] = useState("");
    const [ingredients, setIngredients] = useState([
        "Chicken Breast",
        "Broccoli Florets",
        "Cherry Tomatoes",
        "Garlic",
        "Olive Oil",
    ]);
    const [dietaryPrefs, setDietaryPrefs] = useState({
        veg: false,
        nonVeg: false,
        glutenFree: false,
        dairyFree: false,
    });
    const [activeTab, setActiveTab] = useState("home");

    const addIngredient = () => {
        if (ingredientInput.trim()) {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput("");
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
            veg: false,
            nonVeg: false,
            glutenFree: false,
            dairyFree: false,
        });
    };

    const handleSearch = () => {
        if (ingredients.length === 0) {
            alert("Please add at least one ingredient!");
            return;
        }
        alert(`Searching recipes with: ${ingredients.join(", ")}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addIngredient();
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
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <Header />
                <SearchInput
                    value={ingredientInput}
                    onChange={setIngredientInput}
                    onKeyPress={handleKeyPress}
                />

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 pb-20">
                    <IngredientsInput
                        ingredientInput={ingredientInput}
                        setIngredientInput={setIngredientInput}
                        ingredients={ingredients}
                        addIngredient={addIngredient}
                        removeIngredient={removeIngredient}
                        dietaryPrefs={dietaryPrefs}
                        toggleDietaryPref={toggleDietaryPref}
                        handleKeyPress={handleKeyPress}
                    />

                    <ActionButtons
                        handleSearch={handleSearch}
                        clearAll={clearAll}
                    />

                    <CategoryGrid categories={categories} />

                    <RecipeList recipes={recipes} />
                </div>

                <BottomNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    );
}
