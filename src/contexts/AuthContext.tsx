"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authClient } from "../lib/auth-client";
import type { User } from "../types/api";
import { analytics } from "../lib/analytics";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshSession = async () => {
        try {
            const response = await authClient.getSession();

            if (response.data?.user) {
                // Convert manual auth user to our User type
                const authUser = response.data.user;
                const user: User = {
                    id: authUser.id,
                    name: authUser.name,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    image: null, // Manual auth doesn't have image field
                    createdAt: authUser.createdAt,
                    updatedAt: authUser.createdAt, // Use createdAt as fallback for updatedAt
                    dietPreference: authUser.dietPreference,
                };
                setUser(user);
                // Backup for development
                localStorage.setItem("auth-backup", JSON.stringify(user));
            } else {
                // No session found
                const backup = localStorage.getItem("auth-backup");
                if (backup) {
                    setUser(JSON.parse(backup));
                } else {
                    setUser(null);
                }
            }
        } catch (error) {
            console.error("Session refresh failed:", error);
            // Try backup as fallback
            const backup = localStorage.getItem("auth-backup");
            if (backup) {
                setUser(JSON.parse(backup));
            } else {
                setUser(null);
            }
        }
    };

    useEffect(() => {
        // Check for existing session on mount
        const checkAuth = async () => {
            try {
                await refreshSession();
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await authClient.signIn({
                email,
                password,
            });

            if (response.error) {
                throw new Error(response.error.message || "Login failed");
            }

            if (response.data?.user) {
                // Convert manual auth user to our User type
                const authUser = response.data.user;
                const user: User = {
                    id: authUser.id,
                    name: authUser.name,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    image: null, // Manual auth doesn't have image field
                    createdAt: authUser.createdAt,
                    updatedAt: authUser.createdAt, // Use createdAt as fallback for updatedAt
                    dietPreference: authUser.dietPreference,
                };
                setUser(user);
                // Backup for development
                localStorage.setItem("auth-backup", JSON.stringify(user));

                // Track successful login
                analytics.trackAuth("sign_in");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        try {
            const response = await authClient.signUp({
                email,
                password,
                name,
            });

            if (response.error) {
                throw new Error(response.error.message || "Signup failed");
            }

            if (response.data?.user) {
                // Convert manual auth user to our User type
                const authUser = response.data.user;
                const user: User = {
                    id: authUser.id,
                    name: authUser.name,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    image: null, // Manual auth doesn't have image field
                    createdAt: authUser.createdAt,
                    updatedAt: authUser.createdAt, // Use createdAt as fallback for updatedAt
                    dietPreference: authUser.dietPreference,
                };
                setUser(user);

                // Track successful signup
                analytics.trackAuth("sign_up");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authClient.signOut();
            setUser(null);
            // Clear backup
            localStorage.removeItem("auth-backup");

            // Track successful logout
            analytics.trackAuth("sign_out");

            // Redirect to home page
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
            // Force logout on client side even if server request fails
            setUser(null);
            localStorage.removeItem("auth-backup");
            window.location.href = "/";
        }
    };

    const value = {
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        refreshSession,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
