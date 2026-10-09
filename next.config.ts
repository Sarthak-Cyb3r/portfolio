import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "sarthak-cyb3r-portfolio.vercel.app",
          },
        ],
        destination: "https://sarthak-cyb3r.vercel.app/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "portfolio-sarthak-cyb3r.vercel.app",
          },
        ],
        destination: "https://sarthak-cyb3r.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
