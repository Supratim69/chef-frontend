"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FavoritesHeader, FavoriteRecipesList } from "./";
import AppLayout from "@/components/layout/AppLayout";
import Illustration from "@/components/ui/Illustration";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/contexts/AuthContext";
import type { Favorite } from "@/types/api";

export default function FavoritesPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!isAuthenticated || !user) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await apiClient.getFavorites();
                setFavorites(response.favorites || []);
                setError(null);
            } catch (err) {
                console.error("Failed to load favorites:", err);
                setError("Failed to load favorites");
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [isAuthenticated, user]);

    const handleViewRecipe = (recipeId: string) => {
        router.push(`/recipe/${recipeId}`);
    };

    const handleRemoveFavorite = async (recipeId: string) => {
        try {
            await apiClient.removeFavorite(recipeId);
            // Remove from local state
            setFavorites((prev) =>
                prev.filter((fav) => fav.recipeId !== recipeId)
            );
        } catch (err) {
            console.error("Failed to remove favorite:", err);
        }
    };

    if (!isAuthenticated) {
        return (
            <AppLayout>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                    <FavoritesHeader />
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                        <div className="text-center">
                            <div className="mb-6">
                                <Illustration
                                    name="chef"
                                    alt="Please sign in"
                                    width={96}
                                    height={96}
                                    className="mx-auto"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Sign In Required
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Please sign in to view your favorite recipes
                            </p>
                            <button
                                onClick={() => router.push("/login")}
                                className="bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition-colors"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (loading) {
        return (
            <AppLayout>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                    <FavoritesHeader />
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                        <div className="mb-4">
                            <Illustration
                                name="cooking"
                                alt="Loading favorites"
                                width={64}
                                height={64}
                                className="mx-auto animate-pulse"
                            />
                        </div>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
                        <p className="text-gray-600">
                            Loading your favorites...
                        </p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                    <FavoritesHeader />
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                        <div className="text-center">
                            <div className="mb-6">
                                <Illustration
                                    name="no_results"
                                    alt="Error loading favorites"
                                    width={96}
                                    height={96}
                                    className="mx-auto"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Something went wrong
                            </h3>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (favorites.length === 0) {
        return (
            <AppLayout>
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                    <FavoritesHeader />
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                        <div className="text-center">
                            <div className="mb-6">
                                <Illustration
                                    name="empty_state"
                                    alt="No favorites yet"
                                    width={96}
                                    height={96}
                                    className="mx-auto opacity-60"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No favorites yet
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-sm">
                                Start exploring recipes and add your favorites
                                to see them here!
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="bg-cyan-400 text-white px-6 py-2 rounded-full hover:bg-cyan-500 transition-colors"
                            >
                                Discover Recipes
                            </button>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                <FavoritesHeader />

                <FavoriteRecipesList
                    favorites={favorites}
                    onViewRecipe={handleViewRecipe}
                    onRemoveFavorite={handleRemoveFavorite}
                />
            </div>
        </AppLayout>
    );
}
