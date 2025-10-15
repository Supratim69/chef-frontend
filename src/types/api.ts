// User types matching backend schema
export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    dietPreference?: string | null; // Added for manual auth backend compatibility
}

// Favorite types matching backend schema
export interface Favorite {
    id: string;
    userId: string;
    recipeId: string;
    recipeName?: string; // Legacy field, may be null with new system
    recipeImage?: string; // Legacy field, may be null with new system
    cuisine?: string; // Legacy field, may be null with new system
    dateSaved: string;
    deletedAt?: string | null;
    // New relationship with Recipe table
    recipe?: {
        id: string;
        title: string;
        imageUrl?: string;
        cuisine?: string;
        course?: string;
        diet?: string;
        prepTimeMins?: number;
        cookTimeMins?: number;
        servings?: number;
        instructions?: string;
    };
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

// Recipe display type for UI components
export interface RecipeDisplay {
    id: string;
    title: string;
    time: string;
    difficulty: string;
    tags: string[];
    image: string;
    score?: number;
    missingIngredients?: string[];
    instructions?: string; // Add instructions field
    metadata?: Record<string, unknown>;
    fullRecipe?: {
        ingredients: string;
        instructions: string;
        cuisine: string;
        course: string;
        diet: string;
        imageURL: string;
        prepTime?: number;
        cookTime?: number;
        servings?: number;
    };
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

// Search API types
export interface SearchResult {
    recipeId?: string; // New UUID identifier from Pinecone metadata
    parentId: string; // Legacy identifier for backwards compatibility
    score: number;
    title: string;
    snippet: string;
    instructions?: string; // Add instructions field from backend
    matchedChunks: Array<{
        id: string;
        score: number;
        metadata: Record<string, unknown>;
    }>;
    fullRecipe?: {
        ingredients: string;
        instructions: string;
        cuisine: string;
        course: string;
        diet: string;
        imageURL: string;
        prepTime?: number;
        cookTime?: number;
        servings?: number;
    };
}

export interface SearchResponse {
    results: SearchResult[];
}

// Match API types
export interface MatchResult {
    parentId: string;
    score?: number;
    matchScore?: number;
    missingIngredients: string[];
    instructions?: string; // Add instructions field from backend
    recipe?: Record<string, unknown>;
    fullRecipeSnippet?: string;
    metadata?: Record<string, unknown>;
}

export interface MatchResponse {
    results: MatchResult[];
}
