import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: "/sitemap.xml", destination: "/api/sitemap-xml" }],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: false,
      },
      {
        source: "/blog/how-to-find-a-good-plumber-georgetown",
        destination: "/blog/how-to-find-a-good-plumber-georgetown-tx",
        permanent: true,
      },
      {
        source: "/blog/roof-repair-cost-georgetown",
        destination: "/blog/roof-repair-cost-georgetown-tx",
        permanent: true,
      },
      {
        source: "/blog/how-to-choose-plumber-georgetown-tx",
        destination: "/blog/how-to-choose-a-reliable-plumber-georgetown-tx",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
