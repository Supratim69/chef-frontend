import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

function ForgotPasswordContent() {
    return <LoginPage />;
}

export default function ForgotPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordContent />
        </Suspense>
    );
}
