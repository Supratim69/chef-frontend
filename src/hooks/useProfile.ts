"use client";

import { useState } from "react";
import { apiClient } from "../lib/api-client";
import { useAuth } from "../contexts/AuthContext";
import type { User } from "../types/api";

export function useProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, refreshSession } = useAuth();

    const updateProfile = async (updateData: Partial<User>) => {
        if (!user) {
            throw new Error("Must be authenticated to update profile");
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.updateUser(user.id, updateData);

            if (response.error) {
                throw new Error(response.error);
            }

            // Refresh the session to get updated user data
            await refreshSession();

            return response.data;
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to update profile";
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {
        updateProfile,
        isLoading,
        error,
        clearError,
    };
}
