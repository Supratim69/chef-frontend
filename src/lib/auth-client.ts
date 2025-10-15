// Manual auth client to replace BetterAuth
export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        createdAt: string;
        dietPreference?: string;
    };
    session: {
        id: string;
        expiresAt: string;
    };
}

export interface AuthError {
    error: string;
    message: string;
}

class ManualAuthClient {
    private baseURL: string;

    constructor() {
        this.baseURL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    }

    private async makeRequest<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<{ data?: T; error?: AuthError }> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const response = await fetch(url, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            });

            const data = await response.json();

            if (!response.ok) {
                return { error: data };
            }

            return { data };
        } catch (err) {
            console.error("Auth request failed:", err);
            return {
                error: {
                    error: "network_error",
                    message: "Network request failed",
                },
            };
        }
    }

    async signUp(data: { email: string; password: string; name: string }) {
        return this.makeRequest<AuthResponse>("/api/auth/sign-up/email", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async signIn(data: { email: string; password: string }) {
        return this.makeRequest<AuthResponse>("/api/auth/sign-in/email", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async signOut() {
        return this.makeRequest<{ success: boolean }>("/api/auth/sign-out", {
            method: "POST",
        });
    }

    async getSession() {
        return this.makeRequest<AuthResponse>("/api/auth/session", {
            method: "GET",
        });
    }

    async updateProfile(data: { name: string; dietPreference?: string }) {
        return this.makeRequest<AuthResponse>("/api/auth/profile", {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    async changePassword(data: {
        currentPassword: string;
        newPassword: string;
    }) {
        return this.makeRequest<{ success: boolean }>(
            "/api/auth/change-password",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );
    }
}

export const authClient = new ManualAuthClient();

export type Session = AuthResponse;
