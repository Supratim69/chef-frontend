import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

function LoginContent() {
    return <LoginPage />;
}

export default function Login() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}
