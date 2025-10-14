import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    outputFileTracingRoot: path.join(__dirname),
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "avatar.iran.liara.run",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.archanaskitchen.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
