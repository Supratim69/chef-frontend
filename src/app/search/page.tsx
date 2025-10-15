import { Suspense } from "react";
import SearchResultsPage from "@/components/results/page";
import Illustration from "@/components/ui/Illustration";

function SearchContent() {
    return <SearchResultsPage />;
}

function SearchLoadingFallback() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
            <div className="text-center">
                <div className="mb-6">
                    <Illustration
                        name="search"
                        alt="Loading search results"
                        width={80}
                        height={80}
                        className="mx-auto animate-pulse"
                    />
                </div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4 mx-auto"></div>
                <p className="text-gray-600 text-lg font-medium">
                    Loading search results...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                    Finding the perfect recipes for you
                </p>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchLoadingFallback />}>
            <SearchContent />
        </Suspense>
    );
}
