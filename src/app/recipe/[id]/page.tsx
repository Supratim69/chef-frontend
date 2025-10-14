import RecipeDetailsPage from "@/components/recipe/page";

interface RecipePageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        data?: string;
    }>;
}

export default async function RecipePage({
    params,
    searchParams,
}: RecipePageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    return (
        <RecipeDetailsPage
            recipeId={resolvedParams.id}
            recipeData={resolvedSearchParams.data}
        />
    );
}
