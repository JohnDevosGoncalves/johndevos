import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression for all assets
  compress: true,

  // Optimize production bundle
  reactStrictMode: false, // Avoids double-renders in dev; no effect in prod

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Performance headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(js|css|woff2|woff|ttf|ico|svg|png|jpg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Reduce JS bundle size: exclude unused modules
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "three",
    ],
  },
};

export default nextConfig;
