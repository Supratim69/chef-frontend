import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

function SignUpContent() {
    return <LoginPage />;
}

export default function SignUp() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignUpContent />
        </Suspense>
    );
}
