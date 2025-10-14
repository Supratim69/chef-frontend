"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "../lib/api-client";
import { useAuth } from "../contexts/AuthContext";
import type { Favorite, AddFavoriteRequest } from "../types/api";

export function useFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();

    const loadFavorites = useCallback(async () => {
        if (!isAuthenticated) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.getFavorites();
            setFavorites(response.favorites || []);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to load favorites";
            setError(errorMessage);
            console.error("Failed to load favorites:", err);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    // Load favorites when user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadFavorites();
        } else {
            setFavorites([]);
        }
    }, [isAuthenticated, loadFavorites]);

    const addFavorite = async (recipe: AddFavoriteRequest) => {
        if (!isAuthenticated) {
            throw new Error("Must be authenticated to add favorites");
        }

        try {
            const response = await apiClient.addFavorite(recipe);

            if (response.data) {
                setFavorites((prev) => [...prev, response.data!]);
                return response.data;
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to add favorite";
            setError(errorMessage);
            throw err;
        }
    };

    const removeFavorite = async (recipeId: string) => {
        if (!isAuthenticated) {
            throw new Error("Must be authenticated to remove favorites");
        }

        try {
            await apiClient.removeFavorite(recipeId);
            setFavorites((prev) =>
                prev.filter((fav) => fav.recipeId !== recipeId)
            );
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to remove favorite";
            setError(errorMessage);
            throw err;
        }
    };

    const isFavorite = (recipeId: string): boolean => {
        return favorites.some((fav) => fav.recipeId === recipeId);
    };

    const toggleFavorite = async (recipe: AddFavoriteRequest) => {
        if (isFavorite(recipe.recipeId)) {
            await removeFavorite(recipe.recipeId);
        } else {
            await addFavorite(recipe);
        }
    };

    return {
        favorites,
        isLoading,
        error,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        refreshFavorites: loadFavorites,
    };
}
