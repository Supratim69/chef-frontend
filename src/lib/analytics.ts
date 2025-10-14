import { track } from "@vercel/analytics";

// Custom analytics events for the recipe app
export const analytics = {
    // Track recipe searches
    trackRecipeSearch: (
        ingredients: string[],
        dietaryPrefs: string[],
        resultCount: number
    ) => {
        track("recipe_search", {
            ingredients_count: ingredients.length,
            ingredients: ingredients.join(", "),
            dietary_preferences: dietaryPrefs.join(", "),
            result_count: resultCount,
        });
    },

    // Track recipe clicks
    trackRecipeClick: (
        recipeId: string,
        recipeTitle: string,
        searchPosition: number
    ) => {
        track("recipe_click", {
            recipe_id: recipeId,
            recipe_title: recipeTitle,
            search_position: searchPosition,
        });
    },

    // Track ingredient additions
    trackIngredientAdd: (ingredient: string, totalIngredients: number) => {
        track("ingredient_add", {
            ingredient,
            total_ingredients: totalIngredients,
        });
    },

    // Track image uploads for ingredient extraction
    trackImageUpload: (extractedIngredients: string[]) => {
        track("image_upload", {
            extracted_count: extractedIngredients.length,
            extracted_ingredients: extractedIngredients.join(", "),
        });
    },

    // Track dietary preference changes
    trackDietaryPrefChange: (preference: string, enabled: boolean) => {
        track("dietary_pref_change", {
            preference,
            enabled,
        });
    },

    // Track user authentication events
    trackAuth: (action: "sign_up" | "sign_in" | "sign_out") => {
        track("auth_action", {
            action,
        });
    },

    // Track favorite actions
    trackFavorite: (action: "add" | "remove", recipeId: string) => {
        track("favorite_action", {
            action,
            recipe_id: recipeId,
        });
    },

    // Track profile updates
    trackProfileUpdate: (field: string) => {
        track("profile_update", {
            field,
        });
    },
};
