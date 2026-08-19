import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder project previews are SVG; swap for PNG/WebP captures later.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
