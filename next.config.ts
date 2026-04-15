import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        // ── Security + Performance headers for ALL routes ──
        source: "/:path*",
        headers: [
          // Anti-MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Clickjacking protection
          { key: "X-Frame-Options", value: "DENY" },

          // XSS protection (legacy browsers)
          { key: "X-XSS-Protection", value: "1; mode=block" },

          // Force HTTPS for 1 year + preload list eligible
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          // Control referrer leakage
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Restrict browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },

          // Content Security Policy — permissive enough for WebGL + inline styles
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com", // unsafe-eval: Three.js shaders, unpkg: carbon badge
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self' https://api.websitecarbon.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },

          // Prevent embedding in cross-origin contexts
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
        ],
      },
      {
        // Cache static assets aggressively (1 year, immutable)
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

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "three",
    ],
  },
};

export default nextConfig;
