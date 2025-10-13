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
            throw new Error(errorData.message || "Request failed");
        }

        return response.json();
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
        const response = await fetch(`${this.baseURL}/api/auth/session`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return { data: await response.json() };
        } else {
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
        filters?: Record<string, any>
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
    async uploadImage(
        file: File
    ): Promise<{
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
                .catch(() => ({ error: "Upload failed" }));
            throw new Error(
                errorData.error ||
                    `Upload failed with status ${response.status}`
            );
        }

        return response.json();
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
