import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";
import Illustration from "@/components/ui/Illustration";

function LoginContent() {
    return <LoginPage />;
}

function LoginLoadingFallback() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
            <div className="text-center">
                <div className="mb-6">
                    <Illustration
                        name="chef"
                        alt="Loading login page"
                        width={80}
                        height={80}
                        className="mx-auto animate-pulse"
                    />
                </div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4 mx-auto"></div>
                <p className="text-gray-600 text-lg font-medium">
                    Loading sign in...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                    Welcome back to Chef!
                </p>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<LoginLoadingFallback />}>
            <LoginContent />
        </Suspense>
    );
}
