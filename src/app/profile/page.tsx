import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProfilePage from "@/components/profile/page";

export default function Profile() {
    return (
        <ProtectedRoute>
            <ProfilePage />
        </ProtectedRoute>
    );
}
