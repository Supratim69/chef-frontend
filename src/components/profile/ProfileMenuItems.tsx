import React, { useState, useEffect } from "react";
import { User, ChevronRight, Edit3, Save, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { apiClient } from "@/lib/api-client";

interface MenuItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
}

const ProfileMenuItems = () => {
    const { user } = useAuth();
    const { updateProfile, isLoading, error, clearError } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [currentDietPreference, setCurrentDietPreference] = useState<
        string | null
    >(null);
    const [loadingDietPreference, setLoadingDietPreference] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        dietPreference: "",
    });

    const fetchDietPreference = async () => {
        if (!user) return;

        setLoadingDietPreference(true);
        try {
            const response = await apiClient.getDietPreference(user.id);
            setCurrentDietPreference(response.dietPreference);
        } catch (error) {
            console.error("Failed to fetch diet preference:", error);
            setCurrentDietPreference(null);
        } finally {
            setLoadingDietPreference(false);
        }
    };

    const handleEditClick = async () => {
        await fetchDietPreference();
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            dietPreference: currentDietPreference || "",
        });
        setIsEditing(true);
        clearError();
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            const updateData: any = {};
            if (formData.name !== user.name) updateData.name = formData.name;
            if (formData.email !== user.email)
                updateData.email = formData.email;

            // Always include diet preference if it changed (including empty string to clear it)
            if (formData.dietPreference !== (currentDietPreference || "")) {
                updateData.dietPreference = formData.dietPreference || null;
            }

            if (Object.keys(updateData).length === 0) {
                setIsEditing(false);
                return;
            }

            await updateProfile(updateData);
            setCurrentDietPreference(formData.dietPreference || null);
            setIsEditing(false);
        } catch (err) {
            // Error is handled by the hook
            console.error("Failed to update profile:", err);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        clearError();
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            dietPreference: currentDietPreference || "",
        });
    };

    // Fetch diet preference on component mount
    useEffect(() => {
        if (user && !isEditing) {
            fetchDietPreference();
        }
    }, [user]);

    const getDietPreferenceDisplay = () => {
        if (loadingDietPreference) return "Loading...";
        if (!currentDietPreference) return "No diet preference set";
        return `Diet: ${
            currentDietPreference.charAt(0).toUpperCase() +
            currentDietPreference.slice(1)
        }`;
    };

    const menuItems: MenuItem[] = [
        {
            id: "account",
            icon: <User className="w-5 h-5 text-cyan-400" />,
            title: "Account Information",
            description: `Update your personal details and preferences • ${getDietPreferenceDisplay()}`,
            onClick: handleEditClick,
        },
    ];

    if (isEditing) {
        return (
            <div className="space-y-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg text-gray-800">
                            Edit Account Information
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Diet Preference (Optional)
                            </label>
                            {loadingDietPreference ? (
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-500 mr-2"></div>
                                    Loading current preference...
                                </div>
                            ) : (
                                <select
                                    value={formData.dietPreference}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            dietPreference: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    disabled={isLoading}
                                >
                                    <option value="">No preference</option>
                                    <option value="vegan">Vegan</option>
                                    <option value="vegetarian">
                                        Vegetarian
                                    </option>
                                    <option value="non-veg">Non-Veg</option>
                                    <option value="gluten-free">
                                        Gluten Free
                                    </option>
                                </select>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 mb-8">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={item.onClick}
                    className="w-full bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center flex-shrink-0">
                        {item.icon}
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-semibold text-lg mb-1 text-gray-800">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {item.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-gray-400" />
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                </button>
            ))}
        </div>
    );
};

export default ProfileMenuItems;
