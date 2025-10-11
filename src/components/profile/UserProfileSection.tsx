import React from "react";
import Image from "next/image";

interface UserProfileSectionProps {
    name: string;
    email: string;
    avatarUrl: string;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({
    name,
    email,
    avatarUrl,
}) => {
    return (
        <div className="flex flex-col items-center py-8">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-100">
                <Image
                    src={avatarUrl}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">{name}</h2>
            <p className="text-gray-600">{email}</p>
        </div>
    );
};

export default UserProfileSection;
