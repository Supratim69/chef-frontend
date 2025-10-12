import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/favorites", "/profile"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // In a real app, you'd check for valid session/token here
        // For now, we'll let the client-side auth handle it
        // This middleware is mainly for future server-side auth checks
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
