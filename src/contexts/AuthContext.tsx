"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session in localStorage
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem("user");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Placeholder for actual login logic
            // const response = await auth.signIn.email({ email, password });

            // Mock successful login for now
            const mockUser = { id: "1", email, name: "User" };
            setUser(mockUser);

            // Store in localStorage for persistence (temporary solution)
            localStorage.setItem("user", JSON.stringify(mockUser));
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
            // Placeholder for actual signup logic
            // const response = await auth.signUp.email({ email, password, name });

            // Mock successful signup for now
            const mockUser = { id: Date.now().toString(), email, name };
            setUser(mockUser);

            // Store in localStorage for persistence (temporary solution)
            localStorage.setItem("user", JSON.stringify(mockUser));
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        // Redirect to home page
        window.location.href = "/";
    };

    const value = {
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
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
