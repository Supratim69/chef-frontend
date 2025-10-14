import { Suspense } from "react";
import SearchResultsPage from "@/components/results/page";

function SearchContent() {
    return <SearchResultsPage />;
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
