import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface RecipeHeroImageProps {
    imageUrl: string;
    altText: string;
    onToggleFavorite?: () => void;
}

const RecipeHeroImage: React.FC<RecipeHeroImageProps> = ({
    imageUrl,
    altText,
    onToggleFavorite,
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
            <button
                onClick={onToggleFavorite}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
                <Heart className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
};

export default RecipeHeroImage;
