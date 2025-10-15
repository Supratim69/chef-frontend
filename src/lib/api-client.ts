import { authClient } from "./auth-client";
import type {
    User,
    Favorite,
    Recipe,
    SignUpData,
    SignInData,
    AddFavoriteRequest,
    FavoritesResponse,
    ApiResponse,
    ApiError,
    SearchResult,
    SearchResponse,
} from "../types/api";

class ApiClient {
    private baseURL: string;

    constructor() {
        this.baseURL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        console.log(
            `🌐 API Client - Response status: ${response.status} ${response.statusText}`
        );

        if (!response.ok) {
            const errorData: ApiError = await response.json().catch(() => ({
                error: "network_error",
                message: "Network request failed",
                statusCode: response.status,
            }));

            console.error(
                `❌ API Client - HTTP Error ${response.status}:`,
                errorData
            );
            throw new Error(
                errorData.message ||
                    `Request failed with status ${response.status}`
            );
        }

        const responseData = await response.json();
        console.log("✅ API Client - Response data:", responseData);
        return responseData;
    }

    private async makeRequest<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const defaultOptions: RequestInit = {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        };

        const response = await fetch(url, { ...defaultOptions, ...options });
        return this.handleResponse<T>(response);
    }

    // Authentication methods using BetterAuth client
    async signUp(data: SignUpData) {
        return authClient.signUp.email(data);
    }

    async signIn(data: SignInData) {
        return authClient.signIn.email(data);
    }

    async signOut() {
        return authClient.signOut();
    }

    async getSession() {
        try {
            console.log("🔐 API Client - Getting session from BetterAuth");
            const session = await authClient.getSession();
            console.log("✅ API Client - Session retrieved:", session);
            return { data: session.data };
        } catch (error) {
            console.error("❌ API Client - Session retrieval failed:", error);
            return { data: null };
        }
    }

    // Favorites methods
    async getFavorites(): Promise<FavoritesResponse> {
        return this.makeRequest<FavoritesResponse>("/api/favorites");
    }

    async addFavorite(
        recipe: AddFavoriteRequest
    ): Promise<ApiResponse<Favorite>> {
        return this.makeRequest<ApiResponse<Favorite>>("/api/favorites", {
            method: "POST",
            body: JSON.stringify(recipe),
        });
    }

    async removeFavorite(recipeId: string): Promise<ApiResponse<void>> {
        return this.makeRequest<ApiResponse<void>>(
            `/api/favorites/${recipeId}`,
            {
                method: "DELETE",
            }
        );
    }

    // User methods
    async getCurrentUser(): Promise<ApiResponse<User>> {
        return this.makeRequest<ApiResponse<User>>("/api/user");
    }

    async updateUser(
        userId: string,
        userData: Partial<User>
    ): Promise<ApiResponse<User>> {
        return this.makeRequest<ApiResponse<User>>(`/api/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    }

    async getDietPreference(
        userId: string
    ): Promise<{ dietPreference: string | null }> {
        return this.makeRequest<{ dietPreference: string | null }>(
            `/api/users/${userId}/diet-preference`
        );
    }

    // Recipe methods (if your backend has recipe endpoints)
    async searchRecipes(
        query: string,
        filters?: Record<string, unknown>
    ): Promise<ApiResponse<Recipe[]>> {
        const searchParams = new URLSearchParams({ q: query });

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
        }

        return this.makeRequest<ApiResponse<Recipe[]>>(
            `/api/recipes/search?${searchParams}`
        );
    }

    async getRecipe(id: string): Promise<ApiResponse<Recipe>> {
        return this.makeRequest<ApiResponse<Recipe>>(`/api/recipes/${id}`);
    }

    // Image upload for ingredient extraction
    async uploadImage(file: File): Promise<{
        ingredients: string[];
        filename: string;
        uploadedAt: string;
    }> {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${this.baseURL}/api/upload`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response
                .json()
                .catch(() => ({
                    error: "Upload failed",
                    message: "Network error occurred",
                }));

            // Create a more descriptive error message
            const errorMessage =
                errorData.message ||
                errorData.error ||
                `Upload failed with status ${response.status}`;
            const error = new Error(errorMessage);

            // Attach the error type for better handling
            (error as any).type = errorData.error;
            (error as any).statusCode = response.status;

            throw error;
        }

        return response.json();
    }

    // Recipe search using ingredients (direct Pinecone search)
    async searchRecipesByIngredients(
        ingredients: string[],
        dietaryPrefs?: string[]
    ): Promise<SearchResult[]> {
        console.log("🔧 API Client - Starting recipe search request");
        console.log("📝 API Client - Ingredients:", ingredients);
        console.log("🥗 API Client - Dietary preferences:", dietaryPrefs);

        // Create search query from ingredients
        const query = ingredients.join(" ");

        // Build filters for dietary preferences if provided
        const filters: Record<string, unknown> = {};
        if (dietaryPrefs && dietaryPrefs.length > 0) {
            // Map dietary preferences to the actual diet field values in the data
            const dietValues: string[] = [];
            dietaryPrefs.forEach((pref) => {
                switch (pref) {
                    case "vegan":
                        dietValues.push("Vegan");
                        break;
                    case "veg":
                    case "vegetarian":
                        // Include all vegetarian variants
                        dietValues.push("Vegetarian");
                        dietValues.push("High Protein Vegetarian");
                        dietValues.push("No Onion No Garlic (Sattvic)");
                        break;
                    case "nonVeg":
                        // Include all non-vegetarian variants
                        dietValues.push("Non Vegeterian"); // Note: typo in original data
                        dietValues.push("High Protein Non Vegetarian");
                        dietValues.push("Eggetarian");
                        break;
                    case "glutenFree":
                        dietValues.push("Gluten Free");
                        break;
                    case "diabeticFriendly":
                        dietValues.push("Diabetic Friendly");
                        break;
                    // Add more mappings as needed
                }
            });

            // Use $in operator to match any of the diet values
            if (dietValues.length > 0) {
                filters.diet = { $in: dietValues };
            }
        }

        const requestBody = {
            query: query,
            topK: 10, // Always fetch exactly 10 results
            filters: Object.keys(filters).length > 0 ? filters : undefined,
        };

        console.log("📤 API Client - Request body:", requestBody);
        console.log("🌐 API Client - Making request to /api/search");

        try {
            const response = await this.makeRequest<SearchResponse>(
                "/api/search",
                {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                }
            );

            console.log("✅ API Client - Search API response received");
            console.log("📊 API Client - Response data:", response);
            console.log(
                "📈 API Client - Number of results:",
                response.results?.length || 0
            );

            return response.results || [];
        } catch (error) {
            console.error("❌ API Client - Search request failed:", error);
            throw error;
        }
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
