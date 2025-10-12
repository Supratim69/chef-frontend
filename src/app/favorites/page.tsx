import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FavoritesPage from "@/components/favorites/page";

export default function Favorites() {
    return (
        <ProtectedRoute>
            <FavoritesPage />
        </ProtectedRoute>
    );
}
