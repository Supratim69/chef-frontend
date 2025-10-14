import React from "react";
import Image from "next/image";

interface RecipeHeroImageProps {
    imageUrl: string;
    altText: string;
}

const RecipeHeroImage: React.FC<RecipeHeroImageProps> = ({
    imageUrl,
    altText,
}) => {
    return (
        <div className="relative">
            <Image
                src={imageUrl}
                alt={altText}
                width={800}
                height={256}
                className="w-full h-64 object-cover"
            />
        </div>
    );
};

export default RecipeHeroImage;
