// User types matching backend schema
export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

// Favorite types matching backend schema
export interface Favorite {
    id: string;
    userId: string;
    recipeId: string;
    recipeName: string;
    recipeImage?: string;
    cuisine?: string;
    createdAt: string;
}

// Recipe types (for favorites functionality)
export interface Recipe {
    id: string;
    name: string;
    image?: string;
    cuisine?: string;
    ingredients?: string[];
    instructions?: string[];
    prepTime?: number;
    cookTime?: number;
    servings?: number;
}

// API request/response types
export interface SignUpData {
    name: string;
    email: string;
    password: string;
    image?: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface ApiError {
    error: string;
    message: string;
    statusCode?: number;
}

// Favorites API types
export interface AddFavoriteRequest {
    recipeId: string;
    recipeName: string;
    recipeImage?: string;
    cuisine?: string;
}

export interface FavoritesResponse {
    favorites: Favorite[];
    total: number;
}
