"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleProtectedNavigation = (path: string) => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=${encodeURIComponent(path)}`);
        } else {
            router.push(path);
        }
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-orange-600"
                        >
                            Chef
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>

                        <Link
                            href="/search"
                            className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Search
                        </Link>

                        <button
                            onClick={() =>
                                handleProtectedNavigation("/favorites")
                            }
                            className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Favorites
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/profile"
                                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
