import RecipeDetailsPage from "@/components/recipe/page";

interface RecipePageProps {
    params: {
        id: string;
    };
}

export default function RecipePage({ params }: RecipePageProps) {
    return <RecipeDetailsPage recipeId={params.id} />;
}
