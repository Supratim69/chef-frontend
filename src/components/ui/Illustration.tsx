import React from "react";

interface IllustrationProps {
    name: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

// Predefined illustrations from undraw.co
const illustrations = {
    cooking: "https://img.icons8.com/color/96/cooking.png",
    chef: "https://img.icons8.com/color/96/chef.png",
    ingredients: "https://img.icons8.com/color/96/ingredients.png",
    recipe: "https://img.icons8.com/color/96/recipe.png",
    search: "https://img.icons8.com/color/96/search.png",
    welcome: "https://img.icons8.com/color/96/welcome.png",
    food: "https://img.icons8.com/color/96/food.png",
    kitchen: "https://img.icons8.com/color/96/kitchen.png",
    meal: "https://img.icons8.com/color/96/meal.png",
    vegetarian: "https://img.icons8.com/color/96/vegetarian-food.png",
    empty_state: "https://img.icons8.com/color/96/empty-box.png",
    no_results: "https://img.icons8.com/color/96/nothing-found.png",
};

const Illustration: React.FC<IllustrationProps> = ({
    name,
    alt,
    className = "",
    width = 96,
    height = 96,
}) => {
    const src = illustrations[name as keyof typeof illustrations];

    if (!src) {
        console.warn(`Illustration "${name}" not found`);
        return null;
    }

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`object-contain ${className}`}
            loading="lazy"
        />
    );
};

export default Illustration;
