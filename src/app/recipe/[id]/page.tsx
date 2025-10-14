import RecipeDetailsPage from "@/components/recipe/page";

interface RecipePageProps {
    params: {
        id: string;
    };
    searchParams: {
        data?: string;
    };
}

export default function RecipePage({ params, searchParams }: RecipePageProps) {
    return (
        <RecipeDetailsPage
            recipeId={params.id}
            recipeData={searchParams.data}
        />
    );
}
