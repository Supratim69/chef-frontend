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
        if (!response.ok) {
            const errorData: ApiError = await response.json().catch(() => ({
                error: "network_error",
                message: "Network request failed",
                statusCode: response.status,
            }));

            throw new Error(
                errorData.message ||
                    `Request failed with status ${response.status}`
            );
        }

        const responseData = await response.json();
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

    // Authentication methods using manual auth client
    async signUp(data: SignUpData) {
        return authClient.signUp(data);
    }

    async signIn(data: SignInData) {
        return authClient.signIn(data);
    }

    async signOut() {
        return authClient.signOut();
    }

    async getSession() {
        try {
            const session = await authClient.getSession();
            return { data: session.data };
        } catch (error) {
            console.error("❌ API Client - Session retrieval failed:", error);
            return { data: null };
        }
    }

    // Profile methods using manual auth
    async getProfile() {
        return authClient.getSession(); // Profile data is included in session response
    }

    async updateProfileData(data: { name: string; dietPreference?: string }) {
        return authClient.updateProfile(data);
    }

    // Favorites methods
    async getFavorites(): Promise<FavoritesResponse> {
        // Get current user session to get userId
        const session = await this.getSession();
        if (!session.data?.user?.id) {
            throw new Error("User not authenticated");
        }

        const userId = session.data.user.id;
        return this.makeRequest<FavoritesResponse>(
            `/api/users/${userId}/favorites`
        );
    }

    async addFavorite(
        recipe: AddFavoriteRequest
    ): Promise<ApiResponse<Favorite>> {
        // Get current user session to get userId
        const session = await this.getSession();
        if (!session.data?.user?.id) {
            throw new Error("User not authenticated");
        }

        const userId = session.data.user.id;
        return this.makeRequest<ApiResponse<Favorite>>(
            `/api/users/${userId}/favorites`,
            {
                method: "POST",
                body: JSON.stringify(recipe),
            }
        );
    }

    async removeFavorite(recipeId: string): Promise<ApiResponse<void>> {
        // Get current user session to get userId
        const session = await this.getSession();
        if (!session.data?.user?.id) {
            throw new Error("User not authenticated");
        }

        const userId = session.data.user.id;
        return this.makeRequest<ApiResponse<void>>(
            `/api/users/${userId}/favorites/${recipeId}`,
            {
                method: "DELETE",
            }
        );
    }

    async getFavoriteStatus(
        recipeId: string
    ): Promise<{ isFavorited: boolean }> {
        // Get current user session to get userId
        const session = await this.getSession();
        if (!session.data?.user?.id) {
            return { isFavorited: false };
        }

        const userId = session.data.user.id;
        return this.makeRequest<{ isFavorited: boolean }>(
            `/api/users/${userId}/favorites/${recipeId}/status`
        );
    }

    async toggleFavorite(recipe: AddFavoriteRequest): Promise<{
        action: "added" | "removed";
        favorite?: Favorite;
    }> {
        // Get current user session to get userId
        const session = await this.getSession();
        if (!session.data?.user?.id) {
            throw new Error("User not authenticated");
        }

        const userId = session.data.user.id;
        return this.makeRequest<{
            action: "added" | "removed";
            favorite?: Favorite;
        }>(`/api/users/${userId}/favorites/${recipe.recipeId}/toggle`, {
            method: "POST",
            body: JSON.stringify(recipe),
        });
    }

    // User methods (DEPRECATED - use manual auth profile methods instead)
    /** @deprecated Use getProfile() instead */
    async getCurrentUser(): Promise<ApiResponse<User>> {
        return this.makeRequest<ApiResponse<User>>("/api/user");
    }

    /** @deprecated Use updateProfileData() instead */
    async updateUser(
        userId: string,
        userData: Partial<User>
    ): Promise<ApiResponse<User>> {
        return this.makeRequest<ApiResponse<User>>(`/api/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    }

    /** @deprecated Use getProfile() to get user's diet preference instead */
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
            const errorData = await response.json().catch(() => ({
                error: "Upload failed",
                message: "Network error occurred",
            }));

            // Create a more descriptive error message
            const errorMessage =
                errorData.message ||
                errorData.error ||
                `Upload failed with status ${response.status}`;
            const error = new Error(errorMessage) as Error & {
                type?: string;
                statusCode?: number;
            };

            // Attach the error type for better handling
            error.type = errorData.error;
            error.statusCode = response.status;

            throw error;
        }

        return response.json();
    }

    // Recipe search using ingredients (direct Pinecone search)
    async searchRecipesByIngredients(
        ingredients: string[],
        dietaryPrefs?: string[]
    ): Promise<SearchResult[]> {
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

        try {
            const response = await this.makeRequest<SearchResponse>(
                "/api/search",
                {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                }
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
