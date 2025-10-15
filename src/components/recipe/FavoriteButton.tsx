import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/contexts/AuthContext";
import type { AddFavoriteRequest } from "@/types/api";

interface FavoriteButtonProps {
    recipeId: string;
    recipeName: string;
    recipeImage?: string;
    cuisine?: string;
    className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    recipeId,
    recipeName,
    recipeImage,
    cuisine,
    className = "",
}) => {
    const { user, isAuthenticated } = useAuth();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check favorite status on mount
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!isAuthenticated || !user || !recipeId) return;

            try {
                const response = await apiClient.getFavoriteStatus(recipeId);
                setIsFavorited(response.isFavorited);
            } catch (error) {
                console.error("Failed to check favorite status:", error);
            }
        };

        checkFavoriteStatus();
    }, [isAuthenticated, user, recipeId]);

    const handleToggleFavorite = async () => {
        if (!isAuthenticated || !user) {
            // Redirect to login or show login prompt
            alert("Please sign in to add favorites");
            return;
        }

        if (!recipeId || !recipeName) {
            console.error("Missing recipe data for favorites");
            return;
        }

        // Validate that recipeId is a UUID (32+ characters)
        if (recipeId.length < 32) {
            console.error(
                "Invalid recipeId format - expected UUID, got:",
                recipeId
            );
            alert("Unable to add to favorites - invalid recipe ID format");
            return;
        }

        setIsLoading(true);

        try {
            const favoriteData: AddFavoriteRequest = {
                recipeId,
                recipeName,
                recipeImage: recipeImage || undefined,
                cuisine: cuisine || undefined,
            };

            const response = await apiClient.toggleFavorite(favoriteData);
            setIsFavorited(response.action === "added");

            // Show success message
            const message =
                response.action === "added"
                    ? "Added to favorites!"
                    : "Removed from favorites";

            // You could replace this with a toast notification
            console.log(message);
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
            // You could show an error toast here
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null; // Don't show the button if user is not authenticated
    }

    return (
        <button
            onClick={handleToggleFavorite}
            disabled={isLoading}
            className={`
                flex items-center justify-center gap-2 px-4 py-2 rounded-full
                transition-all duration-200 disabled:opacity-50
                ${
                    isFavorited
                        ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                        : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                }
                ${className}
            `}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
            <Heart
                className={`w-5 h-5 transition-all duration-200 ${
                    isFavorited ? "fill-current text-red-500" : ""
                } ${isLoading ? "animate-pulse" : ""}`}
            />
            <span className="text-sm font-medium">
                {isLoading
                    ? "..."
                    : isFavorited
                    ? "Favorited"
                    : "Add to Favorites"}
            </span>
        </button>
    );
};

export default FavoriteButton;
