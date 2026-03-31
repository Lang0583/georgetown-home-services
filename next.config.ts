import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
