import React from "react";
import Image from "next/image";

interface UserProfileSectionProps {
    name: string;
    email: string;
    avatarUrl?: string | null;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
    name,
    email,
    avatarUrl,
}) => {
    const defaultAvatarUrl = "https://avatar.iran.liara.run/public/boy";

    return (
        <div className="flex flex-col items-center py-8">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-100 bg-gray-100">
                <Image
                    src={avatarUrl || defaultAvatarUrl}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback to default avatar on error
                        const target = e.target as HTMLImageElement;
                        target.src = defaultAvatarUrl;
                    }}
                />
            </div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">{name}</h2>
            <p className="text-gray-600">{email}</p>
        </div>
    );
};

export default UserProfileSection;
