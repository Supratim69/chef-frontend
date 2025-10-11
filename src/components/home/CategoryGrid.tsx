import React from "react";
import Image from "next/image";

interface Category {
    name: string;
    image: string;
}

interface CategoryGridProps {
    categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
                Popular Ingredient Categories
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
                {categories.map((category, index) => (
                    <div key={index} className="flex-shrink-0 w-36">
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <Image
                                src={category.image}
                                alt={category.name}
                                width={144}
                                height={96}
                                className="w-full h-24 object-cover"
                            />
                            <div className="p-3 text-center">
                                <p className="font-semibold text-sm text-gray-800">
                                    {category.name}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;
