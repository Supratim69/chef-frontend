import React from "react";

interface RecipeTitleSectionProps {
    title: string;
    description: string;
}

const RecipeTitleSection: React.FC<RecipeTitleSectionProps> = ({
    title,
    description,
}) => {
    return (
        <div className="py-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
            {/* <p className="text-gray-600 text-sm">{description}</p> */}
        </div>
    );
};

export default RecipeTitleSection;
