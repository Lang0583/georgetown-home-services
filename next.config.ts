import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
