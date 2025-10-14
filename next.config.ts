import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
