import React from "react";

interface DietaryBadge {
    label: string;
    emoji: string;
}

interface DietaryInformationProps {
    badges: DietaryBadge[];
}

const DietaryInformation: React.FC<DietaryInformationProps> = ({ badges }) => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-500">🥕</span>
                <h3 className="font-semibold text-gray-800">
                    Dietary Information
                </h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                    <span
                        key={index}
                        className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-medium"
                    >
                        {badge.emoji} {badge.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default DietaryInformation;
